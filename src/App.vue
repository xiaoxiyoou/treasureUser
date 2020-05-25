<template>
  <div id="app">
    <router-view :key="key" />
  </div>
</template>

<script>


export default {
  name: 'App',
  computed: {
    key() {
      return this.$route.name !== undefined ? this.$route.name + new Date() : this.$route + new Date()
    }

  },
  components: {

  }
}
</script>

<style>
#app {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 32px;
}
</style>

