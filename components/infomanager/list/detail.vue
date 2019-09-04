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
							<FormItem label="">
								<Button type="primary" @click="adminAction">提交</Button>
							</FormItem>
						</Form>
						
					</div>
				 </div>
			 </div>
		</div>



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
				productid:1072203850,
				title:'',
				begin_time:0,
				end_time:0,
				companyid:'',
				userSource:[],
				selectUsers:'',
				filedisabled:false,
				formObj:{
					productid:1072203850,
					title:'',
					status:'2',
					content:'',
					fatherid:0
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
			this.productid=this.$route.params.productid;
			this.typeid=this.$route.params.typeid;
			this.columntitle=this.$route.params.typename;
			console.log(this.id,'this.id');
			console.log(this.columntitle,'this.typename');
			if(this.$route.params.id!=undefined){
				this.getnewsDetail();
			}			
		},

		watch:{	
			companyid(){
				this.getUserList();
			}
		},
		computed:{
			editor() {
	            return this.$refs.myQuillEditor.quill;
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
				info.title=this.$options.filters.msg(this.formObj.content);//内容赋值给标题并过淲
				info.typeid=this.$route.params.typeid;
				if(this.id!=undefined){//编辑
					info.infoid=this.$route.params.id;
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
							s.formObj.title=data.info.title;
							s.formObj.content=data.info.content;							
							s.formObj.productid=s.productid;
							console.log(s.formObj,'获取新闻详情s.formObj');			
						}
					}
				})
		    },
		    selectuserHandle(val){//选中的用户		    	
		    	this.formObj.users=val;
		    	console.log(this.formObj.users,'选中的用户');
		    },
		    onEditorReady(editor) { // 准备编辑器
	        },
	        onEditorBlur(){}, // 失去焦点事件
	        onEditorFocus(){}, // 获得焦点事件
	        onEditorChange(quill, html, text){
	        	//console.log('editor change!', quill, html, text)
	        } // 内容改变事件
		},
		filters:{
			msg:function(msg){
	　　　　　　return msg.replace(/<[^<>]+>/g,'')
			},
			filterFun: function(value) {
	          if (value && value.length > 25) {
	            value = value.substring(0, 25) + "...";
	          }	    
	          return value;
	        }
	　　},
	}
</script>
 