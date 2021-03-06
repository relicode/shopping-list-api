const path = require('path')
const slsw = require('serverless-webpack')


const MODE_DEVELOPMENT = 'development'
const MODE_PRODUCTION = 'production'

module.exports = {
  mode: MODE_DEVELOPMENT,
  entry: slsw.lib.entries,
  resolve: {
    alias: {
      '@functions': path.resolve(__dirname, 'src/functions/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
    extensions: [
      '.js',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ],
      }
    ]
  },
}
