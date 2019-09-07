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
				 <div class='zmiti-submit-main zmiti-scroll' ref="zmitiscroll" :style="{height:viewH - 110+'px'}">

<!-- 					<div class="zmiti-question-items" v-for="(item,index) in dataSource" :key="index">
						<div class="zmiti-question-h1">
							<div class="zmiti-h1-txt">{{item.questionlabe}}</div>
							<div class="zmiti-block-oper"  @click="currentQuestionStatus(index)"><span>{{item.status==true?'收起':'展开'}}</span></div>
						</div>
						<div class="zmiti-question-inner" v-show="item.status">
							<div style="display: none;">{{show}}</div>
							<div class="zmiti-question-sub"><label>类型：</label><div>{{item.questiontype==1?'多选':'单选'}}</div></div>						
							<template v-if="item.questionurl!=''">
								<div class="zmiti-question-sub">
									<label>图片：</label>
									<div><img :src="item.questionurl" class="zmiti-suboption-img"></div>
								</div>
							</template>
							<div class="zmiti-question-sub">
								<label>选项：</label>
								<div class="zmiti-question-ulist">
									<ul>
										<li v-for="(ele,idx) in item.options" :key="idx">
											
											<div class="zmiti-question-suboption">
												<template v-if="ele.optionsurl!=''">
													<img :src="ele.optionsurl" class="zmiti-suboption-img">
												</template>
												<div class="zmiti-question-suboption-txt">
													{{ele.options}}
												</div>
											</div>
											
										</li>
									</ul>
								</div>
							</div>
							<div class="zmiti-question-foot">
								<div class="zmiti-question-num">编号：{{item.questionid}}</div>						
								<div class="zmiti-question-oper">							
									<Poptip
								        confirm
								        title="您确认删除这条内容吗?"
								        @on-ok="deletequestion(item.questionid)"
								        @on-cancel="cancelpoptip">
								        <span class="zmiti-question-operbtn">删除</span>
								    </Poptip>
								    |<span class="zmiti-question-operbtn" @click="editQuestion(item.questionid)">编辑</span>
								</div>
							</div>
						</div>
					</div> -->
					<!-- 列表 -->
					<div class="zmiti-votemanagerviewquestion-list">
						<div class="zmiti-question-carditems" v-for="(item,index) in dataSource" :key="index">
					 		<Card :bordered="false">
					            <div class="zmiti-question-h1">
									<div class="zmiti-h1-txt">{{item.questionlabe}}</div>
									<div class="zmiti-block-oper"  @click="currentQuestionStatus(index)"><span>{{item.status==true?'收起':'展开'}}</span></div>
								</div>
					            <div style="display: none;">{{show}}</div>
					            <div class="zmiti-question-carditems-form" v-if="item.status">
									<Form class='zmiti-add-form-C' :model="item" :label-width="80">
										<FormItem label="投票项：">
											<Input v-model="item.questionlabe" placeholder="投票项"></Input>
										</FormItem>
										<FormItem label="图片：">
											<div><Button icon="ios-cloud-upload-outline" @click="showPicture= true">选择图片</Button></div>
											<div class="zmiti-question-thumbimg" v-if="item.questionurl"><img :src="item.questionurl"></div>
										</FormItem>
										<FormItem label="类型：">
											<RadioGroup v-model="item.questiontype">
										        <Radio :label="0">单选</Radio>
										        <Radio :label="1">多选</Radio>
										    </RadioGroup>
										</FormItem>
										<FormItem label="选项：">
											<template v-if="item.options.length>0">
												<div class="zmiti-votemanagerview-options" v-for="(ele,idx) in item.options" :key="idx">
													<!-- <div style="width:50px;margin-right: 5px;">
														<Input v-model="ele.sort" placeholder="排序" ></Input>
													</div> -->
													<div class="zmiti-options-content" v-if="ele.optionsurl!=''">
														<div class="zmiti-options-item-imgurl" style="width: 80px;" >
															<img :src="ele.optionsurl" style="width:80px;height:80px;">															
														</div>
														<div class="zmiti-options-item zmiti-options-item-subcon" style="margin-right: 5px;">
															<Input type="textarea" v-model="ele.options" placeholder="选项内容" style="margin-right: 5px;"></Input>	
														</div>
													</div>
													<div v-else class="zmiti-options-item" style="margin-right: 5px;">
														<Input v-model="ele.options" placeholder="选项内容" style="margin-right: 5px;"></Input>	
													</div>
													<div class="zmiti-options-btns" style="width:120px;">
														<Icon type="ios-image-outline" size="20" @click="openUploadImg(item.questionid,idx)" />
														<Icon type="md-open" size="20" @click="editOptions(index,ele.optionsid,idx)" />
														<Icon type="ios-add-circle-outline" size="20" @click="addoptions(item.questionid,index)" v-if="item.options.length-1===idx" />
														<Icon type="ios-remove-circle-outline" size="20" @click="deleteQuestionOptions(index,ele.optionsid,idx)" />
													</div>
												</div>
											</template>
										</FormItem>
									</Form>
									<div class="zmiti-question-cardfoot">
										<div class="zmiti-question-num">编号：{{item.questionid}}</div>						
										<div class="zmiti-question-oper">							
											<Poptip
										        confirm
										        title="您确认删除这条内容吗?"
										        @on-ok="deletequestion(item.questionid)"
										        @on-cancel="cancelpoptip">
										        <span class="zmiti-question-operbtn">删除</span>
										    </Poptip>
										    |<span class="zmiti-question-operbtn" @click='adminAction(index)'>保存</span>
										</div>
									</div>
								</div>							
							</Card>
						</div>
					</div>
					<!-- 翻页 -->
					<div class="zmiti-page-question" v-if="total>10">
						<Page :total="total" 
						size="small" 
						@on-change="change"
						:page-size='condition.page_size'
						show-total />
					</div>
					<!-- 添加 -->
					
				 	<div class="zmiti-votemanagerviewquestion-list" v-if="formstatus==true" >
				 		<Card :bordered="false">
				            <p slot="title">新增</p>
							<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
								<FormItem label="投票项：">
									<Input v-model="formObj.questionlabe" placeholder="投票项"></Input>
								</FormItem>
								<FormItem label="图片：">
									<div><Button icon="ios-cloud-upload-outline" @click="showPicture= true">选择图片</Button></div>
									<div class="zmiti-question-thumbimg" v-if="formObj.questionurl"><img :src="formObj.questionurl"></div>									
									<!-- <Input v-model="formObj.questionurl" placeholder="图片地址"></Input> -->
								</FormItem>
								<FormItem label="类型：">
									<RadioGroup v-model="formObj.questiontype">
								        <Radio :label="0">单选</Radio>
								        <Radio :label="1">多选</Radio>
								    </RadioGroup>
								</FormItem>
								<template v-if="showFormOptions==true">
									<FormItem label="选项：">
										<template v-if="formObj.options.length>0">
											<div class="zmiti-votemanagerview-options" v-for="(item,index) in formObj.options" :key="index">
												<!-- <div style="width:80px;margin-right: 5px;">
													<Input v-model="item.sort" placeholder="排序" ></Input>
												</div> -->
												
												
												<div class="zmiti-options-content" v-if="item.optionsurl!=''">
													<div class="zmiti-options-item-imgurl" style="width: 80px;" >
														<img :src="item.optionsurl" style="width:80px;height:80px;">															
													</div>
													<div class="zmiti-options-item zmiti-options-item-subcon" style="margin-right: 5px;">
														<Input type="textarea" v-model="item.options" placeholder="选项内容" style="margin-right: 5px;"></Input>	
													</div>
												</div>
												<div v-else class="zmiti-options-item" style="margin-right: 5px;">
													<Input v-model="item.options" placeholder="选项内容" style="margin-right: 5px;"></Input>	
												</div>
												<!-- <div class="zmiti-options-item zmiti-options-item-imgurl">
													<Input v-model="item.optionsurl" placeholder="图片地址"></Input>
													
												</div> -->
												<div class="zmiti-options-btns" style="width: 120px;">
													<Icon type="ios-image-outline" size="20" @click="openUploadImg(-1,index)" />
													<Icon type="ios-add-circle-outline" size="20" @click="addoptions(0)" v-if="formObj.options.length-1===index" />
													<Icon type="ios-remove-circle-outline" size="20" @click="removeoptions(-1,-1,index)" />
												</div>
											</div>									
										</template>								
									</FormItem>
								</template>
								<FormItem label="">
									<Button size='large' type='primary' @click='adminAction(-1)'>确定</Button>
								</FormItem>
							</Form>
						</Card>
					</div>

					<div class="zmiti-question-addhandle">
						<Button size="large" type="dashed" icon="md-add" @click="add">添加投票项</Button>
					</div>
				 </div>
			 </div>
		</div>
		<!-- 选择配图 -->
		<Modal v-model="showPicture" title='资料库' width='800'>
			<ResourceList v-if='showPicture' :isAdmin='false' :isDialog='true' @onFinished='onFinishPicture'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;' @click="showPicture=false;">取消</Button>
				<Button style='width:100px;' type='primary' @click='choosePicture'>确定</Button>
			</div> 
		</Modal>
		<!-- 选择子项图片 -->
		<Modal v-model="showSubimg" title='资料库' width='800'>
			<ResourceList v-if='showSubimg' :isAdmin='false' :isDialog='true' @onFinished='onFinishSubimg'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;' @click="showSubimg=false;">取消</Button>
				<Button style='width:100px;' type='primary' @click='chooseSubimg(currentOptionIndex)'>确定</Button>
			</div> 
		</Modal>
	</div>
