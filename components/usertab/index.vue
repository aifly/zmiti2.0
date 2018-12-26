<template>
	<ul class="wm-tab-list">
		<li :class="{'active':$route.name === 'user'}"><router-link to='/user'><Icon type="person"></Icon>账户资料</router-link></li>
		<li v-if='userinfo.isselect !== 0' :class="{'active':$route.name === 'score'}"><router-link to='/score'><Icon type="person"></Icon>我的得分</router-link></li>
		<li v-if='!userinfo.isadmin' :class="{'active':$route.name === 'history'}"><router-link to='/history'><Icon type="person"></Icon>历史评分</router-link></li>
	</ul>
</template>

<script>
	import './index.css';
	import $ from 'jquery';
	import symbinUtil from '../lib/util'
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				index:0,
				userinfo:{}
			}
		},
		components:{
		},
		
		methods:{
			

		},
		mounted(){ 
			this.userinfo = symbinUtil.getUserInfo();
		}
	}
</script>
 