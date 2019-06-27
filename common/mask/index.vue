<template>

	<div class='zmiti-mask-ui lt-full' v-if='value>-1'>

		<transition name='right'
		 @after-leave="afterLeave"
		>
			<div v-if='showPannel'  class='zmiti-mask-right zmiti-scroll' :style="{height:viewH - 50+'px',width:width+'px'}">
				<slot  name="mask-content"></slot>
			</div>
		</transition>

		<div class='lt-full' @click='showPannel=false'></div>
	</div>
	
</template>
<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	export default {
		props:{
		 
			value: {
				type: Number,
				default: function () {
					return -1
				}
			},
			width:{
				type:Number,
				default:function(){
					return 500
				}
			}
		},
		watch:{
			value(val){
				this.showPannel = val>-1;
			}
		},
		data(){
			return{
				viewH:window.innerHeight,
				showPannel:true

			}		
		},
		methods: {
			
			afterLeave(){
				this.$emit('input', false); 
				this.$emit('closeMaskPage');
			}	
		},
	}
</script>

