import Vue from "vue";
import Obserable from './common/lib/obserable';

/* import Login from './components/login'
import Home from './components/home'
import WorkOrder from './components/workorder'
import PasswordFind from './components/passwordfind';
import Register from './components/register';
import ResourceList from './components/resourcelist';

import ChangYue from './components/changyue';
import ChangYueMySubmit from './components/changyuemysubmit';
import ChangYueMyCheck from './components/changyuemycheck';
import ChangYueDetail from './components/changyuedetail';
import changyuecompany from './components/changyuecompany';
import changyuedepartment from './components/changyuedepartment';
import changyuerole from './components/changyuerole';

import user from './components/user';
import usercheck from './components/usercheck';
import checkproduct from './components/checkproduct';
import order from './components/order';
import companydetail from './components/companydetail';
*/
//import companyinfo from './components/companyinfo';
/* import tripexpence from './components/tripexpence/index/index.vue';
import triptraffic from './components/tripexpence/triptraffic/index.vue';
import tripreason from './components/tripexpence/tripreason/index.vue';
import tripnotice from './components/tripexpence/tripnotice/index.vue';
import tripost from './components/tripexpence/tripost/index.vue';
import triprole from './components/tripexpence/triprole/index.vue';
import consume from './components/consume';
import workorderlist from './components/workorderlist';
import Party from './components/party/index/index.vue';
import partyDetail from './components/party/index/detail.vue';
import partyExport from './components/party/index/export.vue';
import Partyrole from './components/party/partyrole';
 */

 //import Main from './common/main';
 var Main = ()=> import(/* webpackChunkName: "main" */'./common/main');
 //import Group from './common/group/index';
 var Group =()=> import(/* webpackChunkName: "main" */'./common/group/index');
