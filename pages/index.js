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
              width: 100%;
              height: auto;
              text-align: center;
              align-content: center;
              margin-left: auto;
              margin-right: auto;
              padding: 40px;
            }
          `}
        </style>
        <div className="Section">
          <h1>Chat</h1>
        </div>
        <div className="Section">
          <h1>Rooms</h1>
        </div>
        <div className="Section">
          <h1>Donate</h1>
        </div>
        <div className="Section">
          <Player
            playing={this.props.playing}
            queue={this.props.queue}
            users={this.props.users}
            session={this.props.session}
          />
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
