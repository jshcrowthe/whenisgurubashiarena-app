const glob = require('glob');
const path = require('path');

module.exports = {
  mode: "development",
  entry: glob.sync(__dirname + "/src/components/**/*.js"),
  output: {
      "path": __dirname+'/dist',
      "filename": "[name].js"
  },
  devtool: "source-map",
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000
  }
};