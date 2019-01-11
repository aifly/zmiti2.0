<template>
	<div class="zmiti-manager-main-ui">
		<div>
			<Tab :menus='menus' title="任务管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content">
			<header class="zmiti-tab-header">
				<div>需求单管理</div>
				<div>
					<Button type="primary" to='taskmgredit'>新增需求单</Button>
				</div>
			</header>
			<div class='zmiti-manager-main zmiti-scroll ' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-manager-table' :class="{'active':showDetail}">
					<Table :data='managerTypeList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-manager-form' v-if='showDetail'>
						<header>
							{{formmanager.managerid?'编辑项目':'新增项目'}}
						</header>
						<Form :model="formManagertype" label-position="left" :label-width="100">
							<FormItem label="所属分类：">
								<Input v-model="formManagertype.input1"></Input>
							</FormItem>
							<FormItem label="分类名称：">
								<Input v-model="formManagertype.input2"></Input>
							</FormItem>
							<FormItem label="说明：">
								<Input v-model="formManagertype.input3"></Input>
							</FormItem>
							<FormItem label="预计工时：">
								<Input v-model="formManagertype.input3"></Input>
							</FormItem>
						</Form>
						
						<div class='zmiti-manager-form-item zmiti-manager-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='managerAction'>{{formmanager.managerid?'保存':'确定'}}</Button>
						</div>
					</div>
				</transition>


			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	
	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import Tab from '../../common/tab/index';
	import {companyAdminMenus} from '../data/tab';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				visible:false,
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				currentClassId:-1, 
				formManagertype:{},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				managerList:[],
				roleCol:[
					{
						title:"产品名称",
						key:'managername',
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
										zmitiUtil.ajax({
											url:window.config.baseUrl+'admin/setuserauth',
											data:{
												setuserid:params.row.userid,
												managerids:params.row.managerid,
												isdel:params.row.authstatus === 1 ? 1:2
											}
										})
									}
								}
							},'访问权限')
						}
					}
				],
				menus:companyAdminMenus,
				columns:[
					{
						title:"单位名称",
						key:'companyName',
						align:'center',
						width:240
					},
					{
						title:"负责人账号",
						key:'username',
						align:'center'
						
					},{
						title:"用戶总数",
						key:'totalUserNum',
						align:'center'
						
					},{
						title:"到期时间",
						key:'expirDate',
						align:'center'
						
					},
					{
						title:"空间使用量",
						key:'userSpace',
						align:'center'
						
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
                               
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 5px',
										border:'none',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'
                                    },
                                    on: {
                                        click: () => {
											this.visible = true;
											var s = this;
											zmitiUtil.ajax({
												url:window.config.baseUrl+'admin/getuserauth',
												data:{
													setuserid:params.row.userid
												},
												success(data){
													s.roleList = data.list;											
												}
											})
                                        }
                                    }
								}, '权限设置'),
								 h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 5px',
										border:'none',
										background:'#fab82e',
										color:'#fff',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'

                                    },
                                    on: {
                                        click: () => {
											var s = this;
											s.showDetail = true;
											s.formmanager = params.row;
                                        }
                                    }
                                }, '详情'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗"
									},
									on:{
										'on-ok':()=>{
											this.delmanager(params.row.managerid);
										},
										
									}
								},[
									h('Button', {
										props: {
											type: 'error',
											size: 'small'
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
				
				formmanager:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				managerTypeList:[],
				 
				directoryList:{

				},
				
				userinfo:{}
			}
		},
		components:{
			Tab
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getUserInfo();
			this.getManagertypeList();
			
		},

		watch:{
			
		},
		
		methods:{

			refresh(){

			},

			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formmanager = {
				}
			},


			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},

			getManagertypeList(){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+'user/get_userlist/',
					data:{
						setusertypesign:2//1，个人帐号；2，公司帐号(包含公司管员)；3，系统管理帐号4，超级管理员
					},
					success(data){
						if(data.getret === 0){
							s.managerTypeList = data.userlist;
						}
					}
				})
				 
				
			},
		
			delmanager(id){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+'/zmitiadmin/delrateditems',
					data:{
						admintoken:s.userinfo.accesstoken,
						adminuserid:s.userinfo.userid,
						id
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.getmsg);
						if(data.getret === 0){
							s.getManagertypeList();
						}
					}
				})
			},
			managerAction(){
				var s = this;
				var p = JSON.parse(JSON.stringify(this.formmanager));
				p.admintoken = s.userinfo.accesstoken;
				p.adminuserid = s.userinfo.userid;
				var url = window.config.baseUrl+'/zmitiadmin/addrateditems';
				if(p.managerid>-1){
					url = window.config.baseUrl+'/zmitiadmin/updaterateditems';
					p.id = p.managerid;
				}else{
					this.formmanager = {
					}
				}

				zmitiUtil.ajax({
					url,
					data:p,
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.getmsg);
						//s.showDetail = false;
						s.getManagertypeList();
					}
				})
			},
		}
	}
</script>
 