<template>
	<div class="zmiti-company-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>单位管理</div>
				<div>
					<Button type="primary" @click="addAdmin">新增单位</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				单位编号 <input type="text">
			</section>
			
			<div class='zmiti-company-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-company-table' :class="{'active':showDetail}">
					<Table  :data='companyList' :columns='columns'></Table>
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
						<div class='zmiti-company-avatar' @click="showAvatarModal = true">
							<span class='zmt_iconfont' v-html='formCompany.logourl'></span>
							<label>更换头像</label>
						</div>
						<Form class='zmiti-add-form-C' :model="formCompany" :label-width="120">
							<FormItem label="单位名称：">
								<Input v-model="formCompany.companyname" placeholder="单位名称：" />
							</FormItem>
							<FormItem label="单位地址：">
								<Input v-model="formCompany.companyaddress" placeholder="单位地址：" />
							</FormItem>
							<FormItem label="纳税识别号：">
								<Input v-model="formCompany.companycode" placeholder="纳税识别号：" />
							</FormItem>
							<FormItem label="单位电话：">
								<Input v-model="formCompany.companyphone" placeholder="单位电话：" />
							</FormItem>
							<FormItem label="开户行：">
								<Input v-model="formCompany.bank" placeholder="开户行：" />
							</FormItem>
							<FormItem label="开户行账号：">
								<Input v-model="formCompany.bankcode" placeholder="开户行账号：" />
							</FormItem>
							<FormItem label="单位合同扫描件：">
								<Input v-model="formCompany.contract" placeholder="单位合同扫描件：" />
							</FormItem>
							<FormItem label="营业执照：">
								<Input v-model="formCompany.businesslicensepath" placeholder="营业执照：" />
							</FormItem>
							<FormItem label="标识：">
								<RadioGroup v-model="formCompany.isover">
									<Radio :value='0' :label="0">禁用</Radio>
									<Radio :value='1' :label="1">正常使用</Radio>
								</RadioGroup>
							</FormItem>
							
							<FormItem label="备注：">
								<Input v-model="formCompany.comment" placeholder="备注：" />
							</FormItem>
							<FormItem label="配置：">
								<Input v-model="formCompany.config" placeholder="配置：" />
							</FormItem>
							
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{adminuserId?'保存':'确定'}}</Button>
						</div>
						 
					</section>
				</transition>
			</div>

		<Modal title='权限设置' v-model="visible">
			<Table :data='roleList' :columns='roleCol'></Table>
		</Modal>
 
		<Avatar v-model="showAvatarModal" :avatar='formCompany.avatar' @getAvatar='getAvatar'></Avatar>
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
						title:"单位名称",
						key:'companyname',
						align:'center',
					},
					{
						title:"单位地址",
						key:'companyaddress',
						align:'center',
						width:200
						
					},{
						title:"联系电话",
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
								}, '权限'),
								h('span', {
                                  
                                    style: {
										marginLeft: '10px',
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
											s.formCompany = params.row;
										
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
				var id = this.formCompany.companyid;
				var action =  id ? companyActions.editCompany.action:companyActions.addCompany.action;
				
				zmitiUtil.adminAjax({
					remark:id ?　'editAdminUser':'addAdminUser',
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
 