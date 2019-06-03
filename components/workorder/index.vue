<template>
	<div class="zmiti-workorder-main-ui lt-full">
		<header class="zmiti-tab-header">
			<div>提交工单</div>
			<div>
			</div>
		</header>

		<div class='zmiti-workorder-choose'>
			<header class='zmiti-workorder-header-bar'>
				咨询类工单问题
			</header>
			<ul v-if='formWorkOrder.setworkordertype <= -1'>
				<li v-for='(type ,i) of workOrderType' :key="i">
					<div class='zmiti-workerorder-type-top'>
						<div>{{type.type}}</div>
						<div><Button @click="formWorkOrder.setworkordertype = i">提问</Button></div>
					</div>
					<div>
						{{type.desc}}
					</div>
				</li>
			</ul>
			<Form :rules="ruleValidate"  style="padding-top:20px" v-else class='zmiti-add-form-C' :model="formWorkOrder" :label-width="100">
				<FormItem label="问题描述：" prop='setcontent'>
					<Input :rows="4"  type='textarea' v-model="formWorkOrder.setcontent" placeholder="问题描述：" />
				</FormItem>
				<FormItem label="手机号：" prop='setusermobile'>
					<Input v-model="formWorkOrder.setusermobile" placeholder="手机号：" />
				</FormItem>
				
				<FormItem  label="接收短信时间：">
					 <RadioGroup v-model="formWorkOrder.setsmstime">
						<Radio :label="0">任意时间</Radio>
						<Radio :label="1">每天9点~18点</Radio>
						<Radio :label="2">从不接收</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="邮箱：" prop='setuseremail'>
					<Input v-model="formWorkOrder.setuseremail" placeholder="邮箱：" />
				</FormItem>
				<FormItem  label="附件上传：">
					 <Button icon='md-cloud-upload'>上传</Button>
				</FormItem>
				<FormItem  label="">
					 <Button type='primary' @click="submitWorkOrder">提交</Button>
				</FormItem>
			</Form>
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

				formWorkOrder:{
					setworkordertype:-1,
					setsmstime:2
				},

				imgs:window.imgs,
				userinfo:{
					username:'一位巨蟹',
					avatar:window.imgs.zmiti1
				},
				ruleValidate: {
					setcontent: [
						{ required: true, message: '问题描述不能为空', trigger: 'blur' }
					],
					setusermobile:[
						{ required: true, message: '手机号不能为空', trigger: 'blur' }
					]
				},
				workOrderType:[
					{
						type:'财务类',
						desc:'订单，合同，充值，发票，汇款，等与资金相关问题'
					},{
						type:'会员帐号类',
						desc:'更换用户信息，找回密码，空间，到期时间，用户数等相关'
					},{
						type:'定制服务类',
						desc:'个性化定制，设计，规划及相关服务类问题'
					},{
						type:'产品技术类',
						desc:'现有产品的所有技术相关问题及接口类问题'
					},{
						type:'其它类',
						desc:'您无法判断的所有问题都可以此选择提问'
					}
				]
			
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

			submitWorkOrder(){//提交工单
				zmitiUtil.ajax({
					remark:'userCommitWorkOrder',
					data:{
						action:userActions.userCommitWorkOrder.action,
						info:this.formWorkOrder
					},
					success(data){
						console.log(data,'data');
					}
				});
			}
			
			
		}
	}
</script>
 

