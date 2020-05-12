import { connect } from 'react-redux';
import { login } from '../actions/sessionActions';
import { mutePlayback, unmutePlayback } from '../actions/playbackActions';
import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';

const headerStyle = {
  backgroundColor: '#fff',
  padding: '20px 40px',
  height: 'auto',
  overflow: 'auto',
  display: 'flex',
  width: '100%',
  alignItems: 'stretch'
};

const logoStyle = {
  height: '128px',
  width: '169px'
};

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div style={headerStyle}>
    <div style={logoStyle}>
      <img src={'../static/dartytime_logo.png'} width="128" height="128" alt="dartyti.me" />
    </div>
    <div className="logo_words">
      <h1>dartyti.me</h1>
      <div>
        {session.user ? (
          <div className="media user-header">
            <style jsx>{`
              .logo {
                display: inline-block;
                width: ;
              }
              .logo_words {
                display: inline-block;
                padding: 30px;
              }
              .user-header {
                float: left;
                width: 150px;
              }
              .user-image {
                border-radius: 50%;
              }
              .user-name {
                line-height: 30px;
                font-weight: bold;
              }
              .media,
              .media__bd {
                overflow: hidden;
                _overflow: visible;
                zoom: 1;
              }
              .media .media__img {
                float: left;
                margin-right: 10px;
              }
            `}</style>
            <div className="media__img">
              <img
                className="user-image"
                src={
                  (session.user.images && session.user.images.length && session.user.images[0].url) ||
                  '/static/user-icon.png'
                }
                width="30"
                height="30"
                alt={getNameFromUser(session.user)}
              />
            </div>
            <div className="user-name media__bd">{getNameFromUser(session.user)}</div>
          </div>
        ) : (
          <button className="btn btn--dark" style={{ float: 'left' }} onClick={login}>
            <style jsx>{ButtonStyle}</style>
            <style jsx>{ButtonDarkStyle}</style>
            Login with Spotify to sync music
          </button>
        )}
      </div>
    </div>
  </div>
);

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(login()),
  mutePlayback: () => dispatch(mutePlayback()),
  unmutePlayback: () => dispatch(unmutePlayback())
});

const mapStateToProps = state => ({
  session: state.session,
  muted: state.playback.muted
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
