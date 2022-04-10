const path = require('path')

const resolve = function(dir) {
  return path.join(__dirname, dir)
}
const isProduction = process.env.NODE_ENV === 'production'
// 还得看nodejs
const port = process.env.port || process.env.npm_config_port || 1111
module.exports = {
  publicPath: isProduction ? '/app' : '/',
  assetsDir: 'static',
  productionSourceMap: false,
  transpileDependencies: [
    'screenfull'
  ],
  devServer: {
    port: port,
    open: true,
    before: require('./mock/mock-server.js')
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    }
  }
}