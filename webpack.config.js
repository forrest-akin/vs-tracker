const path = require('path')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')

const sourcePath = path.join(__dirname, 'src')

module.exports = function(env) {
  const isProd = env && env.prod ? true : false
  
  const config = {
    devtool: 'cheap-module-source-map',
    context: sourcePath,
    entry: './index.js',

    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js',
    },
    
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    
    resolve: {
      extensions: ['.js', '.jsx'],
      modules: [
        path.resolve(__dirname, 'node_modules'),
        sourcePath,
      ],
    },

    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        async: true,
        children: true,
        minChunks: 2,
      }),

      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(isProd ? "production" : "development") },
      }),
    ],
  }

  config.plugins.push(
    isProd
    ? new UglifyJSPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      },
    })
    : new webpack.NamedModulesPlugin()
  )

  return config
}
