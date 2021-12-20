import MyButton from './MyButton';

// 添加插件方法
MyButton.install = app => app.component('MyButton', MyButton)



// 组件库
const Ele = {
  MyButton,
  install: app => {
    app.use(MyButton)
  }
}


export default Ele
 