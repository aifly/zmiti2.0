import Vue from "vue";
import Obserable from './rater/lib/obserable';
import Main from './rater/main/index';
import Login from './rater/login/index'
import Rate from './rater/rate/index';
import User from './rater/user/index';
import iView from 'iview';
import VueRouter from 'vue-router'
import './rater/css/index.css';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter)
Vue.use(iView)
var obserable = new Obserable();



Vue.obserable = obserable;
const router = new VueRouter({
	routes: [
		//{path: '*', name: 'error', component: FError },
		{
			path: '/login/',
			name: 'login',
			component: Login,
			props: true
		},
		{
			path: '/',
			name: 'login',
			component: Login,
			props: true
		},
		{
			path: '/rate/',
			name: 'rate',
			component: Rate,
			props:true
		}, {
			path: '/user/',
			name: 'user',
			component: User,
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
	},
	mounted() {

		this.$router.obserable = obserable;

		window.addEventListener("online", function(e) {
			this.$Message.success('网络已链接')
		})

		window.addEventListener("offline", function(e) {
			this.$Message.success('网络已断开');
		})


	}
}).$mount('#app1')