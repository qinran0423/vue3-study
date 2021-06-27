
<script lang="jsx">
import {ref} from 'vue'
export default {
  setup() {
    const counter = ref(0);
    const onclick = () => {
      counter.value ++
    }
    return () => (
      <div>
        <div>comp111</div>
        <p onClick={onclick}>{counter.value}</p>
      </div>
    )
  }
}
</script>

<style scoped>

</style>