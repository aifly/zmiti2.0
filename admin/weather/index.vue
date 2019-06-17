<template>
	<div class="zmiti-weather-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>天气预报</div>
				<div>
					
				</div>
			</header>
			<div :style="{height:viewH - 155+'px',width:'99%',overflow:'auto',margin:'6px auto 0'}" class='zmiti-scroll'>
				<h2 style="height:50px;"></h2>

			</div>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<style >
	.ivu-input{
		width: 98% ;
	}
</style>

<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	var weatherActions = zmitiUtil.weatherActions;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				tabIndex:[0,-1],
				showAvatarModal:false,
				visible:false,
				condition:{
					page_index:0,
					page_size:10,
				},
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				userinfo:{}
			}
		},
		components:{
		},

		beforeCreate(){

		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getCity();
		},

		watch:{
			showDetail(val){
				if(val){
					this.showDetailPage = true;
				}else{
					setTimeout(() => {
						this.showDetailPage = false;
					}, 310);
				}
			}
			
		},
		
		methods:{


			
			getCity(){
				var s = this;
				
				zmitiUtil.adminAjax({
					remark:'ipCityData',
					data:{
						action:weatherActions.ipCityData.action,
						info: {
						    "longitude": 139.011,
						    "latitude": 138
						}
						
					},
					success(data){
						console.log(data,'getCity');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},

			 

		 
		}
	}
</script>
 