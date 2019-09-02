<template>
	<div class="zmiti-home-main-ui">
		<div class='zmiti-home-main-content'>
			<header>
				<div class='zmiti-user-info'>
					<div><img :src="imgs.zmiti1" alt=""></div>
					<div class="zmiti-user-text">
						<div>
							<span class="zmiti-user-name">{{userinfo.username}}</span>
							<Icon type="logo-android" color="#2d8cf0" size="22"/>
							<Icon type="logo-github" color="#87d068" size="22"/>
							<span class="zmiti-user-time">{{curTime}}</span>
						</div>
						<div>欢迎回到智媒体2.0单位控制平台</div>
					</div>
					<div>
						<span style="color:#f00;font-size:14px" v-if='false && !companyInfo.companyname'>您当前没有加入任何单位，请
							<a href='javascript:void(0)' @click="visiable = true" style="color:#00f;font-size:20px">选择一个单位</a>
						</span>
					</div>					
				</div>
				<div class="zmiti-message"><span>公告：</span>{{date}}</div>
				<div class='zmiti-weather-ui'>
					<div>
						<div class="zmiti-weather-pic">
							<img :src='imgs["W"+weatherObj.briefcondition.icon]' alt="">
							<p>{{weatherObj.briefcondition.condition}}</p>
						</div>
						<div class="zmiti-weather-degree">
							<div>
								<div class="zmiti-weather-num">{{weatherObj.briefcondition.temp}}<span>℃</span></div>
								<div></div>
								<div>
									<p><span>{{weatherObj.briefcondition.quality}}</span></p>
									<p>{{weatherObj.briefcondition.windDir}}+{{weatherObj.briefcondition.windLevel}}级</p>
								</div>
							</div>
							<p>{{weatherObj.aqi.cityName}} | {{weatherObj.aqi.cityInfo}}</p>
						</div>
					</div>
				</div>
			</header>
			<section>
				<div class="zmiti-company-info">
					<div class="zmiti-company-info-item">
						<div><Icon type="ios-home-outline" color="#2d8cf0" size="28"/></div>
						<div>32</div>
						<div>单位数量</div>
						<div><a @click="visiable=true;">加入单位</a><a @click="showAddCompanyPanel">创建单位</a></div>
					</div>
					<div class="zmiti-company-info-item">
						<div><Icon type="ios-contacts-outline" color="rgb(248, 155, 56)" size="28"/></div>
						<div>322</div>
						<div>单位成员总数</div>
						<div><img :src="imgs.zmiti1" alt=""><img :src="imgs.zmiti1" alt=""></div>
					</div>
					<div class="zmiti-company-info-item">
						<div><Icon type="ios-list-box-outline" color="#87d068" size="28"/></div>
						<div>3e22</div>
						<div>我的工单总数</div>
						<div>已读121</div>
					</div>
					<div class="zmiti-company-info-item">
						<div><Icon type="ios-chatboxes-outline" color="rgb(129, 30, 178)" size="28"/></div>
						<div>35422</div>
						<div>站内信息总数</div>
						<div>已读32121</div>
					</div>
				</div>
			</section>
			<section>
				<div class="zmiti-company-list">
					<div class="zmiti-myproduct">
						<div>
							<header><Icon type="ios-cube-outline" color="#dddd21" size="25"/>我的产品</header>
							<ul class='zmiti-scroll'>
								<li v-for='(p,i) in myProductList' :key="i">
									<span class='zmt_iconfont' v-html='p.icon'></span>
									<span>{{p.productname}}</span>
									<span v-if='p.isChecked'><Icon style="color:green;font-size:30px;" type="ios-checkmark" /></span>
								</li>
							</ul>
						</div>
					</div>				
					<div class="zmiti-message">
						<div>
							<div class="zmiti-news">
								<div>
									<header><Icon type="ios-globe-outline" color="#c61010" size="25"/>新闻</header>
									<ul>
										<li class='zmiti-text-overflow' v-for='(news,i) in zmitiNews' :key="i">
											<a :href='news.href' target="_blank">{{news.title}}</a>
										</li>
										<li><a class="zmiti-news-more">更多>></a></li>
									</ul>								
								</div>
							</div>
							<div class='zmiti-news'>
								<div>
									<header><Icon type="md-star-outline" color="#f220f3" size="25"/>新品消息</header>
									<ul>
										<li class='zmiti-text-overflow' v-for='(news,i) in productNews' :key="i">
											<a :href='news.href' target="_blank">{{news.title}}</a>
											<div>{{news.date}} <span>新功能</span></div>
										</li>
										<li><a class="zmiti-news-more">更多>></a></li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- <section style="display:none;">
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
								<div class='zmiti-create-company-btn' @click="showAddCompanyPanel">创建单位</div>
								<div @click="visiable=true;" class='zmiti-joincompany-btn'>加入单位</div>
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
						<a class="zmiti-news-more">更多>></a>

					</div>
					<div class='zmiti-news-product'>
						<header>新品消息</header>
						<ul>
							<li class='zmiti-text-overflow' v-for='(news,i) in productNews' :key="i">
								<a :href='news.href' target="_blank">{{news.title}}</a>
								<div>{{news.date}} <Button size='small'>新功能</Button></div>
							</li>
						</ul>
						<a class="zmiti-news-more">更多>></a>
					</div>
				</aside>
			</section> -->
		</div>
		<Modal title='选择单位' v-model="visiable" @on-ok='joinCompany' :loading="loadingCompanyModal">
			<ul class='zmiti-choose-company-list'>
				<li v-for="(com,i) in allCompanyList" :key="i" @click="currentChooseCompany = com" :class="{'active':com.companyid === currentChooseCompany.companyid}">
					{{com.companyname}}
				</li>
			</ul>
		</Modal>

		<ZmitiMask v-model='showDetailPage' @closeMaskPage='closeMaskPage'>
			<div slot='mask-content' name='detail'>
				<section class='zmiti-add-form zmiti-scroll'  >
					<header class='zmiti-add-header'>
						<img :src="imgs.back" alt=""  @click='closeMaskPage' >
						<span>基础信息</span>
					</header>
					<div class='zmiti-company-avatar' @click="showAvatarModal = true">
						<span class='zmt_iconfont' v-html='formCompany.logourl'></span>
						<label>更换头像</label>
					</div>
					<Form class='zmiti-add-form-C' :model="formCompany" :label-width="120">
						<FormItem label="单位名称：">
							<Input v-model="formCompany.companyname" placeholder="单位名称：" />
						</FormItem>
						<FormItem label="单位地址：">
							<Input v-model="formCompany.companyaddress" placeholder="单位地址：" />
						</FormItem>
						<FormItem label="纳税识别号：">
							<Input v-model="formCompany.companycode" placeholder="纳税识别号：" />
						</FormItem>
						<FormItem label="单位电话：">
							<Input v-model="formCompany.companyphone" placeholder="单位电话：" />
						</FormItem>
						<FormItem label="开户行：">
							<Input v-model="formCompany.bank" placeholder="开户行：" />
						</FormItem>
						<FormItem label="开户行账号：">
							<Input v-model="formCompany.bankcode" placeholder="开户行账号：" />
						</FormItem>
						<FormItem label="单位合同扫描件：">
							<Input v-model="formCompany.contract" placeholder="单位合同扫描件：" />
						</FormItem>
						<FormItem label="营业执照：">
							<Input v-model="formCompany.businesslicensepath" placeholder="营业执照：" />
						</FormItem>
						<FormItem label="标识：">
							<RadioGroup v-model="formCompany.isover">
								<Radio :value='1' :label="1">正常使用</Radio>
								<Radio :value='0' :label="0">禁用</Radio>
							</RadioGroup>
						</FormItem>
						<!-- <FormItem label="单位管理员：">
							<Select v-model="formCompany.userid">
								<Option :value="user.userid" v-for='(user,i) of userList' :key="i">
									{{user.username}}
								</Option>
							</Select>
						</FormItem> -->

						
						
						<FormItem label="备注：">
							<Input v-model="formCompany.comment" placeholder="备注：" />
						</FormItem>
						<FormItem label="配置：">
							<Input v-model="formCompany.config" placeholder="配置：" />
						</FormItem>
						
					</Form>
					
					<div class='zmiti-add-form-item zmiti-add-btns'>
						<Button size='large' type='primary' @click='addCompany'>确定</Button>
					</div>
					
				</section>
			</div>
		</ZmitiMask>
 
		<Avatar v-model="showAvatarModal" :avatar='formCompany.avatar' @getAvatar='getAvatar'></Avatar>
	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';
	var {cityActions,weatherActions,userActions,companyAdminActions} = zmitiUtil;
	import Vue from 'vue';
	import Avatar from '../../common/avatar';
	import ZmitiMask from '../../common/mask/';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				showAvatarModal:false,
				currentChooseCompany:{},
				visiable:false,
				formCompany:{},
				loadingCompanyModal:true,
				imgs:window.imgs,
				userinfo:{
					username:'一位巨蟹',
					avatar:window.imgs.zmiti1,
					info:{}
				},
				curTime:'',
				allCompanyList:[],
				currentCompanyIndex:0,
				showDetailPage:-1,
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
					briefcondition:{						
					},
					aqi:{					
					}					
				},
				checkedProductList:[],
				tasks:[]
			}
		},
		components:{
			ZmitiMask,
			Avatar
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
			this.curTime = year+'年'+month+'月'+date+'日 '+ day;

			this.getWeatherData();

			this.getCompanyInfo();
			this.getCompanyList();
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

			showAddCompanyPanel(){
				Vue.obserable.trigger({type:'toggleMask',data:true});
			},

			addCompany(){
				var s = this;
				var id = this.formCompany.companyid;
				var action = userActions.addCompany.action;
				this.formCompany.userid = zmitiUtil.getUserInfo().ui.userid;
				zmitiUtil.ajax({
					remark:'addCompany',
					data:{
						action,
						info:s.formCompany
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							s.showDetail = false;
							Vue.obserable.trigger({type:'toggleMask',data:false});
						}
					}
				})
			},
			getAvatar(avatar){
				this.formCompany.avatar = avatar;
			},

			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},

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
							s.weatherObj = data.data;
						}
					}
				})
			}
			
			
		}
	}
</script>
 

