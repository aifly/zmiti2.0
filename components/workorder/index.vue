<template>
	<div class="zmiti-workorder-main-ui lt-full">
		<header class="zmiti-tab-header">
			<div>提交工单</div>
			<div>
			</div>
		</header>

		<div class='zmiti-workorder-choose'>
			<header class='zmiti-workorder-header-bar'>
				{{formWorkOrder.workordertype === -2? '产品':'咨询'}}类工单问题
			</header>
			<template v-if='formWorkOrder.workordertype <= -1 && !formWorkOrder.productid'>
				<ul >
					<li v-for='(type ,i) of workOrderType' :key="i">
						<div class='zmiti-workerorder-type-top'>
							<div>{{type.type}}</div>
							<div><Button @click="chooseOrderType('other',i)">提问</Button></div>
						</div>
						<div>
							{{type.desc}}
						</div>
					</li>
				</ul>
				<header class='zmiti-workorder-header-bar' style='margin-top:30px;'>
					产品类型工单问题
				</header>
				<ul>
					<li v-for='(type ,i) of productionList' :key="i" style="background:#eee">
						<div class='zmiti-workerorder-type-top zmiti-workerorder-type-top1'>
							<div style='margin-right:30px;'>{{type.productname}}</div>
							<div><Button @click="chooseOrderType('product',type)">提问</Button></div>
						</div>
						<div>
							{{type.desc}}
						</div>
					</li>
				</ul>
			</template>
			<Form :rules="ruleValidate"  style="padding-top:20px;width:90%;margin:0 auto;" v-else class='zmiti-add-form-C' :model="formWorkOrder" :label-width="100">
				<FormItem label="问题描述：" prop='content'>
					<Input :rows="4"  type='textarea' v-model="formWorkOrder.content" placeholder="问题描述：" />
				</FormItem>
				<FormItem label="手机号：" prop='usermobile'>
					<Input v-model="formWorkOrder.usermobile" placeholder="手机号：" />
				</FormItem>
				
				<FormItem  label="接收短信时间：">
					 <RadioGroup v-model="formWorkOrder.smstime">
						<Radio :label="0">任意时间</Radio>
						<Radio :label="1">每天9点~18点</Radio>
						<Radio :label="2">从不接收</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="邮箱：" prop='useremail'>
					<Input v-model="formWorkOrder.useremail" placeholder="邮箱：" />
				</FormItem>
				<FormItem  label="附件上传：">
					 <Button icon='md-cloud-upload'>上传</Button>
					 <div class='zmiti-upload-before'></div>	

					 <div class='zmiti-upload-view' >
						 <div class='zmiti-upload-item' v-for='(re,i) in resourceList' :key="i">
							 <img :src="re.filepath" alt="" v-if='re.filepath'>
							 <span class='wm-news-encryptfile-progressbar' v-if='re.process<100'>
								<label>{{re.process}}%</label>
								<span :style="{WebkitTransform:'translate3d('+(re.process-100)+'%,0,0)'}"></span>
							</span>
						 </div>
					 </div>
				</FormItem>
				<FormItem  label="">
					 <Button type='primary' @click="submitWorkOrder">提交</Button>
				</FormItem>
			</Form>
		</div>

	</div>
</template>


<style  scoped>
	@import './index.css';
