<template>
	<div class='zmiti-resourcelist-ui'>
		<header class='zmiti-resourcelist-header'>
			<h3>资料库</h3>
			<div v-if='isDialog'>
				<Icon type="md-close" />
			</div>
			<div v-else>
				<Input />
			</div>
		</header>
		<div class="zmiti-resourcelist-content" :style="{height:viewH - 108+'px'}">
			<div class='zmiti-resource-cate'>
				<div @click="getCateById(item,i)" :class="{'active':currentCateIndex === i}" v-for='(item ,i ) of defaultClass' :key="i">
					<span class='zmt_iconfont' v-html='item.icon'></span>
					<span>{{item.name}}</span>
					<ul v-if='item.cateList' class='zmiti-child-cate'>
						<li @click='getCateByChildId(cate)' :class="{'active':cate.type === childCateId}" v-for='(cate,k) of item.cateList' :key="k">
							{{cate.name}}
						</li>
					</ul>
				</div>

				<section class='zmiti-resource-upload'>
					<Button type='primary'><Icon type="ios-cloud-upload" /> 点击上传资源</Button>
					<input type="file" ref='file' @change='uploadFile' v-if='false' name='fileobj'>
					<div class='zmiti-upload-before'></div>		

					
				</section>
			</div>
			<div class='zmiti-resource-list'>
				<header class='zmiti-resource-header'>
					<div @click="scrollToCate(1)">
						<Icon type="ios-arrow-back" />
					</div>
					<div ref='cate' class='zmiti-resource-cate-list-C'  :style="{width:viewW-440+'px'}">
						<ul :style="{width:100* cateList.length+'px'}">
							<li @click='changeCurrentClass({fileclassid:-1})' :class="{'active':currentClassId === -1}">
								全部
							</li>
							<li @click='changeCurrentClass(item)' :class="{'active':currentClassId === item.fileclassid}" title='双击可编辑分类' @dblclick="showAddCateModal(item)" v-for='(item,i) in cateList' :key="i">
								<span>
									<label v-if='item.isshare===0' class='zmt_iconfont' v-html='"&#xe636;"'></label>
									{{item.classname}}
								</span>
							</li>
						</ul>
					</div>
					<div>
						<span @click="scrollToCate(-1)">
							<Icon type="ios-arrow-forward" />
						</span>
						<span title='添加分类' @click='showAddCateModal(null)'>
							<Icon type="ios-add-circle" />
						</span>
					</div>
				</header>
				<header class='zmiti-resource-header1'>
					<div><Checkbox v-model="selectAll">全选</Checkbox></div>
					<div>

						<Poptip
							confirm
							title="确定要删除吗？"
							@on-ok="delResource">
							<Button type='error' size='small'>删除</Button>
						</Poptip>
						<Button type='primary' size='small' @click="showClipDialog = true;moveType = 1">复制到</Button>
						<Button type='primary' size='small' @click="showClipDialog = true;moveType = 2">剪切到</Button>
						<span style='opacity:0'>1</span>
						<Button v-if='false' type='error' size='small' @click='downloadResource'>下载</Button>
					</div>
				</header>
				
				<div class='zmiti-resource-C zmiti-scroll'>
					<ul>
						<li v-if='resourceList.length<=0' class='zmiti-resouce-nodata'>暂无数据 ^_^</li>
						<li v-for="(resource,i) of resourceList" :key="i" >
							<div class='zmiti-resource-file'  :class="{'active':resource.checked}" >
								 
								<img @click="currentResourceIndex =  i" :class="resource.classList"  v-if='"jpg gif jpeg webp png".indexOf(resource.fileextname)>-1' draggable="false" :src="(resource.custombilethum&&resource.custombilethum[0])||resource.filepath" alt="">
								<span v-else  @click="currentResourceIndex =  i" :data-id='defaultExtNames[resource.fileextname]' v-html='defaultExtNames[resource.fileextname] || defaultExtNames["other"]' class='zmt_iconfont'></span>

								<template  v-if='!resource.isUploading'>
									<Checkbox @on-change='toggleResource(resource)' size='large' v-model='resource.checked' class='zmiti-resource-check'></Checkbox>
									<div class='zmiti-resource-check zmiti-resource-check-icon ' :class="{'active':resource.checked}">
										
									</div>
								</template>
								<div v-if='resource.isUploading' class='zmiti-file-progress'>
									<div>
										<label for="">{{resource.process=== 0 ? '0%' : resource.process}}</label>
									</div>
									<div class='zmiti-progress-bar'>
										<span :style="{transform:'translateX('+(parseInt(resource.process) - 100)+'%)'}"></span>
									</div>
									<div>上传中。。。</div>
								</div>
							</div>
							<div class='zmiti-reource-name zmiti-text-overflow'>文件名：{{resource.filetitle}}</div>
							<div class='zmiti-reource-name zmiti-text-overflow'>大小：{{(resource.filesize*1).toFixed(2)}} {{resource.filesizeunit}}</div>
							<div class='zmiti-reource-name zmiti-text-overflow'>文件格式：{{resource.fileextname}} </div>
							<div class='zmiti-reource-name zmiti-text-overflow'>上传时间：{{formatDate(resource.createdate)}} </div>
						</li>
						
					</ul>
					<Page v-if='showPager' @on-change='changeSize' @on-page-size-change='changeSize' style="margin:20px 0 0 20px;" :total="total" :page-size='resourceCondition.page_size' :current='resourceCondition.page_index+1'  prev-text="上一页" next-text="下一页" />
				</div>

			</div>
			<div></div>
		</div>
		<div class="zmiti-resourcelist-footer" v-if='isDialog'>
			<Button style='width:100px;'>取消</Button>
			<Button style='width:100px;' type='primary'>确定</Button>
		</div>
		<Modal title='添加分类' v-model="showModal"
			@on-ok="addCate"
		
		>
			<Form class='zmiti-add-form-C' :rules="ruleValidate" :model="formResource" :label-width="100">
				<FormItem label="分类名称：" prop='classname'>
					<Input v-model="formResource.classname" placeholder="分类名称：" />
				</FormItem>
				<FormItem label="是否共享：">
					<RadioGroup v-model="formResource.isshare">
						<Radio :value='1' :label="1">否</Radio>
						<Radio :value='0' :label="0">是</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="备注：" prop='content'>
					<Input type='textarea' v-model="formResource.content" placeholder="备注：" />
				</FormItem>
			</Form>
			 <div slot="footer" class='zmiti-addacte-footer'>
				<div>
					 <Poptip
						confirm
						:title="'确定删除此分类吗?'"
						@on-ok="deleteCate"
					>
						<span v-if='formResource.fileclassid'>删除此分类</span>
					</Poptip>
					
				</div>
				<div>
					<Button @click='showModal = false'>取消</Button>
					<Button type='primary' @click="addCate">确定</Button>
				</div>
			</div>
		</Modal>

		<ZmitiMask v-model='currentResourceIndex' @closeMaskPage='closeMaskPage'>
			<div slot='mask-content'>
				<header class='zmiti-add-header'>
					<img @click="closeMaskPage" :src="imgs.back" alt=""  >
					<span>详情</span>
				</header>
				<div class='zmiti-detail-C' v-if='currentResourceIndex >-1'>
					<div class='zmiti-detail-img'>
						<div class='zmiti-deitail-btn' @click="changeResource(-1)"><Icon type="ios-arrow-back" /></div>
						<img v-if='resourceList[currentResourceIndex].filetype === "图片"' draggable="false" :src="(resourceList[currentResourceIndex].custombilethum[0]||resourceList[currentResourceIndex].filepath)" alt="">
						<span v-else>当前格式不支持预览</span>
						
						<div class='zmiti-deitail-btn' @click="changeResource(1)"><Icon type="ios-arrow-forward" /></div>
					</div>

					

					<div class='zmiti-detail-item zmiti-text-overflow'>
						<div>文件名称 ：</div>
						<div>
							<Input v-if='isCanEdit' v-model='resourceList[currentResourceIndex].filetitle' />
							<span v-else>{{resourceList[currentResourceIndex].filetitle}}</span>
						</div>
					</div>

					<div class='zmiti-detail-item zmiti-text-overflow'>
						<div>文件大小 ：</div><div>{{(resourceList[currentResourceIndex].filesize*1).toFixed(2)}} {{resourceList[currentResourceIndex].filesizeunit}}</div>
					</div>
					<div class='zmiti-detail-item zmiti-text-overflow'>
						<div>文件格式 ：</div><div>{{resourceList[currentResourceIndex].fileextname}}</div>
					</div>
					<div class='zmiti-detail-item zmiti-text-overflow'>
						<div>文件地址 ：</div>
						<div>
							<Input disabled v-model= 'resourceList[currentResourceIndex].filepath' />
						</div>
					</div>
					<div class='zmiti-detail-item zmiti-text-overflow'>
						<div>上传时间 ：</div>
						<div>
							{{formatDate(resourceList[currentResourceIndex].createdate)}} 
						</div>
					</div>
					<div class='zmiti-hr'></div>

					<div class='zmiti-detail-item zmiti-text-overflow'>
						<div>标签 ：</div>
						<div>
							<Input placeholder="回车添加标签" :disabled='!isCanEdit' v-model="userlabel" @on-keydown.13='addlabel' />
							<section class='zmiti-tag-list'>
								<div  v-for='(tag,i) in resourceList[currentResourceIndex].userlabel.split(",")' :key="i">
									<Tag v-if='tag' closable color="primary" @on-close='deleteLabel(i)'>
									{{tag}}
									</Tag>
								</div>	 
							</section>
						</div>
						
					</div>
					<div class='zmiti-hr'></div>
					<div class='zmiti-detail-item zmiti-text-overflow'>
						<div>备注 ：</div>
						<div>
							<Input v-if='isCanEdit' type='textarea' v-model='resourceList[currentResourceIndex].filedesc' />
							<span v-else>{{resourceList[currentResourceIndex].filedesc}}</span>
						</div>
					</div>

					<div class='zmiti-detail-submit'>
						<Button @click='editResource' size='large' type='primary'>{{isCanEdit?'保存':'编辑'}}</Button>
						<Button size='large' @click="downloadResource">下载</Button>
					</div>
				</div>
			</div>
		</ZmitiMask>
		<Transfer  :currentType='currentType' :currentClassId='currentClassId' :cateList='cateList'  v-model='showClipDialog' :isAdmin='isAdmin'  @closeClipDialog='closeClipDialog' :moveType='moveType'  :checkedList='checkedList'  v-if='showClipDialog' ></Transfer>
	</div>
