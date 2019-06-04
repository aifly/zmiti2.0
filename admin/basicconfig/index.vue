<template>
	<div class="zmiti-basicconfig-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>基础配置</div>
				<div>
					
				</div>
			</header>
			<div style='height:400px;'>

			</div>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import Avatar from '../../common/avatar';
	var companyActions = zmitiUtil.adminActions;
	var companyActions = zmitiUtil.companyActions;
	var basicConfigActions = zmitiUtil.basicConfigActions;
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
				formCompany:{
					isover:0,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				companyList:[],
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
						title:"用户名",
						key:'username',
						align:'center',
					},
					{
						title:"姓名",
						key:'realname',
						align:'center',
						width:200
						
					},{
						title:"邮箱",
						key:'companyphone',
						align:'center'
						
					},{
						title:"手机",
						key:'companyphone',
						align:'center'
						
					},{
						title:"状态",
						key:'isover',
						align:'center',
						render:(h,params)=>{
							return h('div',{},params.row.isover === 0 ? '正常使用' : params.row.isover === 1 ? '已禁用':'已删除');
						}
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
								}, '所属单位'),
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
											s.formCompany = params.row;
											s.adminuserId = params.row.adminuserid;
											console.log( params.row);
                                        }
                                    }
                                }, '编辑'),
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
			this.getCompanyList();
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
				this.formCompany.avatar = avatar;
			},
			initPassword(){//初始化密码
				var {$Message} = this;
				zmitiUtil.adminAjax({
					data:{
						action:companyActions.modifyAdminPassword.action,
						adminuserid:this.formCompany.adminuserid,
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
				this.formCompany = {
					isover:0,
					avatar:'&#xe6a4;'
				};
			},

			delAdmin(adminuserid){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delAdmin',
					data:{
						action:companyActions.delAdmin.action,
						adminuserid
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getCompanyList();
							///s.companyList = data.list;	 
						}
					}
				})
			},
			getCompanyList(){
				var s = this;
				if(typeof window.Promise !== 'function'){
					console.log('当前浏览器不支持Promise');
					return;
				}
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getCompanyList',
						data:{
							action:companyActions.getCompanyList.action,
							condition:this.condition
						},
						success(data){
							if(data.getret === 0){
								s.companyList = data.list;	 
								resolve();
							}
						}
					})
				});
				
				Promise.all([p]).then(()=>{
					s.companyList.map((admin,i)=>{
						s.groupList.map((group,j)=>{
							if(admin.groupid == group.id){
								admin.groupname = group.groupname;
							}
						})
					});
					s.companyList = s.companyList.concat([]);
				})
				 
				
			},
		
			 
			adminAction(){
				var s = this;
				var action = this.adminuserId ? companyActions.editAdminUser.action:companyActions.addAdminUser.action;
				
				zmitiUtil.adminAjax({
					remark:this.adminuserId ?　'editAdminUser':'addAdminUser',
					data:{
						action,
						info:this.formCompany
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							s.getCompanyList();
						}
					}
				})
			},
		}
	}
</script>
 