<template>
	<div class="zmiti-orderfood-main-ui lt-full">
		<div class='zmiti-orderfood-left-table-C'>
			<header>
				<div>订餐预览表</div>
				<div>
					<Button :loading='loading' @click='refresh' type="primary">刷新</Button>
				</div>
			</header>
			<header class='zmiti-orderfood-count'>今日订餐人数：{{todayNumber}}人</header>
			<div class='zmiti-orderfood-table'>
				<header>
					<div>
						<span @click="dataChange('year','reduce')"><Icon type="ios-arrow-back" /><Icon type="ios-arrow-back" /></span>
						<span @click="dataChange('month','reduce')"><Icon type="ios-arrow-back" /></span>
					</div>
					<div>{{year}}年{{month}}月</div>
					<div>
						<span @click="dataChange('year','add')"><Icon type="ios-arrow-forward" /><Icon type="ios-arrow-forward" /></span>
						<span @click="dataChange('month','add')"><Icon type="ios-arrow-forward" /></span>
					</div>
				</header>
				<ul class='zmiti-orderfood-datepicker'>
					<li class='zmiti-orderfood-week' v-for='(week) in weeks' :key="week" style="font-weight:bold;line-height:40px;height:40px;">
						{{week}}
					</li>
					<li @click='getDetail(i)' v-for='(date,i) in datePicker' :key="i" :class="{'disabled':( i - weekIndexOfFirstDay + 1) > monthdateCount,'active':i- weekIndexOfFirstDay + 1 === today && year  === currentYear &&　month === currentMonth}" >
						<span v-if='weekIndexOfFirstDay<=i'>
							{{( i - weekIndexOfFirstDay + 1) > monthdateCount?i-weekIndexOfFirstDay+1-monthdateCount:i-weekIndexOfFirstDay+1}}
						</span>
						<div v-for='(data,l) in dataSource.filter((dt)=>{return i- weekIndexOfFirstDay + 1 === dt.bookday.split("-")[2]*1 })' :key="l" style="position:relative;top:2px;" >
							<span style='font-size:12px;color:#888;' v-if=' i-weekIndexOfFirstDay+1 === data.bookday.split("-")[2]*1'>订餐:{{data.number}}人</span>
						</div>
					</li>
				</ul>
			</div>
		</div>
		<div class='zmiti-orderfood-right-setting'>
			<header>
				<span class='zmt_iconfont'>&#xe7e8;</span>	基础设置
			</header>
			<div class='zmiti-allow-orderfood'>
				<div>允许订餐时间：</div>
				 <TimePicker
				  v-model="begintime"
                placeholder="请选择订餐开始时间"
                style="width: 47%"></TimePicker>
				~
				<TimePicker
				  v-model="endtime"
                placeholder="请选择订餐开始时间"
                style="width: 47%"></TimePicker>
			</div>

			<div class='zmiti-admin-setting'>
				<div>管理员设置</div>
				<RadioGroup v-model="isalluser">
					<Radio :value='0' :label="0">全部</Radio>
					<Radio :value='1' :label='1'>指定人员</Radio>
				</RadioGroup>

				<Select v-if='isalluser === 1' multiple v-model="users">
					<Option  :value='user.userid' :label="user.realname" v-for='(user,i) in userList' :key="i">
						{{(user.user.realname||user.user.username)+ ' ( '+user.user.usermobile+ ' ) '}}
					</Option>
				</Select>

				<div style="margin-top:20px;width:80%;margin:20px auto;">
					<Button long type="primary" size='large' @click='setOrderFoodConfigTop'>确定</Button>
				</div>
			</div>


		</div>

			<ZmitiMask @closeMaskPage='closeMaskPage'>
			<div slot='mask-content'>
				<section class='zmiti-add-form zmiti-scroll' >
					<header class='zmiti-add-header'>
						<img :src="imgs.back" alt=""  @click='closeMaskPage' >
						<span>今日订餐列表</span>
					</header>
					<h2 style="height:40px;"></h2>
					<Table :columns='columns' :data='orderFoodDetailData'></Table>
				</section>
			</div>
		</ZmitiMask>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiMask from '../../../common/mask';
	var {orderFoodActions,userActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				datePicker:new Array(35),
				weeks:['日','一','二','三','四','五','六'],
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				loading:false,
				isalluser:1,
				monthdateCount:30,
				year:2019,
				endtime:'',
				today:0,
				currentYear:new Date().getFullYear(),
				currentMonth:new Date().getMonth()+1,
				users:[],
				imgs:window.imgs,
				begintime:'',
				month:7,
				dataSource:[],
				currentWeekIndex:-1,
				weekIndexOfFirstDay:0,//获取月份第一天的是周几
				orderFoodDetailData:[],
				columns:[
					 {
						 title:"姓名",
						 key:'username',
						 align:'center'
					 },
					 {
						 title:"电话",
						 key:'mobile',
						 align:'center'
					 },
					 {
						 title:"订餐人数",
						 key:'number',
						 align:'center'
					 }
				 ],
				userinfo:{},
				userList:[],
				todayNumber:0,
				condition:{
					page_index:0,
					page_size:200,
				},
			}
		},
		components:{
			ZmitiMask
		},

		beforeCreate(){
			
		},
		mounted(){

			this.setMonth(2019,8);

			this.today = new Date().getDate();

			this.init(()=>{

				this.monthdateCount = this.getDateByMonth();
				
	
				this.currentWeekIndex = this.getCurrentWeekIndex();
	
				this.weekIndexOfFirstDay = this.getCurrentWeekIndex(1);//获取月份第一天是周几
	
				this.getDataList();
				this.getOrderFoodConfigTop();

				this.statisticsOrderFoodUserCount(()=>{

					this.getDateRangeOrderFoodCount();
				});

			})
			
 
			//
			
		},

		watch:{


			$route:{
				handler(){
					var productid = this.productid;
					productid && this.$router.push({path:'/orderfood/'+productid});
				}
			}
			
			
		},
		
		methods:{

			refresh(){
				this.init(()=>{

					this.monthdateCount = this.getDateByMonth();
					
		
					this.currentWeekIndex = this.getCurrentWeekIndex();
		
					this.weekIndexOfFirstDay = this.getCurrentWeekIndex(1);//获取月份第一天是周几
		
					this.getDataList();
					this.getOrderFoodConfigTop();
					this.loading = true;
					this.statisticsOrderFoodUserCount(()=>{

						this.getDateRangeOrderFoodCount();
					});

				})
			},

			getDetail(i){
				Vue.obserable.trigger({
					type:"toggleMask",
					data:true
				});

				var s = this;

				var date = i-this.weekIndexOfFirstDay+1;
				
				var daytime = [this.year,this.month,date].join('-')

				
				zmitiUtil.ajax({
					remark:'getOrderFoodDetailByDate',
					data:{
						action:orderFoodActions.getOrderFoodDetailByDate.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.$route.params.id,
							daytime
						}
					},
					success(data){ 

						if(data.getret === 0){
							s.orderFoodDetailData = data.list;
						}
					}
				})

			},
			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
		    
			dataChange(type,operator){

				if(type==='month'){
					if(operator === 'add'){
						this.month++;
						if(this.month>12){
							this.month = 1;
						}
					}else{
						this.month--;
						if(this.month<1){
							this.month = 12;
						}
					}
				}
				else{
					if(operator === 'add'){
						this.year++;
						
					}else{
						this.year--;
					}
				}
				
				this.setMonth(this.year,this.month);
				this.monthdateCount = this.getDateByMonth();
				this.currentWeekIndex = this.getCurrentWeekIndex();
	
				this.weekIndexOfFirstDay = this.getCurrentWeekIndex(1);//获取月份第一天是周几
	
				this.getOrderFoodConfigTop();



				this.statisticsOrderFoodUserCount(()=>{
					this.getDateRangeOrderFoodCount();
				});

			},

			init(fn){
				var s = this;
				var t = setInterval(() => {
					if(Vue.productList){
						clearInterval(t);
						var productid =  this.$route.params.id ;
						if(!productid){
							Vue.productList.forEach(p=>{
								if(s.$route.name.indexOf(p.producturl.substr(1))>-1){
									productid  = p.productid;
								}
							})
						}
						this.$router.push({path:'/orderfood/'+productid});
						this.productid = productid;
						fn && fn(productid)
					}
				}, 100);
			},

			getOrderFoodConfigTop(){//获取订餐人员
				var s = this;
				
				zmitiUtil.ajax({
					remark:'getOrderFoodConfigTop',
					data:{
						action:orderFoodActions.getOrderFoodConfigTop.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.$route.params.id,
						}
					},
					success(data){
						
						if(data.getret === 0){
							
							s.begintime = data.list.begintime;
							s.endtime = data.list.endtime;
							s.configid =data.list.configid;
							s.isalluser = data.list.isalluser;
							s.users = data.list.users.map((item)=>{return item.userid});
						}
					}
				})
			},

			setOrderFoodConfigTop(){//设置订餐人员
				var s = this;
				zmitiUtil.ajax({
					remark:'setOrderFoodConfigTop',
					data:{
						action:orderFoodActions.setOrderFoodConfigTop.action,
						info:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							isalluser:s.isalluser,
							productid:s.$route.params.id,
							begintime:s.begintime,
							endtime:s.endtime,
							configid:s.configid,
							users:s.users.join(',')
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
					}
				})

			},

			

			getDateRangeOrderFoodCount(){//获取某个时间段内的用户用餐人数
				var s = this;
				zmitiUtil.ajax({
					remark:'getDateRangeOrderFoodCount',
					data:{
						action:orderFoodActions.getDateRangeOrderFoodCount.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.$route.params.id,
							begintime:[s.year,s.month,'01'].join('-') + ' 00:00:00',
							endtime:[s.year,s.month,s.monthdateCount<10?'0'+s.monthdateCount:s.monthdateCount].join('-')+ ' 23:59:59'
							
						}
					},
					success(data){
						s.loading = false;
						if(data.getret === 0){
							s.dataSource = data.list;
							s.dataSource.forEach((item)=>{
								var [year,month,day] = item.bookday.split('-');
								if(year*1 === s.year && month*1 === s.currentMonth && day*1 === s.today){
									s.todayNumber = item.number;
								}
							})
						}
					}
				})
			},
			
			statisticsOrderFoodUserCount(fn){//统计某个时间段内订餐人数
				var s = this;
				zmitiUtil.ajax({
					remark:'statisticsOrderFoodUserCount',
					data:{
						action:orderFoodActions.statisticsOrderFoodUserCount.action,
						condition:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.$route.params.id,
							begintime:[s.year,s.month,'01'].join('-'),
							endtime:[s.year,s.month,s.monthdateCount<10?'0'+s.monthdateCount:s.monthdateCount].join('-')
						}
					},
					success(data){
						if(data.getret === 0){
							fn && fn();
						}
					}
				})
			},

			setMonth(year= new Date().getFullYear(),month = new Date().getMonth()+1){
				this.year = year;
				this.month = month;
			},

			getCurrentWeekIndex(date){
				var {year,month} = this;
				var d = new Date(year, month, 0);
				if(date){
					d.setYear(year);
					d.setMonth(month-1);
					d.setDate(1);
					d.setDate(date);


				}
				return d.getDay();
				
			},

			getDateByMonth(){
				var {year,month} = this;
				var d = new Date(year, month, 0);
				return d.getDate();
			},
			getDataList(){
				var s = this;
				var {condition} = this;
				condition = Object.assign(condition,{
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				})
				zmitiUtil.ajax({
					remark:"getCompanyUserList",
					data:{
						action:userActions.getCompanyUserList.action,
						condition
					},
					error(){
						s.loading = false;
					} ,
					success(data){
						s.loading = false;
						if(data.getret === 0){
							s.total = data.total;
							s.userList = data.list;
						}
					}
				})
			},
			formatDate(date, format) {
				if (!date) return;
				if (!format)
					format = "yyyy-MM-dd H:mm:ss";
				switch (typeof date) {
				case "string":
					date = new Date(date.replace(/-/, "/"));
					break;
				case "number":
					date = new Date(date);
					break;
				}
				if (!date instanceof Date) return;
				var dict = {
					"yyyy" : date.getFullYear(),
					"M" : date.getMonth() + 1,
					"d" : date.getDate(),
					"H" : date.getHours(),
					"m" : date.getMinutes(),
					"s" : date.getSeconds(),
					"MM" : ("" + (date.getMonth() + 101)).substr(1),
					"dd" : ("" + (date.getDate() + 100)).substr(1),
					"HH" : ("" + (date.getHours() + 100)).substr(1),
					"mm" : ("" + (date.getMinutes() + 100)).substr(1),
					"ss" : ("" + (date.getSeconds() + 100)).substr(1)
				};
				return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
					return dict[arguments[0]];
				});
			}


		}
	}
</script>
 