<template>
	<div class="zmiti-user-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>产品授权</div>
				<div>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-user-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-user-table' :class="{'active':showDetail}">
					<Table @on-expand='expand'  :data='dataSource' :columns='columns'></Table>
				</div>
			</div>
		</div>
			<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
				<div slot='mask-content' name='detail'>
					<section class='zmiti-add-form zmiti-scroll' v-if='showDetail' >
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt=""  @click='closeMaskPage' >
							<span>{{formUser.powerid?'编辑授权':"添加授权"}}</span>
						</header>
						<div class='zmiti-user-avatar' style='opacity:0' >
							<span class='zmt_iconfont' v-html='formUser.avatar'></span>
							<label>更换头像</label>
						</div>
						<Form class='zmiti-add-form-C' :model="formUser" :rules="ruleValidate" :label-width="120">
							<FormItem label="产品列表：">
								<Select v-model="formUser.productid">
									<Option v-for="item in productList" :value="item.productid" :key="item.powerid">{{ item.productname }}</Option>
								</Select>
							</FormItem>
							 <FormItem label="开始时间：" prop='startdate'>
								<DatePicker format='yyyy-MM-dd' v-model="formUser.startdate" type="date" placeholder="开始时间：" style="width:100%" ></DatePicker>
							</FormItem>
							 <FormItem label="结束时间：" prop='enddate'>
								<DatePicker  format='yyyy-MM-dd' v-model="formUser.enddate" type="date" placeholder="结束时间：" style="width:100%"></DatePicker>
							</FormItem>
							<FormItem label="状态：">
								<RadioGroup v-model="formUser.status">
									<Radio :value='0' :label="0">禁用</Radio>
									<Radio :value='1' :label="1">正常使用</Radio>
								</RadioGroup>
							</FormItem>
							 <FormItem label="备注：">
								<Input v-model="formUser.remarks" placeholder="备注：" type='textarea'/>
							</FormItem>
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formUser.powerid?'确定':"保存"}}</Button>
						</div>
						<template v-if='formUser.userid && false'>
							<header class='zmiti-add-header zmiti-safe-bar'>
								<span>安全信息</span>
							</header>
							<div class='zmiti-safe-content'>
								<div>密码初始化</div>
								<div>点击右侧初始化按钮，系统将会把密码初始化为：123456。首次登录需更新密码</div>
								<div>
									<Poptip
										confirm
										title="确定要初始化吗?"
										@on-ok="initPassword"
										>
										<span>初始化</span>
									</Poptip>
								</div>
							</div>
						</template>
					</section>
				</div>
			</ZmitiMask>

		<Modal title='加入单位' v-model="visible">
			<div>
				 <Transfer
					:data="unJoinedCompany"
					:titles="['单位列表','当前加入的单位']"
					:target-keys="targetKeys"
					filterable
					:filter-method="filterMethod"
					@on-change="handleChange2">
				</Transfer>
			</div>
		</Modal>
 
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import ZmitiMask from '../../common/mask/';
	import Role from './role';
	var {companyActions,zmitiActions,adminActions,formatDate,dataToNumber} = zmitiUtil;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				
				targetKeys:[],
				showAvatarModal:false,
				visible:false,
				avatarList:[
					'&#xe6a5;',
					'&#xe6a4;',
					'&#xe6a3;',
					'&#xe6a2;',
					'&#xe6a0;'
				],
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formUser:{
					status:1,
					usersign:1,
					usertypesign:1,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],
				columns:[
					{
						type: 'expand',
						title:'展开',
                        width: 60,
                        render: (h, params) => {
                            return h(Role, {
                                props: {
                                    dataSource:params.row.dataSource||[]
								},
								on:{
									openMask:(data)=>{
										var s = this;
										s.showDetail = true;

										var data1 = JSON.parse(JSON.stringify(data));
										data.startdate = new Date(data.startdate)
										data.enddate = new Date(data.enddate)
										s.formUser = data;// JSON.parse(JSON.stringify(data));

										Vue.obserable.trigger({type:'toggleMask',data:true});
									}
								}
                            },"aaa")
                        }
                    },
					{
						title:"单位名称",
						key:'companyname',
						align:'center',
					},
					{
						title:"单位地址",
						key:'companyaddress',
						align:'center',
						width:200
						
					},{
						title:"联系电话",
						key:'companyphone',
						align:'center'
						
					},{
						title:"状态",
						key:'isover',
						align:'center',
						
						render:(h,params)=>{
							return h('div',{},params.row.status === 1 ? '正常使用' : params.row.status === 0 ? '已禁用':'已删除');
						}
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
								 h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 10px',
										border:'none',
										fontSize: '12px',
										cursor:'pointer',
										color:'#06C'

                                    },
                                    on: {
                                        click: () => {
											var s = this;
											s.showDetail = true;
											s.formUser = params.row;
											Vue.obserable.trigger({type:'toggleMask',data:true});
										
                                        }
                                    }
                                }, '新增授权')
                                
                            ]);
							
							 
						}
					}
				],
				
				formUser:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},

				ruleValidate:{
					startdate: [
                        { required: true, type:'date', message: '开始时间不为能空', trigger: 'blur' }
					],
					enddate: [
                        { required: true,type:'date', message: '结束时间不为能空', trigger: 'blur' }
                    ],
				},
				 
				directoryList:{

				},
				productList:[],
				powerList:[],
				condition:{
					page_index:0,
					page_size:10,
				},
				powerListCondition:{
					page_index:0,
					page_size:10
				},
				userinfo:{}
			}
		},
		components:{
			ZmitiMask
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getDataList();
		},

		watch:{
			

			showDetail(val){
				if(val){
					Vue.obserable.trigger({type:'toggleMask',data:true});
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			},
			$route:{
				deep:true,
				handler(){
					
					this.getDataList()
				}
			}
			
		},
		
		methods:{


		 

			expand(row,status){
				 
			},

			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
			handleChange2(ids,index,companyids){
				var s = this;
				companyids.forEach((companyid,i)=>{
					zmitiUtil.adminAjax({
						remark:index === 'left'?"exitCompany":"joinCompany",
						data:{
							action:companyActions[index === 'left'?"exitCompany":"joinCompany"].action,
							userid:s.currentUserid,
							companyid
						},
						success(data){
							s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg);
							s.getJoinedCompany();
						}
					});
				})

			},
			filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getJoinedCompany(){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'getJoinedCompany',
					data:{
						action:companyActions.getJoinedCompany.action,
						condition:{
							userid:s.currentUserid,
							page_index:0,
							page_size:20,
						}
					},
					success(data){
						if(data.getret === 0){
							s.targetKeys = [];
							data.list.forEach(dt=>{
								s.targetKeys .push(dt.companyid)
							})
						}
					}
				});
			},
			 
			getCompanyList(){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'getCompanyList',
					data:{
						action:companyActions.getCompanyList.action,
						condition:{
							page_index:0,
							page_size:100
						}
					},
					success(data){
						if(data.getret === 0){
							s.companyList = data.list;
							s.unJoinedCompany = [];
							s.companyList.forEach(dt=>{
								if(dt.companyid === s.$route.params.companyid){
									s.companyname = dt.companyname;
								}
								s.unJoinedCompany .push({
									key : dt.companyid,
									label:dt.companyname,
									description:dt.companyname,
								})

							})
						}
					}
				})
				
			},
			checkUser(){
				var username = this.formUser.username;
				var {$Message} = this;
				zmitiUtil.adminAjax({
					remark:'checkUserName',
					data:{
						action:zmitiActions.checkUserName.action,
						username
					},
					success(data){
						$Message[data.getret === 0 ? data.used  ? 'error':'success':'error'](data.msg);
					}
				})
			},
			getAvatar(avatar){
				this.formUser.avatar = avatar;
			},
			initPassword(){//初始化密码
				var {$Message} = this;
				zmitiUtil.adminAjax({
					data:{
						action:companyActions.modifyAdminPassword.action,
						adminuserid:this.formUser.adminuserid,
						adminpwd:window.config.defaultPass
					},
					success(data){
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
						}
					}
				});
			},
			addAdmin(){

				this.showDetail = true;
				this.adminuserId = '';
				this.formUser = {
					isover:0,
					avatar:'&#xe6a4;'
				};
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			delete(userid){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delUser',
					data:{
						action:companyActions.delUser.action,
						userid
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSource = data.list;	 
						}
					}
				})
			},
			getDataList(){
				var s = this;

				zmitiUtil.adminAjax({
					remark:'getProductList',
					data:{
						action:adminActions.getProductList.action,
						condition:this.condition
					},
					success(data){
						if(data.getret === 0){
							s.productList = data.list;	 
						}
					}
				})
				var p1 = new Promise((resolve,reject)=>{
					zmitiUtil.getProductListByAdmin({
						condition:{
							page_index:0,
							page_size:10,
						},
						success:(data)=>{
							if(data.getret === 0){
								s.dataSource = data.list;	 
								resolve();
								console.log(s.dataSource,'dataSource')
							}
						}
					})
				});

				var p2 = new Promise((resolve,reject)=>{
				var condition = Object.assign(this.powerListCondition,{})
					zmitiUtil.adminAjax({
						remark:'getProductPowerList',
						data:{
							action:adminActions.getProductPowerList.action,
							condition
						},
						success(data){
							if(data.getret === 0 ){
								s.powerList = data.list;
								resolve();
								
							}
							 
							
						}
					})
				});

				Promise.all([p1,p2]).then(()=>{
					s.dataSource.forEach(data=>{
						data.dataSource = data.dataSource || [];
						s.powerList.forEach(power=>{
							if(data.companyid === power.companyid){
								data.dataSource.push(power);
							}
						})
					});
					s.dataSource = s.dataSource.concat([]);
				});



			},
			adminAction(){
				var s = this;
				var remark = this.formUser.powerid?'editProductPower':'addProductPower';
				var action = adminActions[remark]['action'];

				if(!this.formUser.startdate||!this.formUser.enddate){
					return;
				}
				var startdate = dataToNumber(this.formUser.startdate),
					enddate = dataToNumber(this.formUser.enddate);

			 	var info = {
					 productid:s.formUser.productid,
					 companyid:s.formUser.companyid,
					 startdate,
					 enddate,
					 status:s.formUser.status,
					 remarks:s.formUser.remarks
				 }
				 if(this.formUser.powerid){
					 info.powerid = this.formUser.powerid;
				 }

				 if(startdate>=enddate){
					 this.$Message.error('开始时间不能大于结束时间');
					 return;
				 }


				zmitiUtil.adminAjax({
					remark,
					data:{
						action,
						info
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							Vue.obserable.trigger({type:'toggleMask',data:false});
							s.getDataList();
						}
					}
				})
			},
		}
	}
</script>
 