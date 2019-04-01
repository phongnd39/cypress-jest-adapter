const path = require('path')

module.exports = {
  target: 'web',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
    publicPath: '/'
  }
}
