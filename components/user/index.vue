<template>
	<div class="zmiti-submit-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>用户列表</div>
				<div>
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
							<FormItem label="用户名：">
								<Input v-model="formObj.adminusername" placeholder="用户名：" />
							</FormItem>
						
							<FormItem label="状态：">
								<RadioGroup v-model="formObj.status">
									<Radio :value='1' :label="1">正常</Radio>
									<Radio :value='0' :label="0">禁用</Radio>
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
	import zmitiUtil from '../../common/lib/util';
	import ZmitiMask from '../../common/mask/';
	import ZmitiTable from '../../common/table/';

	var {companyActions,userActions,formatDate} = zmitiUtil;

	import {manuscriptStatus} from '../../common/config';

	

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
						title:"用户名",
						key:'username',
						align:'center',
						render:(h,params)=> {
							return h('div',{},params.row.user.username);
						},
					},
					{
						title:"真实姓名",
						key:'realname',
						align:'center',
						render:(h,params)=> {
							return h('div',{},params.row.user.realname);
						},
					},
					{
						title:"加入时间",
						key:'joindate',
						align:'center',
						width:160,
						render:(h,params)=> {
							return h('div',{},formatDate(params.row.joindate));
						},
					},
					{
						title:"用户状态",
						key:'createtime',
						align:'center',
						
						render:(h,params)=> {
							return h('div',{},params.row.user.status === 1 ?'正常':params.row.user.status === 0 ? '已禁用':"已删除");
						},
					},
					 {
						width:120,
						title:"是否单位管理员",
						key:'islead',
						align:'center',
						render:(h,params)=> {
							return h('div',{},params.row.islead === 1 ?'是':"否");
						},
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
											this.delete(params.row.ucid);
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
			change(e){
				this.condition.page_index = e -1;
				this.getMyCheckList();
			},
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
		 
			 

			delete(ucid){
				var s = this;
				zmitiUtil.ajax({
					remark:'delCompanyUser',
					data:{
						action:userActions.delCompanyUser.action,
						ucid
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
			change(e){
				this.condition.page_index = e -1;
				this.getDataList();
			},
			getDataList(){
				var s = this;
				this.loading = true;
				var {condition} = this;
				condition = Object.assign(condition,{
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				})
				zmitiUtil.ajax({
					remark:"getCompanyUserList",
					data:{
						action:userActions.getCompanyUserList.action,
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
			},
			adminAction(){
				var s = this;
				var action = this.adminuserId ? zmitiActions.editAdminUser.action:zmitiActions.addAdminUser.action;
				
				zmitiUtil.adminAjax({
					remark:this.adminuserId ?　'editAdminUser':'addAdminUser',
					data:{
						action,
						info:this.formAdmin
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							s.getAdminList();
						}
					}
				})
			},
		}
	}
</script>
 