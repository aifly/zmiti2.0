<template>
	<div class="symbin-article-ui">
		<div class="symbin-article-title">
			<Row>
		        <Col span="6"><h5>消息管理</h5></Col>
		        <Col span="18">
		        	<div class="text-right"><Button type="primary" @click="open">新增</Button></div>
		        </Col>
		    </Row>
		</div>
		<div class="top20"></div>
		<Table :columns="columns1" :data="listData"></Table>
		<Modal
	        v-model="modal1"
	        title="消息"
	        @on-ok="ok"
	        @on-cancel="cancel">
	        <div class="symbin-article-addinfo">
	        	<Form ref="formItem" :model="formItem" :label-width="80">
					<FormItem label="标题">
			            <Input v-model="formItem.name" placeholder="标题"></Input>
			        </FormItem>			        		        
			        <FormItem label="内容">
			            <Input v-model="formItem.content" type="textarea" :rows="4"></Input>
			        </FormItem>
			        <FormItem label="时间">
			            <Input v-model="formItem.date" placeholder="时间"></Input>
			        </FormItem>
	        	</Form>
	        </div>
	    </Modal>
        <Modal
            v-model="modalperson"
            title="人员列表"
            width="600"
            @on-ok="ok"
            @on-cancel="cancel">
                <Input v-model="value13">
                    <Select v-model="select3" slot="prepend" style="width: 80px">
                        <Option value="0">地主</Option>
                        <Option value="1">农夫</Option>
                    </Select>
                    <Button slot="append" icon="ios-search"></Button>
                </Input>
                <div class="top20"></div>
                <Table ref="selection" height="230" :columns="columns2" :data="rolelistData"></Table>
                <div class="top20"></div>
                <Button @click="handleSelectAll(true)">全部</Button>
                <Button @click="handleSelectAll(false)">反选</Button>
                <div style="margin: 10px;overflow: hidden">
                    <div style="float: right;">
                        <Page :total="100" :current="1" @on-change="changePage"></Page>
                    </div>
                </div>              
        </Modal>
	</div>	
</template>
<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	export default {
		props:['obserable'],
		name:'zmitiindex',

		data(){
			return {
				modal1: false,
                modalperson:false,
                value13: '',
                select3: '0',
                fruit: ['苹果'],
				currentIndex:'',
				formItem:{
					name:'',
				},
				columns1: [
                    {
                        title: '标题',
                        key: 'name'
                    },
                    {
                        title: '时间',
                        key: 'date',
                        width:150,
                    },
                    {
                        title: '操作',
                        key: 'action',
                        align: 'left',
                        width:180,
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
                                            console.log(params.index,'params.index');
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
                                            console.log(params.index,'params.index');
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'info',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.send(params.index);                                      
                                            console.log(params.index,'params.index');
                                        }
                                    }
                                }, '发送')
                            ]);
                        }
                    }
                ],
                listData: [
                    {
                        name: 'Brown',                      
                        content: 'BrownBrownBrownBrown',                        
                        date: '2016-10-03',
                    },
                    {
                        name: 'content',                      
                        content: 'contentcontentcontentcontent',                        
                        date: '2017-10-03',
                    }
                ],
                columns2: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '名称',
                        key: 'name',
                    },
                    {
                        title: '年龄',
                        key: 'age',
                        filters: [
                            {
                                label: '大于25岁',
                                value: 1
                            },
                            {
                                label: '小于25岁',
                                value: 2
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.age > 25;
                            } else if (value === 2) {
                                return row.age < 25;
                            }
                        }
                    },
                    {
                        title:'省级',
                        key:'province',
                        render: (h, params) => {
                            let provincename='';
                            if(params.row.province=='beijing'){                                
                                provincename='北京';
                            }else if(params.row.province=='tianjing'){
                                provincename='天津';
                            }else if(params.row.province=='shanghai'){
                                provincename='上海';
                            }
                            return h('span',provincename);
                        },
                        filters: [
                            {
                                label: '北京',
                                value: 'beijing'
                            },
                            {
                                label: '天津',
                                value: 'tianjing'
                            },
                            {
                                label: '上海',
                                value: 'shanghai'
                            }
                        ],
                        filterMethod (value, row) {
                            return row.province.indexOf(value) > -1;
                        }
                    },
                    {
                        title: '类别',
                        key: 'type',
                        width:150,
                        render:(h,params)=>{
                            return h('span',params.row.type==0?'地主':'农夫');
                        },
                        filters: [
                            {
                                label: '地主',
                                value: 0
                            },
                            {
                                label: '农夫',
                                value: 1
                            }
                        ],
                        filterMultiple: false,
                        filterMethod (value, row) {
                            if (value === 1) {
                                return row.type > 0;
                            } else if (value === 0) {
                                return row.type < 1;
                            }
                        }
                    }
                ],
                rolelistData: [
                    {
                        name: 'Brown',
                        age: 18, 
                        province:'beijing',               
                        type: 0
                    },
                    {
                        name: 'John', 
                        age: 22,
                        province:'beijing',               
                        type: 1
                    },
                    {
                        name: 'Brown',
                        age: 24,
                        province:'shanghai',                 
                        type: 0
                    },
                    {
                        name: 'John',
                        age: 19,
                        province:'beijing',                      
                        type: 1
                    },
                    {
                        name: 'Brown', 
                        age: 32,
                        province:'shanghai',                     
                        type: 0
                    },
                    {
                        name: 'John', 
                        age: 42,
                        province:'beijing',                     
                        type: 1
                    },
                    {
                        name: 'Brown',
                        age: 33,
                        province:'shanghai',                    
                        type: 0
                    },
                    {
                        name: 'John', 
                        age: 38, 
                        province:'shanghai',                    
                        type: 0
                    },
                    {
                        name: 'Brown',
                        age: 45,
                        province:'beijing',                     
                        type: 1
                    },
                    {
                        name: 'John',
                        age: 48,
                        province:'shanghai',                    
                        type: 1
                    },
                    {
                        name: 'Brown',
                        age: 28,
                        province:'beijing',                      
                        type: 1
                    },
                    {
                        name: 'John',
                        age: 31,
                        province:'beijing',                      
                        type: 1
                    },
                    {
                        name: 'Brown', 
                        age: 39, 
                        province:'tianjing',                    
                        type: 0
                    },
                    {
                        name: 'John', 
                        age: 29, 
                        province:'beijing',                    
                        type: 0
                    }
                ]
			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		methods:{
			open(){
				var s = this;
				s.modal1=true;
				s.currentIndex='';
			},
			ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
            show(index){
            	var s = this;
            	s.modal1=true;
            	s.currentIndex=index;
            	s.formItem={
            		name:s.listData[index].name,
            		content:s.listData[index].content,
            		date:s.listData[index].date,
            	}
            },
            send(index){//发送
              var s = this;
              s.modalperson=true;
              console.log('open-personal');  
            },
            handleSelectAll (status) {
                this.$refs.selection.selectAll(status);
            },
            changePage () {
                
            }
		},
		mounted(){//页面加载完成后显示

			
		},
	}
</script>
 