<template>
	<div class="zmiti-user-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>畅阅 —— 单位列表</div>
				<div>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-user-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-user-table' :class="{'active':showDetail}">
					<Table  :data='dataSrouce' :columns='columns'></Table>
				</div>
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
	import ZmitiMask from '../../common/mask/';
	var {companyActions,zmitiActions,adminActions} = zmitiUtil;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				
				targetKeys:[],
				showAvatarModal:false,
				visible:false,
				avatarList:[
					'&#xe6a5;',
					'&#xe6a4;',
					'&#xe6a3;',
					'&#xe6a2;',
					'&#xe6a0;'
				],
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formUser:{
					isover:0,
					usersign:1,
					usertypesign:1,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSrouce:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],
				columns:[
					{
						title:"单位名称",
						key:'companyname',
						align:'center',
					},
					{
						title:"地址",
						key:'companyaddress',
						align:'center',
						width:200
						
					},{
						title:"电话",
						key:'companyphone',
						align:'center'
						
					},{
						title:"状态",
						key:'status',
						align:'center',
						render:(h,params)=>{
							return h('div',{},params.row.status === 1 ? '正常使用' : params.row.status === 0 ? '已禁用':'已删除');
						}
					}
				],
				
				formUser:{
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
			Avatar,
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
			this.getDataList();
			this.getCompanyList();
		},

		watch:{
			

			showDetail(val){
				if(val){
					thiVue.obserable.trigger({type:'toggleMask',data:true});
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			},
			$route:{
				deep:true,
				handler(){
					
					this.getDataList()
				}
			}
			
		},
		
		methods:{

			 

			closeMaskPage(){
				this.showDetailPage = -1;
			},
			handleChange2(ids,index,companyids){
				var s = this;
				companyids.forEach((companyid,i)=>{
					zmitiUtil.adminAjax({
						remark:index === 'left'?"exitCompany":"joinCompany",
						data:{
							action:companyActions[index === 'left'?"exitCompany":"joinCompany"].action,
							userid:s.currentUserid,
							companyid
						},
						success(data){
							s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg);
							s.getJoinedCompany();
						}
					});
				})

			},
			filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getJoinedCompany(){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'getJoinedCompany',
					data:{
						action:companyActions.getJoinedCompany.action,
						condition:{
							userid:s.currentUserid,
							page_index:0,
							page_size:20,
						}
					},
					success(data){
						if(data.getret === 0){
							s.targetKeys = [];
							data.list.forEach(dt=>{
								s.targetKeys .push(dt.companyid)
							})
						}
					}
				});
			},
			 
			getCompanyList(){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'getCompanyList',
					data:{
						action:companyActions.getCompanyList.action,
						condition:{
							page_index:0,
							page_size:100
						}
					},
					success(data){
						if(data.getret === 0){
							s.companyList = data.list;
							s.unJoinedCompany = [];
							s.companyList.forEach(dt=>{
								if(dt.companyid === s.$route.params.companyid){
									s.companyname = dt.companyname;
								}
								s.unJoinedCompany .push({
									key : dt.companyid,
									label:dt.companyname,
									description:dt.companyname,
								})

							})
							console.log(s.companyList);
						}
					}
				})
				
			},
			checkUser(){
				var username = this.formUser.username;
				var {$Message} = this;
				zmitiUtil.adminAjax({
					remark:'checkUserName',
					data:{
						action:zmitiActions.checkUserName.action,
						username
					},
					success(data){
						$Message[data.getret === 0 ? data.used  ? 'error':'success':'error'](data.msg);
					}
				})
			},
			getAvatar(avatar){
				this.formUser.avatar = avatar;
			},
			initPassword(){//初始化密码
				var {$Message} = this;
				zmitiUtil.adminAjax({
					data:{
						action:companyActions.modifyAdminPassword.action,
						adminuserid:this.formUser.adminuserid,
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
				this.formUser = {
					isover:0,
					avatar:'&#xe6a4;'
				};
				thiVue.obserable.trigger({type:'toggleMask',data:true});
			},

			delete(userid){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delUser',
					data:{
						action:companyActions.delUser.action,
						userid
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSrouce = data.list;	 
						}
					}
				})
			},
			getDataList(){
				var s = this;
				if(typeof window.Promise !== 'function'){
					console.log('当前浏览器不支持Promise');
					return;
				}
				var productid = this.$route.params.id;
				this.condition.productid = productid;
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getCompanyByProduct',
						data:{//getUserListByCompanyId
							action:adminActions.getCompanyByProduct.action,
							condition:s.condition
						},
						success(data){
							if(data.getret === 0){
								s.dataSrouce = data.list;	 
								resolve();
							}
						}
					})
				});
			},
			adminAction(){
				var s = this;
				var action = this.formUser.userid ? companyActions.editUser.action:companyActions.addUser.action;
				var companyid = this.$route.params.companyid;
				if(companyid){
					this.formUser.companyid = companyid;
				}
				zmitiUtil.adminAjax({
					remark:this.formUser.userid ?　'editUser':'addUser',
					data:{
						action,
						info:this.formUser
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							s.getDataList();
						}
					}
				})
			},
		}
	}
</script>
 