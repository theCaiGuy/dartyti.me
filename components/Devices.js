import React from 'react';
import { connect } from 'react-redux';

import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';

class Devices extends React.PureComponent {
  state = {
    selected: -1
  };

  render() {
    const { devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice } = this.props;
    return (
      <div style={{ paddingBottom: '10px' }}>
        <h2 className="header-2">Connect to a device</h2>
        <style jsx>{ButtonStyle}</style>
        <style jsx>{ButtonDarkStyle}</style>
        <style jsx>{`
          .DeviceList {
            list-style: none;
            padding: 0;
            margin-top: 0px;
            width: 100%;
          }
          .device {
            padding: 5px 0 5px 5px;
            background-color: #fff;
            height: auto;
            align-items: center;
          }
          .device:hover {
            padding: 5px 0 5px 5px;
            background-color: #eee;
            height: auto;
            align-items: center;
            cursor: pointer;
          }
          .deviceLabel {
            flex-direction: row;
          }
          .header-2 {
            color: #999;
            font-size: 20px;
            text-transform: uppercase;
          }
          .ActiveText {
            font-weight: bold;
          }
        `}</style>
        {devices.length === 0 ? (
          <p>Search for Playback Devices</p>
        ) : (
          <ul className="DeviceList">
            {devices.map((device, index) => {
              return (
                <li
                  key={index}
                  className="device"
                  onClick={() => {
                    if (!device.is_active) {
                      transferPlaybackToDevice(device.id);
                    }
                    this.setState({
                      selected: index
                    });
                    fetchAvailableDevices();
                  }}
                  style={{ fontSize: 16 }}
                >
                  {index === this.state.selected ? <p className="ActiveText">{device.name}</p> : <p>{device.name}</p>}
                </li>
              );
            })}
          </ul>
        )}
        <button
          className="btn btn--dark"
          disabled={isFetching}
          onClick={() => {
            fetchAvailableDevices();
          }}
        >
          Search for Devices
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchAvailableDevices: index => dispatch(fetchAvailableDevices(index)),
  transferPlaybackToDevice: deviceId => dispatch(transferPlaybackToDevice(deviceId))
});

const mapStateToProps = state => ({
  isFetching: getIsFetchingDevices(state),
  devices: getDevices(state)
});

export default connect(mapStateToProps, mapDispatchToProps)(Devices);
