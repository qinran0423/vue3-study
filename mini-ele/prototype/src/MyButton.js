export default {
  name: 'MyButton',
  data() {
    return {
      count: 0,
    };
  },  
  template: '<button v-on:click="count++">click me {{count}}</button>'
}