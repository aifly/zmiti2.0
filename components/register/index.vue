<template>
	<div  class="wm-reg-ui lt-full">
		<header>
			<div>
				<div><img :src="imgs.logo"  /></div>
				<div>
					已有账号：<a href='#/login'>去登录></a>
				</div>
			</div>
		</header>
		<section>
			<div class="wm-reg-C">
				<div class="wm-reg-form">
					<h2>公益广告上报系统,欢迎注册～</h2>
					<div class="wm-reg-form-item wm-require">
						<label for="">用户名：</label><input type="text" @blur="checkUserName" v-model='formUser.username'>
						<div class="wm-reg-error" v-if='userError'>{{userError}}</div>
					</div>
					<div class="wm-reg-form-item wm-require">
						<label for="">密码：</label><input type="password" v-model="formUser.password">
						<div class="wm-reg-error" v-if='passError'>{{passError}}</div>
					</div>
					<div class="wm-reg-form-item wm-require">
						<label for="">确认密码：</label><input type="password" v-model="formUser.repassword">
						<div class="wm-reg-error" v-if='repassError'>{{repassError}}</div>
					</div>
					<div class="wm-reg-form-item wm-require">
						<label for="">姓名：</label><input type="text" v-model="formUser.nickname">
						<div class="wm-reg-error" v-if='usernameError'>{{usernameError}}</div>
					</div>
					<div class="wm-reg-form-item wm-require">
						<label for="">手机：</label><input type="text" v-model="formUser.mobile">
						<div class="wm-reg-error" v-if='mobileError'>{{mobileError}}</div>
					</div>
					<div class="wm-reg-form-item wm-require">
						<label for="">单位：</label><input type="text" v-model="formUser.company">
						<div class="wm-reg-error" v-if='companyError'>{{companyError}}</div>
					</div>

					<div class="wm-reg-form-item " >
						<label for="">地址：</label>
						<Cascader v-model="formUser.cityids"  :load-data="getCityById"  change-on-select :data='provinceList'></Cascader>
					</div>

					<div class="wm-reg-form-item ">
						<label for="">详细地址：</label><input type="text" v-model="formUser.detailaddress">
					</div>
					<div class="wm-reg-form-item ">
						<label for="">邮箱：</label><input type="text"  v-model="formUser.email">
					</div>
					<div class="wm-reg-form-item wx-reg-btn" @click="reg">
						注 册
					</div>
				</div>
				<div class="wm-copyright">
					中国文明网 &copy;版权所有
				</div>
			</div>
		</section>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';

	import Vue from "vue";

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				username:'',
				password:'',
				checked:false,
				isLogined:false,
				isMove:false,
				showLoading:false,
				showError:false,
				errorMsg:'',
				provinceList:[
				
				],
				userError:"",
				companyError:"",
				usernameError:"",
				passError:"",
				repassError:"",
				mobileError:"",
				formUser:{
					cityids:[]
				},

				viewH:document.documentElement.clientHeight
			}
		},
		components:{
		},
		
		methods:{
			checkUserName(){
				if(!this.formUser.username){
					this.toastError('请输入用户名');
					return;
				}
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+"/wmadvuser/isexist/",
					data:{
						username:s.formUser.username
					},
					success(data){
						
						if(data.getret === 0){

						}else{
							s.toastError(data.getmsg);
						}
					}
				})
			},
			toastError(msg =  '用户名不能为空',type='userError'){
				this[type] = msg;
				setTimeout(() => {
					this[type] = '';
				}, 2000);
			},
			reg(){
				var _this = this;
				
				if(!this.formUser.username){
					this.toastError();
 					return;
				}
				if(!this.formUser.password){
					this.toastError('密码不能为空','passError');
 					return;
				}
				if(!this.formUser.repassword){
					this.toastError('确认密码不能为空','repassError');
 					return;
				}
				if(this.formUser.repassword !==this.formUser.password) {
					this.toastError('两次密码输入不一致','repassError');
 					return;
				}
				if(!this.formUser.nickname){
					this.toastError('姓名不能为空','usernameError');
 					return;
				}
				if(!this.formUser.mobile){
					this.toastError('手机不能为空','mobileError');
 					return;
				}
				if(!this.formUser.company){
					this.toastError('单位不能为空','companyError');
 					return;
				}

				var params = this.formUser;
				console.log(params);
				params.userpwd = params.password;
				params.companyname = params.company;
				params.provinceid = params.cityids[0];
				params.cityid = params.cityids[1];
				params.areaid = params.cityids[2];
				this.showLoading = true;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadvuser/regist/',
					data:params,
					success(data){
						if(data.getret === 0){
							_this.$Message.success({
								content: '注册成功,等待管理员审核……',
                    			duration: 4,
							});
							setTimeout(()=>{
								window.location.hash = '#/login'
							},4000)
						}else{
							_this.$Message.error(data.getmsg);
						}
					}
				})
			},
			getCityById(e,callback){
				
				var provinceId = e.__value.split(',')[0];
				var cityid = e.__value.split(',')[1];
				var s = this;

				
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/share/getarealist',
					data:{
						cityid
					},
					success(data){
						if(data.getret === 0){
							console.log(data);
							s.provinceList.forEach((item,i)=>{
								if(item.value === provinceId*1){
									item.children.forEach((child,k)=>{
										if(child.value === cityid*1){
											child.children = child.children || [];
											data.list.map((d,l)=>{
												child.children.push({
													value:d.cityid,
													label:d.name,
													//loading: false
												})
											})
											
										}
									})
									callback();
									
								}
								
							});
							

						}
					}

				})
			},
			getCityData(){
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/share/getcitylist/',
					data:{},
					success(data){
						//console.log(data);
						if(data.getret === 0){
							data.list.map((item,i)=>{
								var children = [];
								item.children && item.children.map((child,l)=>{
									children.push({
										value:child.cityid,
										label:child.name,
										loading: false,
										children:[]
										
									})
								})
								s.provinceList.push({
									value:item.cityid,
									label:item.name,
									children,
									loading: false
								})
							})
						}
					}
				})
			},
			checkCache(){
				/*var username = window.localStorage.getItem('wm_username'),
					password = window.localStorage.getItem('wm_password');
				
				if(username && password){
					this.username = username;
					this.password = password;
					this.checked = true;
				}*/
			}
		
			

		},
		mounted(){
			//this.checkCache();
			this.getCityData();
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
 