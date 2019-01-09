<template>
	<div class="zmiti-taskmgredit-main-ui">
		<div>
			<Tab :menus='menus' title="任务管理" :refresh='refresh'></Tab>
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
						<FormItem label="所属分类：" prop='tasktypeid'>
							<Input v-model="formTaskMgr.tasktypeid" />
						</FormItem>
						<FormItem label="任务名称："  prop='taskname'>
							<Input v-model="formTaskMgr.taskname" />
						</FormItem>
						<FormItem label="任务时间：" prop='enddate'>
							<Row type='flex'>
								<Col>
									<DatePicker type="datetime" v-model="formTaskMgr.startdate" placeholder="选择开始时间" style="width: 100%"></DatePicker>
								</Col>
								<Col>
									<div class='zmiti-and-btn'>~</div>
								</Col>
								<Col>
									<DatePicker type="datetime" v-model="formTaskMgr.enddate" placeholder="选择结束时间" style="width: 100%"></DatePicker>	
								</Col>
							</Row>
						</FormItem>
						<FormItem label="下单人：" prop='username'>
							<Input v-model="formTaskMgr.username" />
						</FormItem>
						<FormItem label="下单人电话：" prop='mobile'>
							<Input v-model="formTaskMgr.mobile" />
						</FormItem>
						<FormItem label="任务说明：">
							<Input v-model="formTaskMgr.explain" />
						</FormItem>
						<FormItem label="备注：">
							<Input type='textarea' v-model="formTaskMgr.remarks" />
						</FormItem>

						<FormItem>
							<Button type="primary" @click='taskMgrAction'>{{$route.params.id ? '更新':'保存'}}</Button>
							<Button style="margin-left: 8px" to='taskmgrlist'>返回</Button>
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
	import Tab from '../../common/tab/index';
	import menus from '../data/tab';
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
				
				menus,
			
				
				formmanager:{
					
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

			taskMgrAction(){
				console.log(this.formTaskMgr);
			}
		}
	}
</script>
 