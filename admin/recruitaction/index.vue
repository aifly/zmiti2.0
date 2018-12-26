<template>
	<div class="wm-recruitaction-ui lt-full" >
		<header class="wm-recruitaction-header">
			<h1>征集管理</h1>
		</header>
		 <div class="wm-recruitaction-content">
			 <div class="wm-recruitaction-form">
				<div class="wm-recruitaction-progress">
					<div @click='current = 0' :class="{'active':current >= 0}">
						<span>1</span>
					</div>
					<div @click='current = 1' :class="{'active':current >= 1}">
						<span>2</span>
					</div>
				</div>
				<div v-if='current === 0'>
					<h1 class="wm-recruitaction-title">发布新的征集</h1>
					<div class="wm-recruitaction-form-item">
						<label for="">名称：</label><input v-model="formRecruit.resourcecnname" placeholder="请输入征集名称"/>
					</div>
					<div class="wm-recruitaction-form-item">
						<label for="">说明：</label><textarea v-model="formRecruit.resourcedesc"></textarea>
					</div>
					<div class="wm-recruitaction-form-item">
						<label for="">起止时间：</label>
					</div>
					<div class="wm-recruitaction-form-item">
						<label for="">路径：</label>
					</div>
					<div class="wm-recruitaction-form-item">
						<section>允许上传的类型</section>
						<section class="wm-accept-list">
							<Checkbox v-model="item.checked" :checked='item.checked' v-for='(item,i) in accepts' :key="i">{{item.name}}</Checkbox>
						</section>
					</div>
					<div class="wm-recruitaction-next-btn">
						<Button long type='primary' size='large'>下一步</Button>
					</div>
				</div>
				<div v-if='current === 1'>
					<h1  class="wm-recruitaction-title">{{formRecruit.resourcecnname}}</h1>
					<div class="wm-default-field">
						<div v-for='(field,i) in formRecruit.configList.fieldList' :key='i'></div>
					</div>
				</div>
			 </div>
		 </div>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import Vue from "vue";
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				viewH:document.documentElement.clientHeight,
				current:1,
				accepts:window.config.accepts,
				formRecruit:{
					resourcecnname:'',
					resourcedesc:'',
					endtime:'',
					starttime:'',
					dirid:'',
					configList:{
						acceptsList:[

						],
						fieldlist:[
							{
								"name": "编号",
								"type": "text",
								"notnull": 1,
								"default": "",
								"primary":1,
								"fieldtype": "varchar",
								"fieldname": "id",
								"length": 36,
								"loading": 0,
								"edit": 0
							},{
								"name": "名称",
								"type": "text",
								"notnull": 1,
								"default": "",
								"fieldtype": "varchar",
								"fieldname": "name",
								"length": 255,
								"loading": 1,
								"edit": 1
							},
							{
								"name": "说明",
								"type": "textarea",
								"notnull": 0,
								"default": "",
								"fieldtype": "text",
								"fieldname": "desc",
								"loading": 1,
								"edit": 1
							}
						]
					},
					

				}
			}
		},
		components:{
			
		},
		watch:{
			accepts:{
				handler(val){
					window.val = val;
					val.forEach((item)=>{
						item.checked = val[val.length-1].checked;		
					});
					val = val.concat([]);
				},
				deep:true,
			}
		},
		mounted() {
			 
		},
		methods:{

			
		}
	}
</script>
 <style>
	.demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }

 </style>
 