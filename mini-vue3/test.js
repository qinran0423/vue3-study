const { effect, reactive } = require('@vue/reactivity')

// let a = 10;
// let b;

// function update() {
//   b = a + 10;
//   console.log(b);
// }


// a = 20;
// update()

// 声明一个响应式的对象
let a = reactive({
  value: 1
});
let b;
effect(() => {
  // 此函数会自动执行一次
  b = a.value + 10
  console.log(b);
})

// a的值发生了变化  effect中的函数将再次执行
a.value = 30