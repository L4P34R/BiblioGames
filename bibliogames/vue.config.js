const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      new (require('webpack')).DefinePlugin({
        __VUE_OPTIONS_API__: JSON.stringify(true), // Active l'API Options
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false), // Désactive les devtools en production
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(false), // Désactive les détails des erreurs d'hydratation en production
      }),
    ],
  },
  devServer: {
    allowedHosts: 'all'
  }
});
