<template>
	<div class="zmiti-company-main-ui">			
			<div class='zmiti-company-main-inner zmiti-scroll' :style="{height:viewH - 60+'px' }">
				<div class="zmiti-systemhome-hr"></div>
				<div class="zmiti-systemhome-pane">
					<div class="zmiti-systemhome-left">
						<div class="zmiti-company-column1">
							<div class="zmiti-systemhome-user">
								<div class="zmiti-systemhome-userface">
									<img :src="companyInfo.logourl">
									<div class="zmiti-company-editbtn"><span><router-link to="/companydetail">修改</router-link></span></div>
								</div>
								<div class="zmiti-systemhome-userinfo">
									<div class="zmiti-systemhome-username">
										<b>{{companyInfo.companyname}}</b>
									</div>
									<div class="zmiti-systemhome-logintime">
										<div>{{companyInfo.companyaddress}}</div>
										<div>信用编号：{{companyInfo.companycode}}</div>
									</div>
								</div>							
							</div>
							<div class="zmiti-company-count zmiti-systemhome-bor" :style="{backgroundImage:'url(../../assets/images/img1.png)'}">
								<div class="p"><b>工时</b>/小时</div>
								<div class="h1"><span>总共工时</span><b>{{conutnums[0]}}</b></div>
								<div class="h1"><span>剩余工时</span><b>{{conutnums[1]}}</b></div>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>

						<div class="zmiti-systemhome-tdata zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3"><label>单位人数：{{conutpersonal}}人</label><label>待审：{{conutunapproved}}人</label></div>
							<Table :columns="columns1" :data="userDatalist"></Table>
							<div class="zmiti-systemhome-more">
								<a href="#">更多</a>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>

						<div class="zmiti-systemhome-tdata zmiti-systemhome-bor">
							<Table :columns="columns2" :data="data2"></Table>
							<div class="zmiti-systemhome-more">
								<a href="#">更多</a>
							</div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
					</div>
					<div class="zmiti-systemhome-right">
						<div class="zmiti-company-count zmiti-systemhome-bor" :style="{backgroundImage:'url(../../assets/images/img2.png)'}">
							<div class="p"><b>产品</b>/件</div>
							<div class="h1"><span>总共件数</span><b>{{conutnums[2]}}</b></div>
							<div class="h1"><span>完成件数</span><b>{{conutnums[3]}}</b></div>
						</div>
						<div class="zmiti-systemhome-hr"></div>
						<div class="zmiti-systemhome-ulist zmiti-systemhome-bor">
							<div class="zmiti-systemhome-h3">单位新闻<button>新增+</button></div>
							<ul>
								<li v-for="item in noticeData">
									<a href="#">{{item.title | filterFun}}</a>
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
	var {companyActions,userActions,formatDate} = zmitiUtil;
	import {manuscriptStatus} from '../../common/config';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{				
				targetKeys:[],		
				companyname:zmitiUtil.getCurrentCompanyId().companyname,
				imgs:window.imgs,
				isLoading:false,
				adminuserId:'',
				loading:true,
				formUser:{
					isover:0,
					usersign:1,
					usertypesign:1,
					avatar:'&#xe6a4;'
				},
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				condition:{
					page_index:0,
					page_size:7
				},
				companyInfo:{
					logourl:'../../assets/images/zmiti.jpg'
				},
				conutnums:['--','--','--','--'],//工时&产品
				conutpersonal:'-',//单位人数
				conutunapproved:'-',//未审核人数
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
                	},
                	{
                		productname:"产品名称产品名称产品名称产品名称产品名称",
                		introduce:"产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍",
                		createtime:1563465600
                	},
                	{
                		productname:"产品名称产品名称产品名称产品名称产品名称",
                		introduce:"产品介绍产品介绍产品介绍产品介绍产品介绍产品介绍",
                		createtime:1563465600
                	}
                ],
                data1:[
                	{
                		username:"小明",
                		telephone:"13912345678",
                		email:'xiaoming@163.com',
                		status:1,
                		createtime:1563465600
                	},
                	{
                		username:"小强",
                		telephone:"13812345678",
                		email:'xiaoming@163.com',
                		status:0,
                		createtime:1563465600
                	},
                	{
                		username:"小米",
                		telephone:"13812345678",
                		email:'xiaoming@163.com',
                		status:1,
                		createtime:1563465600
                	}
                ],
                userDatalist:[],
                columns1: [
                    {
                        title: '姓名',
                        key: 'username',
                        render:(h,params)=>{

                        	return h('span',{
                        		class:''
                        	},params.row.username)
                        }
                    },
                    {
                    	title: '电话',
                        key: 'usermobile',
                        render:(h,params)=>{
                        	return h('span',{
                        		class:''
                        	},params.row.usermobile)
                        }
                    },
                    {
                    	title: '邮箱',
                        key: 'useremail',
                        render:(h,params)=>{
                        	return h('span',{
                        		class:''
                        	},params.row.useremail)
                        }
                    },
                    {
                    	title: '状态',
                        key: 'status',
                        width:120,
                        render:(h,params)=>{
                        	return h('span',{
                        		class:''
                        	},params.row.status==1?'已审核':'待审核')
                        }
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
                        	console.log(params.row.user,'params.row.user')
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
			}
		},
		components:{

		},

		beforeCreate(){

		},
		mounted(){
			this.getUserList();
			this.getDetail();
		},

		watch:{
			
		},
		
		methods:{

			getUserList(){//获取用户列表
				var s = this;
				this.loading = true;
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
					success(data){
						
						if(data.getret === 0){
							s.conutpersonal=data.total;//人数
							data.list.map(function(item,index){
								s.userDatalist.push({
									createtime:item.user.createtime,
									username:item.user.username,
									usermobile:item.user.usermobile,
									useremail:item.user.useremail,
									status:item.user.status
								})
							})
							console.log(s.userDatalist,'用户列表');
						}
					}
				})
			},
			getDetail(){//获取单位详情
				var s = this;
				 zmitiUtil.ajax({
					remark:"getCompanyInfo",
					data:{
						action:userActions.getCompanyInfo.action,
						companyid:zmitiUtil.getCurrentCompanyId().companyid,
					},
					success(data){						
						if(data.getret === 0){
							s.companyInfo = data.info;
							s.companyInfo.logourl=data.info.logourl || '../../assets/images/zmiti.jpg';
							console.log(s.companyInfo,'单位详情');
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
	          if (value && value.length > 19) {
	            value = value.substring(0, 19) + "...";
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
 