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
		<remote-js :js-url="'http://pv.sohu.com/cityjson?ie=utf-8'" :js-load-call-back="loadRongJs"></remote-js>
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
	import RemoteJs from './ip'
	var weatherActions = zmitiUtil.weatherActions;
	var cityActions = zmitiUtil.cityActions;
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
				userinfo:{},
				ip:'',
			}
		},
		components:{
			'remote-js':RemoteJs
		},

		beforeCreate(){

		},
		mounted(){

			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getipcity();
			this.getpostcity();
			this.gettrafficdata();
			this.getLastdata();
			this.gettimedata();
			this.getCityWeather();
			this.getair();
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
		created(){
			
		},
		methods:{
			getipcity(){//通过IP地址获取城市信息
				var s = this;

				zmitiUtil.adminAjax({
					remark:'ipView',
					_ui:{
						type:1,
					},
					data:{
						action:cityActions.ipView.action						
					},
					success(data){
						console.log(data,'getipcity');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			getpostcity(){//通过经纬度获取城市信息
				zmitiUtil.adminAjax({
					remark:'postView',
					_ui:{
						type:1,
					},
					data:{
						action:cityActions.postView.action,
						info:{
							longitude:'116.46',
							latitude:'39.92'
						}					
					},
					success(data){
						console.log(data,'getpostcity');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			gettrafficdata(){//限行数据
				var s = this;
				zmitiUtil.adminAjax({
					remark:'viewTrafficdata',
					_ui:{
						type:1,
					},
					data:{
						action:weatherActions.viewTrafficdata.action,
						info: {
						    cityid:2
						}
						
					},
					success(data){
						console.log(data,'gettrafficdata');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			getLastdata(){//精简预报6天
				var s = this;
				zmitiUtil.adminAjax({
					remark:'viewLastdata',
					_ui:{
						type:1,
					},
					data:{
						action:weatherActions.viewLastdata.action,
						info: {
						    cityid:2
						}
						
					},
					success(data){
						console.log(data,'getLastdata');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			gettimedata(){//精简实况
				var s = this;
				zmitiUtil.adminAjax({
					remark:'viewTimedata',
					_ui:{
						type:1,
					},
					data:{
						action:weatherActions.viewTimedata.action,
						info: {
						    cityid:2
						}
						
					},
					success(data){
						console.log(data,'gettimedata');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			getair(){//空气质量
				var s = this;
				zmitiUtil.adminAjax({
					remark:'viewAir',
					_ui:{
						type:1,
					},
					data:{
						action:weatherActions.viewAir.action,
						info: {
						    cityid:2
						}
						
					},
					success(data){
						console.log(data,'getair');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			getCityWeather(){//天气预警
				var s = this;
				
				zmitiUtil.adminAjax({
					remark:'viewCitydata',
					_ui:{
						type:1,
					},
					data:{
						action:weatherActions.viewCitydata.action,
						info: {
						    cityid:2
						}
						
					},
					success(data){
						console.log(data,'getCityWeather');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			loadRongJs(){
				this.ip=returnCitySN['cip'];
				console.log(this.ip,'外网ip');
			}
		 
		}
	}
</script>
 