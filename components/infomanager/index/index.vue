<template>
	<div class="zmiti-informanager-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanager-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>栏目配置</span>

					 </div>
					 <div>
					 	<Button type="primary" @click='add()'>添加</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
					<div class="zmiti-select-column">						
					    <Tabs @on-click="currentTabs">
			                <TabPane :label="item.label" :name="item.value.toString()" v-for="(item,index) in specialnumData" :key="index"></TabPane>	               
			            </Tabs>
					</div>
					<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :current="currentNumber" :change='change' :page-size='condition.page_size'  :total="total">
					</ZmitiTable>
				 </div>
			 </div>
		</div>
		<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
			<div slot='mask-content'>
				<transition name='detail'>
					<section class='zmiti-add-form zmiti-scroll' >
						<header class='zmiti-add-header'>
							<img :src="imgs.back" alt="" @click='closeMaskPage'>
							<span>基础信息</span>
						</header>
					
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
							<FormItem label="类型名称：">
								<Input v-model="formObj.typename" placeholder="类型名称"></Input>
							</FormItem>
							<FormItem label="支持匿名：">
								<RadioGroup v-model="formObj.isanonymous">
							        <Radio label="0">否</Radio>
							        <Radio label="1">是</Radio>
							    </RadioGroup>
							</FormItem>
							<FormItem label="权限人员：">
								<RadioGroup v-model="formObj.isalluser" @on-change="changeUserStatus">
							        <Radio label="0">全部人员</Radio>
							        <Radio label="1">指定人员</Radio>
							    </RadioGroup>							    
							    <div class="zmiti-inforuserlist-select" v-if="showSelectUser==true">							    
								    <Select v-model="formObj.users" multiple style="width:370px">
								        <Option v-for="item in userSource" :value="item.userid" :key="item.userid">{{ item.realname }}</Option>
								    </Select>
							    </div>							    
							</FormItem>
						</Form>
						<div class="zmiti-transfer-userlist" v-if="showTransferUserlist==true">
					    	<Transfer
					        :titles="['选择用户','已分配用户']"
					        :data="data1"
					        :target-keys="targetKeys1"
					        :render-format="render1"
					        @on-change="handleChange1">
					        </Transfer>
					    </div>
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formObj.jobid?'保存':'确定'}}</Button>
						</div>
					</section>
				</transition>
			</div>
		</ZmitiMask>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
	import ZmitiMask from '../../../common/mask/';
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				showTransferUserlist:false,
				targetKeys:[],
				showAvatarModal:false,
				companyid:'',			
				companyname:'',
				imgs:window.imgs,
				total:0,
				loading:true,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				showDetailPage:-1,
				dataSource:[],				
				showTable:false,
				currentNumber:1,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				showSelectUser:false,
				productid:0,
				userstatus:1,
				infotypeid:undefined,
				userList:[{
					username:'songxian',
					userid:4,
					status:1
				},{
					username:'liuxin',
					userid:2,
					status:0
				},{
					username:'songxian',
					userid:4,
					status:1
				},{
					username:'liuxin',
					userid:2,
					status:0
				},{
					username:'songxian',
					userid:4,
					status:1
				},{
					username:'liuxin',
					userid:2,
					status:0
				}],
				formObj:{
					specialnum:'',
					typename:'',
					isanonymous:0,
					isalluser:0,
					infotypeid:'',
					users:[],
					status:1
				},
				userSource:[],
				userDataList:[],
				specialnumVal:0,
				specialnumData:[{
					label:'消息',
					value:0
				},{
					label:'意见箱',
					value:1
				},{
					label:'通知',
					value:2
				},{
					label:'公告',
					value:3
				},{
					label:'新闻',
					value:4
				},{
					label:'其他',
					value:5
				}],
				persons:0,
				modal1: false,
				data1: this.getMockData(),
                targetKeys1:[],//当前具有权限的用户 //this.getTargetKeys(),
                mockData:[],
				columns:[
					{
						title:"编号",
						key:'infotypeid',
						align:'left',
						width:80
					},
					{
						title:"子栏目名称",
						key:'typename',
						align:'left'
					},					
					{
						title:"创建时间",
						key:"createtime",
						align:"left",
						render:(h,params)=>{
							return h('div',{},zmitiUtil.formatDate(params.row.createtime));
						},
						width:100
					},
					{
						title:"允许匿名",
						key:"isanonymous",
						align:"left",
						width:100,
						render:(h,params)=>{
							var isanonymous='';
							if(params.row.isanonymous===0){
								isanonymous='禁止'
							}else if(params.row.isanonymous===1){
								isanonymous='允许'
							}else{								
								isanonymous='--'
							}
							return h('div',{},isanonymous);
						}
					},
					{
						title:"状态",
						key:"status",
						align:"left",
						width:80,
						render:(h,params)=>{
							var status='';
							if(params.row.status===0){
								status='禁用'
							}else if(params.row.status===2){
								status='已删除'
							}else{								
								status='正常'
							}
							return h('div',{},status);
						}
					},
					{
						title:"权限人员",
						key:"isalluser",
						align:"left",
						width:100,
						render:(h,params)=>{
							const viewuser=[h('span',{
								style:{
									color:"#ff0000"
								}
							},'指定人员')];
							return h('div',{},params.row.isalluser==0?'全部人员':viewuser);
						}
					},
					{
						title:"操作",
						key:"action",
						align:"center",
						width:100,
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
											this.delete(params.row.infotypeid);
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
								]),
								h('span',{
									style:{
										cursor:'pointer',
										color:"rgb(0, 102, 204)",
										marginLeft:'10px'
									},
									on:{
										click:()=>{
											this.formObj = params.row;
											this.formObj.isalluser=String(params.row.isalluser);
											this.formObj.isanonymous=String(params.row.isanonymous);
											this.formObj.status=String(params.row.status);
											console.log(this.formObj,'this.formObj');
											this.infotypeid=params.row.infotypeid;
											console.log(this.infotypeid,'infotypeid');
											this.getpermission(params.row.infotypeid);//获取具有权限的用户
											if(params.row.isalluser==='1'){
												this.showTransferUserlist=true;//显示穿梭框
											}
											Vue.obserable.trigger({
												type:'toggleMask',
												data:true
											})
										}
									}
								},'编辑')
                            ]);
							
							 
						}
					}
				]
			}
		},
		components:{
			ZmitiMask,
			ZmitiTable
		},

		beforeCreate(){
			
		},
		created(){
			this.companyid=zmitiUtil.getCurrentCompanyId().companyid;
			this.getUserList();
		},
		mounted(){
			this.init(()=>{
				setTimeout(()=>{
					this.getDataList(0);
				},100)
			})
		},
		computed:{
			alluser:function(){			
				return this.userSource
			}
		},
		watch:{			
			$route:{
				handler(){
					var productid = this.productid;
					productid && this.$router.push({path:'/infomanager/'+productid});
				}
			}			
		},
		
		methods:{
			init(fn){
				var s = this;
				var t = setInterval(() => {
					if(Vue.productList){
						clearInterval(t);
						var productid =  this.$route.params.id ;
						if(!productid){
							Vue.productList.forEach(p=>{
								if(s.$route.name.indexOf(p.producturl.substr(1))>-1){
									productid  = p.productid;
								}
							})
						}
						this.$router.push({path:'/infomanager/'+productid});
						this.productid = productid;
						fn && fn(productid)
					}
				}, 100);
			},
			currentTabs(val){//切换信息类型
				this.specialnumVal=parseInt(val);
				this.formObj.specialnum=parseInt(val);
				this.formObj.status=1;
				this.condition.page_index=0;
				this.currentNumber=1;
				this.getDataList(this.specialnumVal);
				console.log(this.specialnumVal,'当前标签');
			},
			change(e){
				this.condition.page_index = e -1;
				this.currentNumber=e;
				this.getDataList(this.specialnumVal);
			},
			changeUserStatus(ele){//切换用户权限类型，0为全部，1为指定人员
				console.log(this.infotypeid,'this.infotypeid')
				if(this.infotypeid===undefined){//当为添加状态时可显示select
					if(ele==='1'){
						this.showSelectUser=true;
					}else{
						this.showSelectUser=false;
					}										
				}else{//编辑信息时可显示穿梭框
					if(ele==='1'){
						this.showTransferUserlist=true;
					}else{
						this.showTransferUserlist=false;
					}								
				}
				console.log(ele,'element')
			},
			getDataList(specialnum){
						var {condition} = this;
						var s = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							specialnum:specialnum,
							productid:s.productid
						})
						zmitiUtil.ajax({
							remark:"gettypeList",
							data:{
								action:infomanagerActions.gettypeList.action,
								condition:condition
							},
							error(){
								s.loading = false;
							},
							success(data){
								s.loading = false;
								console.log(data,'获取列表')
								if(data.getret === 0){
									s.total = data.total;
									s.dataSource = data.list;
								}
							}
						})
			},
			closeMaskPage(){
				this.showSelectUser=false;
				console.log('关闭右侧');
				Vue.obserable.trigger({type:'toggleMask',data:false});
			},
			add(){
				this.showSelectUser=false;
				this.formObj = {};
				this.formObj.specialnum=this.specialnumVal;
				this.formObj.isanonymous="0";
				this.formObj.isalluser="0";
				this.formObj.status="1";
				this.infotypeid=undefined;
				this.formObj.users=[];
				this.showTransferUserlist=false;//隐藏穿梭框
				console.log(this.formObj,'this.formObj')
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},
			adminAction(){
				var s = this;
				var action = this.infotypeid ? infomanagerActions.edittypeList.action:infomanagerActions.addtypeList.action;

				let info = {
					specialnum:this.specialnumVal,
					isalluser:this.formObj.isalluser,
					typename:this.formObj.typename,
					infotypeid:this.formObj.infotypeid,
					status:this.formObj.status,
					isanonymous:this.formObj.isanonymous,
					companyid:this.companyid,
					productid:this.productid
				}
				
				if(this.formObj.isalluser==1){
					info.users=[];
					if(s.infotypeid==undefined){
						this.formObj.users.forEach((item,index)=>{
							info.users.push({
								userid:item,
								status:1
							});
						})
					}else{
						info.users=s.formObj.users;
					}
					
					console.log(info.users,'info.users');
				}
				console.log(info,'info-info')
				zmitiUtil.ajax({
					remark:this.formObj.infotypeid ?　'edittypeList':'addtypeList',
					data:{
						action,
						info
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.closeMaskPage();
						if(data.getret === 0){
							s.getDataList(s.specialnumVal);
						}
					}
				})
			},
			delete(infotypeid){
				console.log(infotypeid,'infotypeid');
				var s = this;
				zmitiUtil.ajax({
					remark:'deltypeList',
					data:{
						action:infomanagerActions.deltypeList.action,
						infotypeid,
						productid:s.productid
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.getDataList(s.specialnumVal);//更新列表
					}
				})
			},
			getUserList(){
				var s = this;			
				zmitiUtil.ajax({
					remark:'getUserList',
					data:{
						action:userActions.getCompanyUserList.action,
						condition:{
							page_index:0,
							page_size:100,
							companyid:this.companyid,
							status:1
						}
					},
					success(data){
						if(data.getret === 0){
							data.list.forEach((item,index)=>{
								s.userSource.push({
									userid:item.userid,
									realname:item.user.realname,
									username:item.user.username
								})								
							})
						}
					}
				})
			},
			ok () {
                this.targetKeys1=[];//清空穿梭框
            },
            cancel () {
            	this.targetKeys1=[];//清空穿梭框
            },
            /*穿梭框*/
            getMockData () {
            	var s = this;
            	let mockData = [];
                setTimeout(()=>{
            		s.userSource.forEach((item,index)=>{
	                	mockData.push({
	                        key: item.userid.toString(),
	                        label: item.realname,
	                        description: item.username
	                    });
	                })
            	},1000)                
                return mockData;
            },
            getTargetKeys () {//当前已设置的用户
                return ['4']
            },
            render1 (item) {
                return item.label;
            },
            handleChange1 (newTargetKeys, direction, moveKeys) {                
                /*if(direction==='right'){
                	moveKeys.forEach((item,index)=>{
	                	this.addpermission(item,infotypeid);
	                	console.log(item,'添加用户')
	                })
	                
                }else{              	
                	moveKeys.forEach((item,index)=>{
	                	this.delpermission(item,infotypeid);
	                	console.log(item,'删除用户');
	                })
                }*/
                this.$Modal.confirm({
                    title: '是否更改用户权限',
                    onOk: () => {                    	
		                setTimeout(() => {
	                        console.log(newTargetKeys);
			                console.log(direction);
			                console.log(moveKeys);
			                this.targetKeys1 = newTargetKeys;
			                var infotypeid=this.infotypeid;
			                if(direction==='right'){
			                	console.log('增加');
			                	moveKeys.forEach((item,index)=>{
				                	this.addpermission(item,infotypeid);
				                	console.log(item,'添加用户')
				                })
				                
			                }else{
			                	console.log('移除');                	
			                	moveKeys.forEach((item,index)=>{
				                	this.delpermission(item,infotypeid);
				                	console.log(item,'删除用户');
				                })

				                
			                }
			                this.$Modal.remove();
	                    }, 300);
                        
                    }
                });
                
            },
            addpermission(userid,infotypeid){//添加信息管理权限
            	var s = this;
            	zmitiUtil.ajax({
					remark:'addpermission',
					data:{
						action:infomanagerActions.addpermission.action,
						info:{
							userid,
							productid:this.productid,
							status:1,							
							infotypeid
						}
					},
					success(data){
						if(data.getret === 0){
							//s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						}
					}
				})
            },
            getpermission(infotypeid){//获取当前具有权限的用户列表
            	var s = this;
            	zmitiUtil.ajax({
					remark:'getpermission',
					data:{
						action:infomanagerActions.getpermission.action,
						condition:{
							page_index:0,
							page_size:100,
							productid:this.productid,							
							infotypeid:infotypeid
						}
					},
					success(data){
						if(data.getret === 0){
							console.log(data.list,'获取当前具有权限的用户列表');
							if(data.total>0){
								s.formObj.users=[];
								s.targetKeys1=[];
								data.list.forEach((item,index)=>{
									s.targetKeys1.push(item.userid.toString());
									s.formObj.users.push({
										userid:item.user.userid,
										status:1
									})
								})
								console.log(s.targetKeys1,'s.targetKeys1');//穿梭框右侧用户列表
								console.log(s.formObj.users,'s.formObj.users');	//编辑信息时用户列表						
							}							
						}
					}
				})
            },
            delpermission(userid,infotypeid){
            	zmitiUtil.ajax({
					remark:'delpermission',
					data:{
						action:infomanagerActions.delpermission.action,
						info:{
							productid:this.productid,							
							infotypeid,
							userid
						}
					},
					success(data){
						if(data.getret === 0){
							console.log('获取当前具有权限的用户列表');
						
						}
					}
				})
            }

		}
	}
</script>
 