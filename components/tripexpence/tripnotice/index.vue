<template>
	<div class="zmiti-tripnotice-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'></span>注意事项-{{companyname}}</div>
				<div>
					<Button type="primary" @click='addNotice'>{{btnMsg}}</Button>
				</div>
			</header>
		</div>
		<div class='zmiti-tripnotice-editor'>
			<UE
			:default-msg="formObj.notice" 
			id="editor" 
			:config="editorOption" 
			@contentChanged="contentChange">				
			</UE>
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import UE from '../../../common/ueditor' // 引入组件
	var {tripActions} = zmitiUtil;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				viewH:window.innerHeight,
				editorOption: {
					initialFrameWidth:'100%',
					initialFrameHeight:window.innerHeight-200,
					enableAutoSave:false,
					autoHeightEnabled:false,
					toolbars:[[
					'bold', 'italic', 'underline',  '|',
					'forecolor', 'backcolor', '|',
					'paragraph', 'fontfamily', 'fontsize', 'lineheight', '|',
					'insertorderedlist', 'insertunorderedlist', '|',
					'removeformat', 'blockquote', 'indent', '|',
					'justifyleft', 'justifycenter', 'justifyright', 'justifyjustify', '|',
					'imagenone', 'imageleft', 'imageright', 'imagecenter', '|',
					'inserttable', 'deletetable', 'insertparagraphbeforetable', 'insertrow', 'deleterow', 'insertcol', 'deletecol', '|',
					'source',
					'fullscreen'
					]]
		        },
		        
				companyname:zmitiUtil.getCurrentCompanyId().companyname,
				 
				formObj:{
					 notice:''
				},
		 
				userinfo:{},
				currentProvId: '',
				btnMsg:'保存',
				remarkName:'editNotice',
				actioName:tripActions.editNotice.action	      
			}
		},
		components:{
			UE
		},

		beforeCreate(){
			
		},
		mounted(){

			this.getDataList();
		
			
		},

		watch:{
		 
			
		},
		
		methods:{

			onEditorBlur(){//失去焦点事件
            },
            onEditorFocus(){//获得焦点事件
            },
            onEditorChange(){//内容改变事件
			},
			addNotice(){
				var s = this;
				var productid =  this.$route.params.id;		

				var info  = {
					companyid:zmitiUtil.getCurrentCompanyId().companyid,
					productid,
					notice:this.formObj.notice
				}
				zmitiUtil.ajax({
					remark:s.remarkName,
					data:{
						action:s.actioName,
						info
					},
					success(data){
						s.loading = false;
						if(data.getret === 0){
							s.$Message[data.getret ===0 ?'success':'error'](data.getmsg);
							s.getDataList();
						}
					}
				})	
			},
			getDataList(){
				var s = this;
				s.loading = true;
				var t = setInterval(() => {
					var productid =  this.$route.params.id ;
					if(Vue.productList){
						clearInterval(t);

						if(!productid){

							Vue.productList.forEach(p=>{
								if(s.$route.name.indexOf(p.producturl.substr(1))>-1){
									productid  = p.productid;
								}
							})
							
						}
						this.$router.push({path:'/tripnotice/'+productid});
						var {condition} = this;
						

						var condition = {
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid
						};

						zmitiUtil.ajax({
							remark:"searchNotice",
							data:{
								action:tripActions.searchNotice.action,
								condition:condition
							},
							success(data){
								s.loading = false;
								if(data.getret === 0){
									s.formObj.notice = data.notice;
									s.btnMsg="保存";
									s.remarkName='editNotice';
									s.actioName=tripActions.editNotice.action;
								}else{
									s.btnMsg="新增";
									s.remarkName='addNotice';
									s.actioName=tripActions.addNotice.action;
								}
							}
						})
					}
				}, 100);

				
			},
			contentChange (val) { // 改变父组件数据
		      this.formObj.notice = val
		    }
			 
		}
	}
</script>
 