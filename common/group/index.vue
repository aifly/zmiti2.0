<template>
	<div class="sysbin-group-ui">
		<Tab :title='menuObj.title' :tabs='tabs' :tabIndex='tabIndex'>
			<div slot='zmiti-tab-menu'>
				<ul class="symbin-tab-menu">
					<li @mouseover='mouseover' @mouseout='mouseout' :key="i" @click.stop.prevent='tab1(i,tab.children)' v-for='(tab,i) in tabs' :class='{"active": !tab.children && (tab.link.substring(1) === $route.name && !tab.children),"level1":tab.children && !tab.status,"open":tab.status || (tab.children && tab.children.some(child => { return  child.link.substring(1) ===$route.name} )) }'>
						<div v-if='!(tab.children && tab.children.length>0)'>
							<router-link  :to="tab.link">{{tab.name}}</router-link>
						</div>
						<div v-if='tab.children && tab.children.length>0'>
							{{tab.name}}
						</div>
						<ol :style='{height:(tab.status?tab.children.length*50:0)+"px"}' v-if='tab.children' >
							<li @mouseover='mouseover' @mouseout='mouseout' :key="k" @click.stop.prevent='tab2(i,k)' :class="{'active':($route.name === child.link.substring(1))}" v-for='(child,k) in tab.children'>
								<div v-if='child.link'><router-link :to="child.link">{{child.name}}</router-link></div>
								<div v-if='!child.link'>{{child.name}}</div>
							</li>
						</ol>
					</li>
				</ul>
			</div>

		</Tab>
	</div>
</template>

<script>
	import './index.css';
	import zmitiUtil from '../lib/util';
	import Vue from 'vue';
	import Tab from '../tab';
	import menuObj from './menu';
	Vue.component('Tab',require("../tab").default);
	
	
	export default {
		props:['isAdmin'],
		data(){
			return{
				tabIndex:[0,-1,-1],
				theme2:"light",
				menuObj:{},
				tabs:[
					 
				]
			}
		},
		components:{
			Tab
		},
		watch:{
			$route:{
				deep:true,
				handler(){
					this.changeGroup();
				}
			}
		},

		mounted(){
			var obserable = Vue.obserable;
			this.changeGroup();

			if(!zmitiUtil.isCompanyLeader()){//非单位管理员。
				this.menuObj.tabs.forEach((menu,i)=>{
					if(menu.link==='/changyuecompany'){
						this.menuObj.tabs.splice(i,1);
					}
				});
				
				//this.menuObj.changyue_changyuemysubmit_changyuemycheck.tabs.pop();
			}
			
			obserable.on('fillTabs',(data)=>{
				this.tabs = data || [];
			});

			obserable.on('fillTabIndex',(data)=>{
				data[2]!==-1 && (this.tabs[data[2]].status = true);
				data.length = 2;
				this.tabIndex = data;
			})
		},

		beforeDestory(){

		},

		beforeCreate(){
			//symbinUtil.clearCookie('login');

		},
		methods:{

			mouseover(e){
				if(e.target.nodeName==='A'){
					e.target.classList.add('active')
				}
			},
			mouseout(e){
				if(e.target.nodeName==='A'){
					e.target.classList.remove('active')
				}
			},

			checkActive(tabs){
				tabs.forEach((tab)=>{
					
					if(tab.children){
						tab.status = tab.children.some(item=>{
							return item.link.substring(1) === this.$route.name;
						})
					}
				})
			},
			changeGroup(){

				for(var menu in menuObj){
					menuObj[menu].keys.forEach((key,i)=>{
						if(key === this.$route.name){
							this.menuObj = menuObj[menu];
							this.tabs = this.menuObj.tabs;
							this.checkActive(this.tabs);
						}
					})
				}
				return;
				/* Object.entries(menuObj).forEach((key,i)=>{

					console.log(key,' -------------------- ');
					if(key&&key.keys){
						key.keys.forEach((item,j)=>{
							if(item === this.$route.name){
								this.menuObj = menuObj[key];
								console.log(menuObj)
								this.tabs = menuObj.tabs;
								this.checkActive(this.tabs);
							}
						})
					}
				}) */
			},

			tab1(index,level){
				
				if(level && level.length){
					this.tabs[index].status = !this.tabs[index].status;
					this.tabs = this.tabs.concat([]);
				}else{
					this.tabIndex = [index,-1]
				}
				
				!level && Vue[this.$route.name] && Vue[this.$route.name]();
			},
			tab2(i,k){
				
				this.tabIndex = [i,k];
				Vue[this.$route.name] && Vue[this.$route.name]();
			}
		}
	}
</script>
 