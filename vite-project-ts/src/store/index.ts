import { createStore, Store } from 'vuex'
import { InjectionKey }  from 'vue'
// 1. 创建一个injectionKey
export const key: InjectionKey<Store<State>> = Symbol()


export type State = { 
  counter: number
}

export default createStore({
  state: {
    counter: 1
  },
  mutations: {
    add(state) {
      state.counter++
    }
  }
})