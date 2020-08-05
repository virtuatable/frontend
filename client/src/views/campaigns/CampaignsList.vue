<template>
  <div class="campaigns fill-height">
    <div>Je suis bien dans la liste des campagnes</div>
    <div v-for="campaign in campaigns.items">
      {{campaign.title}}
    </div>
    <v-dialog v-model="dialog">
      <v-card>
        <v-card-title class="headline">Titre</v-card-title>
        <v-card-text>Pouet</v-card-text>
      </v-card>
    </v-dialog>
    <v-btn fixed bottom right fab @click.stop="openDialog()">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data: () => ({
      dialog: false
    }),
    computed: {
      ...mapState("campaigns", ["campaigns"])
    },
    methods: {
      ...mapActions("campaigns", ["getCampaigns"]),
      openDialog() {
        this.dialog = true
      }
    },
    created() {
      this.getCampaigns()
    }
  }
</script>