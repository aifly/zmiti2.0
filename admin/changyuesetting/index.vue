<template>
	<div class="zmiti-cy-setting-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>畅阅</div>
				<div>
					<Button type="primary" @click="addAdmin">新增CMS</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-user-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total" @getSelection='getSelection'>
					<div slot='table-btns' style="display:inline-block">
						<Poptip
							confirm
							title="确定要删除吗?"
							@on-ok='selectionDelete'
							>
							<Button type='error' size='small'>删除</Button>
							
						</Poptip>
						<Button size='small' type='warning'>禁用</Button>
					</div>
				</ZmitiTable>
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

						<h2 style="height:40px;"></h2>
					
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
							<FormItem label="CMS名称：">
								<Input v-model="formObj.cmsname"  placeholder="CMS名称：" />
							</FormItem>
							<FormItem label="CMS简介：">
								<Input v-model="formObj.content" type='textarea' placeholder="CMS简介：" />
							</FormItem>
							<FormItem label="版本号：">
								<Input v-model="formObj.version" placeholder="版本号：" />
							</FormItem>
							<FormItem label="状态：">
								<RadioGroup v-model="formObj.status">
									<Radio :value='1' :label="1">正常使用</Radio>
									<Radio :value='0' :label="0">禁用</Radio>
								</RadioGroup>
							</FormItem>
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formObj.cmsid?'保存':'确定'}}</Button>
						</div>
						<template v-if='formObj.userid && false'>
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
	import ZmitiTable from '../../common/table';
	var {companyActions,adminActions} = zmitiUtil;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				targetKeys:[],
				showAvatarModal:false,
				visible:false,
				loading:true,
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
				isLoading:true,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formObj:{
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
						title:"CMS名称",
						key:'cmsname',
						align:'center',
					},
					{
						title:"版本",
						key:'version',
						align:'center',
						width:200
						
					},{
						title:"创建时间",
						key:'createtime',
						align:'center',
						width:160
						
					},{
						title:"状态",
						key:'status',
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
											s.formObj = params.row;
											Vue.obserable.trigger({type:'toggleMask',data:true});
										
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'
									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.cmsid);
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
				
				formObj:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				 
				directoryList:{

				},
				total:0,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				selectList:[]
			}
		},
		components:{
			ZmitiMask,
			ZmitiTable
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
			change(){
				
			},
			getSelection(data){
				this.selectList = data;
			},
			selectionDelete(){
				if(this.selectList.length<=0){
					this.$Message.error({content:'您还未选择任何要删除的项',duration:5});
					return;
				}
				var cmsids = this.selectList.map(item=>{
					return item.cmsid;
				}).join(',');
				
				this.delete(cmsids);
			},

			addAdmin(){
				this.showDetail = true;
				this.adminuserId = '';
				this.formAdmin = {
					isover:0,
					avatar:'&#xe6a4;'
				};
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			closeMaskPage(){
				this.showDetailPage = -1;
			},
			addAdmin(){
				this.showDetail = true;
				this.adminuserId = '';
				this.formObj = {
					isover:0,
					avatar:'&#xe6a4;'
				};
				this.closeMask(true)	
			},

			closeMask(flag = false){
				Vue.obserable.trigger({type:'toggleMask',data:flag});
			},

			
			delete(cmsids){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delUser',
					data:{
						action:adminActions.delCMS.action,
						info:{
							cmsids
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.closeMask()
							
							s.getDataList();
							///s.dataSource = data.list;	 
						}
					}
				})
			},
			getDataList(){
				var s = this;
		
				var companyid = this.$route.params.companyid;
				this.condition.companyid = companyid;
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getCMSList',
						data:{//getUserListByCompanyId
							action:adminActions.getCMSList.action,
							condition:s.condition
						},
						success(data){
							s.loading = false;
							if(data.getret === 0){
								s.dataSource = data.list;
								s.total = data.total||data.list.length;
								resolve();
							}
						}
					})
				});
			},
			adminAction(){
				var s = this;
				var action = this.formObj.cmsid ? adminActions.editCMS.action: adminActions.addCMS.action;
				
				var info = {
					cmsname:s.formObj.cmsname,
					version:s.formObj.version,
					status:s.formObj.status,
					content:s.formObj.content,
				}

				if(this.formObj.cmsid){
					info.cmsid = this.formObj.cmsid;
				}

				zmitiUtil.adminAjax({
					remark:this.formObj.cmsid ?　'editCMS':'addCMS',
					data:{
						action,
						info
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							s.closeMask()
							s.getDataList();
						}
					}
				})
			},
		}
	}
</script>
 