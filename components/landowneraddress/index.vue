<template>
	<!--地主配送地址页面-->
	<div class="symbin-landowneraddress-ui ">
		地主配送地址页面
	</div>

</template>
<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import farmerUtil from '../lib/farmerutil';
	import Vue from 'vue';
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

			var obserable = Vue.obserable;

			var id = this.$route.params.id;


			farmerUtil.getColumnByMenuId(id,this);
			
		},
	}
</script>
 