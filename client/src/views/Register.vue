<template>
  <div class="register">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="8">
          <h1>{{$t('title.registration')}}</h1>
          <v-form ref="registerForm" @submit.prevent.stop="register" :value="validForm">
            <v-container>
              <v-row class="py-1">
                <v-text-field
                  :label="$t('labels.username')"
                  :rules="[
                    required('username'),
                    minLength('username', 6),
                    unicity('username')
                  ]"
                  hide-details="auto"
                  outlined
                  v-model="account.username"
                  @change="resetUsed('username')"
                ></v-text-field>
              </v-row>
              <v-row class="py-1">
                <v-text-field
                  class="pr-1"
                  :label="$t('labels.password')"
                  type="password"
                  :rules="[required('password')]"
                  hide-details="auto"
                  outlined
                  v-model="account.password"
                ></v-text-field>
                <v-text-field
                  class="pl-1"
                  :label="$t('labels.password_confirmation')"
                  type="password"
                  :rules="[
                    required('password confirmation'),
                    confirmation
                  ]"
                  hide-details="auto"
                  outlined
                  v-model="account.password_confirmation"
                ></v-text-field>
              </v-row>
              <v-row class="py-1">
                <v-text-field
                  :label="$t('labels.email')"
                  :rules="[
                    required('email'),
                    unicity('email'),
                    emailFormat
                  ]"
                  hide-details="auto"
                  outlined
                  v-model="account.email"
                  @change="resetUsed('email')"
                ></v-text-field>
              </v-row>
              <v-row class="py-1">
                <v-text-field class="pr-1" :label="$t('labels.firstname')" hide-details="auto" outlined v-model="account.firstname"></v-text-field>
                <v-text-field class="pl-1" :label="$t('labels.lastname')" hide-details="auto" outlined v-model="account.lastname"></v-text-field>
              </v-row>
              <v-row class="py-1">
                <v-select
                  class="pr-1"
                  :items="languages"
                  v-model="account.language"
                  :label="$t('labels.languages')"
                  outlined
                  @change="setLocale(account.language)">
                </v-select>
                <v-select
                  class="pl-1"
                  :items="genders"
                  v-model="account.gender"
                  :label="$t('labels.genders')"
                  outlined>
                </v-select>
              </v-row>
              <v-row>
                <v-btn type="submit">{{$t('buttons.submit')}}</v-btn>
              </v-row>
            </v-container>
          </v-form>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import api from '@/lib/api.js'
  import {mapMutations} from 'vuex'
  
  export default {
    data: () => ({
      used: {
        username: false,
        email: false
      },
      account: {
        username: '',
        password: '',
        password_confirmation: '',
        email: '',
        firstname: '',
        lastname: '',
        language: 'fr_FR',
        gender: 'neutral',
      },
      languages: [
        {value: 'fr_FR', text: 'Français'},
        {value: 'en_GB', text: 'English'}
      ],
      validForm: true
    }),
    computed: {
      genders() {
        return ['male', 'female', 'neutral'].map(value => {
          return {value: value, text: this.$t(`options.genders.${value}`)}
        })
      }
    },
    methods: {
      ...mapMutations(['showSnackbar', 'setLocale']),
      unicity(field) {
        return (value) => !this.used[field] || this.$t(`rules.uniq.${field}`)
      },
      required(field) {
        return (value) => !!value || this.$t(`rules.required.${field}`)
      },
      minLength(field) {
        return (value) => value.length > 6 || this.$t(`rules.min_length.${field}`)
      },
      confirmation(value) {
        return this.account.password == value || this.$t('rules.confirmation.password')
      },
      emailFormat(value) {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        return regex.test(value) || this.$t('rules.format.email')
      },
      resetUsed(field) {
        this.used[field] = false
      },
      register: function (event) {
        this.$refs.registerForm.validate()

        if (this.validForm) {
          const account = this.account
          api('post', '/accounts', this.account)
            .then(response => {
              this.showSnackbar(this.$t('messages.confirmation'))
            })
            .catch(error => {
              const body = error.response.data
              if (body.error == 'uniq') {
                this.used[body.field] = true
              }
              this.$refs.registerForm.validate()
            })
        }
      }
    }
  }
</script>

<i18n>
{
  "en_GB": {
    "buttons": {
      "submit": "Register"
    },
    "labels": {
      "email": "Email address",
      "firstname": "First name",
      "genders": "Speak to me",
      "languages": "Languages",
      "lastname": "Last name",
      "password": "Password",
      "password_confirmation": "Password confirmation",
      "username": "Username"
    },
    "messages": {
      "confirmation": "Your account is created, you can now log in."
    },
    "options": {
      "genders": {
        "female": "as a women",
        "male": "as a man",
        "neutral": "in a neutral way"
      }
    },
    "rules": {
      "confirmation": {
        "password": "Confirmation must match the password"
      },
      "format": {
        "email": "the format of the email is wrong"
      },
      "min_length": {
        "username": "The username must have a length of at least six characters"
      },
      "required": {
        "email": "You must provide an email address",
        "password": "You must provide a password",
        "password confirmation": "Password confirmation is mandatory",
        "username": "You must enter a username"
      },
      "uniq": {
        "email": "This email is already used",
        "username": "This username is already used"
      }
    },
    "title": {
      "registration": "Registration"
    }
  },
  "fr_FR": {
    "buttons": {
      "submit": "S'inscrire"
    },
    "labels": {
      "email": "Adresse email",
      "firstname": "Prénom",
      "genders": "S'adresser à moi",
      "languages": "Langues",
      "lastname": "Nom de famille",
      "password": "Mot de passe",
      "password_confirmation": "Confirmation du mot de passe",
      "username": "Nom d'utilisateur"
    },
    "messages": {
      "confirmation": "Votre compte utilisateur a bien été créé, vous pouvez dès à présent vous connecter"
    },
    "options": {
      "genders": {
        "female": "en tant que femme",
        "male": "en tant qu'homme",
        "neutral": "de façon neutre"
      }
    },
    "rules": {
      "confirmation": {
        "password": "Le mot de passe et sa confirmation doivent être identiques"
      },
      "format": {
        "email": "Le format de l'adresse email est incorrect"
      },
      "min_length": {
        "username": "Le nom d'utilisateur doit faire au moins six caractères"
      },
      "required": {
        "email": "Vous devez entrer une adresse email",
        "password": "Vous devez entrer un mot de passe",
        "password confirmation": "La confirmation du mot de passe est nécessaire",
        "username": "Vous devez entrer un nom d'utilisateur"
      },
      "uniq": {
        "email": "Cette adresse email est déjà employée",
        "username": "Ce nom d'utilisateur est déjà employé"
      }
    },
    "title": {
      "registration": "Inscription"
    }
  }
}
</i18n>