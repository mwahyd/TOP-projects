const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
  },
  optimization: {
    runtimeChunk: "single",
  },
  entry: {
    script: "./src/script.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Restaurant Page",
    }),
  ],
};
