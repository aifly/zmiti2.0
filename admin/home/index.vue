<template>
	<div class="wm-myreport-main-ui">


		首页

		


	
	


	</div>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../../common/lib/util';
	import Vue from 'vue';
	import zmitiActions from '../../common/action';
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
			this.userinfo = zmitiUtil.getUserInfo('adminlogin');
			zmitiUtil.ajax({
				isAdmin:true,//
				data:{
					action:zmitiActions.addAdminUser,
					info:{
						adminusername:"xuchang",
						adminpwd:'xuchang',
						realname:'徐畅',
						adminmobile:'15718879215',
						groupid:1,
						adminemail:'xuc@linten.cn',
						isover:0,
						admincomment:'aa'
					}
				},
				success(data){
					console.log(data);
				}
			});

		},
		
		methods:{

			
			
		}
	}
</script>
 

