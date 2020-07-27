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
    disableHostCheck: true,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: { auto: true },
            },
          },
        ],
      },
      {
        test: /\.(png|gif|woff|woff2|eot|ttf|svg|otf)$/,
        loader: "url-loader?limit=100000",
      },
    ],
  },
};
