import Vue from "vue";
import './common/directive';
import Obserable from './common/lib/obserable';
const Main = () => import(/* webpackChunkName: "main" */'./common/main');
import iView from 'iview';
import VueRouter from 'vue-router';

import './admin/css/index.css';
import './admin/css/quill.css';
import './components/css/theme.less'

const adminchangyuesetting = () => import(/* webpackChunkName: "adminchangyuesetting" */ './admin/changyuesetting');
const Login = () => import(/* webpackChunkName: "login" */ './admin/login');
const Home = () => import(/* webpackChunkName: "home" */ './admin/home');
 
const changyue = () => import(/* webpackChunkName: "changyue" */ './admin/changyue');
const resourcelist = () => import(/* webpackChunkName: "resourcelist" */ './admin/resourcelist');
const workorderlist = () => import(/* webpackChunkName: "workorderlist" */ './admin/workorderlist');
const doneworkorder = () => import(/* webpackChunkName: "doneworkorder" */ './admin/doneworkorder');
const unworkorder = () => import(/* webpackChunkName: "unworkorder" */ './admin/unworkorder');
const workorder = () => import(/* webpackChunkName: "workorder" */ './admin/workorder');
const news = () => import(/* webpackChunkName: "news" */ './admin/news');
const article = () => import(/* webpackChunkName: "article" */ './admin/news/article');
const group = () => import(/* webpackChunkName: "group" */ './common/group');

const user = () => import(/* webpackChunkName: "user" */ './admin/user');
const changyuelog = () => import(/* webpackChunkName: "changyuelog" */ './admin/changyuelog');
const company = () => import(/* webpackChunkName: "company" */ './admin/company');
const admin = () => import(/* webpackChunkName: "adminpage" */ './admin/admin');
const pv = () => import(/* webpackChunkName: "pv" */ './admin/pv');
const form = () => import(/* webpackChunkName: "form" */ './admin/form');
const rolegroup = () => import(/* webpackChunkName: "rolegroup" */ './admin/rolegroup');
const setrole = () => import(/* webpackChunkName: "setrole" */ './admin/setrole');
const productrole = () => import(/* webpackChunkName: "productrole" */ './admin/productrole');
const product = () => import(/* webpackChunkName: "product" */ './admin/product');
const basicconfig = () => import(/* webpackChunkName: "basicconfig" */ './admin/basicconfig');


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
		

		
		{ path: '/workorder/', name: 'workorder', component:  workorder},
		{ path: '/news/', name: 'news', component: news},
		{ path: '/news/article/:newsid?', name: 'article', component: article},
		 {
			path: '/group/', name: 'group', component: group, children: [
				{ path: '/workorderlist/:id?', name: 'workorderlist', component: workorderlist },
				 { path: '/doneworkorder/:id?', name: 'doneworkorder', component: doneworkorder },
				{ path: '/unworkorder/:id?', name: 'unworkorder', component: unworkorder },
				{ path: '/user/:companyid?', name: 'user', component:user  },
				{ path: '/adminchangyue/:id?', name: 'adminchangyue', component:changyue  },
				 { path: '/adminchangyuesetting', name: 'adminchangyuesetting', component: adminchangyuesetting },
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