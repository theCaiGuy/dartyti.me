const dev = process.env.NODE_ENV !== 'production';

module.exports = {
  HOST: dev ? 'http://localhost:3000' : 'http://dartyti.me'
};
