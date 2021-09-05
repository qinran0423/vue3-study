
// vdom -> dom
export function mountElement(vnode, container) {
  const { tag, props, children } = vnode;
  // tag
  const el = document.createElement(tag)

  // props  
  if (props) {
    for (const key in props) {
      const val = props[key]
      el.setAttribute(key, val)
    }
  }

  // children
  // 1. 它可以接受一个string
  if (typeof children === 'string') {
    const textNode = document.createTextNode(children);
    console.log('textnode', textNode);
    el.append(textNode)
  } else if (Array.isArray(children)) {
    // 2. 它可以接受一个数组
    children.forEach((v) => {
      mountElement(v, el)
    })
  }


  // 插入
  container.append(el)
}