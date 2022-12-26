require("dotenv").config();

const path = require("path");
const CopyPlugin = require('copy-webpack-plugin');

/*
  What should go here?  Great question!

  Before you go to documentation, verify which version of webpack
  you are using.

  Use this config to copy production versions of your
  index.html and styles.css to dist folder upon build
*/

module.exports = {
  entry: './client/src/index.jsx',
  output: {
    path: path.resolve(__dirname, './client/dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
    ],
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "./client/src/index.html", to: "index.html", toType: "file" },
        { from: "./client/src/styles.css", to: "styles.css", toType: "file" },
      ],
    }),
  ],
  mode: 'development',
};
