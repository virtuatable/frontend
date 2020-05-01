<template>
  <div class="register">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="8">
          <h1>Registration</h1>
          <v-form ref="registerForm" @submit.prevent.stop="register" :value="validForm">
            <v-container>
              <v-row class="py-1">
                <v-text-field
                  label="Username"
                  :rules="[
                    required('username'),
                    minLength('username', 6),
                    alreadyUsed('username')
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
                  label="Password"
                  type="password"
                  :rules="[required('password')]"
                  hide-details="auto"
                  outlined
                  v-model="account.password"
                ></v-text-field>
                <v-text-field
                  class="pl-1"
                  label="Password confirmation"
                  type="password"
                  :rules="[
                    required('password confirmation'),
                    confirmation(account.password)
                  ]"
                  hide-details="auto"
                  outlined
                  v-model="account.password_confirmation"
                ></v-text-field>
              </v-row>
              <v-row class="py-1">
                <v-text-field
                  label="Email"
                  :rules="[
                    required('email'),
                    emailFormat
                  ]"
                  hide-details="auto"
                  outlined
                  v-model="account.email"
                  @change="resetUsed('email')"
                ></v-text-field>
              </v-row>
              <v-row class="py-1">
                <v-text-field class="pr-1" label="First name" hide-details="auto" outlined v-model="account.firstname"></v-text-field>
                <v-text-field class="pl-1" label="Last name" hide-details="auto" outlined v-model="account.lastname"></v-text-field>
              </v-row>
              <v-row class="py-1">
                <v-select class="pr-1" :items="languages" v-model="account.language" outlined></v-select>
                <v-select class="pl-1" :items="genders" v-model="account.gender" label="Speak to me..." outlined></v-select>
              </v-row>
              <v-row>
                <v-btn type="submit">Register</v-btn>
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
  import JQuery from 'jquery'
  
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
        language: 'en_GB',
        gender: 'neutral',
      },
      languages: [
        {value: 'en_GB', text: 'English'},
        {value: 'fr_FR', text: 'French'}
      ],
      genders: [
        {value: 'male', text: 'As a man'},
        {value: 'female', text: 'As a woman'},
        {value: 'neutral', text: 'In a neutral way'}
      ],
      validForm: true
    }),
    methods: {
      alreadyUsed(fieldName) {
        return (value) => !this.used[fieldName] || `This ${fieldName} is already taken`
      },
      required: (fieldName) => {
        return (value) => !!value ||`You must provide a value for the ${fieldName}`
      },
      minLength: (fieldName, length) => {
        return (value) => value.length > length || `The value for the ${fieldName} must be at least ${length} characters`
      },
      confirmation: (password) => {
        return (value) => {
          return password == value || 'The password and its confirmation must match'
        }
      },
      emailFormat: (value) => {
        const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/
        return regex.test(value) || 'The format of the email is incorrect'
      },
      resetUsed(field) {
        this.used[field] = false
      },
      register: function (event) {
        this.$refs.registerForm.validate()

        if (this.validForm) {
          const account = this.account
          api('post', '/accounts', this.account)
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