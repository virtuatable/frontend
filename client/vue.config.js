module.exports = {
  transpileDependencies: [
    "vuetify"
  ],
  outputDir: "../server/public",
  pluginOptions: {
    i18n: {
      locale: 'fr_FR',
      fallbackLocale: 'en_GB',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
