<template>
	<div class="zmiti-informanagerdetail-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanagernews-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>{{columntitle}}</span>

					 </div>
					 <div>
					 	<Button type="primary" @click='goback()'>返回</Button>
					 </div>
				 </header>
				 <div class='zmiti-submit-main zmiti-scroll' :style="{height:viewH - 110+'px'}">
					<div class="zmiti-informanagerdetail-form">					
						<Form :model="formObj" :label-width="120">
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
							<FormItem label="WORD加密文件：">
								<div><Button icon="ios-cloud-upload-outline" @click="showWord= true">选择word文件</Button></div>
								<Input v-model="formObj.wordurl"></Input>
							</FormItem>
							<FormItem label="PDF加密文件：">
								<div><Button icon="ios-cloud-upload-outline" @click="showPdf= true">选择pdf文件</Button></div>
								<Input v-model="formObj.pdfurl"></Input>
							</FormItem>
							<FormItem label="附件：">
								<div><Button icon="ios-cloud-upload-outline" @click="showResource= true" :disabled="filedisabled">选择附件</Button> 提示：最多添加5个文件</div>
								<!-- <Input v-model="formObj.filearray"></Input> -->
								<div>
									<ul>
										<li v-for="(item,index) in myfiles" :key="index">
											<Input :element-id="index.toString()" :value="item" @on-change="filesHandle"><Icon class="zmiti-remove-icon" type="ios-trash-outline" size="20" slot="suffix" @click="handleDelete(index)" /></Input>
										</li>
									</ul>
								</div>
							</FormItem>
							<FormItem label="加密：">
								<RadioGroup v-model="formObj.issecret">
							        <Radio label="0">否</Radio>
							        <Radio label="1">是</Radio>
							    </RadioGroup>
							</FormItem>
							<FormItem label="允许回复：">
								<RadioGroup v-model="formObj.allowreply">
							        <Radio label="1">是</Radio>
							        <Radio label="0">否</Radio>
							    </RadioGroup>
							</FormItem>							
							<FormItem label="访问权限：">
								<RadioGroup v-model="formObj.visit">
							        <Radio label="0">全部人员</Radio>
							        <Radio label="1">指定人员</Radio>
							    </RadioGroup>
							    <div v-if="this.id===undefined">
							    	<template v-if="parseInt(formObj.visit)===1">
							    		<Select v-model="selectUsers" @on-change="selectuserHandle" multiple style="width:260px">
									        <Option v-for="item in userSource" :value="item.value" :key="item.value">{{ item.label }}</Option>
									    </Select>
							    	</template>
							    </div>
							</FormItem>
							<FormItem label="备注：">
								<Input v-model="formObj.remarks"></Input>
							</FormItem>
							<FormItem label="">
								<Button type="primary" @click="adminAction">提交</Button>
							</FormItem>
						</Form>
						
					</div>
				 </div>
			 </div>
		</div>
		<!-- 选择WORD -->
		<Modal v-model="showWord" title='资料库' width='800'>
			<ResourceList v-if='showWord' :isAdmin='false' :isDialog='true' type='doc|docx' @onFinished='onFinishWord'></ResourceList>
		</Modal>
		<!-- 选择PDF -->
		<Modal v-model="showPdf" title='资料库' width='800'>
			<ResourceList v-if='showPdf' :isAdmin='false' :isDialog='true' type='pdf' @onFinished='onFinishPdf'></ResourceList>
		</Modal>
		<!-- 选择多个附件 -->
		<Modal v-model="showResource" title='资料库' width='800'>
			<ResourceList v-if='showResource' :isAdmin='false' :isDialog='true' @onFinished='onFinished'></ResourceList>
		
		</Modal>


	</div>
