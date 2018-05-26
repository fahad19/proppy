const path = require('path');

const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV === 'production'
  ? 'production'
  : 'development';

const filename = NODE_ENV === 'production'
  ? '[name].min.js'
  : '[name].js';

const plugins = [
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
  }),
];

if (NODE_ENV === 'production') {
  plugins.push(new CompressionPlugin({
    asset: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js/,
  }));
}

module.exports = {
  entry: {
    'proppy-preact': path.join(__dirname, '/src/index.js'),
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: filename,
    libraryTarget: 'umd',
    library: 'ProppyPreact',
  },
  externals: {
    preact: 'Preact',
    proppy: 'Proppy',
  },
  mode: process.env.NODE_ENV || 'development',
  devtool: 'source-map',
  plugins: plugins,
  performance: {
    hints: false,
  },
  resolve: {
    extensions: [
      '.ts',
      '.tsx',
      '.js',
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
      },
    ],
  },
};
