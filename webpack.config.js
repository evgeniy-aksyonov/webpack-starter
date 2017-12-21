const webpack = require('webpack');
const path = require('path');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssets = require('optimize-css-assets-webpack-plugin');

let config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './public'),
    filename: 'output.js'
  },
  resolve: { // These options change how modules are resolved
    extensions: ['.js', '.jsx', '.json', '.scss', '.css', '.jpeg', '.jpg', '.gif', '.png'], // Automatically resolve certain extensions
    alias: { // Create aliases
      images: path.resolve(__dirname, 'src/assets/images')  // src/assets/images alias
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/, // files ending with .js
        loader: "babel-loader", // use this (babel-core) loader,
        exclude: /node_modules/ // exclude the node_modules directory
      },
      {
        test: /\.scss$/,
        use: ['css-hot-loader'].concat(ExtractTextWebpackPlugin.extract({ // HMR for styles
          use: ['css-loader', 'sass-loader', 'postcss-loader'],
          fallback: "style-loader"
        }))
      },
      {
        test: /\.jsx$/,
        loader: "babel-loader",
        exclude: /node_modules/ // exclude the node_modules directory
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?context=src/assets/images/&name=images/[path][name].[ext]', {  // images loader
          loader: 'image-webpack-loader',
          query: {
            mozjpeg: {
              progressive: true,
            },
            gifsicle: {
              interlaced: false,
            },
            optipng: {
              optimizationLevel: 4,
            },
            pngquant: {
              quality: '75-90',
              speed: 3,
            },
          },
        }],
        include: __dirname,
        exclude: /node_modules/ // exclude the node_modules directory
      }
    ]
  },
  plugins: [
    new ExtractTextWebpackPlugin('styles.css')
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './public'), //directory to serve HTML from
    historyApiFallback: true, // history API for SPA, fallback to index.html
    inline: true, // if false - disable including client scripts(like livereload)
    open: true // open default browser while launching
  },
  devtool: 'eval-source-map' // enable devtool for better debugging experience
}

module.exports = config;

if (process.env.NODE_ENV === 'production') {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin(), // call the uglify js plugin
    new OptimizeCSSAssets()
  );
}