var tripreason = ()=> import(/* webpackChunkName: "tripreason" */ './components/tripexpence/tripreason/index.vue');
var tripnotice = ()=> import(/* webpackChunkName: "tripnotice" */ './components/tripexpence/tripnotice/index.vue');
var tripost = ()=> import(/* webpackChunkName: "tripost" */ './components/tripexpence/tripost/index.vue');
var triprole = ()=> import(/* webpackChunkName: "triprole" */ './components/tripexpence/triprole/index.vue');
var triptraffic = ()=> import(/* webpackChunkName: "triptraffic" */ './components/tripexpence/triptraffic/index.vue');
var tripexpence = ()=> import(/* webpackChunkName: "tripexpence" */ './components/tripexpence/index/index.vue');
var consume = ()=> import(/* webpackChunkName: "consume" */ './components/consume');
var workorderlist = ()=> import(/* webpackChunkName: "workorderlist" */ './components/workorderlist');
var Login = ()=> import(/* webpackChunkName: "login" */ './components/login');
var Home = ()=> import(/* webpackChunkName: "home" */ './components/home');
var WorkOrder = ()=> import(/* webpackChunkName: "workorder" */ './components/workorder');
var PasswordFind = ()=> import(/* webpackChunkName: "passwordfind" */ './components/passwordfind');
var Register = ()=> import(/* webpackChunkName: "register" */ './components/register');
var ResourceList = ()=> import(/* webpackChunkName: "resourcelist" */ './components/resourcelist');
var ChangYue = ()=> import(/* webpackChunkName: "changyue" */ './components/changyue');
var ChangYueMySubmit = ()=> import(/* webpackChunkName: "changyuemysubmit" */ './components/changyuemysubmit');
var ChangYueMyCheck = ()=> import(/* webpackChunkName: "changyuemycheck" */ './components/changyuemycheck');
var ChangYueDetail = ()=> import(/* webpackChunkName: "changyuedetail" */ './components/changyuedetail');
var changyuecompany = ()=> import(/* webpackChunkName: "changyuecompany" */ './components/changyuecompany');
var changyuedepartment = ()=> import(/* webpackChunkName: "changyuedepartment" */ './components/changyuedepartment');
var changyuerole = ()=> import(/* webpackChunkName: "changyuerole" */ './components/changyuerole');
var user = ()=> import(/* webpackChunkName: "user" */ './components/user');
var usercheck = ()=> import(/* webpackChunkName: "usercheck" */ './components/usercheck');
var checkproduct = ()=> import(/* webpackChunkName: "checkproduct" */ './components/checkproduct');
var order = ()=> import(/* webpackChunkName: "order" */ './components/order');
var companydetail = ()=> import(/* webpackChunkName: "companydetail" */ './components/companydetail');
var Party = ()=> import(/* webpackChunkName: "party" */ './components/party/index/index.vue');
var partyDetail = ()=> import(/* webpackChunkName: "detail" */ './components/party/index/detail.vue');
var partyExport = ()=> import(/* webpackChunkName: "export" */ './components/party/index/export.vue');
var Partyrole = ()=> import(/* webpackChunkName: "partyrole" */ './components/party/partyrole');
var myself = ()=> import(/* webpackChunkName: "myself" */ './components/myself');
var infomanager = ()=> import(/* webpackChunkName: "infomanager" */ './components/infomanager/index');
var infomanagermsg = ()=> import(/* webpackChunkName: "infomanagermsg" */ './components/infomanager/msg/index');
var infomanagermsgdetail = ()=> import(/* webpackChunkName: "infomanagermsgdetail" */ './components/infomanager/msg/detail');
var infomanagerlist = ()=> import(/* webpackChunkName: "infomanagerlist" */ './components/infomanager/list/index');
var infomanagerlistdetail = ()=> import(/* webpackChunkName: "infomanagerlistdetail" */ './components/infomanager/list/detail');
var infomanagernotice = ()=> import(/* webpackChunkName: "infomanagernotice" */ './components/infomanager/notice/index');
var infomanagernews = ()=> import(/* webpackChunkName: "infomanagernews" */ './components/infomanager/news/index');
var infomanagerdoc = ()=> import(/* webpackChunkName: "infomanagerdoc" */ './components/infomanager/doc/index');
var infomanagerbox = ()=> import(/* webpackChunkName: "infomanagerbox" */ './components/infomanager/box/index');
var infomanagerboxcomment = ()=> import(/* webpackChunkName: "infomanagerboxcomment" */ './components/infomanager/box/comment');
var infomanagerboxdetail = ()=> import(/* webpackChunkName: "infomanagerboxdetail" */ './components/infomanager/box/detail');
var infomanagercolumn = ()=> import(/* webpackChunkName: "infomanagercolumn" */ './components/infomanager/column/index');
var infomanagernewsdetail = ()=> import(/* webpackChunkName: "infomanagercolumn" */ './components/infomanager/news/detail');
var infomanagersetting = ()=> import(/* webpackChunkName: "infomanagersetting" */ './components/infomanager/setting/index');
var votemanager = ()=> import(/* webpackChunkName: "votemanager" */ './components/votemanager/index');
var votemanagerview = ()=> import(/* webpackChunkName: "votemanagerview" */ './components/votemanager/view');
var votemanagerviewquestion = ()=> import(/* webpackChunkName: "votemanagerviewquestion" */ './components/votemanager/view/question');
var votemanagerviewcount = ()=> import(/* webpackChunkName: "votemanagerviewcount" */ './components/votemanager/view/count');
var votemanagerviewuservote = ()=> import(/* webpackChunkName: "votemanagerviewuservote" */ './components/votemanager/view/uservote');
var votemanagersetting = ()=> import(/* webpackChunkName: "votemanagersetting" */ './components/votemanager/setting/index');
var OrderFood = ()=> import(/* webpackChunkName: "votemanagersetting" */ './components/orderfood/orderfood');
var orderfoodsubmit = ()=> import(/* webpackChunkName: "orderfoodsubmit" */ './components/orderfood/orderfoodsubmit');
var orderFoodRole = ()=> import(/* webpackChunkName: "orderfoodrole" */ './components/orderfood/orderfoodrole');
var MeetingRoom = ()=> import(/* webpackChunkName: "orderfoodrole" */ './components/meetingroom/index');
var MeetingRoomSetting = ()=> import(/* webpackChunkName: "MeetingRoomSetting" */ './components/meetingroom/setting');
var MeetingRoomRole = ()=> import(/* webpackChunkName: "MeetingRoomRole" */ './components/meetingroom/role');
var Inquire = ()=> import(/* webpackChunkName: "inquire" */ './components/inquire/index/index.vue');
var InquireUserList = ()=> import(/* webpackChunkName: "InquireUserList" */ './components/inquire/index/userlist.vue');
var InquireUserAnswerList = ()=> import(/* webpackChunkName: "InquireUserAnswerList" */ './components/inquire/index/useranswerlist.vue');
var QuestionList = ()=> import(/* webpackChunkName: "QuestionList" */ './components/inquire/index/questionlist.vue');
var InquireSetting = ()=> import(/* webpackChunkName: "InquireSetting" */ './components/inquire/setting/index.vue');
var Duty = ()=> import(/* webpackChunkName: "Duty" */ './components/Duty/index/index.vue');
var DutySetting = ()=> import(/* webpackChunkName: "DutySetting" */ './components/Duty/setting/index.vue');
var Department = ()=> import(/* webpackChunkName: "Department" */ './components/company/department/index.vue');

