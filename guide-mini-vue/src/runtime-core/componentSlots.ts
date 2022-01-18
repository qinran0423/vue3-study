import { ShapeFlags } from "../share/ShapeFlags"


export function initSlots(instance, children) {
  // slots
  const { vnode } = instance
  if (vnode.shapeFlag & ShapeFlags.SLOT_CHILDREN) {
    normalizeObjectSlots(children, instance.slots)
  }

}



function normalizeObjectSlots(children: any, slots: any) {
  for (const key in children) {
    const value = children[key]

    slots[key] = (props) => normalSlotValue(value(props))
  }

}

function normalSlotValue(value) {
  return Array.isArray(value) ? value : [value]
}