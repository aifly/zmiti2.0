<template>
	<div class="zmiti-tab-ui">
		<div class="zmiti-tab-bar" :class="{'hide':hideTab}">
			<div class="zmiti-tab-title">{{title}}</div>
			<ul class="zmiti-tab-menu">
				<li :key="i" @click.stop.prevent='tab1(i,tab.children)' v-for='(tab,i) in tabs' :class='{"active":tabIndex[0] ===i && !tab.children,"level1":tab.children && !tab.status,"open":tab.status }'>
					
					<div v-if='!(tab.children && tab.children.length>0)'><router-link :to="tab.link">{{tab.name}}</router-link></div>
					<div v-else>{{tab.name}}</div>
					<ol :style='{height:(tab.status?tab.children.length*30:0)+"px"}' v-if='tab.children' >
						<li :key="k" @click.stop.prevent='tab2(i,k)' :class="{'active':tabIndex[1]===k}" v-for='(child,k) in tab.children'>
							<div v-if='child.link'><router-link :to="child.link">{{child.name}}</router-link></div>
							<div v-if='!child.link'>{{child.name}}</div>
						</li>
					</ol>
				</li>
			</ul>
			<div class="zmiti-tab-btn" @click='toggleTab'>
				<img style='transform: rotate(180deg)' v-if='hideTab' :src="imgs.open">
				<img v-if='!hideTab' :src="imgs.open">
			</div>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import zmitiUtil from '../lib/util';
	import menus from '../menu';
	export default {
		props:{
			obserable:{
				type:Object
			},
			refresh:{
				type:Function,
			},
			title:{
				type:String
			}
		},
		name:'zmitiindex',
		data(){
			return{
				theme2:"light",
				imgs:window.imgs,
				viewW:document.documentElement.clientWidth,
				hideTab:false,
				width:0,
				tabs:menus,
				tabIndex:[0,-1]
			}
		},
		components:{
		},

		beforeCreate(){
			var validate = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		
		methods:{
			tab1(index,level){

				if(level && level.length){
					this.tabs[index].status = !this.tabs[index].status;
					this.tabs = this.tabs.concat([]);
				}else{
					this.tabIndex = [index,-1]
				}
			},
			tab2(i,k){
				this.tabIndex = [i,k];
			},
			toggleTab(){
				this.hideTab = !this.hideTab;
				this.$emit('refresh',this.hideTab);
				this.resizeTab();
			},
			resizeTab(){
				this.width = window.innerWidth-200-(this.hideTab?0:200);
				
			}
		},
		mounted(){
			this.resizeTab()
			window.addEventListener('resize',()=>{
				this.resizeTab();
			})

			// $(window).on('resize',()=>{
			// 	this.resizeTab()
			// })
		}
	}
</script>
 