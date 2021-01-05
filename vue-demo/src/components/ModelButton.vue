<template>
  <div>
    <button @click="modelOpen = true">开启弹框</button>
    
    <teleport to="body">
      <div v-if="modelOpen" class="modal">
        <div>
          这是一个模态窗口!
          我的父元素是"body"！
          <button @click="modelOpen = false">Close</button>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script>
import {ref} from 'vue'
  export default {
    setup() {
      let modelOpen = ref(false)
      return {modelOpen}
    }
  }
</script>

<style  scoped>
.modal {
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  background-color: rgba(0,0,0,.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.modal div {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: white;
  width: 300px;
  height: 300px;
  padding: 5px;
}

</style>