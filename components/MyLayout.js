import GlobalFonts from './HeaderFont';

const background_styles = {
  backgroundColor: 'white',
  width: '100%',
  display: 'inline-block',
  alignContent: 'center'
};

const Layout = props => (
  <div style={background_styles}>
    <GlobalFonts />
    <style jsx>{`
      div {
        color: #333;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 18px;
      }
    `}</style>
    {props.children}
  </div>
);

export default Layout;
