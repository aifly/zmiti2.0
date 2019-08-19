<template>
	<div class="zmiti-tripnotice-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'></span>注意事项-{{companyname}}</div>
				<div>
					<Button type="primary" @click='save'>保存</Button>
				</div>
			</header>
		</div>
		<div class='zmiti-tripnotice-editor'>
			<quill-editor 
				v-model="formObj.notice" 
				ref="myQuillEditor" 
				aria-placeholder="123"
				:options="editorOption" 
				@blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
				@change="onEditorChange($event)">
			</quill-editor>
			
		</div>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import VueQuillEditor from 'vue-quill-editor';
	Vue.use(VueQuillEditor);
	import zmitiUtil from '../../../common/lib/util';
	import '../../../common/css/quill.css';

	var {tripActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				editorOption:{
					
				},
				companyname:zmitiUtil.getCurrentCompanyId().companyname,
				 
				formObj:{
					 notice:''
				},
		 
				userinfo:{},
				currentProvId: '',
       		      
			}
		},
		components:{
			//'quill-editor':VueQuillEditor
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
			save(){

			},
			addNotice(){
				var productid =  this.$route.params.id ;
			

				var info  = {
					companyid:zmitiUtil.getCurrentCompanyId().companyid,
					productid,
					notice:"<h1>1234</h1>"
				}

				zmitiUtil.ajax({
					remark:"addNotice",
					data:{
						action:tripActions.addNotice.action,
						info
					},
					success(data){
						s.loading = false;
						if(data.getret === 0){
							s.total = data.total;
							s.dataSource = data.list;
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
									
								}
							}
						})
					}
				}, 100);

				
			},

			 
		}
	}
</script>
 