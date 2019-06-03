<template>
	<div class="zmiti-home-main-ui lt-full">
		<div class='zmiti-home-main-content'>
			<header>
				<div class='zmiti-user-info'>
					<h2>
						<img :src="imgs.zmiti1" alt="">
						<span>{{userinfo.username}}</span>
					</h2>
					<div>{{date}}</div>
				</div>
				<div class='zmiti-weather-ui'>天气</div>
			</header>
			<section>
				<aside class='zmiti-company-product'>
					<div class='zmiti-company'></div>
					<div class='zmiti-product'></div>
				</aside>
				<aside class='zmiti-news-ui'>
					<div class='zmiti-news-C'>

					</div>
					<div class='zmiti-news-product'></div>
				</aside>
			</section>
		</div>
	</div>
</template>


<style lang="scss" scoped>
	@import './index.scss';
</style>

<script>
	import zmitiUtil from '../../common/lib/util';

	var userActions = zmitiUtil.userActions;

	
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				
				imgs:window.imgs,
				userinfo:{
					username:'一位巨蟹',
					avatar:window.imgs.zmiti1
				},
				companyInfo:[
					{
						companyname:'麟腾传媒文化有限公司',
						createDate:'2018-08-13',
						companyphone:'010-88050176',
						businesslicensepath:'',//营业执照
						companyaddress:"",
						companycode:'',
						corporationphone:'',//公司负责人电话
						companydocument	:"",//公司上传扫描文件。
						logourl:'',//公司logo
						contract:"",//公司合同扫描件
						comment:"",//备注
						isover:0,
						config:''
					}
				],
				date:""
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

			



		},
		
		methods:{

			
			
		}
	}
</script>
 

