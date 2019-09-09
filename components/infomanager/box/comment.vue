<template>
	<div class="zmiti-informanagercomment-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanagernews-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <!-- <span>{{typename}}</span> -->
						 {{articletitle | filterFun}}
					 </div>
					 <div>
					 	<Button type="primary" @click='add()'>添加</Button>
					 	<Button type="default" @click='goback()'>返回</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
				 	<!-- <div class="zmiti-parent-info">
				 		<label>信息标题：</label>
				 		<section>{{articletitle | filterFun}}</section>
				 	</div> -->
					<section class="zmiti-list-where">
				 		<Input placeholder="请输入评论标题" v-model="title" style="width: 200px;"></Input>
				 		<div class="zmiti-search-dates">
				        	<DatePicker type="daterange" :start-date="new Date(2018, 12, 1)" placement="bottom-end" placeholder="选择时间段" style="width: 200px" @on-change="selectDates"></DatePicker>
				        </div>
				        <Button icon="md-search" @click="searchHandle">搜索</Button>
				        <Select v-model="statusVal" @on-change="infoStatus" style="margin-left:auto;width:120px">
					        <Option v-for="item in selectStatus" :value="item.value" :key="item.value">{{ item.label }}</Option>
					    </Select>
				 	</section>
					<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total">
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
							<span>评论</span>
						</header>
					
						<Form class='zmiti-add-form-C' :model="formObj" :label-width="80">
							<FormItem label="标题：">
								<Input v-model="formObj.title" placeholder="标题"></Input>
							</FormItem>
							<FormItem label="内容：">
								<div class="edit_container">
							        <quill-editor 
							            v-model="formObj.content" 
							            ref="myQuillEditor" 
							            :options="editorQuillOption" 
							            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
							            @change="onEditorChange($event)">
							        </quill-editor>
							    </div>
							</FormItem>
							<FormItem label="word文件：">
								<div><Button icon="ios-cloud-upload-outline" @click="showWord= true">选择word文件</Button></div>
								<Input v-model="formObj.wordurl" placeholder="请输入word文件地址" clearable></Input>								
							</FormItem>
							<FormItem label="pdf文件：">
								<div><Button icon="ios-cloud-upload-outline" @click="showPdf= true">选择pdf文件</Button></div>
								<Input v-model="formObj.pdfurl" placeholder="请输入pdf文件地址" clearable></Input>
							</FormItem>
							<FormItem label="附件：">
								<!-- <Input v-model="formObj.filearray" placeholder="请输入附件地址"></Input> -->
								<div><Button icon="ios-cloud-upload-outline" @click="showResource= true" :disabled="filedisabled">选择附件</Button> 提示：最多添加5个文件</div>
								<div>
									<ul>
										<li v-for="(item,index) in myfiles" :key="index">
											<Input :element-id="index.toString()" :value="item" @on-change="filesHandle"><Icon class="zmiti-remove-icon" type="ios-trash-outline" size="20" slot="suffix" @click="handleDelete(index)" /></Input>
										</li>
									</ul>
								</div>
							</FormItem>
							<FormItem label="状态：">
							     <RadioGroup v-model="formObj.status">
							        <Radio label="0">禁用</Radio>
							        <Radio label="1">待审</Radio>
							        <Radio label="2">通过</Radio>
							        <Radio label="3">拒绝</Radio>
							    </RadioGroup>
							</FormItem>
						</Form>
						<div class='zmiti-add-form-item zmiti-add-btns'>
							<Button size='large' type='primary' @click='adminAction'>{{formObj.jobid?'保存':'确定'}}</Button>
						</div>
					</section>
				</transition>
			</div>
		</ZmitiMask>
		<!-- 选择WORD -->
		<Modal v-model="showWord" title='资料库' width='800'>
			<ResourceList v-if='showWord' :isAdmin='false' :isDialog='true' @onFinished='onFinishWord'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;' @click="showWord=false;">取消</Button>
				<Button style='width:100px;' type='primary' @click='chooseWord'>确定</Button>
			</div> 
		</Modal>
		<!-- 选择PDF -->
		<Modal v-model="showPdf" title='资料库' width='800'>
			<ResourceList v-if='showPdf' :isAdmin='false' :isDialog='true' @onFinished='onFinishPdf'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;' @click="showPdf=false;">取消</Button>
				<Button style='width:100px;' type='primary' @click='choosePdf'>确定</Button>
			</div> 
		</Modal>
		<!-- 选择多个附件 -->
		<Modal v-model="showResource" title='资料库' width='800'>
			<ResourceList v-if='showResource' :isAdmin='false' :isDialog='true' @onFinished='onFinished'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;' @click="showResource=false;">取消</Button>
				<Button style='width:100px;' type='primary' @click='chooseImg'>确定</Button>
			</div> 
		</Modal>
	</div>
