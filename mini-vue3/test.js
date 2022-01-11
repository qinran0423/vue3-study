
// let count = 1
// let double = count * 2
// console.log(double);
// count = 2
// console.log(double);

// // 想要去实现响应式

let count = 1

let getDouble = n => n * 2
let double = getDouble(count)
console.log(double); // 2

count = 2
console.log(double); // 2
double = getDouble(count)
console.log(double); // 4


