const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // Your main JavaScript file
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'bundle.js', // Output file
  },
  resolve: {
    fallback: {
      crypto: require.resolve('crypto-browserify'), // Polyfill for crypto
    },
  },
};
