import Vue from 'vue'
import Vuex from 'vuex'
import i18n from '@/i18n.js'
import _ from 'lodash'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authenticated: false,
    locale: 'fr_FR',
    gender: 'neutral',
    snackbar: {
      text: '',
      shown: false,
      color: 'success',
      timeout: 5000
    }
  },
  mutations: {
    /**
     * Overrides existing values in the current state with
     * values from the local storage. Called at startup, this
     * mutation shouldn't be called anywhere else in the code.
     */
    initialize(state) {
      const stored = localStorage.getItem('store')
      if (stored) {
        this.replaceState(
          Object.assign(state, JSON.parse(stored))
        )
      }
      this.commit('setLocale', state.locale)
    },
    showSnackbar(state, message, color = 'success') {
      state.snackbar.text = message
      state.snackbar.color = color
      state.snackbar.shown = true
    },
    setLocale(state, locale = 'fr_FR') {
      state.locale = locale
      i18n.locale = locale
    },
    setGender(state, gender = 'neutral') {
      state.gender = gender
    }
  },
  actions: {
  },
  modules: {
  }
})

/**
 * This subscription allows the application to update the localStorage
 * each time a mutation is issued and modifies the state. This way the
 * state is saved in memory.
 */
store.subscribe((mutation, state) => {
  if (mutation.type != 'initialize') {
    const picked = _.omit(state, ['snackbar'])
    console.log(picked)
    localStorage.setItem('store', JSON.stringify(picked))
  }
})

export default store