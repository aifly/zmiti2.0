<template>
	 <WorkorderList :status='[3]' text='详情'></WorkorderList>
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
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
		},
		watch:{
			
		},
		
		methods:{

		}
	}
</script>
 