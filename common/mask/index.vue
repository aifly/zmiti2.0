<template>
	<Drawer @on-visible-change='change' title="" placement="right" :width='500' :closable="false" v-model="showPannel">
		<slot  name="mask-content"></slot>
	</Drawer>
</template>
<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import Vue from 'vue';
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
				showPannel:false

			}		
		},
		methods: {
			change(e){
			},
			hidePannel(){
				this.showPannel = false;
			},
			
			afterLeave(){
				this.$emit('input', false); 
				this.$emit('closeMaskPage');
			}	
			
		},
		mounted(){
			Vue.obserable.on('toggleMask',(data)=>{
				this.showPannel = data
			})
		}
	}
</script>

