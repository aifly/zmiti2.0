<template>
	<div class="zmiti-admin-main-ui">
		<div class="zmiti-list-main">
			<template  v-if='!$route.params.id'>
				<header class="zmiti-tab-header">
					<div>工单列表</div>
					<div>
						<Button :loading='loading' type="primary" @click="getDataList">刷新</Button>
					</div>
				</header>
				<section class='zmiti-list-where'>
						工单编号 <input type="text">
					</section>
					
					<div class='zmiti-admin-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
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
			</template>
			<section v-else style='width:100%;position:relative;z-index:1;'>
				<WorkOrderDetail></WorkOrderDetail>
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
	import {orderStatus,workOrderType} from '../../common/config';
	import WorkOrderDetail from '../../common/workorderdetail';
	import ZmitiTable from '../../common/table'
	var {userActions,adminActions} = zmitiUtil;


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
				loading:true,
				showDetailPage:false,
				workOrderDetail:{

				},
				total:0,
				formWorkOrder:{
					isover:0,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				productionList:[],
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
										 
									}
								}
							},'访问权限')
						}
					}
				],
				
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
                                }, '查看'),
                                h('Poptip',{
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
								])
                            ]);
							
							 
						}
					}
				],
			
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
			this.userinfo = zmitiUtil.getUserInfo();
			this.getDataList();
			Vue[this.$route.name] = ()=>{
				this.getDataList();
			}
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
				var workorderids = this.selectList.map(item=>{
					return item.workorderid;
				}).join(',');
				this.delete(workorderids);
			},
			
			formatDate:zmitiUtil.formatDate,
			getAvatar(avatar){
				this.formWorkOrder.avatar = avatar;
			},
			 
			add(){
				this.showDetail = true;
				this.adminuserId = '';
				this.formWorkOrder = {
					isover:0,
					avatar:'&#xe6a4;'
				};
			},
			delete(workorderid){
				var s = this;
				zmitiUtil.ajax({
					remark:'delWorkOrder',
					data:{
						action:userActions.delWorkOrder.action,
						info:{
							workorderid
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
				if(typeof window.Promise !== 'function'){
					console.log('当前浏览器不支持Promise');
					return;
				}
				this.loading = true;
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.ajax({
						remark:'getUserWorkOrderList',
						data:{
							action:userActions.getUserWorkOrderList.action,
							condition:s.condition
						},
						success(data){
							s.loading = false;
							if(data.getret === 0){
								s.total = data.total || data.list.length;
								s.dataSource = data.list;	 
								resolve();
							}
						}
					})
				});
			},
			action(){
				var s = this;
				var action = this.adminuserId ? zmitiActions.editAdminUser.action:zmitiActions.addAdminUser.action;
				
				zmitiUtil.ajax({
					remark:this.adminuserId ?　'editAdminUser':'addAdminUser',
					data:{
						action,
						info:this.formWorkOrder
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
 