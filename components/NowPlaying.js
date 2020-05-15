import React from 'react';
import { connect } from 'react-redux';

import * as colors from '../constants/color_scheme';
import { voteSkip } from '../actions/voteActions';

import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);

const nowPlaying = {
  backgroundColor: colors.GRAY,
  color: 'white',
  height: 'auto',
  position: 'relative',
  width: '100%',
  borderRadius: '10px',
  alignItems: 'stretch'
};

const nowPlayingMedia = {
  padding: '0px',
  overflow: 'hidden',
  _overflow: 'visible',
  alignItems: 'left'
};

const albumArt = {
  float: 'left',
  marginRight: '20px',
  borderRadius: '10px',
  width: '300px',
  height: '300px'
};

const nowPlayingInfo = {
  marginLeft: '20px',
  marginRight: '20px',
  float: 'left',
  height: '100%',
  width: 'auto',
  maxWidth: '100%',
  justifyContent: 'center'
};

const nowPlayingTrackName = {
  fontSize: '3em',
  paddingTop: '1em',
  fontWeight: 'bold',
  textAlign: 'left',
  width: '100%'
};

const nowPlayingArtistName = {
  fontSize: '2em',
  paddingBottom: '0.7em',
  paddingTop: '0.5em',
  float: 'left',
  textAlign: 'left',
  width: '100%'
};

const nowPlayingProgressBar = {
  marginBottom: 0,
  height: '16px',
  width: '100%',
  borderRadius: '10px',
  backgroundColor: colors.GREEN
};

const nowPlayingUserImg = {
  borderRadius: '50%',
  float: 'left',
  height: '75px',
  width: '75px',
  marginBottom: '20px',
  marginRight: '20px',
  border: 'none'
};

const skipBtn = {
  borderRadius: '50%',
  float: 'left',
  height: '75px',
  width: '75px',
  marginBottom: '20px',
  marginRight: '20px',
  border: 'none',
  color: 'white',
  backgroundColor: colors.GREEN,
  cursor: 'pointer',
  fontSize: '15px'
};

class NowPlaying extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      start: Date.now(),
      currentPosition: 0
    };
    this.timer = null;
    this.tick = () => {
      this.setState({
        currentPosition: Date.now() - this.state.start + (this.props.position || 0)
      });
    };
  }
  componentDidUpdate(props) {
    if (this.props.track) {
      if (this.props.position !== props.position || this.props.track !== props.track) {
        this.setState({
          start: Date.now(),
          currentPosition: 0
        });
      }
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const percentage = this.props.track
      ? Math.min(((this.state.currentPosition * 100) / this.props.track.duration_ms).toFixed(2), 100) + '%'
      : 0;
    const userName = this.props.user ? this.props.user.display_name || this.props.user.id : '';
    return (
      <div style={nowPlaying}>
        <div style={nowPlayingMedia}>
          <div>
            <img
              style={albumArt}
              src={this.props.track ? this.props.track.album.images[1].url : '../static/dartytime_logo_alt.png'}
              width="300"
              height="300"
            />
          </div>
          <div style={nowPlayingInfo}>
            {this.props.track ? (
              <div>
                <div style={nowPlayingTrackName}>{this.props.track.name}</div>
                <div style={nowPlayingArtistName}>{this.props.track.artists.map(a => a.name).join(', ')}</div>
                {this.props.user ? (
                  <img
                    style={nowPlayingUserImg}
                    src={
                      (this.props.user.images && this.props.user.images.length && this.props.user.images[0].url) ||
                      '/static/user-icon.png'
                    }
                    alt={userName}
                    title={userName}
                  />
                ) : (
                  <div />
                )}
                <button
                  style={skipBtn}
                  onClick={() => {
                    this.props.voteSkip(this.props.track.id);
                  }}
                  disabled={!this.props.logged_in}
                >
                  <FontAwesomeIcon
                    icon={['fas', 'step-forward']}
                    color="white"
                    size="2x"
                    style={{ marginBottom: '5px' }}
                  />
                  <div>{`${this.props.total_votes} / ${Math.round(this.props.total_users / 2)}`}</div>
                </button>
              </div>
            ) : (
              <div>
                <div style={nowPlayingTrackName}>Nothing's playing...</div>
                <div style={nowPlayingArtistName}>Add more songs to the queue!</div>
              </div>
            )}
          </div>
          <div></div>
        </div>
        <div>
          <div style={{ ...nowPlayingProgressBar, width: percentage }} />
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  voteSkip: id => dispatch(voteSkip(id))
});

const mapStateToProps = state => ({
  session: state.session
});

export default connect(mapStateToProps, mapDispatchToProps)(NowPlaying);
