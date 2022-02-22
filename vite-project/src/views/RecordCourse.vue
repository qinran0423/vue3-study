<template>
  <div>
    <div>
      点击添加：
      <div class="circleBox">
        <div class="red circle" @click="onclickCircle('red')"></div>
        <div class="green circle" @click="onclickCircle('green')"></div>
        <div class="blue circle" @click="onclickCircle('blue')"></div>
      </div>
    </div>

    <div>
      <button @click="onUndo">撤销</button>
      <button @click="onBack">回退</button>
    </div>
    <div>
      <div>
        <p>当前的视图</p>
        <div :class="currentView" class="circle"></div>
      </div>
      <div class="listBox">
        <div>
          <p>可撤销列表</p>
          <div class="undoList">
            <div
              v-for="type in undoList"
              :key="type"
              :class="type"
              class="circle"
            ></div>
          </div>
        </div>

        <div>
          <p>可回退列表</p>
          <div class="rollbackList">
            <div
              v-for="type in rollbackList"
              :class="type"
              class="circle"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted, nextTick, ref } from "vue";
import { createStack } from "../utils/createStack";

const currentView = ref("");
const undoList = ref([]);
const rollbackList = ref([]);

let record = createRecord();
function onclickCircle(type) {
  record.addRecord(type);
  updateData();
}

function onUndo() {
  record.undoRecord();
  updateData();
}

function onBack() {
  record.rollbackStack();
  updateData();
}

function updateData() {
  currentView.value = record.getTopValue();
  undoList.value = record.getUndoStack();
  rollbackList.value = record.getrollbackStack();
}

function createRecord() {
  let undoStack = createStack();
  let rollbackStack = createStack();
  const MAX_LIMIT = 6;
  return {
    getTopValue() {
      return undoStack.peek();
    },
    addRecord(data) {
      console.log("add", data);
      if (undoStack.size() >= MAX_LIMIT) {
        undoStack.shift();
      }
      console.log(data);
      undoStack.push(data);
      rollbackStack.clear();
    },
    getUndoStack() {
      console.log(undoStack.getList());
      return undoStack.getList();
    },
    undoRecord() {
      if (undoStack.empty()) return;
      const data = undoStack.pop();
      rollbackStack.push(data);
      console.log(rollbackStack);
    },
    rollbackStack() {
      if (rollbackStack.empty()) return;
      const data = rollbackStack.pop();
      undoStack.push(data);
    },

    getrollbackStack() {
      return rollbackStack.getList();
    },
  };
}
</script>

<style lang="scss" scoped>
html {
  background: pink;
}
.circleBox {
  display: flex;
}

.circle {
  margin: 10px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
}

.red {
  background: red;
}

.green {
  background: green;
}

.blue {
  background: blue;
}

.undoList,
.rollbackList {
  display: flex;
  flex-flow: column-reverse;
  margin-right: 20px;
  width: 70px;
  height: 450px;
  border: 1px solid black;
}

.listBox {
  display: flex;
}
</style>
