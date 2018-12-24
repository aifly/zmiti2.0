<template>
	<div class="symbin-goods-ui">
	
		<div class="symbin-goods-title">
	
			<Row>
	
				<Col span="6">
	
				<h5>商品管理</h5>
	
				</Col>
	
				<Col span="18">
	
				<div class="text-right">
	
					<Button type="primary" @click="open">新增</Button>
	
				</div>
	
				</Col>
	
			</Row>
	
		</div>
	
		<div class="top20"></div>
	
		<Table :columns="columns1" :data="listData"></Table>
	
		<Modal v-model="modal1" title="商品管理">
	
			<div class="symbin-goods-addinfo">
	
				<Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="100">
	
					<FormItem label="商品名称" prop="goodsname">
	
						<Input v-model="formItem.goodsname" placeholder="商品分类名称"></Input>
	
					</FormItem>
					<FormItem label="商品分类" prop="sort">
						<Cascader  :data="goodsClassData" v-model='formItem.goodsClass' change-on-select></Cascader>
					</FormItem>
					<FormItem label="商品简介" prop="goodsdesc">
						<Input v-model="formItem.goodsdesc" placeholder="商品简介"></Input>
					</FormItem>
					<FormItem label="商品库存" prop="goodsnumber">
						<Input v-model="formItem.goodsnumber" placeholder="商品库存"></Input>
					</FormItem>
					<FormItem label="商品图片" prop="imagepath">
						<Row type='flex'>
							<Col>
								<img :src="formItem.imagepath" alt="">
							</Col>
							<Col>
								<Button icon='upload'>上传</Button>
								<input type="file" ref='file' @change='upload' name="">
							</Col>
						</Row>
					</FormItem>
					<FormItem label="商品价格" prop="goodsprice">
						<Input v-model="formItem.goodsprice" placeholder="商品价格"></Input>
					</FormItem>

					<FormItem label="商品详情" prop="goodscontent">
						<Input type="textarea" v-model="formItem.goodscontent" placeholder="商品详情"></Input>
					</FormItem>
					<FormItem label="商品生产日期" prop="goodsprice">
						<DatePicker format="yyyy-MM-dd" type="date" v-model="formItem.goodscreatetime" :value="formItem.createtime" placeholder="Select date" style="width:100%;"></DatePicker>
					</FormItem>
					
				</Form>
	
			</div>
	
			<div slot="footer">
	
				<Button type="text" @click="cancel('formItem')">取消</Button>
	
				<Button type="primary" @click="asyncOK('formItem')">确定</Button>
	
			</div>
	
		</Modal>
	
	</div>
