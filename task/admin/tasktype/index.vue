<template>
	<div class="zmiti-tasktype-main-ui">
		<div>
			<Tab :menus='menus' title="任务类型管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content zmiti-scroll">
			<header class="zmiti-tab-header">
				<div>任务类型管理</div>
				<div>
					<Button type="primary" @click="addCourse">新增任务类型</Button>
				</div>
			</header>
			<div class='zmiti-tasktype-main  ' :style="{minHeight:viewH - 120+'px' }">
				<div class='zmiti-tasktype-table' :class="{'active':showDetail}">
					<Table :data='taskTypeList' :columns='columns'></Table>
				</div>
				<transition name='detail'>
					<div class='zmiti-tasktype-form' v-if='showDetail'>
						<header>
							{{formTasktype.typeid?'编辑任务类型':'新增任务类型'}}
						</header>
						<Form :model="formTasktype" :rules="ruleValidate" label-position="left" :label-width="100">
							<FormItem label="所属分类：" prop='fid'>
								<Select v-model='formTasktype.fid'>
									<Option v-for='(type,i) in taskTypeList' :key="i" :value='type.typeid'>
										{{type.name}}
									</Option>
								</Select>
							</FormItem>
							<FormItem label="任务类型名称：" prop='name'>
								<Input v-model="formTasktype.name"></Input>
							</FormItem>
							<FormItem label="任务类型说明：" prop='explain'>
								<Input v-model="formTasktype.explain"></Input>
							</FormItem>
							<FormItem label="工时：" prop='workhours'>
								<Input v-model="formTasktype.workhours"></Input>
							</FormItem>
							<FormItem label="说明：">
								<Input type='textarea' v-model="formTasktype.remarks"></Input>
							</FormItem>
						</Form>
						
						<div class='zmiti-tasktype-form-item zmiti-tasktype-btns'>
							<Button @click='showDetail = false' size ='small' type='default'>返回</Button>
							<Button size ='small' type='primary' @click='companyAction'>{{formTasktype.typeid?'保存':'确定'}}</Button>
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
	import expandRow from './expandRow'

	let cols = [{
				title:"任务类型名称",
				key:'name',
				align:'center',
				width:240
			},
			{
				title:"说明",
				key:'explain',
				align:'center',
				render:(h,params)=>{
					return params.row.remarks || '无'
				}
			},
			];
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
				formTasktype:{},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				managerList:[],
				ruleValidate: {
                 
                    projectname: [
                        { required: true, message: '任务类型名称不能为空', trigger: 'blur' }
                    ]
				},
				
				menus:zmitiUserMenus,
				columns:[
					{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                            return h(expandRow, {
                                props: {
									row: params.row.children,
									col:cols.concat([{title:'操作',
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
											s.formTasktype = params.row;
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
											this.deltasktype(params.row.typeid);
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
						}}])
                                }
                            })
                        }
                    },
					{
						title:"任务类型名称",
						key:'name',
						align:'center',
						width:240
					},
					{
						title:"说明",
						key:'explain',
						align:'center',
						render:(h,params)=>{
							return params.row.remarks || '无'
						}
					},{
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
											s.formTasktype = params.row;
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
											this.deltasktype(params.row.typeid);
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
				
				formTasktype:{
				},
				taskTypeList:[],
				 
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
			this.getTasktype();
		},

		watch:{
			
		},
		
		methods:{

			refresh(){

			},

			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formTasktype = {
				}
			},


			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},

			deltasktype(typeid){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.taskSystemUrl+'admin/deltasktype/',
					data:{
						typeid,
					},
					success(data){
						if(data.getret === 0){
							s.getTasktype();
						}
					}
				})
			},

			getTasktype(){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.taskSystemUrl+'admin/gettasktypelist/',
					data:{
						
					},
					success(data){
						if(data.getret === 0){
							s.taskTypeList = data.list;
						}
					}
				})
				 
				
			},
			companyAction(){
				var s = this;
				var url = window.config.taskSystemUrl+'admin/addtasktype';
				var msg = '添加成功';
				var params = {
					name:s.formTasktype.name,
					fid:s.formTasktype.fid,
					explain:s.formTasktype.explain,
					workhours:s.formTasktype.workhours,
					remarks:s.formTasktype.remarks,
				};
				if(s.formTasktype.typeid){
					url = window.config.taskSystemUrl+'admin/updatetasktype';
					params.typeid = s.formTasktype.typeid;
					msg = '修改成功';
				}
				zmitiUtil.ajax({
					url,
					data:params,
					success(data){
						if(data.getret === 0){
							s.getTasktype();
							if(!s.formTasktype.typeid){
								s.formTasktype = {};
							}
							s.$Message.success(msg);
						}else{
							s.$Message.success(s.formTasktype.typeid? '修改失败':'添加失败');
						}
					}
				});	
			},
		}
	}
</script>
 