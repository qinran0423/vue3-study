import { render } from "./renderer"
import { createVNode } from "./vnode"



// 源码中这段是由渲染器的返回的
// 渲染器中的createApp 是由createAppAPI返回的一个工厂函数

export function createApp(rootComponent) {


  return {
    mount(rootContainer) {
      const vnode = createVNode(rootComponent)
      render(vnode, rootContainer)
    }
  }

}


