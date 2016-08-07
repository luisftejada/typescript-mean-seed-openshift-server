var path = require('path');
var fs = require('fs');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  entry: './src/server.ts',
  target: 'node',
  output: {
    filename: 'dist/server.js'
  },
  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loader: 'ts-loader' }
    ]
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/public', to: 'dist/public'},
      { from: 'src/views', to: 'dist/views'},

    ], {
      copyUnmodified: true
    })
  ],
  externals: nodeModules
}

// node: {
//     net: "empty",
//     tls: "empty"
// }
