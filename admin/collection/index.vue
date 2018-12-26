<template>
	<div class="wm-collection-ui lt-full" @click.stop='showCondition = false;showCheckAction = false'>
		<div  class="wm-collection-left-pannel" :style="{height:viewH -   64+'px'}">
			<h2 class="zmiti-text-overflow">{{resourcecnname}}</h2>
			<ul>
				<li @click='mainType = 0' :class="{'active':mainType === 0}">上报审核</li>
				<li @click='mainType = 1' :class="{'active':mainType === 1}">评分管理</li>
				<li @click='mainType = 2' :class="{'active':mainType === 2}">终审归档</li>
				<li @click='mainType = 3' :class="{'active':mainType === 3}">统计</li>
			</ul>
		</div>
		<Result  v-if='mainType  === 1'></Result>
		<LastCheck  v-if='mainType  === 2'></LastCheck>
		<Statistics  v-if='mainType  === 3'></Statistics>

		<Split v-model='scale' v-if='mainType === 0'> 
			<div slot='left' class="wm-collection-left-main-ui">
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
							<div class="wm-collection-check-action">
								<Checkbox v-model="selectAll">全选</Checkbox>
								<Button type="primary" size='small' @click.stop='showCheckAction = true'>操作 <Icon type="ios-arrow-up" /></Button>
								<ul v-if='showCheckAction'>
									<li @click.stop="checkAction(1)">
										<label for=""><Icon type="ios-checkmark-circle-outline" /></label>
										通过
									</li>
									<li @click.stop="checkAction(2)">
										<label for="">
											<Icon type="ios-close-circle-outline" />
										</label>
										拒绝
									</li>
									<li @click.stop="checkAction('download')">
										<label  v-if='!isdownloading' ><Icon type="ios-cloud-download-outline" /></label>
										<label  v-else  class="demo-spin-icon-load1"><Icon type="ios-loading" /></label> 下载
									</li>
								</ul>
							</div>
						</div>
					</header>
					<header class="wm-collection-left-search-condition-header">
						<div>分类： <span @click.stop='searchByClassic(menu)' :class="{'active':classicType == menu}" v-for='(menu,i) in menus' :key="i">{{menu.split('-')[0]}}</span><span @click.stop='searchByClassic("全部")'  :class="{'active':classicType == '全部'}">全部</span> </div>
						<div>状态：
							<span @click.stop='searchByStatus("待审核")' :class="{'active':statusType == '待审核'}">待审核</span>
							<span :class="{'active':statusType == '已通过'}" @click.stop='searchByStatus("已通过")'>已通过</span>
							<span :class="{'active':statusType == '已拒绝'}" @click.stop='searchByStatus("已拒绝")'>已拒绝</span> 
							<span @click.stop='searchByStatus("全部")' :class="{'active':statusType == '全部'}">全部</span>
						</div>
					</header>
					<div class="wm-scroll wm-collection-report-list" :style="{height:viewH - 230+'px'}">
						<ul>
							<li @dblclick="previewReport(report,i)" @click.prevent='showDetail(report,i)'  class="wm-collection-report-item" v-for='(report,i) in reportList' :key="i">
								<div :class="{'active':i === currentReportIndex}" class='wm-report-item-bg'>
									<img :src="report.upfilemergerstatus<2 ? imgs.merge :(report.mobilethum.replace('uploads//','uploads/')||imgs.poster)" alt="">
								</div>
								<div class="wm-collection-report-status">
									<img v-if='report.status===1' :src="imgs.pass" alt="">
									<img  v-if='report.status===2' :src="imgs.reject" alt="">
								</div>
								
								<div class="wm-collection-check" @click='toggleChecked(i)'>
									<Checkbox  v-model="report.checked"></Checkbox>
								</div>
								<div class="wm-report-action" v-if='report.isLoaded'>
									<div class="wm-report-action-icon"></div>
								</div>
								<div v-if='report' :title='report.filetitle' class="wm-report-item-name zmiti-text-overflow">{{report.filetitle}}</div>
							</li>	
						</ul>
						<div class="wm-collection-pagetion" v-if='!selectAll'>
							<Page :current='currentPage' @on-page-size-change='pagesizeChange' show-elevator show-sizer  @on-change='loadMoreReport' :total="totalnum" show-total :page-size='pagenum' />
						</div>
					</div>
				 
			</div>
			<div slot="right" class="wm-collection-right wm-scroll" v-if='reportList[currentReportIndex]'>
				<h1 style="height:30px"></h1>
				<div   class="wm-right-thumb">
					<div>
						<img :src='reportList[currentReportIndex].mobilethum||imgs.poster' />	
					</div>
				</div>
				
				<div v-if='item.loading' class="wm-myreport-title wm-myreport-item" v-for='(item,i) in configList' :key='i'>
					<div v-if='item.fieldname!=="userlabel" && item.fieldname!=="filesize"&&(item.type === "text" ||item.type === "textarea"  ||item.type === "select")'>{{item.name}}：</div>
					<div v-if='item.fieldname!=="userlabel" && item.fieldname!=="filesize"&&(item.type === "text" ||item.type === "textarea")' @dblclick="editItem(item)" >
						<span v-if='!item.edit'>{{reportList[currentReportIndex][item.fieldname]}}</span>
						<input  @blur='modifyReport(reportList[currentReportIndex][item.fieldname],item.fieldname)' v-if='item.edit' type="text" v-model="reportList[currentReportIndex][item.fieldname]">
					</div>

					<div v-if='item.fieldname ==="filesize" &&(item.type === "text" ||item.type === "textarea"  ||item.type === "select")'>{{item.name}}：</div>
					<div v-if='item.fieldname ==="filesize" &&(item.type === "text" ||item.type === "textarea")' @dblclick="editItem(item)" >
						<span v-if='!item.canedit'>{{reportList[currentReportIndex][item.fieldname]+ ' ' +reportList[currentReportIndex]['filesizeunit']}}</span>
					</div>

					<div  v-if='item.type ===  "select" '>
						<Select @on-change='modifyPublicadtype(item.fieldname)'   v-model="formAdmin[item.fieldname]" size='small'  style="width:100px">
							<Option v-for="(dt,k) in item.data" :value="dt" :key="k">{{ dt.split('-')[0] }}</Option>
						</Select>
					</div>
					
					<!--
					<div class="wm-tag-list"  v-if='item.fieldname === "userlabel"'>
						<Tag v-if='formAdmin && formAdmin.tagList&&formAdmin.tagList.length' :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-for="(tag,i) in (reportList[currentReportIndex][item.fieldname]||'').split(',')">{{tag}}</Tag>
					</div>
 -->
					 <div v-if='item.fieldname === "userlabel"'>标签：</div>
					<div class="wm-tags" v-if='item.fieldname === "userlabel"'>
						<input placeholder="按回车添加标签" type="text" v-model="beforeUploadTag" @keydown.13='addTagBeforeUpload' />
						<h2 style="height:30px;">
						</h2>
						<Tag color='warning' v-if='tag' @on-close="deltag(tag)" closable  v-for="(tag,i) in reportList[currentReportIndex].userlabel.split(',')" :key='i'>{{tag}}</Tag>
					</div>
				
				</div>


			</div>
		</Split>
		<Detail :checkReportById='checkReportById' :configList='configList' :type="$route.params.type" :showPreview='showPreview'  :nextReport='nextReport' :showMaskDetail='showMaskDetail' :currentReportIndex='currentReportIndex' :closePreview='closePreview' :reportList='reportList'></Detail>
		<Download :isdownloading='showDownloadtip' :hideDownloadTip="hideDownloadTip"></Download>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import Result from './result.vue';
	import LastCheck from './lastcheck.vue'
	import Statistics from './statistics.vue'
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
				showDownloadtip:false,
				beforeUploadTag:"",
				scale:.8,
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight,
				resourcecnname:'',
				kwType:'关键字',
				showCondition:false,
				keyword:'',
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
				classicType:'图片-zmiti',
				statusType:'待审核',
				publicadtype:'图片-zmiti',
				totalnum:0,
				status:0,
				currentPage:0,
				classic:-1,
				page:1,
				pagenum:20,
				raterReportList:[],
				isdownloading :false,
				checkedList:[]

			}
		},
		components:{
			Result,
			LastCheck,
			Detail,
			Download,
			Statistics
		},
		watch:{
			selectAll(val){

				var len = this.reportList.length;
				this.reportList.forEach((item)=>{
					item.checked = val;
					if(val){
						this.checkedList.push(item);
					}
					else{
						this.checkedList.length = 0;
					}
				});

			},
			mainType(val){
				window.location.hash = "/collection/"+this.$route.params.id+'/'+val;
			}
		},
		methods:{
			deltag(name){

				var taglist = this.reportList[this.currentReportIndex].userlabel.split(',');
				var index = -1;
				taglist.forEach((item,i)=>{
					if(item === name){
						index = i;
					}
				})
				taglist.splice(index,1);
				this.reportList[this.currentReportIndex].userlabel = taglist.join(',');

				this.modifyReport(this.reportList[this.currentReportIndex].userlabel,'userlabel');
				
			},
			addTagBeforeUpload(){
				if(!this.beforeUploadTag){
					return;
				}
				this.formAdmin.tagList = this.formAdmin.tagList || [];
				this.formAdmin.tagList.push(this.beforeUploadTag);
				var taglist = this.reportList[this.currentReportIndex].userlabel.split(',');
				taglist.push(this.beforeUploadTag);
				this.reportList[this.currentReportIndex].userlabel = taglist.join(',');
				this.modifyReport(this.reportList[this.currentReportIndex].userlabel,'userlabel');
				this.beforeUploadTag = '';
			},


			toggleChecked(index){
				var isChecked = !this.reportList[index].checked;
				if(isChecked){
					this.checkedList.push(this.reportList[index]);
				}else{
					this.checkedList.forEach((item,i)=>{
						if(item.id === this.reportList[index].id){
							this.checkedList.splice(i,1);
						}
					});
				}
			},

			changeChecked(report,i){
				if(report.checked){
					this.downloadCount += 1;
				}
				else{
					this.downloadCount -= 1;
				}
				 
				//console.log(this.passCount);
			},

			hideDownloadTip(){
				this.showDownloadtip = false;
			},

			modifyPublicadtype(key){
				var s = this;
				var id = this.$route.params.id;
				var p = {
					admintoken:s.userinfo.admintoken,
					adminusername:s.userinfo.adminusername,
					resourceid:id,
					id:s.formAdmin.id,
					[key]:s.formAdmin[key]
				}
				this.editReportByItem(p)
			},

			modifyReport(model,key){
				
				var s = this;
				var id = this.$route.params.id;
				
				var p = {
					admintoken:s.userinfo.admintoken,
					adminusername:s.userinfo.adminusername,
					resourceid:id,
					id:s.formAdmin.id,
					[key]:model
				}
				this.editReportByItem(p);
			},
			editReportByItem(p){
				var s = this;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/updateworks',
					data:p,
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.getmsg);
						if(data.getret === 0){
							//s.filterReportList();
							//s.configList = s.configList.concat([]);
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
							this.getReportList();
							return;
						}
						this.fieldname = this.kwType ===  '上传者' ? 'username' : this.kwType ===  '关键字'? 'searchkey' : -1;
						this.page = 1;
						this.getReportList();

					}, 400);
				}
			},
			checkReportById(report,status,index){
				var  s = this;
				s.check(status,report.id, status === 2 ? report.remark : '');
			},

			loadMoreRaterReport(){

			},

			loadMoreReport(num){
				this.page = num;
				this.getReportList();
				
			},
			pagesizeChange(size){
				this.page = 1;
				this.pagenum = size;
				this.getReportList();
			},
			closePreview(){
				this.showPreview = false;
				this.showMaskDetail = true;
				Vue.obserable.trigger({
					type:'closeOriginalImg'
				})
			},

			previewReport(report,index){//双击预览作品、
				if(report.upfilemergerstatus === 0){
					this.$Message.error('请稍等，文件正在合并中...');
					return;
				}
				clearTimeout(this.clickTimer);
				this.showPreview = true;
				this.currentReportIndex = index;
			},

			showDetail(report,index){
				clearTimeout(this.clickTimer);
				this.clickTimer = setTimeout(() => {
					report.checked = !report.checked;
					this.currentReportIndex = index;
					this.formAdmin = report;
					this.formAdmin.tagList = this.formAdmin.userlabel.split(',');
					//this.currentReport = report;
					this.reportList = this.reportList.concat([]);
				},200);
			},

			check(status,ids,remark=''){
				var s = this;
				var id = this.$route.params.id;
				
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/checkresource/',
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername,
						resourceid:id,
						status,
						ids:ids.join?ids.join(','):ids,
						remark
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.getmsg);
						if(data.getret === 0){
							s.selectAll = false;
							s.getReportList();
							s.checkedList.length = 0;
							if(s.showPreview){
								/* s.currentReportIndex++;
								s.currentReportIndex %= s.reportList.length; */
								console.log('s.currentReportIndex =>'+s.currentReportIndex);
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

			getviews(key='views',resourceid,ids){
				if(ids.length<=0){
					return;
				}
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/wmshare/getviews',
					data:{
						resourceid,
						id:ids.join(','),
						field:key
					},
					success(data){
						console.log(data);
						if(data.getret === 0){
							if(key === 'downloads'){
								s.reportList.forEach((item,i)=>{
									ids.forEach((id,k)=>{
										if(item.id === id){
											item.downloads += 1;
										}
									})
								})
							}
						}
					}
				})
			},

			checkAction(status){
				
				var s = this;
				if(status === 'download'){
					var urls =  [];

					var filenameList = [];
					var ids = [];
					s.checkedList.map((item)=>{
						urls.push(item.filepath);
						filenameList.push(item.filetitle+'.'+item.fileextname)
						ids.push(item.id);
					});
					if(!urls.length){
						s.$Message.error('请至少选择一个要下载的作品');
						return;
					}
					s.isdownloading = true;

					s.getviews('downloads',s.$route.params.id,ids);
					symbinUtil.ajax({
						url:window.config.baseUrl+'/wmadadmin/createzip',
						data:{
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername,
							urls:urls.join(','),
							filetitles:filenameList.join(',')
						},
						error(){
							s.isdownloading = false;
						},
						success(dt){
							s.isdownloading = false;
							s.showCheckAction = false;
							
							if(dt.getret === 0){
								/* var a = document.createElement('a');
								a.href = data.zipurl;
								a.innerHTML = '下载';
								a.download = data.zipurl;
								a.style.position = 'fixed';
								a.style.left = '-100px';
								a.style.opacity = 0;
								document.body.appendChild(a);
								a.target = '_blank';
								//a.click(); */
								
								var data = window.config.adminDownloadConfig[s.$route.params.id||'1'];
								var name = dt.zipurl.split('/')[dt.zipurl.split('/').length-1];
								var extname = name.split('.')[1]||'zip';

								window.location.href = window.config.baseUrl+'/wmadvuser/downloadfile1?p1='+data.p1+"&p2="+data.p2+"&p3="+data.p3+"&filetitle="+encodeURI(name)+"&newfilename="+name.split('.')[0]+"&fileextname="+extname;
								//window.location.href = data.zipurl;


							}
							else if(dt.getret === 2001){//文件大小超过限制，请到下载页面下载
								s.showDownloadtip = true;
							}
						}
					})
				}else{
					var ids =  [];
					s.reportList.map((item)=>{
						if(item.checked){
							ids.push(item.id)
						}
					});
					if(!ids.length){
						s.$Message.error('请至少选择一个要审核的作品');
						return;
					}
					this.check(status,ids);

				}
			
				
			},
			changeKwType(type){
				this.kwType = type;
				console.log(this.kwType)
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
				this.getReportList();

				
			},
			searchByStatus(type){
				this.statusType  = type;
				if(type !== '全部'){
					this.status = type === '待审核'? 0 : type === '已通过'? 1 : 2
				}else{
					this.status = -1;
				}
				this.page = 1;
				this.getReportList();
				//this.classicType  = '全部';
			},
			getReportList(fn){
				var id = this.$route.params.id;
				
				var s = this;

				var  p  ={
					admintoken:s.userinfo.admintoken,
					adminusername:s.userinfo.adminusername,
					resourceid:id,
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

				//console.log(p);
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/getresouredetaillist/',
					data:p,
					success(data){
						
						var t = setInterval(()=>{
							var  resourceList = Vue.obserable.trigger({
								type:"getResource",
							});
							if(resourceList){
								clearInterval(t);
								console.log(resourceList);
								if(data.getret === 0){
									s.currentPage = 1;
									s.reportList = data.list;
									s.totalnum = data.totalnum;
									var ids = [];
									 
									s.reportList.forEach((item)=>{
										ids.push(item.id);
										item.checked = false;
										s.checkedList.forEach((ls)=>{
											if(ls.id === item.id){
												item.checked = true;
											}
										})
									});

									s.getviews('views',id,ids);
									 
									///s.selectAll  = false;
									if(s.reportList.length){
										//s.currentReportIndex = 0;

										s.formAdmin = s.reportList[s.currentReportIndex];
										if(!s.formAdmin){
											s.currentReportIndex =  0;
											s.formAdmin = s.reportList[s.currentReportIndex];
										}
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
													//s.classicType = s.menus[0];
													///s.publicadtype= s.menus[0];
												}
											})
										}
									})

									fn && fn();
								}
							}
						},30)
					}
				});
			}
			
		},
		mounted(){
			
			this.userinfo = symbinUtil.getUserInfo();
			
			this.mainType = this.$route.params.type*1
			this.getReportList();
			
			window.s = this;

			window.onkeydown = (e)=>{
				if(e.keyCode === 27 ){
					this.closePreview();
				}
				if(this.showPreview){
					if(e.keyCode === 37 ){
						this.currentReportIndex--;
						if(this.currentReportIndex<=-1){
							this.currentReportIndex = this.reportList.length -1;
						}
						this.currentReportIndex %= this.reportList.length;
						
					}
					else if(e.keyCode === 39){
						this.currentReportIndex++;
						this.currentReportIndex %= this.reportList.length;
					}
				}
			}
		}
	}
</script>
 <style>
	.demo-spin-icon-load1{
        animation: ani-demo-spin 1s linear infinite;
		-webkit-animation: ani-demo-spin 1s linear infinite;
		display: inline-block;
		width: 20px;
		height: 20px;
		position: relative;
		top: 4px;
		left: -2px;;
	}
	.demo-spin-icon-load1 i{
		position: absolute;
		left: 50%;
		top:50%;
		text-indent:0;
		-webkit-transform:translate(-50%,-50%);
		transform:translate(-50%,-50%);
		margin-top: 0 !important;

	}
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

 </style>
 