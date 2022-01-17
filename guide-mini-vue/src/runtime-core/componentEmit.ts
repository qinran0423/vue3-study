import { camelize, toHandlerKey } from "../share";


export function emit(instance, event, ...args) {
  console.log(event);

  const { props } = instance
  console.log(props);




  const handlerName = toHandlerKey(camelize(event))
  const handler = props[handlerName]
  handler && handler(...args)

}