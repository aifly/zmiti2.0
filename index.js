import Vue from "vue";
import Obserable from './common/lib/obserable';
import Main from './common/main';
import Login from './components/login'
import Home from './components/home'
import WorkOrder from './components/workorder'

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
import triptraffic from './components/tripexpence/triptraffic/index.vue';
import tripreason from './components/tripexpence/tripreason/index.vue';
import tripnotice from './components/tripexpence/tripnotice/index.vue';
import tripost from './components/tripexpence/tripost/index.vue';
import consume from './components/consume';
import workorderlist from './components/workorderlist';
import Group from './common/group/index';
import infomanager from './components/infomanager/index';
import infomanagermsg from './components/infomanager/msg/index';
import infomanagerdetail from './components/infomanager/msg/detail';
import infomanagerlist from './components/infomanager/list/index';
import infomanagernotice from './components/infomanager/notice/index';
import infomanagernews from './components/infomanager/news/index';
import infomanagerdoc from './components/infomanager/doc/index';
import infomanagerbox from './components/infomanager/box/index';
import infomanagercolumn from './components/infomanager/column/index';
import infomanagersetting from './components/infomanager/setting/index';

import OrderFood from './components/orderfood/orderfood';
import orderfoodsubmit from './components/orderfood/orderfoodsubmit';

import VueRouter from 'vue-router'
import './components/css/index.css';
import './components/css/theme.less';

import './assets/ueditor/ueditor.config'
import './assets/ueditor/ueditor.all'
import './assets/ueditor/lang/zh-cn/zh-cn'

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
		component: Home
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
			{ path: "/trip/:id?", name: "trip", component: tripexpence},
			{ path: "/triptraffic/:id?", name: "triptraffic", component: triptraffic},
			{ path: "/tripreason/:id?", name: "tripreason", component: tripreason},
			{ path: "/tripnotice/:id?", name: "tripnotice", component: tripnotice},
			{ path: "/tripost/:id?", name: "tripost", component: tripost},
			{ path: "/infomanager", name: "infomanager", component: infomanager},
			{path:"/infomanagermsg/:id?",name:"infomanagermsg",component:infomanagermsg},
			{path:"/infomanagerdetail/:typeid?/:id?",name:"infomanagerdetail",component:infomanagerdetail},
			{path: "/infomanagernotice/:id?", name: "infomanagernotice", component: infomanagernotice},
			{path:"/infomanagerlist/:id?",name:"infomanagerlist",component:infomanagerlist},
			{path:"/infomanagernews/:id?",name:"infomanagernews",component:infomanagernews},
			{path:"/infomanagerdoc/:id?",name:"infomanagerdoc",component:infomanagerdoc},
			{path:"/infomanagerbox/:id?",name:"infomanagerbox",component:infomanagerbox},
			{path:"/infomanagercolumn/:id?",name:"infomanagercolumn",component:infomanagercolumn},
			{path:"/infomanagersetting/:id?",name:"infomanagersetting",component:infomanagersetting},
			{path:"/orderfood/:id?",name:"orderfood",component:OrderFood},
			{ path: "/orderfoodsubmit/:id?", name: "orderfoodsubmit", component: orderfoodsubmit},
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
	
	//zmitiUtil.listener();
	
	if (!userinfo) {
		alert(2)
		//this.$router.push({ path: '/login' })
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