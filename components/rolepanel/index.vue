<template>
	<div class="symbin-rolepanel-ui "><!--注意每次页面需要修改此样式文件名，CSS文件也一样-->
		权限首页
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	//import symbinTable from './symbintable.vue';
	export default {
		props:[],
		name:'zmitiindex',

		data(){
			return {

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);

		},
		methods:{
			
		},
		mounted(){//页面加载完成后显示

			
		},
	}
</script>
 