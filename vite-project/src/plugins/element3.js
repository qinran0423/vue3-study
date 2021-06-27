// // 全局引入element3
// import element3 from 'element3'
// import 'element3/lib/theme-chalk/index.css'

// 按需加载
import { ElButton, ElInput } from "element3";
import 'element3/lib/theme-chalk/button.css'
import 'element3/lib/theme-chalk/input.css'


export default function(app) {
  // app.use(element3)


  // 按需加载
  app.use(ElButton)
  app.use(ElInput)
}