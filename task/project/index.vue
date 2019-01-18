<template>
	<div class="zmiti-manager-main-ui">
		<div>
			<Tab :menus='menus' title="项目管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content">
			<header class="zmiti-tab-header">
				<div>项目管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增项目</Button>
				</div>
			</header>
			<div class='zmiti-manager-main zmiti-scroll ' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-manager-table' :class="{'active':showDetail}">
					<Table :data='managerTypeList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-manager-form' v-if='showDetail'>
						<header>
							{{formProject.projectid?'编辑项目':'新增项目'}}
						</header>
						<Form :model="formProject" :rules="ruleValidate" label-position="left" :label-width="100">
							<FormItem label="项目名称：" prop='projectname'>
								<Input v-model="formProject.projectname"></Input>
							</FormItem>
							<FormItem label="说明：">
								<Input type='textarea' v-model="formProject.explain"></Input>
							</FormItem>
						</Form>
						
						<div class='zmiti-manager-form-item zmiti-manager-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='projectAction'>{{formProject.projectid?'保存':'确定'}}</Button>
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
	import zmitiCompanyUtil from '../lib/companyutil';
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
				formProject:{},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				managerList:[],
				ruleValidate: {
                 
                    projectname: [
                        { required: true, message: '项目名称不能为空', trigger: 'blur' }
                    ]
				},
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
										zmitiCompanyUtil.ajax({
											url:window.config.baseUrl+'admin/setuserauth',
											data:{
												setuserid:params.row.userid,
												projectids:params.row.projectid,
												isdel:params.row.authstatus === 1 ? 1 : 2
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
						title:"项目名称",
						key:'projectname',
						align:'center',
						width:240
					},
					{
						title:"状态",
						key:'status',
						align:'center'
						
					},{
						title:"说明",
						key:'explain',
						align:'center'
						
					},{
						title:"创建时间",
						key:'create_time',
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
											s.formProject = params.row;
                                        }
                                    }
                                }, '详情'),
                                h('Poptip',{
									props:{
										title:"确定要删除吗",
										confirm:true
										
									},
									on:{
										'on-ok':()=>{
											this.delproject(params.row.projectid);
										}
										
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
				
				formProject:{
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
			//zmitiCompanyUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiCompanyUtil.getUserInfo();
			this.getprojectList();
			
		},

		watch:{
			
		},
		
		methods:{

			refresh(){

			},

			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formProject = {
				}
			},


			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},

			getprojectList(){
				var s = this;
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/getprojectlist/',
					data:{
						
					},
					success(data){
						if(data.getret === 0){
							s.managerTypeList = data.list;
						}
					}
				})
				 
				
			},
		
			delproject(projectid){
				var s = this;
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/delproject',
					data:{
						projectid,
					},
					success(data){
						if(data.getret === 0){
							s.getprojectList();
						}
					}
				})
			},
			projectAction(){
				var s = this;
				var url = window.config.taskSystemUrl+'company/addproject';
				var msg = '添加成功';
				var params = {
					projectname:s.formProject.projectname,
					explain:s.formProject.explain,
					companyid:s.formProject.projectid
				};
				if(s.formProject.projectid){
					url = window.config.taskSystemUrl+'company/updateproject';
					params.projectid = s.formProject.projectid;
					msg = '修改成功';
				}
				zmitiCompanyUtil.ajax({
					url,
					data:params,
					success(data){
						if(data.getret === 0){
							s.getprojectList();
							if(!s.formProject.projectid){
								s.formProject = {};
							}
							s.$Message.success(msg);
						}else{
							s.$Message.success(s.formProject.projectid? '修改失败':'添加失败');
						}
					}
				});	
			},
		}
	}
</script>
 