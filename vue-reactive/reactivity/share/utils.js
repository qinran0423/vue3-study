function isObject(value) {
  return typeof value === 'object' && value !== null
}


function hasOwnProperty(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key)
}

function isEqual(newValue, oldValue) {
  return newValue === oldValue
}

export {
  isObject,
  hasOwnProperty ,
  isEqual
}