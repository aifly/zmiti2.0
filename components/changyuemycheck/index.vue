<template>
	<div class="zmiti-mychecked-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>畅阅</div>
				<div>
					<Button :loading='loading' @click="getDataList()" type="primary">刷新</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-mychecked-main zmiti-scroll ' :style="{height:viewH - 180+'px',overflow:'auto' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total"></ZmitiTable>
			</div>
		</div>
			 
 
	 
		<Modal v-model="visible" width="360" title='审核意见'>
			<Input type='textarea' v-model="suggestion" placeholder="请输入你的审核意见" />
			<div slot="footer">
				<Button type="primary"  @click="checkManuscript(1)" >通过</Button>
				<Button type="error" @click="checkManuscript(2)"  >拒绝</Button>
				<Button type="default"  @click="checkManuscript(3)" >暂缓</Button>
			</div>
    	</Modal>

    	<Modal v-model="modaldetail" fullscreen :title="'编号：'+detailData.manuscriptid">
	        <div class="zmiti-details-pane" slot="">
			    <div class="zmiti-details-items">
			        <div class="zmiti-details-label"><div align="right">标题：</div></div>
			        <div class="zmiti-details-main">
			        	{{detailData.doctitle}}
			        </div>
			    </div>
			    <div class="zmiti-details-items">
			        <div class="zmiti-details-label"><div align="right">作者：</div></div>
			        <div class="zmiti-details-main">
			        	{{detailData.docauthor}}
			        </div>
			    </div>
			    <div class="zmiti-details-items">
			        <div class="zmiti-details-label"><div align="right">来自：</div></div>
			        <div class="zmiti-details-main">
			        	{{detailData.docfrom}}
			        </div>
			    </div>
			    <div class="zmiti-details-items">
			        <div class="zmiti-details-label"><div align="right">时间：</div></div>
			        <div class="zmiti-details-main">
			        	{{detailData.createtime | formatDate}}
			        </div>
			    </div>
			    <div class="zmiti-details-items">
			        <div class="zmiti-details-label"><div align="right">内容：</div></div>
			        <div class="zmiti-details-main" v-html="detailData.content"></div>
			    </div>
			    <div class="zmiti-details-items">
			        <div class="zmiti-details-label"><div align="right">评论：</div></div>
			        <div class="zmiti-details-main" v-html="detailData.remark"></div>
			    </div>
			    
	        </div>
	        <div slot="footer">
	        	<div style="background-color: #ffffff;">
		        	<div class="zmiti-details-items">
				        <div class="zmiti-details-label"><div align="right">审核意见：</div></div>
				        <div class="zmiti-details-main">
				        	<Input type='textarea' v-model="suggestion" placeholder="请输入你的审核意见" />
				        </div>
				    </div>
					<Button type="primary"  @click="checkManuscript(1)" >通过</Button>
					<Button type="error" @click="checkManuscript(2)"  >拒绝</Button>
					<Button type="default"  @click="checkManuscript(3)" >暂缓</Button>
				</div>
			</div>
	    </Modal>

	</div>
</template>
<style type="text/css">
.ivu-modal-footer{background-color: #ffffff;}
</style>
<style lang="scss" scoped>
	@import './index.scss';
	@import './detail.scss';	
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import Avatar from '../../common/avatar';
	import ZmitiMask from '../../common/mask/';
	import ZmitiTable from '../../common/table/';
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
				total:0,
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
					},{
						title:"提交人",
						key:'realname',
						align:'center',
					},{
						title:"提交时间",
						key:'createtime',
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
											
										}
									},
									domProps:{
										innerHTML:`
											<label title='${manuscriptStatus[params.row.status].name}' class='zmiti-cy-tag zmt_iconfont' style='color:${manuscriptStatus[params.row.status].color}'>
												${manuscriptStatus[params.row.status].icon}
											</label>
										`
									}
								})
							])
						}
					},
					{
						title:"操作",
						key:'',
						align:'center',
						render:(h,params)=>{
							return h('div',[
								h('span',{
									style:{
										cursor:'pointer',
										color:"#3390ff"
									},
									on:{
										click:()=>{
											var c = params.row;
											this.visible = true;
											this.suggestion = c.suggestion;
											this.formCheck = c;
										}
									}
								},'审核'),
								h('span',{
									style:{
										cursor:'pointer',
										color:"#3390ff",
										marginLeft:'10px'
									},
									on:{
										click:()=>{
											this.getDetail(params.row.manuscriptid)
										}
									}
								},'详情')
							])
						}
					}
					 
				],
				
			 
				 
				directoryList:{

				},
				condition:{
					page_index:0,
					page_size:20,
				},
				userinfo:{},
				modaldetail:false,
				detailData:[],
				detailStyle:{

				}
			}
		},
		components:{
			Avatar,
			ZmitiMask,
			ZmitiTable
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;

			this.getDataList();
			
		},

		watch:{
			 
			
		},
		
		methods:{

			getDetail(manuscriptid){
				//manuscriptDetail
				var s = this;
				s.modaldetail=true;
				zmitiUtil.ajax({
					remark:'manuscriptDetail',
					data:{
						action:changYueAcions.manuscriptDetail.action,
						condition:{
							manuscriptid
						}
					},
					success(data){
						console.log(data);
						s.detailData=data.detail;
						s.formCheck.manuscriptid=data.detail.manuscriptid;
						//console.log(s.formCheck.manuscriptid,'s.formCheck.manuscriptid');
					}
				})
			},
			checkManuscript(status){//审核稿件
				var s = this;
				zmitiUtil.ajax({
					remark:'checkManuscript',
					data:{
						action:changYueAcions.checkManuscript.action,
						info:{
							manuscriptid:s.formCheck.manuscriptid,
							status,
							suggestion:s.suggestion,
						}
					},
					success(data){
						s.visible = false;
						s.suggestion = '';
						s.$Message[data.getret ===0 ?'success':'error'](data.msg);
						if(data.getret === 0 ){
							s.getDataList();
						}
					}
				})
			},

			change(e){
				this.condition.page_index = e -1;
				this.getDataList();
			},

			getDataList(){
				var s = this;
				s.loading = true;
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
							s.total = data.total;
							
						}
					}
				})
			},
			
			 
		},
		filters: {
	      formatDate: function (value) {
	        let date = new Date(value*1000);
	        let y = date.getFullYear();
	        let MM = date.getMonth() + 1;
	        MM = MM < 10 ? ('0' + MM) : MM;
	        let d = date.getDate();
	        d = d < 10 ? ('0' + d) : d;
	        let h = date.getHours();
	        h = h < 10 ? ('0' + h) : h;
	        let m = date.getMinutes();
	        m = m < 10 ? ('0' + m) : m;
	        let s = date.getSeconds();
	        s = s < 10 ? ('0' + s) : s;
	        return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
	      }
	    }
	}
</script>
 