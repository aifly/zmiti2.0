<template>
	<div class="zmiti-admin-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>管理员管理</div>
				<div>
					<Button type="primary" @click="addAdmin">新增管理员</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				管理员编号 <input type="text">
			</section>
			
			<div class='zmiti-admin-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-admin-table' :class="{'active':showDetail}">
					<Table  :data='adminList' :columns='columns'></Table>
				</div>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
			<div class='lt-full' v-show='showDetailPage'>
				<div class='zmiti-left-pannel' @click="showDetail = false" :style="{height:viewH+'px'}"></div>
				<transition name='detail'>
					<section class='zmiti-add-form zmiti-scroll' v-if='showDetail' >
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt=""  @click='showDetail = false' >
							<span>基础信息</span>
						</header>
						<div class='zmiti-admin-avatar' @click="showAvatarModal = true">
							<span class='zmt_iconfont' v-html='formAdmin.avatar'></span>
							<label>更换头像</label>
						</div>
						<Form class='zmiti-add-form-C' :model="formAdmin" :label-width="80">
							<FormItem label="用户名：">
								<Input v-model="formAdmin.adminusername" placeholder="用户名：" />
							</FormItem>
							<FormItem label="真实姓名：">
								<Input v-model="formAdmin.realname" placeholder="真实姓名：" />
							</FormItem>
							<FormItem label="密码：" v-if='!adminuserId'>
								<Input type='password' v-model="formAdmin.adminpwd" placeholder="密码：" />
							</FormItem>

							
							<FormItem label="邮箱：">
								<Input v-model="formAdmin.adminemail" placeholder="邮箱：" />
							</FormItem>
							<FormItem label="电话：">
								<Input v-model="formAdmin.adminmobile" placeholder="电话：" />
							</FormItem>
							<FormItem label="所在组：">
								<Select v-model="formAdmin.groupid">
									<Option v-for="item in groupList" :value="item.id" :key="item.id">{{ item.groupname }}</Option>
								</Select>
							</FormItem>
							<FormItem label="状态：">
								<RadioGroup v-model="formAdmin.isover">
									<Radio :value='0' :label="0">正常</Radio>
									<Radio :value='1' :label="1">禁用</Radio>
				
								</RadioGroup>
							</FormItem>
							
							<FormItem label="备注：">
								<Input v-model="formAdmin.admincomment" placeholder="备注：" />
							</FormItem>
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{adminuserId?'保存':'确定'}}</Button>
						</div>
						<template v-if='formAdmin.adminuserid'>
							<header class='zmiti-add-header zmiti-safe-bar'>
								<span>安全信息</span>
							</header>
							<div class='zmiti-safe-content'>
								<div>密码初始化</div>
								<div>点击右侧初始化按钮，系统将会把密码初始化为：123456。首次登录需更新密码</div>
								<div>
									<Poptip
										confirm
										title="确定要初始化吗?"
										@on-ok="initPassword"
										>
										<span>初始化</span>
									</Poptip>
								</div>
							</div>
						</template>
					</section>
				</transition>
			</div>

		<Modal title='权限设置' v-model="visible">
			<Table :data='roleList' :columns='roleCol'></Table>
		</Modal>
 
		<Avatar v-model="showAvatarModal" :avatar='formAdmin.avatar' @getAvatar='getAvatar'></Avatar>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import Avatar from '../../common/avatar';
	var zmitiActions = zmitiUtil.adminActions;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				tabIndex:[0,-1],
				showAvatarModal:false,
				visible:false,
				avatarList:[
					'&#xe6a5;',
					'&#xe6a4;',
					'&#xe6a3;',
					'&#xe6a2;',
					'&#xe6a0;'
				],
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:false,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formAdmin:{
					isover:0,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				companyList:[],
				adminList:[],
				groupList:[],
				hideMenu:false,
				roleCol:[
					{
						title:"产品名称",
						key:'productname',
						align:'center',
					},
					{
						title:"访问权限",
						key:'role',
						align:'center',
						render:(h,params)=>{
							console.log(params.row)
							return h('Checkbox',{
								props:{
									checked:true,
									value:params.row.authstatus === 1
								},
								on:{
									'on-change':(e)=>{
										var s = this;
										zmitiUtil.ajax({
											url:window.config.baseUrl+'admin/setuserauth',
											data:{
												setuserid:s.currentUserid,
												productids:params.row.productid,
												isdel:params.row.authstatus === 1 ? 1:2
											}
										})
									}
								}
							},'访问权限')
						}
					}
				],
				
				columns:[
					{
						title:"管理员名称",
						key:'adminusername',
						align:'center',
					},
					{
						title:"真实姓名",
						key:'realname',
						align:'center'
						
					},{
						title:"邮箱",
						key:'adminemail',
						align:'center'
						
					},{
						title:"电话",
						key:'adminmobile',
						align:'center'
					},{
						title:"所在组",
						key:'groupname',
						align:'center'
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
                               
                                h('span', {
                                  
                                    style: {
										border:'none',
										fontSize: '12px',
										cursor:'pointer',
										color:'#06C'
										
                                    },
                                    on: {
                                        click: () => {
											
											this.visible = true;
											var s = this;
											this.currentUserid = params.row.userid;
											zmitiUtil.ajax({
												url:window.config.baseUrl+'admin/getuserauth',
												data:{
													setuserid:params.row.userid
												},
												success(data){
													s.roleList = data.list;									
													console.log(data);
												}
											})
                                        }
                                    }
								}, '权限设置'),
								 h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 10px',
										border:'none',
										fontSize: '12px',
										cursor:'pointer',
										color:'#06C'

                                    },
                                    on: {
                                        click: () => {
											var s = this;
											s.showDetail = true;
											s.formAdmin = params.row;
											s.adminuserId = params.row.adminuserid;
											console.log( params.row);
                                        }
                                    }
                                }, '详情'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？"
									},
									on:{
										'on-ok':()=>{
											this.delAdmin(params.row.adminuserid);
										},
										
									}
								},[
									h('span', {
										props: {
											type: 'error',
											size: 'small'
										},
										style:{
											cursor:'pointer',
											color:'#06C'
										},
										on: {
											click: () => {
											}
										}
									}, '删除')
								])
                            ]);
							
							 
						}
					}
				],
				
				formcompany:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				companyList:[],
				 
				directoryList:{

				},
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{}
			}
		},
		components:{
			Avatar
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getAdminList();
		},

		watch:{
			

			showDetail(val){
				if(val){
					this.showDetailPage = true;
				}else{
					setTimeout(() => {
						this.showDetailPage = false;
					}, 310);
				}
			}
			
		},
		
		methods:{
			getAvatar(avatar){
				this.formAdmin.avatar = avatar;
			},
			initPassword(){//初始化密码
				var {$Message} = this;
				zmitiUtil.adminAjax({
					data:{
						action:zmitiActions.modifyAdminPassword.action,
						adminuserid:this.formAdmin.adminuserid,
						adminpwd:window.config.defaultPass
					},
					success(data){
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
						}
					}
				});
			},
			addAdmin(){
				this.showDetail = true;
				this.adminuserId = '';
				this.formAdmin = {
					isover:0,
					avatar:'&#xe6a4;'
				};
			},

			delAdmin(adminuserid){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delAdmin',
					data:{
						action:zmitiActions.delAdmin.action,
						adminuserid
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getAdminList();
							///s.adminList = data.list;	 
						}
					}
				})
			},


			help(){
				zmitiUtil.adminAjax({
					remark:'getAdminList',
					data:{
						action:zmitiActions.getAdminList.action,
						condition:this.condition
					},
					success(data){
						if(data.getret === 0){
							s.adminList = data.list;	 
							zmitiUtil.adminAjax({
								remark:'getGroupList',
								data:{
									action:zmitiActions.getGroupList.action,
									condition:this.condition
								},
								success(data){
									if(data.getret === 0){
										s.groupList = data.list;	 
									}
								}
							})
						}
					}
				})
			},
 
			getAdminList(){
				var s = this;
				
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getAdminList',
						data:{
							action:zmitiActions.getAdminList.action,
							condition:this.condition
						},
						success(data){
							if(data.getret === 0){
								s.adminList = data.list;	 
								resolve();
							}
						}
					})
				});
				var p1 = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getGroupList',
						data:{
							action:zmitiActions.getGroupList.action,
							condition:this.condition
						},
						success(data){
							if(data.getret === 0){
								s.groupList = data.list;	 
								console.log(s.groupList,'groupList')
								resolve();
							}
						}
					})
				});
				Promise.all([p,p1]).then(()=>{
					s.adminList.map((admin,i)=>{
						s.groupList.map((group,j)=>{
							if(admin.groupid == group.id){
								admin.groupname = group.groupname;
							}
						})
					});
					s.adminList = s.adminList.concat([]);
				})
				 
				
			},
		
			 
			adminAction(){
				var s = this;
				var action = this.adminuserId ? zmitiActions.editAdminUser.action:zmitiActions.addAdminUser.action;
				
				zmitiUtil.adminAjax({
					remark:this.adminuserId ?　'editAdminUser':'addAdminUser',
					data:{
						action,
						info:this.formAdmin
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							s.getAdminList();
						}
					}
				})
			},
		}
	}
</script>
 