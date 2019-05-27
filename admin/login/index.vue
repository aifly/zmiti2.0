<template>
	<div  class="zmiti-login-ui lt-full">
		<section :style="{background:'url('+imgs.adminLoginBg+') no-repeat center bottom',backgroundSize:'cover'}" > 
			<div class="zmiti-login-C">
				<h2>智媒体管理系统登陆</h2>
				<div class="zmiti-login-form">
					<div>
						<label>
							<img :src="imgs.adminUser" alt="">
							<input type="text" v-model="username" placeholder="请输入账号">
						</label>
						<div class='zmiti-login-error' v-if='loginError'>{{loginError}}</div>
					</div>
					<div>
						<label>
							<img :src="imgs.adminLock" alt="">
							<input @keydown.13='login' type="password" v-model="password" placeholder="请输入密码">
						</label>
					</div>
					<div class='zmiti-remember-pass'>
						<label><Checkbox v-model="checked">记住密码</Checkbox></label>
					</div>
					<div class='zmiti-login-btn' v-press>
						<div @click="login">登  录 <Icon v-if='showLoading' type="ios-loading" class="demo-spin-icon-load"></Icon></div>
					</div>
				</div>
				<div class='zmiti-browner-tip' v-if='isNotChrome'>
					<img draggable="false" :src="imgs.brower" alt="">
				</div>
			</div>
			
		</section>
	</div>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../../common/lib/util';
	import zmitiActions from '../../common/action';
	import Vue from "vue";
	import '../../common/directive'

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				username:'',
				password:'',
				loginError:'',
				checked:false,
				isLogined:false,
				isMove:false,
				showLoading:false,
				isNotChrome:false,
				showError:false,
				errorMsg:'',
				viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},

		beforeCreate(){
			 
		},
		
		methods:{
			toastError(msg =  '用户名不能为空'){
				this.loginError = msg;
 				setTimeout(()=>{
 					this.loginError = '';
 				},2000)
			},
			login(){
				var _this = this;


				if(!this.username){
					this.toastError();
 					return;
				}
				if(!this.password){
					this.toastError('密码不能为空');
 					return;
				}

				this.showLoading = true;
				var s = this;
				zmitiUtil.adminAjax({
					isLogin:true, 
					data:{
						action:zmitiActions.adminlogin,
						username:_this.username,
						password:_this.password
					},
					success(data){
						
						s.showLoading = false;
						if(data.getret === 1){
							var param = data;
							var p = data;
							p.username =  _this.username;
							window.localStorage.setItem('adminlogin',JSON.stringify(data));

							if(_this.checked){
								window.localStorage.setItem('wm_username',_this.username);
								window.localStorage.setItem('wm_password',_this.password);
							}else{
								window.localStorage.setItem('wm_username','');
								window.localStorage.setItem('wm_password','');
							}
							
							_this.$Message.success('登录成功~');
							window.location.hash = '#/admin';
							
							
							window.location.reload();
							_this.isLogined = true;
							
						}else{
							_this.toastError(data.msg);
						}
					}
				})
				
			},
			checkCache(){
				var username = window.localStorage.getItem('wm_username'),
					password = window.localStorage.getItem('wm_password');
				
				if(username && password){
					this.username = username;
					this.password = password;
					this.checked = true;
				}
			}
		
			

		},
		mounted(){
			this.checkCache();
			
			var ua = navigator.userAgent.toLowerCase();
			this.isNotChrome = !ua.match(/chrome\/([\d.]+)/)

		}
	}
</script>
 <style>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

 </style>
 