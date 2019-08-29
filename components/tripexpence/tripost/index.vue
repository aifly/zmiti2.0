<template>
	<div class="zmiti-tripost-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'></span>职务-{{companyname}}</div>
				<div>
					<Button :loading='loading' @click="getDataList()" type="primary">刷新</Button>
					<Button type="primary" @click='add()'>新增职位</Button>
				</div>
			</header>
			<div class='zmiti-submit-main zmiti-scroll ' :style="{height:viewH - 130+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total" @getSelection='getSelection'>
					<div slot='table-btns' style="display:inline-block">
					<!-- 	<Poptip
							confirm
							title="确定要删除吗?"
							@on-ok='selectionDelete'
							>
							<div class='zmiti-table-btn'>删除</div>
							
						</Poptip>
						<div class='zmiti-table-btn'>禁用</div> -->
					</div>
				</ZmitiTable>
			</div>
		</div>
		<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
			<div slot='mask-content'>
				<transition name='detail'>
					<section class='zmiti-add-form zmiti-scroll' >
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt=""  @click='closeMaskPage' >
							<span>基础信息</span>
						</header>
					
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
							<FormItem label="职务名称：">
								<Input v-model="formObj.jobname" placeholder="职务名称：" />
							</FormItem>
							<FormItem label="职务级别：">
								<Select v-model="formObj.level">
									<Option :value="i+1" :lable='i+1' v-for="(item,i) in jobLevel" :key="i">{{item}}</Option>
								</Select>
							</FormItem>
							 
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formObj.jobid?'保存':'确定'}}</Button>
						</div>
					</section>
				</transition>
			</div>
		</ZmitiMask>
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

	var {companyActions,zmitiActions,tripActions,formatDate} = zmitiUtil;

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
				jobLevel:[
					'普通职称',
					'中级职称',
					'高级职称'
				],
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
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],
				columns:[
					{
						title:"职务名称",
						key:'jobname',
						align:'center',
					},
					{
						title:"职务级别",
						key:'level',
						align:'center',
						render:(h,params)=>{
							return h('div',{},this.jobLevel[params.row.level-1]);
						}
					},
					{
						title:"创建时间",
						key:'createtime',
						align:'center',
						render:(h,params)=>{
							return h('div',{},params.row.creattime);
						}
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
											this.delete(params.row.jobid);
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
				userinfo:{}
			}
		},
		components:{
			ZmitiMask,
			ZmitiTable
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			var userinfo = zmitiUtil.getUserInfo();
			if(!userinfo){
				this.$router.push({path:'/login'})
			}

			this.getDataList();
			Vue[this.$route.name] = ()=>{
				this.getDataList();
			}

			
			
		},

		watch:{
			
			$route:{
				handler(){
					var productid = this.productid;
					productid && this.$router.push({path:'/tripost/'+productid});
				}
			}
			
		},
		
		methods:{
			closeMaskPage(){
				Vue.obserable.trigger({type:'toggleMask',data:false});
			},
			add(){
				this.formObj = {};
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			adminAction(){
				var s = this;
				var action = this.formObj.jobid ? tripActions.editJob.action:tripActions.addJob.action;


				let info = {
					jobname:this.formObj.jobname,
					level:this.formObj.level,
					companyid:zmitiUtil.getCurrentCompanyId().companyid,
					productid:s.productid,
				}
				if(this.formObj.jobid){
					info.jobid = this.formObj.jobid
				}
				zmitiUtil.ajax({
					remark:this.formObj.jobid ?　'editJob':'addJob',
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
			getSelection(data){
				this.selectList = data;
			},
			selectionDelete(){
				if(this.selectList.length<=0){
					this.$Message.error({content:'您还未选择任何要删除的项',duration:5});
					return;
				}
				var manuscriptids = this.selectList.map(item=>{
					return item.manuscriptid;
				}).join(',');
				
				this.delete(manuscriptids);
			},
		  
			delete(jobid){
				var s = this;
				zmitiUtil.ajax({
					remark:'delJob',
					data:{
						action:tripActions.delJob.action,
						condition:{
							jobid,
							productid:s.productid,
							companyid:zmitiUtil.getCurrentCompanyId().companyid
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSource = data.list;	 
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
						this.$router.push({path:'/tripost/'+productid});
						this.productid = productid;
						var {condition} = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						})
						zmitiUtil.ajax({
							remark:"getJobList",
							data:{
								action:tripActions.getJobList.action,
								condition:condition
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
			
		}
	}
</script>
 