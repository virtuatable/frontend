<template>
  <v-app-bar dark dense app>
    <v-btn text to="/" class="hidden-xs-only">
      <span class="mr-2">{{ $t('buttons.home') }}</span>
    </v-btn>
    <v-btn to="/" icon class="hidden-sm-and-up">
      <v-icon>mdi-home</v-icon>
    </v-btn>

    <v-spacer></v-spacer>

    <v-btn text to="signup" class="hidden-xs-only">
      <span class="mr-2">{{ $t('buttons.signup') }}</span>
    </v-btn>
    <v-btn text to="login" class="hidden-xs-only">
      <span class="mr-2">{{ $t('buttons.signin') }}</span>
    </v-btn>

    <v-menu class="hidden-sm-and-up" v-model="displayMenu">
      <template v-slot:activator="{ on }">
        <v-app-bar-nav-icon class="hidden-sm-and-up" v-on="on"></v-app-bar-nav-icon>
      </template>
      <v-list>
        <v-list-item to="signup">
          <v-list-item-title>{{ $t('buttons.signup') }}</v-list-item-title>
        </v-list-item>
        <v-list-item to="login">
          <v-list-item-title>{{ $t('buttons.signin') }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
  export default {
    data: () => ({
      displayMenu: false
    })
  }
</script>

<i18n>
{
  "en_GB": {
    "buttons": {
      "home": "Home",
      "signin": "Sign in",
      "signup": "Sign up"
    }
  },
  "fr_FR": {
    "buttons": {
      "home": "Accueil",
      "signin": "Connexion",
      "signup": "Inscription"
    }
  }
}
</i18n>