</template>
<style type="text/css">
	textarea.ivu-input{resize: none;}
	.zmiti-options-item-subcon textarea
	{
		height: 80px;
		border-radius: 0;
	}
</style>
<style lang="scss" scoped>
	@import './index.scss';
	.zmiti-votemanagerview-options{
		align-items: inherit;
	}
	.zmiti-options-content{
		flex:1;
		display:flex;
		flex-flow: row;
	}
	.zmiti-options-item-subcon{
		margin-left:0px;
	}

</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
	import ZmitiMask from '../../../common/mask/';
	import ResourceList from '../../../common/resourcelist'
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions,voteActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				formstatus:false,
				show:false,
				showPicture:false,
				currentChoosePicture:{},
				currentOptionIndex:0,
				showSubimg:false,
				currentChooseSubimg:{},
				showFormOptions:true,
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
				optionsid:undefined,
				formObj:{
					questionlabe:'',
					questiontype:0,//0为单选；1为多选
					sort:0,
					questionurl:'',
					options:[{
						options:'',
						optionsurl:'',
						sort:0
					}]
				},
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
			ZmitiTable,
			ResourceList
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
				this.formstatus=true;
				this.questionid=undefined;			
				this.showFormOptions=true;
				this.formObj={
					questionlabe:'',
					questiontype:0,//0为单选；1为多选
					sort:0,
					questionurl:'',
					options:[{
						options:'',
						optionsurl:'',
						sort:0
					}]
				}
				this.dataSource.forEach((item,idx)=>{
					item.status=false;
				})
			},
			editQuestion(questionid){//编辑投票项
				console.log(this.dataSource,'当前的dataSource');
				let currentDatas=this.dataSource.filter((item)=>questionid==item.questionid);
				this.formObj=currentDatas[0];
				this.formObj.questiontype=currentDatas[0].questiontype;

				console.log(this.formObj,'当前的数据');
				this.showFormOptions=false;//编辑时隐藏选项
				this.questionid=questionid;
				this.scrollthis();
			},
			deletequestion(questionid){//删除投票项
				var s = this;
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
            cancelpoptip(){//关闭删除提示框
            	
            },
            /*以下为操作项*/
            adminAction(index){//添加问题并修改
				var s = this;
				let info = {
					voteid:this.$route.params.voteid,
					companyid:this.companyid,
					productid:this.productid									
				}
				var action='';
				if(index<0){
					//新增时
					action = voteActions.addquesion.action;
					info.questionlabe=s.formObj.questionlabe;
					info.questiontype=s.formObj.questiontype;
					info.questionurl=s.formObj.questionurl;
					info.sort=s.formObj.sort;
					info.options=s.formObj.options;
				}else{//编辑时
					s.questionid=s.dataSource[index].questionid;
					action = voteActions.editquesion.action;
					info.questionid=s.dataSource[index].questionid;
					info.questionlabe=s.dataSource[index].questionlabe;
					info.questiontype=s.dataSource[index].questiontype;
					info.questionurl=s.dataSource[index].questionurl;
					info.sort=s.dataSource[index].sort;	
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
						if(data.getret === 0){
							s.getDataList();
							if(s.formstatus==true){//新增后恢复表单
								s.formObj={
									questionlabe:'',
									questiontype:0,
									sort:0,
									questionurl:'',
									options:[{
										options:'',
										optionsurl:'',
										sort:0
									}]
								}
								s.optionsid=undefined;
								s.questionid=undefined;
							}
						}
					}
				})
			},
            addoptions(questionid,index){//添加选项            	
            	if(questionid>0){
            		this.questionid=questionid;
            		this.dataSource[index].options.push({
						options:'',
						optionsurl:'',
						sort:0
					})				
            	}else{
					this.formObj.options.push({
						options:'',
						optionsurl:'',
						sort:0
					})
				}
				this.optionsid=undefined;
			},
			removeoptions(index){//移除选项
				this.formObj.options.splice(index,1);
			},
			/*以下为选项的修改和删除*/
			editOptions(questionindex,optionsid,index){//修改选项
				var s = this;				
				var formObj=s.dataSource[questionindex].options[index];//获取第N个选项的内容
				s.optionsid=optionsid;
				s.questionid=s.dataSource[questionindex].questionid;
				var action = s.optionsid ? voteActions.editQuesionOption.action:voteActions.addQuesionOption.action;
				let info={
					voteid:s.voteid,
					companyid:s.companyid,
					productid:s.productid,
					questionid:s.questionid
				}
				let listinfo={
					options:formObj.options,
					optionsurl:formObj.optionsurl,
					sort:formObj.sort
				}

				var datainfo={
					action:action,
					info:info
				}
				if(optionsid!=undefined){
					datainfo.info.optionsid=formObj.optionsid;
					datainfo.info.options=formObj.options
					datainfo.info.optionsurl=formObj.optionsurl
					datainfo.info.sort=formObj.sort					
				}else{				
					datainfo.list=[{
						options:formObj.options,
						optionsurl:formObj.optionsurl,
						sort:formObj.sort
					}]
				}
				console.log(datainfo,'editOptions');
				console.log(optionsid,'optionsid===optionsid');
				zmitiUtil.ajax({
					remark:s.optionsid ?　'editQuesionOption':'addQuesionOption',
					data:datainfo,
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						if(data.getret === 0){
							s.getDataList();
							//重新获取当前投票项的数据
							setTimeout(()=>{
								s.editQuestion(s.questionid);
								s.dataSource[questionindex].status=true;
								console.log(s.dataSource[questionindex].options[index],'options====index====')
							},1000)
						}
					}
				})
			},
			deleteQuestionOptions(questionindex,optionsid,index){//删除选项
				var s = this;
				if(optionsid){
					zmitiUtil.ajax({
						remark:'deleteQuesionOption',
						data:{
							action:voteActions.deleteQuesionOption.action,
							info:{
								companyid:s.companyid,
								productid:s.productid,
								optionsid:optionsid
							}
						},
						success(data){						
							s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
							if(data.getret === 0){
								//console.log(s.formObj.options[index],'s.formObj.options[index]===',index);
								setTimeout(()=>{
									//s.formObj.options.splice(index,1);
									s.dataSource[questionindex].options.splice(index,1);
								},1000)
								
							}
						}
					})
				}else{//没有新选项写入时的移除
					s.removeoptions(index);
				}
			},
			currentQuestionStatus(index){//切换显示与隐藏
				this.formstatus=false;//隐蔽添加投票项的表单
				var s = this;
				this.show=!this.show;
				this.dataSource.forEach((item,idx)=>{
					if(index===idx){
						item.status=s.show
					}else{
						item.status=false;
					}
				})
			},
			scrollthis(){//滚动到底部
				var div = this.$refs.zmitiscroll;
				div.scrollTop = div.scrollHeight;
			},
			filedstring(val){
				return val.toString();
			},
			/**以下为选择配图**/
		    onFinishPicture(item){
				this.currentChoosePicture = item;
			},
			choosePicture(){
				this.showPicture = false;
				this.formObj.questionurl=this.currentChoosePicture.filepath;
			},
			/**以下为子选项图片**/
			openUploadImg(questionid,index){				
				this.questionid=questionid;
				this.currentOptionIndex=index;
				this.showSubimg = true;
			},
		    onFinishSubimg(item){
				this.currentChooseSubimg = item;
			},
			chooseSubimg(){
				this.showSubimg = false;
				let currentOptionIndex=this.currentOptionIndex;
				let filepath=this.currentChooseSubimg.filepath;
				let questionid=this.questionid;
				if(this.questionid>0){//编辑选项时的图片
					let currentDatas=this.dataSource.filter((item)=>questionid==item.questionid);
					let formObj=currentDatas[0].options[currentOptionIndex];
					formObj.optionsurl=filepath;
				}else{//新增表单中的选项图片
					this.formObj.options[currentOptionIndex].optionsurl=filepath;
				}				
			},

		}
	}
</script>
 