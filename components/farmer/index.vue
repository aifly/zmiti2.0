<template>
	<div class="symbin-farmer-ui lt-full">
		<div>
			<header>
				农夫列表
				<Button size='small' type='primary' @click="addhusbandman">添加农夫</Button>
			</header>
			
		</div>
		<div>
			<Table :columns="columns" :data='husbandmanList'></Table>
		</div>

		<Modal v-model="visible" title="新增管理员" @on-ok="ok" ok-text="确认" cancel-text="取消" @on-cancel="cancel" class-name="adduser-cls" :loading='isLoading'>
			<Form ref="formAdmin" :model="formFarmer" :label-width='72'>
				<FormItem label="手机号码：" prop="usermobile">
					<Input  v-model="formFarmer.usermobile" placeholder="手机号码" autocomplete="off" />
				</FormItem>
				<FormItem label="密码：" prop="userpwd">
					<Input :disabled='currentIndex > -1'  v-model="formFarmer.userpwd" placeholder="密码" autocomplete="off" />
				</FormItem>
				<FormItem label="性别：" prop="sex">
					<RadioGroup v-model="formFarmer.sex">
						<Radio :label="1">
							<span>男</span>
						</Radio>
						<Radio :label="0">
							<span>女</span>
						</Radio>
					</RadioGroup>
				</FormItem>
				<FormItem label="昵称：" prop="nick">
					<Input  v-model="formFarmer.nick" placeholder="昵称" autocomplete="off" />
				</FormItem>
				<FormItem label="真实姓名：" prop="realname">
					<Input  v-model="formFarmer.realname" placeholder="真实姓名" autocomplete="off" />
				</FormItem>
			</Form>
		</Modal>
	</div>

</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import farmerUtil from '../lib/farmerutil';
	//import symbinTable from './symbintable.vue';
	export default {
		props:[],
		name:'zmitiindex',

		data(){
			return {
				isLoading:false,
				husbandmanList:[],
				formFarmer:{},
				visible:false,
				currentIndex:-1,
				columns:[
					{
						title:"农夫名称",
						key:'nick',
						align:'center'
					},
					{
						title:"真实姓名",
						key:'realname',
						align:'center'
					},{
						title:"性别",
						key:'sex',
						align:'center',
						render(h,params){
							return h('div',{},params.row.sex === 1 ? '男':'女')
						}
					},
					{
						title:"手机号",
						key:'usermobile',
						align:'center'
					},
					{
						title:"积分",
						key:'userpoint',
						align:'center'
					},{
						title:'操作',
						key:'',
						align:'center',
						render:(h,params)=>{
							 return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params.row,params.index)
                                        }
                                    }
                                }, '编辑'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗？"
									},
									on:{
										'on-ok':()=>{
											this.remove(params.row,params.index);
										},
										
									}
								},[
									h('Button', {
										props: {
											type: 'error',
											size: 'small',
										},
										on: {
											click: () => {
												
												//this.remove(params.index,params.row.employeeid)
											}
										}
									}, '删除')
								]),
							])
						}
					}
				]

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
		},
		methods:{
			cancel(){},
			addhusbandman(){
				this.currentIndex = -1;
				this.visible = true;
				this.formFarmer = {};
			},
			show(params,index){
				this.currentIndex = index;
				console.log(params)
				this.visible = true;
				this.formFarmer = params;
			},
			remove(params,index){
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+'/admin/delhusbandman/',
					data:{
						husbandmanid:params.husbandmanid
					},
					success(data){
						console.log(data)
						if(data.getret ===  0){
							s.husbandmanList.splice(index,1);
						}
					}
				})
			},
			ok(){

				var s = this;
				if(this.currentIndex<=-1){
					symbinUtil.ajax({
						url:window.config.baseUrl+'/admin/addhusbandman/',
						data:s.formFarmer,
						success(data){
							console.log(data);
							if(data.getret ===0) {
								s.getHusbandmanList();
							}
						}
					})
				}else{
					symbinUtil.ajax({
						url:window.config.baseUrl+'/admin/updatehusbandman/',
						data:s.formFarmer,
						success(data){
							console.log(data);
						}
					})
				}

			},
			getHusbandmanList(){//获取农夫列表
				var s=  this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/gethusbandmanlist",
					data:{

					},
					success(data){
						if(data.getret === 0){
							s.husbandmanList = data.list;
							console.log(data.list);
						}

					}
				})
			}
		},
		mounted(){//页面加载完成后显示
			var id = this.$route.params.id;
			farmerUtil.getColumnByMenuId(id,this);

			this.getHusbandmanList();
			
		},
	}
</script>
 