import Vue from "vue";
import './common/directive';
import Obserable from './common/lib/obserable';
import Main from './common/main/index';
import Product from './admin/product/index';
import User from './admin/user/index';
import Home from './admin/home/index';
import Company from './admin/company/index';
import Admin from './admin/admin/index';
import RoleGroup from './admin/rolegroup/index';
import SetRole from './admin/setrole/index';
import Login from './admin/login/index';
import Managertype from './admin/managertype/index'
import iView from 'iview';
import VueRouter from 'vue-router'
import Group from './common/group/index';
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
			path: '/product/',
			name: 'product',
			component: Product,
			props: true
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
		}, {
			path: "/managertype",
			name: "managertype",
			component: Managertype,
			props: true
		},
		{
			path: '/group/', name: 'group', component: Group, props: true, children: [
				{ path: '/user/', name: 'user', component: User },
				{ path: '/company/', name: 'company', component: Company },
				{ path: '/admin/', name: 'admin', component: Admin},
				{ path: '/rolegroup/', name: 'rolegroup', component: RoleGroup},
				{ path: '/setrole/', name: 'setrole', component: SetRole},
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