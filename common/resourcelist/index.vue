<template>
	<div class='zmiti-resourcelist-ui'>
		<header class='zmiti-resourcelist-header'>
			<h3>资料库</h3>
			<div v-if='isDialog'>
				<Icon type="md-close" />
			</div>
			<div v-else>
				<Input />
			</div>
		</header>
		<div class="zmiti-resourcelist-content">
			<div class='zmiti-resource-cate'>
				<div @click="getCateById(item)" :class="{'active':currentCateId === item.id}" v-for='(item ,i ) of defaultClass' :key="i">
					<span class='zmt_iconfont' v-html='item.icon'></span>
					<span>{{item.name}}</span>
					<ul v-if='item.cateList' class='zmiti-child-cate'>
						<li @click='getCateByChildId(cate)' :class="{'active':cate.type === childCateId}" v-for='(cate,k) of item.cateList' :key="k">
							{{cate.name}}
						</li>
					</ul>
				</div>

				<section class='zmiti-resource-upload'>
					<Button type='primary'><Icon type="ios-cloud-upload" /> 点击上传资源</Button>
					<input type="file" ref='file' @change='uploadFile' name='fileobj'>
				</section>
			</div>
			<div class='zmiti-resource-list'>
				<header class='zmiti-resource-header'>
					<div @click="scrollToCate(1)">
						<Icon type="ios-arrow-back" />
					</div>
					<div ref='cate' class='zmiti-resource-cate-list-C'  :style="{width:viewW-440+'px'}">
						<ul :style="{width:100* cateList.length+'px'}">
							<li @click='changeCurrentClass({fileclassid:-1})' :class="{'active':currentClassId === -1}">
								全部
							</li>
							<li @click='changeCurrentClass(item)' :class="{'active':currentClassId === item.fileclassid}" title='双击可编辑分类' @dblclick="showAddCateModal(item)" v-for='(item,i) in cateList' :key="i">
								<span>
									<label v-if='item.isshare' class='zmt_iconfont' v-html='"&#xe636;"'></label>
									{{item.classname}}
								</span>
							</li>
						</ul>
					</div>
					<div>
						<span @click="scrollToCate(-1)">
							<Icon type="ios-arrow-forward" />
						</span>
						<span title='添加分类' @click='showAddCateModal'>
							<Icon type="ios-add-circle" />
						</span>
					</div>
				</header>
				<header class='zmiti-resource-header1'>
					<div><Checkbox>全选</Checkbox></div>
					<div><Button type='error' size='small'>删除</Button></div>
				</header>
				<div class='zmiti-resource-C'>
					<ul>
						<li v-for="(resource,i) of resourceList" :key="i">
							<div class='zmiti-resource-file'>
								<img draggable="false" :src="resource.filepath" alt="">
							</div>
						</li>
					</ul>
				</div>

			</div>
			<div></div>
		</div>
		<div class="zmiti-resourcelist-footer">
			<Button style='width:100px;'>取消</Button>
			<Button style='width:100px;' type='primary'>确定</Button>
		</div>
		<Modal title='添加分类' v-model="showModal"
			@on-ok="addCate"
		
		>
			<Form class='zmiti-add-form-C' :rules="ruleValidate" :model="formResource" :label-width="100">
				<FormItem label="分类名称：" prop='classname'>
					<Input v-model="formResource.classname" placeholder="分类名称：" />
				</FormItem>
				<FormItem label="是否共享：">
					<RadioGroup v-model="formResource.isshare">
						<Radio :value='0' :label="0">否</Radio>
						<Radio :value='1' :label="1">是</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="备注：" prop='content'>
					<Input type='textarea' v-model="formResource.content" placeholder="备注：" />
				</FormItem>
			</Form>
			 <div slot="footer" class='zmiti-addacte-footer'>
				<div>
					 <Poptip
						confirm
						:title="'确定删除此分类吗?'"
						@on-ok="deleteCate"
					>
						<span v-if='formResource.fileclassid'>删除此分类</span>
					</Poptip>
					
				</div>
				<div>
					<Button @click='showModal = false'>取消</Button>
					<Button type='primary' @click="addCate">确定</Button>
				</div>
			</div>
		</Modal>
	</div>
