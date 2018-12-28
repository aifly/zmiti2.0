import Vue from "vue";
import Obserable from './common/lib/obserable';
import Main from './common/main/index';
import Product from './admin/product/index';
import User from './admin/user/index';
import Company from './admin/company/index';
import iView from 'iview';
import VueRouter from 'vue-router'
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
			path: '/user/',
			name: 'user',
			component: User,
		},
		{
			path: '/company/',
			name: 'company',
			component: Company,
			props: true
		},
		{
			path: '/product/',
			name: 'product',
			component: Product,
			props: true
		},
		{
			path: '/',
			name: 'product',
			component: Product,
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