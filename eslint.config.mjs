// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

export default withNuxt(
  {
    // `save/` is a committed snapshot of an old build; `vendor/` is third-party code kept verbatim.
    ignores: ["save/**", "vendor/**"],
  }
  // Your custom configs here
);
