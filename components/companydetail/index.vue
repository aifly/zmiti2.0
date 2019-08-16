<template>
	<div class="zmiti-company-detail-main-ui">
		<div class='zmiti-company-header'>
			{{companyInfo.companyname}}
		</div>

		<div class='zmiti-company-logo-C'>

			<div class='zmiti-company-logo'>
				<img :src='companyInfo.logourl' v-if='companyInfo.logourl' alt="">
			</div>
			<Button type="primary" @click="showResource= true;imgType='logourl'">更换logo</Button>
		</div>

		<div class='zmiti-company-item'>
			<div>单位名称：</div>
			<div>
				{{companyInfo.companyname}}
				<span><Icon type="ios-help-circle-outline" /></span>
			</div>
			
		</div>

		<div class='zmiti-company-item'>
			 <div>单位编号：</div>
			 <div>
				 <label for="" >
				 	{{companyInfo.companycode}}
				 </label>
				<span><Icon type="ios-help-circle-outline" /></span>
			 </div>
			 
		</div>
		<div class='zmiti-company-item'>
			 <div>单位电话：</div>
			 <div>
				 <label for="" >
				 	{{companyInfo.companyphone}}
				 </label>
				<span @click="showEditDialog('companyphone')">修改<Icon type="ios-help-circle-outline" /></span>
			 </div>
		</div>
		<div class='zmiti-company-item'>
			 <div>单位地址：</div>
			 <div>
				 <label for="">
				 	{{companyInfo.companyaddress}}
				 </label>
				<span  @click="showEditDialog('companyaddress')">修改<Icon type="ios-help-circle-outline" /></span>
			 </div>
		</div>


		<div class='zmiti-company-item'>
			 <div>是否开启认证：</div>
			 <div>
				 <label for="">
					 <RadioGroup @on-change='modifyCompanyInfo(companyInfo)' v-model="companyInfo.is_auth">
						<Radio :value='1' :label="1">开启认证</Radio>
						<Radio :value='0' :label="0">关闭认证</Radio>
					</RadioGroup>
				 </label>
				<span><Icon type="ios-help-circle-outline" /></span>
			 </div>
		</div>

		<!-- 
		<div class='zmiti-company-item'>
			 <Input size="large" v-model="companyInfo.companyphone">
				<span slot="prepend">单位电话：</span>
				<Button slot="append">修改</Button>
			</Input>
		</div>
		<div class='zmiti-company-item'>
			 <Input size="large" v-model="companyInfo.companyaddress">
				<span slot="prepend">单位地址：</span>
				<Button slot="append">修改</Button>
			</Input>
		</div>
 -->
		<div class='zmiti-company-file'>
			<div>
				<div>单位营业执照</div>
				<div class='zmiti-company-img' @click="showResource= true;imgType='businesslicensepath'" :style="{background:companyInfo.businesslicensepath?'url('+companyInfo.businesslicensepath+') no-repeat center center':'none',backgroundSize:'cover'}">
					<img v-if='companyInfo.businesslicensepath' v-show='false' :src="companyInfo.businesslicensepath" alt="">
					<span v-else>暂无</span>
				</div>
				
			</div>
			<div>
				<div>
					单位合同扫描件
				</div>
				<div class='zmiti-company-img' @click="showResource= true;imgType='contract'" :style="{background:companyInfo.contract?'url('+companyInfo.contract+') no-repeat center center':'none',backgroundSize:'cover'}">
					<img v-if='companyInfo.contract' v-show='false' :src="companyInfo.contract" alt="">
					<span v-else>暂无</span>
				</div>
			</div>
		</div>


		<Modal v-model="showResource" title='资料库' width='800'>
			<ResourceList v-if='showResource' :isAdmin='false' :isDialog='true' @onFinished='onFinished'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;' @click="showResource=false;">取消</Button>
				<Button style='width:100px;' type='primary' @click='chooseImg'>确定</Button>
			</div> 
		</Modal>

		<Modal v-model="visiable" title='修改单位信息' @on-ok='modifyCompanyInfo(companyInfo)'>
			 <Input v-model="companyInfo.companyphone" v-if='key === "companyphone"'>
				<span slot="prepend">单位电话：</span>
			</Input>
			<Input v-model="companyInfo.companyaddress"  v-if='key === "companyaddress"'>
				<span slot="prepend">单位地址：</span>
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
	import ResourceList from '../../common/resourcelist';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				userinfo:{},
				showResource:false,
				visiable:false,
				key:'',
				imgType:'',
				currentChooseResource:{},
				companyInfo:{

				}
			}
		},
		components:{
			ResourceList
		},

		beforeCreate(){
			
		},
		mounted(){
			window.s = this;
			this.getDetail();
			
		},

		watch:{
			

		},
		
		methods:{

			showEditDialog(key){
				this.key = key;
				this.visiable = true;
			},

			chooseImg(){

				this.showResource = false;
				this.companyInfo[this.imgType] = this.currentChooseResource.custombilethum[0];

				this.modifyCompanyInfo(this.companyInfo)

			},

			modifyCompanyInfo(data){
				var s = this;

				var info = Object.assign(data,{
					companyid:zmitiUtil.getCurrentCompanyId().companyid
				})
				zmitiUtil.ajax({
					remark:"editCompanyInfo",
					data:{
						action:userActions.editCompanyInfo.action,
						info
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
					}
				})
			},

			onFinished(item){
				this.currentChooseResource = item;
			},
			    
			getDetail(){
				 zmitiUtil.ajax({
					remark:"getCompanyInfo",
					data:{
						action:userActions.getCompanyInfo.action,
						companyid:zmitiUtil.getCurrentCompanyId().companyid,
					},
					success(data){
						if(data.getret === 0){
							s.companyInfo = data.info;
						}
					}
				 })
			},
			
		}
	}
</script>
 