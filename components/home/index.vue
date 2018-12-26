<template>
	<div class="wm-myreport-main-ui">


		首页

		


	
	


	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	import QRCode from '../lib/qrcode';
	import Detail from '../../common/mask/detail';

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
			Detail
		},

		beforeCreate(){
			window.s = this;
			//var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

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
 

