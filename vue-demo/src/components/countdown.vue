<template>
  <div>
    <p>倒计时：{{day}}天 {{hour}}：{{min}}：{{second}}</p>
  </div>
</template>

<script>
import { reactive, computed, onMounted,onUnmounted, ref, toRefs, watch } from 'vue'
  export default {
    setup() {
      const data = reactive({
        curStartTime: 1623801600000,
        day: '0',
        hour: '00',
        min: '00',
        second: '00',
      })

      function counttime() {
        let date = new Date().getTime()
        let leftTime = data.curStartTime - date
        if(leftTime > 0) {
          data.day = Math.floor(leftTime/1000/60/60/24)
          // 时
          let h = Math.floor(leftTime / 1000 / 60 / 60 % 24)
          data.hour = h < 10 ? '0' + h : h
          // 分
          let m = Math.floor(leftTime / 1000 / 60 % 60)
          data.min = m < 10 ? '0' + m : m
          // 秒
          let s = Math.floor(leftTime / 1000 % 60)
          data.second = s < 10 ? '0' + s : s
        } else {
          data.day = 0
          data.hour = '00'
          data.min = '00'
          data.second = '00'
        }


        if (Number(data.hour) === 0 && Number(data.day) === 0 && Number(data.min) === 0 && Number(data.second) === 0) {
          return
        } else {
        // counttime,
          setTimeout(counttime, 1000)
        }
      }
      onMounted(() => {
        counttime()
      })

      return toRefs(data)
    }
    


  }
</script>
