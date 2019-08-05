<template>
	<div class="zmiti-changye-main-ui">
			
		<div class='zmiti-scroll ' :style="{height:viewH - 60+'px' }">
			<div class="zmiti-changye-main">
				<div class="changyue-item1">
					<div class="pannel-txt">
						<div class="item-inner">
							<!-- <div class="pannel-title">畅阅</div>
							<div class="pannel-smmary">一套用于提交上级审阅，<br/>并支持一键检测错别字，敏感词的内容检测插件</div> -->
							<img class="img2" :src='imgs["CLIENT"+16]'>
							<div class="pannel-btns">
								<Button type="success">插件下载</Button><Button type="info">进入</Button>
							</div>
						</div>
					</div>
					<div class="pannel-img">
						<img class="img1" :src='imgs["CLIENT"+14]'>						
					</div>					
				</div>
				<div class="changyue-item2">
					<div class="item-inner">
						<div class="pannel-img1">
							<img :src='imgs["CLIENT"+2]'>
						</div>						
						<div class="pannel-img2">
							<img :src='imgs["CLIENT"+3]'>
						</div>
						<div class="pannel-img3">
							<img :src='imgs["CLIENT"+18]'>
						</div>
					</div>
				</div>
				<div class="changyue-item3">
					<div class="item-inner">
						<div class="pannel-img1">
							<img :src='imgs["CLIENT"+6]'>
							<div class="img-inner">
								<img :src='imgs["CLIENT"+8]'>
							</div>
						</div>
					</div>
				</div>
				<div class="changyue-item4">
					<div class="item-inner">
						<div class="pannel-img1">
							<img :src='imgs["CLIENT"+9]'>
							<img :src='imgs["CLIENT"+17]'>
						</div>
						<div class="pannel-img2">
							<img :src='imgs["CLIENT"+10]'>
						</div>
						<div class="pannel-img3">
							<div class="img-inner">
								<img :src='imgs["CLIENT"+15]'>
							</div>							
						</div>
					</div>
				</div>
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
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{				
				targetKeys:[],
				showAvatarModal:false,
				visible:false,
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSrouce:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				userinfo:{}
			}
		},
		components:{
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			
		},

		watch:{
			

			showDetail(val){
				if(val){
					this.showDetailPage = 1;
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			},
			$route:{
				deep:true
			}
			
		},
		
		methods:{








		}
	}
</script>
 