<template>
  <div @touchmove="onTouchMove">
    <div class="mask" @click="hideOnBlur && (obj.currentValue = false)" v-show="obj.currentValue"></div>
    <input v-model="obj.currentValue" style="display:none">
    <transition :name="dialogTransition">
      <div class="popupBox" v-show="obj.currentValue">
        <slot></slot>
      </div>
    
    </transition>
  </div>
</template>

<script setup>
import { defineProps, onMounted, reactive, toRefs, watch, defineEmits} from 'vue'

const props = defineProps({
  // 是否显示
  value: {
    type: Boolean,
    default: false
  },
  // 点击遮罩层关闭弹框
  hideOnBlur: {
    default(){
      return true
    }
  },
  // 弹框动画
  dialogTransition: {
    type: String,
    default: 'slide-fade'
  },
  // 禁止页面滚动
  scroll: {
    type: Boolean,
    default: true
  },
  num: {
    type: Number,
    default: 0
  }
})


const {value, scroll, hideOnBlur, num} = toRefs(props)
console.log(value.value);

const obj = reactive({
  currentValue: false
})

const emit = defineEmits(['on-show','on-hide', 'input'])

watch(() => obj.currentValue, (newVal, oldVal) => {
  emit(newVal ? 'on-show': 'on-hide')
  emit('input', newVal)
})

watch([value], (newVal, oldVal) => {
  console.log('11111', newVal);
  obj.currentValue = newVal
})

watch(() => num, (newVal, oldVal) => {
  console.log('11111', newVal);
  obj.currentValue = newVal
})

function onTouchMove(e) {
  console.log('sss');
  !scroll.value && e.preventDefault();
}

onMounted(() => {
  if(typeof value.value !== "undefined") {
    obj.currentValue = value.value
  }
})

</script>

<style lang="scss" scoped>
/*遮罩层*/
.mask {
  position: fixed;
  z-index: 50;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
}
.popupBox {
  position: fixed;
  bottom: 0px;
  left: 0px;
  max-width: 100%;
  max-height: 100%;
  min-width: 100%;
  min-height: 50px;
  background: #fff;
  z-index: 51;
  transform: translateY(0%);
  font-size: 0.3rem;
}
.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter,
.slide-fade-leave-active {
  transform: translateY(100%);
  opacity: 0;
}

</style>