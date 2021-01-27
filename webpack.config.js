const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/js/index.js',

  output: {
    filename: 'main.js',
    path: path.join(__dirname, `dist/js`)
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      }
    ]
  },

  devtool: 'source-map',

  mode: 'production'
};
