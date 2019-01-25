<template>
	<div class="zmiti-taskmgruserlist-main-ui">
		<div>
			<Tab :menus='menus' title="人员管理" :refresh='refresh'></Tab>
		</div>
		<div class="zmiti-tab-content">
			<header class="zmiti-tab-header">
				<div>项目列表</div>
			</header>
			<div class='zmiti-taskmgruserlist-main zmiti-scroll ' :style="{height:viewH - 120+'px' }">
				<div class='zmiti-taskmgruserlist-table' :class="{'active':showDetail}">
					<Table :data='managerTypeList' :columns='columns'></Table>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import './userlist.css';
	
	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import zmitiCompanyUtil from '../lib/companyutil';
	import Tab from '../../common/tab/index';
	import {companyAdminMenus} from '../data/tab';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				isLoading:false,
				showDetail:false,
				currentClassId:-1,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				menus:companyAdminMenus,
				formProject:{
				},
				mytaskList:[],
				managerTypeList:[],
				columns:[
					{
						title:"项目名称",
						key:'projectname',
						align:'center',
						width:240
					},
					{
						title:"说明",
						key:'explain',
						align:'center'
					},
					{
						title:'操作',
						key:'action',
						align:'center',
						width:180,
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
											/*s.showDetail = true;
											s.formProject = params.row;
											s.formProject.userid = params.row.companyuserid;
											s.currentClassId = params.row._index;*/											
											window.location.href='.#/taskmgrlist?projectid='+params.row.projectid;
                                        }
                                    }
                                }, '查看任务')
							])
						}
					}
				],
			}
		},
		components:{
			Tab
		},
		beforeCreate(){
		},
		mounted(){
			window.s = this;
			this.userinfo = zmitiCompanyUtil.getUserInfo();			
			this.getprojectList();
		},
		watch:{
			
		},
		
		methods:{
			addCourse(){
				this.showDetail = true;
				this.currentClassId = -1;
				this.formProject = {
					sex:1,
					isover:0,
					usersign:2
				}

				
				console.log(this.formProject,'formProject.sex')
			},
			getprojectList(){
				var s = this;
				zmitiCompanyUtil.ajax({
					url:window.config.taskSystemUrl+'company/getprojectlist/',
					data:{
						
					},
					success(data){
						if(data.getret === 0){
							s.managerTypeList = data.list;
						}
					}
				})
				 
				
			},


			refresh(){
				this.showDetail = false;
				this.currentClassId = -1;
			},
		}
	}
</script>