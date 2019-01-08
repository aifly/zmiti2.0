<template>
    <div class="zmiti-tab-ui">
        <ul :style="{height:viewH - 64+'px'}" class="zmiti-tab-list" >
			<li>{{title}}</li>
            <li @click.prevent='toggleMenu(menu)'  v-for="(menu ,i ) in tabMenus " :key="i" :class="{'close':menu.close ,'active':menu.to ===$route.name && !menu.children,'zmiti-main-menu':menu.children && menu.children.length }">
				<router-link :to="menu.to"> {{menu.name}}</router-link>
				<ol :style="{height:menu.close ? 0:menu.children.length*36+'px'}" class='zmiti-tab-sub-menu' v-if='menu.children && menu.children.length'>
					<li @click.stop='refresh' v-for='(m,k) in menu.children' :key='k' :class="{'active':m.to ===$route.name}">
						<router-link :to="m.to"> {{m.name}}</router-link>
					</li>
				</ol>
            </li>
        </ul>
    </div>
</template>
<script>
	import './index.css';
	import Vue from 'vue';
    export default {
		props:['obserable','refresh','menus','title'],
		name:'zmitiindex',
		data(){
			return{
				visible:false,
				meetname:'',
				imgs:window.imgs,
				viewH:window.innerHeight,
				tabMenus:[],
				formUser:{
					studentmame:'',
					nickname:'',
					mobile:'',
					telphone:'',
					email:'',
					sex:'',
					companyname:'',
					job:'',
					cityids:[],
					
				},
				userinfo:{}
			}
		},
		components:{
		},
		watch:{
			$route(){

			}
		},
		beforeCreate(){
			
		},
		mounted(){
			this.meetname  = Vue.obserable.trigger({
				type:'getMeetName'
			});
			this.tabMenus = this.menus.concat([]);
		},
		
		methods:{
			toggleMenu(menu){
				menu.close = !menu.close;
				this.tabMenus = this.tabMenus.concat([]);
			}
        }
	}
</script>
