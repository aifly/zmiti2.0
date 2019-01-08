<template>
	<div class="zmiti-taskmgredit-main-ui">
		<div>
			<Tab :menus='menus' title="任务管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content">
			<header class="zmiti-tab-header">
				<div>新建任务单</div>
				<div>
				</div>
			</header>
			<div class='zmiti-taskmgredit-main zmiti-scroll ' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-taskmgredit-table' :class="{'active':showDetail}">
					<Form :model="formTaskMgr" label-position="left" :label-width="100">
						<FormItem label="所属分类：">
							<Input v-model="formTaskMgr.tasktypeid" />
						</FormItem>
						<FormItem label="任务名称：">
							<Input v-model="formTaskMgr.taskname" />
						</FormItem>
						<FormItem label="任务时间：">
							 <DatePicker type="datetimerange" placeholder="选择开始和结束时间" style="width: 100%"></DatePicker>
						</FormItem>
						<FormItem label="下单人：">
							<Input v-model="formTaskMgr.username" />
						</FormItem>
						<FormItem label="下单人电话：">
							<Input v-model="formTaskMgr.mobile" />
						</FormItem>
						<FormItem label="任务说明：">
							<Input v-model="formTaskMgr.explain" />
						</FormItem>
						<FormItem label="备注：">
							<Input type='textarea' v-model="formTaskMgr.remarks" />
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
				formTaskMgr:{},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				managerList:[],
				
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
 