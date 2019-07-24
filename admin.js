import Vue from "vue";
import './common/directive';
import Obserable from './common/lib/obserable';
import Main from './common/main';
/* import Product from './admin/product';
import Home from './admin/home';
import Admin from './admin/admin';
import Pv from './admin/pv';
import Form from './admin/form';
 import User from './admin/user';
import Company from './admin/company/index';
import RoleGroup from './admin/rolegroup';
import Basicconfig from './admin/basicconfig';
import SetRole from './admin/setrole'; 
import Login from './admin/login';
import WorkOrder from './admin/workorder';
import WorkOrderList from './admin/workorderlist';
import ResourceList from './admin/resourcelist';
import ChangYue from './admin/changyue';
import ProductRole from './admin/productrole';
import Group from './common/group';
import Weather from './admin/weather'; */
import iView from 'iview';
import VueRouter from 'vue-router'
import './admin/css/index.css';
import './components/css/theme.less'
///import 'iview/dist/styles/iview.css';


Vue.use(VueRouter)
Vue.use(iView)
var obserable = new Obserable();


Vue.obserable = obserable;
const router = new VueRouter({
	routes: [
		//{path: '*', name: 'error', component: FError },
		 {
			path: '/home/',
			name: 'home',
			component: (resolve) => require(['./admin/home'], resolve),
		},
		{
			path: '/',
			name: 'login',
			component: (resolve) => require(['./admin/login'], resolve),
			props: true
		},
		{
			path: '/login',
			name: 'login',
			component: (resolve) => require(['./admin/login'], resolve),
			props: true
		},
		{ path: '/workorderlist/:id?', name: 'workorderlist', component: (resolve) => require(['./admin/workorderlist'], resolve),},
		{ path: '/resourcelist/:id?', name: 'resourcelist', component: (resolve) => require(['./common/resourcelist'], resolve) },
		{ path: '/workorder/', name: 'workorder', component: (resolve) => require(['./admin/workorder'], resolve) },
		{ path: '/weather/', name: 'weather', component: (resolve) => require(['./admin/weather'], resolve) },
		{
			path: '/group/', name: 'group', component: (resolve) => require(['./common/group'], resolve), props: true, children: [
				{ path: '/user/:companyid?', name: 'user', component: (resolve) => require(['./admin/user'], resolve) },
				{ path: '/adminchangyue/', name: 'adminchangyue', component: (resolve) => require(['./admin/changyue'], resolve) },
				{ path: '/company/', name: 'company', component: (resolve) => require(['./admin/company'], resolve)},
				{ path: '/admin/', name: 'admin', component: (resolve) => require(['./admin/admin'], resolve)},
				{ path: '/pv/', name: 'pv', component: (resolve) => require(['./admin/pv'], resolve)},
				{ path: '/form/', name: 'form', component: (resolve) => require(['./admin/form'], resolve)},
				{ path: '/rolegroup/', name: 'rolegroup', component: (resolve) => require(['./admin/rolegroup'], resolve)},
				{ path: '/setrole/', name: 'setrole', component: (resolve) => require(['./admin/setrole'], resolve)},
				{ path: '/basicconfig/', name: 'basicconfig', component: (resolve) => require(['./admin/basicconfig'], resolve) }, 
				{ path: '/product/', name: 'product', component: (resolve) => require(['./admin/product'], resolve),props: true},
				{ path: '/productrole/', name: 'productrole', component: (resolve) => require(['./admin/productrole'], resolve),props: true},
				
			]
		}
		
	]
});

new Vue({
	router,
	data: {
		obserable,
		imgs,
		viewH: document.documentElement.clientHeight,
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