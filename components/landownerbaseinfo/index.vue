<template>
	<!--地主基本信息页面-->
	<div class="symbin-landownerbaseinfo-ui ">
		<div class="symbin-landownerbaseinfo-title">
			<Row>
		        <Col span="6"><h5>地主基本信息</h5></Col>
		        <Col span="18">
		        	<div class="text-right"><Button type="primary" @click="open">新增</Button></div>
		        </Col>
		    </Row>
		</div>
		<div class="top20"></div>

        <Input v-model="value13">
            <Select v-model="modelcity" slot="prepend" style="width:100px">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
            <Button slot="append" icon="ios-search"></Button>
        </Input>
        <div class="top20"></div>
        <Table ref="selection" height="520" :columns="columns2" :data="rolelistData"></Table>
        <div class="top20"></div>
        <Row>
            <Col span="18">
                <Button @click="handleSelectAll(true)">全部</Button>
                <Button @click="handleSelectAll(false)">反选</Button>
                <Button icon="trash-a">删除</Button>
            </Col>
        </Row>
        
        <div style="margin: 10px 0;overflow: hidden">
            <div style="float: right;">
                <Page :total="100" :current="1" @on-change="changePage"></Page>
            </div>
        </div>

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
			        <FormItem label="年龄">
			            <Input v-model="formItem.age"></Input>
			        </FormItem>
			        <FormItem label="类别">
			            <Input v-model="formItem.type" placeholder="类别"></Input>
			        </FormItem>
	        	</Form>
	        </div>
	    </Modal> 
	</div>

</template>
<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import farmerUtil from '../lib/farmerutil';
	import Vue from 'vue';
	//import symbinTable from './symbintable.vue';
	export default {
		props:[],
		name:'zmitiindex',

		data(){
			return {
				modal1:false,
				value13: '',
                select3: '0',
                selectall:[],
                cityList: [
                    {
                        value: 'beijing',
                        label: '北京'
                    },
                    {
                        value: 'shanghai',
                        label: '上海'
                    },
                    {
                        value: 'tianjing',
                        label: '天津'
                    }
                ],
                modelcity: '',
                formItem:{
                	name:'',
                	age:'',
                	province:'',
                	type:'',
                },
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
                    },
                    {
                        title:'操作',
                        key:'action',
                        width:150,
                        render:(h,params)=>{
                            return h('div',[
                                h('Button',{
                                    props: {
                                        size: 'small'
                                    },
                                    style:{
                                        marginRight:'5px'
                                    },
                                    on:{
                                       click:()=>{
                                            console.log(params.index,'修改')
                                       }
                                    }
                                },'修改'),
                                h('Button',{
                                    props:{
                                        type:'error',
                                        size: 'small'
                                    },
                                    on:{
                                        click:()=>{
                                            console.log(params.index,'删除')
                                        }
                                    }
                                },'删除')
                            ])
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

		},
		methods:{
			open(){
				this.modal1=true;
			},
			ok () {
                this.$Message.info('Clicked ok');
            },
            cancel () {
                this.$Message.info('Clicked cancel');
            },
			add(currentIndex){//增加
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
			handleSelectAll (status) {
                var s= this;
                this.$refs.selection.selectAll(status);
                console.log(status,'selectAll');
                
            },
            changePage (value) {
                return console.log('第'+value+'页');
            }
		},
		mounted(){//页面加载完成后显示

			var obserable = Vue.obserable;

			var id = this.$route.params.id;


			farmerUtil.getColumnByMenuId(id,this);

			 
			
		},
	}
</script>
 