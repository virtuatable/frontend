import { extend, configure } from 'vee-validate'

import { required } from 'vee-validate/dist/rules'

extend("required", {
  ...required,
  message: 'fields.username.required'
})

// extend("required", {
//   validate: value => value != "",
//   message: 'fields.username.required'

// })