import { createComponentInstance, setupComponent } from "./component"


export function render(vnode, container) {

  patch(vnode, container)

}


function patch(vnode, container) {

  // TODO 判断vnode是不是一个element
  // 是element应该处理element
  if (typeof vnode.type === 'string') {
    processElement(vnode, container)
  } else {
    processComponent(vnode, container)
  }
  // processElement() 

}

function processElement(vnode: any, container: any) {
  mountElement(vnode, container)

}

function mountElement(vnode, container) {
  const el = (vnode.el = document.createElement(vnode.type))

  const { children, props } = vnode
  if (typeof children === 'string') {
    el.textContent = children
  } else if (Array.isArray(children)) {
    children.forEach(v => patch(v, el))
  }

  for (const key in props) {
    const val = props[key]
    el.setAttribute(key, val)
  }

  container.append(el)

}




function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container)
}

function mountComponent(vnode, container) {
  const instance = createComponentInstance(vnode)

  setupComponent(instance)

  setupRenderEffect(instance, vnode, container)
}

function setupRenderEffect(instance, vnode, container) {
  const { proxy } = instance
  const subTree = instance.render.call(proxy)

  patch(subTree, container)

  vnode.el = subTree.el

}

