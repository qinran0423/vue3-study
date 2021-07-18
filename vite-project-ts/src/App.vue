<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <Comp :title-info="{value: '待办事项', color:'#f66'}"></Comp>
  <CompSetup :title-info="{value: '待办事项', color:'#f66'}"></CompSetup>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import Comp from './components/Comp.vue';
import CompSetup from './components/CompSetup.vue';
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
