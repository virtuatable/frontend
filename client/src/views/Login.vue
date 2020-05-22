<template>
  <div class="login">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="8">
          <ValidationObserver ref="observer" v-slot="{ validate }">
            <ValidationProvider name="username" rules="required" v-slot="{ errors, valid }">
              {{ $t(errors[0]) }} - {{ valid }}
              <v-text-field v-model="username" :error="!valid" outlined hide-details=auto>
                <template v-slot:message>
                  PATATE MOLLE
                </template>
              </v-text-field>
            </ValidationProvider>
          </ValidationObserver>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
  import { ValidationProvider, ValidationObserver } from 'vee-validate'

  export default {
    components: {
      ValidationObserver,
      ValidationProvider
    },
    data: () => ({
      username: ""
    })
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