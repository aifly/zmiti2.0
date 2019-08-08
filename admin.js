import Vue from "vue";
import './common/directive';
import Obserable from './common/lib/obserable';
import Main from './common/main';
/* import Product from './admin/product';

import Admin from './admin/admin';
import Pv from './admin/pv';
import Form from './admin/form';
 import User from './admin/user';
import Company from './admin/company/index';
import RoleGroup from './admin/rolegroup';
import Basicconfig from './admin/basicconfig';
import SetRole from './admin/setrole'; 

import WorkOrder from './admin/workorder';
import WorkOrderList from './admin/workorderlist';
import ResourceList from './admin/resourcelist';
import ChangYue from './admin/changyue';
import ProductRole from './admin/productrole';
import Group from './common/group';
import Weather from './admin/weather'; */
import changyuesetting from './admin/changyuesetting';
import iView from 'iview';
import VueRouter from 'vue-router';
import Login from './admin/login';
import Home from './admin/home';





import './admin/css/index.css';
import './admin/css/quill.css';
import './components/css/theme.less'
///import 'iview/dist/styles/iview.css';

/* var resourcelist = ()=> import('./admin/resourcelist/index.vue');
var workorderlist = ()=> import('./admin/workorderlist/index.vue');
var workorder = ()=> import('./admin/workorder/index.vue')
var news = ()=> import('./admin/news/index.vue')
var group = ()=>  import('./common/group/index.vue');
var user = ()=> import('./admin/user/index.vue') 
var changyue = ()=>import('./admin/changyue/index.vue') 
var changyuelog = ()=> import('./admin/changyuelog/index.vue')
var company = ()=> import('./admin/company/index.vue')
var admin = ()=> import('./admin/admin/index.vue')
var pv = ()=> import('./admin/pv/index.vue')
var form = ()=> import('./admin/form/index.vue');
var rolegroup = ()=> import('./admin/rolegroup/index.vue')
var setrole = ()=> import('./admin/setrole/index.vue')
var basicconfig =()=>import('./admin/basicconfig/index.vue') 
var product = ()=> import('./admin/product/index.vue')
var productrole = ()=>import('./admin/productrole/index.vue') */

import changyue from './admin/changyue';
import resourcelist from './admin/resourcelist';
import workorderlist from './admin/workorderlist';
import workorder from './admin/workorder';
import news from './admin/news';
import group from './common/group';
import user from './admin/user';
import changyuelog from './admin/changyuelog';
import company from './admin/company';
import admin from './admin/admin';
import pv from './admin/pv';
import form from './admin/form';
import rolegroup from './admin/rolegroup';
import setrole from './admin/setrole';
import productrole from './admin/productrole';
import product from './admin/product';
import basicconfig  from './admin/basicconfig';




Vue.use(VueRouter)
Vue.use(iView)
var obserable = new Obserable();


Vue.obserable = obserable;
const router = new VueRouter({
	mode:'hash',
	routes: [
		//{path: '*', name: 'error', component: FError },
		 {
			path: '/home/',
			name: 'home',
			component: Home
		},
		{
			path: '/',
			name: 'login',
			component: Login,
		
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
		
		},
		{ path: '/resourcelist/:id?', name: 'resourcelist', component:resourcelist },
		{ path: '/workorderlist/:id?', name: 'workorderlist', component:workorderlist },

		
		{ path: '/workorder/', name: 'workorder', component:  workorder},
		{ path: '/news/', name: 'news', component: news},
		 {
			path: '/group/', name: 'group', component: group, children: [
				{ path: '/user/:companyid?', name: 'user', component:user  },
				{ path: '/adminchangyue/:id?', name: 'adminchangyue', component:changyue  },
				{ path: '/adminchangyuesetting', name: 'adminchangyuesetting', component: changyuesetting },
				{ path: '/adminchangyuelog', name: 'adminchangyuelog', component:  changyuelog},
				{ path: '/company/', name: 'company', component: company },
				{ path: '/admin/', name: 'admin', component:admin},
				{ path: '/pv/', name: 'pv', component:pv  },
				{ path: '/form/', name: 'form', component:form  },
				{ path: '/rolegroup/', name: 'rolegroup', component:  rolegroup},
				{ path: '/setrole/', name: 'setrole', component: setrole },
				{ path: '/basicconfig/', name: 'basicconfig', component: basicconfig} , 
				{ path: '/product/', name: 'product', component: product },
				{ path: '/productrole/', name: 'productrole', component:  productrole},
				
			]
		} 
		
	]
});

new Vue({
	router,
	data: {
		obserable,
	},
	el: '#app',
	template: `<div id="app1">
      <Main :isAdmin='true' :obserable='obserable'></Main>
    </div>`,
	methods: {},
	components: {
		Main
	},
	mounted() {
		/*this.$router.obserable = obserable;
		window.addEventListener("online", function(e) {
			this.$Message.success('网络已链接')
		})

		window.addEventListener("offline", function(e) {
			this.$Message.success('网络已断开');
		})*/

	}
}).$mount('#app1')