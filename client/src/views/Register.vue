<template>
  <div class="register">
    <v-container>
      <v-row justify="center">
        <v-col cols="10" md="8">
          <v-form ref="registerForm" @submit.prevent.stop="register" :value="validForm">
            <v-container>
              <v-row dense>
                <v-col cols="12">
                  <h1>{{$t('title.registration')}}</h1>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12">
                  <v-text-field
                    :label="$t('labels.username.' + this.gender)"
                    ref="username"
                    :rules="[
                      required('username'),
                      minLength('username', 6),
                      unicity('username')
                    ]"
                    hide-details="auto"
                    outlined
                    v-model="account.username"
                    @keyup="resetUsed('username')"
                  >
                    <template v-slot:message="{ message }">
                      {{ $t(message) }}
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-text-field
                    :label="$t('labels.password')"
                    type="password"
                    :rules="[required('password')]"
                    hide-details="auto"
                    outlined
                    v-model="account.password"
                    @keyup="resetConfirmation()"
                  >
                    <template v-slot:message="{ message }">
                      {{ $t(message) }}
                    </template>
                  </v-text-field>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-text-field
                    ref="confirmation"
                    :label="$t('labels.password_confirmation')"
                    type="password"
                    :rules="[
                      required('password confirmation'),
                      confirmation
                    ]"
                    hide-details="auto"
                    outlined
                    v-model="account.password_confirmation"
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
                    :label="$t('labels.email')"
                    ref="email"
                    :rules="[
                      required('email'),
                      unicity('email'),
                      emailFormat
                    ]"
                    hide-details="auto"
                    outlined
                    v-model="account.email"
                    @keyup="resetUsed('email')"
                    :validate-on-blur="true"
                  >
                    <template v-slot:message="{ message }">
                      {{ $t(message) }}
                    </template>
                  </v-text-field>
                </v-col>
              </v-row>
              <v-row dense class="hidden-xs-only">  
                <v-col cols="6">
                  <v-text-field :label="$t('labels.firstname')" hide-details="auto" outlined v-model="account.firstname"></v-text-field>
                </v-col>
                <v-col cols="6">
                  <v-text-field :label="$t('labels.lastname')" hide-details="auto" outlined v-model="account.lastname"></v-text-field>
                </v-col>
              </v-row>
              <v-row dense>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="languages"
                    v-model="locale"
                    :label="$t('labels.languages')"
                    hide-details="auto"
                    outlined>
                  </v-select>
                </v-col>
                <v-col cols="12" sm="6">
                  <v-select
                    :items="genders"
                    v-model="gender"
                    :label="$t('labels.genders')"
                    hide-details="auto"
                    outlined>
                  </v-select>
                </v-col>
              </v-row>
              <v-row dense class="pt-2">
                <v-col cols="12">
                  <v-btn type="submit">{{$t('buttons.submit')}}</v-btn>
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
  import api from '@/lib/api.js'
  import store from '@/store'
  import {mapMutations, mapState} from 'vuex'
  import {has} from 'lodash'
  
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
      },
      languages: [
        {value: 'fr_FR', text: 'Français'},
        {value: 'en_GB', text: 'English'}
      ],
      validForm: true
    }),
    computed: {
      locale: {
        get() {
          return this.$store.state.locale
        },
        set(_locale) {
          this.setLocale(_locale)
        }
      },
      gender: {
        get() {
          return this.$store.state.gender
        },
        set(_gender) {
          this.setGender(_gender)
        }
      },
      genders() {
        return ['male', 'female', 'neutral'].map(value => {
          return {value: value, text: this.$t(`options.genders.${value}`)}
        })
      }
    },
    methods: {
      ...mapMutations(['showSnackbar', 'setLocale', 'setGender']),
      unicity(field) {
        return (value) => !this.used[field] || `rules.uniq.${field}`
      },
      required(field) {
        return (value) => !!value || `rules.required.${field}`
      },
      minLength(field) {
        return (value) => value.length > 6 || `rules.min_length.${field}`
      },
      confirmation(value) {
        return this.account.password == value || 'rules.confirmation.password'
      },
      emailFormat(value) {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        return regex.test(value) || 'rules.format.email'
      },
      resetUsed(field) {
        if (this.used[field]) {
          this.used[field] = false
          if (has(this.$refs, field)) {
            this.$refs[field].validate()
          }
        }
      },
      resetConfirmation() {
        this.$refs.confirmation.validate()
      },
      register: function (event) {
        this.$refs.registerForm.validate()

        if (this.validForm) {
          const account = this.account
          api('post', '/accounts', Object.assign(this.account, {
              locale: this.locale,
              gender: this.gender
            }))
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
      "password_confirmation": "Password confirmation"
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
        "username": {
          "female": "This username is already used",
          "male": "This username is already used",
          "neutral": "This username is already used"
        }
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
      "password_confirmation": "Confirmation du mot de passe"
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
        "password": "La confirmation doit correspondre"
      },
      "format": {
        "email": "Le format de l'adresse email est incorrect"
      },
      "min_length": {
        "username": "Ce champ doit comporter au moins six caractères"
      },
      "required": {
        "email": "Vous devez entrer une adresse email",
        "password": "Vous devez entrer un mot de passe",
        "password confirmation": "La confirmation du mot de passe est nécessaire",
        "username": "Une valeur est requise pour ce champ"
      },
      "uniq": {
        "email": "Cette adresse email est déjà employée",
        "username": {
          "female": "Ce nom d'utilisatrice est déjà employé",
          "male": "Ce nom d'utilisateur est déjà employé",
          "neutral": "Ce nom d'utilisateurice est déjà employé"
        }
      }
    },
    "title": {
      "registration": "Inscription"
    }
  }

}
</i18n>