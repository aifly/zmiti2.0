<template>
	<div class="zmiti-informanagernews-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanagernews-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>信息</span>

					 </div>
					 <div>
					 	<Button type="primary" @click='goback()'>返回</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
					
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
			}
		},
		components:{

		},

		beforeCreate(){
			
		},
		mounted(){
			this.getDataList();
			
		},

		watch:{	
			
		},
		
		methods:{
			goback(){
				this.$router.push({path:'infomanagermsg'})
			},
			add(){
				this.formObj = {};
				
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
							}							
						}
					}
				})
			}
		}
	}
</script>
 