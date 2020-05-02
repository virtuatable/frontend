<template>
  <v-app>
    <v-app-bar dark dense app>
      <v-btn text to="/">
        <span class="mr-2">Home</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="signup">
        <span class="mr-2">Sign up</span>
      </v-btn>
      <v-btn text to="login">
        <span class="mr-2">Sign in</span>
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
    ...mapState(['snackbar'])
  }
};
</script>

<i18n>
{
  "fr": {
    "buttons": {
      "close": "Fermer"
    }
  }
}
</i18n>