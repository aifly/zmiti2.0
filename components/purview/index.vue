<template>
	<div class="symbin-purview-ui">
		<div class="symbin-purview-title">
			<Row>
		        <Col span="6"><h5>权限管理</h5></Col>
		        <Col span="18">
		        	<div class="text-right"><Button type="primary" @click="open">新增权限</Button></div>
		        </Col>
		    </Row>
		</div>
		<Modal
	        v-model="modal1"	       
	        @on-ok="ok"
	        @on-cancel="cancel"
	        width="800">
	        <p slot="header">
	            <span>{{titlemodal}}</span>
	        </p>
			<div class="symbin-purview-addinfo">
				<Form ref="formItem" :model="formItem" :label-width="80">
					<Row>
						<Col span="11">
							<FormItem label="中文名称">
					            <Input v-model="formItem.actionname" placeholder="中文名称"></Input>
					        </FormItem>
						</Col>
						<Col span="1"></Col>
						<Col span="11">
							<FormItem label="英文名称">
					            <Input v-model="formItem.englishname" placeholder="英文名称"></Input>
					        </FormItem>
						</Col>						
					</Row>
					<Row>
						<Col span="11">
						    <FormItem label="上一级">			
					            <Select v-model="formItem.parentactionid" placeholder="请选择父级">
							        <Option v-for="item in parentList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							    </Select>
						    </FormItem>
				        </Col>					    
			        	<Col span="11">
			        		<FormItem label="URL地址">
					            <Input v-model="formItem.actionurl" placeholder="权限url地址"></Input>
					        </FormItem>
					    </Col>
			        </Row>
					<Row>
						<Col span="11">
							<FormItem label="编号">
					            <Input v-model="formItem.actionnumber" placeholder="权限编号"></Input>
					        </FormItem>
						</Col>
						<Col span="11">
					        <FormItem label="权限级别">
					            <Select v-model="formItem.urllevel" placeholder="请选择级别">
							        <Option v-for="item in levelList" :value="item.value" :key="item.value">{{ item.label }}</Option>
							    </Select>
						    </FormItem>
			        	</Col>
					</Row>	
			        <Row>
			        	<Col span="11">
					        <FormItem label="排序">
					            <Input v-model="formItem.sort" placeholder="序号越大位置越靠前"></Input>
					        </FormItem>
			        	</Col>
			        	<Col span="11">
					        <FormItem label="接口权限">
					            <RadioGroup v-model="formItem.isparent">
					                <Radio label="1">是（接口）</Radio>
					                <Radio label="0">否（接口分类名）</Radio>
					            </RadioGroup>
					        </FormItem>
			        	</Col>
			        </Row>
			        <Row>
			        	<Col span="11">					        
					        <FormItem label="关键词">
					            <Input v-model="formItem.keyword" placeholder="关键词"></Input>
					        </FormItem>
			        	</Col>
			        	<Col span="11">
					        <FormItem label="默认权限">
					            <RadioGroup v-model="formItem.isdefaultauth">
					                <Radio label="1">是</Radio>
					                <Radio label="0">否</Radio>
					            </RadioGroup>
					        </FormItem>
			        	</Col>
			        </Row>
			        <Row>
			        	<Col span="11">					        
					        <FormItem label="栏目编号">
					            <Input v-model="formItem.menuid" placeholder="栏目编号"></Input>
					        </FormItem>
			        	</Col>
			        	<Col span="11">
					        <FormItem label="显示位置">
					            <RadioGroup v-model="formItem.showwhere">
					                <Radio label="1">顶部导航</Radio>
					                <Radio label="2">左侧菜单</Radio>
					            </RadioGroup>
					        </FormItem>
			        	</Col>
			        </Row>
			        <FormItem label="备注">
			            <Input v-model="formItem.comment" placeholder="备注"></Input>
			        </FormItem>
		    	</Form>
		    	<p style="text-align:center;">提示：权限级别，用于树型结构中的层级关系,0为第一层,1为第二层</p>
	    	</div>
	    </Modal>
		<div class="top20"></div>
		<Table :columns="columns1" :data="listData"></Table>

	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	//import symbinTable from './symbintable.vue';
	import expandRow from './table-expand.vue';
	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return {
				status:'1',//权限状态,默认为有效
				modal1: false,//默认关闭对话框
				currentIndex:'',//当前数据标识,默认为空
				titlemodal:'新增权限',
				isParents:false,
				levelList:[{
					'value':'0',
					'label':'第一层'
				},{
					'value':'1',
					'label':'第二层'
				}],
				parentList: [{
					'value':'',
					'label':'请选择父级'
				}],
				formItem: {
                    actionname: '',
                    englishname:'',
                    parentactionid:'',
                    actionurl:'',
                    actionnumber:'',
                    urllevel: '0',
                    sort:'',
                    isparent:'1',
                    isdefaultauth:'1',
                    keyword:'',
                    showwhere:'1',
                    menuid:'',
                    comment:'',
                },
				columns1: [
					{
                        type: 'expand',
                        width: 50,
                        render: (h, params) => {
                        	this.sublistData=[];
                        	this.sublistData=params.row.children;//子列表数据
                            return h(expandRow, {
                                props: {
                                    row:params.row,
                                    children:params.row.children,
                                    subcolumns: [{
					                    title: '序号',
					                    key: 'sort',
					                    width:80,
					                },
					                {
					                    title: '权限ID',
					                    key: 'actionid',
					                    width:150,
					                },
					                {
				                    	title:'父级权限ID',
				                    	key:'parentactionid',
				                    	width:150,
				                    },
					                {
					                    title: '中文名',
					                    key: 'actionname',
					                },
					                {
				                        title: '英文名称',
				                        key: 'englishname',
				                        width:120,
				                    },
									{
				                        title: '级别',
				                        key: 'urllevel',
				                        width:80,
				                        align: 'center',
				                    },
				                    {
				                        title: '权限地址',
				                        key: 'actionurl',
				                        width:150,
				                    },
				                    {
				                        title: '状态',
				                        key: 'status',
				                        width:80,
				                        render:(z,text)=>{
				                        	return z('div',[
				                        		z('span',text.row.status==1?'有效':'无效')
				                        	]);
				                        }
				                    },
				                    {
				                        title: '显示位置',
				                        key: 'showwhere',
				                        render:(z,text)=>{
				                        	return z('div',[
				                        		z('span',text.row.showwhere=='1'?'顶部导航':'左侧菜单')
				                        	]);
				                        }
				                    },
				                    {
				                        title: '操作',
				                        key: 'action',
				                        align: 'left',
				                        render:(z,text)=>{
				                            return z('div', [
				                                z('Button', {
				                                    props: {
				                                        type: 'default',
				                                        size: 'small'
				                                    },
				                                    style: {
				                                        marginRight: '5px'
				                                    },
				                                    on: {
				                                        click: () => {
				                                            this.show(text.row.actionid);
				                                            console.log(text.row.actionid,'text.row.actionid');
				                                        }
				                                    }
				                                }, '修改'),
				                                z('Button', {
				                                    props: {
				                                        type: 'success',
				                                        size: 'small'
				                                    },
				                                    style: {
				                                        display:text.row.status==1?'none':'inline',
				                                    },
				                                    on: {
				                                        click: () => {
				                                            this.recovery(text.row.actionid);                                            
				                                        }
				                                    }
				                                }, '恢复'),
				                                z('Button', {
				                                    props: {
				                                        type: 'error',
				                                        size: 'small'
				                                    },
				                                    style: {
				                                        display:text.row.status==1?'inline':'none',
				                                    },
				                                    on: {
				                                        click: () => {
				                                            this.remove(text.row.actionid);
				                                            
				                                        }
				                                    }
				                                }, '删除')
				                            ]);
				                        }
				                    }]
                                }
                            })
                        }
                    },
					{
                        title: '序号',
                        key: 'sort',
                        width:80,
                    },
                    {
                        title: '权限ID',
                        key: 'actionid',
                        width:150,                        
                    },
                    {
                    	title:'父级权限ID',
                    	key:'parentactionid',
                    	width:150,
                    },
                    {
                        title: '中文名称',
                        key: 'actionname',
                        render:(h,params)=>{
                        	return h('div',[
                        		h('a',{
                        			style: {
                                        color: '#2d8cf0'
                                    },
                        			on: {
                                        click: () => {
                                            this.detail(params.index);
                                        }
                                    }
                        		},params.row.actionname)
                        	]);
                        }
                    },
                    {
                        title: '英文名称',
                        key: 'englishname',
                        width:120,
                    },
                    {
                        title: '级别',
                        key: 'urllevel',
                        width:80,
                        align: 'center',
                    },
                    {
                        title: '权限地址',
                        key: 'actionurl',
                        width:150,
                    },                    
                    {
                        title: '状态',
                        key: 'status',
                        width:80,
                        render:(h,params)=>{
                        	return h('div',[
                        		h('span',params.row.status==1?'有效':'无效')
                        	]);
                        }
                    },
                    {
                        title: '显示位置',
                        key: 'showwhere',                       
                        render:(h,params)=>{
                        	return h('div',[
                        		h('span',params.row.showwhere=='1'?'顶部导航':'左侧菜单')
                        	]);
                        }
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'left',
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
                                            this.show(params.row.actionid);
                                            console.log(params.row.actionid,'params.row.actionid');
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'success',
                                        size: 'small'
                                    },
                                    style: {
                                    	marginRight: '5px',
                                        display:params.row.status==1?'none':'inline',
                                    },
                                    on: {
                                        click: () => {
                                            this.recovery(params.row.actionid);                                            
                                        }
                                    }
                                }, '恢复'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        display:params.row.status==1?'none':'inline',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.actionid,1);
                                        }
                                    }
                                }, '彻底删除'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        display:params.row.status==1?'inline':'none',
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.actionid);
                                            
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [],
                sublistData:[]
			}
		},
		components:{
			expandRow
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			add(currentIndex){//增加新权限
				var s = this;
				var formparams={
					actionname: s.formItem.actionname,
                    englishname:s.formItem.englishname,
                    parentactionid:s.formItem.parentactionid,
                    actionurl:s.formItem.actionurl,
                    actionnumber:s.formItem.actionnumber,
                    urllevel:s.formItem.urllevel,
                    sort:s.formItem.sort,
                    isparent:s.formItem.isparent,
                    isdefaultauth:s.formItem.isdefaultauth,
                    keyword:s.formItem.keyword,
                    showwhere:s.formItem.showwhere,
                    menuid:s.formItem.menuid,
                    comment:s.formItem.comment,
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/adduserauthurl",
					validate:s.validateData,
					data:formparams,
					fn(data){
						if(data.getret === 0){
							s.$Message.success(data.getmsg);
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
			open(){//打开新增对话框
				var s = this;
				s.modal1 = true;
				s.titlemodal="新增权限";		
                s.formItem={
                    actionname: '',
                    englishname:'',
                    parentactionid:'',
                    actionurl:'',
                    actionnumber:'',
                    urllevel: '0',
                    sort:'',
                    isparent:'1',
                    isdefaultauth:'1',
                    keyword:'',
                    showwhere:'1',
                    menuid:'',
                    comment:'',
                }
			},
			ok () {
				var s = this;
                if(s.currentIndex!=''){
                	this.edit(s.currentIndex);//保存修改
                }else{
                	this.add();//保存新增
                }
            },
            cancel () {
                this.$Message.info('对话框已关闭');
            },
            custom () {
                this.$Modal.confirm({
                    title: '删除权限',
                    content: '<p>Content of dialog</p><p>Content of dialog</p>',
                    okText: '确定',
                    cancelText: '取消'
                });
            },
            getListData(rak,fn){//获取数据
				var s=this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getauthllist",
					type:'post',
					validate:s.validateData,
					data:{
						q:Date.parse(new Date()),
					},
					fn(data){
						
						if(data.getret===0){
							console.log(data,'data');
							s.parentList=[{
								'value':'',
								'label':'请选择父级'
							}];//父级权限数据
							s.listData=data.list;
							data.list.forEach((value,key)=>{						
								if(value.urllevel==0){
									s.parentList.push({										
										'value':value.actionid,
										'label':value.actionname
									})
								}								
					　　　　});
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
			show(actionid){//打开修改对话框
				var s = this;
				s.modal1=true;	
				s.titlemodal="修改权限";
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/getauthllist",
					validate:s.validateData,
					data:{
						actionid:actionid,
					},
					fn(data){						
						if(data.getret===0){
							console.log(data.list[0],'查看本行数据');
							s.currentIndex=actionid;
							s.formItem={
								actionname:data.list[0].actionname,
								englishname:data.list[0].englishname,
								parentactionid:data.list[0].parentactionid,
								actionurl:data.list[0].actionurl,
								actionnumber:data.list[0].actionnumber,
								urllevel:String(data.list[0].urllevel),
								sort:data.list[0].sort,
								isparent:String(data.list[0].isparent),
								isdefaultauth:String(data.list[0].isdefaultauth),
								keyword:data.list[0].keyword,
								showwhere:String(data.list[0].showwhere),
								menuid:data.list[0].menuid,
								comment:data.list[0].comment
							}
						}
					}
				})
			},
			detail(index){//详情
				var s = this;
				var html='';
				var urllevel,isparent,isdefaultauth,showwhere;
				if(this.listData[index].urllevel=='1'){
					urllevel='第二层'
				}else{
					urllevel='第一层'
				}
				if(this.listData[index].isparent=='1'){
					isparent='接口'
				}else{
					isparent='接口分类名'
				}
				if(this.listData[index].isdefaultauth=='1'){
					isdefaultauth='是'
				}else{
					isdefaultauth='否'
				}
				if(this.listData[index].showwhere=='1'){
					showwhere='顶部导航菜单'
				}else{
					showwhere='左侧菜单'
				}
				html+="<div class=symbin-purview-det>";
				html+=`<label>权限id：</label>${this.listData[index].actionid}`;
				html+=`<br><label>中文名称：</label>${this.listData[index].actionname}`;
				html+=`<br><label>英文名称：</label>${this.listData[index].englishname}`;
				html+=`<br><label>权限父级id：</label>${this.listData[index].parentactionid}`;							
				html+=`<br><label>权限编号：</label>${this.listData[index].actionnumber}`;
				html+=`<br><label>权限级别：</label>${urllevel}`;
				html+=`<br><label>url地址：</label>${this.listData[index].actionurl}`;	
				html+=`<br><label>创建人：</label>${this.listData[index].createuserid}`;
				html+=`<br><label>创建时间：</label>${this.listData[index].createtime}`;
				html+=`<br><label>更新人：</label>${this.listData[index].updatauserid}`;
				html+=`<br><label>更新时间段：</label>${this.listData[index].updatatime}`;
				html+=`<br><label>排序：</label>${this.listData[index].sort}`;
				html+=`<br><label>是否是接口权限：</label>${isparent}`;
				html+=`<br><label>是否默认权限：</label>${isdefaultauth}`;
				html+=`<br><label>显示位置：</label>${showwhere}`;
				html+=`<br><label>关键词：</label>${this.listData[index].keyword}`;
				html+=`<br><label>栏目编号：</label>${this.listData[index].menuid}`;
				html+=`<br><label>状态：</label>${this.listData[index].status}`;
				html+=`<br><label>备注：</label>${this.listData[index].comment}`;
				html+="</div>";
				this.$Modal.success({
                    title: '查看权限',
                    content: html
                })
			},
			edit(actionid){//编辑
				var s = this;
				var formparams={
					actionid:actionid,
					actionname: s.formItem.actionname,
                    englishname:s.formItem.englishname,
                    parentactionid:s.formItem.parentactionid,
                    actionurl:s.formItem.actionurl,
                    actionnumber:s.formItem.actionnumber,
                    urllevel:s.formItem.urllevel,
                    sort:s.formItem.sort,
                    isparent:s.formItem.isparent,
                    isdefaultauth:s.formItem.isdefaultauth,//是否默认权限
                    keyword:s.formItem.keyword,
                    showwhere:s.formItem.showwhere,//权限显示位置
                    menuid:s.formItem.menuid,
                    comment:s.formItem.comment,
				}
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/edituserauthurl",
					validate:s.validateData,
					data:formparams,
					fn(data){
						if(data.getret === 0){
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
			remove(actionids,deltype){//删除
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/deluserauthurl",
					type:'post',
					validate:s.validateData,
					data:{
						actionids:actionids,
						deltype:deltype
					},
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
			recovery(actionids){//恢复
				var s = this;
				symbinUtil.ajax({
					url:window.config.baseUrl+"/admin/recoveryauth",
					type:'post',
					validate:s.validateData,
					data:{
						actionids:actionids,
					},
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
			}
		},
		mounted(){//页面加载完成后显示
			this.getListData();//获取列表
		},
	}
</script>
 