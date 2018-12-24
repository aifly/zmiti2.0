<template>
	<div class="symbin-tab-ui lt-full">
		<div class="symbin-tab-bar" :class="{'hide':hideTab}">
			<div class="symbin-tab-title">{{title}}</div>
			<slot  name='symbin-tab-menu'></slot>
			<div class="symbin-tab-btn" @click='toggleTab'>
				<img style='transform: rotate(180deg)' v-if='hideTab' :src="imgs.open">
				<img v-if='!hideTab' :src="imgs.open">
			</div>
		</div>
		<div class="symbin-tab-content" :style="{width:width+'px'}">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';

	import $ from 'jquery';

	export default {
		props:['title','tabs','tabIndex'],
		name:'zmitiindex',
		data(){
			return{
				theme2:"light",
				imgs:window.imgs,
				viewW:document.documentElement.clientWidth,
				hideTab:false,
				width:0
			}
		},
		components:{
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		
		methods:{
			toggleTab(){
				this.hideTab = !this.hideTab;
				this.resizeTab();
			},
			resizeTab(){
				this.width = window.innerWidth-200-(this.hideTab?0:200)
			}
		},
		mounted(){
			this.resizeTab()
			$(window).on('resize',()=>{
				this.resizeTab()
			})
		}
	}
</script>
 