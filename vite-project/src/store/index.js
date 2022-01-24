import { createStore } from "vuex"

export default createStore({
  state() {
    return {
      count: 0
    }
  },
  mutations: {
    add(state) {
      state.count++
    }
  }
})