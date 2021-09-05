

export function diff(n1, n2) {
  // 1. tag
  if (n1.tag !== n2.tag) {
    n1.el.replaceWidth(document.createElement(n2.tag))
  } else {
    const el = (n2.el = n1.el)
    // 2. props
    const { props: newProps } = n2;
    const { props: oldProps } = n1;

    if (newProps) {
      Object.keys(newProps).forEach((key) => {
        const newVal = newProps[key]
        const oldVal = oldProps[key]
        if (newVal !== oldVal) {
          el.setAttribute(key, newVal)
        }
      })
    }

    if (oldProps) {
      Object.keys(newProps).forEach((key) => {
        if (!newProps[key]) {
          el.removeAttribute(key)
        }

      })
      // 3. children -> 暴力的解法
      const { children: newChildren } = n2
      const { children: oldChildren } = n1
      if (typeof newChildren === 'string') {
        if (typeof oldChildren === 'string') {
          if (newChildren !== oldChildren) {
            el.textContent = newChildren
          }
        } else if (Array.isArray(oldChildren)) {
          el.textContent = newChildren
        }
      } else if (Array.isArray(newChildren)) {
        if (typeof oldChildren === 'string') {
          el.innerText = ''
          mountElement(n2, el)
        } else if (Array.isArray(oldChildren)) {
          // 暴力解法
          const length = Math.min(newChildren.length, oldChildren.length)
          for (let index = 0; index < length; index++) {
            const newVnode = newChildren[index]
            const oldVnode = oldChildren[index]
            diff(oldVnode, newVnode)
          }

          if (newChildren.length > length) {
            // 创建
            for (let index = length; index < newChildren.length; index++) {
              const newVnode = newChildren[index];
              mountElement(newVnode)
            }
          }

          if (oldChildren.length > length) {
            for (let index = length; index < oldChildren.length; index++) {
              const oldVnode = oldChildren[index];
              oldVnode.el.parent.remove(oldVnode.el)
            }
          }
        }
      }

    }
  }
}
// vdom -> dom
export function mountElement(vnode, container) {
  const { tag, props, children } = vnode;
  // tag
  const el = (vnode.el = document.createElement(tag))

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