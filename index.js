import Vue from "vue";
import Obserable from './common/lib/obserable';
import Main from './common/main';
//import Login from './components/login'
///import Home from './components/home'
/* import WorkOrder from './components/workorder'
import WorkOrderList from './components/workorderlist'

import Practice from './task/practice/index'

//import Register from './components/register';
import ResourceList from './common/resourcelist';
import ChangYue from './components/changyue';
import ChangYueMySubmit from './components/changyuemysubmit';
import ChangYueMyCheck from './components/changyuemycheck';
import Group from './common/group/index' */
import iView from 'iview';
import VueRouter from 'vue-router'
import './components/css/index.css';
import './components/css/theme.less';

import zmitiUtil from './common/lib/util';




Vue.use(VueRouter)
Vue.use(iView)
var obserable = new Obserable();

Vue.obserable = obserable;
const router = new VueRouter({
  routes: [
    //{path: '*', name: 'error', component: FError },
		{
			path: "/login/",
			name: "login",
			component: (resolve) => {
				require(['./components/login'], resolve)
			},

		}, {
			path: "/resourcelist/",
			name: "resourcelist",
			component: (resolve) => {
				require(['./components/resourcelist'], resolve)
			},

		},
    {
		path: "/",
		name: "login",
		component: (resolve) => {
			require(['./components/login'], resolve)
		}
	},
	{
		path: "/register",
		name: "register",
		component: (resolve) => require(['./components/register'], resolve),
		props: true
	},
    {
		path: "/home",
		name: "home",
		component: (resolve) => require(['./components/home'], resolve),
		props: true
	},
	{
		path: '/group/', name: 'group', component: (resolve) => require(['./common/group'], resolve), props: true, children: [
			{ path: "/workorder", name: "workorder", component: (resolve) => require(['./components/workorder'], resolve),props: true},
			{ path: "/changyue/", name: "changyue", component: (resolve) => require(['./components/changyue'], resolve),props: true},
			{ path: "/changyuemysubmit/", name: "changyuemysubmit", component: (resolve) => require(['./components/changyuemysubmit'], resolve),props: true},
			{ path: "/changyuemycheck/", name: "changyuemycheck", component: (resolve) => require(['./components/changyuemycheck'], resolve),props: true},
			{ path: "/changyuecompany/", name: "changyuecompany", component: (resolve) => require(['./components/changyuecompany'], resolve),props: true},
			{ path: "/changyuedepartment/", name: "changyuedepartment", component: (resolve) => require(['./components/changyuedepartment'], resolve),props: true},
			{ path: "/user", name: "user", component: (resolve) => require(['./components/user'], resolve),props: true},
			{ path: "/usercheck", name: "usercheck", component: (resolve) => require(['./components/usercheck'], resolve),props: true},
			{ path: "/checkproduct", name: "checkproduct", component: (resolve) => require(['./components/checkproduct'], resolve),props: true},
			{ path: "/order", name: "order", component: (resolve) => require(['./components/order'], resolve),props: true},
			{ path: "/companyinfo", name: "companyinfo", component: (resolve) => require(['./components/companyinfo'], resolve),props: true},
			{ path: "/consume", name: "consume", component: (resolve) => require(['./components/consume'], resolve),props: true},
			{ path: "/workorderlist/:id?", name: "workorderlist", component: (resolve) => require(['./components/workorderlist'], resolve),props: true},
		]
	},
    {
		path: "/practice",
		name: "practice",
		component: (resolve) => require(['./task/practice'],resolve),
		props: true
    }
  ]
});

router.afterEach((to, from) => {
	if (to.name === 'login' || to.name === 'register'){
		return;
	}
	obserable.trigger({
		type:'getProduct'
	})
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