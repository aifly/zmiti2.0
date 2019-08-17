<template>
	<div class="zmiti-tripexpence-main-ui">
		 <div ref='tripexpence-main-ui' class='zmiti-tripexpence-map lt-full'>

		 </div>

		<ul ref='city-C' class='tripexpence-citylist'  :style="{transform:'translate3d('+(transX)+'px,'+transY+'px,0)'}">
			<li :key='i' v-for='(item,i) in cityList.children'>
				<Checkbox
					checked={item.isChecked}
					onChange={this.selectCity.bind(this,item)}
					>{{item.label}}</Checkbox>
			</li>
			<li v-if='cityList.length>1 && currentCityIndex >-1' @click="next">下一步</li>
				
		</ul>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import echarts from 'echarts/lib/echarts';
	import 'echarts/lib/chart/map';
	import '../../../common/echarts/china';

	var {randomString,tripActions} = zmitiUtil;

	import {manuscriptStatus} from '../../../common/config';

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				targetKeys:[],
				showAvatarModal:false,
				
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				total:0,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				loading:true,
				currentCityIndex: -1,
				currentCityId: -1,
				transX: 0,
				transY: 0,
				currentUserid:'',
				formUser:{
					isover:0,
					usersign:1,
					usertypesign:1,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],
				columns:[
					{
						title:"稿件编号",
						key:'manuscriptid',
						align:'center',
					},
					{
						title:"稿件标题",
						key:'doctitle',
						align:'center',
					},
					{
						title:"提交时间",
						key:'createtime',
						align:'center'
					},
					{
						title:'审核人',
						key:'status',
						width:220,
						render:(h,params)=>{
							  
							return h('div',(params.row.checkuserlist||[])['map']((c,i)=>{
								return h('span',{
									style:{
										marginRight:'5px'
									},
									on:{
										click:()=>{
											console.log(c);
											this.$Modal.info({
												title:c.realname + '的审核意见 —— ' + manuscriptStatus[c.status].name,
												content:'<p>审核意见：</p>' + (c.suggestion || '暂无 ：('),
												okText: '确定',
												closable:true,
												cancelText: '取消'

											});
										}
									},
									domProps:{
										innerHTML:`
											<label>${c.realname}</label>
											<label title='${manuscriptStatus[c.status].name}' class='zmiti-cy-tag zmt_iconfont' style='color:${manuscriptStatus[c.status].color}'>
												${manuscriptStatus[c.status].icon}
											</label>
										`
									}
								});
							}));
						}
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？",
										placement:'left'

									},
									on:{
										'on-ok':()=>{
											this.delete(params.row.manuscriptid);
										},
										
									}
								},[
									h('span', {
										props: {
											type: 'error',
											size: 'small'
										},
										style:{
											cursor:'pointer',
											color:'#06C'
										},
										on: {
											click: () => {
											}
										}
									}, '删除')
								])
                            ]);
							
							 
						}
					}
				],
				showTable:false,
				
				formUser:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				 
				directoryList:{

				},
				cityList:[],
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				currentProvId: '',
       		     seasonList: [], //淡旺季列表。
			}
		},
		components:{
		},

		beforeCreate(){
			
		},
		mounted(){

			this.initEcharts();
			this.getCascader();
			this.loadJobList();
			this.loadSeasonData(); //加载淡旺季列表。
			
		},

		watch:{
			

			showDetail(val){
				
			},
			
			
		},
		
		methods:{

			loadJobList(){
				var s = this;
				return;
				var userid = this.props.params.userid ? this.props.params.userid : this.userid;
				$.ajax({
					url: window.baseUrl + 'travel/get_joblist', //接口地址
					type: window.ajaxType || 'get',
					data: {
						setuserid: userid,
						userid: s.userid,
						getusersigid: s.getusersigid
					},
					success(data) {

						if (data.getret === 0) {

							s.state.jobList = data.list;
							s.forceUpdate();
						}
					}
				})
			},

			loadSeasonData() {
				var s = this;
				return;
				var userid = this.props.params.userid ? this.props.params.userid : this.userid;
				$.ajax({
					url: window.baseUrl + 'travel/get_seasondatelist', //接口地址
					type: window.ajaxType || 'get',
					data: {
						setuserid: userid,
						userid: s.userid,
						getusersigid: s.getusersigid
					},
					success(data) {

						if (data.getret === 0) {
							//console.log(data.list,"信息列表");
							s.state.seasonList = data.list;

						}
					}
				})
			},
		 
			initEcharts(){
				 var s = this;
				this.lastCityId = this.lastCityId || -1;
				var myChart = echarts.init(this.$refs['tripexpence-main-ui']);
				var  option = {
					tooltip: {
						trigger: 'item',
						formatter: '{b}'
					},
					series: [{
						name: '中国',
						type: 'map',
						mapType: 'china',
						selectedMode: 'single',
						label: {
							normal: {
								show: true
							},
							emphasis: {
								show: true
							}
						}
					}]
				};
				if (option && typeof option === "object") {
					myChart.setOption(option, true);
				}

				myChart.on('click', function(params) {

					s.mouseover(params);
					setTimeout(() => {
					//	s.next();
					}, 100)
				});
				myChart.on('mouseover', (params) => {

					!this.showTable && s.mouseover(params);
				});
			},
			//Cascader
			getCascader() {
				var s = this;
				var provinceOptions = [];
				zmitiUtil.ajax({
					remark:'getcitylist',
					data:{
						action:tripActions.getCityList.action,
					},
					success(data){
						if(data.getret === 0){
							s.cityList = data.list[0].children;
						}
					}
				})
			},
			next() {
				var s = this;
				this.showTable = true;
				this.$nextTick(()=>{
					s.dataSource = s.defaultList.filter((item, i) => {
						return item.provname === s.state.currentProv;
					});
					s.state.dataSource.forEach((item, i) => {
						item.key = s.randomString(32);
					});

					var arr = [];

					var dataSource = [];
					s.state.dataSource.map((item, i) => {
						var isExists = false;
						dataSource.map((data, k) => {
							if (data.cityid === item.cityid) {
								isExists = true;
							}
						});
						if (!isExists) {

							dataSource.push(item);
						}
					});
					s.state.dataSource.length = 0;
					dataSource.forEach((data, k) => {
						s.state.jobList.map((item, i) => {

							s.state.dataSource.push({
								cityid: data.cityid,
								cityname: data.cityname,
								companyid: data.companyid,
								createtime: data.createtime,
								expenseid: data.expenseid,
								foodprice: 0,
								hotelprice1: 0,
								hotelprice2: 0,
								jobid: item.jobid,
								jobname: item.jobname,
								key: s.randomString(32),
								level: data.level,
								notes: data.notes,
								otherprice: 0,
								othertraficprice: 0,
								overratio: data.overratio,
								provid: data.provid,
								provname: data.provname
							})
						});
					});
					s.defaultList.forEach((item, i) => {
						s.state.dataSource.forEach((data, k) => {
							if (data.jobid === item.jobid && 　data.cityid === item.cityid) {
								data.expenseid = item.expenseid;
								data.foodprice = item.foodprice;
								data.hotelprice1 = item.hotelprice1;
								data.hotelprice2 = item.hotelprice2;
								data.othertraficprice = item.othertraficprice;
								data.otherprice = item.otherprice;
							}
						});
					});
					if (s.addDataSource) {
						s.addDataSource.map((item, i) => {
							var userid = s.props.params.userid ? s.props.params.userid : s.userid;

							var params = {
								userid: s.userid,
								getusersigid: s.getusersigid,
								setuserid: userid,
								provid: s.state.currentProvId, //this.state.inputValue[0],
								cityid: item.cityid, //this.state.inputValue[1],
								jobid: item.jobid,
								hotelprice1: 0,
								hotelprice2: 0,
								foodprice: 0,
								othertraficprice: 0,
								otherprice: 0,
							}

							$.ajax({
								type: 'POST',
								async: false,
								url: window.baseUrl + 'travel/add_expense/',
								data: params,
								success(data) {

									item.expenseid = data.key;
									//  message[data.getret === 0 ? 'success':'error'](data.getmsg);
								}
							});
						})
					}

					s.state.dataSource = s.state.dataSource.concat(s.addDataSource || []);

					s.dataSource.forEach((item, i) => {
						s.seasonList.map((sea, k) => {
							if (item.cityid === sea.cityid) {
								item.daterange = sea.daterange;
							}
						});

					});
					s.dataSort();


					s.$forceUpdate();
				})
			},

			dataSort() {
				var s = this;
				s.dataSource = s.dataSource.sort(function(param1, param2) {
					return param1.cityname.localeCompare(param2.cityname); //
				})
			},

			mouseover(params) {
				var s = this;
				var cityid = -1,
					index = -1,
					currentProv = '',
					currentProvId = -1;

				s.cityList.map((city, i) => {
					if (params.name === city.label) {
						cityid = city.value;
						index = i;
						currentProvId = city.value;
						currentProv = city.label
						return;
					}
				});
				if (cityid === -1 || index === -1) {
					return;
				}

				s.lastCityId = cityid;
				s.currentCityIndex = index;
				s.currentProvId = currentProvId;
				s.currentProv = currentProv;
				
				s.$nextTick(()=>{
					var height = s.$refs['city-C'].offsetHeight;
					s.fillDataSouce();
					s.cityList[index].children.forEach((item, i) => {
						s.dataSource.forEach((data, k) => {
							if (data.cityid === item.value) {
								item.isChecked = true;
							}
						});
					});

					var transY = params.event.offsetY - height;
					transY < 0 && (transY = 0);
					s.currentCityIndex = index;
					s.transX =  params.event.offsetX + 2;
					s.transY = transY;
				})
			},
			 fillDataSouce(data) {
				var s = this;
				s.defaultList = s.defaultList || data.list.concat([]);
				s.state.dataSource = s.defaultList.filter((item, i) => {
					return item.provname === s.state.currentProv;
				});

				s.dataSource.forEach((item, i) => {
					item.key = randomString(32);
				});
				s.$forceUpdate();
			}
		}
	}
</script>
 