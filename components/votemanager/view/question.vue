<template>
	<div class="zmiti-votemanagerview-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanager-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>选项管理</span>

					 </div>
					 <div>
					 	<Button type="default" @click='goback()'>返回</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
				 	<div class="zmiti-votemanagerviewquestion-list">
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
							<FormItem label="问题项：">
								<Input v-model="formObj.questionlabe" placeholder="问题项"></Input>
							</FormItem>
							<FormItem label="图片：">
								<Input v-model="formObj.questionurl" placeholder="图片地址"></Input>
							</FormItem>
							<FormItem label="类型：">
								<RadioGroup v-model="formObj.questiontype">
							        <Radio label="0">单选</Radio>
							        <Radio label="1">多选</Radio>
							    </RadioGroup>
							</FormItem>
							<FormItem label="选项：">
								<!-- <div class="zmiti-votemanagerview-options">
									<Input v-model="optionsData.sort" placeholder="排序" style="width:80px;margin-right: 5px;"></Input>
									<Input v-model="optionsData.options" placeholder="选项内容" style="margin-right: 5px;"></Input>									
									<Input v-model="optionsData.optionsurl" placeholder="图片地址">
									</Input>
									<Icon type="ios-image-outline" size="20" />
									<Icon type="ios-add-circle-outline" size="20" @click="addoptions" />							
								</div> -->

								<template v-if="formObj.options.length>0">
									<div class="zmiti-votemanagerview-options" v-for="(item,index) in formObj.options" :key="index">
										<div style="width:80px;margin-right: 5px;">
											<Input v-model="item.sort" placeholder="排序" ></Input>
										</div>
										<div class="zmiti-options-item" style="margin-right: 5px;">
											<Input v-model="item.options" placeholder="选项内容" style="margin-right: 5px;"></Input>	
										</div>
										<div class="zmiti-options-item zmiti-options-item-imgurl">
											<Input v-model="item.optionsurl" placeholder="图片地址"></Input>
											<Icon type="ios-image-outline" size="20" />
										</div>
										<div class="zmiti-options-btns">
											<Icon type="ios-add-circle-outline" size="20" @click="addoptions" v-if="formObj.options.length-1===index" />
											<Icon type="ios-remove-circle-outline" size="20" @click="removeoptions(index)" />
										</div>
									</div>
								</template>			

								
							</FormItem>
						</Form>
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formObj.jobid?'保存':'确定'}}</Button>
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
				btnoptions:true,
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
				optionsData:{
					options:'',
					optionsurl:'',
					sort:0
				},
				formObj:{
					questionlabe:'',
					questiontype:0,//0为单选；1为多选
					sort:0,
					options:[{
						options:'',
						optionsurl:'',
						sort:0
					}]
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
			this.productid=this.$route.params.id;
			this.questionid=this.$route.params.questionid;
			console.log(this.questionid,'this.questionid')
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
				window.history.back();
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


			add(){//添加投票
				this.formObj = {};
				this.formObj.isrealname="0";
				this.voteid=undefined;
				console.log(this.formObj,'this.formObj')
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},
			adminAction(){//添加并修改
				var s = this;
				var action = this.questionid ? voteActions.editquesion.action:voteActions.addquesion.action;

				let info = {
					voteid:this.$route.params.voteid,
					companyid:this.companyid,
					productid:this.productid,
					questionlabe:this.formObj.questionlabe,
					questiontype:this.formObj.questiontype,
					sort:this.formObj.sort,
					options:this.formObj.options				
				}
				

				if(s.questionid!=undefined){
					info.questionid=s.questionid
				}

				console.log(info,'info-info',s.questionid)
				zmitiUtil.ajax({
					remark:this.questionid ?　'editquesion':'addquesion',
					data:{
						action,
						info
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.closeMaskPage();
						if(data.getret === 0){
							//s.getDataList();
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
			addoptions(index){//添加选项
				/*this.formObj.options.push({
					options:this.optionsData.options,
					optionsurl:this.optionsData.optionsurl,
					sort:this.optionsData.sort
				})*/
				this.formObj.options.push({
					options:'',
					optionsurl:'',
					sort:0
				})
				let my={
					"action":"2001405",
					"info":{
						"voteid":"1",
						"companyid":1,
						"productid":"1599125954",
						"questionlabe":"国庆活动",
						"questiontype":"0",
						"sort":0,
						"options":[{
							"options":"选项1",
							"optionsurl":"1",
							"sort":0
						},{
							"options":"选项2",
							"optionsurl":"2222",
							"sort":0
						},{
							"options":"选项3",
							"optionsurl":"3333333",
							"sort":0
						}]
					},
					"ui":{"userid":4,"token":"da3d04b382d1d4ccec8b22f666c29ee2"}}
			},
			removeoptions(index){//移除选项
				this.formObj.options.splice(index);
			}
            

		}
	}
</script>
 