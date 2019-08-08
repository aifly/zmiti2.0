<template>
	<div class="zmiti-company-detail-main-ui">
		<div class='zmiti-company-header'>
			{{companyInfo.companyname}}
		</div>

		<div class='zmiti-company-logo-C'>

			<div class='zmiti-company-logo'>
				<img :src='companyInfo.logourl' v-if='companyInfo.logourl' alt="">
			</div>
			<Button type="primary">更换logo</Button>
		</div>

		<div class='zmiti-company-item'>
			 <Input size="large" v-model="companyInfo.companyname">
				<span slot="prepend">单位名称：</span>
				<Button slot="append">修改</Button>
			</Input>
		</div>
		<div class='zmiti-company-item'>
			 <Input size="large" v-model="companyInfo.companycode">
				<span slot="prepend">单位编号：</span>
				<Button slot="append">修改</Button>
			</Input>
		</div>
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

		<div class='zmiti-company-file'>
			<div>
				<div>单位营业执照</div>
				<div class='zmiti-company-img' :style="{background:companyInfo.businesslicensepath?'url('+companyInfo.businesslicensepath+') no-repeat center center':'none',backgroundSize:'cover'}">
					<img v-if='companyInfo.businesslicensepath' v-show='false' :src="companyInfo.businesslicensepath" alt="">
					<span v-else>暂无</span>
				</div>
				
			</div>
			<div>
				<div>
					单位合同扫描件
				</div>
				<div class='zmiti-company-img' :style="{background:companyInfo.contract?'url('+companyInfo.contract+') no-repeat center center':'none',backgroundSize:'cover'}">
					<img v-if='companyInfo.contract' v-show='false' :src="companyInfo.contract" alt="">
					<span v-else>暂无</span>
				</div>
				
			</div>
		</div>


		<Modal v-model="showResource" title='资料库' width='800'>
			<ResourceList :isAdmin='false' :isDialog='true' @onFinished='onFinished'></ResourceList>
			<div class="zmiti-resourcelist-footer"  slot='footer'>
				<Button style='width:100px;'>取消</Button>
				<Button style='width:100px;' type='primary' @click='chooseLogo'>确定</Button>
			</div> 
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
				showResource:true,
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

			chooseLogo(){
				this.showResource = false;
				console.log(this.currentChooseResource);
				this.companyInfo.logourl=this.currentChooseResource.custombilethum[0];

				this.modifyCompanyInfo({
					logourl:this.companyInfo.logourl
				})

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
 