
let currentEffect;

//依赖
class Dep {

  constructor(val) {
    // 存储依赖， 使用Set 因为依赖不能重复收集
    this.effects = new Set()
    this._val = val
  }

  get value() {
    return this._val
  }

  set value(newval) {
    this._val = newval
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

function effectWatch(effect) {
  // 收集依赖
  currentEffect = effect
  effect()
  dep.depend()
  currentEffect = null
}


const dep = new Dep(10)

let b;

effectWatch(() => {
  b = dep.value + 10
  console.log(b);
})


dep.value = 20
dep.notice()