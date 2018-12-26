<template>
    <div class="lt-full wm-collection-report-C" v-if='showPreview'>
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
			<div  :class='{"original":showOriginalImg}' v-if='"mp3 mp4 webm aac wma ogg".indexOf(reportList[currentReportIndex].fileextname)<=-1'>
				<img @dblclick.stop="showOriginalImg = !showOriginalImg"  :class="reportList[currentReportIndex].fileextname" :src="reportList[currentReportIndex].pcbilethum||imgs.poster" alt="" />
				<div class="wm-report-detail"  :class="{'hide':showMaskDetail,[reportList[currentReportIndex].fileextname]:1}" >
					<span v-if='"xlsx doc docx pdf dmg txt ppt pptx xls rar html css scss js vb shtml zip m4a".indexOf(reportList[currentReportIndex].fileextname)<=-1 '  @click='showMaskDetail = !showMaskDetail'>{{showMaskDetail?'展开':'收起'}}</span>
					<div  class="wm-myreport-title wm-myreport-field-item" v-for='(item,i) in configList' :key='i' v-if='item.fieldname === "filetitle" || item.fieldname === "filedesc"'>
						<div v-if='item.fieldname === "filetitle" || item.fieldname === "filedesc"'>{{item.name}}：</div>
						<div v-if='item.fieldname === "filetitle" || item.fieldname === "filedesc"' >
							<span>{{reportList[currentReportIndex][item.fieldname]}}</span>
						</div>
					</div>
				</div>
				<div class="wm-report-qrcode" ref='qrcode'>

				</div>
			</div>
			<div v-if='reportList[currentReportIndex].fileextname=== "mp4" ||reportList[currentReportIndex].fileextname=== "webm" '>
				<video autoplay controls :src='reportList[currentReportIndex].filepath'></video>
				<div class="wm-report-detail wm-video-detail" :class="{'hide':showMaskDetail}" >
					<span @click='showMaskDetail = !showMaskDetail'>{{showMaskDetail?'展开':'收起'}}</span>
					<div class="wm-myreport-title wm-myreport-field-item" v-for='(item,i) in configList' :key='i'>
						<div v-if='item.fieldname === "filetitle" || item.fieldname === "filedesc"'>{{item.name}}：</div>
						<div v-if='item.fieldname === "filetitle" || item.fieldname === "filedesc"' >
							<span>{{reportList[currentReportIndex][item.fieldname]}}</span>
						</div>
					</div>
				</div>
			</div>
			<div v-if='reportList[currentReportIndex].fileextname=== "mp3" ||reportList[currentReportIndex].fileextname=== "ogg"||reportList[currentReportIndex].fileextname=== "aac"||reportList[currentReportIndex].fileextname=== "wma" '>
				<audio autoplay controls :src='reportList[currentReportIndex].filepath'></audio>
				<div class="wm-report-detail wm-audio" :class="{'wm-audio':showMaskDetail}"  >
					<div class="wm-myreport-title wm-myreport-field-item" v-for='(item,i) in configList' :key='i'>
						<div v-if='item.fieldname === "filetitle" || item.fieldname === "filedesc"'>{{item.name}}：</div>
						<div v-if='item.fieldname === "filetitle" || item.fieldname === "filedesc"' >
							<span>{{reportList[currentReportIndex][item.fieldname]}}</span>
						</div>
					</div>
				</div>
			</div>

			<section v-if='type*1 === 0' class="wm-report-check-in-mask" :class="{'hide':nextReport}">
				<div>
					<Input placeholder="请输入拒绝的原因(非必填)" :disabled='!!reportList[currentReportIndex].raterid' type="textarea" v-model="reportList[currentReportIndex].remark"/>
					<span v-if='!reportList[currentReportIndex].remark && false' class="wm-collection-placeholder">请输入拒绝的原因(非必填)</span>
				</div>
				<div>
					<div  v-if='!reportList[currentReportIndex].raterid || reportList[currentReportIndex].score === 100' :class='{"pass":reportList[currentReportIndex].score === 100}'  class="wm-report-adopt" @click='checkReportById(reportList[currentReportIndex],1,currentReportIndex)'>
						<span>通过</span>
					</div>
					<div  v-if='!reportList[currentReportIndex].raterid  || reportList[currentReportIndex].score === 0' :class='{"reject":reportList[currentReportIndex].score === 0}'  class="wm-report-reject" @click='checkReportById(reportList[currentReportIndex],2,currentReportIndex)'>
						<span>拒绝</span>
					</div>
				</div>
				
			</section>

            <section v-if='type*1 === 2'  class="wm-reset" @click='checkReportById(reportList[currentReportIndex],1,currentReportIndex)'>
				<img :src="imgs.reset" alt="">
			</section>

			<section class="wm-detail-mask-tip" v-if='"jpg jpeg tiff png gif".indexOf(reportList[currentReportIndex].fileextname)>-1'>双击放大浏览</section>
		</div>
</template>
<script>
	import Vue from 'vue';
	import $ from 'jquery';
	import QRCode from '../../components/lib/qrcode';
	window.$ = window.jQuery  = $;
var printAreaCount = 0;
		$.fn.printArea = function () {
			var ele = this;
			var idPrefix = "printArea_";
			removePrintArea(idPrefix + printAreaCount);
			printAreaCount++;
			var iframeId = idPrefix + printAreaCount;
			var iframeStyle = 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;';
			var iframe = document.createElement('IFRAME');
			$(iframe).attr({
				style: iframeStyle,
				id: iframeId
			});
			document.body.appendChild(iframe);
			var doc = iframe.contentWindow.document;
			$(document).find("link").filter(function () {
				return $(this).attr("rel").toLowerCase() == "stylesheet";
			}).each(function () {
				doc.write('<link type="text/css" rel="stylesheet" href="'
						+ $(this).attr("href") + '" >');
				});
			doc.write('<div class="' + $(ele).attr("class") + '">' + $(ele).html()
					+ '</div>');
			doc.close();
			var frameWindow = iframe.contentWindow;
			frameWindow.close();
			frameWindow.focus();
			frameWindow.print();
		}
		 function removePrintArea(id) {
			$("iframe#" + id).remove();
		};

	export default {
		props:['obserable','nextReport','showMaskDetail','currentType','currentReportIndex','closePreview','reportList','showPreview','type','configList','checkReportById'],
		name:'zmitiindex',
		data(){
			return{
                imgs:window.imgs,
                showOriginalImg:false,
				 
			}
		},
		watch:{
			showPreview(val){
				if(val){
					var s = this;
					if(s.reportList[s.currentReportIndex].publicadtype === "h5-zmiti" &&s.reportList[s.currentReportIndex].previewurl){
						setTimeout(() => {
							new QRCode(this.$refs['qrcode'],{
								height:130,
								width:130,
								text:s.reportList[s.currentReportIndex].previewurl
							})
						}, 100);
					}
				}
			}
		},
		components:{
			 
        },
        mounted() {
          //  console.log(this.type)

            window.ss = this;
            Vue.obserable.on('closeOriginalImg',()=>{
            	this.showOriginalImg = false;
			})
			
			
        },
		 
		methods:{
			printPage(){//打印页面
				$(this.$refs['page']).printArea();
			}
        }
	}
    

</script>

