
import { h } from '../../lib/guide-mini-vue.esm.js'
import { Foo } from './Foo.js'
export const App = {
  name: 'App',
  render() {
    return h('div', {}, [h('div', {}, 'app'), h(Foo, {
      onAdd: function (a, b) {
        console.log('onAdd', a, b);
      },
      onAddFoo: function () {
        console.log('onAddFoo');
      }
    })])
  },
  setup() {
    return {}
  }
}