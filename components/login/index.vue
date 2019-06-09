<template>
	<div  class="zmiti-login-ui lt-full" :class='{"active":showJigsaw}'  :style="{background:'url('+imgs.loginBg+') no-repeat center center',backgroundSize:'cover'}" >
		<section></section>
		<section> 
			<div class="zmiti-login-C">
				<h2>智媒体用户管理系统登陆</h2>
				<div class="zmiti-login-form">
					<div :class="{'active':userFocus}">
						<label>
							<img :src="imgs.loginPerson" alt="">
							<input @focus='userFocus = true' @blur='userFocus = false' type="text" v-model="username" placeholder="请输入账号">
						</label>
						<div class='zmiti-login-error' v-if='loginError'>{{loginError}}</div>
					</div>
					<div :class="{'active':passFocus}">
						<label>
							<img :src="imgs.loginLock" alt="">
							<input  @focus='passFocus = true' @blur='passFocus = false'  @keydown.13='login' type="password" v-model="password" placeholder="请输入密码">
						</label>
					</div>
					<div class='zmiti-remember-pass'>
						<label><router-link to='register'>用户注册</router-link></label>
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


			<div class='zmiti-jigsaw' ref='jigsaw' v-show='showJigsaw'>

			</div>
			
		</section>
	</div>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../../common/lib/util';
	import '../../common/jigsaw';
	import Vue from "vue";
	import '../../common/directive';

	var userActions = zmitiUtil.userActions;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				showJigsaw:false,
				imgs:window.imgs,
				username:'',
				userFocus:false,
				passFocus:false,
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

				/* this.showJigsaw=true;
				/* this.showJigsaw=true;
				return; */


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
				zmitiUtil.ajax({
					remark:'userLogin',
					data:{
						action:userActions.userLogin.action,
						username:_this.username,
						password:_this.password
					},
					success(data){
						s.showLoading = false;
						if(data.getret === 0 || data.getret === 100){
							var param = data;

							var p = data;
							p.username =  _this.username;
							window.localStorage.setItem('login',JSON.stringify(data));

							if(_this.checked){
								window.localStorage.setItem('zmiti_user_username',_this.username);
								window.localStorage.setItem('zmiti_user_password',_this.password);
							}else{
								window.localStorage.setItem('zmiti_user_username','');
								window.localStorage.setItem('zmiti_user_password','');
							}
							
							_this.$Message.success('登录成功~');
							if(data.getret == 100){

							}
							window.location.hash = '#/home';
							
							
							window.location.reload();
							_this.isLogined = true;
							
						}else{
							_this.toastError(data.msg);
						}
					}
				})
				
			},
			checkCache(){
				var username = window.localStorage.getItem('zmiti_user_username'),
					password = window.localStorage.getItem('zmiti_user_password');
				
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
			this.isNotChrome = !ua.match(/chrome\/([\d.]+)/);

			this.$nextTick(()=>{
				window.jigsaw.init(this.$refs['jigsaw'],function(){
					this.showJigsaw = false;
				}.bind(this));
			});

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
 