<template>
	<div class="zmiti-news-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>新闻管理</div>
				<div>
					<Button type="primary" @click="addAdmin">新增新闻</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				新闻名称：<Input placeholder="新闻名称" style="width: auto" />
				新闻地址：<Input placeholder="新闻地址" style="width: auto" />
				<Button type='primary'>查询</Button>
			</section>
			
			<div class='zmiti-news-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total" @getSelection='getSelection'>
					<div slot='table-btns' style="display:inline-block">
						<Poptip
							confirm
							title="确定要删除吗?"
							@on-ok='selectionDelete'
							>
							<Button type='error' size='small'>删除</Button>
							
						</Poptip>
						<Button size='small' type='warning'>禁用</Button>
					</div>
				</ZmitiTable>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
		<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
			<div slot='mask-content' name='detail'>
				<section class='zmiti-add-form zmiti-scroll'  >
					<header class='zmiti-add-header'>
						<img :src="imgs.back" alt=""  @click='closeMaskPage' >
						<span>基础信息</span>
					</header>
					<h2 style="height:30px;"></h2>
					<Form class='zmiti-add-form-C' :model="formObj" :label-width="120">
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
							<!-- <Input v-model="formObj.content" type='textarea' placeholder="新闻内容：" /> -->
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
						 
					</Form>
					
					<div class='zmiti-add-form-item zmiti-add-btns'>
						<Button size='large' type='primary' @click='adminAction'>{{formObj.newsid?'保存':'确定'}}</Button>
					</div>
					
				</section>
			</div>
		</ZmitiMask>
 
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import VueQuillEditor from 'vue-quill-editor';
	var {companyActions,newsActions,adminActions } = zmitiUtil;
	import ZmitiMask from '../../common/mask/';
	Vue.use(VueQuillEditor)
	import ZmitiTable from '../../common/table';
	export default {
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
						  ['bold', 'strike','color','link'],        // toggled buttons
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
			 
				
				columns:[
					{
						title:"新闻标题",
						key:'title',
						align:'center',
					},{
						title:"新闻类型",
						key:'newstype',
						align:'center',
						render:(h,params)=>{
							var type = ['公告','新闻','产品更新说明']
							return h('div',{
							
							},type[params.row.newstype+1])
						}
					},{
						title:"发布者",
						key:'author',
						align:'center',
						width:200
						
					},{
						title:"状态",
						key:'isover',
						align:'center',
						render:(h,params)=>{
							var arr = ['禁用','待发','发布'];
							return h('div',{},arr[params.row.status]);
						}
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
                               
								 h('span', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 10px',
										border:'none',
										fontSize: '12px',
										cursor:'pointer',
										color:'#06C'

                                    },
                                    on: {
                                        click: () => {
											var s = this;
											s.formObj = params.row;
											
											s.formObj.productids = s.formObj.productids.split(',').map(item=>item*1)
											console.log(s.formObj.productids,'s.formObj.productids')
											Vue.obserable.trigger({type:'toggleMask',data:true});
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left',

									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.newsid);
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
				],
				loading:true,
				formcompany:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				 
				directoryList:{

				},
				condition:{
					page_index:0,
					page_size:10,
				},
				productList:[],
				userCondition:{
					page_index:0,
					page_size:10,
				},
				userList:[],
				userinfo:{},
				total:0
			}
		},
		components:{
			ZmitiMask,
			ZmitiTable
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getDataList();
			this.getProductList();
		},

		watch:{
			

			showDetail(val){
				if(val){
					Vue.obserable.trigger({type:'toggleMask',data:true});
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			}
			
		},
		
		methods:{

			change(){
				
			},
			getSelection(data){
				this.selectList = data;
			},
			selectionDelete(){
				if(this.selectList.length<=0){
					this.$Message.error({content:'您还未选择任何要删除的项',duration:5});
					return;
				}
				var newsids = this.selectList.map(item=>{
					return item.newsid;
				}).join(',');
				
				this.delete(newsids);
			},
		 
			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
			
			addAdmin(){
				this.showDetail = true;
				this.adminuserId = '';
				this.formObj = {
					newstype:0
				};
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			delete(newsids){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delNews',
					data:{
						action:newsActions.delNews.action,
						info:{
							newsids
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSource = data.list;	 
						}
					}
				})
			},
			getDataList(){
				var s = this;
			
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getNewsList',
						data:{
							action:newsActions.getNewsList.action,
							condition:this.condition
						},
						success(data){
							s.loading = false;
							if(data.getret === 0){
								s.dataSource = data.list;
								s.total = data.total || data.list.length;
								s.dataSource.forEach(item=>{
									item.productids = item.productidslist.map(p=>{
										return p.productid;
									}).join(',');
								})

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
						condition:this.condition
					},
					success(data){
						if(data.getret === 0){
							s.productList = data.list;	 
							
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
				zmitiUtil.adminAjax({
					remark:id ?　'editNews':'addNews',
					data:{
						action,
						info:{
							newsid,title,content,newstype,productids,status
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							Vue.obserable.trigger({type:'toggleMask',data:false});
							s.getDataList();
						}
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
 