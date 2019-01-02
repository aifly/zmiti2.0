<template>
    <div class="zmiti-modal-ui">
		<Modal
			v-model="show"
			title="资料库"
			width='800'
			@on-ok='sure'
			>
			<section class='zmiti-modal-main'>
				 <ul class='zmiti-modal-cate' ref="menu-C">
					<!-- 
					 -->

					<li>公共资料库</li>
					<li>公司资料库</li>
					<li style="cursor:not-allowed;color:#ccc">我的资料库</li>
					<li class="zmiti-sub-menu active">我的素材库</li>
					<li class="zmiti-sub-menu">基本资料库</li>

				</ul>
				<div class='zmiti-modal-amin-content'>
					<div class='zmiti-modal-arrow zmiti-modal-arrow-left' @click='cateScrollTo("left")'>
						<Icon type="ios-arrow-back" />
					</div>
					<div class='zmiti-modal-arrow zmiti-modal-arrow-right' @click='cateScrollTo("right")'>
						<Icon type="ios-arrow-forward" />
					</div>
					<div class='zmiti-modal-cate-edit' @click='cateAction'>
						<Icon type="md-checkmark" v-if='isEditState' />
						<Icon type="md-create" v-else />
					</div>
					
					
					<section class='zmiti-modal-cate-top'>
						<div class='zmiti-modal-classis' ref='classis'>
							<ul :style="{width:(cateList.length+1)*100+'px'}">
								<li @click="getSourceByCate('all',-1)" :class="{'active':cateIndex === -1}">全部</li>
								<li v-for='(cate,i) in cateList' :key='i'  :class="{'active':cateIndex === i}" @click='getSourceByCate(cate,i)'>
									{{cate.parentName.name}}<Icon type="md-close" v-if='isEditState' />
								</li>
							</ul>
						</div>
						<div  class='zmiti-modal-add-cate' v-if='isEditState' >
							<Button type='dashed' size='small' @click="showAddCateModal = true">添加分类</Button>
						</div>
					</section>
					<div class='zmiti-modal-src-list' ref='src-list'>
						<ul>
							<li>
								<div><Icon type="md-add" /></div>
								<div>上传资源</div>
							</li>
							<li v-for='(img,i) in allImgs' :key="i">
								<section class='lt-full'  @click.stop='checkImg(img)'>
									<div class='zmiti-modal-img'>
										<img :src="img.src" alt="">
									</div>
									<div class='zmiti-modal-img-attr'>
										<span>{{img.storageSize}}</span> 
										<span>{{img.size}}</span> 
										<span class='zmiti-modal-setting' @click.stop="showAction(img)">
											<Icon type="md-settings" />
										</span>
									</div>
								</section>
								<div class='zmiti-modal-checked lt-full' v-if='currentImgId === img.id'>
									<img :src="imgs.checked" alt="">
								</div>
								<ol v-if='img.showAction'>
									<li>
										<Poptip
											confirm
											title="确定要删除吗？"
											@on-cancel='cancelDel'
											@on-ok="delResource(img)">
											<Icon type="ios-trash" /><label>删除</label>
										</Poptip>
									</li>
								</ol>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</Modal>
		<Modal
			v-model="showAddCateModal"
			title='添加分类'
			@on-ok='addCate'
		>
			<Input placeholder="请输入分类名称" v-model="cateName" />
				
		</Modal>
    </div>
</template>


