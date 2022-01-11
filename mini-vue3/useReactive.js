const { reactive, computed, watchEffect } = require('vue')

let obj = reactive({
  count: 1
})

let double = computed(() => obj.count * 2)
obj.count = 2

watchEffect(() => {
  console.log('数据被修改了', obj.count, double.value);
})