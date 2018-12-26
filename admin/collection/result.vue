<template>
	<section  class="wm-collection-rater-manager">
		<header class='wm-collection-left-header'>
			<div class="wm-collection-title">
				<div>征集管理 > {{resourcecnname}}</div>
			</div>
			<div class="wm-collection-search-content">
				<div class="wm-collection-search-input-C">
					<div>
						<img :src='imgs.search'/>
						<div @click.stop='showCondition = true' class="wm-collection-search-condition">
							<div v-html='kwType'></div>
							<ul v-if='showCondition'>
								<li @click.stop='changeKwType("关键字")'>关键字</li>
								<li @click.stop='changeKwType("上传者")'>上传者</li>
							</ul>
						</div>
						<input v-model="keyword" @keydown='searchReport' placeholder="查询关键字"/>
					</div>
				</div>
				<div class="wm-collection-check-action" v-if='false'>
					<Checkbox v-model="selectAll">全选</Checkbox>
					<Button type="primary" size='small' @click.stop='showCheckAction = true'>审核 <Icon type="ios-arrow-up" /></Button>
					<ul v-if='showCheckAction'>
						<li @click.stop="checkAction(1)">
							<Icon type="ios-checkmark-circle-outline" />
							通过
						</li>
						<li @click.stop="checkAction(2)">
							<Icon type="ios-close-circle-outline" />
							拒绝
						</li>
					</ul>
				</div>
			</div>
		</header>
		<header class="wm-collection-left-search-condition-header" style="height:40px;">
			<div>分类：<span @click.stop='searchByClassic("全部")'  :class="{'active':classicType == '全部'}">全部</span> <span @click.stop='searchByClassic(menu)' :class="{'active':classicType == menu}" v-for='(menu,i) in menus' :key="i">{{menu.split('-')[0]}}</span> </div>
		</header>
		<div class="wm-scroll wm-collection-rater-list" :style="{height:viewH -  226+'px'}">
			<ul>
				<li @dblclick="showPreview = true" @click='currentReportIndex = i' :class='{"active":currentReportIndex === i}' v-for="(raterreport,i) in raterReportList" :key='i'>
					<div class="wm-collection-raterreport-item-left">
						<header>
							<span ><Checkbox @on-change='changeChecked(raterreport,i)' v-model="raterreport.checked"></Checkbox></span>
							介绍
						</header>
						<div class="wm-collection-raterreport-thumb-C">

							<img class="status" v-if='raterreport.status === 3' :src="imgs.guidang" alt="">
							<div v-if='"png jpg jpeg gif".indexOf(raterreport.fileextname)>-1' >
								<img  :src="raterreport.mobilethum" alt="">
							</div>
							<div v-else :style="{background:'url('+raterreport.mobilethum+') no-repeat center center'}">

							</div>
							<div class="wm-collection-raterreport-content">
								<div  v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"||item.fieldname === "userlabel"' class="wm-myreport-title wm-myreport-item" v-for='(item,i) in configList' :key='i'>
									<div v-if='item.fieldname !== "userlabel"'>{{item.name}}：</div>
									<div  class="zmiti-text-overflow" v-if='item.fieldname !== "userlabel"' :class="item.fieldname">
										<span :title="raterreport[item.fieldname]">{{raterreport[item.fieldname]}}</span>
									</div>
									<div v-if='item.fieldname === "userlabel"'>标签：</div>
									<div class="wm-tag-list text-overflow" v-if='item.fieldname === "userlabel"'>
										<Tag @on-close='removeTag(item.fieldname,i)' :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-if='tag' v-for="(tag,i) in (raterreport[item.fieldname]||'').split(',')">{{tag}}</Tag>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class="wm-collection-raterreport-item-right">
						<header>票数</header>
						<div class="wm-collecion-vote-result">
							<div class="wm-collection-vote-pass">
								<section class="wm-collection-vote-pass-text">
									<div>通过</div>
									<div>{{raterreport.scorenum_success}}票</div>
								</section>
							</div>
							<div class="wm-collection-vote-canvas">
								<canvas :style="{transform:'rotate('+(raterreport.rotate||0)+'deg)'}" width="280" height="280" ref='wm-result-canvas'></canvas>
								<div>
									<div>总票数</div>
									<div>{{raterreport.scorenum_success+raterreport.scorenum_faild}}票</div>
								</div>
							</div>
							<div class="wm-collection-vote-reject">
								<section class="wm-collection-detail"><a :href='"#/ratedetail/"+raterreport.id'>查看详情>></a></section>
								<section class="wm-collection-vote-reject-text">
									<div>拒绝</div>
									<div>{{raterreport.scorenum_faild}}票</div>
								</section>
							</div>
						</div>
					</div>
				</li>
			</ul>
			<div class="wm-collection-pagetion" v-if='!selectAll'>
				<Page :current='currentPage' @on-page-size-change='pagesizeChange' show-elevator show-sizer  @on-change='loadMoreReport' :total="totalnum" show-total :page-size='pagenum' />
			</div>
		</div>

		<div class="wm-collection-footer">
			<span ><Checkbox @on-change='selectAllReport' v-model="selectAll">全选</Checkbox></span>
			<span :class="{'disabled':passCount <= 0}" @click='preview'>{{isFilter?'返回':'预览'}}</span>
			<Button type='primary' :disabled="passCount === 0"  class="wm-collection-last-check" @click='lastCheck'>通过终审(<span v-html='passCount'></span>)</Button>
			<span class="wm-download" @click='downLoadFile'>下载</span>
		</div>

		<Detail :configList='configList' :type="$route.params.type" :showPreview='showPreview'  :nextReport='nextReport' :showMaskDetail='showMaskDetail' :currentReportIndex='currentReportIndex' :closePreview='closePreview' :reportList='raterReportList'></Detail>
		<Download :isdownloading='showDownloadtip' :hideDownloadTip="hideDownloadTip"></Download>
	</section>
