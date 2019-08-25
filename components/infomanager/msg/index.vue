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
				typeid:1,
				productid:1072203850,
				title:'',
				begin_time:0,
				end_time:0,
				columns:[
					{
						title:"编号",
						key:'infoid',
						align:'center',
						width:180
					},
					{
						title:"标题",
						key:'title',
						align:'center',
						
					},
					{
						title:"操作",
						key:"action",
						align:"center",
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
											this.$router.push({name:'infomanagerdetail',params:{id:this.formObj.infoid,typeid:2}});
										}
									}
								},'详情')
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
			this.getDataList();
			
		},

		watch:{

			
			
		},
		
		methods:{
			add(){
				this.$router.push({path:'infomanagerdetail'})				
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
					end_time:s.end_time
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
			}
		}
	}
</script>
 