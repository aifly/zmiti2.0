<template>
	<div class="symbin-role-ui">
		<div class="symbin-admin-count">
			<div class="symbin-console-title">
				<Row>
					<Col span="6">
						<h5>角色管理</h5>
					</Col>
					<Col span="12" offset="6" class-name="text-rig">
						<Button type="primary" @click="addRole=true">创建新角色</Button>
						<Button @click="bingAgain();"><Icon type="loop"></Icon>刷新</Button>
					</Col>
				</Row>
			</div>
			<div class="symbin-console-view">
				<div class="search-username top20">
					<Table :columns="roleListColums" :data="roleListdata"></Table>
				</div>
			</div>
			<!--弹窗样式-->
				<Modal v-model="addRole" title="新增角色" @on-ok="ok" ok-text="确认" cancel-text="取消" @on-cancel="cancel" :loading='isLoading'>
					<div class="addColumn-body">
						<Form ref="formRole" :model="formRole" :rules="ruleForm" inline>
							<Row align="middle" justify="center">
								<Col span="3" offset="4" class-name="text-rig top7 rig8">
									<span class="text-danger">*</span><span>角色名称:</span>
								</Col>
								<Col span="12">
									<FormItem prop="rolename"><Input v-model="formRole.rolename" placeholder="请录入角色名称"></Input></FormItem>
								</Col>
							</Row>
							<Row align="middle" justify="center">
								<Col span="3" offset="4" class-name="text-rig top7 rig8">
									<span>英文名称:</span>
								</Col>
								<Col span="12"><FormItem prop="roleename"><Input v-model="formRole.roleename" placeholder="请录入英文名称"></Input></FormItem></Col>
							</Row>
							<Row align="middle" justify="center">
								<Col span="3" offset="4" class-name="text-rig top7 rig8">
									<span>是否默认:</span>
								</Col>
								<Col span="12">
							       <FormItem prop="defaultRole"><Checkbox v-model="formRole.defaultRole" value="0" true-value="0" false-value="1">默认角色</Checkbox></FormItem>
								</Col>
							</Row>
							<Row align="middle" justify="center">
								<Col span="3" offset="4" class-name="text-rig top7 rig8">
									<span class="text-danger">*</span><span>权限设置:</span>
								</Col>
								<Col span="12">
							       <FormItem prop="actionids"><Checkbox v-model="formRole.actionids" value="0" true-value="0" false-value="1">默认权限</Checkbox></FormItem>
								</Col>
							</Row>
						</Form>
					</div>
				</Modal>
				<!--弹窗样式结束-->
		</div>
	</div>

</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	//import symbinTable from './symbintable.vue';
	export default {
		props:[],
		name:'zmitiindex',

		data(){
			return {
				addRole:true,
				isLoading:true,
				roleListdata:[],
				roleListColums:[
					{
                        title: '序号',
                        key: 'index',
                        width:80,
                    },
                    {
                        title: '角色名称',
                        key: 'rolename'
                    },
                    {
                        title: '默认',
                        key: 'isdefault',
                        width:80
                    },
                    {
                        title: '状态',
                        key: 'status',
                        width:80
                    },
                    {
                    	title:'说明',
                    	key:'comment'
                    },
                    {
                    	title:'操作',
                    	key:"action",
                    	width:120,
						render:(h,params)=>{
							return h('div',[
								h('Button',{
									props: {
                        				type: 'text',
                      				},
									on:{
										click:()=>{
										this.edit(params.index,1)
									}
								}

							},'编辑'),
							h('Button',{
								props:{
								type:"text",
							},
							on:{
								click:()=>{
									//console.log(params.row.menuid);
									_this.remove(params.row.menuid,1)
								}
							}

							},'删除')]);
						}
                    }
				],
				formRole: {
                    rolename: '',
                    actionids:'',
                },
                ruleForm: {
                    rolename: [
                        { required: true, message: '角色名称不能为空或已有重名！', trigger: 'blur' }
                    ],
                    actionids:[
                    	{ required: true, message: '权限不能为空', trigger: 'blur' }
                    ]
                }
			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);

		},
		methods:{
			ok(){
				
				this.isLoading = true;
				this.$refs['formRole'].validate((valid)=>{

					if(valid){
						this.insertRole();
						this.isLoading = false;
					}
					else{
						this.isLoading = false;
					}
				})
			},
			cancel(){
			
			},
			bingAgain(){
			
			},
			getRolelist(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getrolelist",
					validate:s.validateData,
					data:{

					},
					fn(data){
						//console.log(data);
						if(data.getret === 0){
							s.roleListdata=data.list
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
			},
			insertRole(){
				var s = this;
				//console.log(s.formRole.defaultRole);
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/addrole",
					validate:s.validateData,
					data:{
						rolename:s.formRole.rolename,
						roleename:s.formRole.roleename,
						isdefault:s.formRole.defaultRole,
						actionids:s.formRole.actionids,
					},
					fn(data){
						//console.log(data);
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
		mounted(){//页面加载完成后显示

			var obserable = Vue.obserable;

			this.getRolelist();
			
		},
	}
</script>
 