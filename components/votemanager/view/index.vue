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
					<!-- <ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :current="currentNumber" :change='change' :page-size='condition.page_size'  :total="total">
					</ZmitiTable> -->
					<div class="zmiti-question-items" v-for="(item,index) in dataSource" :key="index">
						<div class="zmiti-question-h1">投票项：{{item.questionlabe}}</div>
						<div class="zmiti-question-sub"><label>类型：</label><div>{{item.questiontype==1?'多选':'单选'}}</div></div>
						<div class="zmiti-question-sub"><label>配图：</label><div>{{item.questionurl}}</div></div>
						<div class="zmiti-question-sub">
							<label>选项：</label>
							<div class="zmiti-question-ulist">
								<ul>
									<li v-for="(ele,idx) in item.options" :key="idx">
										<div class="zmiti-votemanagerview-options">
											<div style="width:80px;margin-right: 5px;">
												<Input v-model="ele.sort" placeholder="序号" ></Input>
											</div>
											<div class="zmiti-options-item" style="margin-right: 5px;">
												<Input v-model="ele.options" placeholder="选项内容" style="margin-right: 5px;"></Input>	
											</div>
											<div class="zmiti-options-item zmiti-options-item-imgurl">
												<Input v-model="ele.optionsurl" placeholder="图片地址"></Input>
												<Icon type="ios-image-outline" size="20" />
											</div>
											<div class="zmiti-options-btns">
												<!-- <Icon type="ios-add-circle-outline" size="20" @click="addoptions" v-if="formObj.options.length-1===index" />
												<Icon type="ios-remove-circle-outline" size="20" @click="removeoptions(index)" /> -->
											</div>
										</div>
									</li>
								</ul>
							</div>
						</div>
						<div class="zmiti-question-oper">							
							<Poptip
						        confirm
						        title="您确认删除这条内容吗?"
						        @on-ok="deletequestion(item.questionid)"
						        @on-cancel="cancelpoptip">
						        <span class="zmiti-question-operbtn">删除</span>
						    </Poptip>
						    |<span class="zmiti-question-operbtn">编辑</span>
						</div>
					</div>
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
				questionlabe:'',
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
				voteid:0,
				questionid:undefined,
				columns:[
					{
						title:"编号",
						key:'questionid',
						align:'center',
						width:120
					},
					{
						title:"投票项",
						key:'questionlabe',
						align:'center'						
					},					
					{
						title:"创建时间",
						key:"createtime",
						align:"center",
						width:180,
						render:(h,params)=>{
							return h('div',{},zmitiUtil.formatDate(params.row.createtime));
						}
					},
					{
						title:"操作",
						key:"action",
						align:"center",
						width:120,
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
											this.delete(params.row.questionid);
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
											this.$router.push({
												name:'votemanagerviewquestion',
												params:{
													id:this.$route.params.id,
													voteid:this.$route.params.voteid,
													questionid:params.row.questionid
												}
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
			this.productid=this.$route.params.id;
			this.voteid=this.$route.params.voteid;
			this.companyid=zmitiUtil.getCurrentCompanyId().companyid;

		},
		mounted(){
			setTimeout(()=>{
				this.getDataList();
			},100)
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
							voteid:s.voteid,
							questionlabe:s.questionlabe
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
			add(){//添加投票项
				this.$router.push({
					name:'votemanagerviewquestion',
					params:{
						id:this.$route.params.id,
						voteid:this.$route.params.voteid
					}
				})
			},
			deletequestion(questionid){//删除投票项
				var s = this;
				//this.$Message.info('You click cancel');
				zmitiUtil.ajax({
					remark:'deletequesion',
					data:{
						action:voteActions.deletequesion.action,
						info:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							questionid,
							productid:s.productid
						}
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.getDataList();
					}
				})
			},
            cancelpoptip(){
            	//this.$Message.info('You click cancel');
            }

		}
	}
</script>
 