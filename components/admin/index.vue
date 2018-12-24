<template>
	<div class="symbin-admin-ui">
		<div class="symbin-admin-count">
			<h5>添加管理员</h5>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Tab from '../tab/index';
	import $ from 'jquery';

	export default {
		props:['obserable'],
		data(){
			return{
				theme2:"light",
				
			}
		},
		components:{
			Tab
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			tab(index){
				this.tabIndex = index;
			}
		}
	}
</script>
 