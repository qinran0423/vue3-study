<template>
  <div>
    <ul id="array-rendering">
      <li v-for="(item, index) in items" :key="index">
       {{ parentMessage }} - {{ index }} - {{ item.message }}
      </li>
    </ul>
    
    <ul id="v-for-object" class="demo">
      <li v-for="value in myObject">
        {{ value }}
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
export default {
  props: {
    title: {
      type: String,
      default: 'randy'
    }
  },
  setup (props) {
    const { title } = toRefs(props)
    console.log(title);
    const data = reactive({
      parentMessage: 'Parent',
      items: [{ message: 'Foo' }, { message: 'Bar' }],
      myObject: {
        title: 'How to do lists in Vue',
        author: 'Jane Doe',
        publishedAt: '2016-04-10'
      }
    })

    return {...data}
  }
}
</script>

<style scoped>

</style>