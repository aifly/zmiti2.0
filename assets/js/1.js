(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{22:function(t,n,i){"use strict";i.r(n);i(79);var e={validate(t){}},a=(i(3),{props:["title","tabs","tabIndex"],name:"zmitiindex",data:()=>({theme2:"light",imgs:window.imgs,viewW:document.documentElement.clientWidth,hideTab:!1,width:0}),components:{},beforeCreate(){e.validate(this)},methods:{toggleTab(){this.hideTab=!this.hideTab,this.resizeTab()},resizeTab(){this.width=window.innerWidth-(this.hideTab?50:230)}},mounted(){this.resizeTab(),window.addEventListener("resize",()=>{this.resizeTab()})}}),r=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"zmiti-tab-ui lt-full"},[i("div",{staticClass:"zmiti-tab-bar",class:{hide:t.hideTab}},[i("div",{staticClass:"zmiti-tab-title"},[t._v(t._s(t.title)+" ")]),t._v(" "),t._t("zmiti-tab-menu"),t._v(" "),i("div",{staticClass:"zmiti-tab-btn",on:{click:t.toggleTab}},[t.hideTab?i("img",{staticStyle:{transform:"rotate(180deg)"},attrs:{src:t.imgs.open}}):t._e(),t._v(" "),t.hideTab?t._e():i("img",{attrs:{src:t.imgs.open}})])],2),t._v(" "),i("div",{staticClass:"zmiti-tab-content",style:{width:t.width+"px"}},[i("router-view")],1)])};r._withStripped=!0;var s=i(7),o=!1;var b=function(t){o||i(81)},l=Object(s.a)(a,r,[],!1,b,null,null);l.options.__file="common\\tab\\index.vue";var u=l.exports,m=i(1);var d={user_company:{title:"用户单位",tabs:[{name:"用户单位",link:"/",status:!0,children:[{name:"用户管理",link:"/user"},{name:"单位管理",link:"/company"}]}]},basicconfig_admin_rolegroup_setrole_pv_form:{title:"系统管理",tabs:[{name:"基础配置",link:"/basicconfig"},{name:"管理员管理",link:"/admin"},{name:"权限管理",link:"/role",children:[{name:"权限组管理",link:"/rolegroup"},{name:"权限分配",link:"/setrole"}]},{name:"简易统计",link:"/",children:[{name:"浏览量统计",link:"/pv"},{name:"简易表单",link:"/form"}]}]},workorder_workorderlist:{title:"工单管理",tabs:[{name:"提交工单",link:"/workorder"},{name:"工单列表",link:"/workorderlist"}]},adminchangyue_adminchangyuesetting_adminchangyuelog:{title:"畅阅",tabs:[{name:"首页",link:"/adminchangyue"},{name:"CMS配置",link:"/adminchangyuesetting"},{name:"操作日志",link:"/adminchangyuelog"}]},product_productrole:{title:"产品管理",tabs:[{name:"产品列表",link:"/product"},{name:"产品授权",link:"/productrole"}]},changyue_changyuemysubmit_changyuemycheck:{title:"畅阅",tabs:[{name:"首页",link:"/changyue"},{name:"我的提交",link:"/changyuemysubmit"},{name:"我的审核",link:"/changyuemycheck"}]}},h={props:["isAdmin"],data:()=>({tabIndex:[0,-1,-1],theme2:"light",menuObj:{},tabs:[]}),components:{Tab:u},watch:{$route:{deep:!0,handler(){this.changeGroup()}}},mounted(){var t=m.default.obserable;this.changeGroup(),t.on("fillTabs",t=>{this.tabs=t||[]}),t.on("fillTabIndex",t=>{-1!==t[2]&&(this.tabs[t[2]].status=!0),t.length=2,this.tabIndex=t})},beforeDestory(){},beforeCreate(){e.validate(this)},methods:{checkActive(t){t.forEach(t=>{t.children&&(t.status=t.children.some(t=>t.link.substring(1)===this.$route.name))})},changeGroup(){Object.keys(d).forEach((t,n)=>{t.split("_").forEach((n,i)=>{n===this.$route.name&&(this.menuObj=d[t],this.tabs=d[t].tabs,this.checkActive(this.tabs))})})},tab1(t,n){n&&n.length?(this.tabs[t].status=!this.tabs[t].status,this.tabs=this.tabs.concat([])):this.tabIndex=[t,-1]},tab2(t,n){this.tabIndex=[t,n]}}},c=function(){var t=this,n=t.$createElement,i=t._self._c||n;return i("div",{staticClass:"sysbin-group-ui"},[i("Tab",{attrs:{title:t.menuObj.title,tabs:t.tabs,tabIndex:t.tabIndex}},[i("div",{attrs:{slot:"zmiti-tab-menu"},slot:"zmiti-tab-menu"},[i("ul",{staticClass:"symbin-tab-menu"},t._l(t.tabs,function(n,e){return i("li",{key:e,class:{active:!n.children&&n.link.substring(1)===t.$route.name&&!n.children,level1:n.children&&!n.status,open:n.status||n.children&&n.children.some(function(n){return n.link.substring(1)===t.$route.name})},on:{click:function(i){return i.stopPropagation(),i.preventDefault(),t.tab1(e,n.children)}}},[n.children&&n.children.length>0?t._e():i("div",[i("router-link",{attrs:{to:n.link}},[t._v(t._s(n.name))])],1),t._v(" "),n.children&&n.children.length>0?i("div",[t._v("\n\t\t\t\t\t\t"+t._s(n.name)+"\n\t\t\t\t\t")]):t._e(),t._v(" "),n.children?i("ol",{style:{height:(n.status?50*n.children.length:0)+"px"}},t._l(n.children,function(n,a){return i("li",{key:a,class:{active:t.$route.name===n.link.substring(1)},on:{click:function(n){return n.stopPropagation(),n.preventDefault(),t.tab2(e,a)}}},[n.link?i("div",[i("router-link",{attrs:{to:n.link}},[t._v(t._s(n.name))])],1):t._e(),t._v(" "),n.link?t._e():i("div",[t._v(t._s(n.name))])])}),0):t._e()])}),0)])])],1)};c._withStripped=!0;var p=Object(s.a)(h,c,[],!1,null,null,null);p.options.__file="common\\group\\index.vue";n.default=p.exports},79:function(t,n,i){var e=i(80);"string"==typeof e&&(e=[[t.i,e,""]]);i(8)(e,{});e.locals&&(t.exports=e.locals)},80:function(t,n,i){(t.exports=i(2)()).push([t.i,"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.sysbin-group-ui .ivu-menu-item > a {\n  color: #495060;\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.sysbin-group-ui .symbin-tab-menu li {\n  background: #d2d2d2;\n  border-top: 1px solid #D9DEE4;\n  -webkit-user-select: none;\n  cursor: pointer;\n  line-height: 50px;\n  text-indent: 3em;\n  position: relative;\n}\n\n.sysbin-group-ui .symbin-tab-menu li a {\n  color: inherit;\n  display: block;\n  width: 100%;\n  height: 100%;\n}\n\n.sysbin-group-ui .symbin-tab-menu li.open:before {\n  content: '';\n  position: absolute;\n  left: 0;\n  top: 20px;\n  z-index: 10;\n  width: 0;\n  height: 0;\n  left: 1.5em;\n  border-left: 5px solid transparent;\n  border-right: 5px solid transparent;\n  border-top: 8px solid #000;\n}\n\n.sysbin-group-ui .symbin-tab-menu li.level1:before {\n  content: '';\n  position: absolute;\n  left: 1.6em;\n  top: 20px;\n  z-index: 10;\n  width: 0;\n  height: 0;\n  border-top: 5px solid transparent;\n  border-left: 8px solid #000;\n  border-bottom: 5px solid transparent;\n}\n\n.sysbin-group-ui .symbin-tab-menu li:hover {\n  background: #F4F6F8;\n}\n\n.sysbin-group-ui .symbin-tab-menu li:hover > ol {\n  background: #e2e2e2;\n}\n\n.sysbin-group-ui .symbin-tab-menu li ol {\n  overflow: hidden;\n  height: 100%;\n  -webkit-transition: 0.2s height;\n  transition: 0.2s height;\n}\n\n.sysbin-group-ui .symbin-tab-menu li ol.close {\n  height: 0;\n}\n\n.sysbin-group-ui .symbin-tab-menu li ol > li {\n  text-indent: 4em;\n}\n\n.sysbin-group-ui .symbin-tab-menu li.active {\n  background: #f2f2f2;\n  font-weight: bold;\n  color: #3390ff;\n}\n",""])},81:function(t,n,i){var e=i(82);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);(0,i(6).default)("7436fece",e,!1,{})},82:function(t,n,i){(t.exports=i(2)()).push([t.i,"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.zmiti-tab-ui {\n  background: #fff;\n}\n.zmiti-tab-ui .zmiti-tab-bar {\n    width: 180px;\n    height: 100%;\n    background: #e2e2e2;\n    position: absolute;\n    left: 0;\n    top: 0;\n    z-index: 14;\n    overflow: hidden;\n    -webkit-transition: 0.2s;\n    transition: 0.2s;\n}\n.zmiti-tab-ui .zmiti-tab-bar.hide {\n      z-index: 17;\n      overflow: visible;\n      -webkit-transform: translate3d(-180px, 0, 0);\n      transform: translate3d(-180px, 0, 0);\n}\n.zmiti-tab-ui .zmiti-tab-bar.hide .zmiti-tab-btn {\n        -webkit-transform: translate3d(25px, 0, 0);\n        transform: translate3d(25px, 0, 0);\n}\n.zmiti-tab-ui .zmiti-tab-bar.hide .zmiti-tab-btn:hover {\n          -webkit-transform: translate3d(25px, 0, 0);\n          transform: translate3d(25px, 0, 0);\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-title {\n      width: 100%;\n      height: 70px;\n      line-height: 70px;\n      text-align: center;\n      font-weight: bold;\n      background: #D9DEE4;\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu-submenu-title, .zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu-item {\n      background: #EAEDF1 !important;\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu .ivu-menu-submenu-title, .zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu .ivu-menu-item {\n      background: #f4f6f8 !important;\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn {\n      width: 50px;\n      height: 40px;\n      position: absolute;\n      z-index: 10;\n      top: 50%;\n      right: 0;\n      cursor: pointer;\n      -webkit-transform-style: preserve-3d;\n      transform-style: preserve-3d;\n      perspective: 800px;\n      -webkit-perspective: 800px;\n      -webkit-transform: translate3d(5px, 0, 0);\n      transform: translate3d(5px, 0, 0);\n      -webkit-transition: 0.1s;\n      transition: 0.1s;\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn:hover {\n        -webkit-transform: translate3d(0, 0, 0);\n        transform: translate3d(0, 0, 0);\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn:after {\n        content: '';\n        position: absolute;\n        width: 100%;\n        height: 100%;\n        background: #ccc;\n        z-index: 0;\n        left: 0;\n        -webkit-transform-origin: right;\n        transform-origin: right;\n        -webkit-transform: rotateY(-55deg);\n        transform: rotateY(-55deg);\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn img {\n        width: 20px;\n        position: absolute;\n        z-index: 2;\n        left: 25px;\n        top: 10px;\n}\n.zmiti-tab-ui .zmiti-tab-content {\n    position: absolute;\n    height: 100%;\n    z-index: 16;\n    right: 0;\n    background: #f2f2f2;\n}\n",""])}}]);