</style>
<script>
	import zmitiUtil from '../../common/lib/util';
	var userActions = zmitiUtil.userActions;
	import {defaultClass,defaultExtNames} from '../../common/config';
	
	import Vue from 'vue';
	var json = {};
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				currentClassId:-1,
				productionList:[],
				resourceList:[
					
				],
				resourceCondition:{
					page_index:0,
					page_size:15,
					filetype:'图片',
					//classtype:1,
				},
				formWorkOrder:{
					workordertype:-1,
					smstime:2,
				 	productid:'',
				},

				imgs:window.imgs,
				userinfo:{
					username:'一位巨蟹',
					avatar:window.imgs.zmiti1
				},
				ruleValidate: {
					content: [
						{ required: true, message: '问题描述不能为空', trigger: 'blur' }
					],
					usermobile:[
						{ required: true, message: '手机号不能为空', trigger: 'blur' }
					]
				},
				workOrderType:[
					{
						type:'财务类',
						desc:'订单，合同，充值，发票，汇款，等与资金相关问题'
					},{
						type:'会员帐号类',
						desc:'更换用户信息，找回密码，空间，到期时间，用户数等相关'
					},{
						type:'定制服务类',
						desc:'个性化定制，设计，规划及相关服务类问题'
					},{
						type:'产品技术类',
						desc:'现有产品的所有技术相关问题及接口类问题'
					},{
						type:'其它类',
						desc:'您无法判断的所有问题都可以此选择提问'
					}
				]
			
			}
		},
		components:{
		},

		beforeCreate(){
			window.s = this;
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		watch:{
			
		},
		mounted(){
			
			
			this.getProductList();


		},
		
		methods:{
			upload(){
				var {isAdmin,$Message} = this;
				var s = this;  
				var userinfo = zmitiUtil[isAdmin?'getAdminUserInfo':'getUserInfo']();
				var {userid,token} = userinfo.ui;

			
				var formData = {
					userid,
					token,
					fileclassid:s.currentClassId,
					usertype:2,//用户端
					partsize:10*1024*1024,
					//fileobj:document.querySelector('input[type="file"]').files[0],
					companyid:"",
					verify_key:'25c1c1f3597bc5b258bd68be8804576e',
					classtype:defaultClass()[2].id,//个人
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
					fileSizeLimit: 1024*5,
				
					accept:{
						title: 'Images',
						extensions: 'gif,jpg,jpeg,bmp,png,tiff,tif',
						mimeTypes: 'image/*'
					},
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
						fileextname:'gif',
						filepath:'./assets/images/poster.gif'
					})

				});

				uploader.on("error", function (type) {
					if (type == "Q_TYPE_DENIED") {
						//layer.msg("请上传JPG、PNG、GIF、BMP格式文件");
					} else if (type == "Q_EXCEED_SIZE_LIMIT") {
						s.$Modal.error({
							title: '错误提示',
							content: '文件过大（最大5M）'
						});
					}else {
							//layer.msg("上传出错！请检查后重新上传！错误代码"+type);
					}
				});
				// 文件上传过程中创建进度条实时显示。
					var index = -1;
				uploader.on('uploadProgress', function (file, percentage) {
					
					var scale = (percentage * 100|0);
					s.resourceList.forEach((item,i)=>{
						if(item.fileid === file.id){
							index = i;
							item.process = scale ;

							if(scale >=100){
								s.resourceCondition.page_index = 0;//
								setTimeout(() => {
									item.filepath = s.formWorkOrder.attachment;
								}, 100);

							}
						}
					});
					console.log(s.resourceList)
					
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
					}else{
						s.formWorkOrder.attachment =window.config.host+ response.info.filepath;
					}
					
				});

				// 文件上传失败，显示上传出错。
				uploader.on('uploadError', function (file) {
					console.log('error')
					
					s.$Message.error('文件上传超时，请刷新重试');
					
					//$('#' + file.id).find('p.state').text('上传出错');
				});

				// 完成上传完了，成功或者失败，先删除进度条。
				
				uploader.on('uploadComplete', function (file,res) {
				
					/* console.log('uploadComplete',res);
					if(res.getret === 0){
						
					} */

					//
					/* $('#' + file.id).find('.progress').remove();
					$('#' + file.id).find('p.state').text('已上传'); */
				});
				
			},
			chooseOrderType(t,type){
				if(t === 'product'){
					this.formWorkOrder.productid = type.productid;
					this.formWorkOrder.workordertype = -2;
				}else{
					this.formWorkOrder.workordertype = type;
				}

				this.$nextTick(()=>{
					this.upload()
				})
			},
			getProductList(){
				zmitiUtil.getProductList((data)=>{
					if(data.getret  === 0){
						this.productionList = data.list;
					}
				})
			},

			submitWorkOrder(){//提交工单
				if(this.formWorkOrder.workordertype === -2){
					delete this.formWorkOrder.workordertype;
				}
				var {$Message} = this;
				zmitiUtil.ajax({
					remark:'userCommitWorkOrder',
					data:{
						action:userActions.userCommitWorkOrder.action,
						info:this.formWorkOrder
					},
					success(data){
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
						setTimeout(() => {
							window.location.hash = '/workorderlist';
						}, 1000);
					}
				});
			}
			
			
		}
	}
</script>
 

