<template>
	<div class="wm-adminuser-main-ui">
		<header>
			<div>用户管理</div>
			<section>
				<input type="text" placeholder="请输入昵称或用户名搜索" v-model='kw'/>
				<Button type="primary" icon='md-add-circle' v-if='!currentAuth.userid' @click="addNewAduser">新增用户</Button>
			</section>
		</header>
		<Table v-if='!currentAuth.userid' ref='scorelist'  :height='viewH - 64- 70 ' :data='userList' :columns='columns'   stripe></Table>
		<Table v-else  :data='currentAuth.resoucelist' :columns='columns1'   stripe></Table>
		

		<Modal
			v-model="visible"
			:title="currentUserId === -1? '新增用户':'编辑用户'"
			@on-ok="ok"
			@on-cancel="cancel">
			<Form ref="formAdmin" :model="formAdmin" :label-width="72" >
				<FormItem label="账号：" prop="ratername">
					<Input :disabled = 'currentUserId !== -1'  v-model="formAdmin.username" placeholder="账号" autocomplete="off" />
					
				</FormItem>
				<FormItem label="密码：" prop="userpwd">
					<Input ref='pass' :disabled='!showPass' v-model="formAdmin.userpwd" placeholder="密码" autocomplete="off" />
					<Button :disabled='currentUserId ===-1' type="primary" style="margin-top:10px" @click='modifyPass'>{{showPass?'确定修改':'修改密码'}}</Button>
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
	import Vue from 'vue';


	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				content:"",
				kw:'',
				visible:false,
				currentAuth:{},
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
				columns1:[
					{
						title:"征集",
						key:'resourcecnname',
						align:'center'
					},{
						title:"权限",
						key:'authtype',
						align:'center',
						render:(h,params)=>{

							return h('div',{
								
							},[
								h('Checkbox',{
									on:{
										'on-change':(val)=>{
											if(!val){
												this.currentAuth.resoucelist[params.index].authtype = 0;
											}else{
												this.currentAuth.resoucelist[params.index].authtype = 1;
											}
										}
									},
									props:{
										disabled:params.row.authtype >= 2 ,
										value:params.row.authtype <= 2 && params.row.authtype > 0
									}
								},'读'),
								h('Checkbox',{
									on:{
										'on-change':(val)=>{
											if(!val){
												this.currentAuth.resoucelist[params.index].authtype = 1;
											}else{
												this.currentAuth.resoucelist[params.index].authtype = 2;
											}
										}
									},
									props:{
										value:params.row.authtype === 2
									}
								},'写'),
								h('Button',{
									props:{
										size:'small',
										type:'primary'
									},
									on:{
										click:()=>{
											this.updateAuth(params.row,params.index,this.currentAuth.userid);
										}
									}
								},'确定'),
							]);
						}
					}
				],
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
					},
					{
						title:"权限",
						key:'auth',
						align:'center',
						render:(h,params)=>{
							var list = params.row.resoucelist;
							var taglist = [];
							list.forEach((item,i)=>{
								if(item.resourcecnname){
									var obj = h('div',{},[
										h('span',{},item.resourcecnname ),
										h('span',{
											style:{
												fontWeight:'bold',
												marginLeft:'10px',
												color:'green'
											},
											
										},(item.authtype === 0 ? '': item.authtype === 1? ' 读' : '读 / 写'))
									]);
									taglist.push(obj)
								}
							})
							return h('div',{},taglist,'11');
						}
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
										margin: '2px 5px',
										border:'none',
										background:'#fab82e',
										color:'#fff',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'

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
											size: 'small'
										},
										on: {
											click: () => {
												
												//this.remove(params.index,params.row.employeeid)
											}
										}
									}, '删除')
								]), h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 5px',
										border:'none',
										background:params.row.status*1 === 0 ? 'rgb(2, 29, 236)':'#b20000',
										color:'#fff',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'

                                    },
                                    on: {
                                        click: () => {
											/*this.currentUserId = params.row.userid;
											this.formAdmin = params.row;
											this.visible = true;*/

											this.checkUser(params);

											
                                        }
                                    }
								}, params.row.status*1 === 1 ? '撤销':"审核"),
								h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 5px',
										border:'none',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'

                                    },
                                    on: {
                                        click: () => {
											this.currentAuth = params.row;

											var s = this;
											symbinUtil.ajax({
												url:window.config.baseUrl+'/wmadadmin/getuserresourceauth',
												data:{
													admintoken:s.userinfo.admintoken,
													adminusername:s.userinfo.adminusername,
													userid:s.currentAuth.userid,
												},
												success(data){
													
													if(data.getret === 0){
														s.currentAuth.resoucelist = data.list;
													}
												}
											})
										}
                                    }
                                }, '权限分配')
                            ]);
						}
					}
				],

				
				userinfo:{},
				defaultUserList:[]
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

			Vue.obserable.on('freshadminuser',()=>{
				this.currentAuth = {};
			})

			var s = this;

 

		},
		watch:{
			kw(val){
				if(val){
					this.userList = this.defaultUserList.filter(item=>{
						return item.username.indexOf(val)>-1 || item.nickname.indexOf(val)>-1;
					})
				}else{
					this.userList = this.defaultUserList.concat([]);
				}
			}
		},
		
		methods:{
			updateAuth(row,index,userid){
				//this.currentAuth.resoucelist = this.currentAuth.resoucelist.concat([]);
				console.log(row);
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/wmadadmin/giveuserpermissions',
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername,
						resourceid:row.resourceid,
						userid,
						authtype:row.authtype
					},
					success(data){
						console.log(data);
						s.$Message[data.getret === 0 ? "success":"error"](data.getmsg);
					}
				})
			},
			onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            },

			checkUser(params){
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/checkregistuser?t=1',
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername,
						userids:params.row.userid,
						status:params.row.status === 1 ? 0 : 1,
					},
					success(data){
						s.$Message[data.getret === 0 ? "success":"error"](data.getmsg);
						s.getaduserlist();
					}

				})
			},

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
						_this:s,
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
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/deladuser/',
					validate:s.validate,
					data:{
						userid,
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
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/getaduserlist/',
					//validate:s.validate,
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername,
						pagenum:1000,
						status:-1,//查询全部
					},
					success(data){
						console.log(data);
						if(data.getret === 0){
							s.userList = data.list;
							s.defaultUserList = data.list.concat([]);
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
						_this:s,
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
						_this:s,
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
 