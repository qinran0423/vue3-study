<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
  <!-- <Model/> -->
  <!-- <countdown></countdown> -->
  <!-- <Comp></Comp> -->
  <!-- <Ref></Ref> -->
  <Provide></Provide>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import countdown from './components/countdown.vue'
import Model from './components/Model.vue'
import Comp from './components/Comp.vue';
import Ref from './components/Ref.vue';
import Provide from './components/Provide.vue';
export default {
  name: 'App',
  components: {
    HelloWorld,
    countdown,
    Model,
    Comp,
    Ref,
    Provide
  }
}
</script>
