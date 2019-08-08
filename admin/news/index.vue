<template>
	<div class="zmiti-news-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>新闻管理</div>
				<div>
					<router-link :to="{name:'article'}"><Button type="primary">新增新闻</Button></router-link>
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

		</div>

 
	</div>
</template>
<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>
	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	var {companyActions,newsActions,adminActions } = zmitiUtil;
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
											//console.log(s.formObj,'s.formObj');
											this.$router.push({name:'article',params:{newsid:params.row.newsid}});
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
		},

		watch:{			
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
								resolve();
							}
						}
					})
				}); 
				
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
 