<template>
	<div class="zmiti-news-main-ui" style="background-color: #ffffff;">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>新闻管理</div>
				<div>
					<Button type="default"><router-link :to="{name:'news'}">返回</router-link></Button>
					
				</div>
			</header>
			
			<div class='zmiti-news-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div style="padding-right:20px;">
					<Form :model="formObj" :label-width="120">
						<FormItem label="新闻分类：">
							<RadioGroup v-model="formObj.newstype">
								<Radio :value='0' :label="0">新闻</Radio>
								<Radio :value='-1' :label="-1">公告</Radio>
								<Radio :value='1' :label="1">产品更新说明</Radio>
							</RadioGroup>
						</FormItem>
						<FormItem label="新闻标题：">
							<Input v-model="formObj.title" placeholder="新闻标题：" />
						</FormItem>
						<FormItem label="新闻内容：">
							<quill-editor 
							v-model="formObj.content" 
							ref="myQuillEditor" 
							aria-placeholder="123"
							:options="editorOption" 
							@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
							@change="onEditorChange($event)">
							</quill-editor>
						</FormItem>
						<FormItem label="发布者：">
							<Input v-model="formObj.author" placeholder="发布者：" />
						</FormItem>
						<FormItem label="新闻所属产品：">
							<Select v-model="formObj.productids" multiple >
								<Option :data='item.productid' v-for="item in productList" :value="item.productid" :key="item.productid">{{ item.productname }}</Option>
							</Select>
						</FormItem>
						<FormItem label="点击量：">
							<InputNumber v-model="formObj.views" placeholder="点击量：" />
						</FormItem>
						
						<FormItem label="状态：">
							<RadioGroup v-model="formObj.status">
								<Radio :value='0' :label="0">禁用</Radio>
								<Radio :value='1' :label="1">待发</Radio>
								<Radio :value='2' :label="2">发布</Radio>
							</RadioGroup>
						</FormItem>

						<FormItem label="">
							<Button size='large' type='primary' @click='adminAction'>{{formObj.newsid?'保存':'确定'}}</Button>
						</FormItem>
					</Form>
				</div>		     
			</div>
		</div>
	</div>
</template>
<style type="text/css">
.ql-editor{height:200px;}
</style>
<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import VueQuillEditor from 'vue-quill-editor';
	var {companyActions,newsActions,adminActions } = zmitiUtil;
	Vue.use(VueQuillEditor)
	export default{
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				tabIndex:[0,-1],
				showAvatarModal:false,
				visible:false,
				avatarList:[
					'&#xe6a5;',
					'&#xe6a4;',
					'&#xe6a3;',
					'&#xe6a2;',
					'&#xe6a0;'
				],
				editorOption:{
					modules:{
                        toolbar:[
						  ['bold', 'link'],        // toggled buttons
						  [{ 'color': [] }],
						  [{ 'align': [] }],
                          ['clean']
                        ]
                    }
				},
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formObj:{
					isover:0,
					newstype:0,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				groupList:[],
				hideMenu:false,
				loading:true,
				formcompany:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				 
				directoryList:{

				},
				productList:[],
				userCondition:{
					page_index:0,
					page_size:10,
				},
				userList:[],
				userinfo:{},
				total:0,
				newsid:-1
			}
		},
		components:{

		},
		created(){
			this.newsid=this.$route.params.newsid;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getDataList();
			this.getProductList();
		},
		methods:{
			addAdmin(){
				this.showDetail = true;
				this.adminuserId = '';
				this.formObj = {
					newstype:0
				};
			},
			getDataList(){
				var s = this;
			
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getNewsList',
						data:{
							action:newsActions.getNewsList.action,
							condition:{
								page_index:0,
								page_size:1,
								newsid:this.newsid
							}
						},
						success(data){
							s.loading = false;
							if(data.getret === 0){
								s.formObj = data.list[0];
								s.formObj.productids=[];
								data.list[0].productidslist.map((item,index)=>{
									s.formObj.productids.push(item.productid);
								})
								//console.log(s.formObj,'s.formObj');
								resolve();
							}
						}
					})
				}); 
				
			},
			getProductList(){

				var s = this;
				zmitiUtil.adminAjax({
					remark:'getProductList',
					data:{
						action:adminActions.getProductList.action,
						condition:{
							page_index:0,
							page_size:10,
						}
					},
					success(data){
						if(data.getret === 0){
							s.productList = data.list;	 
							console.log(s.productList,'s.productList');
						}
					}
				})
			},
			adminAction(){
				var s = this;
				var id = this.formObj.newsid;
				var action =  id ? newsActions.editNews.action:newsActions.addNews.action;
				
				var {newsid,title,content,newstype,productids,status} = this.formObj;
				var productids = productids.join(',');
				var params={
					newsid,
					title,
					content,
					newstype,
					productids,
					status
				}
				console.log(params,'params')
				zmitiUtil.adminAjax({
					remark:id ?　'editNews':'addNews',
					data:{
						action,
						info:{
							newsid,
							title,
							content,
							newstype,
							productids,
							status
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						setTimeout(() => {
							s.formObj={
								isover:0,
								newstype:0,
								avatar:'&#xe6a4;'
							}
							s.$router.push({name:'news'});
						}, 2000);						
					}
				})
			},
			onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
            }
		}
	}
</script>