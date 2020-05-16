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
import Header from '../components/Header';

library.add(fab);

const Banner = {
  display: 'inlineBlock',
  width: '70%',
  height: 'auto',
  textAlign: 'center',
  alignContent: 'center',
  marginLeft: '15%',
  marginRight: '15%',
  backgroundColor: 'white',
  borderRadius: '20px',
  marginTop: '30px',
  marginBottom: '30px',
  paddingTop: '10px',
  paddingBottom: '10px',
  overflow: 'auto'
};

const Section = {
  display: 'inlineBlock',
  width: '70%',
  height: 'auto',
  minHeight: '400px',
  textAlign: 'center',
  alignContent: 'center',
  marginLeft: '15%',
  marginRight: '15%',
  backgroundColor: 'white',
  borderRadius: '20px',
  marginTop: '30px',
  marginBottom: '30px',
  paddingTop: '20px',
  paddingBottom: '30px',
  overflow: 'auto'
};

const HalfSectionLeft = {
  display: 'inlineBlock',
  width: '34%',
  // height: 'auto',
  textAlign: 'center',
  alignContent: 'center',
  marginLeft: 'auto',
  marginRight: '1%',
  backgroundColor: 'white',
  borderRadius: '20px',
  marginTop: '30px',
  marginBottom: '30px',
  paddingTop: '20px',
  paddingBottom: '30px',
  overflow: 'auto'
};

const HalfSectionRight = {
  display: 'inlineBlock',
  width: '34%',
  // height: 'auto',
  textAlign: 'center',
  alignContent: 'center',
  marginLeft: '1%',
  marginRight: 'auto',
  backgroundColor: 'white',
  borderRadius: '20px',
  marginTop: '30px',
  marginBottom: '30px',
  paddingTop: '20px',
  paddingBottom: '30px',
  overflow: 'auto'
};

const Background = {
  width: '100%',
  height: '100%',
  minHeight: '600px',
  overflow: 'auto',
  display: 'flex',
  marginBottom: 0,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'top left',
  backgroundSize: '100%'
};

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
        <div
          style={{
            ...Background,
            backgroundColor: colors.PINK,
            flexDirection: 'column'
          }}
        >
          <div style={Banner}>
            <Header />
          </div>
          <div style={Section}>
            <h1>TODO: About</h1>
            <p>Welcome to my site</p>
          </div>
        </div>
        <div
          style={{
            ...Background,
            background: `linear-gradient(${colors.PINK}, ${colors.ORANGE});`
          }}
        >
          <div style={Section}>
            <h1>TODO: Chat</h1>
          </div>
        </div>
        <div
          style={{
            ...Background,
            backgroundColor: colors.ORANGE,
            backgroundImage: 'url(../static/sunset.png)',
            backgroundPosition: 'bottom left'
          }}
        >
          <div style={{ ...HalfSectionLeft }}>
            <h1>TODO: Rooms</h1>
          </div>
          <div style={HalfSectionRight}>
            <h1>TODO: Donate</h1>
          </div>
        </div>
        <div
          style={{
            ...Background,
            backgroundColor: colors.YELLOW,
            backgroundImage: 'url(../static/surf.png)',
            textAlign: 'center',
            flexDirection: 'column',
            minHeight: '1300px'
          }}
        >
          <div style={Section}>
            <Player
              playing={this.props.playing}
              queue={this.props.queue}
              users={this.props.users}
              session={this.props.session}
            />
          </div>
          <p>
            dartyti.me is based on the open source project{' '}
            <a href="https://developer.spotify.com/community/showcase/c/">C - Listening Room</a>. The source code is
            available <a href="https://github.com/theCaiGuy/dartyti.me">here</a>. Logo courtesy of{' '}
            <a href="https://logomakr.com/">Logo Makr</a>.
          </p>
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
