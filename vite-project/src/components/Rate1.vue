<template>
  <div :style="fontstyle">
    <slot></slot>
    <div class="rate" @mouseout="mouseOut">
      <span @mouseover="mouseOver(num)" v-for="num in 5" :key="num">☆</span>
      <span class="hollow" :style="fontwidth">
        <span
          @click="onRate(num)"
          @mouseover="mouseOver(num)"
          v-for="num in 5"
          :key="num"
          >★</span
        >
      </span>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";

let props = defineProps({
  modelValue: Number,
  theme: {
    type: String,
    default: "orange",
  },
});

const themeObj = {
  black: "#000",
  white: "#fff",
  red: "#f5222d",
  orange: "#fa541c",
  yellow: "#fadb14",
  green: "#73d13d",
  blue: "#40a9ff",
};
const fontstyle = computed(() => {
  return `color:${themeObj[props.theme]};`;
});

let width = ref(props.modelValue);

function mouseOver(i) {
  console.log(i);
  width.value = i;
}

function mouseOut() {
  width.value = props.modelValue;
}

const fontwidth = computed(() => `width:${width.value}em`);

let emits = defineEmits(["update:modelValue"]);
function onRate(num) {
  console.log(num);
  emits("update:modelValue", num);
}
</script>

<style scoped>
.rate {
  position: relative;
  display: inline-block;
}
.rate > span.hollow {
  position: absolute;
  display: inline-block;
  top: 0;
  left: 0;
  width: 0;
  overflow: hidden;
}
</style>
