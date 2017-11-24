const path = require('path');

module.exports = {
  context: path.resolve(__dirname, './src'),
  devtool: 'inline-source-map',
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  },
  module: {
    rules:[
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.html$/,
        loader: "html-loader?minimize"
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/, 
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [
      '.js', '.vue'
    ],
    alias: {
      vue: 'vue/dist/vue.common.js'
    }
  }
};