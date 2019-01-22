<template>
	<div class="zmiti-taskmgruserlist-main-ui">
		<div>
			<Tab :menus='menus' title="人员管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content">
			<header class="zmiti-tab-header">
				<div>人员管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增人员管理</Button>
				</div>
			</header>
			<div class='zmiti-taskmgruserlist-main zmiti-scroll ' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-taskmgruserlist-table' :class="{'active':showDetail}">
					<Table :data='managerUserList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-taskmgruserlist-form' v-if='showDetail'>
						<header>新增人员
						</header>
						<Form :model="formProject" label-position="left" :label-width="100">
							<FormItem label="用户名：" prop='username'>
								<Input v-model="formProject.username"></Input>
							</FormItem>
							<FormItem label="密码：" prop='userpwd'>
								<Input v-model="formProject.userpwd"></Input>
							</FormItem>
							<FormItem label="姓名：" prop='realname'>
								<Input v-model="formProject.realname"></Input>
							</FormItem>
							<FormItem label="性别：" prop='sex'>
								<Input v-model="formProject.sex"></Input>
							</FormItem>
							<FormItem label="手机号：" prop='usermobile'>
								<Input v-model="formProject.usermobile"></Input>
							</FormItem>
							<FormItem label="账号使用标识：" prop='isover'>
								<Input v-model="formProject.isover"></Input>
							</FormItem>
							<FormItem label="账号类型：" prop='usersign'>
								<Input v-model="formProject.usersign"></Input>
							</FormItem>
						</Form>
						<div class='zmiti-taskmgruserlist-form-item zmiti-taskmgruserlist-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='projectAction'>确定</Button>
						</div>
					</div>
				</transition>
			</div>
		</div>
	</div>
</template>
<script>
	import './userlist.css';
	
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
				isLoading:false,
				showDetail:false,
				currentClassId:-1,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				menus:companyAdminMenus,
				formProject:{},
				managerUserList:[],
				columns:[
					{
						title:"用户名",
						key:'username',
						align:'center',
						width:200
					},
					{
						title:"姓名",
						key:'realname',
						align:'center'
					},
					{
						title:"性别",
						key:'sex',
						align:'center',
						width:80,
						render:(h,params)=>{
							return h('div',[
								h('span',{
									props:{
										type:'text'
									}
								},params.row.sex==1?"男":"女")
							])							
						}
					},
					{
						title:"电话",
						key:'usermobile',
						align:'center'
					},
					{
						title:"账号类型",
						key:'usersign',
						align:'center',
						width:120,
						render:(h,params)=>{
							return h('div',[
								h('span',{
									props:{
										type:'text'
									}
								},params.row.usersign==1?"单位管理员":"普通用户")
							])
						}
					},
					{
						title:"状态",
						key:'isover',
						align:'center',
						width:120,
						render:(h,params)=>{
							return h('div',[
								h('span',{
									props:{
										type:'text'
									}
								},"使用")
							])
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
										title:"确定要删除吗",
										confirm:true
										
									},
									on:{
										'on-ok':()=>{											
											this.delproject(params.row.companyuserid);
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
							])
						}
					}
				],
			}
		},
		components:{
			Tab
		},
		beforeCreate(){
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiCompanyUtil.getUserInfo();			
			this.getuserList();
		},
		watch:{
			
		},
		
		methods:{
			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formProject = {
				}
			},
			getuserList(){
				var s = this;
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/getuserlist/',
					data:{
						
					},
					success(data){
						if(data.getret === 0){
							console.log(data,'data');
							s.managerUserList = data.list;
						}
					}
				})
			},
			delproject(userid){
				var s = this;
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/deluser',
					data:{
						userid,
					},
					success(data){
						if(data.getret === 0){
							s.getuserList();
						}
					}
				})
			},
			projectAction(){
				var s = this;
				var url = window.config.taskSystemUrl+'company/adduser';
				var msg = '添加成功';
				var params = {
					username:s.formProject.username,
					userpwd:s.formProject.userpwd,
					realname:s.formProject.realname,
					sex:s.formProject.sex,
					usermobile:s.formProject.usermobile,
					isover:s.formProject.isover,
					usersign:s.formProject.usersign
				};
				if(s.formProject.userid){
					url = window.config.taskSystemUrl+'company/updateuserinfo';
					params.userid = s.formProject.userid;
					msg = '修改成功';
				}
				zmitiCompanyUtil.ajax({
					url,
					data:params,
					success(data){
						if(data.getret === 0){
							s.getprojectList();
							if(!s.formProject.userid){
								s.formProject = {};
							}
							s.$Message.success(msg);
						}else{
							s.$Message.success(s.formProject.userid? '修改失败':'添加失败');
						}
					}
				});	
			},
			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},
		}
	}
</script>