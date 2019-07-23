<template>
	<div class="wm-clip-main-ui">
			<Modal
			@on-visible-change = 'visibleChange'
			v-model="showClipDialog"
			title="编辑作品信息"
            :loading='showDialog'
			@on-ok="ok"
			width='600'
			@on-cancel="cancel">
			<div class='wm-report-move-C'>
				<div class='wm-report-checked-work-ui'>
					<header>我要{{moveType===1?'复制':'剪切'}}的内容</header>
					<div class='wm-report-checked-work-list' ref='list'>
						<ul>
							<li v-for='(report,i) in myCheckedList' :key="i">
								<div class='wm-report-work-ico'>
									<img :src="report.custombilethum[0]" alt="">
								</div>
								<div class='wm-report-work-name zmiti-text-overflow' :class='{"active":report.isDone}'>
									{{report.filetitle}}
									<Icon :style="{color:report.isDone?'green':'#333'}" class='wm-report-work-staus' :type="report.isDone?'ios-checkmark-circle':'ios-close-circle'" />
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class='wm-report-move-ico'>
					<img :src="imgs.move" alt="">
				</div>
				<div class='wm-report-resource-ui'>
					<header>目标库</header>
					<div class='wm-report-resource-C'>
						<ol>
							<li @click='destinationid = resource.fileclassid' v-for='(resource,i) in cateCacheList' :key="i" :class="{'active':destinationid === resource.fileclassid}">
								<div>
									<span class='zmt_iconfont' v-html='resource.icon'></span>
								</div>
								<div>
									{{resource.classname}}
								</div>
							</li>
						</ol>
					</div>
				</div>
			</div>
		</Modal>

		<Modal v-model="showRepeatModal" width="360" :transfer='false'>

			<p slot="header" style="color:#f60;text-align:center">
				<Icon type="ios-information-circle"></Icon>
				<span>替换或者跳过</span>
			</p>
			<div style="text-align:center" v-if='havefile.length'>
				<div>目录中 {{havefile[0].filetitle}}文件同名</div>
				<Button class='wm-repeat-action-btn' icon='md-checkmark-circle' long @click='replace' >替换</Button>
				<Button icon='md-return-left' long @click="skip">跳过</Button>
			</div>
			<div slot="footer" class='wm-repeat-footer'>
				<div>
					<Checkbox v-model='isSelectAll'>全部都按此方式执行</Checkbox>
				</div>
				<div>
				</div>
			</div>
		</Modal>
	</div>
</template>

<script>
	import zmitiUtil from '../lib/util';
	var {resourceActions} = zmitiUtil;
	import Vue from 'vue';
	import IScroll from 'iscroll';
	import './index.css';
	import {defaultClass} from '../config';
	export default {
		props:['obserable','moveType','checkedList','sourceid','id','isAdmin','input','currentClassId','cateList'],
		name:'zmitiindex',
		data(){
			return{
                imgs:window.imgs,
                showClipDialog:true,
				destinationid:-1,
				myCheckedList:[],
				userinfo:{},
				cateCacheList:[],
				WmColors:['#ff0','#0f0','#f90'],
				showRepeatModal:false,
				destinationList:[],
				showDialog:true,
				repeatList:[],//复制的时候，有重复的数据列表。
				unRepeatList:[],
				isSelectAll:false,
				havefile:[],
				
			}
		},
		components:{
		},

		beforeCreate(){
			window.s = this;
			//var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

			///this.validate = validate;
		},
		watch:{

			havefile:{
				deep:true,
				handler(val){
					if(!val.length){
						this.showRepeatModal = false;
					}
				}
			},

			showClipDialog:{
                immediate: true,
				handler(val){
					if(val){

                       
					}
				}
			},

			showContextMenu(val){
				if(!val){
					this.curentReport  = {};
				}
			},
			 
		
		},
		
		mounted(){
			
			this.userinfo = zmitiUtil[this.isAdmin?'getAdminUserInfo':'getUserInfo']();
			this.myCheckedList = this.checkedList;
			this.scroll = new IScroll(this.$refs['list'],{
				scrollbars:true,
				mouseWheel:true
			});


			this.cateCacheList = this.cateList.filter(item=>{
				return item.fileclassid !== this.currentClassId;
			})

			this.destinationid = this.cateList[0].fileclassid;
			setTimeout(() => {
				this.scroll.refresh();
			}, 100);
		},
		
		methods:{

			skip(){//跳过
				this.operatorType = 0;//跳过
				if(this.isSelectAll){
					this.havefile = this.havefile.slice(0,0);
					this.showRepeatModal = false;
					this.$emit('input',false);
					this.checkedList = [];
				}else{
					this.havefile.shift();

					if(this.havefile.length<=0){
						this.showRepeatModal = false;
						this.$emit('input',false);
						this.checkedList = [];
					}else{
						this.showRepeatModal = false;
						setTimeout(() => {
							this.showRepeatModal = true;
						}, 500);
					}
				}
			},
			replace(){
				this.operatorType = 1;//替换
				
				if(this.isSelectAll){
					var fileid = this.havefile;
					this.operasourcedata(fileid,true);	
					this.showRepeatModal = false;			
				}else{
					var fileid = [this.havefile.shift()];
					if(this.havefile.length){
						this.operasourcedata(fileid);
						this.showRepeatModal = false;
						setTimeout(()=>{
							this.showRepeatModal = true;
						},500)
					}else{
						this.operasourcedata(fileid,true);
					}
				}

				


			},

			getResource(){
				
			},

			visibleChange(val){
				if(!val){
					//this.$emit('update:transferShow',false);
					this.$emit('input',false);
				}
			},

			getReportList(fn){
				var util = {
					
				}

				return;
				
				var url = window.config.baseUrl+"/wmadvuser/getmyreportdata";
				if(this.isAdmin){
					url = window.config.baseUrl+'/wmadadmin/getresouredetaillist/'
				}
				
                
			},


			operasourcedata(checkedList,isDone=false){

				var ids = [];

				
				if(s.destinationid<=-1){
					s.$Message.error('请先选择一个要复制的目标库');
					s.showDialog = false;
					return;
				}
                
               	checkedList.map((item)=>{
                    ids.push(item.id);
				});
				
				if(!ids.length){
					s.$Message.error('请选择一个要复制的资源');
					s.showDialog = false;
					return;
				}

				return;
			},

            ok(){
				var s = this;
				var copy_fileclassid = s.destinationid;
				var fileids = [];
				s.checkedList.forEach(c=>{
					fileids.push(c.fileid);
				});
				var isClip = this.moveType === 2;
				zmitiUtil[this.isAdmin?'adminAjax':"ajax"]({
					remark:isClip ? "fileClip":"fileCopy",
					_ui:{
						type:s.isAdmin ?1:2
					},
					data:{
						action:resourceActions[isClip ? "fileClip":"fileCopy"]['action'],
						fileids,
						copy_fileclassid
					},
					success(data){
						s.visibleChange();	
						s.showDialog = false;
						$Message[data.getret === 0 ?　'success':'error'](data.msg);
					}
				})
            },
            cancel(){

            }
		}
	}
</script>
 

