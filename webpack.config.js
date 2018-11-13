/* eslint-env node */
let webpack = require("webpack");
let path = require("path");

module.exports = {
  entry: {
    "rx4": "./src/rx4.js",
    "rx6": "./src/rx6.js",
  },
  output: {
    filename: "[name].js",
    library: "disposable-component",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "lib"),
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        loader: "babel-loader",
      }
    ],
  },
  devtool: "source-map",
  externals: [
    /^rx$/,
    /^rxjs$/
  ],
};