<template>
	<div class="zmiti-submit-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>出差事由</div>
				<div>
					<Button @click="add" type="primary">添加</Button>
					<Button :loading='loading' @click="getDataList()" type="primary">刷新</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-submit-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total"></ZmitiTable>
			</div>
		</div>

		<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
			<div slot='mask-content'>
				<transition name='detail'>
					<section class='zmiti-add-form zmiti-scroll' >
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt=""  @click='showDetail = false' >
							<span>基础信息</span>
						</header>
						<h2 style="height:40px;"></h2>
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
							<FormItem label="出差事由：">
								<Input v-model="formObj.tripname" placeholder="出差事由：" />
							</FormItem>
						
							<FormItem label="类别：">
								<RadioGroup v-model="formObj.ptripcode">
									<Radio :value='"1"' :label="'1'">在途天数</Radio>
									<Radio :value='"2"' :label="'2'">自然天数</Radio>
								</RadioGroup>
							</FormItem>
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>确定</Button>
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
	import ZmitiTable from '../../../common/table/';

	var {companyActions,userActions,formatDate,tripActions} = zmitiUtil;

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
						title:"出差事由",
						key:'tripname',
						align:'center',
						
					},
					{
						title:"类别",
						key:'realname',
						align:'center',
						render:(h,params)=>{
							var str ='';
							switch(params.row.ptripcode){
								case '1':
									str = "在途天数";
									break;
								case '2':
									str = "自然天数";
									break;
							}
							return h('div',{},str)
						}
					},
					{
						title:"创建时间",
						key:'createtime',
						align:'center',
						width:160,
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
								h('span',{
									style:{
										cursor:'pointer',
										color:"#3390ff",
										marginRight:'10px'
									},
									on:{
										click:()=>{
											Vue.obserable.trigger({type:'toggleMask',data:true});
											this.formObj = params.row;
										}
									}
								},'详情'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'

									},
									
									on:{
										'on-ok':()=>{
											this.delete(params.row.tripcode);
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
											color:"#3390ff",
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
			$route:{
				deep:true,
				handler(){
					this.getDataList()
				}
			}
			
		},
		
		methods:{
			add(){
				Vue.obserable.trigger({type:'toggleMask',data:true});
				this.formObj = {};
			},
			closeMaskPage(){
				Vue.obserable.trigger({type:'toggleMask',data:false});
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
		 
			 

			delete(tripcode){
				var s = this;
				zmitiUtil.ajax({
					remark:'delBusinesstrip',
					data:{
						action:tripActions.delBusinesstrip.action,
						condition:{
							tripcode
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
				this.loading = true;


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
						this.$router.push({path:'/tripreason/'+productid});
						var {condition} = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						})
						
						zmitiUtil.ajax({
							remark:"searchBusinesstripList",
							data:{
								action:tripActions.searchBusinesstripList.action,
								condition
							},
							error(){
								s.loading = false;
							} ,
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
			adminAction(){
				var s = this;
				var action = this.formObj.tripcode ? tripActions.editBusinesstrip.action:tripActions.addBusinesstrip.action;
				var info = {
					tripname:this.formObj.tripname,
					ptripcode:this.formObj.ptripcode,
					companyid:zmitiUtil.getCurrentCompanyId().companyid

				};
				if(this.formObj.tripcode){
					info.tripcode = this.formObj.tripcode;
				}
				zmitiUtil.ajax({
					remark:this.formObj.tripcode ?　'editBusinesstrip':'addBusinesstrip',
					data:{
						action,
						info
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						if(data.getret === 0){
							s.closeMaskPage();
							s.getDataList();
						}
					}
				})
			},
		}
	}
</script>
 