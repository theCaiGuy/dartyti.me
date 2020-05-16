import React from 'react';
import { connect } from 'react-redux';

import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import { fetchAvailableDevices, transferPlaybackToDevice } from '../actions/devicesActions';
import { getIsFetchingDevices } from '../reducers';
import { getDevices } from '../reducers';
import * as colors from '../constants/color_scheme.js';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const deviceList = {
  listStyle: 'none',
  padding: 0,
  marginTop: '0px',
  width: '100%'
};

const deviceStyle = {
  height: 'auto',
  minHeight: '50px',
  alignItems: 'center',
  fontSize: '18px',
  borderRadius: '10px'
};

const passiveText = {
  color: colors.GRAY,
  padding: '8px'
};

const activeText = {
  color: colors.GRAY,
  fontWeight: 'bold',
  padding: '8px'
};

class Devices extends React.PureComponent {
  state = {
    selected: -1
  };

  render() {
    const { devices, isFetching, fetchAvailableDevices, transferPlaybackToDevice } = this.props;
    return (
      <div>
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
                      <div style={activeText}>
                        {device.name}
                        <FontAwesomeIcon icon={['fas', 'headphones']} color="black" style={{ marginLeft: '10px' }} />
                      </div>
                    ) : (
                      <p style={passiveText}>{device.name}</p>
                    )}
                  </li>
                );
              })}
            </ul>
            <button
              className="btn btn--dark"
              style={{ marginTop: '5px' }}
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
