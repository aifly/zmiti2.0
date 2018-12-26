<template>
	<div class="wm-rater-main-ui">
		<Split v-model='scale'>
			<div slot='left' style="background:#fff;width:98%;margin:0 auto">
				<header class="wm-rater-header">
					<div>{{resourceName}}</div>
					<div class="wm-rate-tabs">
						<ul>
							<li @click='getRateDataById(0)' :class="{'active':currentType === 0}">全部({{totalnum}})</li>
							<li @click='getRateDataById(1)' :class="{'active':currentType === 1}">待评({{unratenum}})</li>
							<li @click='getRateDataById(2)' :class="{'active':currentType === 2}">已评({{ratenum}})</li>
						</ul>
					</div>
				</header>
				<header class="wm-rater-search-where">
					<span>筛选条件：</span>
					<ul>
						<li @click="publictype ='全部'" :class="{'active':publictype === '全部'}">全部</li>
						<li @click="publictype =condition" :class="{'active':publictype === condition}" v-for="(condition , i ) in conditions" :key="i">
							{{condition.split('-')[0]}}
						</li>
					</ul>
				</header>
				<header class="wm-report-list-title">
					<div>介绍</div>
					<div>点评</div>
				</header>
				<section class='wm-scroll' :style="{height:viewH - 230+'px',overflow:'auto'}">
					<div class="wm-report-list">
						<transition-group name="reportitem" tag='ul'>
							<li @dblclick="previewReport(report)" :class="{'active':currentReportIndex === i,'delete':report.isdelete}" v-for="(report,i) in reportList "  @click.prevent='showDetail(report,i)' :key="i">
								<div class="wm-report-item">
									<div class="wm-report-detail">
										<div class="wm-report-pcbilethum">
											<img :src="report.pcbilethum" alt="">
										</div>
										<div class="wm-report-detail-content">
											<div  v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"||item.fieldname === "userlabel"' class="wm-myreport-title wm-myreport-item" v-for='(item,i) in configList' :key='i'>
												<div v-if='item.fieldname !== "userlabel"'>{{item.name}}：</div>
												<div  class="zmiti-text-overflow" v-if='item.fieldname !== "userlabel"' :class="item.fieldname">
													<span :title="report[item.fieldname]">{{report[item.fieldname]}}</span>
												</div>
												<div v-if='item.fieldname === "userlabel"'>标签：</div>
												<div class="wm-tag-list" v-if='item.fieldname === "userlabel" && formAdmin && formAdmin.tagList.length'>
													<Tag @on-close='removeTag(item.fieldname,i)' :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-if='tag' v-for="(tag,i) in (report[item.fieldname]||'').split(',')">{{tag}}</Tag>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div class="wm-report-rate-C">
									<div class="wm-report-rate-input">
										<Input :disabled='!!report.raterid' type='textarea' v-model='report.comments' placeholder='请输入您的评价' />
									</div>
									<div class="wm-report-rate-btns">
										<div>
											<transition name='pass'>
												<div :class='{"pass":report.score === 100}' v-if='!report.raterid || report.score === 100' class="wm-report-adopt" @click='checkReport(report,100,i)'>
													<span>{{report.score === 100 ? '已':''}}通过</span>
												</div>
											</transition>
											<transition name="reject">
												<div :class='{"reject":report.score === 0}'   v-if='!report.raterid  || report.score === 0' class="wm-report-reject" @click='checkReport(report,0,i)'>
													<span>{{report.score === 0 ? '已':''}}拒绝</span>
												</div>
											</transition>
										</div>
									</div>
								</div>
							</li>
						</transition-group>
						<div class="wm-load-more" @click="loadMoreReport">
							<span v-if='reportList.length<( currentType === 0 ? totalnum : currentType === 1 ? unratenum : ratenum )'>
								{{isLoading?'加载中...':'加载更多>>'}}
							</span>
							<span v-else>
								{{reportList.length<=0?'暂无数据':'数据已全加载完成'}}
							</span>
							<Icon v-if='isLoading' type="ios-loading" />
						</div>
					</div>
				</section>
			</div>
			<div slot='right' style="height:1200px" v-if='reportList.length>0' class="wm-myreport-right wm-scroll">
				<div   class="wm-right-thumb">
					<div>
						<img :src='reportList[currentReportIndex].pcbilethum||imgs.poster' />	
					</div>
				</div>
				 
				<div class="wm-myreport-title wm-myreport-item" v-for='(item,i) in configList' :key='i' v-if='item.fieldname !== "filesizeunit"'>
					<div v-if='item.fieldname !== "userlabel"&&(item.type === "text" ||item.type === "textarea"  ||item.type === "select")'>{{item.name}}：</div>
					<div v-if='item.fieldname !== "userlabel"&&  item.fieldname!=="filesize"&&(item.type === "text" ||item.type === "textarea")' >
						<span v-if='!item.canedit'>{{reportList[currentReportIndex][item.fieldname]}}</span>
					</div>

					<div  v-if='item.type === "select"'>
						{{reportList[currentReportIndex][item.fieldname]&& reportList[currentReportIndex][item.fieldname].split('-')[0]}}
					</div>

					<div v-if='item.fieldname ==="filesize"  &&(item.type === "text" ||item.type === "textarea")' @dblclick="editItem(item)" >
						<span v-if='!item.canedit'>{{reportList[currentReportIndex][item.fieldname]+ ' ' +reportList[currentReportIndex]['filesizeunit']}}</span>
					</div>

					<div class="wm-tag-list" v-if='item.fieldname === "userlabel"'>
						标签：
					</div>
					<div class="wm-tag-list" v-if='item.fieldname === "userlabel"'>
						<Tag  :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i' closable v-if='tag' v-for="(tag,i) in (reportList[currentReportIndex][item.fieldname]||'').split(',')">{{tag}}</Tag>
					</div>
					
				</div>
			</div>
		</Split>
		
		<Detail :checkReport='checkReport' :configList='configList' type="rater" :showPreview='showPreview'  :showMaskDetail='showMaskDetail' :currentReportIndex='currentReportIndex' :closePreview='closePreview' :reportList='reportList'></Detail>
		<!-- <div class="lt-full wm-report-C" v-if='showPreview &&false '>
			<div class="wm-preview-action">
				<span title='下载'>
					<a target="_blank" :href='reportList[currentReportIndex].filepath' :download="reportList[currentReportIndex].filetitle+'.'+reportList[currentReportIndex].fileextname">
						<Icon type="ios-download-outline" />
					</a>
				</span>
				<span title='打印' @click='printPage'><Icon type="md-print" /></span>
				<span class="wm-report-close" @click="closePreview"></span>
			</div>
			
			<div class="wm-report-print" ref='page' >
				<section style="display:flex;
							-webkit-display:flex;
							flex-flow: column;
							-webkit-flex-flow: column;
							width:100%;
							height:100%;
							-webkit-justify-content: space-between;
							justify-content: space-between;
							">
					<div style="height:60px;font-size:30px;text-align:center;border-bottom:1px solid #ddd;position:relative;z-index:1;">{{reportList[currentReportIndex].filetitle}}</div>
					<div style="
							flex:1;
							-webkit-flex:1;
							box-sizing:border-box;
							overflow:hidden;
							margin-top:20px;
							text-align:center;
							
							">
						<img style="position:relative;top:50%;
							transform:translate(0,-50%);
							-webkit-transform:translate(0,-50%);
							;display:block;width:auto;height:auto;max-width:100%;max-height:100%;margin:0 auto;" :class="reportList[currentReportIndex].fileextname" :src="reportList[currentReportIndex].pcbilethum||imgs.poster" alt="" />
					</div>
					<div style="height:100px;font-size:14px;line-height:30px;height:90px;overflow:hidden;color:#000">{{reportList[currentReportIndex].filedesc}}</div>

					<div  style="display:flex;-webkit-display:flex;width:100%;height:10vh;-webkit-justify-content: space-between;justify-content: space-between;-webkit-align-items: center;align-items: center;">
						<div>上传者：{{reportList[currentReportIndex].username}}</div>
						<div v-if='reportList[currentReportIndex].fileattr'>
							尺寸：{{reportList[currentReportIndex].fileattr}}
						</div>
					</div>
					<div style="width:100%;height:40px;line-height:50px;overflow:hidden;padding:10px;">
						<div style="padding:0 10px;line-height:40px;;font-size:13px;border:1px solid #ddd;color:#ddd;border-radius:5px;text-align:center;margin:6px 20px 0 0;display:inline-block;" v-for='(tag,i) in reportList[currentReportIndex].userlabel.split(",")' :key='i'>{{tag}}</div>
					</div>
				</section>

			</div>

			<div :class='{"original":showOriginalImg}'  v-if='reportList[currentReportIndex].fileextname !== "mp3" &&reportList[currentReportIndex].fileextname!== "webm" &&reportList[currentReportIndex].fileextname !== "mp4" && reportList[currentReportIndex].fileextname!== "aac"&&reportList[currentReportIndex].fileextname!== "wma"&&reportList[currentReportIndex].fileextname!== "ogg"'>
				<img @dblclick.stop="showOriginalImg = !showOriginalImg" :class="reportList[currentReportIndex].fileextname" :src="reportList[currentReportIndex].pcbilethum||imgs.poster" alt="" />
				<div class="wm-report-detail"  :class="{'hide':showMaskDetail,[reportList[currentReportIndex].fileextname]:1}" >
					<span v-if='"xlsx doc pdf ppt xls docx html css scss js vb shtml zip dmg".indexOf(reportList[currentReportIndex].fileextname)<=-1 '  @click='showMaskDetail = !showMaskDetail'>{{showMaskDetail?'展开':'收起'}}</span>
					<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc" ||item.fieldname === "userlabel"'  class="wm-myreport-title wm-myreport-item" v-for='(item,i) in configList' :key='i'>
						<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"'>{{item.name}} :</div>
						<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"' >
							<span>{{reportList[currentReportIndex][item.fieldname]}}</span>
						</div>
						<section class="wm-tag-list-C" v-if='item.fieldname === "userlabel"'>
							<div>标签：</div>
							<div class="wm-tag-list">
								<Tag @on-close='removeTag(item.fieldname,i)' :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-if='tag' v-for="(tag,i) in (reportList[currentReportIndex][item.fieldname]||'').split(',')">{{tag}}</Tag>
							</div>
						</section>
					</div>
				</div>
				<div class="wm-report-qrcode" ref='qrcode'>

				</div>
			</div>
			<div v-if='reportList[currentReportIndex].fileextname=== "mp4" ||reportList[currentReportIndex].fileextname=== "webm" '>
				<video autoplay controls :src='reportList[currentReportIndex].filepath'></video>
				<div class="wm-report-detail wm-video-detail" :class="{'hide':showMaskDetail}" >
					<span @click='showMaskDetail = !showMaskDetail'>{{showMaskDetail?'展开':'收起'}}</span>
					<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc" ||item.fieldname === "userlabel"'  class="wm-myreport-title wm-myreport-item" v-for='(item,i) in configList' :key='i'>
						<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"'>{{item.name}} :</div>
						<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"' >
							<span>{{reportList[currentReportIndex][item.fieldname]}}</span>
						</div>
						<section class="wm-tag-list-C" v-if='item.fieldname === "userlabel"'>
							<div>标签：</div>
							<div class="wm-tag-list">
								<Tag @on-close='removeTag(item.fieldname,i)' :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-if='tag' v-for="(tag,i) in (reportList[currentReportIndex][item.fieldname]||'').split(',')">{{tag}}</Tag>
							</div>
						</section>
					</div>
				</div>
				 
			</div>
			<div v-if='reportList[currentReportIndex].fileextname=== "mp3" ||reportList[currentReportIndex].fileextname=== "ogg"||reportList[currentReportIndex].fileextname=== "aac"||reportList[currentReportIndex].fileextname=== "wma" '>
				<audio autoplay controls :src='reportList[currentReportIndex].filepath'></audio>
				<div class="wm-report-detail wm-audio" :class="{'wm-audio':showMaskDetail}"  >
					<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc" ||item.fieldname === "userlabel"'  class="wm-myreport-title wm-myreport-item" v-for='(item,i) in configList' :key='i'>
						<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"'>{{item.name}} :</div>
						<div v-if='item.fieldname === "filetitle"||item.fieldname === "filedesc"' >
							<span>{{reportList[currentReportIndex][item.fieldname]}}</span>
						</div>
						<section class="wm-tag-list-C" v-if='item.fieldname === "userlabel"'>
							<div>标签：</div>
							<div class="wm-tag-list">
								<Tag @on-close='removeTag(item.fieldname,i)' :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-if='tag' v-for="(tag,i) in (reportList[currentReportIndex][item.fieldname]||'').split(',')">{{tag}}</Tag>
							</div>
						</section>
					</div>
				</div>
			</div>

			<section class="wm-report-check-in-mask" :class="{'hide':nextReport}">
				<div>
					<Input placeholder="请输入您的评价" :disabled='!!reportList[currentReportIndex].raterid' type="textarea" v-model="reportList[currentReportIndex].comments"/>
				</div>
				<div>
					<div  v-if='!reportList[currentReportIndex].raterid || reportList[currentReportIndex].score === 100' :class='{"pass":reportList[currentReportIndex].score === 100}'  class="wm-report-adopt" @click='checkReport(reportList[currentReportIndex],100,currentReportIndex)'>
						<span>{{reportList[currentReportIndex].score === 100 ? '已':''}}通过</span>
					</div>
					<div  v-if='!reportList[currentReportIndex].raterid  || reportList[currentReportIndex].score === 0' :class='{"reject":reportList[currentReportIndex].score === 0}'  class="wm-report-reject" @click='checkReport(reportList[currentReportIndex],100,currentReportIndex)'>
						<span>{{reportList[currentReportIndex].score === 0 ? '已':''}}拒绝</span>
					</div>
				</div>
			</section>

			<div class="wm-rater-mask-tip"  v-if='"jpg jpeg tiff png gif".indexOf(reportList[currentReportIndex].fileextname)>-1'>双击放大浏览</div>
		</div> -->
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	import QRCode from '../../components/lib/qrcode';
	import Detail from '../../common/mask/detail';
	import $ from 'jquery';
 

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				scale:.8,
				visible:false,
				imgs:window.imgs,
				publictype:'全部',
				isLoading:true,
				showOriginalImg:false,//是否显示原始图片。
				showMaskDetail:true,
				showPreview:false,
				nextReport:false,
				currentType:0,
				currentReportIndex:0,
				split1: 0.8,
				colorList:['default','success','primary','error','warning','red','orange','gold','yellow'],
				showPass:false,
				viewH:window.innerHeight,
				currentRateid:-1,
				resourceName:'',
				conditions:[],

				formAdmin:{
					raterpwd:'111111'
				},
			
				reportList:[],
				configList:[],
				totalnum:0,
				unratenum:0,
				ratenum:0,
				page:1,
				pagenum:20,
				userinfo:{}
			}
		},
		components:{
			Detail
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
			
			window.s = this;

			var t = setInterval(()=>{
				var configList = Vue.obserable.trigger({
					type:'getFeildList'
				});
				if(configList){
					clearInterval(t);
					this.configList = configList;
					this.conditions = this.configList.filter((item)=>{
						return item.fieldname === 'publicadtype'
					})[0].data;

					var data = Vue.obserable.trigger({
						type:'getCurrentSource'
					});
					this.resourceName  = data.resourcecnname;
					this.resourceid  = data.resourceid;
					this.getRaterlist();
				}
			},30);

			Vue.obserable.on('searchReportByKw',(kw)=>{
				s.reportList = [];
				if(kw.trim()){
					s.getRaterlist(kw);
				}else{
					s.getRaterlist();
				}
			});

			window.onkeydown = (e)=>{
				if(e.keyCode === 27 ){
					this.closePreview();
				}
				if(this.showPreview){
					if(e.keyCode === 37 ){
						this.currentReportIndex--;
						this.currentReportIndex %= this.reportList.length;
						
					}
					else if(e.keyCode === 39){
						this.currentReportIndex++;
						this.currentReportIndex %= this.reportList.length;
					}
				}
			}
		},
		watch:{
			publictype(val){
				this.currentType  = 0;
				this.reportList = [];
				if(val === '全部'){
					this.getRaterlist();
				}
				else{
					this.getRaterlist('',val);
				}
			}
		},
		methods:{
			printPage(){
				$(this.$refs['page']).printArea();
			},
			closePreview(){
				this.showPreview = false;
				this.showMaskDetail = false;
				this.showOriginalImg = false;//显示原始图片
			},

			previewReport(){//双击预览作品、
			   this.showMaskDetail = true;
			   this.showPreview = true;

			   var s = this;
				if(s.reportList[s.currentReportIndex].publicadtype === "h5-zmiti"&&s.reportList[s.currentReportIndex].previewurl){
					setTimeout(() => {
						new QRCode(this.$refs['qrcode'],{
							height:130,
							width:130,
							text:s.reportList[s.currentReportIndex].previewurl
						})
					}, 100);
				}
			},

			showDetail(report,index){
				this.currentReportIndex = index;
				this.formAdmin = report;
				this.formAdmin.tagList = this.formAdmin.userlabel.split(',');
				//this.currentReport = report;
			},
			checkReport(report,score,i){
				var s = this;
				if(report.raterid){
					//s.$Message.error('当前作品已评');
					return;
				}

				symbinUtil.ajax({

					_this:s,

					url:window.config.baseUrl+"/wmreview/gradingwork",
					data:{
						ratername:s.userinfo.ratername,
						accesstoken:s.userinfo.accesstoken,
						worksid:report.id,
						score,
						resourceid:s.resourceid,
						comments:report.comments
					},
					success(data){
						s.$Message[data.getret === 0?'success':'error'](data.getmsg);
						if(data.getret === 0){

							if(s.currentType === 0){
								s.reportList[i].score = score;
								s.reportList[i].raterid = s.userinfo.raterid; 
							}else{
								s.reportList[i].isdelete = true;
								s.reportList = s.reportList.concat([]);
								setTimeout(()=>{
									s.reportList.splice(i,1);
								},500)
							}

							if(s.showPreview){
								s.currentReportIndex++;
								s.currentReportIndex %= s.reportList.length;
								s.nextReport = true;
								setTimeout(() => {
									s.nextReport = false;
								}, 400);

							}else{
								s.currentReportIndex = 0;

							}
						
						}
					}

				})				
			},
			loadMoreReport(){

				if(this.reportList.length<( this.currentType === 0 ? this.totalnum : this.currentType === 1 ? this.unratenum : this.ratenum )){
					this.page++;
					this.getRaterlist();
				}

			},
			getRateDataById(index){
				this.currentType = index;
				this.reportList = [];
				this.page = 1;

				this.getRaterlist();
			},
			getRaterlist(kw='',publictype=''){
				var s = this;
				this.isLoading = true;
				var p = {
						username:s.userinfo.ratername,
						usertoken:s.userinfo.accesstoken,
						resourceid:s.resourceid,
						status:s.currentType,
						page:s.page,
						pagenum:s.pagenum
					}
				if(kw){
					p.searchkey = kw;
					this.page = 1;
				}
				if(this.publictype !== '全部'){
					this.page = 1;
					p.publictype = this.publictype;
				}
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmrateruser/getresourcelist',
					//validate:s.validate,
					data:p,
					success(data){
						s.isLoading = false;
						
						if(data.getret === 0){

							s.formAdmin = data.list[0] ||{userlabel:""};
							s.formAdmin.tagList = s.formAdmin.userlabel.split(',');
						
							s.reportList = s.reportList.concat( data.list);
							s.totalnum = data.totalnum;
							s.unratenum = data.nohavescorenum||0;
							s.ratenum = data.havescorenum||0;
						}
						else{
							s.$Message.error(data.getmsg);
						}
					}

				})
			}
		 
		}
	}
</script>
 
 <style>
	.wm-load-more i{
		-webkit-animation:1s rotate infinite linear;		
	}
 </style>
 