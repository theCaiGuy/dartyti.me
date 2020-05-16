import { connect } from 'react-redux';
import { login } from '../actions/sessionActions';
import { mutePlayback, unmutePlayback } from '../actions/playbackActions';
import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import * as colors from '../constants/color_scheme';

const headerStyle = {
  backgroundColor: '#fff',
  padding: '10px',
  height: 'auto',
  display: 'flex',
  alignItems: 'stretch',
  width: 'auto',
  justifyContent: 'center',
  textAlign: 'center',
  width: 'auto'
};

const logoStyle = {
  float: 'left',
  paddingRight: '69px',
  width: '100%',
  maxWidth: '169px'
};

const userHeader = {
  alignItems: 'flex',
  overflow: 'auto'
};

const userNameStyle = {
  height: '100%',
  fontSize: '18px',
  fontWeight: 'bold',
  color: colors.GRAY
};

const logoUserBox = {
  alignContent: 'center'
};

const userImgStyle = {
  borderRadius: '50%',
  paddingRight: '10px'
};

const wordLogoStyle = {
  marginTop: '10px',
  width: '100%',
  maxWidth: '420px'
};

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div style={headerStyle}>
    <div style={logoUserBox}>
      <div style={logoStyle}>
        <img src={'../static/dartytime_logo.png'} width="169" height="169" alt="dartyti.me" />
      </div>
      <img src={'../static/word_logo.png'} alt="dartyti.me" style={wordLogoStyle} />
      <div>
        {session.user ? (
          <div style={userHeader}>
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
            <div style={userNameStyle}>
              {getNameFromUser(session.user)
                ? `Welcome to the darty, ${getNameFromUser(session.user).split(' ')[0]}`
                : 'Welcome to the darty'}
            </div>
          </div>
        ) : (
          <button className="btn btn--dark" style={{ width: '360px' }} onClick={login}>
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
