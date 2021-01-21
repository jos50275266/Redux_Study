const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "app.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 9000,
  },
  mode: "development",
  devtool: "source-map",
};
