import React from 'react';
import withRedux from 'next-redux-wrapper';
import Users from './Users';
import Queue from './Queue';
import AddToQueue from './AddToQueue';
import NowPlaying from './NowPlaying';
import Devices from './Devices';

class Player extends React.Component {
  render() {
    return (
      <div className="Player">
        <style jsx>
          {`
            .Player {
              width: 70%;
              margin-left: auto;
              margin-right: auto;
            }
            .Queue {
              margin-top: 20px;
              width: 99%;
            }
            .Devices {
              float: left;
              width: 40%;
              margin-left: 5%;
              margin-right: 5%;
            }
            .Users {
              float: right;
              width: 40%;
              margin-left: 5%;
              margin-right: 5%;
            }
            .header-2 {
              color: #999;
              font-size: 20px;
              text-transform: uppercase;
            }
          `}
        </style>
        <div>
          {this.props.playing.track ? (
            <NowPlaying
              track={this.props.playing.track}
              user={this.props.playing.user}
              position={this.props.playing.position}
            />
          ) : null}
        </div>
        <div className="Queue">
          {this.props.session.user !== null ? (
            <AddToQueue />
          ) : (
            <h2 className="header-2">Login to Spotify to sync music</h2>
          )}
          <h2 className="header-2">Up Next</h2>
          <Queue items={this.props.queue} session={this.props.session} />
        </div>
        <div className="Devices">{this.props.session.user !== null ? <Devices /> : null}</div>
        <div className="Users">
          <Users items={this.props.users} />
        </div>
      </div>
    );
  }
}

export default withRedux()(Player);
