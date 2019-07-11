<template>
	<div class="zmiti-basicconfig-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div>基础配置</div>
				<div>
					
				</div>
			</header>
			<div :style="{height:viewH - 155+'px',width:'99%',overflow:'auto',margin:'6px auto 0'}" class='zmiti-scroll'>
				<h2 style="height:50px;"></h2>
				<Form class='' :model="formBasicConfig" :label-width="150" style="width:90%;margin:0 auto;">
					<FormItem label="是否OSS上传：">
						<RadioGroup v-model="formBasicConfig.info.is_oss_upload">
							<Radio :value='1' :label="1">OSS上传</Radio>
							<Radio :value='0' :label="0">本地上传</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="上传图片路径：">
						<Input v-model="formBasicConfig.info.file_path" placeholder="上传图片路径：" />
					</FormItem>
						<FormItem label="是否生成缩略图：">
						<RadioGroup v-model="formBasicConfig.info.is_thumb">
							<Radio :value='1' :label="1">是</Radio>
							<Radio :value='0' :label="0">否</Radio>
						</RadioGroup>
					</FormItem>

					
					<FormItem label="缩略图列表：">
						<div style="height:20px"></div>
						<div v-for='(thumb,i) of formBasicConfig.info.thumb_list' :key="i" class='zmiti-thumb-list'>
							<div>
								<div>前缀列表：</div>
								<div class='zmiti-thumb-item'>
									<Input  v-model="thumb.fix" placeholder="前缀名称" />	
								</div>
									
							</div>
							<div>
								<div>宽：</div>
								<Input v-model="thumb.w" placeholder="缩略图宽，默认为800，设置为0时，按>0的进行缩略" />
							</div>
							<div>
								<div>高：</div>
								<Input v-model="thumb.h" placeholder="缩略图高，默认为800，设置为0时，按>0的进行缩略" />
							</div>
							<template>
								<Button @click='thumbItemAction(formBasicConfig.info.thumb_list,"add")' type='primary'>添加</Button>
								<Button @click="thumbItemAction(formBasicConfig.info.thumb_list,'delete')">删除</Button>
							</template>
						</div>
					</FormItem>

				<!--  -->
					

					<FormItem label="文件服务器地址：">
						<Input v-model="formBasicConfig.info.file_server_url" placeholder="文件服务器地址：" />
					</FormItem>
					<FormItem label="OSS服务器地址：">
						<Input v-model="formBasicConfig.info.oss_server_url" placeholder="OSS服务器地址：" />
					</FormItem>
					<FormItem label="是否自定义缩略图：">
						<RadioGroup v-model="formBasicConfig.info.is_thumb_custom">
							<Radio :value='1' :label="1">是</Radio>
							<Radio :value='0' :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="是否审核会员注册：">
						<RadioGroup v-model="formBasicConfig.info.is_user_audit">
							<Radio :value='1' :label="1">是</Radio>
							<Radio :value='0' :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="是否审核单位注册：">
						<RadioGroup v-model="formBasicConfig.info.is_company_audit">
							<Radio :value='1' :label="1">是</Radio>
							<Radio :value='0' :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					
					<FormItem label="设置用户初始密码：">
						<Input v-model="formBasicConfig.info.default_password" placeholder="设置用户初始密码：" />
					</FormItem>

					<FormItem label="是否开启切片上传：">
						<RadioGroup v-model="formBasicConfig.info.is_mergeupfile">
							<Radio :value='1' :label="1">是</Radio>
							<Radio :value='0' :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="是否开启文件上传：">
						<RadioGroup v-model="formBasicConfig.info.is_upfile">
							<Radio :value='1' :label="1">是</Radio>
							<Radio :value='0' :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
					<FormItem label="是否开启裁切图片功能：">
						<RadioGroup v-model="formBasicConfig.info.is_cut">
							<Radio :value='1' :label="1">是</Radio>
							<Radio :value='0' :label="0">否</Radio>
						</RadioGroup>
					</FormItem>
 
					<FormItem label="文件格式列表：">
						<Input v-model="formBasicConfig.info.file_ext_list" placeholder="文件格式列表以“,”分隔 统一小写【zip,rar,doc,docx,xlsx,xls】" />
					</FormItem>
					<FormItem label="最大文件大小：">
						<Input v-model="formBasicConfig.info.file_size_list" placeholder="最大文件大小与文件格式相对应以“,”分隔(字节)" />
					</FormItem>

					<FormItem label="视频文件格式：">
						<Input v-model="formBasicConfig.info.video_ext_list" placeholder="视频文件格式：" />
					</FormItem>
					<FormItem label="最大视频文件大小：">
						<Input v-model="formBasicConfig.info.video_size_list" placeholder="最大视频文件大小,与文件格式相对应：" />
					</FormItem>

					<FormItem label="图片文件格式：">
						<Input v-model="formBasicConfig.info.image_ext_list" placeholder="图片文件格式：" />
					</FormItem>
					<FormItem label="最大图片文件大小：">
						<Input v-model="formBasicConfig.info.image_size_list" placeholder="最大图片文件大小,与文件格式相对应：" />
					</FormItem>
					<FormItem label="音频文件格式：">
						<Input v-model="formBasicConfig.info.audio_ext_list" placeholder="音频文件格式：" />
					</FormItem>
					<FormItem label="最大音频文件大小：">
						<Input v-model="formBasicConfig.info.audio_size_list" placeholder="最大音频文件大小,与文件格式相对应：" />
					</FormItem>


					<div v-for="(list,i) in formBasicConfig.info.oss_list" :key="i">
						<h2 class='zmiti-oss-title' :class="{'active':formBasicConfig.info.oss_selected === i}">第{{i+1}}个OSS配置</h2>
						<FormItem label="索引：">
							<Input v-model="list.idx" placeholder="索引：" />
						</FormItem>
						<FormItem label="存储空间：">
							<Input v-model="list.bucket" placeholder="存储空间：" />
						</FormItem>
							<FormItem label="地域或者数据中心：">
							<Input v-model="list.region" placeholder="地域或者数据中心：" />
						</FormItem>
						<FormItem label="OSS 访问域名：">
							<Input v-model="list.endpoint" placeholder="OSS 访问域名：" />
						</FormItem>
						<FormItem label="oss_accesskeyid：">
							<Input v-model="list.accessKeyId" placeholder="oss_accesskeyid：" />
						</FormItem>
						<FormItem label="访问密钥：">
							<Input v-model="list.accessKeySecret" placeholder="访问密钥：" />
						</FormItem>
						<FormItem label="是否启用：">
							<div class='zmiti-oss-used' :class="{'active':formBasicConfig.info.oss_selected === i}" @click="setOssStatus(i)"></div>
						</FormItem>
						<FormItem label="">
							<Button @click='serverAction(formBasicConfig.info.oss_list,"add")' type='primary'>添加</Button>
							<Button @click="serverAction(formBasicConfig.info.oss_list,'delete')" :disabled='formBasicConfig.info.oss_list.length<=1'>删除</Button>
						</FormItem>
					</div>


					<FormItem label="">
						<Button @click="save" type="primary">保存</Button>
					</FormItem>
				</Form>
			</div>
		</div>
		
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<style >
	.ivu-input{
		width: 98% ;
	}
