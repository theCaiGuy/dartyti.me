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
  marginLeft: 'auto',
  marginRight: 'auto'
};

const queue = {
  marginTop: '20px',
  width: '99%',
  padding: '10px'
};

const devices = {
  float: 'left',
  width: '40%',
  marginLeft: '5%',
  marginRight: '5%'
};

const users = {
  float: 'right',
  width: '40%',
  marginLeft: '5%',
  marginRight: '5%'
};

class Player extends React.Component {
  render() {
    return (
      <div style={player}>
        <div>
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
        <div style={devices}>{this.props.session.user !== null ? <Devices /> : null}</div>
        <div style={users}>
          <Users items={this.props.users} />
        </div>
      </div>
    );
  }
}

export default withRedux()(Player);
