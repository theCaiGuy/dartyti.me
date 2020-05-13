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
  alignItems: 'stretch',
  width: 'auto',
  justifyContent: 'center',
  textAlign: 'center'
};

const logoStyle = {
  height: '169px',
  width: '169px',
  marginRight: '69px'
};

const userHeader = {
  justifyContent: 'center',
  alignItems: 'flex',
  overflow: 'auto'
};

const userNameStyle = {
  lineHeight: '30px',
  fontSize: '18px',
  float: 'left',
  paddingLeft: '20px',
  fontWeight: 'bold'
};

const userImgStyle = {
  borderRadius: '50%'
};

const mediaImgStyle = {
  float: 'left',
  marginRight: '10px'
};

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div style={headerStyle}>
    <div style={logoStyle}>
      <img src={'../static/dartytime_logo.png'} width="169" height="169" alt="dartyti.me" />
    </div>
    <div>
      <img src={'../static/word_logo.png'} width="360" alt="dartyti.me" />
      <div>
        {session.user ? (
          <div style={userHeader}>
            <div style={mediaImgStyle}>
              <img
                style={userImgStyle}
                src={
                  (session.user.images && session.user.images.length && session.user.images[0].url) ||
                  '../static/user-icon.png'
                }
                width="40"
                height="40"
                alt={getNameFromUser(session.user)}
                title={getNameFromUser(session.user)}
              />
            </div>
            <div style={userNameStyle}>
              {getNameFromUser(session.user)
                ? `Welcome to the darty, ${getNameFromUser(session.user).split(' ')[0]}`
                : 'Welcome to the darty'}
            </div>
          </div>
        ) : (
          <button className="btn btn--dark" style={{ float: 'left', width: '360px' }} onClick={login}>
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
