<template>
	<div class="zmiti-votemanagerview-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanager-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>投票项管理</span>

					 </div>
					 <div>
					 	<Button type="default" @click='goback()'>返回</Button>
					 	<Button type="primary" @click='add()'>添加</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
					<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :current="currentNumber" :change='change' :page-size='condition.page_size'  :total="total">
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
	import ZmitiMask from '../../../common/mask/';
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
				questionid:undefined,
				formObj:{
					questionlabe:'',
					questiontype:0,//0为单选；1为多选
					options:{
						options:'',
						optionsurl:'',
						sort:0
					}
				},
				columns:[
					{
						title:"编号",
						key:'voteid',
						align:'center'
					},
					{
						title:"投票标题",
						key:'votetitle',
						align:'center',
						width:180
					},					
					{
						title:"创建时间",
						key:"createtime",
						align:"center",
						render:(h,params)=>{
							return h('div',{},zmitiUtil.formatDate(params.row.createtime));
						}
					},
					{
						title:"投票时间",
						key:"begintime",
						align:"center",
						width:180,
						render:(h,params)=>{
							return h('div',{},zmitiUtil.formatDate(params.row.begintime)+'~'+zmitiUtil.formatDate(params.row.endtime));
						}
					},
					{
						title:"允许匿名",
						key:"isrealname",
						align:"center",
						render:(h,params)=>{
							const viewuser=[h('span',{
								style:{
									color:"#ff0000"
								}
							},'是')];
							return h('div',{},params.row.isalluser==0?viewuser:'否');
						}
					},
					{
						title:"操作",
						key:"action",
						align:"center",
						width:200,
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
											/*this.formObj = params.row;
											this.formObj.isalluser=String(params.row.isalluser);
											this.formObj.status=String(params.row.status);
											console.log(this.formObj,'this.formObj');
											this.voteid=params.row.voteid;*/
											
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
			this.formObj.voteid=this.$route.params.voteid;
			this.companyid=zmitiUtil.getCurrentCompanyId().companyid;

		},
		mounted(){
			/*this.init(()=>{
				setTimeout(()=>{
					this.getDataList();
				},100)
			})*/
			this.getDataList();
		},
		computed:{

		},
		watch:{			
		
		},
		
		methods:{
			goback(){
				this.$router.push({
					name:'votemanager',
					params:{
						id:this.$route.params.id
					}
				})
			},
			change(e){
				this.condition.page_index = e -1;
				this.currentNumber=e;
				this.getDataList();
			},
			getDataList(){
				console.log(voteActions,'voteActions==voteActions')
						var {condition} = this;
						var s = this;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.productid,
							votetitle:s.votetitle
						})
						zmitiUtil.ajax({
							remark:"getVoteList",
							data:{
								action:voteActions.getVoteList.action,
								condition:condition
							},
							error(){
								s.loading = false;
							},
							success(data){
								s.loading = false;
								console.log(data,'获取列表');
								s.dataSource=[{
									voteid:1,
									votetitle:'标题',
									begintime:1567382400,
									endtime:1568678400
								}]
								/*if(data.getret === 0){
									s.total = data.total;
									s.dataSource = data.list;
								}*/
							}
						})
			},
			closeMaskPage(){
				console.log('关闭右侧');
				Vue.obserable.trigger({type:'toggleMask',data:false});
			},
			selectDatesBegin(val){//开始日期
				this.formObj.begintime=val;
			},
			selectDatesEnd(val){//结束日期
				this.formObj.endtime=val;
			},
			add(){//添加投票
				this.$router.push({
					name:'votemanagerviewquestion',
					params:{
						id:this.$route.params.id,
						voteid:this.$route.params.voteid
					}
				})
			},
			adminAction(){//添加并修改
				var s = this;
				var action = this.voteid ? voteActions.editVote.action:voteActions.addVote.action;

				let info = {
					votetitle:this.formObj.votetitle,
					companyid:this.companyid,
					productid:this.productid,
					isrealname:this.formObj.isrealname,
					begintime:Date.parse(new Date(s.formObj.begintime))/1000,
					endtime:Date.parse(new Date(s.formObj.endtime))/1000,
					abstract:this.formObj.abstract					
				}
				

				if(s.voteid!=undefined){
					info.voteid=s.voteid
				}

				console.log(info,'info-info')
				zmitiUtil.ajax({
					remark:this.voteid ?　'editVote':'addVote',
					data:{
						action,
						info
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.closeMaskPage();
						if(data.getret === 0){
							s.getDataList();
						}
					}
				})
			},
			delete(voteid){//删除投票
				console.log(voteid,'voteid');
				var s = this;
				zmitiUtil.ajax({
					remark:'deltypeList',
					data:{
						action:voteActions.deleteVote.action,
						voteid,
						productid:s.productid
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
 