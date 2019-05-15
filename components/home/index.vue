<template>
	<div class="wm-myreport-main-ui">


		首页

		


	
	


	</div>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../../common/lib/util';
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				
				imgs:window.imgs,
				
			}
		},
		components:{
		},

		beforeCreate(){
			window.s = this;
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		watch:{
			
		},
		mounted(){
			


		},
		
		methods:{

			
			
		}
	}
</script>
 

