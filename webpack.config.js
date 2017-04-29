const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: __dirname,
  entry: './src/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [
      './node_modules',
      './src',
    ],
  },
  devtool: 'cheap-module-source-map',
  stats: {
    colors: true,
    resons: true,
    chunks: false,
  },
}
