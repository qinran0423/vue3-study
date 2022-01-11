let getDouble = n => n * 2
let obj = {}
let count = 1
let double = getDouble(count)


// Object.defineProperty(obj, 'count', {
//   get() {
//     return count
//   },
//   set(val) {
//     count = val
//     double = getDouble(val)
//   }
// })

// console.log(double);
// obj.count = 2
// console.log(double);


// ======proxy


let proxy = new Proxy(obj, {
  get: function (target, name) {
    return target[name]
  },
  set: function (target, prop, value) {
    target[prop] = value
    if (prop === 'count') {
      double = getDouble(value)
    }
  },
  deleteProperty(target, prop) {
    delete target[prop]
    if (prop === 'count') {
      double = NaN
    }
  }
})


console.log(obj.count, double);
proxy.count = 2
console.log(obj.count, double);
delete proxy.count
console.log(obj.count, double);
