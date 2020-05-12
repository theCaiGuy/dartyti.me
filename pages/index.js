import React, { Component } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import Player from '../components/Player';
import { initStore } from '../store/store';
import withRedux from 'next-redux-wrapper';
import PageWithIntl from '../components/PageWithIntl';
import { fetchQueue } from '../actions/queueActions';
import { fetchUsers } from '../actions/usersActions';
import { fetchPlayingContext } from '../actions/playbackActions';
import Layout from '../components/MyLayout.js';
import * as colors from '../constants/color_scheme';

library.add(fab);

class App extends Component {
  static getInitialProps({ req, store, isServer }) {
    return Promise.all([
      store.dispatch(fetchQueue()),
      store.dispatch(fetchUsers()),
      store.dispatch(fetchPlayingContext())
    ]);
  }

  render() {
    return (
      <Layout>
        <style jsx>
          {`
            .Section {
              display: inline-block;
              width: 70%;
              height: auto;
              text-align: center;
              align-content: center;
              margin-left: 15%;
              margin-right: 15%;
              background-color: white;
              border-radius: 20px;
              margin-top: 30px;
              margin-bottom: 30px;
              padding-top: 20px;
              padding-bottom: 30px;
            }
            .HalfSectionLeft {
              display: inline-block;
              width: 34%;
              height: auto;
              text-align: center;
              align-content: center;
              margin-left: 15%;
              margin-right: 1%;
              background-color: white;
              border-radius: 20px;
              margin-top: 30px;
              margin-bottom: 30px;
              padding-top: 20px;
              padding-bottom: 30px;
            }
            .HalfSectionRight {
              display: inline-block;
              width: 34%;
              height: auto;
              text-align: center;
              align-content: center;
              margin-left: 1%;
              margin-right: 15%;
              background-color: white;
              border-radius: 20px;
              margin-top: 30px;
              margin-bottom: 30px;
              padding-top: 20px;
              padding-bottom: 30px;
            }
          `}
        </style>
        <div style={{ backgroundColor: colors.BLUE }}>
          <div className="Section">
            <h1>About</h1>
          </div>
        </div>
        <div style={{ backgroundColor: colors.PINK }}>
          <div className="Section">
            <h1>Chat</h1>
          </div>
        </div>
        <div style={{ backgroundColor: colors.ORANGE }}>
          <div className="HalfSectionLeft">
            <h1>Rooms</h1>
          </div>
          <div className="HalfSectionRight">
            <h1>Donate</h1>
          </div>
        </div>
        <div style={{ backgroundColor: colors.YELLOW }}>
          <div className="Section">
            <Player
              playing={this.props.playing}
              queue={this.props.queue}
              users={this.props.users}
              session={this.props.session}
            />
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  playing: state.playback,
  queue: state.queue,
  users: state.users,
  session: state.session
});

export default withRedux(initStore, mapStateToProps)(PageWithIntl(App));

// export default App;
