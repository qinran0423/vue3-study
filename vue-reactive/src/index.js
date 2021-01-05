import { reactive } from '../reactivity/index'


const state = reactive({
  name: 'randy',
  hobby: ['sing', 'travel']
})


// console.log(state.name);
// state.name = 'qin'


// state.hobby

// state.hobby[0] ='game'

state.hobby.push('coding')