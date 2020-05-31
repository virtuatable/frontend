<template>
  <div class="login">
    <v-container fluid class="fill-height">
      <v-row justify="center" align="center" no-gutters>
        <v-col cols="12" sm="8" md="6">
          <v-form @submit.prevent.stop="submit">
            <v-container fluid>
              <v-row dense>
                <v-col cols="12">
                  <h1>{{ $t('title.login') }}</h1>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-alert type="error" v-if="loginError">
                    {{ $t('rules.login') }}
                  </v-alert>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    v-model="login.email"
                    outlined
                    :label="$t('labels.email')"
                    hide-details="auto"
                    :rules="[required, format]"
                    @keyup="resetLoginError()"
                    :validate-on-blur="true"
                  >
                    <template v-slot:message="{ message }">
                      {{ $t(message) }}
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    v-model="login.password"
                    type="password"
                    outlined
                    hide-details="auto"
                    :label="$t('labels.password')"
                    :rules="[required]"
                    @keyup="resetLoginError()"
                  >
                    <template v-slot:message="{ message }">
                      {{ $t(message) }}
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense class="pt-2">
                <v-col cols="12">
                  <v-btn type="submit">{{ $t('buttons.login') }}</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { mapMutations, mapState } from 'vuex'
  import api from '@/lib/api'

  export default {
    components: {
      ValidationObserver,
      ValidationProvider
    },
    data: () => ({
      login: {
        email: "",
        password: ""
      },
      loginError: false
    }),
    computed: {
      ...mapState(['gender'])
    },
    methods: {
      ...mapMutations(['showSnackbar', 'setToken']),
      submit() {

        api('post', '/sessions', this.login).then(response => {
          this.setToken(response.data.token)
          this.$router.push('/')
        })
        .catch(error => {
          this.loginError = true
        })
      },
      required: (value) => !!value || 'rules.required',
      format(value) {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        return regex.test(value) || 'rules.format'
      },
      resetLoginError(value) {
        this.loginError = false
      }
    }
  }
</script>

<i18n>
  {
    "en_GB": {
      "buttons": {
        "login": "Se connecter"
      },
      "labels": {
        "email": "Email address"
      },
      "messages": {
        "confirmation": "Successfully logged in"
      },
      "rules": {
        "format": "This field has not the correct format",
        "login": "The given credentials seem to be wrong",
        "required": "This field is required"
      },
      "title": {
        "login": "Connection"
      }
    },
    "fr_FR": {
      "buttons": {
        "login": "Log in"
      },
      "labels": {
        "email": "Adresse e-mail"
      },
      "messages": {
        "confirmation": "Connexion réussie"
      },
      "rules": {
        "format": "Le format du champ est incorrect",
        "login": "Les identifiants entrés semblent incorrects",
        "required": "Ce champ est requis"
      },
      "title": {
        "login": "Connexion"
      }
    }
  }
</i18n>