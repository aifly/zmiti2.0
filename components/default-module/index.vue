<template>
	<div class="symbin-column-ui "><!--注意每次页面需要修改此样式文件名，CSS文件也一样-->
		<div class="symbin-admin-count">
			<div class="symbin-console-title">
				<Row>
					<Col span="6">
						<h5>角色管理</h5>
					</Col>
					<Col span="12" offset="6" class-name="text-rig">
						<Button type="primary" @click="addColumn=true">创建新角色</Button>
						<Button @click="bingAgain();"><Icon type="loop"></Icon>刷新</Button>
					</Col>
				</Row>
			</div>
			<div class="symbin-console-view">
				<div class="search-username top20">
				</div>
			</div>
		</div>
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

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);

		},
		methods:{
			
		},
		mounted(){//页面加载完成后显示

			var obserable = Vue.obserable;
			
		},
	}
</script>
 