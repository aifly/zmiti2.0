<template>
	<div class="zmiti-votemanagerviewanswer-main-ui">
		<div class="zmiti-list-main">
			 <div class='zmiti-informanager-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>查看投票情况</span>
					 </div>
					 <div>
					 	<Button type="primary" @click='gousercount()'>查看参与用户</Button>
					 	<Button type="default" @click='goback()'>返回</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
				 	<div class="zmiti-votemanagerviewanswer-list">
				 		<div class="zmiti-votemanagerviewanswer-items" style="margin-bottom: 10px;" v-for="(item,index) in dataSource" :key="index">
							<Card dis-hover>
				                <p slot="title">{{item.questionlabe}}</p>			                
				                <div class="viewoptions" v-for="(ele,idx) in item.options">
				                	<div class="options-subitem">				                		
				                		<div class="options-infor">
				                			<img :src="ele.optionsurl" v-if="ele.optionsurl!=''">
					                		<div class="options-subitem-txt">
					                			<p>{{ele.options}}</p>
					                		</div>
					                	</div>
				                	</div>
				                	<div class="options-subitem" v-if="sumval(item.options)>0">
				                		<Progress :percent="parseInt((ele.number/sumval(item.options))*100)" />
				                	</div>
				                </div>
				                <div class="options-infor options-infor2">			                		
			                		<div class="options-infor-a">编号：{{item.questionid}}</div>
			                		<div class="options-infor-b">总票数：{{item.options | getSum}}</div>
			                	</div>				               			                
				            </Card>

			            </div>
					</div>
					<div class="zmiti-list-nodata" v-if="total==0">暂无数据</div>
					<!-- 翻页 -->
					<div class="zmiti-page-question" v-if="total>condition.page_size">
						<Page :total="total" 
						size="small" 
						@on-change="change"
						:page-size='condition.page_size'
						show-total />
					</div>
				 </div>
			 </div>
		</div>

	</div>
</template>

<style lang="scss" scoped>
	@import './question.scss';
	.viewoptions{
		margin-bottom: 10px;
		display: flex;
		.options-subitem{
			width:50%;
			display: flex;
			img{
				width:80px;
				height: 80px;
			}
			.options-subitem-txt{
				flex:1;
				margin-right: 30px;
				padding:0 0 0 5px;
				p{
					margin:0;
					line-height: 20px;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 4;
					overflow: hidden;
					text-align: justify;
				}
			}
		}
	}
	.options-infor{
		display: flex;
		padding:5px 0;
		.options-infor-a{
			flex:1;
		}
		.options-infor-b{
			margin-left: auto;
			margin-right: 20px;
		}
	}
	.options-infor2{
		padding-bottom:0;
		border-top: 1px solid #e8eaec;
	}
	.zmiti-page-question{
		margin:0 auto;
		text-align: center;
	}
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
			gousercount(){
				this.$router.push({
					name:'votemanagerviewquestion',
					params:{
						id:this.productid,
						voteid:this.voteid
					}
				})
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
							remark:"getquesionList",
							data:{
								action:voteActions.getquesionList.action,
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
		    },
		    sumval(ar){
				var sumarray=ar.map((item)=>item.number);
				var arr=sumarray    
				var sum=arr.reduce(function(prev, curr, idx, arr){
			          return prev + curr;
			    })
			    return  sum;
			}
		},
		filters:{
			getSum:function(ar){
				var sumarray=ar.map((item)=>item.number);
				var arr=sumarray    
				var sum=arr.reduce(function(prev, curr, idx, arr){
			          return prev + curr;
			    })
			    return  sum;
			}
		}
	}
</script>
 