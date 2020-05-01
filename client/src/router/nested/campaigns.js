import CampaignsList from '@/views/campaigns/CampaignsList.vue'
import Campaign from '@/views/campaigns/Campaign.vue'
import store from '@/store'

export default [
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: CampaignsList,
    beforeEnter(to, from, next) {
      if (store.state.authenticated != true) {
        next({name: 'Login'})
      }
    }
  },
  {
    path: '/campaigns/:id',
    name: 'GetCampaign',
    component: CampaignsList,
    beforeEnter(to, from, next) {
      if (store.state.authenticated != true) {
        next({name: 'Login'})
      }
    }
  }
]