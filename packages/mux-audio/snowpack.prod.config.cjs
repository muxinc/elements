// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  extends: "./snowpack.common.config.cjs",
  mount: {
    src: { url: "/" },
  },
  optimize: {
    entrypoints: ["index.js"],
    bundle: true,
    minify: true,
    target: "es2019",
  },
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: "./dist",
  },
};
