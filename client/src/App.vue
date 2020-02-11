<template>
  <v-app>
    <v-app-bar dark densse app>
      <v-btn text to="/">
        <span class="mr-2">Home</span>
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn text to="signup">
        <span class="mr-2">Sign up</span>
      </v-btn>
      <v-btn text to="login">
        <span class="mr-2">Sign in</span>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>
