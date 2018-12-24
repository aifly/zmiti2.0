<template>
	<div class="symbin-adminuser-ui">
		<div class="symbin-admin-count">
			<div class="symbin-console-title">
				<Row>
					<Col span="6">
						<h5>系统管理员管理</h5>
					</Col>
					<Col span="12" offset="6" class-name="text-rig">
						<Button type="primary" @click="addUser=true">创建管理员</Button>
						<Button><Icon type="loop"></Icon>刷新</Button>
					</Col>
				</Row>
			</div>
			<div class="symbin-console-view">
				<div class="search-username top20">
					<Row>
						<Col span="3">
							<Select v-model="selectUser">
								 <Option :key='item.value' v-for="item in userSelect" :value="item.value">{{item.label}}</Option>
							</Select>
						</Col>
						<Col span="8">
							<Input v-model="mark" placeholder="请录入相关信息" style="margin-left:8px;"></Input>
						</Col>
						<Col span="4">
							 <Button type="primary" icon="ios-search" style="margin-left:16px;">Search</Button>
						</Col>
					</Row>
				</div>
				<div class="user-list top10">
					<Table :Columns="userListColums" :data="userListdate"></Table>
				</div>
				<div class="top10">
					<Page :total="100" show-sizer></Page>
				</div>
			</div>
		</div>
		<Modal v-model="addUser" title="新增管理员" @on-ok="ok" ok-text="确认" cancel-text="取消" @on-cancel="cancel" class-name="adduser-cls" :loading='isLoading'>
			<div class="addUser-body">
				<Form ref="formAdmin" :model="formAdmin" :rules="adminForm" inline>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span class="text-danger">*</span><span>登录名:</span>
						</Col>
						<Col span="12"><FormItem prop="username"><Input v-model="formAdmin.username" placeholder="请录入用户名"></Input></FormItem></Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span class="text-danger">*</span><span>昵称:</span>
						</Col>
						<Col span="12"><FormItem prop="nickname"><Input v-model="formAdmin.nickname" placeholder="您期望的显示名"></Input></FormItem></Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span class="text-danger">*</span><span>登录密码:</span>
						</Col>
						<Col span="12"><FormItem prop="userpwd"><Input v-model="formAdmin.userpwd" placeholder="您的登录密码" type="password"></Input></FormItem></Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span class="text-danger">*</span><span>手机号:</span>
						</Col>
						<Col span="12"><FormItem prop="adminmobile"><Input v-model="formAdmin.adminmobile" placeholder="您的手机号"></Input></FormItem></Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span>真实姓名:</span>
						</Col>
						<Col span="12"><FormItem prop="realname"><Input v-model="formAdmin.realname" placeholder="真实姓名"></Input></FormItem></Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span>性别:</span>
						</Col>
						<Col span="12">
						<FormItem prop="sex">
							<RadioGroup v-model="formAdmin.sex">
								<Radio label="">
									<span>男</span>
								</Radio>
								<Radio label="android">
									<span>女</span>
								</Radio>
							</RadioGroup>
						</FormItem>
						</Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span>邮箱:</span>
						</Col>
						<Col span="12"><FormItem prop="adminemail"><Input v-model="formAdmin.adminemail" placeholder="邮箱"></Input></FormItem></Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top8 rig8">
							<span>备注:</span>
						</Col>
						<Col span="12"><FormItem prop="admincomment"><Input v-model="formAdmin.admincomment" placeholder="备注信息" type="textarea"></Input></FormItem></Col>
					</Row>
					<Row align="middle" justify="center">
						<Col span="3" offset="4" class-name="text-rig top7 rig8">
							<span class="text-danger">*</span><span>用户角色:</span>
						</Col>
						<Col span="12">
							<FormItem prop="admincomment">
								<CheckboxGroup v-model="formAdmin.roleids">
									<Checkbox label="角色1" ></Checkbox>
									<Checkbox label="角色2" ></Checkbox>
									<Checkbox label="角色3"></Checkbox>
								</CheckboxGroup>
							</FormItem>
						</Col>
					</Row>
				</Form>
			</div>
		</Modal>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';

	import $ from 'jquery';

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				userSelect:[
					{
						value:'username',
						label:"用户名"

					},
					{
						value:'realname',
						label:'真实姓名'
					},
					{
						value:'nickname',
						label:'昵称'
					},
					{
						value:'adminmobile',
						label:'手机号'
					}
				],
				mark:'',
				selectUser:'',
				addUser:true,
				isLoading:true,
				formAdmin:{
					username:'',
					userpwd:'',
					roleids:[],
					nickname:'',

				},
				adminForm:{
                    username: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    userpwd:[
                    	{ required: true, message: '用户密码不能为空', trigger: 'blur' }
                    ],
                    roleids:[
                    	{ required: true, message: '请设置用户角色', trigger: 'blur' }
                    ],
                    nickname:[
                    	{ required: true, message: '请设置用户昵称', trigger: 'blur' }
                    ]
				},
				userListColums:[
					{
						title:"ID号",
						key:"id",
						width:10
					},
					{
						title:"用户名",
						key:"username"
					},
					{
						title:"昵称/姓名",
						key:"nick-realname"
					},
					{
						title:"性别",
						key:"sex",
					},
					{
						title:"手机号",
						key:"adminmobile"
					},
					{
						title:"邮箱",
						key:"adminemail"
					},
					{
						title:"操作",
						key:"getedit"
					},

				],
				userListdate:[],

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		
		methods:{
			ok(){
				console.log("ok");
				this.$refs['formAdmin'].validate((valid)=>{

					if(valid){
						this.insertData();
						this.isLoading = false;
					}
					else{
						this.isLoading = false;
					}
				})
			},
			cancel(){
				console.log("cancel");
				this.isLoading = false;
			},
			insertData(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/addadminuser",
					validate:s.validateData,
					data:{
						username:s.formAdmin.username,
						userpwd:s.formAdmin.userpwd,
						roleids:s.formAdmin.roleids,
						realname:s.formAdmin.realname,
						sex:s.formAdmin.sex,
						adminmobile:s.formAdmin.adminmobile,
						adminemail:s.formAdmin.adminemail,
						nickname:s.formAdmin.nickname,
						admincomment:s.formAdmin.admincomment,

					},
					fn(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
						}
						else{
							s.$Message.error({
								content:data.getmsg,
								duration: 10
							});
						}
					}
				})	
			}
		},
		mounted(){
			
		}
	}
</script>
 