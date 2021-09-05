import { effectWatch } from "./reactivity/index.js"
import { mountElement } from './renderer/index.js';
export function createApp(rootComponent) {
  return {
    mount(rootContainer) {
      const context = rootComponent.setup()
      effectWatch(() => {
        rootContainer.innerText = ''
        const subTree = rootComponent.render(context)
        // rootContainer.append(element)
        console.log(subTree);
        mountElement(subTree, rootContainer)
      })
    }
  }
}