<template>
	<div class="zmiti-cydetails-main-ui ">
		<div class="zmiti-list-main">		
			<div class='zmiti-mydetail-main zmiti-scroll' :style="{height:viewH - 65+'px',overflow:'auto' }">
				<div class="zmiti-details-container">
					<div class="view-title">
						<h3 id="doctitle">{{detailData.doctitle}}</h3>
						<div class="view-basicinfo">
							<div class="view-article-basic">提交单位：<span id="docfrom">{{detailData.docfrom}}</span></div>					
							<div class="view-article-basic view-doctime">提交时间：<span id="createtime">{{detailData.doctime | formatDate}}</span></div>
							<div class="view-article-basic view-author">提交人：<span id="docauthor">{{detailData.docauthor}}</span></div>				
						</div>
						<img class="articleStatic" :src="imgs['CHECKb0']" v-show="imgstatus">
					</div>
					<div id="view-main">
						<div class="view-content" id="content">
							<table cellpadding="0" cellspacing="0" width="100%" border="0">
								<tbody><tr>
									<td align="left" valign="top" id="viewcontent" v-html="detailData.content"></td>
								</tr>
							</tbody></table>
						</div>
					</div>
					<div class="zmiti-details-items">

						<div v-if="getusermanuscriptlist.length==0">
					        <div class="h3">填写审核意见：</div>
					        <div class="zmiti-details-textarea">
					        	<Input type='textarea' :rows="6" v-model="suggestion" placeholder="请输入你的审核意见，可以为空~~" />
					        </div>
					        <div class="zmiti-details-checkbtn">				        	
								<Button type="error" @click="checkManuscript(2)"  >拒绝</Button>
								<Button type="primary"  @click="checkManuscript(1)" >通过</Button>
					        </div>
				        </div>
				        <div class="view-messagelist zmiti-checklist" v-else>
				        	<div class="view-messagelist-inner">
				        		<div class="h3">全部审核意见</div>
				        		<div class="msg-items">
				        			<ul>
				        				<li v-for="(item,index) in getusermanuscriptlist">
				        					<div class="msg-con"><b>审核意见：</b>{{item.suggestion}}</div>
				        					<div class="msg-author">
				        						<div>审核人：{{item.realname}}</div>
				        						<div class="msg-times">审核时间：{{item.updatetime | formatDate}}</div>
				        						<Button type="primary" v-show="item.status==1" @click="revokeManuscript(item.manuscriptid)">撤销审核</Button>
				        					</div>
				        					<div class="msg-status" v-show="item.status==1" :style="{backgroundImage:'url('+imgs['CHECK1']+')'}"></div>
				        				</li>
				        			</ul>
				        		</div>
				        	</div>

				        </div>
				    </div>
				</div>				
			</div>
		</div>
	</div>
</template>
<style type="text/css">
.zmiti-mydetail-main .view-content p {color: #333333;margin: 10px 0 0 0;line-height: 175%;}
.zmiti-mydetail-main .view-content p img{width:auto;max-width: 100%;}
</style>
<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import Avatar from '../../common/avatar';
	import ZmitiMask from '../../common/mask/';
	import ZmitiTable from '../../common/table/';
	var {companyActions,zmitiActions,changYueAcions,formatDate} = zmitiUtil;
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
				imgstatus:false,
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

				},
				getusermanuscriptlist:[]
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
			
			this.getDetail();
			this.getusermanuscript();
			
		},

		watch:{
			 
			
		},
		
		methods:{

			getDetail(){
				//manuscriptDetail
				var s = this;
				var manuscriptid=this.$route.params.manuscriptid
				zmitiUtil.ajax({
					remark:'getuserDetails',
					data:{
						action:changYueAcions.getuserDetails.action,
						condition:{
							manuscriptid
						}
					},
					success(data){
						console.log(data);
						s.detailData=data.detail;
					}
				})
			},
			checkManuscript(status){//审核稿件
				var s = this;
				var manuscriptid=s.$route.params.manuscriptid;
				zmitiUtil.ajax({
					remark:'checkManuscript',
					data:{
						action:changYueAcions.checkManuscript.action,
						info:{
							manuscriptid:manuscriptid,
							status,
							suggestion:s.suggestion,
						}
					},
					success(data){
						s.visible = false;
						s.suggestion = '';
						s.$Message[data.getret ===0 ?'success':'error'](data.msg);
						if(data.getret === 0 ){
							s.getDetail();
							s.getusermanuscript();
						}
					}
				})
			},

			revokeManuscript(manuscriptid){//撤销审核
				var s = this;
				zmitiUtil.ajax({
					remark:'revokeManuscript',
					data:{
						action:changYueAcions.revokeManuscript.action,
						info:{
							manuscriptid
						}
					},
					success(data){						
						s.$Message[data.getret ===0 ?'success':'error'](data.msg);
						if(data.getret === 0 ){
							s.getusermanuscript();
						}
					}
				})
			},
			getusermanuscript(){//获取稿件所有审核意见
				var s = this;
				var manuscriptid=s.$route.params.manuscriptid;
				console.log(manuscriptid,'获取稿件所有审核意见');
				zmitiUtil.ajax({
					remark:'getusermanuscript',
					data:{
						action:changYueAcions.getuserManuscript.action,
						condition:{
							manuscriptid
						}
					},
					success(data){
						if(data.getret === 0 ){
							s.getusermanuscriptlist=data.list;
						}
					}
				})
			}
		},
		filters: {
	      formatDate: function (value) {
	        let date = new Date(value*1000);
	        let y = date.getFullYear();
	        let MM = date.getMonth() + 1;
	        MM = MM < 10 ? ('0' + MM) : MM;
	        let d = date.getDate();
	        d = d < 10 ? ('0' + d) : d;
	        return y + '.' + MM + '.' + d;
	      }
	    }
	}
</script>
 