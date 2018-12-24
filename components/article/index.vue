<template>
	<div class="symbin-article-ui">
		<div class="symbin-article-title">
			<Row>
		        <Col span="6"><h5>广告管理</h5></Col>
		        <Col span="18">
		        	<div class="text-right"><Button type="primary" @click="open">新增</Button></div>
		        </Col>
		    </Row>
		</div>
		<div class="top20"></div>
		<Table :columns="columns1" :data="listData"></Table>
		<Modal
	        v-model="modal1"
	        title="广告">
	        <div class="symbin-article-addinfo">
	        	<Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
					<FormItem label="标题" prop="title">
			            <Input v-model="formItem.title" placeholder="标题"></Input>
			        </FormItem>
			        <FormItem label="内容">
			            <Input v-model="formItem.content" type="textarea" :rows="4" placeholder="内容"></Input>
			        </FormItem>
			        <FormItem label="图片">
			        	<Row type='flex'>
			        		<Col span="15">
								<img  v-if='formItem.adimageurl' :src="formItem.adimageurl" alt="">
							</Col>
			        		<Col span="3" class='symbin-upload-C'>
							    <Button type="ghost" icon="ios-cloud-upload-outline">上传图片</Button>
							    <input @change='upload' type="file" name="" ref='file'>
			        		</Col>			            
			        	</Row>
			        </FormItem>			        
			        <FormItem label="类型">
						<div>
							<RadioGroup v-model="formItem.adtype">					        
							<Radio label="0"><span>图片广告</span></Radio>
							<Radio label="1"><span>图文广告</span></Radio>
							<Radio label="2"><span>文字广告</span></Radio>
							</RadioGroup>
						</div>
			        </FormItem>
			        <FormItem label="位置">
			            <div>
							<RadioGroup v-model="formItem.adlocation">					        
							<Radio label="0"><span>全部页面</span></Radio>
							<Radio label="1"><span>首页</span></Radio>
							</RadioGroup>
						</div>
			        </FormItem>

			        <FormItem label="网址" prop="adlink">
                        <Input v-model="formItem.adlink" placeholder="网址"></Input>
			        </FormItem>
			        <FormItem label="状态">
			           <div>
			           	<RadioGroup v-model="formItem.status">					        
					        <Radio label="1"><span>开</span></Radio>
					        <Radio label="0"><span>关</span></Radio>
					    </RadioGroup>
			           </div>
			        </FormItem>
			        <FormItem label="序号">
                        <Input v-model="formItem.sort" placeholder="序号"></Input>
			        </FormItem>
	        	</Form>
	        </div>
	        <div slot="footer">
	            <Button type="text" @click="cancel('formItem')">取消</Button><Button type="primary" @click="asyncOK('formItem')" >确定</Button>
	        </div>
	    </Modal>	    
	</div>	
