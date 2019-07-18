<template>
	<div class="zmiti-weather-main-ui">
		<div class="zmiti-list-main">
			
			<div :style="{height:viewH - 60+'px',width:'99%',overflow:'auto',margin:'6px auto 0'}" class='zmiti-scroll'>
				<div class="zmiti-systemhome-pane">
					<div class="zmiti-systemhome-left">
						<div class="zmiti-systemhome-user">
							<div class="zmiti-systemhome-userface">
								<img :src="userinfor.userface">
							</div>
							<div class="zmiti-systemhome-userinfo">
								<div class="zmiti-systemhome-username">
									<b>{{userinfo.username}}</b>
									<img :src="userinfor.userlevel">
									<span>{{userinfo.info.groupname}}</span>
								</div>
								<div class="zmiti-systemhome-logintime">
								今日，{{time | formatDate}}，欢迎您回到智媒体2.0单位控制平台。
								</div>
							</div>							
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-ucount">
							<ul>
								<li>
									<div class="zmiti-systemhome-ucount-li" :style="{backgroundImage: 'url(../../assets/images/system-bg3.png)'}">
										<div class="zmiti-systemhome-ucount-text">
											<dl>
												<dt>{{ucountnum1}}</dt>
												<dd>产品</dd>
											</dl>
										</div>
										<div class="zmiti-systemhome-ucount-icon">
											<div class="zmiti-systemhome-ucount-img">
												<img :src="iconImg1">
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="zmiti-systemhome-ucount-li" :style="{backgroundImage: 'url(../../assets/images/system-bg3.png)'}">
										<div class="zmiti-systemhome-ucount-text">
											<dl>
												<dt>{{ucountnum2}}</dt>
												<dd>单位数</dd>
											</dl>
										</div>
										<div class="zmiti-systemhome-ucount-icon">
											<div class="zmiti-systemhome-ucount-img">
												<img :src="iconImg2">
											</div>
										</div>
									</div>
								</li>
								<li>
									<div class="zmiti-systemhome-ucount-li" :style="{backgroundImage: 'url(../../assets/images/system-bg3.png)'}">
										<div class="zmiti-systemhome-ucount-text">
											<dl>
												<dt>{{ucountnum3}}</dt>
												<dd>用户数</dd>
											</dl>
										</div>
										<div class="zmiti-systemhome-ucount-icon">
											<div class="zmiti-systemhome-ucount-img">
												<img :src="iconImg3">
											</div>
										</div>
									</div>
								</li>
							</ul>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-tdata zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">单位名称</div>
							<Table :columns="columns1" :data="data1"></Table>
							<div class="zmiti-systemhome-more">
								<router-link to="/company">更多</router-link>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-tdata zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">产品列表</div>
							<Table :columns="columns2" :data="data2"></Table>
							<div class="zmiti-systemhome-more">
								<router-link to="/product">更多</router-link>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
					</div>
					<div class="zmiti-systemhome-right">
						<div class="zmiti-systemhome-weather" :style="{backgroundImage: 'url(../../assets/images/weather-bg.jpg)'}">
							<div class="zmiti-systemhome-weather-icon">
								<img :src="'../../assets/images/weather/W'+weather.icon+'.png'">
							</div>
							<div class="zmiti-systemhome-weather-inner">
								<dl>
									<dt>{{weather.temp}}&#8451;</dt>
									<dd>										
										<div class="zmiti-systemhome-tq">
										{{weather.condition}}
										</div>
										<div class="zmiti-systemhome-cityname">
										{{cityname}}
										</div>
									</dd>
								</dl>
								<div class="zmiti-systemhome-windDir">
									{{weather.windLevel}} 级 {{weather.windDir}}
								</div>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-ulist zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">通知</div>
							<ul>
								<li v-for="item in noticeData">
									<a href="#">{{item.title}}</a>
								</li>
							</ul>
							<div class="zmiti-systemhome-more"><a href="#">更多</a></div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-ulist zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">**列表</div>
							<ul>
								<li v-for="item in articleData">
									<a href="#">{{item.title | filterFun}}</a>
									<h5>{{item.pubtime}}</h5>
								</li>
							</ul>
							<div class="zmiti-systemhome-more"><a href="#">更多</a></div>
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
<style >
	.ivu-input{
		width: 98% ;
	}
