import React, { Component } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';

import { searchTracks, searchTracksReset } from '../actions/searchActions';
import { queueTrack } from '../actions/queueActions';
import * as colors from '../constants/color_scheme';

class ResultsList extends Component {
  render() {
    const { results, focus } = this.props;
    return (
      <ul className="add-to-queue__search-results">
        <style jsx>{`
          .add-to-queue__search-results {
            border: 1px solid #999;
            list-style: none;
            padding: 0;
            position: absolute;
            margin-top: 0px;
            width: 66%;
          }
          .add-to-queue__search-results-item {
            padding: 5px 0 5px 5px;
            background-color: #fff;
          }
          .add-to-queue__search-results-item:hover {
            padding: 5px 0 5px 5px;
            background-color: #eee;
            cursor: pointer;
          }
          .container {
            display: flex;
          }
          .album-img {
            width: 64;
            padding-right: 1em;
          }
          .flex-item {
            flex-grow: 1;
          }
          .song-name {
            font-size: 1.3em;
            margin-bottom: 0.3em;
          }
        `}</style>
        {results.map((r, index) => {
          return (
            <li key={r.id} className="add-to-queue__search-results-item" onClick={() => this.props.onSelect(r.id)}>
              <div className="container">
                <div className="album-img">
                  <img
                    src={r.album.images[2] ? r.album.images[2].url : '../static/dartytime_logo_alt.png'}
                    width="64"
                    height="64"
                  />
                </div>
                <div className="flex-item">
                  <div className="song-name">{r.name}</div>
                  <div>{r.artists[0].name}</div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }
}

const inputStyle = {
  padding: '5px',
  height: '25px',
  fontSize: '18px',
  border: 'none',
  float: 'left',
  width: '100%'
};

const inputDiv = {
  border: 'solid',
  borderColor: colors.GREEN,
  height: 'auto',
  alignItems: 'stretch',
  overflow: 'auto',
  borderRadius: '10px',
  position: 'relative'
};

const searchDropdownStyle = {
  alignItems: 'stretch',
  marginTop: '1px'
};

class AddToQueue extends React.PureComponent {
  state = {
    text: this.props.text || '',
    focus: -1,
    search_hidden: true
  };

  handleChange = e => {
    const text = e.target.value;
    this.setState({ text: text });
    if (text !== '') {
      this.props.searchTracks(text);
      this.setState({
        search_hidden: false
      });
    } else {
      this.setState({ focus: -1 });
      this.props.searchTracksReset();
    }
  };

  handleSelectElement = id => {
    this.setState({ text: '' });
    this.props.queueTrack(id);
    this.props.searchTracksReset();
  };

  handleBlur = e => {
    // todo: this happens before the item from the list is selected, hiding the
    // list of results. We need to do this in a different way.
    // // this.setState({ focus: -1 });
    // this.props.searchTracksReset();
    // this.setState({ search_hidden: true })
  };

  handleFocus = e => {
    if (e.target.value !== '') {
      this.props.searchTracks(e.target.value);
    }
  };

  render() {
    const results = this.props.search.results;
    return (
      <div>
        <div style={inputDiv}>
          <input
            placeholder={'Click to search Spotify'}
            value={this.state.text}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            style={inputStyle}
          />
        </div>
        <div style={searchDropdownStyle}>
          {results && !this.state.search_hidden ? (
            <ResultsList results={results} onSelect={this.handleSelectElement} focus={this.state.focus} />
          ) : (
            <div />
          )}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  queueTrack: text => dispatch(queueTrack(text)),
  searchTracks: query => dispatch(searchTracks(query)),
  searchTracksReset: () => dispatch(searchTracksReset())
});

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, mapDispatchToProps)(AddToQueue);