</template>
<style type="text/css">
.ql-container{min-height: 200px;}
.ql-snow{line-height: 24px!important;}
.edit_container{background: #ffffff;}
</style>
<style lang="scss" scoped>
	@import './comment.css';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
	import ZmitiMask from '../../../common/mask/';
	import ResourceList from '../../../common/resourcelist'
	import { quillEditor } from 'vue-quill-editor'
	import '../../../common/css/quill.css'
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				columntitle:'',
				articletitle:'',
				typename:'',
				myfiles:[],
				showAvatarModal:false,	
				showResource:false,
				showWord:false,
				showPdf:false,			
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
				showDetailPage:-1,
				currentChooseResource:{},
				currentChooseWord:{},
				currentChoosePdf:{},
				dataSource:[],				
				showTable:false,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				id:'',
				typeid:1,
				productid:0,
				title:'',
				begin_time:0,
				end_time:0,
				companyid:'',
				userSource:[],
				selectUsers:'',
				filedisabled:false,
				formObj:{
					title:'',
					productid:0,
					content:'',
					status:'1',
					wordurl:'',
					pdfurl:'',
					filearray:''					
				},
				commentDetail:[],
				editorQuillOption: {
					modules: {
			            toolbar: [
			              ['bold',{ 'indent': '-1' }, { 'indent': '+1' },{ 'color': [] },{ 'align': [] },'clean']
			            ],
			            syntax: {
			              highlight: text => hljs.highlightAuto(text).value
			            }
			        }
				},
				statusVal:'-1',
				selectStatus:[{
                    value: '-1',
                    label: '全部'
                },{
                    value: '0',
                    label: '禁用'
                },{
                    value: '1',
                    label: '待审'
                },{
                    value: '2',
                    label: '通过'
                },{
                    value: '3',
                    label: '拒绝'
                }],
		        statusList:[{
                    value: 0,
                    label: '禁用'
                },{
                    value: 1,
                    label: '待审'
                },{
                    value: 2,
                    label: '通过'
                },{
                    value: 3,
                    label: '拒绝'
                },],
                columns:[
					{
						title:"编号",
						key:'infoid',
						align:'center',
						width:120
					},
					{
						title:"标题",
						key:'title',
						align:'center',
						
					},
					{
						title:"状态",
						key:'status',
						align:'center',
						render:(h,params)=>{
							let status='';
							let color='#2d8cf0';
							switch(params.row.status){
								case 0:
									status='禁用'
									color='#000';									
								break;
								case 2:
									status='通过'
									color='#19be6b';
								break;
								case 3:
									status='拒绝'
									color='#ed4014';
								break;
								default:
									status='待审'
							}


							return h('span',{
									style:{
										color:color
									}
							},status)
  						}
					},
					{
						title:"时间",
						key:"createtime",
						align:"center",
						width:120,
						render:(h,params)=>{
							return h('div',{},formatDate(params.row.createtime))
						}
					},
					{
						title:"操作",
						key:"action",
						align:"center",
						width:180,
						render:(h,params)=>{

							return h('div', [
								h('span',{
									style:{
										cursor:'pointer',
										color:"rgb(0, 102, 204)",
										marginRight:'10px'
									},
									on:{
										click:()=>{
											//this.formObj = params.row;											
											this.getnewsDetail(params.row.infoid);
											Vue.obserable.trigger({
												type:'toggleMask',
												data:true
											})
										}
									}
								},'编辑'),
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
								])
                            ]);
							
							 
						}
					}
				]
			}
		},
		components:{
			ZmitiTable,
			ZmitiMask,
			ResourceList,
			quillEditor
		},

		beforeCreate(){
			
		},
		created(){
			this.companyid=zmitiUtil.getCurrentCompanyId().companyid;

		},
		mounted(){
			this.id=this.$route.params.id;
			this.typeid=this.$route.params.typeid;
			this.productid=this.$route.params.productid;
			this.formObj.productid=this.$route.params.productid;
			this.typename=this.$route.params.typename;
			console.log(this.id,'this.id');
			console.log(this.typeid,'this.typeid');
			setTimeout(()=>{
				this.getnewsDetail(this.$route.params.id);
			},100);
			this.getDataList();
		},

		watch:{	
			statusVal(){//当status发生变化时重新加载信息列表
				this.getDataList();
			},
			myfiles(){
				this.filedisabled=this.myfiles.length===5?true:false
			}
		},
		
		methods:{
			change(e){
				this.condition.page_index = e -1;
				this.getDataList();
			},

			goback(){
				window.history.go(-1);
			},
			selectDates(val){//按时间段查询
				console.log(val,'选择的时间');
				this.begin_time=Date.parse(new Date(val[0]))/1000;
				this.end_time=Date.parse(new Date(val[1]))/1000;
				console.log(this.begin_time+' '+this.end_time,'选择的时间戳');
			},
			searchHandle(){//搜索
				this.getDataList();
			},
			infoStatus(val){//根据状态筛选
				this.statusVal=val;
				this.condition.page_index=0;
				this.currentNumber=1;
				console.log(this.statusVal,'选中的状态');
			},
			closeMaskPage(){
				console.log('关闭右侧');
				Vue.obserable.trigger({type:'toggleMask',data:false});
			},
			add(){				
				this.formObj={
					title:'',
					productid:this.$route.params.productid,
					content:'',
					status:'2',
					wordurl:'',
					pdfurl:'',
					filearray:''					
				}
				Vue.obserable.trigger({type:'toggleMask',data:true});
				console.log(this.formObj,'this.formObj');
			},
			getDataList(){
				var s = this;
				var {condition} = this;
				condition = Object.assign(condition,{
					typeid:s.typeid,
					fatherid:s.$route.params.id,
					productid:s.productid,
					title:s.title,
					begin_time:s.begin_time,
					end_time:s.end_time,
					status:s.statusVal
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
						}else{
							s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
							s.dataSource =[];
						}						
					}
				})
			},
			adminAction(){
				var s = this;
				var action = this.formObj.infoid!=undefined?infomanagerActions.editnews.action:infomanagerActions.addnews.action;
				let info = this.formObj;
				info.fatherid=this.$route.params.id;
				if(this.formObj.infoid!=undefined){//编辑
					info.infoid=this.formObj.infoid;
					console.log(info.infoid,'评论编辑');
				}else{
					info.typeid=this.typeid;
					console.log(info.infoid,'评论新增');
				}
				
				console.log(info,'评论的内容');
				zmitiUtil.ajax({
					remark:this.formObj.infoid?'editnews':'addnews',
					data:{
						action,
						info
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.closeMaskPage();//关闭右侧
						s.getDataList();//重新加载信息列表
						window.location.reload();//刷新
					}
				})
			},
			contentChange (val) { // 改变父组件数据
		      this.formObj.content = val
		    },
		    getnewsDetail(id){//根据infoid获取新闻标题
		    	var s = this;
		    	console.log(id,'当前文章id')
		    	zmitiUtil.ajax({
					remark:"getnewsDetail",
					data:{
						action:infomanagerActions.getnewsDetail.action,
						infoid:id,
						productid:s.productid
					},
					success(data){
						if(data.getret === 0){
							if(s.$route.params.id==id){
								s.articletitle=data.info.title;//获取父级文章标题
							}else{
								s.formObj=data.info;//获取当前文章内容
								s.formObj.status=data.info.status.toString();
								s.formObj.productid=s.productid;
								s.formObj.infoid=id;
								s.myfiles=data.info.filearray.split(',');//获取附件地址并拆分为数组
								console.log(s.formObj,'this.formObj')
							}							
						}
					}
				})
		    },
		    delete(infoid){//删除评论
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
			},
		    onEditorReady(editor) { // 准备编辑器
	        },
	        onEditorBlur(){}, // 失去焦点事件
	        onEditorFocus(){}, // 获得焦点事件
	        onEditorChange(quill, html, text){
	        	//console.log('editor change!', quill, html, text)
	        }, // 内容改变事件
	        /**以下为选择word**/
		    onFinishWord(item){//选择word后
				this.currentChooseWord = item;
			},
			chooseWord(){//选择word
				this.showWord = false;
				this.formObj.wordurl=this.currentChooseWord.filepath;
			},
			/**以下为选择pdf**/
		    onFinishPdf(item){//选择word后
				this.currentChoosePdf = item;
			},
			choosePdf(){//选择word
				this.showPdf = false;
				this.formObj.pdfurl=this.currentChoosePdf.filepath;
			},
		    /**以下为选择多个附件**/
		    onFinished(item){//选择多个附件后
				this.currentChooseResource = item;
			},
			chooseImg(){//选择多个附件
				this.showResource = false;
				let filelist=this.currentChooseResource.filepath;
				this.myfiles.push(this.currentChooseResource.filepath)
				console.log(this.myfiles,'选择的文件');
				this.formObj.filearray=this.myfiles.join(',');
				console.log(this.formObj.filearray,'全部文件地址');
			},
			filesHandle(ele){
				let iptval=ele.target.value;//获取输入的内容
				let iptid=Number(ele.target.id);//获取当前索引并转为数字
				this.myfiles[iptid]=iptval;//根据索引更新当前第N个的值
				//console.log(this.myfiles);
				let newurl=this.myfiles.join(',');
				this.formObj.filearray=newurl;
				console.log(this.myfiles,'更新后地址',newurl);
			},
			handleDelete(index){//删除单个附件地址
				this.myfiles.splice(index,1);
				let newurl=this.myfiles.join(',');
				this.formObj.filearray=newurl;
				console.log(this.myfiles,'删除后地址',newurl);
			},
		},
		filters: {
	        filterFun: function(value) {
	          if (value && value.length > 20) {
	            value = value.substring(0, 20) + "...";
	          }
	    
	          return value;
	        }
	    }
	}
</script>
 