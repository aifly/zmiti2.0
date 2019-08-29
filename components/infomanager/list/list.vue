<template>
	<div class="zmiti-informanagernews-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanagernews-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>{{columntitle}}</span>

					 </div>
					 <div>
					 	<Button type="primary" @click='add()'>添加</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
				 	<div class="zmiti-tabs-select">
					 	<Tabs @on-click="currentTabs">
			                <TabPane :label="item.typename" :name="item.infotypeid.toString()" v-for="(item,index) in typeDataList" :key="index"></TabPane>	               
			            </Tabs>
		            </div>
				 	<section class="zmiti-list-where">
				 		<Input placeholder="请输入标题" v-model="title" style="width: 200px;"></Input>
				 		<div class="zmiti-search-dates">
				        	<DatePicker type="daterange" :start-date="new Date(2018, 12, 1)" placement="bottom-end" placeholder="选择时间段" style="width: 200px" @on-change="selectDates"></DatePicker>
				        </div>
				        <Button icon="md-search" @click="searchHandle">搜索</Button>
				 	</section>
					<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :current="currentNumber" :change='change' :page-size='condition.page_size'  :total="total">
					</ZmitiTable>
				 </div>
			 </div>
		</div>

		<Modal
			v-model="modal1"
			title="访问人员列表"
			width="470"
			@on-ok="ok"
			@on-cancel="cancel">
			<Transfer
			:titles="['普通用户','可访问用户']"
			:data="data1"
			:target-keys="targetKeys1"
			:render-format="render1"
			@on-change="handleChange1">
			</Transfer>
			<div slot="footer"></div>
		</Modal>


	</div>
</template>

