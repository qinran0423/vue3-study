import { createComponentInstance, setupComponent } from "./component"


export function render(vnode, container) {

  patch(vnode, container)

}


function patch(vnode, container) {

  // TODO 判断vnode是不是一个element
  // 是element应该处理element

  // processElement() 

  processComponent(vnode, container)

}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)

  setupRenderEffect(instance, container)
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render()

  patch(subTree, container)

}

