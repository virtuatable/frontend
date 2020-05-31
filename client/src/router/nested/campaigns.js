import CampaignsList from '@/views/campaigns/CampaignsList.vue'
import Campaign from '@/views/campaigns/Campaign.vue'
import store from '@/store'
import redirect_if_anonymous from '@/lib/hooks/redirect_if_anonymous.js'

export default [
  {
    path: '/campaigns',
    name: 'Campaigns',
    component: CampaignsList,
    beforeEnter: redirect_if_anonymous
  },
  {
    path: '/campaigns/:id',
    name: 'GetCampaign',
    component: CampaignsList,
    beforeEnter: redirect_if_anonymous
  }
]