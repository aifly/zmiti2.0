<template>
	<div class="zmiti-product-main-ui">
		<div>
			<Tab  title="人员管理" @refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content" :style="{width:viewW - (hideMenu?50:250)+'px'}">
			<header class="zmiti-tab-header">
				<div>用户管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增用户</Button>
				</div>
			</header>
			<div class='zmiti-product-main zmiti-scroll' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-product-table' :class="{'active':showDetail}">
					<Table :data='userList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-product-form' v-if='showDetail'>
						<header>
							{{formproduct.productid?'编辑评分项':'新增评分项'}}
						</header>
						<div class='zmiti-product-form-item'>
							<label for="">单位名称：</label><input placeholder="请输入单位名称" v-model="formproduct.productname" />
						</div>
						<div class='zmiti-product-form-item'>
							<label for="">单位简称：</label><input placeholder="请输入单位简称" v-model="formproduct.outline" />
						</div>
						
						<div class='zmiti-product-form-item zmiti-product-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='productAction'>{{formproduct.productid?'保存':'确定'}}</Button>
						</div>
					</div>
				</transition>
			</div>
		</div>
		<!-- <ZmitiModal></ZmitiModal> -->
	</div>
</template>

<script>
	import './index.css';
	
	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import ZmitiModal  from '../../common/modal/index';
	import Tab from '../../common/tab/index';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				visible:false,
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				currentClassId:-1, 
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				productList:[],
				hideMenu:false,
				columns:[
					{
						title:"用户名称",
						key:'username',
						align:'center'
						
					},
					{
						title:"手机号",
						key:'mobile',
						align:'center'
						
					},
					{
						title:"邮箱",
						key:'email',
						align:'center'
						
					},
					{
						title:"注册日期",
						key:'regDate',
						align:'center'
						
					},
					{
						title:"剩余天数",
						key:'surplusDays',
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
											s.formproduct = params.row;
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
											this.delproduct(params.row.productid);
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
				
				formproduct:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				userList:[],
				 
				directoryList:{

				},
				
				userinfo:{}
			}
		},
		components:{
			ZmitiModal,
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
			this.getUserList();
			
		},

		watch:{
			
		},
		
		methods:{

			refresh(){

			},

			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formproduct = {
				}
			},


			refresh(val){
			 this.hideMenu = val;
			},

			getUserList(){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+'user/get_userlist/',
					data:{
						setusertypesign:1//1，个人帐号；2，公司帐号(包含公司管员)；3，系统管理帐号4，超级管理员
					},
					success(data){
						if(data.getret === 0){
							s.userList = data.userlist;
						}
					}
				})
				 
				
			},
		
			delproduct(id){
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
							s.getUserList();
						}
					}
				})
			},
			productAction(){
				var s = this;
				var p = JSON.parse(JSON.stringify(this.formproduct));
				p.admintoken = s.userinfo.accesstoken;
				p.adminuserid = s.userinfo.userid;
				var url = window.config.baseUrl+'/zmitiadmin/addrateditems';
				if(p.productid>-1){
					url = window.config.baseUrl+'/zmitiadmin/updaterateditems';
					p.id = p.productid;
				}else{
					this.formproduct = {
					}
				}

				zmitiUtil.ajax({
					url,
					data:p,
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.getmsg);
						//s.showDetail = false;
						s.getUserList();
					}
				})
			},
		}
	}
</script>
 