<template>
	<div class="wm-adminuser-main-ui">
		<header>
			<div>用户管理</div>
			<section>
				<Button type="primary" icon='md-add-circle' @click="addNewAduser">新增用户</Button>
			</section>
		</header>
		<Table ref='scorelist'  :height='viewH - 64- 70 ' :data='userList' :columns='columns'   stripe></Table>

		<Modal
			v-model="visible"
			:title="currentUserId === -1? '新增评委':'编辑评委'"
			@on-ok="ok"
			@on-cancel="cancel">
			<Form ref="formAdmin" :model="formAdmin" :label-width="72" >
				<FormItem label="账号：" prop="ratername">
					<Input  v-model="formAdmin.username" placeholder="账号" autocomplete="off" />
					
				</FormItem>
				<FormItem label="密码：" prop="userpwd">
					<Input ref='pass' :disabled='!showPass' v-model="formAdmin.userpwd" placeholder="密码" autocomplete="off" />
					<Button type="primary" style="margin-top:10px" @click='modifyPass'>{{showPass?'确定修改':'修改密码'}}</Button>
				</FormItem>
				<FormItem label="昵称：" prop="nickname">
					<Input v-model="formAdmin.nickname" placeholder="昵称" autocomplete="off" />
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				visible:false,
				imgs:window.imgs,
				isLoading:false,
				currentUserId:-1,
				split1: 0.8,
				showPass:false,
				viewH:window.innerHeight,

				formAdmin:{
					userpwd:'111111'
				},
				userList:[],
				columns:[
					{
						title:"用户名",
						key:'username',
						align:'center'
					},
					{
						title:"昵称",
						key:'nickname',
						align:'center'
					},{
						title:'操作',
						key:"action",
						align:'center',
						render:(h,params)=>{
							return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
											this.currentUserId = params.row.userid;
											this.formAdmin = params.row;
											this.visible = true;
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗"
									},
									on:{
										'on-ok':()=>{
											this.delAdUser(params.row.userid);
										},
										
									}
								},[
									h('Button', {
										props: {
											type: 'error',
											size: 'small',
											icon:'trash-a'
										},
										on: {
											click: () => {
												
												//this.remove(params.index,params.row.employeeid)
											}
										}
									}, '删除')
								]),
                            ]);
						}
					}
				],

				
				userinfo:{}
			}
		},
		components:{
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
			//this.addadUser();
			this.getaduserlist();
			
		},
		
		methods:{

			modifyPass(){
				if(!this.showPass){
					this.showPass = true;
					this.$refs['pass'].focus();

				}else{
					if(!this.formAdmin.userpwd){
						this.$Message.error('密码不能为空');
						return;
					}
					var s = this;
					symbinUtil.ajax({
						url:window.config.baseUrl+'/wmadadmin/updateuserpwd',
						data:{
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername,
							userid:s.formAdmin.userid,
							userpwd:s.formAdmin.userpwd
						},
						success(data){
							s.$Message[data.getret === 0 ?'success':'error'](data.getmsg);
						}
					})
				}
			},
			delAdUser(userid){
					var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/wmadadmin/deladuser/',
					validate:s.validate,
					data:{
						userid,
						deltype:0,
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername
					},success(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
							s.getaduserlist();
						}
						else{
							s.$Message.error(data.getmsg);
						}
					}

				})
			},

			addNewAduser(){
				this.currentUserId = -1;
				this.formAdmin = {
					userpwd:'111111'
				};
				this.visible = true;
			},
			getaduserlist(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/wmadadmin/getaduserlist/',
					//validate:s.validate,
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername
					},
					success(data){
						console.log(data);
						if(data.getret === 0){
							s.userList = data.list;
						}
						else{
							s.$Message.error(data.getmsg);
						}
					}

				})
			},


			addadUser(){

				 
			},

			 
			ok(){
				var s = this;

				if(s.currentUserId<=-1){

					symbinUtil.ajax({
						url:window.config.baseUrl+'/wmadadmin/addaduser/',
						validate:s.validate,
						data:{
							username:s.formAdmin.username,
							userpwd:s.formAdmin.userpwd,
							nickname:s.formAdmin.nickname,
							status:1,
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername
						},success(data){
							if(data.getret === 0){
								s.$Message.success(data.getmsg);
								s.getaduserlist();
							}
							else{
								s.$Message.error(data.getmsg);
							}
						}
	
					})
				}else{
					symbinUtil.ajax({
						url:window.config.baseUrl+'/wmadadmin/editaduser/',
						validate:s.validate,
						data:{
							username:s.formAdmin.username,
							nickname:s.formAdmin.nickname,
							userid:s.currentUserId,
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername
						},success(data){
							if(data.getret === 0){
								s.$Message.success(data.getmsg);
							}
							else{
								s.$Message.error(data.getmsg);
							}
						}
	
					})
				}
				
			},
			cancel(){
				this.formUser = {};
			}
		}
	}
</script>
 