const glob = require('glob');
const path = require('path');

const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const MomentTimezoneLocalesPlugin = require('moment-timezone-data-webpack-plugin');

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
  },
  plugins: [
    new MomentLocalesPlugin(),
    new MomentTimezoneLocalesPlugin({
      matchZones: ['America/Los_Angeles'],
      startYear: 2019,
      endYear: 2030,
    })
  ]
};