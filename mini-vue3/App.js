import { effectWatch, reactive } from './core/reactivity/index.js'
import { h } from './core/h.js';
// // let a = 10;
// // let b;

// // function update() {
// //   b = a + 10;
// //   console.log(b);
// // }


// // a = 20;
// // update()

// // 声明一个响应式的对象
// let a = reactive({
//   value: 1
// });
// let b;
// effectWatch(() => {
//   // 此函数会自动执行一次
//   b = a.value + 10
//   console.log(b);
// })

// // a的值发生了变化  effect中的函数将再次执行
// a.value = 30

export default {
  render(context) {
    // 构建view
    // const div = document.createElement('div')
    // div.innerText = context.state.count
    // return div
    return h('div', {
      id: 'app -' + context.state.count,
      class: 'showTime'
    },
      [h('p', null, String(context.state.count)), h('p', null, 'mick')])
  },
  setup() {
    const state = reactive({
      count: 0
    })
    window.state = state
    return { state }
  }
}

