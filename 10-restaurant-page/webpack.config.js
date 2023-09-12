const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "inline-source-map",
  entry: {
    script: "./src/script.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new htmlWebpackPlugin({
      title: "Restaurant Page",
    }),
  ],
  // loaders:
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // font loader
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(svg|gif|jpg|jpeg|png)$/i,
        type: "asset/resource",
      },
    ],
  },
};
