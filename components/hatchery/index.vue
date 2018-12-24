<template>
	<div class="symbin-hatchery-ui">
	
		<div class="symbin-hatchery-title">
	
			<Row>
	
				<Col span="6">
	
				<h5>孵化场管理</h5>
	
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
	
		<Modal v-model="modal1" title="广告">
	
			<div class="symbin-hatchery-addinfo">
	
				<Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
	
					<FormItem label="孵化场名称" prop="hatcheryname">
	
						<Input v-model="formItem.hatcheryname" placeholder="孵化场名称"></Input>
	
					</FormItem>
					<FormItem label="孵化场所在地" prop="hatcheryname">
						<Cascader  :data="addressData" v-model='formItem.city' change-on-select></Cascader>
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
	
	
	
	import symbinUtil from '../lib/util';
	
	export default {
	
		props: ['obserable'],
	
		name: 'zmitiindex',
	
	
	
		data() {
	
			return {
	
				modal1: false,
				currentIndex:'',
				city:[],
				addressData:[
					{
						label:'当前级',
						value:'',

					}	
				],
	
	
				formItem: {
					city:[],
					hatcheryname: '', 
				},
	
				columns1: [{
	
						title: '编号',
	
						key: 'hatcheryid'
	
					}, 
					{
	
						title: '孵化场名称',
	
						key: 'hatcheryname'
	
					}, 
					{
	
						title: '时间',
	
						key: 'createtime'
	
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
			
			getCityList(){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl + '/share/getcitylist/',
					validate: s.validateData,
					success(data){
						if(data.getret === 0){
							console.log(data.list[0])
							data.list.forEach((item,i)=>{
								var obj = {
									value:item.cityid,
									label:item.name
								};
								if(item.children){
									obj.children = obj.children ||  [];
									item.children.forEach((child,k)=>{
										obj.children.push({
											value:child.cityid,
											label:child.name
										})
									})
								}

								s.addressData.push(obj)
							})
						}
						console.log(data);
					}
				})
			},
	
			add() { //增加
	
				var s = this;
	
				var formparams = {
					hatcheryname: s.formItem.hatcheryname,
				}
	
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/addhatchery",
	
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
	
					hatcheryname: '',
	
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

	
				s.currentIndex = s.listData[index].hatcheryid;
				
				s.formItem = {
					hatcheryid: s.listData[index].hatcheryid,
					hatcheryname: s.listData[index].hatcheryname,
					provinceid:s.listData[index].provinceid,
					city:[s.listData[index].provinceid,s.listData[index].cityid]
				}
	
			},
	
			change(status) {
	
				this.$Message.info('开关状态：' + status);
	
			},
	
			getListData(rak, fn) { //获取数据
	
				var s = this;

				this.getCityList();
	
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/gethatcherylist",
	
					type: 'post',
	
					validate: s.validateData,
	
					data: {
	
						admin: s.validateData.adminusername,
	
						admintoken: s.validateData.admintoken
	
					},
	
					fn(data) {
	
						if (data.getret === 0) {
	
	
							data.list.forEach((item, i) => {
	
								item.sort = i + 1;
	
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
	
			edit(hatcheryid) { //编辑
	
				var s = this;

				var formparams = {
	
					hatcheryid: hatcheryid,
					provinceid:s.formItem.city[0],
					cityid:s.formItem.city[1],
					hatcheryname: s.formItem.hatcheryname,
	
				}
	
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/edithatchery",
					validate: s.validateData,
					data: formparams,
	
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
			remove(hatchery) { //删除
	
				var hatcheryids = hatchery.hatcheryid;
	
				var s = this;
	
				symbinUtil.ajax({
	
					url: window.config.baseUrl + "/admin/delhatchery",
	
					type: 'post',
	
					validate: s.validateData,
	
					data: {
						hatcheryids: hatcheryids,
						deltype: 1,
					},
	
					fn(data) {
	
						if (data.getret === 0) {
	
							s.$Message.success(data.getmsg);
	
							alert(data.getmsg);
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
			
	
		},
	
	}
</script>
 