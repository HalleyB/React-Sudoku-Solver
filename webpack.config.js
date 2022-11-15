const path = require("path");

module.exports = {
  mode: "development",
  entry : './src/index.jsx',
  devtool: 'source-map',
  output : {
    filename: 'bundle.js',
    publicPath: '/',
    path: path.join(__dirname, "/client")
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: "defaults" }],
              '@babel/preset-react'
            ],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  }
};