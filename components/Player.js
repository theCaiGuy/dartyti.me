import React from 'react';
import withRedux from 'next-redux-wrapper';
import Users from './Users';
import Queue from './Queue';
import AddToQueue from './AddToQueue';
import NowPlaying from './NowPlaying';
import Devices from './Devices';
import * as colors from '../constants/color_scheme.js';

const header2 = {
  color: colors.GRAY,
  fontSize: '24px',
  textTransform: 'uppercase'
};

const player = {
  width: '95%',
  marginLeft: '2.5%',
  marginRight: '2.5%'
};

const nowPlayingStyle = {
  width: '100%',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const queue = {
  marginTop: '40px',
  width: '100%',
  overflow: 'auto',
  marginLeft: 'auto',
  marginRight: 'auto'
};

const users = {
  float: 'left',
  width: '40%',
  marginLeft: '5%',
  marginRight: '5%',
  marginTop: '20px'
};

const devices = {
  float: 'right',
  width: '40%',
  marginLeft: '5%',
  marginRight: '5%',
  marginTop: '20px'
};

const users_devices = {
  width: '100%'
};

class Player extends React.Component {
  render() {
    return (
      <div style={player}>
        <div style={nowPlayingStyle}>
          {this.props.playing.track ? (
            <NowPlaying
              track={this.props.playing.track}
              user={this.props.playing.user}
              position={this.props.playing.position}
            />
          ) : null}
        </div>
        <div style={queue}>
          {this.props.session.user !== null ? <AddToQueue /> : <h2 style={header2}>Login to Spotify to sync music</h2>}
          <h2 style={header2}>Up Next</h2>
          <Queue items={this.props.queue} session={this.props.session} />
        </div>
        <div style={users_devices}>
          <div style={users}>
            <Users items={this.props.users} />
          </div>
          <div style={devices}>{this.props.session.user !== null ? <Devices /> : null}</div>
        </div>
      </div>
    );
  }
}

export default withRedux()(Player);
