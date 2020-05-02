<template>
  <v-app>
    <v-app-bar dark dense app>
      <v-btn text to="/">
        <span class="mr-2">{{ $t('buttons.home') }}</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="signup">
        <span class="mr-2">{{ $t('buttons.signup') }}</span>
      </v-btn>
      <v-btn text to="login">
        <span class="mr-2">{{ $t('buttons.signin') }}</span>
      </v-btn>
    </v-app-bar>

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
import {mapState} from 'vuex'

export default {
  name: 'App',
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