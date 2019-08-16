import Vue from "vue";
import Obserable from './common/lib/obserable';
import Main from './common/main';
import Login from './components/login'
import Home from './components/home'
import WorkOrder from './components/workorder'
import WorkOrderList from './components/workorderlist'

import Practice from './task/practice/index'

import Register from './components/register';
import ResourceList from './components/resourcelist';
import ChangYue from './components/changyue';
import ChangYueMySubmit from './components/changyuemysubmit';
import ChangYueMyCheck from './components/changyuemycheck';
import ChangYueDetail from './components/changyuedetail';
import changyuecompany from './components/changyuecompany';
import changyuedepartment from './components/changyuedepartment';
import user from './components/user';
import usercheck from './components/usercheck';
import checkproduct from './components/checkproduct';
import order from './components/order';
//import companyinfo from './components/companyinfo';
import companydetail from './components/companydetail';
import tripexpence from './components/tripexpence/index/index.vue';
import consume from './components/consume';
import workorderlist from './components/workorderlist';
import Group from './common/group/index'

import VueRouter from 'vue-router'
import './components/css/index.css';
import './components/css/theme.less';

import zmitiUtil from './common/lib/util';
import iview from 'iview';
Vue.use(VueRouter)
Vue.use(iview)
var obserable = new Obserable();

Vue.obserable = obserable;
const router = new VueRouter({
  routes: [
    //{path: '*', name: 'error', component: FError },
	{
		path: "/login/",
		name: "login",
		component: Login,

	}, {
		path: "/resourcelist/",
		name: "resourcelist",
		component:ResourceList,
	},
    {
		path: "/",
		name: "login",
		component:Login
	},
	{
		path: "/register",
		name: "register",
		component: Register
	},
    {
		path: "/home",
		name: "home",
		component: () => import('./components/home/index.vue')
	},
	{
		path: '/group/', name: 'group', component: Group, children: [

			{ path: "/workorder", name: "workorder", component: WorkOrder},
			{ path: "/changyue/:id?", name: "changyue", component:ChangYue},
			{ path: "/changyuemysubmit/:id?", name: "changyuemysubmit", component: ChangYueMySubmit},
			{ path: "/changyuemycheck/:id?", name: "changyuemycheck", component: ChangYueMyCheck},
			{ path: "/changyuedetail/:manuscriptid/:id/", name: "changyuedetail", component: ChangYueDetail},
			{ path: "/changyuecompany/:id?", name: "changyuecompany", component:changyuecompany},
			{ path: "/changyuedepartment/:id?", name: "changyuedepartment", component:changyuedepartment},
			{ path: "/user", name: "user", component:user},
			{ path: "/usercheck/:id?", name: "usercheck", component:usercheck},
			{ path: "/checkproduct/:id?", name: "checkproduct", component: checkproduct},
			{ path: "/order", name: "order", component: order},
			{ path: "/companyinfo", name: "companyinfo", component:()=> import('./components/companyinfo/index.vue')},
			{ path: "/companydetail", name: "companydetail", component: companydetail},
			{ path: "/consume", name: "consume", component: consume},
			{ path: "/workorderlist/:id?", name: "workorderlist", component:workorderlist},
			{ path: "/tripexpence/:id?", name: "tripexpence", component: tripexpence},
		]
	},
   /*  {
		path: "/practice",
		name: "practice",
		component: (resolve) => require(['./task/practice'],resolve),
		props: true
    } */
  ]
});

router.afterEach((to, from) => {
	if (to.name === 'login' || to.name === 'register'){
		return;
	}

	var userinfo = zmitiUtil.getUserInfo();
	
	zmitiUtil.listener();
	
	if (!userinfo) {
		this.$router.push({ path: '/login' })
	}
	
})

new Vue({
	router,
	data: {
		obserable,
		imgs,
		viewH: document.documentElement.clientHeight,
	},
	el: '#app',
	template: `<div id="app1">
	  <Main :obserable='obserable'></Main>
    </div>`,
	methods: {},
	components: {
		Main,
	},
	mounted() {
		this.$router.obserable = obserable;
	}
}).$mount('#app1')