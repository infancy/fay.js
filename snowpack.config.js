// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    /* ... */
  },
  plugins: [
    '@snowpack/plugin-typescript',
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    //hmr: false
  },
  buildOptions: {
    /* ... */
  },
};
