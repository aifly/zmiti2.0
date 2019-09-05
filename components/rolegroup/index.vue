<template>
	<div class="zmiti-rolegroup-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>权限组管理</div>
				<div>
					<Button type="primary" @click="addAdmin">新增权限组</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				权限组编号 <input type="text">
			</section>
			
			<div class='zmiti-rolegroup-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total"></ZmitiTable>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
			<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
				<div slot='mask-content'>
					<transition name='detail'>
						<section class='zmiti-add-form zmiti-scroll' v-if='showDetail' >
							<header class='zmiti-add-header'>
								<img :src="imgs.back" alt=""  @click='closeMaskPage' >
								<span>基础信息</span>
							</header>
							<h2 style='height:50px;'></h2>
							<Form class='zmiti-add-form-C' :model="formRoleGroup" :label-width="110">
								<FormItem label='权限组名称'>
									<Input v-model='formRoleGroup.title' placeholder="请输入产品组名称"/>
								</FormItem>
								<FormItem label="是否为默认：">
									<RadioGroup v-model="formRoleGroup.isdefault">
										<Radio :value='0' :label="0">是</Radio>
										<Radio :value='1' :label="1">否</Radio>
									</RadioGroup>
								</FormItem> 
								<FormItem label="actions列表：">
									
									<div class='zmiti-action-list' v-for='(item,i) of actions' :key='i'>
										<div class='zmiti-action-title'>{{(i+1 ) + '.' + item.name}}：</div>
										<div class='zmiti-action-content' >
											<div v-for='(action,k) of item.actions' :key='k' :class="{'active':formRoleGroup.actions&& formRoleGroup.actions.some(ac=> ac*1 === action.action*1)}" @click="toggleAction(action)" > 
												{{action.desc}}
											</div>
										</div>
									</div>
								</FormItem>
								<FormItem label="视图权限列表：">
									<div class='zmiti-action-list' v-for='(item,i) of pageRoles' :key='i'>
										<div class='zmiti-action-title' v-if='$route.name.indexOf(item.route)>-1'>{{(i + 1 ) + '、' + item.title}}：</div>
										<div class='zmiti-action-content' v-if='$route.name.indexOf(item.route)>-1'>
											<div v-for='(tab,k) of item.tabs.filter(item=> !item.children )' :key='k' :class="{'active':formRoleGroup.pages&& formRoleGroup.pages.some(ac=> ac === tab.link)}" @click="togglePages(tab)" > 
												{{tab.name}}
											</div>
											<template v-for='(tab) of item.tabs.filter(item=>item.children && $route.name.indexOf(item.route)>-1)'  :class="{'active':formRoleGroup.pages&& formRoleGroup.pages.some(ac=> ac === tab.link)}" @click="togglePages(tab)" >
												<div :class="{'active':formRoleGroup.pages&& formRoleGroup.pages.some(ac=> ac === child.link)}" @click="togglePages(child)" :key='child.link' v-for='(child) in tab.children'>
													{{child.name}}
												</div>
											</template>
										</div>
									</div>
								</FormItem>
							</Form>
							
							<div class='zmiti-add-form-item zmiti-add-btns'>
								<Button size='large' type='primary' @click='roleGroupAction'>{{formRoleGroup.groupid?'保存':'确定'}}</Button>
							</div>
						</section>
					</transition>
				</div>
			</ZmitiMask>
			 

		<Modal title='权限设置' v-model="visible" @on-ok='addUserForUserRoleGroup'>
			<ul class='zmiti-companyuser-list'>
				<li @click="chooseUser(user)" v-for='(user,i) in userList' :key="i" :class="{'active':currentUser.some(item=>{return item.user.userid === user.user.userid})}">
					{{user.user.realname||user.user.username}}
				</li>
			</ul>
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
	import ZmitiTable from '../../common/table';
	import menuObj from '../../common/group/menu';
	let {resourceActions,orderFoodActions,userActions,companyActions,tripActions,changYueAcions,infomanagerActions,partyActions} = zmitiUtil;
	var	actions = [
		{
			name:'畅阅',
			//id:"1946048392",
			actions:Object.values(changYueAcions),
			route:'changyue'
		},
		{
			//id:"8044104590",
			name:'出差宝',
			actions:Object.values(tripActions),
			route:'trip'
		},
		{
			//id:'7450479310',
			name:'食堂订餐',
			actions:Object.values(orderFoodActions),
			route:'orderfood'
		},{
			//id:'1072203850',
			name:"信息管理",
			actions:Object.values(infomanagerActions),
			route:'infomanager'
		},{
			//id:'8773475502',
			name:"活动管理",
			actions:Object.values(partyActions),
			route:'party'
		}
	];
	export default {
		props:['productid'],
		name:'zmitiindex',
		data(){
			return{
				actions,
				currentUser:[],
				tabIndex:[0,-1],
				visible:false,
				userList:[],
				imgs:window.imgs,
				loading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				formRoleGroup:{
					actions:[],
				},
				total:0,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
			
				columns:[
					{
						title:"权限组名称",
						key:'title',
						align:'center',
						width:200,
					},
					{
						title:"默认",
						key:'isdefault',
						align:'center',
						width:80,
						render:(h,params)=>{
							return h('div',{},params.row.isdefault?'否':"是");
						}
						
					},
					{
						title:"权限列表",
						key:'actions',
						render:(h,params)=> {
							
							return h('div',{},params.row.actions.map(item=>{
								var res = [];

							
								this.actions.filter(it=>{
									return this.$route.name.indexOf(it.route)>-1;
								}).forEach((ac)=>{
									ac.actions.forEach(a=>{
										if(a.action === item){
											res.push(h('span',{
												style:{
													display:'inline-block',
													border:'1px solid #f90',
													margin:'5px',
													border:'1px solid #ccc',
													lineHeight:'16px',
													height:'24px',
													padding:'4px',
													background:'#fff'
												}
											},a.desc));
											//res.push(a.desc);
										}
									})
								});
								return res;
							}));
						},
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
										margin: '2px 10px 2px 0',
										border:'none',
										fontSize: '12px',
										cursor:'pointer',
										color:'#06C'

                                    },
                                    on: {
                                        click: () => {
											this.visible = true;
											this.groupid = params.row.groupid;
											this.getUserRoleGroupUserList();
                                        }
                                    }
                                }, '用户管理'),
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
											
											s.formRoleGroup = params.row;
											console.log(s.formRoleGroup)
											!(s.formRoleGroup.pages instanceof Array )&&( s.formRoleGroup.pages =( s.formRoleGroup.pages||'').split(','));
											this.showDetail = true;
											Vue.obserable.trigger({
												type:'toggleMask',
												data:true
											})
											
											
                                        }
                                    }
                                }, '详情'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'
									},
									on:{
										'on-ok':()=>{
											this.delUserRoleGroup(params.row.groupid,params.index);
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
				
				formcompany:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				companyList:[],
				 
				directoryList:{

				},
				productList:[],
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				pageRoles:[]
			}
		},
		components:{
			ZmitiMask,
			ZmitiTable
		},
 
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getUserInfo();
			this.getGroupList();
			this.init(); 
			this.getUserList();
			
			for(var menu in menuObj){
				this.pageRoles.push({
					route:menuObj[menu].route,
					title:menuObj[menu].title,
					tabs:menuObj[menu].tabs
				})
			}
	
			
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
			}
			
		},
		
		methods:{
			addUserForUserRoleGroup(){
				var s = this;
				zmitiUtil.ajax({
					remark:'addUserForUserRoleGroup',
					data:{
						action:userActions.addUserForUserRoleGroup.action,
						groupid:s.groupid,
						users:s.currentUser.map(item=>{return item.user.userid})

					},
					success(data){
						console.log(data,'data');
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							//s.currentUser = data.list;
						}
					}
				})
			},
			getUserRoleGroupUserList(){
				var s = this;
				zmitiUtil.ajax({
					remark:'getUserRoleGroupUserList',
					data:{
						action:userActions.getUserRoleGroupUserList.action,
						condition:{
							page_size:100,
							page_index:0,
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.$route.params.id
						},

					},
					success(data){
						
						if(data.getret === 0){
							s.currentUser = data.list;
						}
					}
				})
			},
			chooseUser(user){
				
				if(this.currentUser.some((item)=>{
					return item.user.userid  === user.user.userid;
				})){
					this.currentUser.forEach((item,i)=>{
						if(item.user.userid === user.user.userid){
							this.currentUser.splice(i,1);
							
							item.id && this.delUserForUserRoleGroup(item.id);
						}
					})
				}
				else{
					this.currentUser.push(user);
				}
				this.$forceUpdate()
				 
			},
			delUserRoleGroup(id,index){
				var s = this;
				zmitiUtil.ajax({
					remark:'delUserRoleGroup',
					data:{
						action:userActions.delUserRoleGroup.action,
						id
					},
					success(data){
						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.dataSource.splice(index,1);
						}
					}
				})
			},
			delUserForUserRoleGroup(id){
				var s = this;
				zmitiUtil.ajax({
					remark:'delUserForUserRoleGroup',
					data:{
						action:userActions.delUserForUserRoleGroup.action,
						id
					},
					success(data){
						console.log(data,'data');
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
						}
					}
				})
			},
			getUserList(){
				var s = this;
				this.loading = true;
				var {condition} = this;
				condition = Object.assign(condition,{
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				})
				zmitiUtil.ajax({
					remark:"getCompanyUserList",
					data:{
						action:userActions.getCompanyUserList.action,
						condition
					},
					error(){
					} ,
					success(data){
						if(data.getret === 0){
							s.userList = data.list;
						}
					}
				})
			},
			change(e){
				this.condition.page_index = e -1;
				this.getGroupList();
			},
			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
		    
			filterAction(){
				this.actions = this.actions.filter(item=>{
					return this.$route.name.indexOf(item.route)>-1
				})
			},
			init(){
				this.t = setInterval(() => {
					if(Vue.productList){
						window.clearInterval(this.t);
						this.filterAction();
						this.productList = Vue.productList;
					}

				}, 100);

			},
			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
			togglePages(tab){
				this.formRoleGroup.pages = this.formRoleGroup.pages ||[];
				var tabs = this.formRoleGroup.pages;

				tabs = tabs||[];
				if(tabs.some((item)=>{
					return item  === tab.link;
				})){
					tabs.forEach((item,i)=>{
						if(item === tab.link){
							this.formRoleGroup.pages.splice(i,1);
						}
					})
				}
				else{
					this.formRoleGroup.pages.push(tab.link);
						
				}
				this.$forceUpdate();
			
			},
			toggleAction(tag){
				this.formRoleGroup.actions = this.formRoleGroup.actions ||[];
				var actions = this.formRoleGroup.actions;


				actions = actions||[];
				if(actions.some((item)=>{
					return item  === tag.action;
				})){
					actions.forEach((item,i)=>{
						if(item === tag.action){
							this.formRoleGroup.actions.splice(i,1);
						}
					})
				}
				else{
					this.formRoleGroup.actions.push(tag.action);
						
				}
				this.$forceUpdate();
			
			},
		 
			addAdmin(){
				this.showDetail = true;
				this.formRoleGroup = {
				
				};
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

		 


			help(){
				zmitiUtil.adminAjax({
					remark:'getGroupList',
					data:{
						action:zmitiActions.getGroupList.action,
						condition:this.condition
					},
					success(data){
						if(data.getret === 0){
							s.adminList = data.list;	 
							zmitiUtil.adminAjax({
								remark:'getGroupList',
								data:{
									action:zmitiActions.getGroupList.action,
									condition:this.condition
								},
								success(data){
									if(data.getret === 0){
										s.groupList = data.list;	 
									}
								}
							})
						}
					}
				})
			},
 
			getGroupList(){
				var s = this;
				s.loading = true;
				var p = new Promise((resolve,reject)=>{
					var condition = this.condition;
					zmitiUtil.ajax({
						remark:'getRoleList',
						data:{
							action:userActions.getRoleList.action,
							condition,
							productid:s.$route.params.id,
							companyid:zmitiUtil.getCurrentCompanyId().companyid
						},
						error(){
							s.loading = false;
						},
						success(data){
							s.loading = false;
							if(data.getret === 0){
								s.dataSource = data.list;	 
								s.total = data.total || data.list.length;
								resolve();
							}
						}
					})
				});
				
				/* Promise.all([p]).then(()=>{
					s.adminList.map((admin,i)=>{
						s.groupList.map((group,j)=>{
							if(admin.groupid == group.id){
								admin.groupname = group.groupname;
							}
						})
					});
					s.adminList = s.adminList.concat([]);
				}) */
				 
				
			},
		
			 
			roleGroupAction(){
				var s = this;
			
				var action = this.formRoleGroup.groupid ? userActions.editUserRoleGroup.action:userActions.addUserRoleGroup.action;
				var info = JSON.parse(JSON.stringify(this.formRoleGroup));

				info.companyid = zmitiUtil.getCurrentCompanyId().companyid;
				info.productid = this.$route.params.id;
				if(this.formRoleGroup.groupid){
					info.groupid = this.formRoleGroup.groupid;
				}
				info.pages = this.formRoleGroup.pages.join(',');
			
				zmitiUtil.ajax({
					remark:this.formRoleGroup.groupid ?　'editUserRoleGroup':'addUserRoleGroup',
					data:{
						action,
						info
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.getGroupList();
							Vue.obserable.trigger({
								type:'toggleMask',
								data:false
							})
						}
					}
				})
			},
		}
	}
</script>
 