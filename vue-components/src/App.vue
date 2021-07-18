<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <button @click="changeValue">show</button>
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <popue v-model="obj.currentValue" :num="obj.num">
    <div class="addresTitle">
      <span @click="obj.currentValue = false">取消</span>
      <p>所在地区</p>
      <span @click="onConfirm"> 确定 </span>
    </div>
  </popue>
</template>

<script setup>
import { reactive } from "vue";
import HelloWorld from "./components/HelloWorld.vue";
import Popue from "./components/popue.vue";

const obj = reactive({
  currentValue: false,
  num: 1
});

function  changeValue() {
  obj.currentValue = true
  obj.num ++
  console.log(obj);
}



// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/master/active-rfcs/0040-script-setup.md
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
