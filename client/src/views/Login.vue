<template>
  <div class="login">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="8">
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <ValidationProvider name="username" rules="required" v-slot="{ errors, valid }">
              {{ $t(errors[0]) }} - {{ valid }}
              <v-text-field
                v-model="username"
                outlined
                :error-messages="errors"
              >
                <template v-slot:message>
                  {{ $t(errors[0]) }}
                </template>
              </v-text-field>
            </ValidationProvider>
            <ValidationProvider name="email" rules="required" v-slot="{ errors, valid }">
              {{ $t(errors[0]) }} - {{ valid }}
              <v-text-field
                v-model="email"
                outlined
                :error-messages="errors"
              >
                <template v-slot:message>
                  {{ $t(errors[0]) }}
                </template>
              </v-text-field>
            </ValidationProvider>
          </ValidationObserver>
          <a @click="setLocale('fr_FR')">FR</a>&nbsp;-&nbsp;
          <a @click="setLocale('en_GB')">EN</a>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'
  import { mapMutations } from 'vuex'

  export default {
    components: {
      ValidationObserver,
      ValidationProvider
    },
    data: () => ({
      username: "",
      email: ""
    }),
    methods: {
      ...mapMutations(['setLocale'])
    }
  }
</script>

<i18n>
  {
    "en_GB": {
      "fields": {
        "username": {
          "required": "The username is required"
        }
      }
    },
    "fr_FR": {
      "fields": {
        "username": {
          "required": "Le nom d'utilisateur est requis"
        }
      }
    }
  }
</i18n>