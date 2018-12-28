<template>
    <div class="wm-tab-ui">
        <ul :style="{height:viewH - 64+'px'}" class="wm-tab-list" >
			<li>{{title}}</li>
            <li @click='refresh' v-for="(menu ,i ) in menus " :key="i" :class="{'active':menu.to ===$route.name }">
				<router-link :to="menu.to"> {{menu.name}}</router-link>
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
			})
		},
		
		methods:{
        }
	}
</script>
