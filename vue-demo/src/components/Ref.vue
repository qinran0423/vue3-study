<template>
  <div>
    ref components
  </div>
</template>

<script>
import { reactive, ref, toRef } from 'vue'
export default {
  setup () {
    const count = ref(0);
    console.log(count.value);
    count.value ++;
    console.log(count.value);
    
    const state = reactive({
      foo: 1,
      bar: 2
    })

    const fooref = toRef(state, 'foo')

    fooref.value ++;
    console.log(state.foo);

    state.foo ++;
    console.log(fooref.value);

    return {}
  }
}
</script>

<style scoped>

</style>