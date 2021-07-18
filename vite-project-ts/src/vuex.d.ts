import { ComponentCustomProperties } from 'vue'
import { Store } from 'vuex'
import { State } from './store'

// 模块扩展
// this.$store强类型的支持
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: Store<State>
  }
}