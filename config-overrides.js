const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = function override(config, env) {
  if (!config.plugins) {
    config.plugins = []
  }

  config.plugins.push(
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/vendor/gapi.es5.js', to: 'vendor' }
      ]
    })
  )

  config.module = config.module || {}

  config.module.rules = config.module.rules || []
  config.module.rules.push(
    {
      test: /\.(es5\.js)$/i,
      loader: 'file-loader',
      options: {
        outputPath: (url, resourcePath, context) => {

          if (/vendor/.test(context)) {
            return `vendor/${url}`
          }

          return `public/${url}`
        }
      }
    }
  )

  /*
  config.module.loaders = config.module.loaders || []
  const BABEL_QUERY = { presets: ["es2015", "react"] }
  config.module.loaders.push(
    { test: /\.es5\.js$/, loader: "babel", query: BABEL_QUERY, exclude: /node_modules/ }
  )
  */

  return config
}
