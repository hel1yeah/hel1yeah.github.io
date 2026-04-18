// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    compilerOptions: {
      types: ["@nuxtjs/i18n"],
    },
  }
  // Your custom configs here
);
