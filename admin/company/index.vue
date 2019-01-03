<template>
	<div class="zmiti-company-main-ui">
		<div>
			<Tab :menus='menus' title="人员管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content">
			<header class="zmiti-tab-header">
				<div>单位管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增单位</Button>
				</div>
			</header>
			<div class='zmiti-company-main zmiti-scroll ' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-company-table' :class="{'active':showDetail}">
					<Table :data='companyList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-company-form' v-if='showDetail'>
						<header>
							{{formcompany.companyid?'编辑评分项':'新增评分项'}}
						</header>
						<div class='zmiti-company-form-item'>
							<label for="">单位名称：</label><input placeholder="请输入单位名称" v-model="formcompany.companyname" />
						</div>
						<div class='zmiti-company-form-item'>
							<label for="">单位简称：</label><input placeholder="请输入单位简称" v-model="formcompany.outline" />
						</div>
						
						<div class='zmiti-company-form-item zmiti-company-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='companyAction'>{{formcompany.companyid?'保存':'确定'}}</Button>
						</div>
					</div>
				</transition>


			</div>
		</div>

		<Modal title='权限设置' v-model="visible">
			<Table :data='roleList' :columns='roleCol'></Table>
		</Modal>
	</div>
</template>

<script>
	import './index.css';
	
	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import Tab from '../../common/tab/index';
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
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				companyList:[],
				roleCol:[
					{
						title:"产品名称",
						key:'companyname',
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
												companyids:params.row.companyid,
												isdel:params.row.authstatus === 1 ? 1:2
											}
										})
									}
								}
							},'访问权限')
						}
					}
				],
				menus:[
					{
						name:"单位账号管理",
						to:"company"
					},
					{
						name:"个人账号管理",
						to:"user"
					}
				],
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
											s.formcompany = params.row;
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
											this.delcompany(params.row.companyid);
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
				
				formcompany:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				companyList:[],
				 
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
			this.getCompanyList();
			
		},

		watch:{
			
		},
		
		methods:{

			refresh(){

			},

			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formcompany = {
				}
			},


			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},

			getCompanyList(){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+'user/get_userlist/',
					data:{
						setusertypesign:2//1，个人帐号；2，公司帐号(包含公司管员)；3，系统管理帐号4，超级管理员
					},
					success(data){
						if(data.getret === 0){
							s.companyList = data.userlist;
						}
					}
				})
				 
				
			},
		
			delcompany(id){
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
							s.getCompanyList();
						}
					}
				})
			},
			companyAction(){
				var s = this;
				var p = JSON.parse(JSON.stringify(this.formcompany));
				p.admintoken = s.userinfo.accesstoken;
				p.adminuserid = s.userinfo.userid;
				var url = window.config.baseUrl+'/zmitiadmin/addrateditems';
				if(p.companyid>-1){
					url = window.config.baseUrl+'/zmitiadmin/updaterateditems';
					p.id = p.companyid;
				}else{
					this.formcompany = {
					}
				}

				zmitiUtil.ajax({
					url,
					data:p,
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.getmsg);
						//s.showDetail = false;
						s.getCompanyList();
					}
				})
			},
		}
	}
</script>
 