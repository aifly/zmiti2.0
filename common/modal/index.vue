<template>
    <div class="zmiti-modal-ui">
		<Modal
			v-model="show"
			title="资料库"
			width='800'
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
					<div class='zmiti-modal-classis'>
						<ul :style="{width:(cateList.length+1)*100+'px'}">
							<li>全部</li>
							<li v-for='(cate,i) in cateList' :key='i'>
								{{cate.parentName.name}}
							</li>
							
						</ul>
					</div>
					<div class='zmiti-modal-src-list'>
						<ul>
							<li>
								<div><Icon type="md-add" /></div>
								<div>上传资源</div>
							</li>
							<li v-for='(img,i) in allImgs' :key="i">
								<div class='zmiti-modal-img'>
									<img :src="img.src" alt="">
								</div>
							</li>
						</ul>
					</div>
				</div>
			</section>
		</Modal>
    </div>
</template>


<script>
	import './index.css';
	import Vue from 'vue';
	import zmitiUtil from '../../components/lib/util';
    export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				show:false,
				viewH:window.innerHeight,
				cateList:[],
				defaultIds: ['1465782065', '1465782285', '1465782327', '1465782386', '1465285201', '1465285261'],
				current:4,
				allImgs:[],

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
		},
		
		methods:{
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
							self.allImgs = data.allImgs;
							self.defaultAllImgs = data.allImgs.concat([]);
						}
					}
				})
			}
			
			
        }
	}
</script>
