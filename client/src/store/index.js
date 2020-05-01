import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authenticated: false
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
    localStorage.setItem('store', JSON.stringify(state))
  }
})

export default store