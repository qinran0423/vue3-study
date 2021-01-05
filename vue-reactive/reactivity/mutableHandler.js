import { isObject, hasOwnProperty, isEqual } from "./share/utils";
import { reactive } from './reactive'
 
const get = createGetter(),
      set = createSetter()


function createGetter() {
  return function get(target, key, receiver) {
    
    const res = Reflect.get(target, key, receiver)
    console.log('响应式获取：' + target[key]);

    if(isObject(res)) {
      return reactive(res)
    }

    return res
  }
}


function createSetter() {
  return function set(target, key,value, receiver) {
    // 判断这个key 是否存在
    const isKeyExist = hasOwnProperty(target, key)
    const oldValue = target[key]
    const res = Reflect.set(target, key, value, receiver) 
    // 如果key不存在 则新增
    if(!isKeyExist) {
      console.log('新增' + value);
    } else if(!isEqual(value, oldValue)) {
      // 两个值不相等，则是修改
      console.log('修改' , key + '=' + value);
    }
    
    return res
  }
}


const mutableHandler = {
  get,
  set
}



export {
  mutableHandler
}