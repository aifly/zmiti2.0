<template>
	<div class="wm-manager-main-ui">
		manager
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../../common/lib/verification';
	import zmitiUtil from '../../common/lib/util';
	import Vue from 'vue';

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
 

