<template>
	<div class="zmiti-rolegroup-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>权限组管理</div>
				<div>
					<Button type="primary" @click="addAdmin">新增权限组</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				权限组编号 <input type="text">
			</section>
			
			<div class='zmiti-rolegroup-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-rolegroup-table' :class="{'active':showDetail}">
					<Table  :data='groupList' :columns='columns'></Table>
				</div>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
			<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
				<div slot='mask-content'>
					<transition name='detail'>
						<section class='zmiti-add-form zmiti-scroll' v-if='showDetail' >
							<header class='zmiti-add-header'>
								<img :src="imgs.back" alt=""  @click='closeMaskPage' >
								<span>基础信息</span>
							</header>
							<h2 style='height:50px;'></h2>
							<Form class='zmiti-add-form-C' :model="formRoleGroup" :label-width="110">
								<FormItem label="权限组名称：">
									<Input v-model="formRoleGroup.groupname" placeholder="权限组名称：" />
								</FormItem>
								<FormItem label="描述：">
									<Input v-model="formRoleGroup.describes" placeholder="描述：" />
								</FormItem>
								<FormItem label="管理员类别：">
									<RadioGroup v-model="formRoleGroup.grouptype">
										<Radio :value='2' :label="2">普通管理员</Radio>
										<Radio :value='1' :label="1">超级管理员</Radio>
									</RadioGroup>
								</FormItem>

								<FormItem label="actions列表：">
									<div class='zmiti-action-list' v-for='(item,i) of actions' :key='i'>
										<div class='zmiti-action-title'>{{(i+1 ) + '.' + item.name}}：</div>
										<div class='zmiti-action-content' >
											<div v-for='(action,k) of item.actions' :key='k'  :class="{'active':formRoleGroup.actions && formRoleGroup.actions.some(ac=> ac === action.action)}" type="border" @click="toggleAction(action)" >
												{{action.desc}}
											</div>
										</div>
									</div>
								</FormItem>
								<FormItem label="是否系统管理组：">
									<RadioGroup v-model="formRoleGroup.issys">
										<Radio :value='1' :label="1">是</Radio>
										<Radio :value='0' :label="0">否</Radio>
									</RadioGroup>
								</FormItem>
							</Form>
							
							<div class='zmiti-add-form-item zmiti-add-btns'>
								<Button size='large' type='primary' @click='roleGroupAction'>{{formRoleGroup.id?'保存':'确定'}}</Button>
							</div>
						</section>
					</transition>
				</div>
			</ZmitiMask>
			 

		<Modal title='权限设置' v-model="visible">
			<Table :data='roleList' :columns='roleCol'></Table>
		</Modal>

 
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	var zmitiActions = zmitiUtil.adminActions;
	var userActions =  zmitiUtil.userActions;
	var companyActions = zmitiUtil.companyActions;
	var basicConfigActions = zmitiUtil.basicConfigActions;
	var resourceActions = zmitiUtil.resourceActions;
	import ZmitiMask from '../../common/mask/';
	var	actions = [
		{
			name:'基础配置模块',
			actions:Object.values(basicConfigActions)
		},
		{
			name:'管理员模块',
			actions:Object.values(zmitiActions)
		},{
			name:'用户单位模块',
			actions:Object.values(companyActions)
		},{
			name:'用户端模块',
			actions:Object.values(userActions)
		},{
			name:'资源模块',
			actions:Object.values(resourceActions)
		}
	];
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				actions,
				tabIndex:[0,-1],
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
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formRoleGroup:{
					isover:0,
					actions:[],
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
						title:"权限组名称",
						key:'groupname',
						align:'center',
					},
					{
						title:"描述",
						key:'describes',
						align:'center'
						
					},
					{
						title:"用户列表",
						key:'grouptype',
						align:'center'
						
					},/* {
						title:"管理员类别",
						key:'grouptype',
						align:'center',
						render:(h,params)=>{
							return h('div',{},params.row.grouptype === 1 ? '超级管理员':'普通管理员')
						}
					}, {
						title:"是否是系统管理组",
						key:'issys',
						align:'center',
						render:(h,params)=>{
							return h('div',{},params.row.issys === 1 ? '是':'否');
						}
					},*/
					/* {
						title:"actions列表",
						key:'actions',
						width:216,
						render:(h,params)=>{
							return params.row.actions.map(((item,i)=>{
								return h('span',{},(i===0?'':'、')+item)
							}))
						}
						
					}, */
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
								}, '权限'),
								h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 0 2px 10px',
										border:'none',
										fontSize: '12px',
										cursor:'pointer',
										color:'#06C'

                                    },
                                    on: {
                                        click: () => {
											
                                        }
                                    }
                                }, '用户'),
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
											s.formRoleGroup = params.row;
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
											this.delGroup(params.row.id);
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
			ZmitiMask
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getGroupList();
		},

		watch:{
			showDetail(val){
				if(val){
					Vue.obserable.trigger({type:'toggleMask',data:true});
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			}
			
		},
		
		methods:{
			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
			toggleAction(tag){
				var {actions} = this.formRoleGroup;
				if(actions.some((item)=>{
					return item  === tag.action;
				})){
					actions.forEach((item,i)=>{
						if(item === tag.action){
							this.formRoleGroup.actions.splice(i,1);
						}
					})
				}
				else{
					this.formRoleGroup.actions.push(tag.action);

				}

				console.log(this.formRoleGroup.actions)
				
			},
			initPassword(){//初始化密码
				var {$Message} = this;
				zmitiUtil.adminAjax({
					data:{
						action:zmitiActions.modifyAdminPassword.action,
						adminuserid:this.formRoleGroup.adminuserid,
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
				this.formRoleGroup = {
					isover:0,
					avatar:'&#xe6a4;'
				};
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			delGroup(id){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delGroup',
					data:{
						action:zmitiActions.delGroup.action,
						id
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getGroupList();
							///s.adminList = data.list;	 
						}
					}
				})
			},


			help(){
				zmitiUtil.adminAjax({
					remark:'getGroupList',
					data:{
						action:zmitiActions.getGroupList.action,
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
 
			getGroupList(){
				var s = this;
				
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getGroupList',
						data:{
							action:zmitiActions.getGroupList.action,
							condition:this.condition
						},
						success(data){
							if(data.getret === 0){
								s.groupList = data.list;	 
								resolve();
							}
						}
					})
				});
				
				/* Promise.all([p]).then(()=>{
					s.adminList.map((admin,i)=>{
						s.groupList.map((group,j)=>{
							if(admin.groupid == group.id){
								admin.groupname = group.groupname;
							}
						})
					});
					s.adminList = s.adminList.concat([]);
				}) */
				 
				
			},
		
			 
			roleGroupAction(){
				var s = this;
				var action = this.formRoleGroup.id ? zmitiActions.editGroup.action:zmitiActions.addGroup.action;
				
				zmitiUtil.adminAjax({
					remark:this.formRoleGroup.id ?　'editGroup':'addGroup',
					data:{
						action,
						info:this.formRoleGroup
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							s.getGroupList();
						}
					}
				})
			},
		}
	}
</script>
 