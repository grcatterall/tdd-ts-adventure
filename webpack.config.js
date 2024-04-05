// webpack.config.js
const path = require('path');

module.exports = {
  entry: './dist/src/game-web.js', // Entry point of your application
  output: {
    filename: 'bundle.js', // Name of the bundled file
    path: path.resolve(__dirname, 'dist'), // Directory where bundled file will be placed
  },
};