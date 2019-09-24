<template>
	<div class="zmiti-myself-detail-main-ui">
		<div class='zmiti-myself-header'>
			个人信息详情
		</div>

		<div class='zmiti-myself-logo-C'>
						
			<div class='zmiti-myself-logo'>
				<span class='zmt_iconfont' v-html='userinfo.info && userinfo.usreinfo.avatar||"&#xe6a4;"'></span>
			</div>
			<Button type="primary" @click="showResource= true;imgType='logourl'">更换头像</Button>
		</div>

		<div class='zmiti-myself-item'>
			<div>姓名：</div>
			<div>
				{{userinfo.realname}}
				<span><Icon type="ios-help-circle-outline" /></span>
			</div>
			
		</div>
		<div class='zmiti-myself-item'>
			<div>联系电话：</div>
			<div>
				{{userinfo.usermobile}}
				<span @click="showEditDialog('usermobile')">修改<Icon type="ios-help-circle-outline" /></span>
			</div>
			
		</div>
		<div class='zmiti-myself-item'>
			<div>单位电话：</div>
			<div>
				{{userinfo.jobphonenum}}
				<span @click="showEditDialog('jobphonenum')">修改<Icon type="ios-help-circle-outline" /></span>
			</div>
			
		</div>
		<div class='zmiti-myself-item'>
			 <div>性别：</div>
			 <div>
				 {{sexname}}
				 <span @click="showEditDialog('sex')">修改<Icon type="ios-help-circle-outline" /></span>
			 </div>
		</div>
		<div class='zmiti-myself-item'>
			 <div>民族：</div>
			 <div>
				 	{{userinfo.nation}}
				<span @click="showEditDialog('nation')">修改<Icon type="ios-help-circle-outline" /></span>
			 </div>
		</div>
		<div class='zmiti-myself-item'>
			 <div>职务：</div>
			 <div>
				 <label for="">
				 	{{userinfo.job}}
				 </label>
				<span  @click="showEditDialog('job')">修改<Icon type="ios-help-circle-outline" /></span>
			 </div>
		</div>

		<Modal v-model="visiable" title='修改个人信息' @on-ok='modifyUserInfo(userinfo)'>
			 <Input v-model="userinfo.usermobile" v-if='key === "usermobile"'>
				<span slot="prepend">联系电话：</span>
			</Input>
			<Input v-model="userinfo.jobphonenum"  v-if='key === "jobphonenum"'>
				<span slot="prepend">单位电话：</span>
			</Input>
			<RadioGroup v-model="userinfo.sex" v-if='key === "sex"'>
		        <Radio :label="0" >女</Radio>
		        <Radio :label="1">男</Radio>
       		</RadioGroup>
			<Input v-model="userinfo.nation"  v-if='key === "nation"'>
				<span slot="prepend">民族：</span>
			</Input>
			<Input v-model="userinfo.job"  v-if='key === "job"'>
				<span slot="prepend">职务：</span>
			</Input>
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	var {userActions} = zmitiUtil;
//	import ResourceList from '../../common/resourcelist';
	import {sexStatus} from '../../common/config';
	export default {
		props:'',

		name:'zmitiindex',
		data(){
			return{
				showuser:false,
				userinfo:{
				},
				sexname:'',
				showResource:false,
				visiable:false,
				key:'',
				imgType:'',
			}
		},
		components:{
//			ResourceList
		},

		beforeCreate(){
			
		},
		mounted(){
			var userinfo = zmitiUtil.getUserInfo();
			this.userinfo = userinfo.usreinfo;
			this.sexname=sexStatus[this.userinfo.sex].status;
		},

		watch:{
			

		},
		
		methods:{
			showEditDialog(key){
				this.key = key;
				this.visiable = true;
			},
			modifyUserInfo(data){
				
				var s = this;
				
				var info = Object.assign(data,this.userinfo.userid)
				zmitiUtil.ajax({
					remark:"editUserInfo",
					data:{
						action:userActions.editUserInfo.action,
						info
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
					}
				})
			},}
	}
</script>
 