<template>
	<div class="zmiti-user-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>畅阅</div>
				<div>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-user-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-user-table' :class="{'active':showDetail}">
					<Table :loading='loading' :data='dataSource' :columns='columns'></Table>
				</div>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
			<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
				<div slot='mask-content' name='detail'>
					<section class='zmiti-add-form zmiti-scroll' v-if='showDetail' >
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt=""  @click='showDetail = false' >
							<span>基础信息</span>
						</header>
						<div class='zmiti-user-avatar' @click="showAvatarModal = true">
							<span class='zmt_iconfont' v-html='formUser.avatar'></span>
							<label>更换头像</label>
						</div>
						<Form class='zmiti-add-form-C' :model="formUser" :label-width="120">
							<FormItem label="用户名：">
								<Input v-model="formUser.username" @on-blur="checkUser" placeholder="用户名：" />
							</FormItem>
							<FormItem label="姓名：">
								<Input v-model="formUser.realname" placeholder="姓名：" />
							</FormItem>
							<FormItem label="密码：">
								<Input v-model="formUser.userpwd" type="password" placeholder="密码：" />
							</FormItem>
							<FormItem label="所在单位：" v-if='!$route.params.companyid'>
								<Select v-model="formUser.companyid">
									<Option v-for="item in companyList" :value="item.companyid" :key="item.companyid">{{ item.companyname }}</Option>
								</Select>
							</FormItem>

							<FormItem label="邮箱：">
								<Input v-model="formUser.useremail" placeholder="邮箱：" />
							</FormItem>
							<FormItem label="手机号：">
								<Input v-model="formUser.usermobile" placeholder="手机号：" />
							</FormItem>
							
							<FormItem label="用户类型：">
								<RadioGroup v-model="formUser.usertypesign">
									<Radio :value='1' :label="1">普通用户</Radio>
									<Radio :value='2' :label="2">公司管理员</Radio>
								</RadioGroup>
							</FormItem>

							<FormItem label="状态：">
								<RadioGroup v-model="formUser.isover">
									<Radio :value='0' :label="0">禁用</Radio>
									<Radio :value='1' :label="1">正常使用</Radio>
								</RadioGroup>
							</FormItem>
							<FormItem label="用户归属：">
								<RadioGroup v-model="formUser.usersign">
									<Radio :value='1' :label="1">本地</Radio>
									<Radio :value='2' :label="2">微信</Radio>
									<Radio :value='3' :label="3">QQ</Radio>
								</RadioGroup>
							</FormItem>
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' >{{formUser.userid?'保存':'确定'}}</Button>
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
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import ZmitiMask from '../../common/mask/';

	var {companyActions,zmitiActions,changYueAcions} = zmitiUtil;

	import {manuscriptStatus} from '../../common/config';

	

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				
				targetKeys:[],
				showAvatarModal:false,
				
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				loading:true,
				currentUserid:'',
				formUser:{
					isover:0,
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
						title:"稿件编号",
						key:'manuscriptid',
						align:'center',
					},
					{
						title:"稿件标题",
						key:'doctitle',
						align:'center',
					},
					{
						title:"提交时间",
						key:'createtime',
						align:'center'
					},
					{
						title:'审核人',
						key:'status',
						width:220,
						render:(h,params)=>{
							  
							return h('div',(params.row.checkuserlist||[])['map']((c,i)=>{
								return h('span',{
									style:{
										marginRight:'5px'
									},
									on:{
										click:()=>{
											console.log(c);
											this.$Modal.info({
												title:c.realname + '的审核意见 —— ' + manuscriptStatus[c.status].name,
												content:'<p>审核意见：</p>' + (c.suggestion || '暂无 ：('),
												okText: '确定',
												closable:true,
												cancelText: '取消'

											});
										}
									},
									domProps:{
										innerHTML:`
											<label>${c.realname}</label>
											<label title='${manuscriptStatus[c.status].name}' class='zmiti-cy-tag zmt_iconfont' style='color:${manuscriptStatus[c.status].color}'>
												${manuscriptStatus[c.status].icon}
											</label>
										`
									}
								});
							}));
						}
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'

									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.manuscriptid);
										},
										
									}
								},[
									h('span', {
										props: {
											type: 'error',
											size: 'small'
										},
										style:{
											cursor:'pointer',
											color:'#06C'
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
				
				formUser:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				 
				directoryList:{

				},
				condition:{
					page_index:0,
					page_size:10,
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

			this.getDataList();

			
			
		},

		watch:{
			

			showDetail(val){
				if(val){
					this.showDetailPage = 1;
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

			closeMaskPage(){
				this.showDetailPage = -1;
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
							console.log(s.companyList);
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
				this.showDetailPage = 1;
			},

			delete(manuscriptids){
				var s = this;
				zmitiUtil.ajax({
					remark:'delManuscript',
					data:{
						action:changYueAcions.delManuscript.action,
						condition:{
							manuscriptids
						}
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
				var {condition} = this;
				condition = Object.assign(condition,{
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				})
				zmitiUtil.ajax({
					remark:"getMySubmitList",
					data:{
						action:changYueAcions.getMySubmitList.action,
						condition
					},
					success(data){
						s.loading = false;
						if(data.getret === 0){

							s.dataSource = data.list;
						}
					}
				})
			},
			
		}
	}
</script>
 