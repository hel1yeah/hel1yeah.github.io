const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  outputDir: 'dist',
  assetsDir: 'app',
  productionSourceMap: false,
  filenameHashing: true,
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      // изменение конфигурации для production...
    } else {
      // изменения для разработки...
    }
  },
  chainWebpack: (config) => {
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) =>
      addStyleResource(config.module.rule('scss').oneOf(type)),
    )
  },
  devServer: {
    proxy: 'http://localhost:8080',
  },
}

function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/assets/scss/_vars.scss')],
    })
}
