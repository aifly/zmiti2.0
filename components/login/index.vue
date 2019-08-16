<template>
	<div  class="zmiti-login-ui lt-full" :class='{"active":showJigsaw}'  :style="{background:'url('+imgs.loginBg+') no-repeat center center',backgroundSize:'cover'}" >
		<section></section>
		<section> 
			<div class="zmiti-login-C">
				<div class="zmiti-login-code2">
					<img :src="imgs.loginU1">
				</div>
				<h2 class="zmiti-login-logo"><img :src="imgs.loginU2">用户管理系统登录</h2>
				<div class="zmiti-login-form">
					<div v-if="accountStatus==true">					
						<div class="zmiti-login-account">
							<div id="zmiti-login-accountname" :class="{'active':userFocus}">
								<label>
									<span class="zmiti-login-icon"><img :src="imgs.loginU3" alt=""></span>
									<input class="zmiti-login-account-name" @focus='userFocus = true;errMsg = ""' @blur='userFocus = false' type="text" v-model="username" placeholder="用户名">
								</label>
								<div class='zmiti-login-error' v-if='loginError'>{{loginError}}</div>
							</div>
							<div :class="{'active':passFocus}">
								<label>
									<span class="zmiti-login-icon"><img :src="imgs.loginU4" alt=""></span>
									<input  @focus='passFocus = true;errMsg = ""' @blur='passFocus = false'  @keydown.13='login' type="password" v-model="password" placeholder="密码">
								</label>
							</div>
						</div>
						<div class='zmiti-remember-pass'>
							<label class="zmiti-login-check"><Checkbox v-model="checked">记住密码</Checkbox></label>						
							<label v-if='errMsg' style="color:#f00;font-weight:bold;">{{errMsg}}</label>
							<label><span class="zmiti-login-linkspan"><router-link to='register'>免费注册</router-link></span><span class="zmiti-login-linkspan"><router-link to='login'>忘记密码？</router-link></span></label>
						</div>
						<div class='zmiti-login-btn' v-press>
							<div @click="login" ref='login'>立即登录 <Icon v-if='showLoading' type="ios-loading" class="demo-spin-icon-load"></Icon></div>
						</div>
					</div>
					<div v-if="mobileStatus==true">
						<div class="zmiti-login-mobile" >
							<div class="zmiti-login-number">
								<span class="zmiti-login-icon"><img :src="imgs.loginU3" alt=""></span>
								<input class="zmiti-login-iptmobile" type="text" v-model="usermobile" placeholder="请输入手机号"></div>
							<div class="zmiti-login-code">
								<span class="zmiti-login-icon"><img :src="imgs.loginU4" alt=""></span>
								<input type="text" v-model="usercode" placeholder="请输入验证码">
								<Button :class="['zmiti-login-getcodebtn',{disabled:!this.canClick}]" type="primary" @click="countDown">{{codecontent}}</Button>
							</div>
						</div>
						<div class='zmiti-login-btn zmiti-login-btn2' v-press>
							<div>立即登录 <Icon v-if='showLoading' type="ios-loading" class="demo-spin-icon-load"></Icon></div>
						</div>
					</div>

					<div v-if="weixinStatus==true">
						<div class="zmiti-login-weixin">
							<img :src="weixinData.url" v-if="weixinData!=''">
						</div>
					</div>
					
					<div class="zmiti-login-other">
						<h5><span>或</span></h5>
						<div class="zmiti-login-apibtn">
							<img :src="imgs.loginU5" @click="openMobileform"><img :src="imgs.loginU6" @click="getWXCode">
						</div>
					</div>
				</div>
				<div class='zmiti-browner-tip' v-if='isNotChrome'>
					<img draggable="false" :src="imgs.brower" alt="">
				</div>
			</div>
			<div class='zmiti-jigsaw' ref='jigsaw' v-show='showJigsaw'>

			</div>
			
		</section>
		<div class="zmiti-copyright">麟腾传媒文化有限公司出品 &copy;版权所有</div>

		<div class='zmiti-choose-company' v-if=' company_list.length > 1 '>
			<div>
				<h1>请选择单位</h1>
				<ul>
					<li @click='chooseCompany(company)' v-for='(company,i) in company_list' :key="i">{{company.companyname}}</li>
				</ul>
			</div>
		</div>
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
				errMsg :"",
				password:'',
				loginError:'',
				checked:false,
				isLogined:false,
				isMove:false,
				showLoading:false,
				isNotChrome:false,
				showError:false,
				errorMsg:'',
				company_list:[],
				viewH:document.documentElement.clientHeight,
				accountStatus:true,
				mobileStatus:false,
				weixinStatus:false,
				weixinData:[{
					token:'',
					url:''
				}],
				usermobile:'',
				usercode:'',
				codecontent: '发送验证码',
				totalTime: 60,//60秒
				canClick: true//发送验证码状态
			}
		},
		components:{
		},

		beforeCreate(){
			 
		},
		
		methods:{

			chooseCompany(company){
				var _this = this;
				window.localStorage.setItem('currentCompany',JSON.stringify(company));
				_this.$router.push({path:'/home'})
				setTimeout(() => {
					window.location.reload();
				}, 200);
			},
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
						password:_this.password,
						type:1,
					},
					success(data){
						s.showLoading = false;
						if(data.getret === 7){
							_this.$Message.error(data.msg);
							return;
						}
						if(data.verify >=3){
							s.showJigsaw=true;
							return;
							
						}
						if(data.getret === 0 || data.getret === 100){
							var param = data;

							var p = data;
							p.username =  _this.username;
							

							

							if(_this.checked){
								window.localStorage.setItem('zmiti_user_username',_this.username);
								window.localStorage.setItem('zmiti_user_password',_this.password);
							}else{
								window.localStorage.setItem('zmiti_user_username','');
								window.localStorage.setItem('zmiti_user_password','');
							}
							
							window.localStorage.setItem('login',JSON.stringify(data));
							window.localStorage.setItem('currentCompany',JSON.stringify(data.info.company_list[0]));
							
							if(data.info.company_list.length>1){
								_this.company_list = data.info.company_list;
								//window.localStorage.setItem('currentCompany',JSON.stringify(data.info.company_list[0]));
							}else{
								_this.$router.push({path:'/home'})
								setTimeout(() => {
									window.location.reload();
								}, 30);
								_this.isLogined = true;
							}

							
						}else{
							_this.errMsg = data.msg;
							//_this.$Message.error(data.msg);
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
				
				if(zmitiUtil.getUserInfo() && zmitiUtil.getUserInfo().info){
					this.company_list = zmitiUtil.getUserInfo().info.company_list||[];
				}
			},
			getMobileCode(){
				var s = this;
				zmitiUtil.ajax({
					remark:'getMobileCode',
					data:{
						action:userActions.getMobileCode.action,
						mobile:s.usermobile
					},
					success(data){
						console.log(data,'获取手机验证码成功')
					}
				})
			},
			countDown () {//发送验证码
			 if (!this.canClick) return
			 this.getMobileCode();//获取验证码
			 this.canClick = false
			 this.codecontent = this.totalTime + 's后重新发送'
			 let clock = window.setInterval(() => {
			  this.totalTime--
			  this.codecontent = this.totalTime + 's后重新发送'
			  if (this.totalTime < 0) {
			   window.clearInterval(clock)
			   this.codecontent = '重新发送验证码'
			   this.totalTime = 60
			   this.canClick = true  //这里重新开启
			  }
			 },1000)
			},
			openMobileform(){//打开手机验证码表单
				/*this.accountStatus=false;
				this.mobileStatus=true;
				this.weixinStatus=false;*/
			},
			weixinLogin(){
				zmitiUtil.ajax({
					remark:'getWXFollow',
					data:{
						action:userActions.getWXFollow.action
					},
					success(data){
						console.log(data,'---');
						if(data.getret === 0){
							clearInterval(t);
							s.showQRCodePage = false;
							s.$router.push({path:s.companyList.length<=1?"/nav":'/company/'});
						}
					}
				});
			},			
			openweiXin(){
				this.accountStatus=false;//关闭用户名表单
				this.mobileStatus=false;
				this.weixinStatus=true;
			},
			getWXCode(fn,type=1){//获取二维码
				/*this.accountStatus=false;
				this.mobileStatus=false;
				this.weixinStatus=true;
				var s = this;
				zmitiUtil.ajax({
					remark:'getWXCode',
					data:{
						action: userActions.getWXCode.action,
						type,
					},
					success(data){
						if(data.getret === 0){
							console.log('二维码获取成功')
							s.weixinData=data.info;
							console.log(s.weixinData,'s.weixinData')
						}
					}
				})*/
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
 