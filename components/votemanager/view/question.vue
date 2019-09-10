<template>
	<div class="zmiti-votemanagerviewanswer-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanager-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>查看参与用户</span>

					 </div>
					 <div>
					 	<Button type="default" @click='goback()'>返回</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
					<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total">
					</ZmitiTable>
				 </div>
			 </div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
	@import './question.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions,voteActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{				
				companyid:'',			
				companyname:'',
				votetitle:'',
				imgs:window.imgs,
				total:0,
				loading:true,
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
				productid:0,
				voteid:undefined,
				columns:[
					{
						title:"编号",
						key:'vuid',
						align:'center',
						width:100
					},
					{
						title:"名字",
						key:'username',
						align:'center'						
					},
					{
						title:"邮箱",
						key:'email',
						align:'center'
					},				
					{
						title:"投票时间",
						key:"createtime",
						align:"center",
						width:180,
						render:(h,params)=>{
							return h('div',{},this.timestampToTime(params.row.createtime));
						}
					},				
					{
						title:"操作",
						key:"action",
						align:"center",
						width:150,
						render:(h,params)=>{
							return h('div',{
								style:{
									cursor:'pointer',
									color:"rgb(0, 102, 204)"
								},
								on:{
									click: () => {
										this.$router.push({
											name:'votemanagerviewuservote',
											params:{
												id:this.productid,
												voteid:params.row.voteid,
												vuid:params.row.vuid
											}
										})
									}
								}
							},'查看参与的投票');
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
			this.productid=this.$route.params.id;
			this.voteid=this.$route.params.voteid;
		},
		mounted(){
			this.getDataList();
		},
		computed:{

		},
		watch:{			
		
		},
		
		methods:{
			goback(){
				window.history.back();
			},
			change(e){
				this.condition.page_index = e -1;
				this.currentNumber=e;
				this.getDataList();				
			},
			getDataList(){
						var {condition} = this;
						var s = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.productid,
							voteid:s.voteid
						})
						zmitiUtil.ajax({
							remark:"getuservoteList",
							data:{
								action:voteActions.getuservoteList.action,
								condition:condition
							},
							error(){
								s.loading = false;
							},
							success(data){
								s.loading = false;
								console.log(data,'获取列表');
								if(data.getret === 0){
									s.total = data.total;
									s.dataSource = data.list;
								}
							}
						})
			},
			timestampToTime(timestamp) {
		        var date = new Date(timestamp*1000);
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = (date.getDate()+1 < 10 ? '0'+(date.getDate()) : date.getDate());
		        return Y+M+D;
		    }
		}
	}
</script>
 