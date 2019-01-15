<template>
	<div class="zmiti-company-main-ui">
		<div>
			<Tab :menus='menus' title="单位管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content zmiti-scroll">
			<header class="zmiti-tab-header">
				<div>单位管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增单位</Button>
				</div>
			</header>
			<div class='zmiti-company-main  ' :style="{minHeight:viewH - 120+'px' }">
				<div class='zmiti-company-table' :class="{'active':showDetail}">
					<Table :data='companyList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-company-form' v-if='showDetail'>
						<header>
							{{formCompany.projectid?'编辑单位':'新增单位'}}
						</header>
						<Form :model="formCompany" :rules="ruleValidate" label-position="left" :label-width="100">
							<FormItem label="单位名称：" prop='companyname'>
								<Input v-model="formCompany.companyname"></Input>
							</FormItem>
							<FormItem label="工时：" prop='workhours'>
								<Input v-model="formCompany.workhours"></Input>
							</FormItem>
							<FormItem label="说明：">
								<Input type='textarea' v-model="formCompany.remarks"></Input>
							</FormItem>
						</Form>
						
						<div class='zmiti-company-form-item zmiti-company-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='companyAction'>{{formCompany.projectid?'保存':'确定'}}</Button>
						</div>
					</div>
				</transition>


			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	
	import Vue from 'vue';
	import zmitiUtil from '../../lib/util';
	import Tab from '../../../common/tab/index';
	import {zmitiUserMenus} from '../../data/tab';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				visible:false,
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				currentClassId:-1, 
				formCompany:{},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				managerList:[],
				ruleValidate: {
                 
                    projectname: [
                        { required: true, message: '单位名称不能为空', trigger: 'blur' }
                    ]
				},
				
				menus:zmitiUserMenus,
				columns:[
					{
						title:"单位名称",
						key:'companyname',
						align:'center',
						width:240
					},
					{
						title:"剩余工时",
						key:'workhours',
						align:'center'
					},
					{
						title:"说明",
						key:'remarks',
						align:'center',
						render:(h,params)=>{
							return params.row.remarks || '无'
						}
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:200,
						render:(h,params)=>{

							return h('div', [
								 h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
										margin: '2px 5px',
										border:'none',
										background:'#fab82e',
										color:'#fff',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'

                                    },
                                    on: {
                                        click: () => {
											var s = this;
											s.showDetail = true;
											s.formCompany = params.row;
                                        }
                                    }
                                }, '详情'),
                                h('Poptip',{
									props:{
										confirm:true,
										title:"确定要删除吗"
									},
									on:{
										'on-ok':()=>{
											this.delcompany(params.row.companyid);
										},
										
									}
								},[
									h('Button', {
										props: {
											type: 'error',
											size: 'small'
										},
										on: {
											click: () => {
											}
										}
									}, '删除')
								])
                            ]);
							
							 
						}
					}
				],
				
				formCompany:{
				},
				companyList:[],
				 
				directoryList:{

				},
				
				userinfo:{}
			}
		},
		components:{
			Tab
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiUtil.getUserInfo();
			this.getCompanyList();
		},

		watch:{
			
		},
		
		methods:{

			refresh(){

			},

			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formCompany = {
				}
			},


			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},

			delcompany(companyid){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.taskSystemUrl+'admin/delcompany/',
					data:{
						companyid,
					},
					success(data){
						if(data.getret === 0){
							s.getCompanyList();
						}
					}
				})
			},

			getCompanyList(){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.taskSystemUrl+'admin/getcompanylist/',
					data:{
						
					},
					success(data){
						if(data.getret === 0){
							s.companyList = data.list;
						}
					}
				})
				 
				
			},
			companyAction(){
				var s = this;
				var url = window.config.taskSystemUrl+'admin/addcompany';
				var msg = '添加成功';
				var params = {
					companyname:s.formCompany.companyname,
					workhours:s.formCompany.workhours,
					remarks:s.formCompany.remarks,
				};
				if(s.formCompany.companyid){
					url = window.config.taskSystemUrl+'admin/updatecompany';
					params.companyid = s.formCompany.companyid;
					msg = '修改成功';
				}
				zmitiUtil.ajax({
					url,
					data:params,
					success(data){
						if(data.getret === 0){
							s.getCompanyList();
							if(!s.formCompany.companyid){
								s.formCompany = {};
							}
							s.$Message.success(msg);
						}else{
							s.$Message.success(s.formCompany.companyid? '修改失败':'添加失败');
						}
					}
				});	
			},
		}
	}
</script>
 