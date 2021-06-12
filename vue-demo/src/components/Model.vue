<template>
  <div>
		<button @click="btn = true">Teleport</button>
		<teleport to='body' >
			<div v-if="btn" class="model">
				I am teleport

				<button @click="btn = false">hidden</button>
			</div>
		</teleport>
	</div>
</template>

<script>
import { reactive , ref, toRefs} from 'vue';
export default {
  setup() {
		let btn =  ref(false)
		return {btn}
	}
};
</script>


<style>
	.model{
		position: absolute;
		left: 50%;
		top: 300px;
		width: 300px;
		height: 300px;
	}
</style>