</template>
<script>
	import './index.css';
	
	import sysbinVerification from '../lib/verification';
	import $ from 'jquery';
	
	
	import symbinUtil from '../lib/util';
	
	export default {
	
		props: ['obserable'],
	
		name: 'zmitiindex',
	
	
	
		data() {
	
			return {
	
				modal1: true,
				currentIndex:'',
				
				goodsClassData:[
					
				],
	
	
				formItem: {
					sort:1,
					goodsname: '', 
					goodsClass:[],
					goodsdesc:'',
					goodsnumber:'',
					goodscreatetime:'',
					goodscontent:"",
					createtime:'',
					imagepath:""

				},
	
				columns1: [{
	
						title: '编号',
	
						key: 'key'
	
					}, 
					{
	
						title: '商品名称',
	
						key: 'goodsname'
	
					}, 
					{
	
						title: '时间',
	
						key: 'goodscreatetime'
	
					},
	
					{
	
						title: '操作',
	
						key: 'action',
	
						align: 'left',
	
						width: 130,
	
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
	
					title: [{
	
						required: true,
	
						message: '广告标题不能为空',
	
						trigger: 'blur'
	
					}],
	
					adlink: [{
	
							required: true,
	
							message: '广告网址不能为空',
	
							trigger: 'blur'
	
						},
	
						{
	
							type: 'url',
	
							message: '网址格式不正确',
	
							trigger: 'blur',
	
							function() {
	
								console.log('test');
	
							}
	
						}
	
					]
	
				}
	
			}
	
		},
	
		components: {},
	
	
	
		beforeCreate() {
	
			this.validateData = sysbinVerification.validate(this);
	
			//symbinUtil.clearCookie('login');
	
		},
	
		methods: {
			upload(){


				
				var formData = new FormData();
	  		    var s = this;

	  					
			      formData.append('setupfile', this.$refs['file'].files[0]);
			      formData.append('uploadtype', 0);
			     
			      $.ajax({
			        type: "POST",
			        contentType: false,
			        processData: false,
			        url:window.config.baseUrl+'/share/upload_file/',
			        data: formData,
			        error(e){
			        	
			          	setTimeout(()=>{
			          		s.detectionError = '';
			          	},2000)
			          	
			        },
			        success(data){
			        	 console.log(data);
				        if (data.getret === 0) {
				          var url = data.getfileurl[0].datainfourl;
				          s.formItem.imagepath = url;
				          s.formItem.uploadfileid = data.uploadfileid;
				        }else{
				        	
				        	
				        }
			        }
			      });
			},
			getGoodsClassList(){
				var s = this;
				
				symbinUtil.ajax({
					url:window.config.baseUrl + '/admin/getgoodsclasslist/',
					validate: s.validateData,
					success(data){
						if(data.getret === 0){
							
							data.list.forEach((item,i)=>{
								var obj = {
									value:item.goodsclassid,
									label:item.goodsclassname
								};
								 

								s.goodsClassData.push(obj)
							})
						}
						console.log(data);
					}
				})
			},
	
			add() { //增加
	
				var s = this;
	
				var formparams = {
					goodsname: s.formItem.goodsname,
					goodsdesc: s.formItem.goodsdesc,
					goodsprice: s.formItem.goodsprice,
					goodscontent: s.formItem.goodscontent,
					goodsnumber: s.formItem.goodsnumber,
					imagepath: s.formItem.imagepath,
					goodsclassid: s.formItem.goodsClass[0],

					goodscreatetime:s.formItem.goodscreatetime.format('yyyy-MM-dd')
					
				}
				console.log(formparams);
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/addgoods",
	
					type: 'post',
	
					validate: s.validateData,
	
					data: formparams,
	
					fn(data) {
	
						if (data.getret === 0) {
	
							s.$Message.success(data.getmsg);
	
							s.modal1 = false;
	
							s.getListData(); //刷新列表
	
						} else {
	
							s.$Message.error({
	
								content: data.getmsg,
	
								duration: 10
	
							});
	
						}
	
					}
	
				})
	
	
	
			},
	
			open() {
	
				var s = this;
	
				s.modal1 = true;
	
				s.formItem = {
	
					goodsname: '',
	
					date: ''
	
				}
	
				s.currentIndex = '';
	
			},
	
			asyncOK(name) {
	
				var s = this;

				this.$refs[name].validate((valid) => {
				
					if (valid) {
	
						//this.add();                        
					
						if (s.currentIndex != '') {
	
							this.edit(s.currentIndex);
	
						} else {
	
							this.add(); //保存新增
	
						}
	
						this.modal1 = false;
	
	
	
					} else {
	
						this.$Message.error('提交失败!');
	
						this.modal1 = true;
	
	
	
					}
	
				})
	
			},
	
			cancel(name) {
	
				this.modal1 = false;
	
				this.$refs[name].resetFields();
	
			},
	
			show(index) {
	
				var s = this;
	
				s.modal1 = true;

	
				s.currentIndex = s.listData[index].goodsid;
				
				s.formItem = {
					imagepath: s.listData[index].imagepath,
					goodsid: s.listData[index].goodsid,
					goodsname: s.listData[index].goodsname,
					goodsClass:[s.listData[index].goodsclassid],
					goodsdesc:s.listData[index].goodsdesc,
					goodsnumber:s.listData[index].goodsnumber,
					goodsprice:s.listData[index].goodsprice,
					goodscontent:s.listData[index].goodscontent,
					uploadfileid:s.listData[index].uploadfileid,
					goodscreatetime:s.listData[index].goodscreatetime,
				}
			},
	
			change(status) {
	
				this.$Message.info('开关状态：' + status);
	
			},
	
			getListData(rak, fn) { //获取数据
	
				var s = this;

				
	
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/getgoodslist",
	
					type: 'post',
	
					validate: s.validateData,
	
					data: {
						admin: s.validateData.adminusername,
						admintoken: s.validateData.admintoken
					},
	
					fn(data) {
						console.log(data);
						if (data.getret === 0) {
							data.list.forEach((item, i) => {
	
								item.sort = i + 1;
	
							})
							data.list.forEach((item,i)=>{
								item.key = i+1;
							})

							s.listData = data.list;

	
						} else {
	
							s.$Message.error({
	
								content: data.getmsg,
	
								duration: 10
	
							});
	
							if (data.getret === 1300) {
	
								window.location.hash = '/login/'
	
							}
	
						}
	
	
	
					}
	
				})
	
			},
	
			edit(goodsid) { //编辑
	
				var s = this;

				var formparams = {
	
					goodsid: goodsid,
					goodsname: s.formItem.goodsname,
					sort:s.formItem.sort,
					goodsprice:s.formItem.goodsprice,
					goodscontent:s.formItem.goodscontent,
					goodsnumber:s.formItem.goodsnumber,
					goodsdesc:s.formItem.goodsdesc,
					imagepath:s.formItem.imagepath,

				}

				//console.log(formparams);
	
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/editgoods",
					validate: s.validateData,
					data: formparams,
					fn(data) {
						console.log(data,'edit');
						if (data.getret === 0) {
	
							s.$Message.success(data.getmsg);
	
							s.getListData();
	
						} else {
	
							s.$Message.error({
	
								content: data.getmsg,
	
								duration: 5
	
							});
	
						}
	
					}
	
				})
	
			}, 
			remove(goods) { //删除
	
				var goodsids = goods.goodsid;
	
				var s = this;
	
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/delgoods",
	
					type: 'post',
	
					validate: s.validateData,
	
					data: {
						goodsids: goodsids,
						deltype: 1,
					},
	
					fn(data) {
	
						if (data.getret === 0) {
	
							s.$Message.success(data.getmsg);
							s.getListData();
	
						} else {
	
							s.$Message.error({
	
								content: data.getmsg,
	
								duration: 5
	
							});
	
						}
	
					}
	
				})
	
			},
	
	 
	
		},
	
		mounted() { //页面加载完成后显示
	
			this.getListData(); //获取列表
			this.getGoodsClassList();
	
		},
	
	}
</script>
 