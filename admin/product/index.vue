<template>
	<div class="zmiti-product-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>产品管理</div>
				<div>
					<Button type="primary" @click="addAdmin">新增产品</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				产品编号：<Input placeholder="产品编号" style="width: auto" />
				产品简称：<Input placeholder="产品简称" style="width: auto" />
				<Button type='primary'>查询</Button>
			</section>
			
			<div class='zmiti-product-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<ul>
					<li v-for='(data,i) of dataSrouce' :key="i">
						<div>
							<router-link :to='data.managerurl+"/"+data.productid'>
								{{data.productname}} <span class='zmt_iconfont' v-html='"&#xe64e;"'></span>
							</router-link>
						</div>
						<div v-html="data.introduce"></div>
						<div>
							<div>创建时间：{{formatDate(data.createtime).substr(0,10)}}</div>
							<div>
								<Poptip
									:confirm="true"
									title="确定要删除吗？"
									@on-ok="deletes(data.productid)"
									
								>
									<span class='zmt_iconfont del' v-html="'&#xe616;'"></span>
								</Poptip>
								<span @click='showEditPage(data)' v-html='"&#xe680;"' class='zmt_iconfont'></span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
			<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
				<section slot='mask-content' class='zmiti-add-form zmiti-scroll' >
					<header class='zmiti-add-header'>
						<img :src="imgs.back" alt=""   @click='closeMaskPage'>
						<span>产品信息</span>
					</header>
					<div class='zmiti-product-avatar' @click="showAvatarModal = true">
						<span class='zmt_iconfont' v-html='formObj.icon'></span>
						<label>更换头像</label>
					</div>
					<Form class='zmiti-add-form-C' :model="formObj" :label-width="120">
						<FormItem label="产品名：">
							<Input v-model="formObj.productname"  placeholder="产品名：" />
						</FormItem>
						<FormItem label="产品介绍：">
							<quill-editor 
							v-model="formObj.introduce" 
							ref="myQuillEditor" 
							aria-placeholder="123"
							:options="editorOption" 
							@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
							@change="onEditorChange($event)">
							</quill-editor>
						</FormItem>
						<FormItem label="用户端链接：">
							<Input v-model="formObj.producturl" placeholder="用户端链接：" />
						</FormItem>
						<FormItem label="管理端链接：">
							<Input v-model="formObj.managerurl" placeholder="管理端链接：" />
						</FormItem>
						<FormItem label="状态：">
							<RadioGroup v-model="formObj.status">
								<Radio :value='0' :label="0">禁用</Radio>
								<Radio :value='1' :label="1">正常</Radio>
							</RadioGroup>
						</FormItem>
					
					</Form>
					
					<div class='zmiti-add-form-item zmiti-add-btns'>
						<Button size='large' type='primary' @click='action'>{{formObj.productid?'保存':'确定'}}</Button>
					</div>
					
				</section>
			</ZmitiMask>

		<Avatar v-model="showAvatarModal" :avatar='formObj.icon' @getAvatar='getAvatar'></Avatar>
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
	import Avatar from '../../common/avatar';
	import ZmitiMask from '../../common/mask';
	import VueQuillEditor from 'vue-quill-editor';
	var {adminActions,companyActions,formatDate } = zmitiUtil;
	Vue.use(VueQuillEditor)
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				tabIndex:[0,-1],
				showAvatarModal:false,
				visible:false,
				formatDate,
				avatarList:[
					'&#xe6a5;',
					'&#xe6a4;',
					'&#xe6a3;',
					'&#xe6a2;',
					'&#xe6a0;'
				],
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formObj:{
					status:0,
					usersign:1,
					usertypesign:1,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSrouce:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				 
				formObj:{
					 
				},
				 
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				editorOption:{
					modules:{
                        toolbar:[
						  ['link']
                        ]
                    }
				},
			}
		},
		components:{
			Avatar,
			ZmitiMask
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
			

			showDetail(val){
				if(val){
					Vue.obserable.trigger({
					type:'toggleMask',
					data:true
				});
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			},
			$route:{
				deep:true,
				handler(){
					
					this.getDataList()
				}
			}
			
		},
		
		methods:{
			showEditPage(item){
				var s = this;
				Vue.obserable.trigger({type:'toggleMask',data:true});
				s.formObj = item; 
			},
			closeMaskPage(){
				this.showDetailPage = -1;
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
			 
			getAvatar(avatar){
				this.formObj.icon = avatar;
			},
			initPassword(){//初始化密码
				var {$Message} = this;
				zmitiUtil.adminAjax({
					data:{
						action:companyActions.modifyAdminPassword.action,
						adminuserid:this.formObj.adminuserid,
						adminpwd:window.config.defaultPass
					},
					success(data){
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
						}
					}
				});
			},
			addAdmin(){
				this.showDetail = true;
				this.adminuserId = '';
				this.formObj = {
					isover:0,
					avatar:'&#xe6a4;'
				};
				Vue.obserable.trigger({
					type:'toggleMask',
					data:true
				});
			},

			deletes(productids){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'delProduct',
					data:{
						action:adminActions.delProduct.action,
						condition:{
							productids
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSrouce = data.list;	 
						}
					}
				})
			},
			getDataList(){
				var s = this;
			
				var p = new Promise((resolve,reject)=>{
					zmitiUtil.adminAjax({
						remark:'getProductList',
						data:{
							action:adminActions.getProductList.action,
							condition:this.condition
						},
						success(data){
							if(data.getret === 0){
								s.dataSrouce = data.list;	 
								resolve();
							}
						}
					})
				});
			},
			action(){
				var s = this;
				var action = this.formObj.productid ? adminActions.editProduct.action:adminActions.addProduct.action;
				
				zmitiUtil.adminAjax({
					remark:this.formObj.productid ?　'editUser':'addUser',
					data:{
						action,
						info:this.formObj
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
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
 