module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  "filenameHashing": false,
  "outputDir": "../server/public",

  pluginOptions: {
    i18n: {
      locale: 'fr',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
