module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],

  "filenameHashing": false,
  "outputDir": "../server/public",

  pluginOptions: {
    i18n: {
      locale: 'fr_FR',
      fallbackLocale: 'en_GB',
      localeDir: 'locales',
      enableInSFC: true
    }
  }
}
