const path = require("path");

module.exports = {
  resolve: {
    fallback: {
      "fs": require.resolve("fs-browserify"),
      "path": require.resolve("path-browserify"),
      "os": require.resolve("os-browserify/browser"),
    },
  },
};