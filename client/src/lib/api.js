import axios from 'axios'
import JQuery from 'jquery'

export default function api(method, url, data) {
  return axios({
    method: 'post',
    url: '/api',
    data: {
      method: method.toUpperCase(),
      url: url,
      ...data
    },
    headers: {
      X_CSRF_TOKEN: JQuery('input[name=_csrf]').val()
    }
  })
}