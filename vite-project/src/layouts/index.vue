<template>
  <div class="app-wrapper">
    <!-- 内容容器 -->
    <div class="main-container">
      <!-- 顶部导航栏 -->
      <!-- <navbar /> -->
      <!-- 内容区 -->
      <!-- <app-main /> -->
      <!-- <add /> -->
      <!-- <TodoList></TodoList> -->
      <!-- <Rate :value="score" theme="black"></Rate>

      <Rate :value="3"></Rate>
      <Rate :value="4" theme="red"></Rate>
      <Rate :value="1" theme="green"></Rate>
      <Rate1 :value="3.5"></Rate1> -->

      <!-- <Rate1 v-model="score"
        ><h2>你的评分是：{{ score }}</h2></Rate1
      > -->
      <!-- <Draw></Draw> -->
      <!-- <Heading :level="3">hello geekbang</Heading> -->
      <Todo></Todo>
      <Count />
    </div>
  </div>
</template>

<script setup>
// import AppMain from "./components/AppMain.vue";
// import Navbar from "./components/Navbar.vue";
// import Sidebar from "./components/Sidebar/index.vue";
// import Add from "../components/Add.vue";
// import TodoList from "../components/List.vue";
// import Rate from "../components/Rate.vue";
// import Rate1 from "../components/Rate1.vue";
// import { ref } from "vue";
// import Draw from "../components/Draw1.vue";
// import Heading from "../components/Heading";
import Todo from "../components/Todo";
import Count from "../components/Count.vue";
// let score = ref(3);

// function update(num) {
//   score.value = num;
//   console.log("num", num);
// }
</script>

<style lang="scss" scoped>
@import "../styles/mixin.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
