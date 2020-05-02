<template>
  <div><a v-on:click="display()">test</a></div>
</template>

<script>
  import router from "../../router"
  export default {
    methods: {
      display() {
        router.push({name: "Register"})
      }
    }
  }
</script>