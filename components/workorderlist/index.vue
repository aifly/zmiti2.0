<template>
	<div class="zmiti-workorder-main-ui lt-full">
		<header class="zmiti-tab-header">
			<div>提交工单</div>
			<div>
				<Button type='primary'>提交工单</Button>
			</div>
		</header>

	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>
	import zmitiUtil from '../../common/lib/util';
	var userActions = zmitiUtil.userActions;
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				formWorkOrder:{},

				workordertype:0,
				
				imgs:window.imgs,
				userinfo:{
					username:'一位巨蟹',
					avatar:window.imgs.zmiti1
				},
				ruleValidate: {
					setcontent: [
						{ required: true, message: '问题描述不能为空', trigger: 'blur' }
					],
					setusermobile:[
						{ required: true, message: '手机号不能为空', trigger: 'blur' }
					]
				},
			
			
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
			
			this.userinfo = zmitiUtil.getUserInfo();
			var week = ['日','一','二','三','四','五','六'];
			var D = new Date();
			var year = D.getFullYear();
			var month = D.getMonth()+1;
			var date = D.getDate();
			var day = "星期"+week[D.getDay()]



			this.date = '今日，'+year+'年'+month+'月'+date+'日 '+ day + ' ，欢迎回到智媒体2.0单位控制平台';

			



		},
		
		methods:{

			
			
		}
	}
</script>
 