</template>
<style type="text/css">
.ql-container{min-height: 200px;}
.ql-snow{line-height: 24px!important;}
.edit_container{background: #ffffff;}
</style>
<style lang="scss" scoped>
	@import './detail.css';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import { quillEditor } from 'vue-quill-editor'
	import '../../../common/css/quill.css'
	import ResourceList from '../../../common/resourcelist'
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions,resourceActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				columntitle:'',
				targetKeys:[],
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
					productid:0,
					title:'',
					status:'2',
					content:'',
					wordurl:'',
					pdfurl:'',
					filearray:'',
					fatherid:0,
					issecret:'0',
					allowreply:'1',
					visit:'0',
					remarks:'',
					users:[]
				},
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
                },]
			}
		},
		components:{
			quillEditor,
			ResourceList
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
			this.columntitle=this.$route.params.typename;
			console.log(this.id,'this.id');
			console.log(this.typeid,'this.typeid');
			this.getnewsDetail();
		},

		watch:{	
			companyid(){
				this.getUserList();
			},
			myfiles(){
				this.filedisabled=this.myfiles.length===5?true:false
			}
		},
		
		methods:{
			getUserList(){
				var s = this;			
				zmitiUtil.ajax({
					remark:'getUserList',
					data:{
						action:userActions.getCompanyUserList.action,
						condition:{
							page_index:0,
							page_size:100,
							companyid:this.companyid,
							status:1
						}
					},
					success(data){
						if(data.getret === 0){
							data.list.forEach((item,index)=>{
								s.userSource.push({									
									label:item.user.realname,
									value:item.userid
								})								
							})
							//console.log(s.userSource,'s.userSource')

						}
					}
				})
			},
			goback(){
				window.history.go(-1);
			},
			add(){
				this.formObj = {};
				
			},
			adminAction(){
				var s = this;
				var action = this.id!=undefined?infomanagerActions.editnews.action:infomanagerActions.addnews.action;
				let info = this.formObj;
				info.typeid=this.$route.params.typeid;
				if(this.id!=undefined){//编辑
					info.infoid=this.$route.params.id;
				}else{//新增
					if(s.formObj.users.length>0){//当有选中的用户时
						info.users=s.formObj.users;
					}
				}
				
				console.log(info);
				zmitiUtil.ajax({
					remark:this.id?'editnews':'addnews',
					data:{
						action,
						info
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						setTimeout(()=>{
							window.history.go(-1);
						},1000);
					}
				})
			},
			contentChange (val) { // 改变父组件数据
		      this.formObj.content = val
		    },
		    getnewsDetail(){
		    	var s = this;
		    	zmitiUtil.ajax({
					remark:"getnewsDetail",
					data:{
						action:infomanagerActions.getnewsDetail.action,
						infoid:this.$route.params.id,
						productid:this.productid
					},
					error(){
						s.loading = false;
					},
					success(data){
						s.loading = false;

						console.log(data.info,'获取新闻详情');
						if(data.getret === 0){
							s.formObj=data.info;
							s.formObj.allowreply=data.info.allowreply.toString();
							s.formObj.issecret=data.info.issecret.toString();
							s.formObj.status=data.info.status.toString();
							s.formObj.visit=data.info.visit.toString();
							s.formObj.productid=s.productid;
							s.myfiles=data.info.filearray.split(',');//获取附件地址并拆分为数组
							console.log(s.formObj,'获取新闻详情s.formObj');			
						}
					}
				})
		    },
		    selectuserHandle(val){//选中的用户		    	
		    	this.formObj.users=val;
		    	console.log(this.formObj.users,'选中的用户');
		    },
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
				
				if(item.fileextname !== 'pdf'){
					this.$Message.error('请选择pdf文件');
					return;
				}
				this.formObj.currentChoosePdf = item.filepath;

				zmitiUtil.ajax({
					remark:'filetoimg',
					_ui:{
						type:2,
					},
					data:{
						action:resourceActions.fileToImage.action,
						info:{
							pdfurl:item.filepath
						}
					},
					success(data){
						console.log(data);
					}
				})
				
				console.log(this.formObj.currentChoosePdf);

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
			onEditorReady(editor) { // 准备编辑器
	        },
	        onEditorBlur(){}, // 失去焦点事件
	        onEditorFocus(){}, // 获得焦点事件
	        onEditorChange(quill, html, text){
	        	//console.log('editor change!', quill, html, text)
	        } // 内容改变事件
		}
	}
</script>
 