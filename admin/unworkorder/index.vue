<template>
	 <WorkorderList :status='[1,2]' text='回复'></WorkorderList>
</template>

<style lang="scss" scoped>
</style>
<script>
	import WorkorderList from '../workorderlist';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				
			}
		},
		components:{
			WorkorderList
		},

		beforeCreate(){
		
		},
		mounted(){
		},
		watch:{
			
		},
		
		methods:{

		}
	}
</script>
 