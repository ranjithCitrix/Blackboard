const path = require("path");

module.exports = {
  entry: "./src/script/index",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "script.js",
    libraryTarget: "this", // very important for Graal to access functions by name
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
};
