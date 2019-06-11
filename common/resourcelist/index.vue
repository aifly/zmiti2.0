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
					<input type="file" >
				</section>
			</div>
			<div class='zmiti-resource-list'>
				<header class='zmiti-resource-header'>
					<div @click="scrollToCate(1)">
						<Icon type="ios-arrow-back" />
					</div>
					<div ref='cate' class='zmiti-resource-cate-list-C'  :style="{width:viewW-440+'px'}">
						<ul :style="{width:100* cateList.length+'px'}">
							<li v-for='(item,i) in cateList' :key="i">
								<span>
									{{item.classname}}
								</span>
							</li>
						</ul>
					</div>
					<div>
						<span @click="scrollToCate(-1)">
							<Icon type="ios-arrow-forward" />
						</span>
						<span title='添加分类'>
							<Icon type="ios-add-circle" />
						</span>
					</div>
				</header>
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
					<Input v-model="formResource.content" placeholder="备注：" />
				</FormItem>
			</Form>
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
			}
		}
	},
	mounted() {
		this.init();
		for(var i = 0;i<10;i++){
			this.cateList.push({
				classname:"分类"+(i+1),
				fileclassid:1,
			})
		}
		setTimeout(() => {
			this.scroll.refresh();
		}, 100);
	},
	methods: {
		init(){
			this.getDefaultCate();
			this.scroll = new IScroll(this.$refs['cate'],{
				scrollX:true,
				mouseWheel:true,
				preventDefault:false,
			})
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
			 
			var s = this;
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'addResourceCate',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:resourceActions.addResourceCate.action,
					info:{
						classname:s.formResource.classname,
						content:s.formResource.content,
						classtype : s.currentCateId,
						userid:userinfo.userid
					}
				},
				success(data){
					$Message[data.getret === 0 ? 'success':'error'](data.msg);
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
						//s.cateList = data.list;
					}
				}
			});
		}
	},
}
</script>

