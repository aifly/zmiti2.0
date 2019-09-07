<template>
	<div class="zmiti-votemanager-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanager-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>投票管理</span>

					 </div>
					 <div>
					 	<Button type="primary" @click='add()'>添加</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
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
							<FormItem label="投票标题：">
								<Input v-model="formObj.votetitle" placeholder="投票标题"></Input>
							</FormItem>
							<FormItem label="摘要：">
								<Input v-model="formObj.abstract" type="textarea" placeholder="摘要"></Input>
							</FormItem>
							<FormItem label="实名：">
								<RadioGroup v-model="formObj.isrealname">
							        <Radio :label="0">匿名</Radio>
							        <Radio :label="1">实名</Radio>
							    </RadioGroup>
							</FormItem>
							<FormItem label="选择时间：">
								<div>开始日期：<DatePicker type="date" :value="begintime" placeholder="开始日期" style="width: 140px" @on-change="selectDatesBegin"></DatePicker></div>
								<div>结束日期：<DatePicker type="date" :value="endtime" placeholder="结束日期" style="width: 140px" @on-change="selectDatesEnd"></DatePicker></div>
							</FormItem>
						</Form>
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formObj.voteid?'保存':'确定'}}</Button>
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
				showDetailPage:-1,
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
				begintime:'2019-01-01',
				endtime:'2019-01-01',
				formObj:{
					votetitle:'',
					isrealname:0,//0表示可匿名；1表示必须实名
					begintime:'2019-01-01',
					endtime:'2019-01-01'
				},
				columns:[
					{
						title:"编号",
						key:'voteid',
						align:'center',
						width:100
					},
					{
						title:"投票标题",
						key:'votetitle',
						align:'center'						
					},					
					{
						title:"投票时间",
						key:"begintime",
						align:"center",
						width:180,
						render:(h,params)=>{
							return h('div',{},this.timestampToTime(params.row.begintime)+'~~'+this.timestampToTime(params.row.endtime));
						}
					},
					{
						title:"允许匿名",
						key:"isrealname",
						align:"center",
						width:100,
						render:(h,params)=>{
							const viewuser=[h('span',{
								style:{
									color:"#ff0000"
								}
							},'是')];
							return h('div',{},params.row.isrealname==1?viewuser:'否');
						}
					},
					{
						title:"操作",
						key:"action",
						align:"center",
						width:250,
						render:(h,params)=>{

							return h('div', [
                                
								h('span',{
									style:{
										cursor:'pointer',
										color:"rgb(0, 102, 204)",
										marginLeft:'10px'
									},
									on:{
										click:()=>{
											this.formObj = params.row;
											this.begintime=this.timestampToTime(params.row.begintime);
											this.endtime=this.timestampToTime(params.row.endtime);
											//console.log(this.formObj,'this.formObj');
											this.voteid=params.row.voteid;
											Vue.obserable.trigger({
												type:'toggleMask',
												data:true
											})
										}
									}
								},'编辑'),
								h('span',{
									style:{
										cursor:'pointer',
										color:"rgb(0, 102, 204)",
										marginLeft:'10px',
									},
									on:{
										click:()=>{
											this.$router.push({
												name:'votemanagerview',
												params:{
													id:this.productid,
													voteid:params.row.voteid
												}
											})
										}
									}
								},'投票项管理'),
								h('span',{
									style:{
										cursor:'pointer',
										color:"rgb(0, 102, 204)",
										marginLeft:'10px',
										marginRight:'10px',
									},
									on:{
										click:()=>{
											this.$router.push({
												name:'votemanagerview',
												params:{
													id:this.productid,
													voteid:params.row.voteid
												}
											})
										}
									}
								},'查看投票'),
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
								])
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

		},
		mounted(){
			this.init(()=>{
				setTimeout(()=>{
					this.getDataList();
				},100)
			})
		},
		computed:{

		},
		watch:{			
			$route:{
				handler(){
					var productid = this.productid;
					productid && this.$router.push({path:'/votemanager/'+productid});
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
						this.$router.push({path:'/votemanager/'+productid});
						this.productid = productid;
						fn && fn(productid)
					}
				}, 100);
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
								s.dataSource=data.list;
								
							}
						})
						/*var s = this;
						s.loading = false;
					s.dataSource=[{
									voteid:1,
									votetitle:'标题',
									begintime:1567382400,
									endtime:1568678400
								}]*/
			},
			closeMaskPage(){
				console.log('关闭右侧');
				Vue.obserable.trigger({type:'toggleMask',data:false});
			},
			selectDatesBegin(val){//开始日期
				this.begintime=val;
			},
			selectDatesEnd(val){//结束日期
				this.endtime=val;
			},
			add(){//添加投票
				this.formObj = {};
				this.formObj.isrealname="0";
				this.voteid=undefined;
				console.log(this.formObj,'this.formObj')
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},
			adminAction(){//添加并修改
				var s = this;
				var action = this.voteid ? voteActions.editVote.action:voteActions.addVote.action;

				let info = {
					votetitle:this.formObj.votetitle,
					companyid:this.companyid,
					productid:this.productid,
					isrealname:this.formObj.isrealname,
					begintime:Date.parse(new Date(s.begintime))/1000,
					endtime:Date.parse(new Date(s.endtime))/1000,
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
			},
			timestampToTime(timestamp) {
		        var date = new Date(timestamp*1000);
		        var Y = date.getFullYear() + '-';
		        var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
		        var D = date.getDate();
		        return Y+M+D;
		    }
		}
	}
</script>
 