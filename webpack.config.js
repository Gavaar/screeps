//webpack.config.js
const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    main: "./src/main.ts",
  },
  output: {
    path: path.resolve(__dirname, './screeps.com/default'),
    filename: "main.js" // <--- Will be compiled to this single file
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      "@creeps": path.resolve(__dirname, 'src/creeps/'),
      "@spawns": path.resolve(__dirname, 'src/spawns/'),
      "@rooms": path.resolve(__dirname, 'src/rooms/'),
      "@common": path.resolve(__dirname, 'src/_common/'),
    }
  },
  module: {
    rules: [
      { 
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};