<template>
	<div class="zmiti-taskmgredit-main-ui">
		<div>
			<Tab :menus='menus' title="项目列表" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content zmiti-scroll" :style="{height:viewH - 50+'px' }">
			<header class="zmiti-tab-header">
				<div>新建任务单</div>
				<div>
				</div>
			</header>
			<div class='zmiti-taskmgredit-main ' >
				<div class='zmiti-taskmgredit-table ' :class="{'active':showDetail}">
					<h2>新建任务单</h2>
					<Form :model="formTaskMgr"   :rules="ruleValidate" label-position="right" :label-width="100">
						<!-- <FormItem label="所属项目：" >
							<Select style="width:400px;" :label-in-value="true" v-on:change="getprojectList" v-model="formTaskMgr.projectid">
							    <Option :value="item.value" v-for="item in projectList" :key="item.value">{{item.label}}</Option>
							</Select>
						</FormItem> -->
						<FormItem label="所属分类：" prop='typeid'>
							<Select style="width:400px;" :label-in-value="true" v-on:change="gettasktypelist" v-model="formTaskMgr.typeid">
							    <Option :value="item.value" v-for="item in tasktypeList" :key="item.value">{{item.label}}</Option>
							</Select>
						</FormItem>
						<!-- <FormItem label="任务名称："  prop='taskname'>
							<Input v-model="formTaskMgr.taskname" />
						</FormItem> -->
						<FormItem label="任务时间：" >
							<Row type='flex'>
								<Col>
									<DatePicker type="datetime" @on-change="starttimeformat" v-model="formTaskMgr.starttime" format="yyyy-MM-dd" placeholder="选择开始时间" style="width: 100%"></DatePicker>
								</Col>
								<Col>
									<div class='zmiti-and-btn'>~</div>
								</Col>
								<Col>
									<DatePicker type="datetime" @on-change="endtimeformat" v-model="formTaskMgr.endtime" format="yyyy-MM-dd" placeholder="选择结束时间" style="width: 100%"></DatePicker>	
								</Col>
							</Row>
						</FormItem>
						<FormItem label="联系人姓名：" prop='username'>
							<Input v-model="formTaskMgr.username" />
						</FormItem>
						<FormItem label="电话：" prop='mobile'>
							<Input v-model="formTaskMgr.mobile" />
						</FormItem>
						<FormItem label="任务说明：" prop='directions'>
							<Input v-model="formTaskMgr.directions" />
						</FormItem>
						<FormItem label="处理状态：" prop='status'>
							<RadioGroup v-model="formTaskMgr.status">
						        <Radio :label="0">未处理</Radio>
						        <Radio :label="1">处理中</Radio>
						        <Radio :label="2">已处理</Radio>
						    </RadioGroup>
						</FormItem>
						<FormItem label="加急状态：" prop='expedited'>
							<RadioGroup v-model="formTaskMgr.expedited">
						        <Radio :label="0">正常</Radio>
						        <Radio :label="1">加急</Radio>
						    </RadioGroup>
						</FormItem>
						<FormItem label="备注：" prop='remarks'>
							<Input type='textarea' v-model="formTaskMgr.remarks" />
						</FormItem>

						<FormItem>
							<Button type="primary" @click='taskMgrAction'>保存</Button>
							<Button style="margin-left: 8px" @click="routerTo">返回</Button>
						</FormItem>
						
					</Form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import './edit.css';
	
	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
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
				formTaskMgr:{
					projectid:'',
					date:[]
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				managerList:[],

				ruleValidate: {
                    tasktypeid: [
                        { required: true, message: '所属分类不能为空', trigger: 'blur' }
                    ],
                    taskname: [
                        { required: true, message: '任务名称不能为空', trigger: 'blur' }
                    ],
                    startdate: [
                        { required: true, }
					],
					enddate: [
                        { required: true}
                    ],
                    username: [
                        { required: true, message: '下单人不能为空', trigger: 'blur' }
					],
					mobile: [
                        { required: true, message: '下单人联系电话不能为空', trigger: 'blur' }
                    ]
                },
				
				menus:companyAdminMenus,
			
				
				formmanager:{
					
				},
				projectList:[
					{
						value:1,
						label:'请选择'
					}
				],
				tasktypeList:[
					{
						value:1,
						label:'请选择'
					}
				],				 
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
		created(){
			//this.getprojectList();//获取项目列表
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getUserInfo();
			this.formTaskMgr.projectid=this.$route.query.projectid;
			this.getprojectList();//获取项目列表
			this.gettasktypelist();
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
			getprojectList(){//获取项目列表
				var s = this;
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/getprojectlist/',
					data:{
						
					},
					success(data){
						
						if(data.getret === 0){							
							data.list.map(function(item,index){
								s.projectList[index]={
									'value':item.projectid,
									'label':item.projectname									
								}
							})
							console.log(s.projectList,'s.projectList'); 
						}

					}
				})
				 
				
			},
			gettasktypelist(){//获取任务类型
				var s = this;
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/gettasktypelist/',
					data:{
						
					},
					success(data){
						
						if(data.getret === 0){							
							data.list.map(function(item,index){
								s.tasktypeList[index]={
									'value':item.typeid,
									'label':item.name									
								}
							})
							console.log(data,'获取任务类型'); 
						}

					}
				})
			},
			taskMgrAction(){//添加任务
				//console.log(this.formTaskMgr);
				var s = this;
				var params = {
					projectid:s.formTaskMgr.projectid,					
					typeid:s.formTaskMgr.typeid,
					starttime:s.formTaskMgr.starttime,
					endtime:s.formTaskMgr.endtime,
					mobile:s.formTaskMgr.mobile,
					username:s.formTaskMgr.username,
					directions:s.formTaskMgr.directions,
					status:s.formTaskMgr.status,
					expedited:s.formTaskMgr.expedited,
					remarks:s.formTaskMgr.remarks
				};
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/addtask/',
					data:params,
					success(data){
						if(data.getret === 0){
							console.log(data,'data');
							s.$Message.success({
								content:'添加成功',
								onClose:function(){
									window.location.href='.#/taskmgrlist?projectid='+s.formTaskMgr.projectid;
								}
							});							
						}
					}
				})
			},
			starttimeformat(e){
				this.formTaskMgr.starttime = e;
			},
			endtimeformat(e){
				this.formTaskMgr.endtime = e;
			},
			routerTo(){
				this.$router.push({ path: '/taskmgrlist', query: { projectid: this.formTaskMgr.projectid }});
			}
		}
	}
</script>
 