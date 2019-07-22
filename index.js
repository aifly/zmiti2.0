import Vue from "vue";
import Obserable from './common/lib/obserable';
import Main from './common/main';
import Login from './components/login'
import Home from './components/home'
import WorkOrder from './components/workorder'
import WorkOrderList from './components/workorderlist'

import Practice from './task/practice/index'

import Register from './components/register';
import ResourceList from './common/resourcelist';
import ChangYue from './components/changyue';
import ChangYueMySubmit from './components/changyuemysubmit';
import ChangYueMyCheck from './components/changyuemycheck';
import Group from './common/group/index'
import iView from 'iview';
import VueRouter from 'vue-router'
import './components/css/index.css';
import './components/css/theme.less';



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
      component: Login,
      props: true
    },
    {
      path: "/",
      name: "login",
      component: Login,
      props: true
	},
	{
		path: "/register",
		name: "register",
		component: Register,
		props: true
	},
    {
      path: "/home",
      name: "home",
      component: Home,
      props: true
	},
	{
		path: '/group/', name: 'group', component: Group, props: true, children: [
			{path: "/workorder",name: "workorder",component: WorkOrder,props: true},
			{ path: "/changyue/", name: "changyue", component: ChangYue,props: true},
			{ path: "/changyuemysubmit/", name: "changyuemysubmit", component: ChangYueMySubmit,props: true},
			{ path: "/changyuemycheck/", name: "changyuemycheck", component: ChangYueMyCheck,props: true},
			{ path: "/workorderlist/:id?", name: "workorderlist", component: WorkOrderList,props: true},
		]
	},
    {
    	path: "/practice",
      name: "practice",
      component: Practice,
      props: true
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
	  <Main :obserable='obserable'></Main>
    </div>`,
	methods: {},
	components: {
		Main,
		Login,
		
	},
	mounted() {

		this.$router.obserable = obserable;

	}
}).$mount('#app1')