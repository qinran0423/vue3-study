<template>
  <div>
    <input type="text" v-model="title" @keydown.enter="addTodo" />
    <button v-if="active < all" @click="clear">清理</button>
    <ul v-if="todos.length">
      <li v-for="todo in todos">
        <input type="checkbox" v-model="todo.done" />
        <span :class="{ done: todo.done }">{{ todo.title }}</span>
      </li>
    </ul>
    <div v-else>暂无数据</div>
    <div>
      全选<input type="checkbox" v-model="allDone" />
      <span>{{ active }} / {{ all }}</span>
    </div>

    <div>x:{{ x }}/ y: {{ y }}</div>
  </div>
</template>

<script setup>
import { useTodos } from "../todolist.js";
import { computed, ref } from "vue";
import { useMouse } from "../utils/mouse.js";

let { x, y } = useMouse();
let { title, todos, addTodo, clear, active, all, allDone } = useTodos();
</script>

<style lang="scss" scoped></style>
