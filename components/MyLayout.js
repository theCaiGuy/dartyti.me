import Header from './Header';

const background_styles = {
  backgroundColor: 'white',
  width: '100%',
  display: 'inline-block',
  alignContent: 'center'
};

const Layout = props => (
  <div style={background_styles}>
    <style jsx>{`
      div {
        color: #333;
        font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
        font-size: 15px;
      }
    `}</style>
    <Header />
    {props.children}
  </div>
);

export default Layout;
