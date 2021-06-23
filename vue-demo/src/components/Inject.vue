<template>
  <div>
    <h3>Inject</h3>
    <h4>{{num}}</h4>
    <h4>{{data.longitude}}</h4>  
  </div>
</template>

<script>
import { inject } from 'vue'
export default {
  setup () {
    const num = inject('num',3)
    const data = inject('data')
    return {num, data}
  }
}
</script>