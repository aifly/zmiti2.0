<template>
	<div class="zmiti-user-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>畅阅-部门管理</div>
				<div>
					<Button type='primary' @click="addAdmin">添加部门</Button>
					<Button type='primary' :loading='loading' @click="getDataList">刷新</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-user-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total" @getSelection='getSelection'>
					<div slot='table-btns' style="display:inline-block">
						<Poptip
							confirm
							title="确定要删除吗?"
							@on-ok='selectionDelete'
							>
							<div class='zmiti-table-btn'>删除</div>
							
						</Poptip>
						<div class='zmiti-table-btn'>禁用</div>
					</div>
				</ZmitiTable>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
			<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
				<div slot='mask-content' name='detail'>
					<section class='zmiti-add-form zmiti-scroll'>
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt=""  @click='showDetail = false' >
							<span>基础信息</span>
						</header>
						<h1 style="height:60px;"></h1>
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="120">
							<FormItem label="部门名称：">
								<Input v-model="formObj.departmentname"  placeholder="部门名称：" />
							</FormItem>
 

							<FormItem label="状态：">
								<RadioGroup v-model="formObj.status">
									<Radio :value='0' :label="0">禁用</Radio>
									<Radio :value='1' :label="1">正常使用</Radio>
								</RadioGroup>
							</FormItem>
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formObj.departmentid?'保存':'确定'}}</Button>
						</div>
						 
					</section>
				</div>
			</ZmitiMask>

		<Modal title='加入单位' v-model="visible" width='457'>
			<div>
				 <Transfer
					:data="unJoinedDepartment"
					:titles="['用户列表','当前部门下的用户']"
					:target-keys="targetKeys"
					filterable
					:filter-method="filterMethod"
					@on-change="handleChange2">
				</Transfer>
			</div>
		</Modal>
 
		<Avatar v-model="showAvatarModal" :avatar='formObj.avatar' @getAvatar='getAvatar'></Avatar>
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
	import ZmitiTable from '../../common/table'
	var {companyActions,zmitiActions,companyAdminActions,formatDate,userActions} = zmitiUtil;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				targetKeys:[],
				showAvatarModal:false,
				visible:false,
				total:0,
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
				loading:true,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formObj:{
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
				dataSource:[],
				groupList:[],
				departmentList:[],
				hideMenu:false,
				unJoinedDepartment:[],
				columns:[
					{
						title:"部门编号",
						key:'departmentid',
						align:'center',
					},
					{
						title:"部门名称",
						key:'departmentname',
						align:'center',
						width:200
						
					},{
						title:"创建时间",
						key:'createtime',
						align:'center',
						render:(h,params)=>{
							return h('div',{},formatDate(params.row.createtime));
						}
						
					},{
						title:"状态",
						key:'status',
						align:'center',
						render:(h,params)=>{
							return h('div',{},params.row.status === 1 ? '正常使用' : params.row.status === 0 ? '已禁用':'已删除');
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
											this.visible = true;
											
											this.getJoinedDepartment(params.row.departmentid);
											this.currentDepartmentId = params.row.departmentid;
                                        }
                                    }
								}, '用户管理'),
                               
                                
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
											Vue.obserable.trigger({type:'toggleMask',data:true});
											s.formObj = params.row;
											s.showDetailPage = 1;
										
                                        }
                                    }
								}, '编辑'),
								
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'
									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.departmentid);
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
				
				formObj:{
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
			ZmitiMask,
			ZmitiTable
		},

		beforeCreate(){
			
		},
		mounted(){
			window.s = this;
			this.getDataList();
			
		},

		watch:{
			showDetail(val){
				if(val){
					this.showDetailPage = 1;
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			},
			
			
		},
		
		methods:{

			change(e){
				this.condition.page_index = e -1;
				this.getDataList();
			},
			getSelection(data){
				this.selectList = data;
			},
			selectionDelete(){
				if(this.selectList.length<=0){
					this.$Message.error({content:'您还未选择任何要删除的项',duration:5});
					return;
				}
				var departmentids = this.selectList.map(item=>{
					return item.departmentid;
				}).join(',');
				this.delete(departmentids);
			},
			closeMaskPage(){
				this.showDetailPage = -1;
			},
			handleChange2(ids,index,userids){
				var s = this;

				var key = index === 'left' ? 'condition':'info';
					zmitiUtil.ajax({
						remark:index === 'left'?"delDepartmentUser":"addDepartmentUser",
						data:{
							action:userActions[index === 'left'?"delDepartmentUser":"addDepartmentUser"].action,
							[key]:{
								companyid:zmitiUtil.getCurrentCompanyId().companyid,
								productid:s.$route.params.id ,
								departmentid:s.currentDepartmentId,
								userids:userids.join(','),
							},
						},
						success(data){
							s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg);
							s.getJoinedDepartment(s.currentDepartmentId);
						}
					});
			},
			filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getJoinedDepartment(departmentid){
				var s = this;
				zmitiUtil.ajax({
					remark:'getDepartmentUserList',
					data:{
						action:userActions.getDepartmentUserList.action,
						condition:{
							page_index:0,
							page_size:100,
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.$route.params.id ,
							departmentid

						}
					},
					success(data){
						if(data.getret === 0){
							s.targetKeys = [];
							data.list.forEach(dt=>{
								s.targetKeys.push(dt.userid)
							})
						}
					}
				});
			},
			 
			getAllUserList(productid){
				var s = this;
				zmitiUtil.ajax({
					remark:'getAllCompanyUserList',
					data:{
						action:userActions.getAllCompanyUserList.action,
						condition:{
							page_index:0,
							page_size:100,
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:productid||s.$route.params.id ,
						}
					},
					success(data){
						if(data.getret === 0){
							s.departmentList = data.list;
							s.unJoinedDepartment = [];
							s.departmentList.forEach(dt=>{
								s.unJoinedDepartment.push({
									key : dt.userid,
									label:dt.realname,
									description:dt.realname,
								})

							})
							
						}
					}
				})
				
			},
			checkUser(){
				var username = this.formObj.username;
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
				this.formObj.avatar = avatar;
			},
		 
			addAdmin(){

				this.showDetail = true;
				this.adminuserId = '';
				this.formObj = {
					isover:0,
					avatar:'&#xe6a4;'
				};
				this.showDetailPage = 1;
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			delete(departmentid){
				var s = this;
				zmitiUtil.ajax({
					remark:'delDepartment',
					data:{
						action:companyAdminActions.delDepartment.action,
						info:{
							departmentids:departmentid
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSource = data.list;	 
						}
					}
				})
			},

			getDataList(){
				var s = this;
				this.loading = true;
				if(typeof window.Promise !== 'function'){
					console.log('当前浏览器不支持Promise');
					return;
				}
				var companyid = zmitiUtil.getCurrentCompanyId().companyid;
				this.condition.companyid = companyid;


				var t = setInterval(() => {
					var productid =  this.$route.params.id ;
					
					if(Vue.productList){
						clearInterval(t);

						if(!productid){

							Vue.productList.forEach(p=>{
								if(s.$route.name.indexOf(p.producturl.substr(1))>-1){
									productid  = p.productid;
								}
							})
							
						}
						this.getAllUserList(productid);
						var {condition} = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						});
						this.$router.push({path:'/changyuedepartment/'+productid});
						var p = new Promise((resolve,reject)=>{
							zmitiUtil.ajax({
								remark:'getDepartmentList',
								data:{
									action:companyAdminActions.getDepartmentList.action,
									condition:this.condition
								},
								success(data){
									s.loading = false
									if(data.getret === 0){
										s.dataSource = data.list;
										s.total = data.total||data.list.length;
										resolve();
									}
								}
							})
						});
					}
				}, 100);


				
			},
			adminAction(){
				var s = this;
				var action = this.formObj.departmentid ? companyAdminActions.editDepartment.action:companyAdminActions.addDepartment.action;
				var info = {
					departmentname:this.formObj.departmentname,
					status:this.formObj.status,
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				}
				if(this.formObj.departmentid){
					info.departmentid = this.formObj.departmentid;
				}				
				zmitiUtil.ajax({
					remark:this.formObj.action ?　'editDepartment':'addDepartment',
					data:{
						action,
						info
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
 