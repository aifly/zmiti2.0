import Vue from "vue";
import './common/directive';
import Obserable from './common/lib/obserable';
import Main from './common/main';
import Product from './admin/product';
import Home from './admin/home';
import Admin from './admin/admin';
import Pv from './admin/pv';
import Form from './admin/form';
 import User from './admin/user';
/*import Company from './admin/company/index';*/
import RoleGroup from './admin/rolegroup';
import Basicconfig from './admin/basicconfig';
import Company from './admin/company';
import SetRole from './admin/setrole'; 
import Login from './admin/login';
import WorkOrder from './admin/workorder';
import WorkOrderList from './admin/workorderlist';
import ResourceList from './admin/resourcelist';
import ChangYue from './admin/changyue';
import ProductRole from './admin/productrole';
import Weather from './admin/weather';
import iView from 'iview';
import VueRouter from 'vue-router'
import Group from './common/group';
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
			component: Home,
		},
	
		
		{
			path: '/',
			name: 'login',
			component: Login,
			props: true
		},
		{
			path: '/login',
			name: 'login',
			component: Login,
			props: true
		},
		{ path: '/workorderlist/:id?', name: 'workorderlist', component: WorkOrderList },
		{ path: '/resourcelist/:id?', name: 'resourcelist', component: ResourceList },
		{ path: '/workorder/', name: 'workorder', component: WorkOrder },
		{ path: '/weather/', name: 'weather', component: Weather },
		{
			path: '/group/', name: 'group', component: Group, props: true, children: [
				{ path: '/user/:companyid?', name: 'user', component: User },
				{ path: '/adminchangyue/', name: 'adminchangyue', component: ChangYue },
				{ path: '/company/', name: 'company', component: Company },
				{ path: '/admin/', name: 'admin', component: Admin},
				{ path: '/pv/', name: 'pv', component: Pv},
				{ path: '/form/', name: 'form', component: Form},
				{ path: '/rolegroup/', name: 'rolegroup', component: RoleGroup},
				{ path: '/setrole/', name: 'setrole', component: SetRole},
				{ path: '/basicconfig/', name: 'basicconfig', component: Basicconfig }, 
				{path: '/product/',name: 'product',component: Product,props: true},
				{ path: '/productrole/', name: 'productrole', component: ProductRole,props: true},
				
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