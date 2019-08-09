<template>
	<div class="zmiti-home-main-ui lt-full">
		<div class='zmiti-home-main-content'>
			<header>
				<div class='zmiti-user-info'>
					<h2>
						<img :src="imgs.zmiti1" alt="">
						<span>{{userinfo.username}} </span>
						<span style="color:#f00;font-size:14px" v-if='false && !companyInfo.companyname'>您当前没有加入任何单位，请
							<a href='javascript:void(0)' @click="visiable = true" style="color:#00f;font-size:20px">选择一个单位</a>
						</span>
					</h2>
					<div>{{date}}</div>
				</div>
				<div class='zmiti-weather-ui'>
					<div>
						<div>
							<span>{{weatherObj.aqi.cityName}}</span>
						</div>
						<div>
							<span>{{weatherObj.briefcondition.temp}}度</span>
						</div>
					</div>
					<div>
						<img :src='imgs["W"+weatherObj.briefcondition.icon]' alt="">
					</div>
				</div>
			</header>
			<section>
				<aside class='zmiti-company-product'>
					<div class='zmiti-company'>
						<header>
							<div v-show='false' @click='currentCompanyIndex = i' :class="{'active':currentCompanyIndex === i}" v-for='(company,i) in companyList' :key="i">
								<img :src='company.logourl' alt="">
								<span>{{company.companyname}}</span>
							</div>

							<div class='active'>
								<span>{{companyInfo.companyname}}</span>
								 <router-link style='font-size:12px;cursor:pointer;color:#333;top:4px;position:relative;' to='/login' v-if='userinfo.info.company_list&&userinfo.info.company_list.length>1'>（切换）</router-link>
							</div>
						</header>
						<div class='zmiti-companyinfo'>
							<aside>
								<div class='zmiti-company-item'>
									<label>创建时间：</label><span>{{companyInfo.createtime}}</span>
									<label>单位电话：</label><span>{{companyInfo.companyphone}}</span>
								</div>
								<div class='zmiti-company-item'>
									<label>单位地址：</label><span>{{companyInfo.companyaddress}}</span>
								</div>
								<div class='zmiti-company-item'>
									<label>单位税号：</label><span>{{companyInfo.companycode}}</span>
								</div>
								<div class='zmiti-company-item'>
									<label>开户银行：</label><span>{{companyInfo.bank}}</span>
								</div>
								<div class='zmiti-company-file'>
									<div>
										<div class='zmiti-company-img' :style="{background:companyInfo.businesslicensepath?'url('+companyInfo.businesslicensepath+') no-repeat center center':'none',backgroundSize:'cover'}">
											<img v-if='companyInfo.businesslicensepath' v-show='false' :src="companyInfo.businesslicensepath" alt="">
											<span v-else>暂无</span>
										</div>
										单位营业执照
									</div>
									<div>
										<div class='zmiti-company-img' :style="{background:companyInfo.contract?'url('+companyInfo.contract+') no-repeat center center':'none',backgroundSize:'cover'}">
											<img v-if='companyInfo.contract' v-show='false' :src="companyInfo.contract" alt="">
											<span v-else>暂无</span>
										</div>
										单位合同扫描件
									</div>
								</div>
							</aside>
							<aside class='zmiti-company-user-C'>
								<ul>
									<li>
										<div></div>
										<div>姓名</div>
										<div>电话</div>
										<div>邮箱</div>
									</li>
									<li v-for='(user,i) in companyInfo.users' :key="i">
										<div class='zmt_iconfont' v-html='user.avatar'></div>
										<div>{{user.username}}</div>
										<div>{{user.usermobile}}</div>
										<div>{{user.useremail}}</div>
									</li>
								</ul>

								<div class='zmiti-company-user-more'>
									更多>>
								</div>
							</aside>
						
						</div>
					</div>
					<div class='zmiti-product'>
						<header>我的产品</header>
						<ul class='zmiti-scroll'>
							<li v-for='(p,i) in myProductList' :key="i">
								<span class='zmt_iconfont' v-html='p.icon'></span>
								<span>{{p.productname}}</span>
								<span v-if='p.isChecked'><Icon style="color:green;font-size:30px;" type="ios-checkmark" /></span>
							</li>
						</ul>
					</div>
				</aside>
				<aside class='zmiti-news-ui'>
					<div class='zmiti-news-C'>
						<header>新闻</header>
						<ul>
							<li class='zmiti-text-overflow' v-for='(news,i) in zmitiNews' :key="i">
								<a :href='news.href' target="_blank">{{news.title}}</a>
							</li>
						</ul>
						<div >更多>></div>

					</div>
					<div class='zmiti-news-product'>
						<header>新品消息</header>
						<ul>
							<li class='zmiti-text-overflow' v-for='(news,i) in productNews' :key="i">
								<a :href='news.href' target="_blank">{{news.title}}</a>
								<div>{{news.date}} <Button size='small'>新功能</Button></div>
							</li>
						</ul>
						<div >更多>></div>
					</div>
				</aside>
			</section>
		</div>
		<Modal title='选择单位' v-model="visiable" @on-ok='joinCompany' :loading="loadingCompanyModal">
			<ul class='zmiti-choose-company-list'>
				<li v-for="(com,i) in allCompanyList" :key="i" @click="currentChooseCompany = com" :class="{'active':com.companyid === currentChooseCompany.companyid}">
					{{com.companyname}}
				</li>
			</ul>
		</Modal>
	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var {cityActions,weatherActions,userActions,companyAdminActions} = zmitiUtil;
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				currentChooseCompany:{},
				visiable:false,
				loadingCompanyModal:true,
				imgs:window.imgs,
				userinfo:{
					username:'一位巨蟹',
					avatar:window.imgs.zmiti1,
					info:{}
				},	
				allCompanyList:[],
				currentCompanyIndex:0,
				weatherData:{},
				companyInfo:{},
				productNews:[
					{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#",
						date:'2019-06-19'
					},{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#",
						date:'2019-06-19'
					},{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#",
						date:'2019-06-19'
					}

				],
				zmitiNews:[
					{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#"
					},
					{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#"
					},{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#"
					},{
						title:'5月21日大数据总线（DataHub）升级通知5月21日大数据总线（DataHub）升级通知',
						href:"#"
					},{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#"
					},{
						title:'5月21日大数据总线（DataHub）升级通知',
						href:"#"
					}
				],
				myProductList:[

				],
				companyList:[
					{
						companyid:-1,
						companyname:'麟腾传媒文化有限公司',
						createtime:'2018-08-13',
						companyphone:'010-58522752',
						businesslicensepath:'./assets/images/zhizhao.jpg',//营业执照
						companyaddress:"北京市西城区宣武门西大街甲97号新华社发行楼",

						companycode:'911101130828040790',//税号
						bank:'中国银行',//开户行
						bankcode:"",//开户行账号
						logourl:'./assets/images/linten.png',//公司logo
						contract:"./assets/images/hetong.jpg",//公司合同扫描件
						comment:"",//备注
						isover:0,
						config:'',
						users:[
							{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},
							{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							}
						]
					},
					{
						companyid:0,
						companyname:'中国文明网',
						createtime:'2018-08-13',
						companyphone:'010-88050176',
						businesslicensepath:'',//营业执照
						companyaddress:"北京市西城区宣武门西大街甲97号新华社发行楼",
						companycode:'911101130828040790',//税号
						bank:'',//开户行
						bankcode:"",//开户行账号
						logourl:'./assets/images/wenming.png',//公司logo
						contract:"",//公司合同扫描件
						comment:"",//备注
						isover:0,
						config:'',
						users:[
							{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},
							{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							},{
								avatar:'&#xe6a5;',
								username:'徐畅',
								usermobile:'15718879215',
								useremail:'xuc@linten.cn'
							}
						]
					}
				],
				condition:{
					page_index:0,
					page_size:20
				},
				date:"",
				weatherObj:{
					briefcondition:"",
					aqi:'',
					
				},
				checkedProductList:[],
				tasks:[]
			}
		},
		components:{
		},

		beforeCreate(){
			window.s = this;
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		watch:{
			
		},
		mounted(){
			
			this.userinfo = zmitiUtil.getUserInfo();
			var week = ['日','一','二','三','四','五','六'];
			var D = new Date();
			var year = D.getFullYear();
			var month = D.getMonth()+1;
			var date = D.getDate();
			var day = "星期"+week[D.getDay()]



			this.date = '今日，'+year+'年'+month+'月'+date+'日 '+ day + ' ，欢迎回到智媒体2.0单位控制平台';


			this.getWeatherData();

			this.getCompanyInfo();
			this.getAllProductList();
			this.getCheckedProduct();

			Promise.all(this.tasks).then(()=>{
				this.myProductList.forEach((my,i)=>{
					this.checkedProductList.forEach(ch=>{
						if(ch.productid === my.productid){
							my.isChecked = true;
						}
					})
				})
				console.log(this.myProductList,this.checkedProductList)
			})


			/*  zmitiUtil.ajax({
				 remark:'getDepartmentList',
				 data:{
					action:companyAdminActions.getDepartmentList.action,
					condition:{

						start:1,
						companyid:2,

						page_index:0,
						page_size:12

					}
				 },
				 success(data){
					 console.log(data,'获取部门测试接口~~')
				 }
			 }) */
		},
		
		methods:{

			joinCompany(){
				var s = this;
				if(!s.currentChooseCompany.companyid){
					s.$Message['error']('请选择一个单位');
					return;
				}
				zmitiUtil.ajax({
					remark:'userApplyJoinCompany',
					data:{
						action:userActions.userApplyJoinCompany.action,
						companyid:s.currentChooseCompany.companyid
					},
					success(data){
						s.loadingCompanyModal = false;
						data.getret === 0 &&(s.visible = false);

						s.$Message[data.getret === 0 ?  'success':'error'](data.msg);						
					}
				})
			},


			getCheckedProduct(){
				var p1 = new Promise((resolve,reject)=>{
					
					zmitiUtil.getProductList((arr)=>{
						if(arr.getret === 0 ){
							this.checkedProductList = arr.list;
					    }
						resolve();
				   },this);
				})
				this.tasks.push(p1);
			},


			getCompanyList(){
				var s = this;
				zmitiUtil.ajax({
					remark:'getCompanyUserList',
					data:{
						action:userActions.searchCompanyList.action,
						condition:{
							page_index:0,
							page_size:20,
						}
					},
					success(data){
						if(data.getret ===0 ){
							s.allCompanyList = data.list;
						}
					}
				})
			},

			getAllProductList(){
				var p2 =  new Promise((resolve,reject)=>{

						var companyid = zmitiUtil.getCurrentCompanyId().companyid;
						var s = this;
						var {condition} = this;
						this.loading = true;
						zmitiUtil.ajax({
							remark:"getAllProductList",
							data:{
								action:userActions.getAllProductList.action,
								condition
							},
							error(){
								s.loading = false;
								reject();
							} ,
							success(data){
								s.loading = false;

								if(data.getret === 0){
									s.myProductList = data.list;
								}
								resolve();
							}
						})
				});
				this.tasks.push(p2)
			},
			getCompanyInfo(){
				var companyid = zmitiUtil.getCurrentCompanyId().companyid;
				var s = this;
				if(!companyid){
					this.getCompanyList();
					return;
				}
				this.loading = true;
				zmitiUtil.ajax({
					remark:"getCompanyInfo",
					data:{
						action:userActions.getCompanyInfo.action,
						companyid
					},
					error(){
						s.loading = false;
					} ,
					success(data){
						s.loading = false;
						console.log(data,'data');
						if(data.getret === 0){
							s.companyInfo = data.info;
						
						}
					}
				})

			},
			getWeatherData(){
				zmitiUtil.ajax({
					remark:'getWeatherData',
					_ui:{
						type:2
					},
					data:{
						action:weatherActions.getWeatherData.action,
						
					},
					success(data){
						if(data.getret === 0){
							s.weatherObj = data.data
						}
					}
				})
			}
			
			
		}
	}
</script>
 