<style lang="scss" scoped>
	@import './list.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions} = zmitiUtil;
	export default {
		props:['productid','columntitle','specialnum'],
		name:'zmitiindex',
		data(){
			return{
				typename:'',
				targetKeys:[],
				showAvatarModal:false,				
				companyname:'',
				addDataSource:[],
				imgs:window.imgs,
				total:0,
				loading:true,
				currentCityIndex: -1,
				currentCityId: -1,
				transX: 0,
				transY: 0,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],				
				showTable:false,
				currentNumber:1,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				typeDataList:[],
				typeid:-1,
				title:'',
				begin_time:0,
				end_time:0,
				modal1: false,
				data1:this.getMockData(),
                targetKeys1:[],
                mockData:[],
                currUserList:[],
				statusVal:'-1',
				selectStatus:[{
                    value: '-1',
                    label: '全部'
                },{
                    value: '0',
                    label: '禁用'
                },{
                    value: '1',
                    label: '待审'
                },{
                    value: '2',
                    label: '通过'
                },{
                    value: '3',
                    label: '拒绝'
                }],
                infoid:-1,
                companyid:'',
                userSource:[],
				columns:[
					{
						title:"编号",
						key:'infoid',
						align:'center',
						width:120
					},
					{
						title:"标题",
						key:'title',
						align:'center',
						
					},
					{
						title:"时间",
						key:"createtime",
						align:"center",
						width:120,
						render:(h,params)=>{
							return h('div',{},formatDate(params.row.createtime))
						}
					},
					{
						title:"操作",
						key:"action",
						align:"center",
						width:120,
						render:(h,params)=>{

							return h('div', [
                                
								h('span',{
									style:{
										cursor:'pointer',
										color:"rgb(0, 102, 204)",
										marginRight:'10px'
									},
									on:{
										click:()=>{
											this.formObj = params.row;
											this.$router.push({
												name:'infomanagerlistdetail',
												params:{
													productid:this.productid,
													typeid:this.typeid,
													id:this.formObj.infoid,
													typename:this.typename
												}
											});
										}
									}
								},'编辑'),
								h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'

									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.infoid);
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
				]
			}
		},
		components:{
			ZmitiTable
		},

		beforeCreate(){
			
		},
		created(){
			this.companyid=zmitiUtil.getCurrentCompanyId().companyid;
		},
		mounted(){
			//var specialnum=3;//当前信息类型标识,0消息；1意见箱；2通知；3公告；4新闻；5资料
			this.getTypeList(this.specialnum);
			this.getUserList();		
		},

		watch:{
			typeid(){//当typeid发生变化时重新加载信息列表
				this.getDataList();
			},
			statusVal(){//当status发生变化时重新加载信息列表
				this.getDataList();
			}
		},
		
		methods:{
			change(e){
				this.condition.page_index = e -1;
				this.currentNumber=e;
				this.getDataList();
			},
			add(){
				this.$router.push({name:'infomanagerlistdetail',params:{productid:this.productid,typeid:this.typeid,typename:this.typename}})				
			},
			getDataList(){
				var s = this;
				var {condition} = this;
				condition = Object.assign(condition,{
					typeid:s.typeid,
					productid:s.productid,
					title:s.title,
					begin_time:s.begin_time,
					end_time:s.end_time,
					status:s.statusVal
				})
				zmitiUtil.ajax({
					remark:"getnewsList",
					data:{
						action:infomanagerActions.getnewsList.action,
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
							if(data.total>0){
								s.dataSource = data.list;
							}else{
								s.dataSource =[]
							}							
						}
					}
				})
			},
			delete(infoid){//删除信息
				var s = this;
				zmitiUtil.ajax({
					remark:'delnews',
					data:{
						action:infomanagerActions.delnews.action,
						productid:this.productid,
						infoid,
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.getDataList();//更新列表
					}
				})
			},
			selectDates(val){//按时间段查询
				console.log(val,'选择的时间');
				this.begin_time=Date.parse(new Date(val[0]))/1000;
				this.end_time=Date.parse(new Date(val[1]))/1000;
				console.log(this.begin_time+' '+this.end_time,'选择的时间戳');
			},
			searchHandle(){//搜索
				this.getDataList();
			},
			getTypeList(specialnum){//查询类型
				var {condition} = this;
				var s = this;

				zmitiUtil.ajax({
					remark:"getusertypeinfolist",
					data:{
						action:infomanagerActions.getusertypeinfolist.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							specialnum:specialnum,
							productid:s.productid,
							page_index:0,
							page_size:20
						}
					},
					success(data){
						//console.log(data,'获取类型列表');
						if(data.getret === 0){
							s.loading = false;
							if(data.total>0){
								s.typeDataList=data.list;
								s.typeid=data.list[0].infotypeid;
								s.typename=data.list[0].typename;
							}
						}
					}
				})
			},
			currentTabs(val){//切换信息类型
				this.typeid=parseInt(val);
				this.condition.page_index=0;
				this.currentNumber=1;
				this.typename=this.typeDataList.filter((item)=>item.infotypeid==val).map((item)=>item.typename).toString();
				console.log(val,'当前标签');
			},
			infoStatus(val){//根据状态筛选
				this.statusVal=val;
				this.condition.page_index=0;
				this.currentNumber=1;
				console.log(this.statusVal,'选中的状态');
			},
			getUserList(){
				var s = this;			
				zmitiUtil.ajax({
					remark:'getUserList',
					data:{
						action:userActions.getCompanyUserList.action,
						condition:{
							page_index:0,
							page_size:80,
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
							});
						}
					}
				})
			},
			/*用户权限设置*/
			getMockData () {//左侧用户
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
            render1 (item) {
                return item.label;
            },
            handleChange1(newTargetKeys, direction, moveKeys) {
                console.log(newTargetKeys,'newTargetKeys');//已经选择的用户
                console.log(direction);
                console.log(moveKeys,'moveKeys');
                this.targetKeys1 = newTargetKeys;
                var infoid=this.infoid;
                if(direction==='right'){//增加
                	moveKeys.forEach((item,index)=>{
	                	this.addAccessible(item,infoid);
	                	console.log(item,'添加用户')
	                })
                }else{//移除
                	console.log('移除'); 
                	moveKeys.forEach((item,index)=>{
	                	let newusers=this.currUserList.filter((ele)=>ele.userid==item).map(ele => ele.infovisitid);//通过userid过滤并得到infovisitid，其值为数组
	                	this.delAccessible(Number(newusers));//删除可访问权限
                		console.log(Number(newusers));//获取infovisitid
	                	console.log(item,'删除的用户');
	                })
                }
                
            },
            getaddAccessibleList(infoid){//获取当前具有权限的用户列表
            	var s = this;
            	zmitiUtil.ajax({
					remark:'getaddAccessibleList',
					data:{
						action:infomanagerActions.getaddAccessibleList.action,
						condition:{
							page_index:0,
							page_size:50,
							productid:this.productid,							
							infoid:infoid
						}
					},
					success(data){
						if(data.getret === 0){//右侧用户
							console.log(data.list,'获取当前具有权限的用户列表');
							if(data.total>0){
								s.currUserList=data.list;
								data.list.forEach((item,index)=>{
									s.targetKeys1.push(item.userid.toString());
								})
								console.log(s.targetKeys1,'获取具有权限的userid');							
							}							
						}
					}
				})
            }, 
            addAccessible(userid,infoid){//添加信息管理权限
            	var s = this;
            	zmitiUtil.ajax({
					remark:'addAccessible',
					data:{
						action:infomanagerActions.addAccessible.action,
						info:{
							userid:Number(userid),
							productid:this.productid,							
							infoid
						}
					},
					success(data){
						if(data.getret === 0){
							//s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						}
					}
				})
            },
            delAccessible(infovisitid){
            	zmitiUtil.ajax({
					remark:'delAccessible',
					data:{
						action:infomanagerActions.delAccessible.action,
						info:{
							productid:this.productid,							
							infovisitid
						}
					},
					success(data){
						if(data.getret === 0){
							console.log('获取当前具有权限的用户列表');
						
						}
					}
				})
            },           
			ok () {
                this.targetKeys1=[];//清空穿梭框
            },
            cancel () {
            	this.targetKeys1=[];//清空穿梭框
                //this.$Message.info('Clicked cancel');
            },
		}
	}
</script>
 