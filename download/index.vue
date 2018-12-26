<template>
	<div class="wm-user-dowload-ui " :class='{"isAdmin":isAdmin,"isUser wm-scroll":isUser,"showpreview":showPreview&&(isAdmin||isUser)}' :style="{height:isUser||isAdmin?viewH-(showPreview?0:90)+'px':'auto'}" @click.stop='showCondition = false;showCheckAction = false'>
		
		<div  class="wm-collection-left-main-ui">
			<header class='wm-collection-left-header' v-if='viewW<=760'>
				<div class="wm-collection-search-content">
					<div>
						<Input  v-model="keyword" @on-keydown='searchReport' search enter-button="搜索" @on-search='searchReport' placeholder="搜索关键字" />
					</div>
				</div>
			</header>
			<header class="wm-collection-left-search-condition-header">

				<div class='wm-download-header-label'>
					<div>
						分类：<span @click.stop='searchByClassic(menu)' :class="{'active':classicType == menu}" v-for='(menu,i) in menus' :key="i">{{menu.split('-')[0]}}</span> 
					</div>
					<div>
						排序：
						<span @click.stop='searchBySort("time")' :class="{'active':sort===-1||sort === 1}">审核时间<Icon type="md-arrow-up" v-if='sort===-1' /><Icon type="md-arrow-down" v-if='sort ===1' /></span>
						<span @click.stop='searchBySort("name")' :class="{'active':sort===2||sort === 3}">作品名称<Icon type="md-arrow-up" v-if='sort===3' /><Icon type="md-arrow-down" v-if='sort===2' /></span>
					</div>
				</div>
				<div class="wm-collection-search-content">
					<div>
						<Input size='large'  v-model="keyword" @on-keydown='searchReport' search enter-button="搜索" @on-search='searchReport' placeholder="搜索关键字" />
					</div>
				</div>
				<div class="wm-collection-check-action" >
					<div>
						<Checkbox v-model="selectAll" v-if='classicType === "图片-zmiti"'>全选</Checkbox>
						<Button type="primary" size='small' :style="{opacity:classicType !== '图片-zmiti'?0:1}" :disabled='downloadCount<=0 || classicType !== "图片-zmiti"' @click="checkAction('download')" >批量下载 </Button>
						<Button class='wm-href' size='small' style="background: #f5a420;color:#fff;">
							<a :href="uploadUrl" target='_blank'>上报</a>
						</Button>

						<Button v-if='false' class='wm-href' size='small' style="background: #f5a420;color:#fff;"  @click="gettestviews()" >
							测试下载
						</Button>
					
					</div>
				</div>

				<!-- <div></div>
				
				 -->
			</header>
			<!-- <header class="wm-collection-left-search-condition-header">
				<div>
					排序：
					<span @click.stop='searchBySort()' :class="{'active':sort===-1}">审核时间<Icon type="md-arrow-up" v-if='sort===-1' /><Icon type="md-arrow-down" v-if='sort!==-1' /></span>
					<span @click.stop='searchBySort()' :class="{'active':sort===2||sort === 3}">作品名称</span>
			    </div>
				<div class="wm-collection-search-content">
				
				</div>
				<div class="wm-collection-check-action" >
					
				</div>
			</header> -->
			<div class="wm-scroll wm-collection-report-list">
				<ul v-if='publicadtype==="图片-zmiti"||publicadtype === "h5-zmiti" ||publicadtype==="动漫-zmiti" '>
					<li class="wm-collection-report-item" v-for='(report,i) in reportList' :key="i">
						<div :class="{'active':i === currentReportIndex}" class='wm-report-item-bg'  @click="previewReport(i,report)" >
							<img :src="report.pcbilethum||imgs.poster" alt="">
							<Button type='primary' v-if='report.publicadtype !== "h5-zmiti"' @click.stop="checkAction(report)">下载</Button>
							<span class='wm-report-shadow' v-if='"aac ogg  mp3 mp4 webm aac wma vnd.dlna.adts ".indexOf(report.fileextname)>-1'></span>
						</div>
						<div class="wm-collection-check" @click='toggleChecked(i)'>
							<Checkbox @on-change='changeChecked(report,i)' v-model="report.checked"></Checkbox>
						</div>
						<div class="wm-report-action" v-if='report.isLoaded'>
							<div class="wm-report-action-icon"></div>
						</div>
						<div v-if='report' :title='report.filetitle' class="wm-report-item-name zmiti-text-overflow">{{report.filetitle}}</div>
						<div v-if='report' class='wm-report-item-attr'>
							<div>作品编号：{{report.id}}</div>
						</div>
						<div v-if='report' class='wm-report-item-attr'>
							<div>审核时间：{{report.audittime}}</div>
						</div>
						<div v-if='report' class='wm-report-item-attr'>
							<div>上传单位：{{report.username}}</div>
						</div>
						<div v-if='report' class='wm-report-item-attr'>
							<div>浏览量：{{report.views+1}}</div>
							<div>下载量：{{report.downloads}}</div>
							
						</div>
						<div v-if='report' class='wm-report-item-attr'>
							<div>尺寸：{{report.fileattr}}</div>
							<div>大小：{{report.filesize+report.filesizeunit}}</div>
						</div>
					</li>	
				</ul>
				<ul v-else class='wm-media-list'>
					<li class="wm-collection-report-item" v-for='(report,i) in reportList' :key="i">
						<div><Checkbox @on-change='changeChecked(report,i)' v-model="report.checked"></Checkbox></div>
						<div class='wm-collection-report-content' >
							<div style="line-height:130px;">
								<img :src="report.pcbilethum||imgs.poster" alt="">
							</div>
							<div>
								<div class='zmiti-text-overflow'>作品名称：{{report.filetitle}}</div>
								<div>作品编号：{{report.id}}</div>
								<div>审核时间：{{report.audittime}}</div>
								<div>上传单位：{{report.username}}</div>
								<div>浏览量：{{report.views+1}}</div>
								<div>下载量：{{report.downloads}}</div>
								<div class='wm-unit'>大小：{{report.filesize+ ' '+report.filesizeunit}}</div>
							</div>
							<div class='wm-download-help'>
								{{'提示：如遇'+report.publicadtype.split('-')[0]+'直接播放，可在播放页右键选择'+report.publicadtype.split('-')[0]+'另存即可'}}<br/>
								如下载显示404信息，则表示下载人数过多，可刷新或者选择其它线路
							</div>

						</div>
						<div>
							<Icon v-if='false' @click="previewReport(i,report)" type="md-arrow-dropright-circle" />
							<Icon v-if='false' class='wm-downlad-ico'  @click.stop="checkAction(report)" type="md-cloud-download" />
							<a v-if='false' href="javascript:void(0)"  @click.stop="checkAction(report,1)">[下载线路1]</a>
							<a href="javascript:void(0)"  @click.stop="checkAction(report,1)" style='color:#056307;'>[下载线路1]</a>
							<a  href="javascript:void(0)"  @click.stop="checkAction(report,1)">[下载线路2(高速)]</a>
							<a v-if='false' href="javascript:void(0)"  @click.stop="checkAction(report,3)" style="color:#f00">[下载线路2(推荐)]</a>
						</div>
					 
					</li>	
				</ul>
				<div v-if='showLoading' class='wm-data-loading'> 
					<Icon type="ios-loading" size=20 class="demo-spin-icon-load1"></Icon>
					<div>数据加载中...</div>
				</div>
				<div class="wm-collection-pagetion" >
					<Page  @on-page-size-change='pagesizeChange'   @on-change='loadMoreReport' :total="totalnum" show-total :page-size='pagenum' />
				</div>
			</div>
		</div>
		<Detail :obserable='obserable' :checkReportById='checkReportById' :configList='configList' :type="'download'" :showPreview='showPreview'  :nextReport='nextReport' :showMaskDetail='showMaskDetail' :currentReportIndex='currentReportIndex' :closePreview='closePreview' :reportList='reportList'></Detail> 

		<div class='wm-download-loading-C' v-if='isdownloading' @click.stop="isdownloading = false">
			<div class='wm-download-loading' >
				<header>
					<div>下载提示</div>
					<div @click="isdownloading = false"><Icon type="md-close" /></div>
				</header>
				<div  class='wm-download-tip'>
					<div>
						<img :src="imgs.createzip" alt="">
					</div>
					<div>文件正在打包中，请稍后...</div>
				</div>
			</div>
		</div>

		<div class='wm-download-mobile-mask' v-if='viewW<=760 && mobileReport.filepath'>
			<img :src="mobileReport.filepath" alt="" v-if='"jpg jpeg png gif tif tiff".indexOf(mobileReport.ext)>-1'>
			<video controls v-if='"webm mp4".indexOf(mobileReport.ext)>-1' :src='mobileReport.filepath'></video>
			<audio controls v-if='"mp3 ogg aac acc m4a".indexOf(mobileReport.ext)>-1' :src='mobileReport.filepath'></audio>
			<div v-if='mobileReport.ext === "h5"'>{{mobileReport.filetitle}}</div>
			<div v-if='mobileReport.ext === "h5"'>{{mobileReport.filepath}}</div>
			<div class='wm-download-close' @click='mobileReport = {}'>
				<Icon type="md-close" />
			</div>
		</div>
		<a :href="downloadImg" v-if='downloadImg' style="opacity:0;position:fixed;top:100%;left:100%" ref='downloadimg' target='_blank'>1</a>
		<DownloadTip :isdownloading='showDownloadtip' :hideDownloadTip="hideDownloadTip"></DownloadTip>

		<div class='wm-help' @click="visiable = true" v-if='false'>
			下载帮助
		</div>
		<Modal
			v-model="visiable"
			title="下载帮助"
			>
			<p>QQ群号：947613787 </p>
		</Modal>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../components/lib/util';
	import Vue from "vue";
	import Detail from '../common/mask/detail';
	import DownloadTip from '../common/mask/download';

	export default {
		props:['obserable','isAdmin','isUser'],
		name:'zmitiindex',
		data(){
			return{
				colorList:['default','success','primary','error','warning','red','orange','gold','yellow'],
				isLoading:false,
				selectAll:false,
				visiable:false,
				scale:1,
				showLoading:false,
				showDownloadtip:false,
				uploadUrl:window.config.uploadUrl,
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight,
				viewW:document.documentElement.clientWidth,
				resourcecnname:'',
				kwType:'关键字',
				downloadCount:0,
				downloadImg:'',
				mobileReport:{
					 
				},
				showCondition:false,
				keyword:'',
				fieldname:-1,
				nextReport:false,
				reportList:[],
				showPreview:false,
				showMaskDetail:true,
				mainType:0,
				sort:1,
				showCheckAction:false,
				configList:[
					
				],
				currentReportIndex:0,
				menus:['图片-zmiti','视频-zmiti','音频-zmiti','动漫-zmiti','h5-zmiti'],
				classicType:'图片-zmiti',
				statusType:'全部',
				publicadtype:'图片-zmiti',
				totalnum:0,
				status:-1,
				currentPage:0,
				classic:-1,
				page:1,
				pagenum:200,
				raterReportList:[],
				isdownloading :false,
				checkedList:[],
			}
		},
		components:{
			Detail,
			DownloadTip
		},
		watch:{
			selectAll(val){

				var len = this.reportList.length;
				this.reportList.forEach((item)=>{
					item.checked = val;
					this.downloadCount = val? len:0;
					if(val){
						this.checkedList.push(item);
					}
					else{
						this.checkedList.length = 0;
					}
				});
			},

			downloadCount(){
				var size = 0 ;
				this.reportList.forEach((item)=>{
					if(item.checked){
						size += item.filesize*1;
					}
					
				});
				if(size/1000/1000>400){
					this.$Message.error('打包文件已经超出最大范围,请减少下载数量。');
				}
			},
		 
			mainType(val){
				//window.location.hash = "/collection/"+this.$route.params.id+'/'+val;
			}
		},
		methods:{
			hideDownloadTip(){
				this.showDownloadtip = false;
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

			searchBySort(type){

				if(window.config.isRequestLocal){
					this.$Message.error('当前下载量过大，此功能暂停使用');
					return;
				}

				if(type === 'time'){
					this.sort = this.sort === -1 ? 1:-1;
				}
				else{
					this.sort = this.sort === 2 ? 3:2;
				}
				this.getReportList();
			},

		 
			searchReport(){
				
				if(this.keyword){
					if(window.config.isRequestLocal){
						this.$Message.error('当前下载量过大，此功能暂停使用');
						return;
					}
					clearTimeout(this.timer);
					this.timer = setTimeout(() => {
						if(!this.keyword){
							this.fieldname = -1;
							this.getReportList();
							return;
						}
						this.fieldname = this.kwType ===  '上传者' ? 'username' : this.kwType ===  '关键字'? 'searchkey' : -1;
						this.fieldname = 'searchkey';
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
				if(this.isAdmin||this.isUser){}
				else{
					window.location.hash = '/'+this.$route.params.resourceid;
				}
				(this.obserable||Vue.obserable).trigger({
					type:'closeOriginalImg'
				})
			},

			previewReport(index,report,flag){//双击预览作品、
				
				if(window.innerWidth<=760){
					if(report.publicadtype === 'h5-zmiti'){
						this.mobileReport = {
							filepath : report.previewurl,
							ext:'h5',
							filetitle:report.filetitle
						}

					} else{

						this.mobileReport = {
							filepath : report.filepath,
							ext:report.fileextname
						}
					}
				}else{
					clearTimeout(this.clickTimer);
					this.showPreview = true;
					this.currentReportIndex = index;
					
				}
				if(flag){
					//symbinUtil.changeURLPar(window.location.href,'id',-1);
				}
				if(this.isUser || this.isAdmin){

				}else{
					window.location.hash = '/'+(this.$route.params.resourceid||1)+'/'+report.id+'/';
				}
				
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

			checkAction(status,index){
				
				var s = this;


				var urls =  [];
				var downloadSize = 0;
				var filenameList = [];

				var ids = [];
				s.checkedList.map((item)=>{
					downloadSize+=item.filesize*1;
					urls.push(item.filepath);
					
					filenameList.push(item.filetitle+'.'+item.fileextname)
					ids.push(item.id)
					
				});
				
				if(status === 'download'){
					s.getviews('downloads',s.$route.params.id ||1,ids);

					if(!urls.length){
						s.$Message.error('请至少选择一个要下载的作品');
						return;
					}
					if(this.isUser || this.isAdmin){

						s.isdownloading = true;
						var url = window.config.baseUrl+'/wmadvuser/createzip';
						var data = {
							admintoken:s.userinfo.admintoken,
							adminusername:s.userinfo.adminusername,
							urls:urls.join(','),
							filetitles:filenameList.join(',')
						}
						if(this.isUser){
							window.config.baseUrl+'/wmadadmin/createzip';
							data = {
								username : s.userinfo.username,
								usertoken : s.userinfo.accesstoken,
								urls:urls.join(','),
								filetitles:filenameList.join(',')
							}
						}
						symbinUtil.ajax({
							url,
							data,
							error(){
								s.isdownloading = false;
								s.$Message.error('打包失败');
							},
							success(data){
								s.isdownloading = false;
								if(data.getret === 0){
									//window.location.href = data.zipurl;
	
	
								}
								else if(data.getret === 2001){//文件大小超过限制，请到下载页面下载
									s.showDownloadtip = true;
								}
							}
						})


					}else{

						if(downloadSize>100){
							this.$Message.error('打包文件超过100M 可能会引起压缩超时，请减少打包内容或选择单个下载');
							return;
						}
						s.isdownloading = true;
						s.getviews('downloads',s.$route.params.id ||1,ids);
						symbinUtil.ajax({
							url:window.config.baseUrl+'/wmshare/createzip',
							data:{
								urls:urls.join(','),
								filetitles:filenameList.join(',')
							},
							error(){
								s.isdownloading = false;
								s.$Message.error('打包失败');
							},
							success(data){
								s.isdownloading = false;
								if(data.getret === 0){
									window.location.href = data.zipurl;
	
	
								}
							}
						})
					}

				}else{
					s.downloadImg = status.filepath.replace('uploads//','uploads/');
					if(index === 1){
						//s.downloadImg = window.config.baseUrl+'/wmadvuser/downloadfile?id='+status.id;

					}else if(index === 2){
						s.downloadImg = status.filepath1;
						var data = window.config.downloadConfig[this.$route.params.resourceid||'1'];
						//s.downloadImg = window.config.baseUrl+'/wmadvuser/downloadfile1?p1='+data.p1+"&p2="+data.p2+"&filetitle="+encodeURI(status.filetitle.replace(/\s+/g, ""))+"&newfilename="+status.newfilename+"&fileextname="+status.fileextname;
						s.downloadImg = window.config.baseUrl+'/wmadvuser/download2?downloadfilename='+encodeURI(status.filetitle.replace(/\s+/g, ""))+'.'+status.fileextname+'&fileurl='+status.filepath.replace('uploads//','uploads/');
						//s.downloadImg = status.filepath;
					}
					else if(index === 3){
						if(status.publicadtype === '视频-zmiti'){
							s.downloadImg = 'https://pan.baidu.com/s/13ooNmqnDGgFOAwBHKbo99A';
						}
						else if(status.publicadtype === '音频-zmiti'){
							s.downloadImg = 'https://pan.baidu.com/s/1AlH9vXjva29ofkq5eC-67A';
						}
					}
					
					 s.getviews('downloads',s.$route.params.id ||1,[status.id]);
					 
					 setTimeout(() => {
						 s.$refs['downloadimg'].click();
					 }, 100);
					 return;
					 symbinUtil.ajax({
						url:window.config.baseUrl+'/wmshare/createzip',
						data:{
							urls:status.filepath
						},
						error(){
							s.isdownloading = false;
							s.$Message.error('打包失败');
						},
						success(data){
							s.isdownloading = false;
							if(data.getret === 0){
								window.location.href = data.zipurl;

							}
						}
					})

				}
			
				
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
				this.getReportList();

				
			},

			getviews(key='views',resourceid,ids){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/wmshare/getviews',
					data:{
						resourceid,
						id:ids.join(','),
						field:key
					},
					success(data){
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
			/*测试下载接口*/
			gettestviews(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/wmadvuser/downloadfile',
					type:'get',
					data:{
						/*resourceid,*/
						id:'1913551438'
						
					},
					success(data){
						console.log(data);
					}
				})
			},
			/*测试下载接口结束*/
			 
			getReportList(fn){
				
				var s = this;
				s.showLoading = true;
				s.reportList.length = 0;
				var  p  ={
					resourceid:s.$route.params.resourceid ||1,
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
				if(this.sort !== -1){
					p['sort'] = this.sort;
				}
				//p['isselectall'] = s.selectAll | 0;

				//console.log(p);

				
				var url = window.config.baseUrl+'/wmshare/getthefinallist/',
					type = 'post';

				if(window.config.isRequestLocal){
					url = window.config[p.publicadtype]+"?t="+new Date().getTime();
					type = 'get';
					var data = window.localStorage.getItem(p.publicadtype);
					if(data){
						try{
							var list = JSON.parse(data);
							s.reportList = list;
							s.totalnum = s.reportList.length;
						}catch(e){

						}
					}
				}
				symbinUtil.ajax({
					_this:s,
					url,
					type,
					data:p,
					error(){
						s.showLoading = false;
					},
					success(data){
						s.showLoading = false;

						if(data.getret === 0){
							s.currentPage = 1;
							s.reportList = data.list;
							s.totalnum = window.config.isRequestLocal? data.list.length :data.totalnum.num;

							window.localStorage.setItem(p.publicadtype,JSON.stringify(data.list));

							var ids = [];
							s.reportList.forEach((item)=>{
								item.filepath1 = item.filepath.replace('uploads/','');
								ids.push(item.id);
								item.checked = false;
								s.checkedList.forEach((ls)=>{
									if(ls.id === item.id){
										item.checked = true;
									}
								})
							});

							s.getviews('views',p.resourceid,ids);
						
							///s.selectAll  = false;
							if(s.reportList.length){

								//s.currentReportIndex = 0;

								s.formAdmin = s.reportList[s.currentReportIndex];
								if(!s.formAdmin){
									s.currentReportIndex =  0;
									s.formAdmin = s.reportList[s.currentReportIndex];
								}
								/* if(this.formAdmin && this.formAdmin.userlabel){
									this.formAdmin.tagList = this.formAdmin.userlabel.split(',');
								} */
							}
							fn && fn();
						}
					}
				});
			}
			
		},
		mounted(){
			var key =  this.isUser ?　'login':'adminlogin';
			this.userinfo = symbinUtil.getUserInfo(key);
			this.getReportList(()=>{
				var id = this.$route.params.id;
				if(id){
					var index = -1,
						report = {};
					this.reportList.map((item,i)=>{
						if(item.id === id){
							index = i;
							report = item;
						}
					});
					index > -1 && this.previewReport(index,report,true);
					
				}
			});
			
			window.s = this;


			var t = setInterval(()=>{

				this.configList = Vue.obserable.trigger({
					type:"getFeildList",
					data:this.$route.params.id
				});

				if(this.configList){

					this.configList.forEach((item)=>{
						if(item.fieldname === 'publicadtype'){
							this.menus = item.data;
						}
					});
					clearInterval(t);
				}
			},30)

			


			


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
		top: 4px;
		left: -2px;;
	}
	.ivu-spin-main{
		top: 100px !important;

	}
	.demo-spin-icon-load1 i{
		position: absolute;
		left: 50%;
		top:50%;
		text-indent:0;
		-webkit-transform:translate(-50%,-50%);
		transform:translate(-50%,-50%);
		margin-top: 0 !important;
		font-size:20px;

	}
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

 </style>
 