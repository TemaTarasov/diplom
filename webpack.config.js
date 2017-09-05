const webpack = require('webpack'),
      path = require('path'),
      env = process.env.NODE_ENV,
      dev = env === 'development';

module.exports = {
  entry: './client',
  output: {
    path: path.resolve(__dirname, 'public/assets/js/dist'),
    filename: 'bundle.js',
    publicPath: './public/assets/'
  },

  watch: dev,
  watchOptions: {
    aggregateTimeout: 100
  },

  devtool: dev ? '': 'inline-source-map',

  plugins: dev ? []: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true,
        unsafe: true
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.styl$/,
        loader: 'style-loader!css-loader!stylus-loader',
      }
    ]
  }
}