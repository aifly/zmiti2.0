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
						<header>{{formProject.userid?'修改人员':'新增人员'}}
						</header>
						<Form :model="formProject" label-position="left" :label-width="100">
							<FormItem label="用户名：" prop='username'>
								<Input v-model="formProject.username"></Input>
							</FormItem>
							<FormItem label="密码：" prop='userpwd' v-if="currentClassId===-1">
								<Input v-model="formProject.userpwd"></Input>
							</FormItem>
							<FormItem label="姓名：" prop='realname'>
								<Input v-model="formProject.realname"></Input>
							</FormItem>
							<FormItem label="性别：" prop='sex'>
					            <RadioGroup v-model="formProject.sex">
					                <Radio :label="1">男</Radio>
					                <Radio :label="0">女</Radio>
					            </RadioGroup>
					        </FormItem>
							<FormItem label="手机号：" prop='usermobile'>
								<Input v-model="formProject.usermobile"></Input>
							</FormItem>
							<FormItem label="账号使用标识：" prop='isover'>
								<RadioGroup v-model="formProject.isover">
									<Radio :label="0">使用</Radio>
									<Radio :label="1">禁止</Radio>
					            </RadioGroup>
							</FormItem>
							<FormItem label="账号类型：" prop='usersign'>
					            <RadioGroup v-model="formProject.usersign">
					            	<Radio :label="2">普通用户</Radio>
					                <Radio :label="1">单位管理员</Radio>					                
					            </RadioGroup>
					        </FormItem>
						</Form>
						<div class='zmiti-taskmgruserlist-form-item zmiti-taskmgruserlist-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='projectAction'>{{formProject.userid?'保存':'确定'}}</Button>
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
				formProject:{
				},
				managerUserList:[],
				columns:[
					{
						title:"用户名",
						key:'username',
						align:'center',
						width:180
					},
					{
						title:"姓名",
						key:'realname',
						align:'center',
						width:180
					},
/*					{
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
					},*/
					{
						title:"电话",
						key:'usermobile',
						align:'center',
						width:200,
						render:(h,params)=>{
							return h('div',[
								h('span',{
									props:{
										type:'text'
									}
								},params.row.usermobile!='undefined'?params.row.usermobile:"无")
							])
						}
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
										background:'#cccccc',
										color:'#fff',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'

                                    },
                                    on: {
                                        click: () => {
											var s = this;
											s.openpassword();
											s.formProject.userid = params.row.companyuserid;
                                        }
                                    }
                                }, '修改密码'),                            
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
											s.formProject.userid = params.row.companyuserid;
											s.currentClassId = params.row._index;
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
					sex:1,
					isover:0,
					usersign:2
				}

				
				console.log(this.formProject,'formProject.sex')
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
					realname:s.formProject.realname,
					sex:s.formProject.sex,
					usermobile:s.formProject.usermobile,
					isover:s.formProject.isover,
					usersign:s.formProject.usersign
				};
				if(s.formProject.companyuserid){
					url = window.config.taskSystemUrl+'company/updateuserinfo';
					params.userid = s.formProject.companyuserid;
					msg = '修改成功';
				}else{
					params.userpwd=s.formProject.userpwd
				}
				zmitiCompanyUtil.ajax({
					url,
					data:params,
					success(data){
						if(data.getret === 0){
							s.getuserList();
							if(!s.formProject.companyuserid){
								s.formProject = {};
							}
							s.$Message.success(msg);
						}else{
							s.$Message.success(s.formProject.companyuserid? '修改失败':'添加失败');
						}
					}
				});	
			},
			openpassword () {
				var s = this;
                this.$Modal.confirm({
                	title:'修改密码',
                    render: (h) => {
                        return h('Input', {
                            props: {
                                value: s.formProject.userpwd,
                                autofocus: true,
                                placeholder: 'Please enter your name...'
                            },
                            on: {
                                input: (val) => {
                                    s.formProject.userpwd = val;
                                }
                            }
                        })
                    },
                    onOk:()=>{
                    	if(s.formProject.userpwd==undefined){                		
                    		this.$Message.error('密码不能为空');                    		
                    	}else{
                    		s.updatepassword(); 
                    	}                    	
                    }
                })
            },
            updatepassword(){
            	var s = this;
            	zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/updateuserpwd',
					data:{
						userid:s.formProject.userid,
						userpwd:s.formProject.userpwd
					},
					success(data){
						
						if(data.getret === 0){
							//console.log(data,'密码修改成功');
							s.$Message.success('密码修改成功!');
							s.formProject={

							}
						}
					}
				})
            },
			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},
		}
	}
</script>