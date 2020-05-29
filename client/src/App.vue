<template>
  <v-app>
    <main-menu></main-menu>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-snackbar
      v-model="snackbar.shown"
      :color="snackbar.color"
      :bottom="true"
      :timeout="snackbar.timeout"
    >
      {{snackbar.text}}
      <v-btn dark text @click="snackbar.shown = false">
        {{ $t('buttons.close') }}
      </v-btn>
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import MainMenu from '@/components/MainMenu.vue'

export default {
  name: 'App',
  components: { MainMenu },
  computed: {
    ...mapState(['snackbar', 'locale'])
  }
};
</script>

<i18n>
{
  "en_GB": {
    "buttons": {
      "close": "Close",
      "home": "Home",
      "signin": "Sign in",
      "signup": "Sign up"
    }
  },
  "fr_FR": {
    "buttons": {
      "close": "Fermer",
      "home": "Accueil",
      "signin": "Connexion",
      "signup": "Inscription"
    }
  }
}
</i18n>