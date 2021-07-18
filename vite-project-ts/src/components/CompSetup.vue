<template>
  <!-- 标题 -->
  <h1 :style="{ backgroundColor: titleInfo?.color }">{{ titleInfo?.value }}</h1>
  <div>
    {{ counter }}
  </div>

  <div>
    {{ doubleCounter }}
  </div>

  <!-- 新增代办 -->
  <input
    type="text"
    v-model="todoName"
    @keydown.enter="addTodo(newToDo(todoName))"
  />
  <!-- 待办事项列表 -->
  <div v-for="item in items" :key="item.id">{{ item.name }}</div>
</template>

<script lang="ts" setup>
import { defineComponent, ref, computed, reactive , defineProps} from "vue";
import type {PropType} from 'vue'
import type { Todo, TitleInfo } from "../types";
import { useStore } from 'vuex'
import { key } from "../store";

// 属性声明
defineProps({
  titleInfo: {
      type: Object as PropType<TitleInfo>,
      require: true
    }
})

const store = useStore(key)
const counter = computed(() => store.state.counter);
const doubleCounter = computed(() => counter.value * 2);

const items = ref([] as Todo[]);
const todoName = ref("");

items.value.push({
  id: 1,
  name: "vue3",
  completed: false,
});

const newToDo = (todoName: string): Todo => {
  return {
    id: items.value.length + 1,
    name: todoName,
    completed: false,
  };
};

const addTodo = (todo: Todo): void => {
  items.value.push(todo);
  todoName.value = "";
};
</script>

<style scoped></style>ß
