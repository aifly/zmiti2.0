<template>
	<div class="zmiti-workorder-main-ui">
		<div class="zmiti-list-main">
			<section v-if='!$route.params.id'>
				<header class="zmiti-tab-header">
					<div>工单管理</div>
					<div>
					</div>
				</header>
				<section class='zmiti-list-where'>
					工单编号 <input type="text">
				</section>
				
				<div class='zmiti-workorder-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
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

			</section>
			<section v-else style='width:100%;position:relative;z-index:1;'>
				<WorkOrderDetail :isAdmin='true'></WorkOrderDetail>
			</section>
		</div>
		 
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import WorkOrderDetail from '../../common/workorderdetail';
	import {orderStatus,workOrderType} from '../../common/config';
	import ZmitiTable from '../../common/table';
	var adminActions = zmitiUtil.adminActions;
	
	export default {
		props:{
			status:{
				type:Array,
				default:Object.keys(orderStatus)
			},
			text:{
				type:String,
				default:'详情'
			}
		},
		name:'zmitiindex',
		data(){
			return{

				loading:true,

				tabIndex:[0,-1],
				showAvatarModal:false,
				
				imgs:window.imgs,
				showDetail:false,
 
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				groupList:[],
			 
				
				columns:[
					{
						title:"工单内容",
						key:'content',
						align:'center',
					},
					{
						title:"提交人",
						key:'username',
						align:'center'
						
					},{
						title:"创建时间",
						key:'createtime',
						align:'center',
						width:150,
						render:(h,params)=>{
							return h('div',{},this.formatDate(params.row.createtime))
						}
					},{
						title:"状态",
						key:'status',
						align:'center',
						render:(h,params)=>{
							
							return h('div',{},orderStatus[params.row.status].status)
						}
					},{
						title:"工单分类",
						key:'',
						align:'center',
						render:(h,params)=>{
							return h('div',{},workOrderType[params.row.workordertype]||"产品类型")
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
											var s = this;
											s.workOrderDetail = params.row;
											window.location.hash = '/workorderlist/'+params.row.workorderid;
											
											
                                        }
                                    }
                                }, this.text)
                               /*  h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？"
									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.workorderid);
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
								]) */
                            ]);
							
							 
						}
					}
				],
				directoryList:{

				},
				total:0,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{}
			}
		},
		components:{
			WorkOrderDetail,
			ZmitiTable
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
			formatDate:zmitiUtil.formatDate,
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

			
			getDataList(){
				var s = this;
			
				var {condition} = this;
				condition = Object.assign(condition,{
					status:this.status.join(',')
				})
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getUserWorkOrderList',
						data:{
							action:adminActions.getUserWorkOrderList.action,
							condition:condition
						},
						success(data){
							s.loading = false;
							if(data.getret === 0){
								s.dataSource = data.list;	
								s.total = data.total||data.list.length; 
								resolve();
							}
						}
					})
				});
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
							s.getDataList();
						}
					}
				})
			},
		}
	}
</script>
 