// import path from 'path';

const path = require("path");
// export default {
module.exports = {
  mode: "development",
  entry: path.resolve(__dirname, "src", "app"),
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  devServer: {
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      //   {
      //     test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
      //     loader: "url-loader",
      //     options: {
      //       limit: 10000,
      //     },
      //   },
    ],
  },
};
