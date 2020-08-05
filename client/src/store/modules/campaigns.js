import api from '@/lib/api'

const campaigns = {
  namespaced: true,
  state: {
    campaigns: []
  },
  mutations: {
    setCampaignsList(state, results) {
      state.campaigns = results
    }
  },
  actions: {
    getCampaigns ({ commit, rootGetters }) {
      const token = rootGetters.getToken
      api('get', '/campaigns', {session_id: token})
        .then(response => {
          commit('setCampaignsList', response.data)
        })
        .then(() => {
          commit('setCampaignsList', [])
        })
    }
  }
}

export default campaigns