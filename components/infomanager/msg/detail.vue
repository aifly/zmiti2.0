<template>
	<div class="zmiti-informanagerdetail-main-ui">

		<div class="zmiti-list-main">
			
		
			 <div class='zmiti-informanagernews-table lt-full'>
				 <header class="zmiti-tab-header">
					 <div>
						 <span>编辑</span>

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
							<FormItem label="状态：">
							     <RadioGroup v-model="formObj.status">
							        <Radio label="0">禁用</Radio>
							        <Radio label="1">待审</Radio>
							        <Radio label="2">通过</Radio>
							        <Radio label="3">拒绝</Radio>
							    </RadioGroup>
							</FormItem>
							<FormItem label="内容：">
								<div style="line-height: 22px;">
								<UE
									:default-msg="formObj.content" 
									id="editor" 
									:config="editorOption" 
									@contentChanged="contentChange">				
									</UE>
								</div>
							</FormItem>
							<FormItem label="WORD加密文件：">
								<Input v-model="formObj.wordurl"></Input>
							</FormItem>
							<FormItem label="PDF加密文件：">
								<Input v-model="formObj.wordurl"></Input>
							</FormItem>
							<FormItem label="附件：">
								<Input v-model="formObj.wordurl"></Input>
								<div>提示：最多添加5个文件</div>
							</FormItem>
							<FormItem label="父级ID：">
								<Input v-model="formObj.fatherid" value="0"></Input>
								<div>提示：评论或回复时出现，默认为0表示没有父级</div>
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




	</div>
</template>

<style lang="scss" scoped>
	@import './detail.css';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import UE from '../../../common/ueditor' // 引入组件
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				targetKeys:[],
				showAvatarModal:false,				
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
				formObj:{
					productid:1072203850,
					title:'',
					status:'1',
					content:'',
					wordurl:'',
					pdfurl:'',
					filearray:[],
					fatherid:0,
					issecret:'0',
					allowreply:'1',
					visit:'0',
					remarks:'',
					users:[]
				},
				editorOption: {
					initialFrameWidth:'100%',
					initialFrameHeight:300,
					enableAutoSave:false,
					autoHeightEnabled:false,
					toolbars:[[
					'bold', 'italic', 'underline',  '|',
					'forecolor', 'backcolor', '|',
					'paragraph', 'fontfamily', 'fontsize', 'lineheight', '|',
					'insertorderedlist', 'insertunorderedlist', '|',
					'removeformat', 'blockquote', 'indent', '|',
					'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
					'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
					'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', '|',
					'source',
					'fullscreen'
					]]
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
			UE
		},

		beforeCreate(){
			
		},
		created(){
			this.companyid=zmitiUtil.getCurrentCompanyId().companyid;
		},
		mounted(){
			this.id=this.$route.params.id;
			this.typeid=this.$route.params.typeid;
			console.log(this.id,'this.id');
			console.log(this.typeid,'this.typeid');
			this.getnewsDetail();
		},

		watch:{	
			companyid(){
				this.getUserList();
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
				//this.$router.push({name:'infomanagermsg'});
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
					info.id=this.$route.params.id;
				}else{//新增
					if(s.formObj.users.length>0){//当有选中的用户时
						info.users=s.formObj.users;
					}
				}
				
				console.log(info)
				zmitiUtil.ajax({
					remark:this.id?'editnews':'addnews',
					data:{
						action,
						info
					},
					success(data){						
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg||data.getmsg);
						s.$router.push({name:'infomanagermsg',params:{typeid:s.$route.params.typeid}})
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
							console.log(s.formObj,'获取新闻详情s.formObj');			
						}
					}
				})
		    },
		    selectuserHandle(val){//选中的用户		    	
		    	this.formObj.users=val;
		    	console.log(this.formObj.users,'选中的用户');
		    }
		}
	}
</script>
 