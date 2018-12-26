import Vue from "vue";
import Obserable from './components/lib/obserable';
import Main from './admin/main/index';
import AdminUser from './admin/adminuser/index';
import User from './admin/user/index';
import Vote from './admin/vote/index';
import Login from './admin/login/index';
import Detail from './admin/detail/index';
import Recruit from './admin/recruit/index';
import Result from './admin/result/result';
import Recruitaction from './admin/recruitaction/index';
import Rater from './admin/rater/index';
import Download from './admin/download/index';
import Collection from './admin/collection/index';
import iView from 'iview';
import VueRouter from 'vue-router'
import './admin/css/index.css';
import './components/css/admin.less'
///import 'iview/dist/styles/iview.css';

Vue.use(VueRouter)
Vue.use(iView)
var obserable = new Obserable();

Vue.obserable = obserable;
const router = new VueRouter({
	routes: [
		//{path: '*', name: 'error', component: FError },
		{
			path: '/adminuser/',
			name: 'adminuser',
			component: AdminUser,
			props: true
		},
		{
			path: '/login/',
			name: 'login',
			component: Login,
			props: true
		},{
			path: '/',
			name: 'login',
			component: Login,
			props: true
		},
		 {
			path: '/vote/',
			name: 'vote',
			component: Vote,
			props: true
		}, {
			path: '/collection/:id/:type?',
			name: 'collection',
			component: Collection,
			props: true
		}, {
			path: '/recruit/',
			name: 'recruit',
			component: Recruit,
			props: true
		}, {
			 path: '/ratedetail/:id',
			 name: 'ratedetail',
			component: Detail,
			props: true
		},{
			path: '/recruitaction/:id?',
			name: 'recruitaction',
			component: Recruitaction,
			props:true
		}, {
			path: '/user/',
			name: 'user',
			component: User,
			props: true
		},
		 {
			path: '/rater/',
			name: 'rater',
			component: Rater,
			props: true
		}, {
			path: '/download/',
			name: 'download',
			component: Download,
			props: true
		}, {
			path: '/result/',
			name: 'result',
			component: Result,
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