</style>

<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	var companyActions = zmitiUtil.adminActions;
	var companyActions = zmitiUtil.companyActions;
	var basicConfigActions = zmitiUtil.basicConfigActions;
	
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				tabIndex:[0,-1],
				showAvatarModal:false,
				visible:false,
				formBasicConfig:{
					info:{
						is_oss_upload:1,
						file_path:'',
						oss_selected:0,
						thumb_list:[{
							fix:'',
							w:0,
							height:0
						}],
						oss_list:{
							
						}
					},
					is_thumb_custom:1,
					is_cut:1,
					is_user_audit:0,
					is_upfile:1,
					is_mergeupfile:1,
					video_ext_list:'',
					is_company_audit:0,
					default_password:window.config.defaultPass,
					thumb_list:[{
						fix:[],
						w:0,
						height:0
					}]
				},
				imgs:window.imgs,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{}
			}
		},
		components:{
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getAdminUserInfo();
			this.getBasicConfig();
		},

		watch:{
			showDetail(val){
				if(val){
					this.showDetailPage = true;
				}else{
					setTimeout(() => {
						this.showDetailPage = false;
					}, 310);
				}
			}
			
		},
		
		methods:{

			setOssStatus(i){
				this.formBasicConfig.info.oss_selected = i;

			},

			thumbItemAction(data,type){
				switch (type) {
					case 'add':

						data.push({
						fix:[],
						w:0,
						height:0
					});
						break;
					case "delete":
						if(data.length>0){
							data.pop();
						}
						break;
					default:
						break;
				}
			},

			serverAction(data,type){
				switch (type) {
					case 'add':
						data.push({
							accessKeyId: '',
							accessKeySecret: '',
							bucket: '',
							endpoint: '',
							idx: '',
							region: '',
						});
						break;
					case 'delete':
					if(data.length>1){
						data.pop();
					}
					break;
					default:
						break;
				}
			},

			thumbAction(data,type){
				switch (type) {
					case 'add':
						if(!data.slice(-1)[0] && data.length){
							this.$Message.error("请先填写前缀");
							return
						}
						data.push('');
						break;
					case 'delete':
					if(data.length>0){
						data.pop();
					}
					break;
					default:
						break;
				}
			},
			
			save(){
				var s = this;
				
				zmitiUtil.adminAjax({
					remark:'updateBasicConfig',
					data:{
						configname:'base_config',
						action:basicConfigActions.updateBasicConfig.action,
						info:s.formBasicConfig.info
					},
					success(data){
						
						s.$Message[data.getret === 0?'success':'error'](data.msg);

					}
				});
			},
			getBasicConfig(){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'getBasicConfig',
					data:{
						action:basicConfigActions.getBasicConfig.action,
						configname:'base_config'
					},
					success(data){
						if(data.getret === 0){
							s.formBasicConfig = data;
							s.formBasicConfig.info.oss_selected = s.formBasicConfig.info.oss_selected || 0;

							
						}
						
					}
				});
			}
			 

		 
		}
	}
</script>
 