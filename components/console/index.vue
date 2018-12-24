<template>
	<div class="symbin-console-ui">
		控制台页面
	</div>

</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	//import symbinTable from './symbintable.vue';
	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return {

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			
		},
		mounted(){//页面加载完成后显示

			
		},
	}
</script>
 