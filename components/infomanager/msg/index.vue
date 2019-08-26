<template>
	<div class="zmiti-informanagernews-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanagernews-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>栏目配置</span>

					 </div>
					 <div>
					 	<Button type="primary" @click='add()'>添加</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
				 	<div class="zmiti-tabs-select">
					 	<Tabs type="card" @on-click="currentTabs">
			                <TabPane :label="item.typename" :name="item.infotypeid.toString()" v-for="(item,index) in typeDataList" :key="index"></TabPane>	               
			            </Tabs>
		            </div>
				 	<section class="zmiti-list-where">
				 		<Input placeholder="请输入标题" v-model="title" style="width: 200px;"></Input>
				 		<div class="zmiti-search-dates">
				        	<DatePicker type="daterange" :start-date="new Date(2018, 12, 1)" placement="bottom-end" placeholder="选择时间段" style="width: 200px" @on-change="selectDates"></DatePicker>
				        </div>
				        <Button icon="md-search" @click="searchHandle">搜索</Button>
				        <Select v-model="statusVal" @on-change="infoStatus" style="margin-left:auto;width:120px">
					        <Option v-for="item in selectStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select>
				 	</section>
					<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :page-size='condition.page_size'  :total="total">
					</ZmitiTable>
				 </div>
			 </div>
		</div>




	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
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
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				typeDataList:[],
				typeid:-1,
				productid:1072203850,
				title:'',
				begin_time:0,
				end_time:0,
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
						title:"状态",
						key:'status',
						align:'center',
						render:(h,params)=>{
							let status='';
							switch(params.row.status){
								case 0:
									status='禁用'
								break;
								case 2:
									status='通过'
								break;
								case 3:
									status='拒绝'
								break;
								default:
									status='待审'
							}
							return h('div',{},status)
						}
					},
					{
						title:"权限",
						key:'visit',
						align:'center',
						render:(h,params)=>{
							let viewother=[h('span', {
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
							}, '查看')]
							return h('div',{},params.row.visit===0?'全部':viewother)
						}
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
											this.$router.push({name:'infomanagerdetail',params:{typeid:this.typeid,id:this.formObj.infoid}});
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
		mounted(){
			this.getTypeList(0);			
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
			add(){
				this.$router.push({name:'infomanagerdetail',params:{typeid:this.typeid}})				
			},
			getDataList(){
				var s = this;
				var {condition} = this;
				condition = Object.assign(condition,{
					typeid:s.typeid,
					productid:s.productid,
					page_index:0,
					page_size:10,
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
				specialnum=0;
				var {condition} = this;
				var s = this;

				zmitiUtil.ajax({
					remark:"gettypeList",
					data:{
						action:infomanagerActions.gettypeList.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							specialnum:specialnum,
							productid:s.productid,
							page_index:0,
							page_size:10
						}
					},
					success(data){
						//console.log(data,'获取类型列表');
						if(data.getret === 0){
							if(data.total>0){
								s.typeDataList=data.list;
								s.typeid=data.list[0].infotypeid;
							}
						}
					}
				})
			},
			currentTabs(val){//切换信息类型
				this.typeid=parseInt(val);
				console.log(val,'当前标签');
			},
			infoStatus(val){
				this.statusVal=val;
				console.log(this.statusVal,'选中的状态');
			}
		}
	}
</script>
 