/* 
import votemanagersetting from './components/votemanager/setting/index';
import OrderFood from './components/orderfood/orderfood';
import orderfoodsubmit from './components/orderfood/orderfoodsubmit';
import MeetingRoom from './components/meetingroom/index/'
import MeetingRoomSetting from './components/meetingroom/setting/'


import Inquire from './components/inquire/index/index.vue'
import InquireUserList from './components/inquire/index/userlist.vue'
import QuestionList from './components/inquire/index/questionlist.vue'
import InquireUserAnswerList from './components/inquire/index/useranswerlist.vue'
import InquireSetting from './components/inquire/setting/index.vue'
import MeetingRoomRole from './components/meetingroom/role/'
import Duty from './components/duty/index/index.vue'
import DutySetting from './components/duty/setting/index.vue'
//部门管理
import Department from './components/company/department/index.vue'
import orderFoodRole from './components/orderfood/orderfoodrole'; */
//值班

//--2019.8.30--bmyuan--

//--2019.8.30-bmyuan end--
//import myself from './components/myself';
//--2019.8.30-bmyuan end--
/* 
import infomanager from './components/infomanager/index';
import infomanagermsg from './components/infomanager/msg/index';
import infomanagermsgdetail from './components/infomanager/msg/detail';

import infomanagerlist from './components/infomanager/list/index';
import infomanagernotice from './components/infomanager/notice/index';
import infomanagernews from './components/infomanager/news/index';
import infomanagernewsdetail from './components/infomanager/news/detail';
import infomanagerdoc from './components/infomanager/doc/index';
import infomanagerbox from './components/infomanager/box/index';
import infomanagerboxcomment from './components/infomanager/box/comment';
import infomanagerboxdetail from './components/infomanager/box/detail';
import infomanagercolumn from './components/infomanager/column/index';
import infomanagersetting from './components/infomanager/setting/index';
import votemanager from './components/votemanager/index';
import votemanagerview from './components/votemanager/view';
import votemanagerviewquestion from './components/votemanager/view/question';
import votemanagerviewcount from './components/votemanager/view/count';
import votemanagerviewuservote from './components/votemanager/view/uservote';
import infomanagerlistdetail from './components/infomanager/list/detail';
 */



import VueRouter from 'vue-router'
import './components/css/index.css';
import './components/css/theme.less';

import './assets/ueditor/ueditor.config'
import './assets/ueditor/ueditor.all'
import './assets/ueditor/lang/zh-cn/zh-cn'

