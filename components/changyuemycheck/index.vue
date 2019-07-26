<template>
	<div class="zmiti-user-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>畅阅</div>
				<div>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-user-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<div class='zmiti-user-table' :class="{'active':showDetail}">
					<Table :loading='loading'  :data='dataSource' :columns='columns'></Table>
				</div>
			</div>
			<section @mousedown='showDetail = false' v-if='showDetail && false' class='zmiti-add-form-close lt-full'></section>
		</div>
			 
 
	 
		<Modal v-model="visible" width="360" title='审核意见'>
			<Input type='textarea' v-model="suggestion" placeholder="请输入你的审核意见" />
			<div slot="footer">
				<Button type="primary"  @click="checkManuscript(1)" >通过</Button>
				<Button type="error" @click="checkManuscript(2)"  >拒绝</Button>
				<Button type="default"  @click="checkManuscript(3)" >暂缓</Button>
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
	import Avatar from '../../common/avatar';
	import ZmitiMask from '../../common/mask/';
	var {companyActions,zmitiActions,changYueAcions} = zmitiUtil;
	import {manuscriptStatus} from '../../common/config';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				suggestion:'',
				loading:true,
				targetKeys:[],
				showAvatarModal:false,
				visible:false,
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				currentUserid:'',
				formCheck:{
					 
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],
				columns:[
					{
						title:"稿件编号",
						key:'manuscriptid',
						align:'center',
					},
					{
						title:"稿件标题",
						key:'doctitle',
						align:'center',
					},
					{
						title:'稿件状态',
						key:'status',
						align:'center',
						render:(h,params)=>{
							//return h('div',{},manuscriptStatus[params.row.status]);
							return h('div',[
								h('span',{
									style:{
										marginRight:'5px'
									},
									on:{
										click:()=>{
											var c = params.row;

											this.visible = true;
											this.suggestion = c.suggestion;

											this.formCheck = c;

										}
									},
									domProps:{
										innerHTML:`
											<label>${params.row.realname}</label>
											<label title='${manuscriptStatus[params.row.status].name}' class='zmiti-cy-tag zmt_iconfont' style='color:${manuscriptStatus[params.row.status].color}'>
												${manuscriptStatus[params.row.status].icon}
											</label>
										`
									}
								})
							])
						}
					},
					 
				],
				
			 
				 
				directoryList:{

				},
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{}
			}
		},
		components:{
			Avatar,
			ZmitiMask
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;

			this.getMyCheckList();
			
		},

		watch:{
			 
			
		},
		
		methods:{
			checkManuscript(status){//审核稿件
				var s = this;
				zmitiUtil.ajax({
					remark:'checkManuscript',
					data:{
						action:changYueAcions.checkManuscript.action,
						info:{
							manuscriptid:s.formCheck.manuscriptid,
							status,
							suggestion:s.formCheck.suggestion,
						}
					},
					success(data){
						s.visible = false;
						s.suggestion = '';
						s.$Message[data.getret ===0 ?'success':'error'](data.msg);
						if(data.getret === 0 ){
							s.getMyCheckList();

						}
					}
				})
			},

			getMyCheckList(){
				var s = this;
				var {condition} = this;
				zmitiUtil.ajax({
					remark:"getMyCheckList",
					data:{
						action:changYueAcions.getMyCheckList.action,
						condition
					},
					success(data){
						s.loading = false;
						if(data.getret === 0){
							s.dataSource = data.list;
						}
					}
				})
			},
			
			 
		}
	}
</script>
 