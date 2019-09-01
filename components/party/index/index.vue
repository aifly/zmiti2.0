<template>
	<div class="zmiti-party-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>活动列表</div>
				<div>
					<Button :loading='loading' @click="getDataList()" type="primary">刷新</Button>
					<Button type="primary" @click='add()'>添加</Button>
				</div>
			</header>
			<div class='zmiti-submit-main zmiti-scroll ' :style="{height:viewH - 130+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total" @getSelection='getSelection'>
					<!-- <div slot='table-btns' style="display:inline-block">
						<Poptip
							confirm
							title="确定要删除吗?"
							@on-ok='selectionDelete'
							>
							<div class='zmiti-table-btn'>删除</div>
							
						</Poptip>
					</div> -->
				</ZmitiTable>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiMask from '../../../common/mask/';
	import ZmitiTable from '../../../common/table';
	var {companyActions,zmitiActions,partyActions,formatDate} = zmitiUtil;

	import {manuscriptStatus} from '../../../common/config';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				
				targetKeys:[],
				showAvatarModal:false,
				
				companyname:zmitiUtil.getCurrentCompanyId().companyname,
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				total:0,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				loading:true,
				currentUserid:'',
				formObj:{
					jobid:'',
					transportid:''
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],
				columns:[
					{
						title:"编号",
						key:'partyid',
						align:'left',
						width:68
					},
					{
						title:"活动名称",
						key:'partyname',
						align:'left',
					},
					{
						title:"活动描述",
						key:'abstract',
						align:'left',
					},
					{
						title:"开始时间",
						key:'begintime',
						align:'left',
				//		render:(h,params)=>{
				//			return h('div',{},this.formatDate(params.row.begintime));
				//		}
					},
					{
						title:"结束时间",
						key:'enteredtime',
						align:'left',
					//	render:(h,params)=>{
					//		return h('div',{},params.row.createtime);
					//	}
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'

									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.traffic);
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
								]),
								h('span',{
									style:{
										cursor:'pointer',
										color:"rgb(0, 102, 204)",
										marginLeft:'10px'
									},
									on:{
										click:()=>{
											this.formObj = params.row;
											Vue.obserable.trigger({
												type:'toggleMask',
												data:true
											})
										}
									}
								},'详情')
                            ]);
							
							 
						}
					}
				],
				
				
				 
				directoryList:{

				},
				condition:{
					page_index:0,
					page_size:10,
				},
				transport:[],
				tripost:[],
				userinfo:{},
				selectList:[]
			}
		},
		components:{
			ZmitiMask,
			ZmitiTable
		},

		beforeCreate(){

		},
		mounted(){
			window.s = this;
			var userinfo = zmitiUtil.getUserInfo();
			if(!userinfo){
				this.$router.push({path:'/login'})

			}
			this.getDataList();
			//this.getJobData();
		},

		watch:{
			
			$route:{
				handler(){
					var productid = this.productid;
					productid && this.$router.push({path:'/party/'+productid});
				}
			}
			
		},
		
		methods:{

			getJobData(){
				var s = this;
				s.loading = true;

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
						this.productid = productid;
						var {condition} = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						})
						zmitiUtil.ajax({
							remark:"getJobList",
							data:{
								action:partyActions.getJobList.action,
								condition:condition
							},
							success(data){
								s.loading = false;
								if(data.getret === 0){
									s.total = data.total;
									s.tripost = data.list;
								}
							}
						})
					}
				}, 100);

				
			},
			getbaseData(productid){
				var s=this;

				zmitiUtil.ajax({
					remark:'getTrafficbase',
					data:{
						action:partyActions.getTrafficbase.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						}
					},
					success(data){
						if(data.getret === 0){
							s.transport = data.list;
						}
					}
				})
			
				
			},
			closeMaskPage(){
				Vue.obserable.trigger({type:'toggleMask',data:false});
			},
			add(){
				this.formObj = {};
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			adminAction(){
				var s = this;
				var action = this.formObj.traffic ? partyActions.editTraffic.action:partyActions.addTraffic.action;

				let info = {

					productid:s.productid,
					jobid:this.formObj.jobid,
					transportid:this.formObj.transportid,
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				}
				if(this.formObj.traffic){
					info.traffic = this.formObj.traffic
				}
				zmitiUtil.ajax({
					remark:this.formObj.traffic ?　'editTraffic':'addTraffic',
					data:{
						action,
						info
					},
					success(data){
						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.closeMaskPage();
						if(data.getret === 0){
							s.getDataList();
						}
					}
				})
			},
			
			change(e){
				this.condition.page_index = e -1;
				this.getDataList();
			},
		 
			 

			delete(traffic){
				var s = this;
				zmitiUtil.ajax({
					remark:'delParty',
					data:{
						action:partyActions.delParty.action,
						condition:{
							traffic,
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.productid
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						if(data.getret === 0){
							
							s.getDataList();
							//s.dataSource = data.list;	 
						}
					}
				})
			},
			change(e){
				this.condition.page_index = e -1;
				this.getDataList();
			},
			getDataList(){
				var s = this;
				s.loading = true;

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
						this.$router.push({path:'/party/'+productid});
						this.productid = productid;
					//	this.getbaseData(productid);
						var {condition} = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						})
						zmitiUtil.ajax({
							remark:"getPartyList",
							data:{
								action:partyActions.getPartyList.action,
								condition:condition
							},
							error(){
								s.loading = false;
							},
							success(data){
								s.loading = false;
								if(data.getret === 0){
									s.total = data.total;
									s.dataSource = data.list;
								}
							}
						})
					}
				}, 100);

				
			},
			getSelection(data){				
				this.selectList = data;
			},
			selectionDelete(){
				if(this.selectList.length<=0){
					this.$Message.error({content:'您还未选择任何要删除的项',duration:5});
					return;
				}
				console.log(this.selectList,'data-select')
				var jobid = this.selectList.map(item=>{
					return item.jobid;
				}).join(',');
				console.log(jobid,'jobid-jobid')
				this.delete(jobid);
			},
			
		}
	}
</script>