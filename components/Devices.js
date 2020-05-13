import React from 'react';
import { connect } from 'react-redux';

import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';
import * as colors from '../constants/color_scheme.js';

const header2 = {
  color: colors.GRAY,
  fontSize: '24px',
  textTransform: 'uppercase'
};

const deviceList = {
  listStyle: 'none',
  padding: 0,
  marginTop: '0px',
  width: '100%'
};

const deviceStyle = {
  height: 'auto',
  alignItems: 'center',
  fontSize: '18px',
  borderRadius: '10px',
  padding: '1px'
};

const passiveText = {
  color: colors.GRAY
};

const activeText = {
  color: colors.GRAY,
  fontWeight: 'bold'
};

class Devices extends React.PureComponent {
  state = {
    selected: -1
  };

  render() {
    const { devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice } = this.props;
    return (
      <div style={{ paddingBottom: '10px' }}>
        <style jsx>{ButtonStyle}</style>
        <style jsx>{ButtonDarkStyle}</style>
        <style jsx>{`
          .deviceStyle:hover {
            background-color: #eee;
            cursor: pointer;
          }
        `}</style>
        {devices.length === 0 ? (
          <button
            className="btn btn--dark"
            disabled={isFetching}
            onClick={() => {
              fetchAvailableDevices();
            }}
          >
            Search for Available Devices
          </button>
        ) : (
          <div>
            <ul style={deviceList}>
              {devices.map((device, index) => {
                return (
                  <li
                    key={index}
                    style={deviceStyle}
                    className="deviceStyle"
                    onClick={() => {
                      if (!device.is_active) {
                        transferPlaybackToDevice(device.id);
                        window.location.reload(false);
                      }
                    }}
                  >
                    {device.is_active ? (
                      <p style={activeText}>{device.name}</p>
                    ) : (
                      <p style={passiveText}>{device.name}</p>
                    )}
                  </li>
                );
              })}
            </ul>
            <button
              className="btn btn--dark"
              disabled={isFetching}
              onClick={() => {
                fetchAvailableDevices();
              }}
            >
              Refresh Device List
            </button>
          </div>
        )}
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
