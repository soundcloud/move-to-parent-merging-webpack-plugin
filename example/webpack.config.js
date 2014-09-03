var MoveToParentMergingPlugin = require("../");

module.exports = {
  entry: "./index.js",
  output: {
    path: "output",
    filename: "bundle.js"
  },

  plugins: [
    new MoveToParentMergingPlugin(4)
  ]
};
