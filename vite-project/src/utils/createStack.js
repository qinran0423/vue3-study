import { ref } from 'vue'

export function createStack() {
  let list = ref([])
  return {
    /**
     * 入栈
     * @param {*} data 
     */
    push(data) {
      list.value.push(data)
    },
    /**
     * 出栈
     * @returns 
     */
    pop() {
      return list.value.pop()
    },
    size() {
      return list.value.length
    },

    empty() {
      return list.value.length === 0
    },

    clear() {
      list.value = []
    },

    shift() {
      list.value.shift()
    },

    peek() {
      return list.value[list.value.length - 1]
    },

    getList() {
      return list.value
    }

  }
}