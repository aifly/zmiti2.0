<template>
	<div class="zmiti-submit-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>用户列表</div>
				<div>
					<div class='zmiti-upload-btn'>
						<input type="file" ref='file' @change='importData'>
						<Button type="primary">用户导入</Button>
					</div>
					<Button @click="add()" type="primary">添加用户</Button>
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
							<span>添加用户</span>
						</header>
						<h2 style="height:40px;"></h2>
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
							<FormItem label="用户名：">
								<Input v-model="formObj.username" placeholder="用户名：" />
							</FormItem>
							<FormItem label="真实姓名：">
								<Input v-model="formObj.realname" placeholder="真实姓名：" />
							</FormItem>
							<FormItem label="密码：">
								<Input v-model="formObj.userpwd" placeholder="密码：" />
							</FormItem>
							<FormItem label="手机号：">
								<Input v-model="formObj.usermobile" placeholder="手机号：" />
							</FormItem>
							<FormItem label="邮箱：">
								<Input v-model="formObj.useremail" placeholder="邮箱：" />
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


		<Modal v-model='visiable' title='待提交的用户' width='800' >
			<div class='zmiti-import-loading'>
				<span></span>
			</div>
			<Table :columns='excelColumns' :data='excel_list' :height='viewH*.6'></Table>
		</Modal>
			 
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

				visiable:true,
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
											this.formObj = params.row.user;
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
				userinfo:{},
				excel_list:[
					{
						"username":"test",
						"username_exist":1,
						"realname":"测试",
						"usermobile":13720885914,
						"usermobile_exist":0,
						"useremail":"27489658@qq.com",
						"useremail_exist":0
					}
				],
				excelColumns:[
					{
						title:'用户名',
						key:'username',
						align:'center',
						render:(h,params)=>{
							return h('Input',{
								props:{
									value:params.row.username
								},
								on:{
									'on-change':(e)=>{
										this.excel_list[params.index].username = e.target.value;
									}
								}
							})
						}
					},{
						title:'真实姓名',
						key:'realname',
						align:'center',
						render:(h,params)=>{
							return h('Input',{
								props:{
									value:params.row.realname
								},
								on:{
									'on-change':(e)=>{
										this.excel_list[params.index].realname = e.target.value;
									}
								}
							})
						}
					},{
						title:'手机号',
						key:'usermobile',
						align:'center',
						render:(h,params)=>{
							return h('Input',{
								props:{
									value:params.row.usermobile
								},
								on:{
									'on-change':(e)=>{
										this.excel_list[params.index].usermobile = e.target.value;
									}
								}
							})
						}
					},{
						title:'邮箱',
						key:'useremail',
						align:'center',
						render:(h,params)=>{
							return h('Input',{
								props:{
									value:params.row.useremail
								},
								on:{
									'on-change':(e)=>{
										this.excel_list[params.index].useremail = e.target.value;
									}
								}
							})
						}
					},{
						title:'操作',
						key:'',
						align:'center',
						render:(h,params)=>{
							
							return h('div',{},[h('Poptip',{
								props:{
									confirm:true,
									title:"确定要删除吗？",
									placement:'left'

								},
								
								on:{
									'on-ok':()=>{
										this.excel_list.splice(params.index,1);
										//this.delete(params.row.ucid);
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
							])])

						}
					}
				]
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


			for(var i =0 ;i<5;i++){
				this.excel_list = this.excel_list.concat(this.excel_list);
			}
			
			
		},

		watch:{
			

			 
			
		},
		
		methods:{
			importData(){
				var userinfo = zmitiUtil.getUserInfo();
				if(!userinfo.ui){
					return;
				}
				var s = this;
				var formData = new FormData();

				formData.append('userid',userinfo.ui.userid);
				formData.append('token',userinfo.ui.token);
				formData.append('type',1);
				formData.append('file',this.$refs['file'].files[0]);
				axios.post(window.config.baseUrl+'index/importexcel/index',formData).then(data=>{
					s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
				})
			},
			change(e){
				this.condition.page_index = e -1;
				this.getMyCheckList();
			},
			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
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
			add(){
				Vue.obserable.trigger({
					type:"toggleMask",
					data:true
				});
				this.formObj = {};
			},
			adminAction(){
				if(this.formObj.userid){
					return;
				}
				var s = this;
				var action =  userActions.registerCompanyUser.action;
				var info = {
					companyid:zmitiUtil.getCurrentCompanyId().companyid,
					username:s.formObj.username,
					userpwd:s.formObj.userpwd,
					useremail:s.formObj.useremail,
					usermobile:s.formObj.usermobile,
					realname:s.formObj.realname,
					status:s.formObj.status,
				};
				zmitiUtil.ajax({
					remark:'registerCompanyUser',
					data:{
						action,
						info
					},
					success(data){
						s.closeMaskPage();
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
 