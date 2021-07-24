// vue.config.js
module.exports = {
  // настройки...
  publicPath: process.env.NODE_ENV === 'production' ? '' : '/',
  outputDir: 'dist',
  assetsDir: 'app',
  productionSourceMap: false,
  filenameHashing: true,

}

