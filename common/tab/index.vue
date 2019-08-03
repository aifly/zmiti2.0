<template>
	<div class="zmiti-tab-ui lt-full">
		<div class="zmiti-tab-bar" :class="{'hide':hideTab}">
			<div class="zmiti-tab-title">{{title}} </div>
			<slot  name='zmiti-tab-menu'></slot>
			<div class="zmiti-tab-btn" @click='toggleTab'>
				<img style='transform: rotate(180deg)' v-if='hideTab' :src="imgs.open">
				<img v-if='!hideTab' :src="imgs.open">
			</div>
		</div>
		<div class="zmiti-tab-content" :style="{width:width+'px'}">
			<router-view></router-view>
		</div>
	</div>
</template>
<style lang="scss">
	@import './index.scss';
</style>
<script>
	
	export default {
		props:['title','tabs','tabIndex'],
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
			//symbinUtil.clearCookie('login');

		},
		
		methods:{
			toggleTab(){
				this.hideTab = !this.hideTab;
				this.resizeTab();
			},
			resizeTab(){
				this.width = window.innerWidth-(this.hideTab?50:230)
			}
		},
		mounted(){
			this.resizeTab()
			window.addEventListener('resize',()=>{
				this.resizeTab()
			})
		}
	}
</script>
 