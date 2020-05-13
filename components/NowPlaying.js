import React from 'react';
import * as colors from '../constants/color_scheme';

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
  componentWillReceiveProps(props) {
    if (this.props.position !== props.position || this.props.track !== props.track) {
      this.setState({
        start: Date.now(),
        currentPosition: 0
      });
    }
  }
  componentDidMount() {
    this.timer = setInterval(this.tick, 300);
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    const percentage =
      Math.min(((this.state.currentPosition * 100) / this.props.track.duration_ms).toFixed(2), 100) + '%';
    const userName = this.props.user.display_name || this.props.user.id;
    return (
      <div className="now-playing">
        <style jsx>{`
          .now-playing {
            background-color: ${colors.GRAY};
            color: #fff;
            height: auto;
            position: relative;
            width: 100%;
            border-radius: 10px;
          }
          .now-playing__text {
            padding: 0px;
            overflow: hidden;
            _overflow: visible;
            align-items: left;
          }
          .now-playing__bd {
            padding-left: 30px;
            float: left;
          }
          .now-playing__track-name {
            font-size: 3em;
            padding-top: 2em;
            font-weight: bold;
            text-align: left;
          }
          .now-playing__artist-name {
            font-size: 2em;
            padding-bottom: 2em;
            padding-top: 0.5em;
            float: left;
            text-align: left;
          }
          .now-playing__user {
            padding-top: 0.5em;
          }
          .now-playing__progress_bar {
            bottom: 0;
            background-color: ${colors.GREEN};
            height: 16px;
            width: 100%;
            border-radius: 10px;
          }
          .media,
          .media__bd {
            zoom: 1;
          }
          .media .media__img {
            float: left;
            margin-right: 10px;
            border-radius: 10px;
          }
          .user-image {
            border-radius: 50%;
            float: right;
            height: 100px;
            width: 100px;
            margin: 10px;
          }
          .user-name {
            line-height: 30px;
          }
        `}</style>
        <div className="now-playing__text media">
          <div>
            <img className="media__img" src={this.props.track.album.images[1].url} width="300" height="300" />
          </div>
          <div className="now-playing__bd media__bd">
            <div className="now-playing__track-name">{this.props.track.name}</div>
            <div className="now-playing__artist-name">{this.props.track.artists.map(a => a.name).join(', ')}</div>
          </div>
          <div>
            <img
              className="user-image"
              src={
                (this.props.user.images && this.props.user.images.length && this.props.user.images[0].url) ||
                '/static/user-icon.png'
              }
              alt={userName}
              title={userName}
            />
          </div>
        </div>
        <div className="now-playing__progress">
          <div className="now-playing__progress_bar" style={{ width: percentage }} />
        </div>
      </div>
    );
  }
}

export default NowPlaying;
