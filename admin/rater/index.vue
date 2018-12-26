<template>
	<div class="wm-rater-main-ui">
		<header>
			<div>评委管理</div>
			<section>
				<Button type="primary" icon='md-add-circle' @click="addRater">新增评委</Button>
			</section>
		</header>
		<Table ref='scorelist'  :height='viewH - 64- 70 ' :data='raterList' :columns='columns'   stripe></Table>
		<Modal
			v-model="visible"
			:title="currentRateid === -1? '新增评委':'编辑评委'"
			@on-ok="ok"
			@on-cancel="cancel">
			<Form ref="formAdmin" :model="formAdmin" :label-width="72" >
				<FormItem label="账号：" prop="ratername">
					<Input style="width:310px;" v-model="formAdmin.ratername" placeholder="账号" autocomplete="off" />
					<RadioGroup v-model="formAdmin.sex">
						<Radio :label="1">
							<span>男</span>
						</Radio>
						<Radio :label="0">
							<span>女</span>
						</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="密码：" prop="raterpwd">
					<Input ref='pass' :disabled='!showPass' v-model="formAdmin.raterpwd" placeholder="密码" autocomplete="off" />
					<Button :disabled='currentRateid === -1' type="primary" style="margin-top:10px" @click='modifyPass'>{{showPass?'确定修改':'修改密码'}}</Button>
				</FormItem>
				<FormItem label="昵称：" prop="nickname">
					<Input v-model="formAdmin.nickname" placeholder="昵称" autocomplete="off" />
				</FormItem>
				<FormItem label="电话：" prop="mobile">
					<Input v-model="formAdmin.mobile" placeholder="电话" autocomplete="off" />
				</FormItem>
			</Form>
		</Modal>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				visible:false,
				imgs:window.imgs,
				isLoading:false,
				split1: 0.8,
				showPass:false,
				viewH:window.innerHeight,
				currentRateid:-1,
				formAdmin:{
					raterpwd:'111111'
				},
				columns:[
					{
						title:"用户名",
						key:'ratername',
						align:'center',
					},
					{
						title:'姓别',
						key:'sex',
						align:'center',
						render:(h,params)=>{
							return h('div',{},params.row.sex === 1 ? '男':'女')
						}
					},
					{
						title:"昵称",
						key:'nickname',
						align:'center'
					},{
						title :'手机号',
						key:'mobile',
						align:'center'
					},{
						title:'操作',
						key:"action",
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
											this.currentRateid = params.row.userid;
											this.formAdmin = params.row;
											this.visible = true;
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗"
									},
									on:{
										'on-ok':()=>{
											this.delRater(params.row.raterid);
										},
										
									}
								},[
									h('Button', {
										props: {
											type: 'error',
											size: 'small',
										},
										on: {
											click: () => {
												
												//this.remove(params.index,params.row.employeeid)
											}
										}
									}, '删除')
								]),
                            ]);
						}
					}
				],
				raterList:[],
				
				userinfo:{}
			}
		},
		components:{
		},
		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');
			///this.validate = validate;
		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
			this.getRaterlist();
			
		},
		
		methods:{
			modifyPass(){
				if(!this.showPass){
					this.showPass = true;
					this.$refs['pass'].focus();
				}else{
					if(!this.formAdmin.raterpwd){
						this.$Message.error('密码不能为空');
						return;
					}
					var s = this;
					symbinUtil.ajax({
						_this:s,
						url:window.config.baseUrl+'/wmadadmin/updatereviewpwd',
						data:{
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername,
							raterid:s.formAdmin.raterid,
							raterpwd:s.formAdmin.raterpwd
						},
						success(data){
							s.$Message[data.getret === 0 ?'success':'error'](data.getmsg);
						}
					})
				}
			},
			addRater(){
				this.formAdmin = {
					raterpwd:'111111'
				}
				this.currentRateid = -1;
				this.visible = true;
			},
			getRaterlist(){
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/getreviewlist/',
					//validate:s.validate,
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername
					},success(data){
						
						if(data.getret === 0){
							s.raterList = data.list;
						}
						else{
							s.$Message.error(data.getmsg);
						}
					}
				})
			},
			delRater(raterid){
				
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/delreview/',
					validate:s.validate,
					data:{
						raterid,
						deltype:0,
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername
					},success(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
							s.getRaterlist();
						}
						else{
							s.$Message.error(data.getmsg);
						}
					}
				})
			},
			
			ok(){
				
				var s = this;
				if(s.currentRateid<=-1){
					symbinUtil.ajax({
						_this:s,
						url:window.config.baseUrl+'/wmadadmin/addreview/',
						validate:s.validate,
						data:{
							ratername:s.formAdmin.ratername,
							raterpwd:s.formAdmin.raterpwd,
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername
						},success(data){
							if(data.getret === 0){
								s.$Message.success(data.getmsg);
								s.getRaterlist();
							}
							else{
								s.$Message.error(data.getmsg);
							}
						}
	
					})
				}else{
					symbinUtil.ajax({
						_this:s,
						url:window.config.baseUrl+'/wmadadmin/editreview/',
						validate:s.validate,
						data:{
							ratername:s.formAdmin.ratername,
							nickname:s.formAdmin.nickname,
							mobile:s.formAdmin.mobile,
							raterid:s.currentRateid,
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername
						},success(data){
							if(data.getret === 0){
								s.$Message.success(data.getmsg);
							}
							else{
								s.$Message.error(data.getmsg);
							}
						}
	
					})
				}
			},
			cancel(){
				this.formUser = {};
			}
		}
	}
</script>