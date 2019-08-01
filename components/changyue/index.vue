<template>
	<div class="zmiti-changye-main-ui">
			
		<div class='zmiti-scroll ' :style="{height:viewH - 60+'px' }">
			<div class="zmiti-changye-main">
				<div class="changyue-item1">
					<img :src='imgs["CHOME"+1]'>
				</div>
				<div class="changyue-item2">
					<img :src='imgs["CHOME"+2]'>
				</div>
				<div class="changyue-item3">
					<img :src='imgs["CHOME"+3]'>
				</div>
				<div class="changyue-item4">
					<img :src='imgs["CHOME"+4]'>
				</div>
				<div class="changyue-item5">
					<img :src='imgs["CHOME"+5]'>
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
 