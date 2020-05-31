export default function redirect_if_anonymous(to, from, next) {
  if (localStorage.getItem('authenticated') != 'true') {
    next({name: 'Login'})
  }
  else {
    next()
  }
}