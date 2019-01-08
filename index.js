import Vue from "vue";
import Obserable from './common/lib/obserable';
import Main from './common/main/index';
import Login from './components/login/index'
import Home from './components/home/index'

import TaskManager from './task/taskmgr/index';
import TaskManagerEdit from './task/taskmgr/edit';

import TaskLogin from './task/login/index';
import TaskHome from './task/home/index';
import TaskProject from './task/project/index';

import iView from 'iview';
import VueRouter from 'vue-router'
import './components/css/index.css';
import 'iview/dist/styles/iview.css';

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
      path: "/home",
      name: "home",
      component: Home,
      props: true
    },
   
    {
      path: "/tasklogin",
      name: "tasklogin",
      component: TaskLogin,
      props: true
    },
    {
      path: "/taskhome",
      name: "taskhome",
      component: TaskHome,
      props: true
    },
    {
      path: "/taskproject",
      name: "taskproject",
      component: TaskProject,
      props: true
    },
    {
      path: "/taskmgrlist",
      name: "taskmgrlist",
      component: TaskManager,
      props: true
     },
    {
      path: "/taskmgredit/:id?",
      name: "taskmgredit",
      component: TaskManagerEdit,
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
		Login
	},
	mounted() {

		this.$router.obserable = obserable;

	}
}).$mount('#app1')