</template>
<style lang="scss" scoped>
	@import './index.scss';
</style>
<style lang="scss">
	.zmiti-upload-before{
			position: absolute !important;
			&::before{
				display: none;
			}
			width:100%;
			height:100%;
			left:0;
			top:0;
			
			.webuploader-pick{
				width: 100%;
				height: 40px;
			
			}
			&>div:nth-of-type(2){
				height:100% !important;
				width: 100% !important;
				top:0;
				opacity:0;
			}
			input[type="file"] {	
				position: absolute;
			  top: 0;
			  width: 100%;
			  height: 100%;
			  left: 0;
			  opacity: 1;
			  cursor: pointer;
			}
		}
</style>
<script>
import zmitiUtil from '../lib/util';
import {defaultClass,defaultExtNames} from '../config';
import IScroll from 'iscroll';
import ZmitiMask from '../mask';
import Transfer from '../transfer'

let {resourceActions,formatDate} = zmitiUtil;
export default {
	props:{
		isDialog:{
			type:Boolean,
			default:false
		},
		isAdmin:{
			type:Boolean,
			default:true,
		}
	},
	data(){
		return {
			defaultClass:defaultClass(this.isAdmin? 4 : 3),
			cateList:[
				
			],
			selectAll:false,
			currentType:0,
			menus:[],
			showClipDialog:false,
			moveType:1,
			userlabel:"",
			showMaskPage:true,
			imgs:window.imgs,
			total:0,
			isCanEdit:false,
			formatDate,
			currentResourceIndex:-1,
			checkedList:[],
			defaultExtNames,
			currentClassId:-1,
			showModal:false,
			viewW:window.innerWidth,
			viewH:window.innerHeight,
			showPager:true,

			currentCateId:3,
			currentCateIndex:2,
			formResource:{
				isshare:0
			},
			childCateId:-1,
			ruleValidate:{
				classname:[
					{ required: true, message: '分类名称不能为空', trigger: 'blur' }
				]
			},
			condition:{
				classname:"",
				classtype:0,
				page_index:0,
				page_size:20
			},
			resourceCondition:{
				page_index:0,
				page_size:20,
				filetype:'图片',
				//classtype:1,
			},
			resourceList:[],//资源集合
		}
	},
	components:{
		ZmitiMask,
		Transfer
	},
	mounted() {
		this.init();
		this.upload();

		/* setTimeout(() => {
			this.resourceList.unshift({
				fileid:111,
				filetitle:'aa.txt',
				checked:false,
				process:'90%',
				isUploading:true,
				fileextname:'gif',
				filepath:'./assets/images/poster.gif'
			})
		}, 1000); */


		
		
	},
	watch:{
		selectAll(val){

			var len = this.resourceList.length;
			this.resourceList.forEach((item)=>{
				item.checked = val;
				if(val){
					this.checkedList.push(item);
				}
				else{
					this.checkedList.length = 0;
				}
			});

		},
	},
	methods: {
		closeClipDialog(){
			this.showClipDialog = false;
			this.checkedList = this.checkedList.slice(0,0);
			this.selectAll = false;
			//this.getMyreportList();
		},
		deleteLabel(index){
			var labels = this.resourceList[this.currentResourceIndex].userlabel.split(',');
			labels.splice(index,1);
			
			this.resourceList[this.currentResourceIndex].userlabel = labels.join(',');

			this.editResourceData();

			

		},
		editResourceData(){

			var {isAdmin} = this;
			var s = this;
			
			var {fileid,userlabel,status,filetitle,filedesc} = s.resourceList[s.currentResourceIndex];
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'editResource',
				_ui:{
					type:isAdmin ? 1 : 2,
				},
				data:{
					action:resourceActions.editResource.action,
					info:{
						fileid,
						userlabel,
						filetitle,
						status,
						filedesc,
					}
				},
				success(data){
					//$Message[data.getret === 0 ?　'success':'error'](data.msg);
						console.log(data)
					if(data.getret === 0 ){
						s.userlabel = '';
						s.isCanEdit = false;
					}
					s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
				}
			});
		},
		addlabel(){
			var s = this;
			s.resourceList[s.currentResourceIndex].userlabel += ','+this.userlabel;
			this.editResourceData();

		},

		closeMaskPage(){
			this.currentResourceIndex = -1;
		},

		changeResource(range){
			this.currentResourceIndex += range;

			if(this.currentResourceIndex < 0){
				this.currentResourceIndex = this.resourceList.length -1;
			}

			this.currentResourceIndex %= this.resourceList.length;
		},
		editResource(){
			if(this.isCanEdit){
				this.editResourceData();
			}else{
				this.isCanEdit = true;
			}
		},
		changeSize(e){
			this.resourceCondition.page_index  = e - 1;
			this.getResourceByClassId();
		},
		toggleResource(item){
			if(item.checked){
				this.checkedList.push(item)
			}else{
				this.checkedList.forEach((ck,i)=>{
					if(ck.fileid ===  item.fileid){
						this.checkedList.splice(i,1);
					}
				})
			}
		},
		downloadResource(){
			var  s = this;
			var {fileid} = s.resourceList[s.currentResourceIndex];
			 zmitiUtil.downloadFile(fileid);
		},
		delResource(){
			var {isAdmin,$Message} = this;
			var s = this; 
	
			var condition = Object.assign(this.resourceCondition,{fileclassid:s.currentClassId});

			var fileids = [];
			s.checkedList.forEach(c=>{
				fileids.push(c.fileid);
			});
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'delResource',
				_ui:{
					type:isAdmin ? 1 : 2,
				},
				data:{
					action:resourceActions.delResource.action,
					fileids
				},
				success(data){
					$Message[data.getret === 0 ?　'success':'error'](data.msg);
					if(data.getret === 0 ){

						s.getResourceByClassId();
					}
				}
			});
		},
		init(){
			this.getDefaultCate();
			this.scroll = new IScroll(this.$refs['cate'],{
				scrollX:true,
				mouseWheel:true,
				preventDefault:false,
			});
			this.getResourceByClassId();
		},
		changeCurrentClass(item){
			this.currentClassId = item.fileclassid;
			this.getResourceByClassId();
		},
		getResourceByClassId(){
			var {isAdmin,$Message} = this;
			var s = this; 
			var userinfo = zmitiUtil[isAdmin? 'getAdminUserInfo':'getUserInfo']();
			
			var condition = Object.assign(this.resourceCondition,{
				fileclassid:s.currentClassId,
				filetype:s.filetype,
				userid:userinfo.ui.userid,
				classtype:defaultClass()[this.currentCateIndex].id}); 
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'getResourceList',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:resourceActions.getResourceList.action,
					condition
				},
				success(data){
					//$Message[data.getret === 0 ?　'success':'error'](data.msg);
					if(data.getret === 0 ){
						s.total = data.total;
						s.defaultResourceList = data.list.concat([]);
						var iNow = 0;
						data.list.forEach((list)=>{
							list.filepath = window.config.host + list.filepath;
							
							//list.filepath = s.imgs.deleted;
							for(var i = 0;i<list.custombilethum.length;i++){
								list.custombilethum[i] =  window.config.host  + list.custombilethum[i];
							}

							if(list.filetype === '图片'){
								var img = new Image();
								img.onload = img.onerror = function(e){
									iNow++;
									if(e.type === 'load'){
										list.classList='';
										if(this.width/this.height>1.3){
											list.classList =  'fill_height'
										}
										if(this.width<=150 && this.height <= 150){
											list.classList = ' small '
										}
									}else{
										//list.filepath = s.imgs.deleted;
										list.custombilethum[0] = list.filepath;
									}
									
									if(iNow >= data.list.filter(item=>{item.filetype === '图片'}).length){
										s.resourceList = s.resourceList.concat([]);
									}
								};

								//img.src = list.filepath;
								
								img.src = list.custombilethum[0];
							}
							//list.checked = false;

						})
						s.resourceList = data.list;

						console.log(s.resourceList,'s.resourceList')
						
					}
				}
			});
		},
		deleteCate(){
			var {isAdmin,$Message} = this;
			var s = this;  
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'delResourceCate',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:resourceActions.delResourceCate.action,
					fileclassid:s.formResource.fileclassid
				},
				success(data){
					$Message[data.getret === 0 ?　'success':'error'](data.msg);
					s.showModal = false;
					s.getDefaultCate();
				}
			});
		},
		upload(){
			var {isAdmin,$Message} = this;
			var s = this;  
			var userinfo = zmitiUtil[isAdmin?'getAdminUserInfo':'getUserInfo']();
			
			var {userid,token} = userinfo.ui;

		
			var formData = {
				userid,
				token,
				fileclassid:s.currentClassId,
				usertype:isAdmin?1:2,
				partsize:10*1024*1024,
				//fileobj:document.querySelector('input[type="file"]').files[0],
				companyid:"",
				verify_key:'25c1c1f3597bc5b258bd68be8804576e',
				classtype:defaultClass()[this.currentCateIndex].id,//
				file_token:Math.random().toString(36).substr(2)
			};

			if(s.uploader){
				///s.uploader.destroy();
			}
			var uploader = WebUploader.create({
				auto: true,
				server: 'http://file.zmiti.com/index/upload/upload_file',
				// 选择文件的按钮。可选。
				// 内部根据当前运行是创建，可能是input元素，也可能是flash.
				pick: '.zmiti-upload-before',
				chunkSize:10*1024*1024,
				chunked: true, //开启分片上传
				threads: 1, //上传并发数
				method: 'POST',
				compress:false,
				prepareNextFile:true,//是否允许在文件传输时提前把下一个文件准备好。 对于一个文件的准备工作比较耗时，比如图片压缩，md5序列化。 如果能提前在当前文件传输期处理，可以节省总体耗时。
				formData,
				thumb:{
					
					//height: 110,
					// 图片质量，只有type为`image/jpeg`的时候才有效。
					quality: 100,
					// 是否允许放大，如果想要生成小图的时候不失真，此选项应该设置为false.
					allowMagnify: true,
					// 是否允许裁剪。
					crop: true,
					// 为空的话则保留原有图片格式。
					// 否则强制转换成指定的类型。
					type: 'image/jpeg'
				},
			
				//accept:accepts[s.currentType],
				//dnd:'.wm-myreport-left',
				disableGlobalDnd :true,//是否禁掉整个页面的拖拽功能，如果不禁用，图片拖进来的时候会默认被浏览器打开。
			});

			 
			s.uploader = uploader;

			// 当有文件添加进来的时候

			
			var i = 0;
			var fileIndex = 0;
			
			uploader.on('fileQueued', function (file) {

				i++;
				s.isUpLoading = true;
				s.resourceList.unshift({
					fileid:file.id,
					filetitle:file.name.split('.')[0],
					checked:false,
					process:0,
					isUploading:true,
					fileextname:'gif',
					size:'cover',
					filepath:'./assets/images/poster.gif'
				})

			});
			// 文件上传过程中创建进度条实时显示。
				var index = -1;
			uploader.on('uploadProgress', function (file, percentage) {
				
				var scale = (percentage * 100|0);
				s.resourceList.forEach((item,i)=>{
					if(item.fileid === file.id){
						index = i;
						console.log(percentage);
						item.process = scale + '%';
						if(scale >=100){
							setTimeout(()=>{
								item.isUploading = false;
								s.resourceList.forEach(item=>{
									item.size ='contain'
								});
								s.resourceList = s.resourceList.concat([]);
								s.resourceList.forEach(item=>{
									item.size ='cover';
								})
								s.resourceList = s.resourceList.concat([]);
								s.resourceCondition.page_index = 0;//
								s.getResourceByClassId();
							},1500)
						}
					}
				});
				
			});

			// 文件上传成功，给item添加成功class, 用样式标记上传成功。
			var iNow = 0;
			uploader.on('uploadSuccess', function (file,response) {
				if(response.getret !== 0){
					s.$Modal.error({
						title: '错误提示',
						content: response.msg
					});
					return;
				};
			 

				
			});

			// 文件上传失败，显示上传出错。
			uploader.on('uploadError', function (file) {
				console.log('error')
				s.$Message.error('文件上传超时，请刷新重试');
				
				//$('#' + file.id).find('p.state').text('上传出错');
			});

			// 完成上传完了，成功或者失败，先删除进度条。
			
			uploader.on('uploadComplete', function (file) {
			 
				console.log('uploadComplete');
				//
				/* $('#' + file.id).find('.progress').remove();
				$('#' + file.id).find('p.state').text('已上传'); */
			});
			
		},
		uploadFile(){//开始上传文件
			var {isAdmin,$Message} = this;
			var s = this;  
			var userinfo = zmitiUtil[isAdmin?'getAdminUserInfo':'getUserInfo']();
			
			var {userid,token} = userinfo.ui;

			var formData = new FormData();

			formData.append('userid',userid);
			formData.append('token',token);
			formData.append('fileclassid',s.currentClassId);
			formData.append('usertype',isAdmin?1:2);
			formData.append('fileobj',this.$refs['file'].files[0]);
			formData.append('file_attr_name','fileobj');
			formData.append('companyid','');
			formData.append('verify_key','25c1c1f3597bc5b258bd68be8804576e');

			zmitiUtil.baseUpload({
				data:formData,
				success(data){
					if(data.getret === 0 ){
						s.getResourceByClassId();
					}
					$Message[data.getret === 0 ? 'success':'error'](data.msg);
					
				}
			});
		},
		showAddCateModal(item){
			this.showModal = true;
			
			if(item){
				this.formResource = item;
			}else{
				this.formResource = {
					isshare:0
				};
			}
		},
		getCateByChildId(item){
			this.childCateId = item.type;
			this.showPager = item.name === '全部';

			item.type !== -1 && (this.filetype = item.type);
			this.getResourceByClassId();

			/* this.resourceList = this.defaultResourceList.filter(res=>{
				return item.name === '全部' ? true : res.filetype === item.name;
			}) */
			
		},
		getCateById(item,index){
			this.currentCateId = item.id;
			this.currentCateIndex = index;
			 
		},
		addCate(){
			var {isAdmin,$Message} = this;
			var userinfo = zmitiUtil[isAdmin?'getAdminUserInfo':'getUserInfo']();
			
			var isEdit = this.formResource.fileclassid;
			var s = this;
			if(s.formResource.classname.length>5){
				$Message.error('分类名称最可输入5个字');
				return;
			}
			var info = {
						classname:s.formResource.classname,
						content:s.formResource.content,
						classtype : s.currentCateId,
						userid:userinfo.userid
				};
			if(isEdit){
				info = Object.assign(info,s.formResource);
			}
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:isEdit?'editResourceCate' :'addResourceCate',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:(resourceActions[isEdit?'editResourceCate':'addResourceCate']).action,
					info
				},
				success(data){
					$Message[data.getret === 0 ? 'success':'error'](data.msg);
					s.showModal = false;
					s.getDefaultCate();
				}
			});
		},
		scrollToCate(num){
			var x = this.scroll.x;
			this.scroll.scrollTo(x + 100 * num,0,200);
		},
		getDefaultCate(){//获取默认分类。
			var {isAdmin,condition} = this;
			var s = this;
			var cdn = Object.assign(condition,{userid:zmitiUtil[isAdmin?'getAdminUserInfo':'getUserInfo']().ui.userid});
			zmitiUtil[isAdmin? 'adminAjax':'ajax']({
				remark:'getResourceCateList',
				_ui:{
					type:isAdmin?1:2,
				},
				data:{
					action:resourceActions.getResourceCateList.action,
					condition:cdn
				},
				success(data){
					if(data.getret === 0){
						s.cateList = data.list;
						setTimeout(() => {
							s.scroll.refresh();
						}, 100);
					}
				}
			});
		}
	},
}
</script>

