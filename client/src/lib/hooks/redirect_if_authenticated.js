export default function redirect_if_authenticated(to, from, next) {
  if (localStorage.getItem('authenticated') == 'true') {
    next({name: 'Home'})
  }
  else {
    next()
  }
}