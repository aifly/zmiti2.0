<template>
	<div class="zmiti-company-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>单位管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增单位</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				单位编号 <input type="text">
			</section>
			<div class='zmiti-company-main zmiti-scroll ' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-company-table' :class="{'active':showDetail}">
					<Table :data='companyList' :columns='columns'></Table>
				</div>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
		<transition name='company'>
			<section class='zmiti-add-form' v-if='showDetail'>
				<header class='zmiti-add-header'>
					<img :src="imgs.back" alt=""  @click='showDetail = false' >
					<span>添加单位</span>
				</header>
				<div class='zmiti-add-form-item'>
					<label for="">单位名称：</label><input placeholder="请输入单位名称" v-model="formcompany.companyname" />
				</div>
				<div class='zmiti-add-form-item'>
					<label for="">单位简称：</label><input placeholder="请输入单位简称" v-model="formcompany.outline" />
				</div>
				
				<div class='zmiti-add-form-item zmiti-add-btns'>
					<Button size='large' type='primary' @click='companyAction'>{{formcompany.companyid?'保存':'确定'}}</Button>
				</div>
			</section>
		</transition>

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

				tabIndex:[0,-1],

				visible:false,
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				currentClassId:-1, 
				currentUserid:'',
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				companyList:[],
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
										zmitiUtil.ajax({
											url:window.config.baseUrl+'admin/setuserauth',
											data:{
												setuserid:s.currentUserid,
												productids:params.row.productid,
												isdel:params.row.authstatus === 1 ? 1:2
											}
										})
									}
								}
							},'访问权限')
						}
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
											this.currentUserid = params.row.userid;
											zmitiUtil.ajax({
												url:window.config.baseUrl+'admin/getuserauth',
												data:{
													setuserid:params.row.userid
												},
												success(data){
													s.roleList = data.list;									
													console.log(data);
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
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getCompanyList();
			
		},

		watch:{
			
		},
		
		methods:{


			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formcompany = {
				}
			},


			refresh(val){
				this.hideMenu = val;
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
 