</template>
<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	import $ from 'jquery';
	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return {
				modal1: false,		
				currentIndex:'',
                select1: 'http',
				formItem:{
					title:'',
					content:'',
					adimageurl:'',
					adtype:'0',
					adlocation:'0',
					adlink:'',
					status:'1',
					sort:0
				},
				columns1: [
					{
                        title: '序号',
                        key: 'sort'
                    },
                    {
                        title: '标题',
                        key: 'title'
                    },
                    {
                        title: '图片',
                        key: 'adimageurl',
                        render:(h,params)=>{
                        	return h('div',[                      		
                        		h('img',{                        			                  		
	                    			attrs:{
	                    				'src':params.row.adimageurl
	                    			},
	                    			style:{
                        				width:'100px',
                        				height:'30px'
                        			}                       		
                        		})
                        	])
                        }
                    },
                    {
                        title: '类型',
                        key: 'adtype',
                        render:(h,params)=>{
                        	if(params.row.adtype==0){                    			
                    			return h('span','图片广告');
                    		}else if(params.row.adtype==1){
                    			return h('span','图文广告');
                    		}else{
                    			return h('span','文字广告');
                    		}                        	
                        }
                    },
                    {
                        title: '位置',
                        key: 'adlocation',
                        render:(h,params)=>{
                        	if(params.row.adlocation==0){                    			
                    			return h('span','全部页面');
                    		}else{
                    			return h('span','首页');
                    		}                        	
                        }
                    },
                    
                    {
                        title: '网址',
                        key: 'adlink'
                    },                    
                    {
                        title: '状态',
                        key: 'status',
                        render:(h,params)=>{                        	
                        	return h('Icon',{
                        		props:{
                        			type:params.row.status==1?'checkmark-circled':'minus-circled'
                        		},
                        		style:{
                        			fontSize:'20px',
                        			color:params.row.status==1?'#19be6b':'#ed3f14'
                        		}
                        	})
                        }
                    },
                    {
                        title: '时间',
                        key: 'createtime'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'left',
                        width:130,
                        render: (h, params) => {
                        	return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'default',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        	this.show(params.index);
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                        	this.remove(params.row);
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [],
                ruleValidate: {
                    title: [
                        { required: true, message: '广告标题不能为空', trigger: 'blur' }
                    ],
                    adlink: [
                        { required: true, message: '广告网址不能为空', trigger: 'blur' },
                        { type: 'url', message: '网址格式不正确', trigger: 'blur',function(){
                        	console.log('test');
                        } }
                    ]
                }
			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');
		},
		methods:{
			add(currentIndex){//增加
				var s = this;
				var formparams={
					title: s.formItem.title,
                    content:s.formItem.content,
                    adlink:s.formItem.adlink,
                    adtype:s.formItem.adtype,
                    adlocation:s.formItem.adlocation,
                    adimageurl:s.formItem.adimageurl,
                    sort:s.formItem.sort,
                    status:s.formItem.status
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/addadver",
					type:'post',
					validate:s.validateData,
					data:formparams,
					fn(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
							s.modal1 = false;
							s.getListData();//刷新列表
						}
						else{
							s.$Message.error({
								content:data.getmsg,
								duration: 10
							});
						}
					}
				})				

			},
			open(){
				var s = this;
				s.modal1=true;
				s.formItem={
                    title: '',
                    content:'',
                    adimageurl:'',
                    adtype: '0',
                    adlocation:'0',
                    adlink:'',                        
                    status: '1',
                    date: ''
                }		
				s.currentIndex='';
			},
			asyncOK (name) {
				var s = this;
                this.$refs[name].validate((valid) => {                    
                    if (valid) {
                        //this.add();                        
		                if(s.currentIndex!=''){
		                	this.edit(s.currentIndex);
		                }else{
		                	this.add();//保存新增
		                }
                        this.modal1=false;
                        
                    } else {
                        this.$Message.error('提交失败!');                        
                        this.modal1 = true; 
                                             
                    }
                })
            },
            cancel (name) {
            	this.modal1=false;            
                this.$refs[name].resetFields();
            },
            show(index){
            	var s = this;
            	s.modal1=true;
            	s.currentIndex=s.listData[index].adid;            	
            	s.formItem={
            		adid:s.listData[index].adid,
            		title:s.listData[index].title,
            		content:s.listData[index].content,
            		adimageurl:s.listData[index].adimageurl,
            		adtype:String(s.listData[index].adtype),
            		adlocation:String(s.listData[index].adlocation),
            		adlink:s.listData[index].adlink,
            		status:String(s.listData[index].status),
            		sort:s.listData[index].sort
            	}
            },
            change (status) {
                this.$Message.info('开关状态：' + status);
            },
            getListData(rak,fn){//获取数据
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getadverlist",				
					type:'post',
					validate:s.validateData,
					data:{
						admin:s.validateData.adminusername,
						admintoken:s.validateData.admintoken
					},
					fn(data){						
						if(data.getret===0){
							//console.log(data,'data');
							s.listData=data.list;
						}
						else{
							 s.$Message.error({
							  	content:data.getmsg,
							  	duration: 10
							  });
							 if(data.getret === 1300){
							 	window.location.hash = '/login/'
							 }
						}
						
					}
				})
			},
			edit(adid){//编辑
				var s = this;
				var formparams={
					adid:adid,
					title: s.formItem.title,
					content: s.formItem.content,
					adlink: s.formItem.adlink,
					adtype: s.formItem.adtype,
					adlocation: s.formItem.adlocation,
					adimageurl: s.formItem.adimageurl,
					sort: s.formItem.sort,
					status: s.formItem.status
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/editadver",
					type:'post',
					validate:s.validateData,
					data:formparams,
					fn(data){						
						if(data.getret===0){
							s.$Message.success(data.getmsg);
							s.getListData();
						}
						else{
							s.$Message.error({
								content:data.getmsg,
								duration: 5
							});
						}						
					}
				})
			},
			deleteImg(filepath){//删除广告对应的图片
				var s = this;
				alert('开始删除' + filepath);
				symbinUtil.ajax({
					url:window.config.baseUrl+'/admin/deletefile',
					validate:s.validateData,
					data:{
						filepath
					},
					error(){
						
					},
					success(data){
						console.log(data);
					}
				})
			},
			remove(ad){//删除
				var adids = ad.adid;
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/deladver",
					type:'post',
					validate:s.validateData,
					data:{
						adids:adids,
						deltype:1,
					},
					fn(data){						
						if(data.getret===0){

							s.$Message.success(data.getmsg);
							alert(data.getmsg);
							s.deleteImg(ad.adimageurl);
							s.getListData();

						}
						else{
							s.$Message.error({
								content:data.getmsg,
								duration: 5
							});
						}						
					}
				})
			}, 
			upload(){

 
				var formData = new FormData();
	  		    var s = this;
	  			if(!this.$refs['file'].files.length){
	  				return;
	  			}
				formData.append('setupfile', this.$refs['file'].files[0]);
				formData.append('uploadtype', 0);
				formData.append('adminusername', s.validateData.adminusername);
				formData.append('admintoken', s.validateData.admintoken);
				
				$.ajax({
					type: "POST",
					contentType: false,
					processData: false,
					url: window.config.baseUrl+'/share/upload_file/',
					data: formData,
					error(e){
						
					},
					success(data){
						window.s = s;
						console.log(data);
						//alert('服务器返回正确');
						if (data.getret === 0) {
							var url = data.getfileurl[0].datainfourl;
							s.formItem.adimageurl = url;
							 
						}else{
							
						}
					}
				});
			}   
		},
		mounted(){//页面加载完成后显示
			this.getListData();//获取列表
		},
	}
</script>
 