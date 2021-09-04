
let currentEffect;

//依赖
class Dep {

  constructor(val) {
    // 存储依赖， 使用Set 因为依赖不能重复收集
    this.effects = new Set()
    this._val = val
  }

  get value() {
    this.depend()
    return this._val
  }

  set value(newval) {
    this._val = newval
    this.notice()
  }
  // 1.收集依赖
  depend() {
    if (currentEffect) {
      this.effects.add(currentEffect)
    }
  }

  // 2.触发依赖
  notice() {
    this.effects.forEach(eff => eff())
  }
}

export function effectWatch(effect) {
  // 收集依赖
  currentEffect = effect
  effect()
  currentEffect = null
}


// const dep = new Dep(10)

// let b;

// effectWatch(() => {
//   b = dep.value + 10
//   console.log(b);
// })


// dep.value = 20


// reactive
// dep -> number string
// object -> key -> dep 
const targetMap = new Map()
function getDep(target, key) {
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Dep()
    depsMap.set(key, dep)
  }

  return dep;
}

export function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      console.log(key);
      const dep = getDep(target, key)
      // 依赖收集
      dep.depend()
      return Reflect.get(target, key)
    },
    set(target, key, val) {
      // 触发依赖
      // 要获取到dep对象
      const dep = getDep(target, key)
      const result = Reflect.set(target, key, val)
      dep.notice()
      return result;
    }

  })
}

// const user = reactive({
//   age: 18
// })

// let double
// effectWatch(() => {
//   console.log('--reactive---');
//   double =  user.age
//   console.log(double);
// })

// user.age = 20