</template>
<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>
import zmitiUtil from '../lib/util';
import {defaultClass} from '../config';
import IScroll from 'iscroll';
let {resourceActions} = zmitiUtil;
export default {
	props:{
		isDialog:{
			type:Boolean,
			default:false
		},
		isAdmin:{
			type:Boolean,
			default:true,
		}
	},
	data(){
		return {
			defaultClass:defaultClass(this.isAdmin? 4 : 3),
			cateList:[
				
			],
			currentClassId:-1,
			showModal:false,
			viewW:window.innerWidth,

			currentCateId:3,
			formResource:{
				isshare:0
			},
			childCateId:-1,
			ruleValidate:{
				classname:[
					{ required: true, message: '分类名称不能为空', trigger: 'blur' }
				]
			},
			condition:{
				classname:"",
				classtype:0,
				page_index:0,
				page_size:20
			},
			resourceCondition:{
				page_index:0,
				page_size:20
			},
			resourceList:[],//资源集合
		}
	},
	mounted() {
		this.init();
		
	},
	methods: {
		init(){
			this.getDefaultCate();
			this.scroll = new IScroll(this.$refs['cate'],{
				scrollX:true,
				mouseWheel:true,
				preventDefault:false,
			});
			this.getResourceByClassId();
		},
		changeCurrentClass(item){
			this.currentClassId = item.fileclassid;
			this.getResourceByClassId();
		},
		getResourceByClassId(){
			var {isAdmin,$Message} = this;
			var s = this; 
			var condition = Object.assign(this.resourceCondition,{fileclassid:s.currentClassId})
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'getResourceList',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:resourceActions.getResourceList.action,
					condition
				},
				success(data){
					//$Message[data.getret === 0 ?　'success':'error'](data.msg);
					if(data.getret === 0 ){
						data.list.forEach((list)=>{
							list.filepath = window.config.host+list.filepath;
						})
						s.resourceList = data.list;
					}
				}
			});
		},
		deleteCate(){
			var {isAdmin,$Message} = this;
			var s = this;  
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'delResourceCate',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:resourceActions.delResourceCate.action,
					fileclassid:s.formResource.fileclassid
				},
				success(data){
					$Message[data.getret === 0 ?　'success':'error'](data.msg);
					s.showModal = false;
					s.getDefaultCate();
				}
			});
		},
		uploadFile(){//开始上传文件
			var {isAdmin,$Message} = this;
			var s = this;  
			var userinfo = zmitiUtil[isAdmin?'getAdminUserInfo':'getUserInfo']();
			
			var {userid,token} = userinfo.ui;

			var formData = new FormData();

			formData.append('userid',userid);
			formData.append('token',token);
			formData.append('fileclassid',s.currentClassId);
			formData.append('usertype',isAdmin?1:2);
			formData.append('fileobj',this.$refs['file'].files[0]);
			formData.append('file_attr_name','fileobj');
			formData.append('companyid','');
			formData.append('verify_key','25c1c1f3597bc5b258bd68be8804576e');

			zmitiUtil.baseUpload({
				data:formData,
				success(data){
					if(data.getret === 0 ){
						s.getResourceByClassId();
					}
					
				}
			});
		},
		showAddCateModal(item){
			this.showModal = true;
			if(item){
				this.formResource = item;
			}else{
				this.formResource = {
					isshare:0
				};
			}
		},
		getCateByChildId(item){
			this.childCateId = item.type;
		},
		getCateById(item){
			this.currentCateId = item.id;
		},
		addCate(){
			var {isAdmin,$Message} = this;
			var userinfo = zmitiUtil[isAdmin?'getAdminUserInfo':'getUserInfo']();
			
			var isEdit = this.formResource.fileclassid;
			var s = this;
			if(s.formResource.classname.length>5){
				$Message.error('分类名称最可输入5个字');
				return;
			}
			var info = {
						classname:s.formResource.classname,
						content:s.formResource.content,
						classtype : s.currentCateId,
						userid:userinfo.userid
				};
			if(isEdit){
				info = Object.assign(info,s.formResource);
			}
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:isEdit?'editResourceCate' :'addResourceCate',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:(resourceActions[isEdit?'editResourceCate':'addResourceCate']).action,
					info
				},
				success(data){
					$Message[data.getret === 0 ? 'success':'error'](data.msg);
					s.showModal = false;
					s.getDefaultCate();
				}
			});
		},
		scrollToCate(num){
			var x = this.scroll.x;
			this.scroll.scrollTo(x + 100 * num,0,200);
		},
		getDefaultCate(){//获取默认分类。
			var {isAdmin,condition} = this;
			var s = this;
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'getResourceCateList',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:resourceActions.getResourceCateList.action,
					condition
				},
				success(data){
					if(data.getret === 0){
						s.cateList = data.list;
						setTimeout(() => {
							s.scroll.refresh();
						}, 100);
					}
				}
			});
		}
	},
}
</script>

