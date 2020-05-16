import { connect } from 'react-redux';
import { login } from '../actions/sessionActions';
import { mutePlayback, unmutePlayback } from '../actions/playbackActions';
import ButtonStyle from './ButtonStyle';
import ButtonDarkStyle from './ButtonDarkStyle';
import * as colors from '../constants/color_scheme';
import GlobalFonts from './HeaderFont';

const headerStyle = {
  height: '100%',
  alignItems: 'stretch',
  width: '98%',
  textAlign: 'center',
  overflow: 'auto',
  marginTop: '10px',
  marginBottom: '10px',
  marginLeft: '1%',
  marginRight: '1%',
  display: 'inline-block',
  position: 'relative'
};

const logoStyle = {
  width: '15%',
  marginRight: '1%',
  marginLeft: '1%',
  minWidth: '69px',
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
  alignSelf: 'center',
  alignItems: 'center',
  width: '50%',
  marginLeft: '25%',
  marginRight: '25%',
  overflow: 'hidden',
  _overflow: 'visible'
};

const userImgStyle = {
  borderRadius: '50%',
  paddingRight: '10px'
};

const wordLogoStyle = {
  marginTop: '10px',
  marginBottom: '10px',
  width: '100%',
  fontSize: '88px',
  fontFamily: 'Ballpark',
  color: colors.BLUE
};

const party_names = ['Endless KA', 'UnlimiteDTD', 'Dunch', 'Linner', 'Terman Fountain'];

const getNameFromUser = user => {
  return user.display_name || user.id;
};

const Header = ({ session, muted, mutePlayback, unmutePlayback, login }) => (
  <div style={headerStyle}>
    <div>
      <img src={'../static/dartytime_logo.png'} alt="dartyti.me" style={{ ...logoStyle, float: 'left' }} />
    </div>

    <div>
      <img src={'../static/dartytime_logo_alt.png'} alt="dartyti.me" style={{ ...logoStyle, float: 'right' }} />
    </div>

    <div style={logoUserBox}>
      <div style={wordLogoStyle}>Darty Time</div>
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
              ? `We're glad you're here, ${getNameFromUser(session.user).split(' ')[0]}`
              : `We're glad you're here`}
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
