<template>
	<div class="zmiti-project-main-ui">
		<div>
			<Tab :menus='menus' title="项目管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content zmiti-scroll">
			<header class="zmiti-tab-header">
				<div>项目管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增项目</Button>
				</div>
			</header>
			<div class='zmiti-company-list'>
				<div class='zmiti-company-name'>单位名称：</div>
				<div @click='toggleCompany(company)' v-for='(company,i)  in companyList' :key='i' :class='{"active":companyid === company.companyid}'>
					{{company.companyname}}
				</div>
			</div>
			<div class='zmiti-project-main  ' :style="{minHeight:viewH - 220+'px' }">
				<div class='zmiti-project-table'  :class="{'active':showDetail}">
					<Table :data='projectList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-project-form' v-if='showDetail'>
						<header>
							{{formProject.projectid?'编辑项目':'新增项目'}}
						</header>
						<Form :model="formProject" :rules="ruleValidate" label-position="left" :label-width="100">
							

							<FormItem label="项目名称：" prop='projectname'>
								<Input v-model="formProject.projectname"></Input>
							</FormItem>
							<FormItem label="说明：">
								<Input type='textarea' v-model="formProject.remarks"></Input>
							</FormItem>
						</Form>
						
						<div class='zmiti-project-form-item zmiti-project-btns'>
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
	import zmitiUtil from '../../lib/util';
	import Tab from '../../../common/tab/index';
	import {zmitiUserMenus} from '../../data/tab';
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
				companyid:-1,
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
				
				menus:zmitiUserMenus,
				columns:[
					{
						title:"项目名称",
						key:'projectname',
						align:'center',
						width:240
					},
					{
						title:"剩余工时",
						key:'workhours',
						align:'center'
					},
					{
						title:"说明",
						key:'remarks',
						align:'center',
						render:(h,params)=>{
							return params.row.remarks || '无'
						}
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
										confirm:true,
										title:"确定要删除吗"
									},
									on:{
										'on-ok':()=>{
											this.delcompany(params.row.projectid);
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

				companyList:[],
				
				formProject:{
				},
				projectList:[],
				 
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
			
			this.getCompanyList(()=>{
				this.getprojectList();
			});
		},

		watch:{
			
		},
		
		methods:{

			toggleCompany(company){
				this.companyid = company.companyid;
				this.getprojectList();
			},
			getCompanyList(fn){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.taskSystemUrl+'admin/getcompanylist/',
					data:{
						
					},
					success(data){
						if(data.getret === 0){
							s.companyList = data.list;
							if(s.companyList.length){
								s.companyid = s.companyList[0].companyid;
								fn && fn();
							}
						}
					}
				})
			},

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

			delcompany(projectid){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.taskSystemUrl+'admin/delcompany/',
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

			getprojectList(){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.taskSystemUrl+'admin/getprojectList/',
					//url:'http://www.reedexport.cn/reedadmin/back/abctest01?id=1'
					data:{
						companyid:s.companyid
					},
					success(data){
						if(data.getret === 0){
							s.projectList = data.list;
							console.log(data);
						}
					}
				})
				 
				
			},
			projectAction(){
				var s = this;
				var url = window.config.taskSystemUrl+'admin/addproject';
				var msg = '添加成功';
				var params = {
					projectname:s.formProject.projectname,
					workhours:s.formProject.workhours,
					remarks:s.formProject.remarks,
					companyid:s.companyid
				};
				if(s.formProject.projectid){
					url = window.config.taskSystemUrl+'admin/updateproject';
					params.projectid = s.formProject.projectid;
					msg = '修改成功';
				}
				zmitiUtil.ajax({
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
 