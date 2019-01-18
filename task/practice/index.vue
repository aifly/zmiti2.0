<template>
	<div class="zmiti-tab-content zmiti-practice-box">
		<header class="zmiti-practice-header">
			<div>练习</div>
			<div>
				<Button type="primary" @click="addShow">新增项目</button>
			</div>
		</header>
		<div class="zmiti-practice-cont">
			<div class="zmiti-table" :class="{'active':showDetail}">
				<Table :data="practiceList" :columns="columns"></Table>
			</div>
			
			<div class="zmiti-add" v-if="showDetail">
				<header>新增项目</header>
				<form>
					<div class="zmiti-add-form">
						<label class="zmiti-add-name">项目名称:</label>
						<div class="zmiti-practice-input"><input type="text" /></div>
					</div>
					<div class="zmiti-add-form">
						<label>说明:</label>
						<div class="zmiti-practice-input"><textarea></textarea></div>
					</div>
					<div class="zmiti-btn">
						<Button @click="refresh">返回</Button>
						<Button type="primary">确定</Button>
					</div>
				</form>
			</div>
			
		</div>
		<div>
			
		</div>
	</div>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../../common/lib/util';
	export default {
		data () {
			return {
				showDetail:false,
				columns:[
					{
						title:"单位名称",
						key:'companyName',
						align:'center',
						width:240
					},
					{
						title:"负责人账号",
						key:'username',
						align:'center'
						
					},{
						title:"用戶总数",
						key:'totalUserNum',
						align:'center'
						
					},{
						title:"到期时间",
						key:'expirDate',
						align:'center'
						
					},
					{
						title:"空间使用量",
						key:'userSpace',
						align:'center'
						
					},
					{
						title:"操作",
						key:"action",
						align:'center',
						width:200,
						render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        margin: '2px 5px',
										border:'none',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px'
                                    },
                                    on: {
                                        click: () => {
                                            this.visible = true;
											var s = this;
											zmitiUtil.ajax({
												url:window.config.baseUrl+'admin/getuserauth',
												data:{
													setuserid:params.row.userid
												},
												success(data){
													s.roleList = data.list;											
												}
											})
                                        }
                                    }
                                }, '权限设置'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                    	 margin: '2px 5px',
										border:'none',
										padding: '3px 7px 2px',
										fontSize: '12px',
										borderRadius: '3px',
                                    	background:'#fab82e'
                                    },
                                    on: {
                                        click: () => {
                                            alert(1)
                                        }
                                    }
                                }, '详情'),
                                h('Poptip', {
                                    props: {
                                    	confirm:true,
                                        title: '是否要删除？'
                                        
                                    },
                                    on: {
                                        'on-ok': () => {
                                        	this.delmanager(params.row.managerid);
                                        }
                                    }
                                }, [
                                	h('Button',{
                                		props:{
                                			type:'error',
                                			size:'small'
                                		},
                                		on: {
                                			click: ()=>{
                                				
                                			}
                                		}
                                	},'删除')
                                ])
                            ]);
                        }
					}
				],
				practiceList:[]
			}
		},
		
		mounted(){
			this.getManagertypeList()
		},
		methods:{
			getManagertypeList(){
				var s = this;
				zmitiUtil.ajax({
					url:window.config.baseUrl+'user/get_userlist/',
					data:{
						setusertypesign:2//1，个人帐号；2，公司帐号(包含公司管员)；3，系统管理帐号4，超级管理员
					},
					success(data){
						if(data.getret === 0){
							s.practiceList = data.userlist;
						}
					}
				})
			},
			addShow:function(){
				this.showDetail = true
			},
			refresh:function(){
				this.showDetail = false
			}
		}
			
	}
</script>