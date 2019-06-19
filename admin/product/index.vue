<template>
	<div class="zmiti-user-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>产品管理</div>
				<div>
					<Button type="primary" @click="addAdmin">新增产品</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				产品编号：<Input placeholder="产品编号" style="width: auto" />
				产品简称：<Input placeholder="产品简称" style="width: auto" />
				<Button type='primary'>查询</Button>
			</section>
			
			<div class='zmiti-user-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-user-table' :class="{'active':showDetail}">
					<Table  :data='dataSrouce' :columns='columns'></Table>
				</div>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
			<div class='lt-full' v-show='showDetailPage'>
				<div class='zmiti-left-pannel' @click="showDetail = false" :style="{height:viewH+'px'}"></div>
				<transition name='detail'>
					<section class='zmiti-add-form zmiti-scroll' v-if='showDetail' >
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt=""  @click='showDetail = false' >
							<span>产品信息</span>
						</header>
						<div class='zmiti-user-avatar' @click="showAvatarModal = true">
							<span class='zmt_iconfont' v-html='formObj.icon'></span>
							<label>更换头像</label>
						</div>
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="120">
							<FormItem label="产品名：">
								<Input v-model="formObj.productname"  placeholder="产品名：" />
							</FormItem>
							<FormItem label="产品介绍：">
								<Input v-model="formObj.introduce" placeholder="产品介绍：" />
							</FormItem>
							<FormItem label="链接：">
								<Input v-model="formObj.producturl" placeholder="链接：" />
							</FormItem>
						 
						</Form>
						
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='action'>{{formObj.productid?'保存':'确定'}}</Button>
						</div>
						
					</section>
				</transition>
			</div>

		<Avatar v-model="showAvatarModal" :avatar='formObj.icon' @getAvatar='getAvatar'></Avatar>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import Avatar from '../../common/avatar';

	var {adminActions,companyActions } = zmitiUtil;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				tabIndex:[0,-1],
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
				showDetailPage:false,
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
				dataSrouce:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				columns:[
					{
						title:"产品名称",
						key:'productname',
						align:'center'
						
					},
					{
						title:"产品简称",
						key:'introduce',
						align:'center'
						
					},
					{
						title:'操作',
						key:'action',
						align:'center',
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
                                        }
                                    }
                                }, '详情'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？"
									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.productid);
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
					 
				},
				 
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{}
			}
		},
		components:{
			Avatar
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
					this.showDetailPage = true;
				}else{
					setTimeout(() => {
						this.showDetailPage = false;
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
		 
			 
			getAvatar(avatar){
				this.formObj.icon = avatar;
			},
			initPassword(){//初始化密码
				var {$Message} = this;
				zmitiUtil.adminAjax({
					data:{
						action:companyActions.modifyAdminPassword.action,
						adminuserid:this.formObj.adminuserid,
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
				this.formObj = {
					isover:0,
					avatar:'&#xe6a4;'
				};
			},

			delete(productids){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delProduct',
					data:{
						action:adminActions.delProduct.action,
						condition:{
							productids
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSrouce = data.list;	 
						}
					}
				})
			},
			getDataList(){
				var s = this;
				if(typeof window.Promise !== 'function'){
					console.log('当前浏览器不支持Promise');
					return;
				}
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getProductList',
						data:{
							action:adminActions.getProductList.action,
							condition:this.condition
						},
						success(data){
							if(data.getret === 0){
								s.dataSrouce = data.list;	 
								resolve();
							}
						}
					})
				});
			},
			action(){
				var s = this;
				var action = this.formObj.productid ? adminActions.editProduct.action:adminActions.addProduct.action;
				
				zmitiUtil.adminAjax({
					remark:this.formObj.productid ?　'editUser':'addUser',
					data:{
						action,
						info:this.formObj
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							s.getDataList();
						}
					}
				})
			},
		}
	}
</script>
 