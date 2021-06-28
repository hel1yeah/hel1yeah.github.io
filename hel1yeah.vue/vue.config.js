// vue.config.js
module.exports = {
  // настройки...
  publicPath: process.env.NODE_ENV === "production" ? "" : "/",
  outputDir: "dist",
  assetsDir: "app",
  productionSourceMap: false,
  filenameHashing: true,

  // chainWebpack: config => {
  //   const types = ["vue-modules", "vue", "normal-modules", "normal"];
  //   types.forEach(type =>
  //     addStyleResource(config.module.rule("scss").oneOf(type))
  //   );
  // }
};

// доступ из любого компонента к переменным scss
// const path = require("path");
// function addStyleResource(rule) {
//   rule
//     .use("style-resource")
//     .loader("style-resources-loader")
//     .options({
//       patterns: [path.resolve(__dirname, "./src/assets/scss/_vars.scss")]
//     });
// }
