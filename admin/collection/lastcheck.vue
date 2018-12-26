<template>
	<div class="wm-lastcheck-ui lt-full" @click.stop='showCondition = false;showCheckAction = false'>
		
		

		<Split v-model='scale' > 
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
							<div class="wm-collection-check-action wm-collection-check-action-reset" >
								<Checkbox v-model="selectAll">全选</Checkbox>
								<Button type="primary" size='small'  @click.stop='showCheckAction = true'>操作 <Icon type="ios-arrow-up" /></Button>
								<ul v-if='showCheckAction' >
									<li @click.stop="checkAction(1)">
										<Icon type="ios-checkmark-circle-outline" />
										撤销审核
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
						<div>分类：<span @click.stop='searchByClassic("全部")'  :class="{'active':classicType == '全部'}">全部</span> <span @click.stop='searchByClassic(menu)' :class="{'active':classicType == menu}" v-for='(menu,i) in menus' :key="i">{{menu.split('-')[0]}}</span> </div>
					</header>
					<div class="wm-scroll wm-collection-report-list" :style="{height:viewH - 230+'px'}">
						<ul>
							<li @dblclick="previewReport(i)" @click='showDetail(report,i)'  class="wm-collection-report-item" v-for='(report,i) in reportList' :key="i">
								<div :class="{'active':i === currentReportIndex}" class='wm-report-item-bg' >
									<img :src="report.mobilethum||imgs.poster" alt="">
								</div>
								<div class="wm-collection-report-status">
									<img v-if='report.status===1' :src="imgs.pass" alt="">
									<img  v-if='report.status===2' :src="imgs.reject" alt="">
								</div>
								<div class="wm-collection-check"  @click='toggleChecked(i)'>
									<Checkbox v-model="report.checked"></Checkbox>
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
					
					<div v-if='item.fieldname === "userlabel"'>标签：</div>
					<div class="wm-tag-list"  v-if='item.fieldname === "userlabel"'>
						<Tag  :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-if='tag' v-for="(tag,i) in (reportList[currentReportIndex][item.fieldname]||'').split(',')">{{tag}}</Tag>
					</div>

					<section class="wm-tag-list-C" v-if='item.fieldname === "userlabel"'>
						<!-- <div class="wm-userlabel-header">
							<div>标签</div>
							<div><input type="text" placeholder="输入标签名" v-model="detailtag" @keydown.13='addTagByDetail(item)' /></div>
							<div>
								<div class="wm-add-label" @click='addTagByDetail(item)'>

								</div>
							</div>
							
						</div> -->
						<div class="wm-tag-list">
							<Tag  :color="colorList[i]?colorList[i]:colorList[i-formAdmin.tagList.length]" :key='i'  v-if='tag' v-for="(tag,i) in (reportList[currentReportIndex][item.fieldname]||'').split(',')">{{tag}}</Tag>
						</div>
					</section>
				</div>


			</div>
		</Split>
		<Detail :checkReportById='checkReportById' :configList='configList' :type="$route.params.type" :showPreview='showPreview'  :nextReport='nextReport' :showMaskDetail='showMaskDetail' :currentReportIndex='currentReportIndex' :closePreview='closePreview' :reportList='reportList'></Detail>
		<Download :isdownloading='showDownloadtip' :hideDownloadTip="hideDownloadTip"></Download>
	</div>
</template>

<script>
	import './index.css';
	import './lastcheck.css';
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
				fieldname:-1,
				nextReport:false,
				reportList:[],
				showPreview:false,
				showMaskDetail:true,
				mainType:0,
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
				raterReportList:[],
				isdownloading:false,
				checkedList:[]
			}
		},
		components:{
			Detail,
			Download
		},
		watch:{
			selectAll(val){

				this.reportList.forEach((item)=>{
					item.checked = val;
					if(val){
						this.checkedList.push({
							filepath:item.filepath,
							id:item.id
						});
					}
					else{
						this.checkedList.length = 0;
					}
				});
			},
			mainType(val){
				
			}
		},
		methods:{

			toggleChecked(index){
				var isChecked = !this.reportList[index].checked;
				if(isChecked){
					this.checkedList.push({
						id:this.reportList[index].id,
						filepath:this.reportList[index].filepath
					});
				}else{
					this.checkedList.forEach((item,i)=>{
						if(item.id === this.reportList[index].id){
							this.checkedList.splice(i,1);
						}
					});
				}
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

			previewReport(index){//双击预览作品、
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
							if(s.showPreview){
								s.currentReportIndex++;
								s.currentReportIndex %= s.reportList.length;
								s.nextReport = true;
								setTimeout(() => {
									s.nextReport = false;
								}, 400);

							}else{
								s.currentReportIndex++;
								s.currentReportIndex %= s.reportList.length;
							}
						}
					}
				})
			},

			checkAction(status){
				this.showCheckAction = false;
				var s = this;
				if(status === 'download'){
					var urls =  [];
					s.checkedList.map((item)=>{
						urls.push(item.filepath);
					});
					if(!urls.length){
						s.$Message.error('请至少选择一个要下载的作品');
						return;
					}
					s.isdownloading = true;
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
							s.isdownloading = false;
							s.showCheckAction = false;
							if(data.getret === 0){
								window.location.href = data.zipurl;
							}else if(data.getret === 2001){
								s.showDownloadtip = true;
							}
						}
					})
				}else{
					var ids =  [];
					/* s.reportList.map((item)=>{
						if(item.checked){
							ids.push(item.id)
						}
					}); */

					s.checkedList.map((item,i)=>{
						ids.push(item.id);
					})
					if(!ids.length){
						s.$Message.error('请至少选择一个要审核的作品');
						return;
					}
					this.check(status,ids);
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
					status:3,
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
					url:window.config.baseUrl+'/wmadadmin/getresouredetaillist/',
					data:p,
					success(data){
						
						var t = setInterval(()=>{
							var  resourceList = Vue.obserable.trigger({
								type:"getResource",
							});
							if(resourceList){
								clearInterval(t);
								
								if(data.getret === 0){
									s.currentPage = 1;
									s.reportList = data.list;
									s.totalnum = data.totalnum;
									s.reportList.forEach((item)=>{
										item.checked = false;
										s.checkedList.forEach((ls)=>{
											if(ls.id === item.id){
												item.checked = true;
											}
										})
									});
									//s.selectAll = false;
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
			this.getReportList();
			
			window.s = this;

			window.addEventListener("keydown",(e)=>{
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
			},false);
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
 