<template>
  <h1>{{ msg }}</h1>
  <h2>{{msg2}}</h2>
  <p>{{counter}}</p>
  <p>{{doubleCounter}}</p>
  <p ref="desc"></p>
  <ModelButton/>
  <Emits @myclick="myClick"/>
</template>

<script>
import { reactive, computed, onMounted,onUnmounted, ref, toRefs, watch } from 'vue'
import ModelButton from './ModelButton.vue'
import Emits from './Emits.vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    ModelButton,
    Emits
  },
  methods:{
    myClick() {
      console.log('====================================');
      console.log('自定义事件');
      console.log('====================================');
    }
  },
  setup() {
    const {counter, doubleCounter} = useCounter()

    let msg2 = ref('message')

    const desc = ref(null)

    watch(counter, (val, oldVal) => {
      const p = desc.value
      p.textContent = `counter change from ${oldVal} to ${val}`
    })
    
    return {counter, doubleCounter, msg2, desc}
  }
}


function useCounter() {
  const data = reactive({
    counter: 1,
    doubleCounter: computed(() => data.counter *2)
  })

  let timer

  onMounted(() => {
    timer = setInterval(() => {
      data.counter ++
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return toRefs(data)
}

</script>
