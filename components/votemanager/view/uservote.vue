<template>
	<div class="zmiti-votemanagerviewanswer-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanager-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>查看参与的投票</span>

					 </div>
					 <div>
					 	<Button type="default" @click='goback()'>返回</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
				 	<div class="zmiti-votemanagerviewanswer-list">
				 		<div class="zmiti-votemanagerviewanswer-items" style="margin-bottom: 10px;" v-for="(item,index) in dataSource" :key="index" v-if="item.coloect_options.length>0">
							<Card dis-hover>
				                <p slot="title">{{item.questionlabe}}</p>
				                <div class="optionslists">
					                <div class="viewoptions" v-for="(ele,idx) in item.options" :key="idx">				                          	
					                	<div class="options-infor">
					                		<template v-if="ele.optionsurl!=''">
				                				<img :src="ele.optionsurl">
				                			</template>
				                			<div :class="['options_subtxt',{'options_subtxt2':ele.optionsurl==''}]">
				                				<p>{{ele.options}}</p>
			                					<span v-for="(e,i) in item.coloect_options" :key="i">
			                						<Icon type="md-checkmark-circle-outline" size="20" v-if="parseInt(e)==ele.optionsid" />
			                					</span>
				                			</div>
					                	</div>					                	
					                </div>
				                </div>
				            </Card>
			            </div>
			            <!-- <div class="zmiti-list-nodata" v-else>暂无数据</div> -->
					</div>
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
	.optionslists{
		display: flex;
		flex-wrap: wrap;
	}
	.viewoptions{
		width:300px;
		margin:0 30px 15px 0;
		.options-infor{
			display: flex;
			img{
				width:80px;
				height: 80px;
			}
			.options_subtxt{
				flex:1;
				padding:0 0 0 5px;
				position: relative;
				p{
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 3;
					overflow: hidden;
					text-align: justify;
				}
				.ivu-icon{
					position:absolute;
					bottom:0;
					color:#19be6b;
				}
			}
			.options_subtxt2{
				.ivu-icon{
					position:absolute;
					bottom:0;
					right:0;
				}
			}
		}
		
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
					page_size:20,
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
			//this.getuservoteResultList(20);
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
					voteid:s.voteid,
					vuid:this.$route.params.vuid
				})
				zmitiUtil.ajax({
					remark:"getusercurrentResult",
					data:{
						action:voteActions.getusercurrentResult.action,
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
		},
		filters:{
		}
	}
</script>
 