<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3.0 + Vite" /> -->
  <countdown></countdown>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import countdown from './components/countdown.vue'
export default {
  name: 'App',
  components: {
    HelloWorld,
    countdown
  }
}
</script>
