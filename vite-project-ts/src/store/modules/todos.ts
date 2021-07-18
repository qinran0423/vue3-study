import { Module } from "vuex"
import { State } from "..";
import { Todo } from "../../types"


const initialState = {
  todos: [] as Todo[]
}

export type TodoState = typeof initialState;

export default {
  state: initialState,
  namespaced: true,
} as Module<TodoState,State>