<template>
	<div class="zmiti-tripexpence-main-ui">

		 <div :class="{'hide':showTable}" ref='tripexpence-main-ui' class='zmiti-tripexpence-map lt-full'>

		 </div>
		 <div :class="{'active':showTable}" v-if='showTable' class='zmiti-tripexpence-table lt-full'>
			 <header>
				 <div>
					 <span>{{currentProv}}</span>
					 -差旅费
				 </div>
				 <div>
					 <Button @click="back" type="primary">返回</Button>
				 </div>
			 </header>
			 <div class='zmiti-scroll' :style="{height:viewH - 110+'px'}">
				
				<ZmitiTable :border='true' :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total" @getSelection='getSelection'>
					<div slot='table-btns' style="display:inline-block">
						<Poptip
							confirm
							title="确定要删除吗?"
							@on-ok='selectionDelete'
							>
							<div class='zmiti-table-btn'>删除</div>
							
						</Poptip>
						<div class='zmiti-table-btn'>禁用</div>
					</div>
				</ZmitiTable>
			 </div>
		 </div>

		<ul v-if='cityList[currentCityIndex] && !showTable' ref='city-C' class='tripexpence-citylist'  :style="{transform:'translate3d('+(transX)+'px,'+transY+'px,0)'}">
			<li :key='i' v-for='(item,i) in cityList[currentCityIndex].children'>
				<Checkbox
					:checked='item.isChecked'
					@on-change='selectCity(item)'
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

	import ZmitiTable from '../../../common/table';

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
				addDataSource:[],
				imgs:window.imgs,
				total:0,
				loading:true,
				currentCityIndex: -1,
				currentCityId: -1,
				transX: 0,
				transY: 0,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				jobList:[],
				columns:[
					{
					title: '市',
					dataIndex: 'cityname',
					key: 'cityname',
					width:100,
					align:'center',
				}, {
					title: '职务',
					dataIndex: 'jobname',
					key: 'jobname',
					width:100,
					render:(h,params)=>{
						

						return h('ul',{class:'zmiti-trip-ul'},(params.row.list||[]).map((item)=>{
							return h('li',{},item.jobname);
						}))

					}
					
				}, {
					title: '淡季住宿标准',
					dataIndex: 'hotelprice1',
					key: 'hotelprice1',
					width:100,

					render:(h,params)=>{
						
						return h('ul',{
							class:'zmiti-trip-ul'
						},(params.row.list||[]).map((item)=>{
							return h('li',{},item.hotelprice1);
						}))
					}

				}, {
					title: '旺季住宿标准',
					dataIndex: 'hotelprice2',
					key: 'hotelprice2',
					width:100,
					
					
					render:(h,params)=>{
						
						return h('ul',{
							class:'zmiti-trip-ul'
						},(params.row.list||[]).map((item)=>{
							return h('li',{},item.hotelprice2);
						}))
					}
				}, {
					title: '伙食费',
					dataIndex: 'foodprice',
					key: 'foodprice',
					width:100,
					
					render:(h,params)=>{
						
						return h('ul',{
							class:'zmiti-trip-ul'
						},(params.row.list||[]).map((item)=>{
							return h('li',{},item.foodprice);
						}))
					}
				}, {
					title: '交通补助',
					dataIndex: 'othertraficprice',
					key: 'othertraficprice',
					width:100,
					
					render:(h,params)=>{
						return h('ul',{
							class:'zmiti-trip-ul'
						},(params.row.list||[]).map((item)=>{
							return h('li',{},item.othertraficprice);
						}))
					}
				}, {
					title: '旺季',
					dataIndex: 'daterange',
					key: 'daterange',
					
					render:(h,params)=>{
						// <DatePicker type="datetimerange" format="yyyy-MM-dd HH:mm" placeholder="Select date and time(Excluding seconds)" style="width: 300px"></DatePicker>
						if(params.row.daterange){

							var arr = params.row.daterange.split('/');
							return h('div',[...arr.map((item)=>{
								return h('div',{
									style:{
										margin:'4px 0'
									}
								},[
									h('DatePicker',{
										style:{
										},
										props:{
											size:'small',
											format:"yyyy-MM-dd",
											type:'datetimerange',
											value:item.split(',')
										}
									}),
									h('Button',{
										props:{
											type:'primary',
											size:'small'
										}
									},'删除')

								])
							}),h('Button',{
								props:{
									size:'small',
									type:'primary'
								},
								on:{
									'click':()=>{
										this.addSeason(params.row,params.index);
									}
								}
							},'添加')],'')
						}else{
							return h('Button',{
								props:{
									type:'primary',
									size:'small'
								}
							},'添加');
						}
						
					}

				}],

				showTable:false,
				
				formUser:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				cityList:[],
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				currentProvId: '',
				currentProv: '',
				seasonList: [], //淡旺季列表。
			}
		},
		components:{
			ZmitiTable
		},

		beforeCreate(){
			
		},
		mounted(){

			setTimeout(() => {
				this.initEcharts();
				this.getCascader();
				this.bindNewdata();
				this.loadJobList();
				this.loadSeasonData(); //加载淡旺季列表。
			}, 100);
			
		},

		watch:{
			

			showDetail(val){
				
			},
			
			
		},
		
		methods:{
			addSeason(sea, isNew) {

				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var startDate = year + '-' + month + '-' + day;

				/* if (isNew) {
					sea.daterange = startDate + ',' + startDate;
					sea.daterange1 = startDate + ',' + startDate;
				} else {
					sea.daterange += "/" + startDate + ',' + startDate;
					sea.daterange1 += '/' + startDate + ',' + startDate;
				} */
				sea.daterange += "/" + startDate + ',' + startDate;
			
				var s = this;
				
				var productid =  this.$route.params.id ;

				var info = {
					companyid:zmitiUtil.getCurrentCompanyId().companyid,
					productid,
					daterange:sea.daterange,
					seasontype:0,
					provid:sea.provid,
					cityid:sea.cityid,

				}
				zmitiUtil.ajax({
					remark:"addSeason",
					data:{
						action:tripActions.addSeason.action,
						info
					},
					success(data){
						s.loading = false;
						s.$Message[data.getret === 0 ?'success':'error'](data.mgs);
						if(data.getret === 0){
						}
					}
				})
				//var type = 'edit_seasondate';

			},
			change(){},
			selectionDelete(){

			},
			getSelection(){},
			back(){
				this.showTable = false;
				this.addDataSource = [];
			},


			selectCity(item) {
				item.isChecked = true;
				var s = this;
				this.addDataSource = this.addDataSource || [];
				this.jobList.map((data, i) => {
					this.addDataSource.push({
						cityid: item.value,
						cityname: item.label,
						companyid: zmitiUtil.getCurrentCompanyId().companyid,
						createtime: '',
						expenseid: '',
						foodprice: 0,
						hotelprice1: 0,
						hotelprice2: 0,
						jobid: data.jobid,
						jobname: data.jobname,
						key: randomString(32),
						level: data.level,
						notes: data.notes,
						otherprice: 0,
						othertraficprice: 0,
						overratio: 0,
						provid: s.currentProvId,
						provname: s.currentProv
					});

				});
				this.$forceUpdate();
			},

			loadJobList(){
				var {condition} = this;
				var s = this;
				var t = setInterval(() => {
					if(Vue.productList){
						clearInterval(t);

						if(!productid){

							Vue.productList.forEach(p=>{
								if(s.$route.name.indexOf(p.producturl.substr(1))>-1){
									productid  = p.productid;
								}
							})
							
						}
						this.$router.push({path:'/trip/'+productid});
						var productid =  this.$route.params.id ;

						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						})
						zmitiUtil.ajax({
							remark:"getJobList",
							data:{
								action:tripActions.getJobList.action,
								condition:condition
							},
							success(data){
								s.loading = false;
								if(data.getret === 0){
									s.total = data.total;
									s.jobList = data.list;
								}
							}
						})
					}
				}, 100);

				
			},

			loadSeasonData() {
				 var {condition} = this;
				var s = this;
				var t = setInterval(() => {
					if(Vue.productList){
						clearInterval(t);

						if(!productid){

							Vue.productList.forEach(p=>{
								if(s.$route.name.indexOf(p.producturl.substr(1))>-1){
									productid  = p.productid;
								}
							})
							
						}
						var productid =  this.$route.params.id ;
						condition = Object.assign(condition,{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						})
						zmitiUtil.ajax({
							remark:"getCompanySeasonDateList",
							data:{
								action:tripActions.getCompanySeasonDateList.action,
								condition:condition
							},
							success(data){
								s.loading = false;
								console.log(data,'seasonList')
								if(data.getret === 0){
									 s.seasonList = data.list;
								}
							}
						})
					}
				}, 100);
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
						return item.provname === s.currentProv;
					});
				 
					var arr = [];
					 
					s.dataSource.forEach((item, i) => {
					
						var exists = false;
						arr.forEach((ar,i)=>{
							if(ar.cityid === item.cityid){
								exists = true;//存在
								ar.list.push({
										othertraficprice:item.othertraficprice,
										hotelprice1:item.hotelprice1,
										foodprice:item.foodprice,
										hotelprice2:item.hotelprice2,
										jobname:item.jobname,
										provid:item.provid,
										jobid:item.jobid,
								})
							}
						});
						if(!exists){
							arr.push({
								expenseid:item.expenseid,
								cityid:item.cityid,
								cityname:item.cityname,
								provid:item.provid,
								list:[
									{
										othertraficprice:item.othertraficprice,
										hotelprice1:item.hotelprice1,
										foodprice:item.foodprice,
										hotelprice2:item.hotelprice2,
										jobname:item.jobname,
										provid:item.provid,
										jobid:item.jobid,
									}
								]
							})
						}
					});

					s.dataSource = arr;
					s.total = arr.length;
					s.dataSource.forEach((item, i) => {
						s.seasonList.map((sea, k) => {
							if (item.cityid === sea.cityid) {
								item.daterange = sea.daterange;
							}
						});
					});

					console.log(s.dataSource,'.....')
					/* dataSource.forEach((data, k) => {
						s.jobList.map((item, i) => {

							s.dataSource.push({
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
								key: randomString(32),
								level: data.level,
								notes: data.notes,
								otherprice: 0,
								othertraficprice: 0,
								overratio: data.overratio,
								provid: data.provid,
								provname: data.provname
							})
						});
					}); */

					/* s.defaultList.forEach((item, i) => {
						s.dataSource.forEach((data, k) => {
							if (data.jobid === item.jobid && 　data.cityid === item.cityid) {
								data.expenseid = item.expenseid;
								data.foodprice = item.foodprice;
								data.hotelprice1 = item.hotelprice1;
								data.hotelprice2 = item.hotelprice2;
								data.othertraficprice = item.othertraficprice;
								data.otherprice = item.otherprice;
							}
						});
					}); */

					if (s.addDataSource) {

						return;
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

			bindNewdata() {
				var s = this;
				zmitiUtil.ajax({
					remark:'getExpenselist',
					data:{
						action:tripActions.getExpenselist.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid
						},
						
					},
					success(data){
						if (data.getret === 0) {
							s.fillDataSouce(data);
						}
					}
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
				s.dataSource = s.defaultList.filter((item, i) => {
					return item.provname === s.currentProv;
				}).concat([]);
				
				s.$forceUpdate();
			}
		}
	}
</script>
 