</template>

<script>
	import symbinUtil from '../lib/util';
	import Vue from "vue";
	import Detail from '../../common/mask/detail';
	import Download from '../../common/mask/download';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				colorList:['default','success','primary','error','warning','red','orange','gold','yellow'],
				isLoading:false,
				selectAll:false,
				scale:.8,
				imgs:window.imgs,
				showDownloadtip:false,
				viewH:document.documentElement.clientHeight,
				resourcecnname:'',
				kwType:'关键字',
				showCondition:false,
				keyword:'',
				passCount:0,
				fieldname:-1,
				nextReport:false,
				reportList:[],
				showPreview:false,
				showMaskDetail:true,
				mainType:2,
				showCheckAction:false,
				configList:[],
				currentReportIndex:0,
				menus:[],
				classicType:'全部',
				statusType:'全部',
				publicadtype:-1,
				totalnum:0,
				status:-1,
				currentPage:0,
				classic:-1,
				page:1,
				pagenum:20,
				isFilter:false,
				raterReportList:[],

			}
		},
		components:{
			Detail,
			Download
		},
		watch:{

		/* 	raterReportList:{
				handler(newVal,oldVal){
					var iNow = 0;
					this.raterReportList.forEach((item,i)=>{
						if(item.checked){
							iNow++;
						}
					});
					console.log(iNow);
					this.passCount = iNow;
				},
				deep:true 
			},*/

			selectAll(val){


				this.raterReportList.forEach((item,i)=>{
					item.checked = val;
					this.passCount = val?i+1:0;
				})

			
			},
			mainType(val){
				if(val === 1){
					this.getRaterReportList();
				}
			},
			currentReportIndex(){
				var s = this;
				s.formAdmin = s.raterReportList[s.currentReportIndex];
				if(this.formAdmin && this.formAdmin.userlabel){
					this.formAdmin.tagList = this.formAdmin.userlabel.split(',');
				}
			}
		},
		methods:{

			hideDownloadTip(){
				this.showDownloadtip = false;
			},

			downLoadFile(){
				var s = this;
				var urls = [];

				this.raterReportList.map(item=>{
					if(item.checked){
						urls.push(item.filepath);
					}
				})
				if(urls.length<=0){
					s.$Message.error('请至少选择一个要下载的作品');
					return;
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+'/wmadadmin/createzip',
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername,
						urls:urls.join(',')
					},
					error(){
						s.isdownloading = false;
					},
					success(data){
						if(data.getret === 0){
							window.location.href = data.zipurl;
						}else if(data.getret === 2001){
							s.showDownloadtip = true;
						}
					}
				})
			},

			selectAllReport(){
				this.raterReportList.forEach((item,i)=>{
					item.checked = this.selectAll;
					this.passCount = this.selectAll?i+1:0;
				})
			},

			changeChecked(report,i){
				if(report.checked){
					this.passCount += 1;
				}
				else{
					this.passCount -= 1;
				}
				//console.log(this.passCount);
			},

			closePreview(){
				this.showPreview = false;
				this.showMaskDetail = true;
				Vue.obserable.trigger({
					type:'closeOriginalImg'
				})
			},
			preview(){
				if(this.passCount<= 0){
					return;
				}
				if(this.isFilter){
					this.raterReportList = this.defaultList.concat([]);
					this.isFilter = false;
				}else{
					this.filterReport();
				}
				
			},

			lastCheck(){//终审
				var s = this;
				var id = this.$route.params.id;
				var ids = [];
				this.raterReportList.map(item=>{
					if(item.checked){
						ids.push(item.id);
					}
				})
				var  p  ={
					admintoken:s.userinfo.admintoken,
					adminusername:s.userinfo.adminusername,
					resourceid:id,
					id:ids.join(','),
					status:3,
				};

				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/updateworkstatus/',
					data:p,
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.getmsg);
					}
				});
				
			},

			filterReport(){
				this.raterReportList = this.defaultList.filter((item)=>{
					return item.checked === true;
				});
				this.isFilter = true;
			},

			getRaterReportList(fn){//获取评审管理列表 
				var id = this.$route.params.id;
				var s = this;

				var  p  ={
					admintoken:s.userinfo.admintoken,
					adminusername:s.userinfo.adminusername,
					resourceid:id,
					status:'1,3',//审核通过，已过终审
					pagenum:s.pagenum,
					page:s.page
				};
				if(this.status !== -1){
					p.status = this.status;
				}
				if(this.publicadtype !== -1){
					p.publicadtype = this.publicadtype;
				}
				if(this.fieldname !== -1){
					p[this.fieldname] = this.keyword;
				}

				//p['isselectall'] = s.selectAll | 0;
				
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/getscoredetaillist/',
					data:p,
					success(data){
						if(data.getret === 0){
							var t = setInterval(()=>{
							var  resourceList = Vue.obserable.trigger({
								type:"getResource",
							});
							if(resourceList){
								clearInterval(t);
								if(data.getret === 0){
									s.currentPage = 1;
									s.raterReportList = data.list;
									s.defaultList = data.list.concat([]);
									setTimeout(()=>{
										s.initVoteCanvas();
									},10)
									s.totalnum = data.totalnum;
									s.reportList.forEach((item)=>{
										item.checked = false;
									});

									//s.selectAll = false;
									s.passCount = 0;

									fn && fn();
									
									if(s.reportList.length){
										s.currentReportIndex = 0;
										s.formAdmin = s.reportList[s.currentReportIndex];
										if(this.formAdmin && this.formAdmin.userlabel){
											this.formAdmin.tagList = this.formAdmin.userlabel.split(',');
										}
									}
									resourceList.map((item)=>{
										if(item.resourceid === id){
											s.resourcecnname = item.resourcecnname;
											s.configList = JSON.parse(item.tablefield).fieldlist;
											s.configList.map((item)=>{
												if(item.fieldname === 'publicadtype'){
													s.menus = item.data;
												}
											})
										}
									})
								}
							}
						},30)

							
						
						}
					}
				}) 
			},

			searchReport(){
				if(this.keyword){
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						if(!this.keyword){
							this.fieldname = -1;
							this.getRaterReportList();
							return;
						}
						this.fieldname = this.kwType ===  '上传者' ? 'username' : this.kwType ===  '关键字'? 'searchkey' : -1;
						this.page = 1;
						this.getRaterReportList();

					}, 400);
				}
			},
		

			loadMoreReport(num){
				this.page = num;
				this.getRaterReportList();
				
			},
			pagesizeChange(size){
				this.page = 1;
				this.pagenum = size;
				this.getRaterReportList();
			},
			changeKwType(type){
				this.kwType = type;
				this.showCondition = false;
			},
			searchByClassic(type){
				this.classicType  = type;
				//this.statusType  = '全部';
				//publicadtype
				if(type !== '全部'){
					this.menus.map((menu)=>{
						if(type === menu){
							this.publicadtype = type;
						}
					})
				}else{
					this.publicadtype = -1;
				}
				this.page = 1;
				this.getRaterReportList();
				
			},

			searchByStatus(type){
				this.statusType  = type;
				if(type !== '全部'){
					this.status = type === '待审核'? 0 : type === '已通过'? 1 : 2
				}else{
					this.status = -1;
				}
				this.page = 1;
				this.getRaterReportList();
				//this.classicType  = '全部';
			},
		 
			initVoteCanvas(){
				var canvass = this.$refs['wm-result-canvas'];
				var r = canvass[0].width / 2 - 10,
					x = canvass[0].width / 2,
					y = canvass[0].width / 2;
				var s = this;
				canvass.map((canvas,i)=>{

					var context = canvas.getContext('2d');

					context.strokeStyle = 'yellowgreen';
					context.lineWidth = 20;
					context.beginPath();
					context.arc(x,y,r,0,Math.PI*2,false);
					context.stroke();

					context.strokeStyle = 'yellowgreen';
					context.lineWidth = 2;
					context.beginPath();
					context.arc(x,y,r-20,0,Math.PI*2,false);
					context.stroke();

					var totalVote = s.raterReportList[i].scorenum_faild +s.raterReportList[i].scorenum_success;
					var rejectScale = .5,
						passScale = .5;

					if(totalVote > 0){
						rejectScale = s.raterReportList[i].scorenum_faild / totalVote;
						passScale =  s.raterReportList[i].scorenum_success / totalVote;
					}

					//console.log(rejectScale)
					s.raterReportList[i].rejectScale = rejectScale;

					s.raterReportList[i].passScale = passScale;

					s.raterReportList[i].rotate = 180 - (rejectScale*360);
					s.raterReportList = s.raterReportList.concat([]);
					//console.log(s.raterReportList[i].rotate)
					context.beginPath();
					context.lineWidth = 20;
					context.strokeStyle = '#b20000';
					context.arc(x,y,r,-.5*Math.PI,Math.PI*2*rejectScale - .5*Math.PI,false);
					context.stroke();

					context.lineWidth = 1;
					context.beginPath();
					context.arc(x,y,r-20,-.5*Math.PI,Math.PI*2*rejectScale - .5*Math.PI,false);
					context.stroke();

					if(rejectScale>0 && passScale>0){
						context.lineWidth = 4;
						context.strokeStyle = '#fff';
						context.beginPath();
						context.moveTo(x,y);
						context.lineTo(x,0);
						context.stroke();

						//context.strokeStyle  = 'red';
						context.beginPath();
						context.moveTo(x,y);
						context.lineTo((x*Math.sin(rejectScale*360*Math.PI/180)+x),(x-x*Math.cos(rejectScale*360*Math.PI/180)));
						context.stroke();

					}

					if (i===0){
						console.log(rejectScale,passScale);
					}


				});
			}
		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
			 
			this.getRaterReportList();
			window.s = this;

			window.addEventListener('keydown',e=>{
				if(e.keyCode === 27 ){
					this.closePreview();
				}
				if(this.showPreview){
					if(e.keyCode === 37 ){
						this.currentReportIndex--;
						if(this.currentReportIndex<=-1){
							this.currentReportIndex = this.raterReportList.length -1;
						}
						this.currentReportIndex %= this.raterReportList.length;
						
					}
					else if(e.keyCode === 39){
						this.currentReportIndex++;
						this.currentReportIndex %= this.raterReportList.length;
					}
				}
			})
 
		}
	}
</script>
 <style>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

 </style>
 