</style>

<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	var weatherActions = zmitiUtil.weatherActions;
	var cityActions = zmitiUtil.cityActions;
	var adminActions =zmitiUtil.adminActions;
	var companyActions = zmitiUtil.companyActions;
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
				userinfo:{
					info:{
						groupname:''
					}
				},
				ip:'',
				cityname:'',
				provicename:'',
				cityId:'2',
				weather:{
					condition:"晴",
					humidity:"59",
					icon:"0",
					temp:"25",
					updatetime:"2019-06-19 09:35:08",
					vis:"4453",
					windDegrees:"90",
					windDir:"东风",
					windLevel:"2"
				},
				userinfor:{
					userface:'../../assets/images/zmiti.jpg',
					userlevel:'../../assets/images/system-level1.png'
				},
				ucountnum1:5678234,//产品数量
				ucountnum2:6782341,//单位数量
				ucountnum3:7825632,//用户数量
				iconImg1:'../../assets/images/icon-u1.png',
				iconImg2:'../../assets/images/icon-u2.png',
				iconImg3:'../../assets/images/icon-u3.png',
				noticeData:[
					{
						id:1,
						title:'让亚洲文明之光熠熠生辉——各国嘉宾畅谈文化传承与创新',
						pubtime:'2019年5月16日'
					},
					{
						id:2,
						title:'让亚洲文明之光熠熠生辉——各国嘉宾畅谈文化传承与创新',
						pubtime:'2019年5月16日'
					},
					{
						id:3,
						title:'让亚洲文明之光熠熠生辉——各国嘉宾畅谈文化传承与创新',
						pubtime:'2019年5月16日'
					},
					{
						id:4,
						title:'让亚洲文明之光熠熠生辉——各国嘉宾畅谈文化传承与创新',
						pubtime:'2019年5月16日'
					},
					{
						id:5,
						title:'让亚洲文明之光熠熠生辉——各国嘉宾畅谈文化传承与创新',
						pubtime:'2019年5月16日'
					}
				],
				articleData:[
					{
						id:1,
						title:'国内站针对大客户，可支持95计费功能（白名',
						pubtime:'2019年5月16日'
					},
					{
						id:2,
						title:'云企业网支持金融云',
						pubtime:'2019年5月16日'
					},
					{
						id:3,
						title:'云企业网发布支持privatezone访问功能',
						pubtime:'2019年5月16日'
					}
				],
				columns1: [
                    {
                        title: '名称',
                        key: 'companyname'
                    },
                    {
                        title: '负责人',
                        key: 'username',
                        width:150
                    },
                    {
                        title: '电话',
                        key: 'companyphone',
                        width:150
                    },
                    {
                        title: '人数',
                        width:150,
                        align: 'center',
                        render:(h,params)=>{
                        	return h('div',{
                        		class:'nums'
                        	},'-1');
                        }
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: '产品名',
                        key: 'productname'
                    },
                    {
                        title: '上线时间',
                        key: 'createtime',
                        width:150,
                        render:(h,params)=>{
                        	return h('div',{
                        		class:'createtime'
                        	},this.formatPubDate(params.row.createtime))
                        }
                    },
                    {
                        title: '使用数量',
                        key: 'statue',
                        width:150,
                        align: 'center',
                        render:(h,params)=>{
                        	return h('div',{
                        		class:'nums'
                        	},'-1')
                        }
                    }
                ],
                data2: [],
                userData:[],
                time: new Date()
			}
		},
		components:{
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
			this.getProductList();//产品列表
			this.getCompanyList();//单位列表
			this.getUserList();//获取用户列表
			console.log(this.userinfo,'this.userinfo')
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
						if (data.getret==0) {
							//s.cityname=data.cityinfo.cityname;
							//s.provicename=data.cityinfo.provicename;
						}

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
						s.weather=data.list.data.condition;
						s.cityname=data.list.data.city.name;
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
						    cityid:s.cityId
						}
						
					},
					success(data){
						console.log(data,'getCityWeather');
						//s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			getProductList(){
				var s = this;
				console.log(adminActions,'adminActions')
				zmitiUtil.adminAjax({
					remark:'getProductList',
					data:{
						action:adminActions.getProductList.action,
						condition:{
							page_index:0,
							page_size:20
						}						
					},
					success(data){
						console.log(data,'获取产品列表');
						s.data2=data.list;
						s.ucountnum1=data.total;
					}
				})
			},
			getCompanyList(){
				//console.log(companyActions.getCompanyList.action,'companyActions');
				zmitiUtil.adminAjax({
					remark:'getCompanyList',
					data:{
						action:companyActions.getCompanyList.action,
						condition:{
							//companyname:'sss',
							page_index:0,
							page_size:10
						}						
					},
					success(data){
						console.log(data,'获取单位列表');
						s.data1=data.list;
						s.ucountnum2=data.total;
					}
				})
			},
			getUserList(){//获取所有单位下的用户
				var s = this;
				zmitiUtil.adminAjax({
					remark:"getUserList",
					data:{
						action:companyActions.getUserList.action,
						condition:{
							page_index:0,
							page_size:10
						}
					},
					success(data){
						if(data.getret === 0){
							s.userData=data.list;
							s.ucountnum3=data.total;
						}
					}
				})
			},
			getCompanyUser:function(id){//获取本单位下的用户
				let s = this;
				let nums=0;

					zmitiUtil.adminAjax({
						remark:"getUserListByCompanyId",
						data:{
							action:companyActions.getUserListByCompanyId.action,
							condition:{
								page_index:0,
								page_size:10,
								companyid:id
							}
						},
						success(data){
							if(data.getret === 0){
								nums=data.total;
								s.userData.push(data.total);																
							}
						}
					})
			},
			formatPubDate: function (value) {
				let date = new Date(value*1000);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;	
				return y + '-' + MM + '-' + d;
		    }
		 
		},
		filters: {
	        filterFun: function(value) {
	          if (value && value.length > 20) {
	            value = value.substring(0, 20) + "...";
	          }
	    
	          return value;
	        },
	        formatDate: function (value) {
				let date = new Date(value);
				let y = date.getFullYear();
				let MM = date.getMonth() + 1;
				MM = MM < 10 ? ('0' + MM) : MM;
				let d = date.getDate();
				d = d < 10 ? ('0' + d) : d;
				let h = date.getHours();
				h = h < 10 ? ('0' + h) : h;
				let m = date.getMinutes();
				m = m < 10 ? ('0' + m) : m;
				let s = date.getSeconds();
				s = s < 10 ? ('0' + s) : s;				
				let week='';
				if (date.getDay() == 0) {
					week = "星期天";
				} else if (date.getDay() == 1) {
					week = "星期一";
				} else if (date.getDay() == 2) {
					week = "星期二";
				} else if (date.getDay() == 3) {
					week = "星期三";
				} else if (date.getDay() == 4) {
					week = "星期四";
				} else if (date.getDay() == 5) {
					week = "星期五";
				} else if (date.getDay() == 6) {
					week = "星期六";
				}
				return y + '年' + MM + '月' + d + '日 ' + week;
		    }
		    
	    },
	    computed:{
	    	userinfonum(){
	    		return this.userData;
	    	}
	    }
	}
</script>
<style type="text/css" scope>
	.ivu-table{
		color: #333333;
		font-size: 14px;
	}
	.ivu-table-wrapper{
		border:none;
	}
	.ivu-table:after{
		width:0;
		background:none;
	}
	.ivu-table:before{
		height:0;
		background:none;
	}
	.ivu-table th , .ivu-table td{
		border-bottom:none;
	}
	.ivu-table th{
		background: none;
	}
	.zmiti-systemhome-ucount-li{
		
	}
</style>
 