import rolegroup from './components/rolegroup';
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
		path: "/passwordfind",
		name: "passwordfind",
		component: PasswordFind
	},
    {
		path: "/home",
		name: "home",
		component: Home
	},
	{
		path: "/myself",
		name: "myself",
		component: myself
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
			{ path: "/changyuerole/:id?", name: "changyuerole", component:changyuerole},
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
			{ path: "/triprole/:id?", name: "triprole", component: triprole},
			{ path: '/rolegroup/', name: 'rolegroup', component:  rolegroup},
			{ path: '/meetingroom/:id?', name: 'meetingroom', component: MeetingRoom },
			{ path: '/meetingroomsetting', name: 'meetingroomsetting', component: MeetingRoomSetting },
			{ path: '/meetingroomrole/:id?', name: 'meetingroomrole', component: MeetingRoomRole },
			{ path: "/infomanager/:id?", name: "infomanager", component: infomanager},
			{path:"/infomanagermsg/:id?",name:"infomanagermsg",component:infomanagermsg},
			{path:"/infomanagermsgdetail/:productid?/:typeid?/:typename?/:id?",name:"infomanagermsgdetail",component:infomanagermsgdetail},
			{path: "/infomanagernotice/:id?", name: "infomanagernotice", component: infomanagernotice},
			{path:"/infomanagerlist/:id?",name:"infomanagerlist",component:infomanagerlist},
			{path:"/infomanagerlistdetail/:productid?/:typeid?/:typename?/:id?",name:"infomanagerlistdetail",component:infomanagerlistdetail},
			{path:"/infomanagernews/:id?",name:"infomanagernews",component:infomanagernews},
			{path:"/infomanagernewsdetail/:productid?/:typeid?/:typename?/:id?",name:"infomanagernewsdetail",component:infomanagernewsdetail},
			{path:"/infomanagerdoc/:id?",name:"infomanagerdoc",component:infomanagerdoc},
			{path:"/infomanagerbox/:id?",name:"infomanagerbox",component:infomanagerbox},
			{path:"/infomanagerboxdetail/:productid?/:typeid?/:typename?/:id?",name:"infomanagerboxdetail",component:infomanagerboxdetail},
			{path:"/infomanagerboxcomment/:productid?/:typeid?/:id?/:typename?",name:"infomanagerboxcomment",component:infomanagerboxcomment},
			{path:"/infomanagercolumn/:id?",name:"infomanagercolumn",component:infomanagercolumn},
			{path:"/infomanagersetting/:id?",name:"infomanagersetting",component:infomanagersetting},
			{path:"/votemanager/:id?",name:"votemanager",component:votemanager},
			{path:"/votemanagerview/:id?/:voteid?",name:"votemanagerview",component:votemanagerview},
			{path:"/votemanagerviewquestion/:id?/:voteid?",name:"votemanagerviewquestion",component:votemanagerviewquestion},
			{path:"/votemanagerviewcount/:id?/:voteid?",name:"votemanagerviewcount",component:votemanagerviewcount},
			{path:"/votemanagerviewuservote/:id?/:voteid?/:vuid?",name:"votemanagerviewuservote",component:votemanagerviewuservote},
			{path:"/votemanagersetting/:id?",name:"votemanagersetting",component:votemanagersetting},
			{path:"/orderfood/:id?",name:"orderfood",component:OrderFood},
			{ path: "/orderfoodsubmit/:id?", name: "orderfoodsubmit", component: orderfoodsubmit},
			{ path: "/orderfoodrole/:id?", name: "orderfoodrole", component: orderFoodRole},
			//--2019.8.30--bmyuan--
			{ path: "/party/:id?", name: "party", component: Party},
			{ path: "/partydetail/:productid?/:isedit?/:id?", name: "partydetail", component: partyDetail },
			{ path: "/partyexport/:productid?/:id?", name: "partyexport", component: partyExport },
			{ path: "/partyrole/:id?", name: "partyrole", component: Partyrole},
			//--2019.8.30-bmyuan end--
			// 问卷调差
			{ path: "/inquire/:id?", name: "inquire", component: Inquire},
			{ path: "/inquireuserlist/:productid?/:id?/:title?", name: "inquireuserlist", component: InquireUserList},
			{ path: "/inquirequestionlist/:productid?/:id?/:title?", name: "inquirequestionlist", component: QuestionList},
			{ path: "/inquiresetting/:id?", name: "inquiresetting", component: InquireSetting},
			{ path: "/inquireuseranswerlist/:inquireid?/:questionid?/:title?", name: "inquireuseranswerlist", component: InquireUserAnswerList},
			// 值班
			{ path: "/duty/:id?", name: "duty", component: Duty },
			{ path: "/dutysetting/:id?", name: "dutysetting", component: DutySetting },
			//部门管理
			{ path: "/companydepartment", name: "companydepartment", component: Department },
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
	if (to.name === 'login' || to.name === 'register' || to.name === 'passwordfind'){
		return;
	}

	var userinfo = zmitiUtil.getUserInfo();


	
	//zmitiUtil.listener();

	window.lastRouteName = from.name;

	//window.lastRouteName = this.$route.name;
	
	if (!userinfo) {
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