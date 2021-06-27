<template>
  <h1>{{ msg }}</h1>
  <p @click="$store.commit('add')">{{$store.state.counter}}</p>
  <p>
   
    <Comp></Comp>
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <button type="button" @click="state.count++">
    count is: {{ state.count }}
  </button>
  <el-input></el-input>
  <el-button @click="onclick">emit</el-button>
</template>

<script setup>
import Comp from "@/components/Comp.vue";
import { defineEmit, defineProps, reactive, useContext } from "vue";

const props = defineProps({
  msg: String,
});

console.log(props);

const ctx = useContext();
console.log(ctx);
ctx.expose({
  someMethod() {
    console.log("some message from HelloWorld");
  },
});

const emit = defineEmit(["myclick"]);

const state = reactive({ count: 0 });
const onclick = () => {
  ctx.emit("myclick");
};

// 请求
fetch("/api/getUsers")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
  });
</script>

<style scoped>

</style>