<script>
	import './index.css';
	import Vue from 'vue';
	import zmitiUtil from '../lib/util';
	import IScroll from 'iscroll';
    export default {
		props:['obserable','type','onFinish'],//type 当前对话框的资源分类。0，图片1，音频2，视频3，VR视频
		name:'zmitiindex',
		data(){
			return{
				show:false,
				viewH:window.innerHeight,
				cateList:[],
				imgs,
				defaultIds: ['1465782065', '1465782285', '1465782327', '1465782386', '1465285201', '1465285261'],
				current:4,//当前的分类 默认为：我的素材库。
				isEditState:false,
				allImgs:[],
				cateName:'',
				cateIndex:-1,
				currentImgId:"",
				showAddCateModal:false

			}
		},
		components:{
		},
		watch:{
			
		},
		beforeCreate(){
			
		},
		mounted(){
			 this.userinfo = zmitiUtil.getUserInfo();
			 this.getCateList();

			 this.cateScroll = new IScroll(this.$refs['classis'],{
				scrollX:true
			 });
			 this.srcScroll = new IScroll(this.$refs['src-list'],{
				 scrollbars:true,
				 mouseWheel:true
			 });
		},
		
		methods:{

			checkImg(img){
				this.currentImgId = img.id;
			},

			showAction(img){
				this.allImgs.forEach((item,i)=>{
					item.showAction = false;
				})
				img.showAction = true;
				this.allImgs = this.allImgs.concat([]);
			},

			cancelDel(){
				
				this.allImgs.forEach((item,i)=>{
					item.showAction = false;
				})
				this.allImgs = this.allImgs.concat([]);
			},

			delResource(img){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+'datainfoclass/resource_del',
					data:{
						setdatainfoid:img.id
					},
					success(data){
						if(data.getret === 0){
							s.$Message.success('删除成功');
							s.getCateList();
						}
					}
				})
			},
			sure(){
				var img = null;
				this.allImgs.forEach((item,i)=>{
					if(item.id === this.currentImgId){
						img = item;
					}
				})
				this.onFinish(img);
			},			
			init(){
				this.cateIndex = -1;
				this.isEditState = false;
			},
			cateScrollTo(type){
				switch (type) {
					case 'left':
						this.cateScroll.x += 100;
						
						break;
					case "right":
						this.cateScroll.x += -100;
						break;
					default:
						break;
				}
				this.cateScroll.scrollTo(this.cateScroll.x,0,400)
			},
			addCate(){//添加分类
				var s = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+'datainfoclass/add_class_info',
					data:{
						setclassname:s.cateName,
						setparentid:s.defaultIds[s.current],
						setdataclasstype:s.type
					},
					success(data){
						if(data.getret === 0){
							s.$Message.success('添加成功');
							s.getCateList();
							s.init();
						}
					}
				})	
			},
			getSourceByCate(cate,index){
				var s = this;
				if(this.isEditState){
					//执行删除操作
					//alert('删除成功');
					
					zmitiUtil.ajax({
						url:window.config.baseUrl+'datainfoclass/class_info_del',
						data:{
							setdatainfoclassid:cate.parentName.id
						},
						success(data){
							if(data.getret === 0){
								s.$Message.success('删除成功');
								s.getCateList();
								s.init();


							}
						}
					})
					return;
				}
				this.cateIndex = index;
				if(cate === 'all'){
					this.allImgs = this.defaultAllImgs.concat([]);
				}else{
					this.allImgs = cate.parentName.imgs;
				}
				setTimeout(() => {
					this.srcScroll.refresh();
				}, 100);
			},
			cateAction(){
				this.isEditState = !this.isEditState;
				setTimeout(() => {
					this.cateScroll.refresh();
				}, 100);
			},
			getCateList(){
				var self = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+"datainfoclass/get_datainfo",
					data:{
						setdatainfotype: self.type || 0,
						setdatainfoclassid:self.defaultIds[self.current]
					},
					success(data){
						if(data.getret === 0){
							self.cateList = data.dataInfo;
							
							var subImgs = [];
							data.dataInfo.forEach(info=> {
								subImgs = subImgs.concat(info.parentName.imgs);
							});
							self.defaultAllImgs = data.allImgs.concat(subImgs);
							self.allImgs = self.defaultAllImgs.concat([]);

							setTimeout(() => {
								self.cateScroll.refresh();
								self.srcScroll.refresh();
							}, 100);

						}
					}
				})
			}
			
			
        }
	}
</script>
