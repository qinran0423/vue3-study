<template>
  <div>
    <h3>Provide</h3>
    <Inject/>
  </div>
</template>

<script>
import { provide, reactive, ref } from "vue";
import Inject from './Inject.vue';
export default {
  components: {
    Inject
  },
  setup() {
    const num = ref(0);
    const data = reactive({
      longitude: 90,
      latitude: 135,
    });

    provide("num", num);
    provide("data", data);
    return {};
  },
};
</script>