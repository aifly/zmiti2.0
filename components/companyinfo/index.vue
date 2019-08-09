<template>
	<div class="zmiti-company-main-ui">			
			<div class='zmiti-company-main-inner zmiti-scroll' :style="{height:viewH - 60+'px' }">
				<div class="zmiti-systemhome-hr"></div>
				<div class="zmiti-systemhome-pane">
					<div class="zmiti-systemhome-left">
						<div class="zmiti-company-column1">
							<div class="zmiti-systemhome-user">
								<div class="zmiti-systemhome-userface">
									<img :src="userinfor.userface">
									<div class="zmiti-company-editbtn"><span>修改</span></div>
								</div>
								<div class="zmiti-systemhome-userinfo">
									<div class="zmiti-systemhome-username">
										<b>{{userinfor.companyname}}</b>
									</div>
									<div class="zmiti-systemhome-logintime">
										<div>{{userinfor.address}}</div>
										<div>信用编号：{{userinfor.companynum}}</div>
									</div>
								</div>							
							</div>
							<div class="zmiti-company-count zmiti-systemhome-bor" :style="{backgroundImage:'url(../../assets/images/img1.png)'}">
								<div class="p"><b>工时</b>/小时</div>
								<div class="h1"><span>总共工时</span><b>300</b></div>
								<div class="h1"><span>剩余工时</span><b>123</b></div>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>

						<div class="zmiti-systemhome-tdata zmiti-systemhome-bor">
							<div class="zmiti-systemhome-p">单位人数：23人 待审：6人</div>
							<Table :border="false" :columns="columns2" :data="data2"></Table>
							<div class="zmiti-systemhome-more">
								<router-link to="/product">更多</router-link>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>

						<div class="zmiti-systemhome-tdata zmiti-systemhome-bor">
							<Table :columns="columns2" :data="data2"></Table>
							<div class="zmiti-systemhome-more">
								<router-link to="/product">更多</router-link>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
					</div>
					<div class="zmiti-systemhome-right">
						<div class="zmiti-company-count zmiti-systemhome-bor" :style="{backgroundImage:'url(../../assets/images/img2.png)'}">
							<div class="p"><b>产品</b>/件</div>
							<div class="h1"><span>总共件数</span><b>345</b></div>
							<div class="h1"><span>完成件数</span><b>123</b></div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-ulist zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">单位新闻</div>
							<ul>
								<li v-for="item in noticeData">
									<a href="#">{{item.title}}</a>
								</li>
							</ul>
							<div class="zmiti-systemhome-more"><a href="#">更多</a></div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-ulist zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">订单记录</div>
							<ul>
								<li v-for="item in articleData">
									<a href="#">{{item.title | filterFun}}</a>
									<h5>{{item.pubtime}}</h5>
								</li>
							</ul>
							<div class="zmiti-systemhome-more"><a href="#">更多</a></div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-ulist zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">工时消耗记录</div>
							<ul>
								<li v-for="item in articleData">
									<a href="#">{{item.title | filterFun}}</a>
									<h5>{{item.pubtime}}</h5>
								</li>
							</ul>
							<div class="zmiti-systemhome-more"><a href="#">更多</a></div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
					</div>
				</div>
			</div>

			 
	</div>
</template>
<style type="text/css">
.zmiti-systemhome-left	.ivu-table{
	color: #333333;
	font-size: 14px;
}
.zmiti-systemhome-left .ivu-table-wrapper{
	border:none;
}
.zmiti-systemhome-left .ivu-table:after{
	width:0;
	background:none;
}
.zmiti-systemhome-left .ivu-table:before{
	height:0;
	background:none;
}
.zmiti-systemhome-left .ivu-table th ,.zmiti-systemhome-left .ivu-table td{
	border-bottom:none;
}
.zmiti-systemhome-left .ivu-table th{
	background: none;
}
</style>
<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>
	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	var {companyActions,zmitiActions,changYueAcions} = zmitiUtil;
	import {manuscriptStatus} from '../../common/config';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{				
				targetKeys:[],		
				companyname:zmitiUtil.getCurrentCompanyId().companyname,
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				total:0,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				loading:true,
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
				groupList:[],
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],	
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfor:{
					companyname:'北京麟腾文化传媒有限公司',
					address:'北京市西城区宣武门西大街甲97号新华社发行楼',
					companynum:'9944556677',
					userface:'../../assets/images/zmiti.jpg'
				},
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
				noticeData:[
					{
						id:1,
						title:'单位新闻标题单位新闻标题单位新闻标题单位新闻标题',
						pubtime:'2019年5月16日'
					},
					{
						id:2,
						title:'让亚洲文明之光熠熠生辉',
						pubtime:'2019年5月16日'
					},
					{
						id:3,
						title:'各国嘉宾畅谈文化传承与创新',
						pubtime:'2019年5月16日'
					},
					{
						id:4,
						title:'让亚洲文明之光熠熠生辉',
						pubtime:'2019年5月16日'
					},
					{
						id:5,
						title:'各国嘉宾畅谈文化传承与创新',
						pubtime:'2019年5月16日'
					}
				],
				columns2: [
                    {
                        title: '产品名称',
                        key: 'productname'
                    },
                    {
                    	title: '产品说明',
                        key: 'introduce'
                    },
                    {
                        title: '使用到期时间',
                        key: 'createtime',
                        width:180,
                        align:'center',
                        render:(h,params)=>{
                        	return h('div',{
                        		class:'createtime'
                        	},this.formatPubDate(params.row.createtime))
                        }
                    },
                    {
                        title: '操作',
                        key: '',
                        width:80,
                        render:(h,params)=>{
                        	return h('span',{
                        		class:'',
                        		style:{
                        			color:'#3390ff',
                        			cursor:'pointer'
                        		},
                        		on:{
                        			click:()=>{
                        				console.log('test')
                        			}
                        		}
                        	},'详情')
                        }
                    }
                    
                ],
                data2:[
                	{
                		productname:"产品名称产品名称产品名称产品名称产品名称",
                		introduce:"产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍",
                		createtime:1563465600
                	}
                ]
			}
		},
		components:{

		},

		beforeCreate(){

		},
		mounted(){
			
		},

		watch:{
			
		},
		
		methods:{

			getDataList(){
				var s = this;
				this.loading = true;
				var {condition} = this;
				condition = Object.assign(condition,{
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				})
				zmitiUtil.ajax({
					remark:"getMySubmitList",
					data:{
						action:changYueAcions.getMySubmitList.action,
						condition
					},
					success(data){
						s.loading = false;
						if(data.getret === 0){
							s.total = data.total;
							s.dataSource = data.list;
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
				return y + '-' + MM + '-' + d;
		    }
		    
	    }
	}
</script>
 