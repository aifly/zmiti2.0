(window.webpackJsonp=window.webpackJsonp||[]).push([[43],{248:function(t,i,e){"use strict";e.r(i);var n={props:["title","tabs","tabIndex"],data:()=>({theme2:"light",imgs:window.imgs,viewW:document.documentElement.clientWidth,hideTab:!1,width:0}),components:{},beforeCreate(){},methods:{toggleTab(){this.hideTab=!this.hideTab,this.resizeTab()},resizeTab(){this.width=window.innerWidth-(this.hideTab?50:230)}},mounted(){this.resizeTab(),window.addEventListener("resize",()=>{this.resizeTab()})}},a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"zmiti-tab-ui lt-full"},[e("div",{staticClass:"zmiti-tab-bar",class:{hide:t.hideTab}},[e("div",{staticClass:"zmiti-tab-title"},[t._v(t._s(t.title)+" ")]),t._v(" "),t._t("zmiti-tab-menu"),t._v(" "),e("div",{staticClass:"zmiti-tab-btn",on:{click:t.toggleTab}},[t.hideTab?e("img",{staticStyle:{transform:"rotate(180deg)"},attrs:{src:t.imgs.open}}):t._e(),t._v(" "),t.hideTab?t._e():e("img",{attrs:{src:t.imgs.open}})])],2),t._v(" "),e("div",{staticClass:"zmiti-tab-content",style:{width:t.width+"px"}},[e("router-view")],1)])};a._withStripped=!0;var o=e(3),r=!1;var s=function(t){r||e(255)},l=Object(o.a)(n,a,[],!1,s,null,null);l.options.__file="common\\tab\\index.vue";i.default=l.exports},249:function(t,i,e){var n=e(250);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,e(6).default)("cf3b25e8",n,!1,{})},250:function(t,i,e){(t.exports=e(4)()).push([t.i,'\n[class^="icon-"][data-v-1381f7e2],[class*=" icon-"][data-v-1381f7e2]{font-family:\'icomoon\' !important;font-style:normal;font-weight:normal;font-variant:normal;text-transform:none;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale\n}\n.lt-full[data-v-1381f7e2]{width:100%;height:100%;position:absolute;left:0;top:0\n}\n.zmiti-text-overflow[data-v-1381f7e2]{overflow:hidden;white-space:nowrap;word-break:break-all;text-overflow:ellipsis;-webkit-text-overflow:ellipsis\n}\n.layout .layout-logo[data-v-1381f7e2]{color:#FFF\n}\n.layout .layout-logo img[data-v-1381f7e2]{height:35px;width:auto\n}\n.layout .ivu-layout-header[data-v-1381f7e2]{display:flex;display:-webkit-flex;flex-flow:row;justify-content:space-between;background:#373d41;height:50px;line-height:50px\n}\n.layout .ivu-layout-header>div[data-v-1381f7e2]:nth-of-type(1){width:120px;display:flex;display:-webkit-flex;flex-flow:row;color:#fff\n}\n.layout .ivu-layout-header>div:nth-of-type(1) .zmiti-title[data-v-1381f7e2]{height:50px;line-height:50px;position:relative\n}\n.layout .ivu-layout-header>div:nth-of-type(1) .zmiti-title img[data-v-1381f7e2]{width:80px;vertical-align:middle\n}\n.layout .ivu-layout-header>div:nth-of-type(1) .zmiti-title span[data-v-1381f7e2]{position:absolute;left:110%;bottom:14px;height:30px\n}\n.layout .ivu-layout-header>div[data-v-1381f7e2]:nth-of-type(2){-webkit-flex:1;flex:1;display:flex;display:-webkit-flex;flex-flow:row\n}\n.layout .ivu-layout-header>div:nth-of-type(2) div[data-v-1381f7e2]{color:#fff;font-size:16px;margin:0 20px\n}\n.layout .ivu-layout-header>div:nth-of-type(2) div a[data-v-1381f7e2]{color:inherit\n}\n.layout .ivu-layout-header>div.zmiti-user-info[data-v-1381f7e2]{display:flex;display:-webkit-flex;flex-flow:row;min-width:340px;color:#fff;position:relative;-webkit-justify-content:space-between;justify-content:space-between\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span a[data-v-1381f7e2]{color:inherit\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span[data-v-1381f7e2]:last-of-type{cursor:pointer;text-align:center;width:100px;position:relative\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span[data-v-1381f7e2]:last-of-type:hover{background:#00c1de\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type:hover ul[data-v-1381f7e2]{display:block\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul[data-v-1381f7e2]{cursor:default;display:none;text-align:left;position:absolute;width:200px;height:200px;right:0;top:50px;background:#252b30;z-index:200\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li[data-v-1381f7e2]{width:90%;margin:0 auto\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li.zmiti-hover-username[data-v-1381f7e2]{font-weight:bold;font-size:14px\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li.zmiti-hover-tab[data-v-1381f7e2]{display:flex;display:-webkit-flex;flex-flow:row;justify-content:space-between;-webkit-justify-content:space-between;border-bottom:1px solid #444;padding-bottom:20px\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li.zmiti-hover-tab>div[data-v-1381f7e2]{border:1px solid #777;line-height:20px;padding:0 4px;color:#777;flex:1;margin:0 4px\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li.zmiti-hover-tab>div[data-v-1381f7e2]:hover{border:1px solid #fff;color:#fff\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li.zmiti-hover-company[data-v-1381f7e2]{border-bottom:1px solid #444;overflow:hidden;white-space:nowrap;text-overflow:ellipsis\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li.zmiti-hover-exit[data-v-1381f7e2]{border:1px solid #777;line-height:20px;margin-top:20px;cursor:pointer;text-align:center;color:#777;-webkit-transition:.1s;transition:.1s\n}\n.layout .ivu-layout-header>div.zmiti-user-info>span:last-of-type ul li.zmiti-hover-exit[data-v-1381f7e2]:hover{color:#fff;border-color:#fff\n}\n.layout .ivu-layout-header>div.zmiti-user-info div[data-v-1381f7e2]{min-width:50px;top:0;height:100%;cursor:pointer;text-align:center\n}\n.layout .ivu-layout-header>div.zmiti-user-info img[data-v-1381f7e2]{border-radius:50%;width:30px;vertical-align:middle\n}\n.layout .zmiti-user img[data-v-1381f7e2]{width:50px\n}\n.layout .zmiti-main-page[data-v-1381f7e2]{-webkit-flex:1;flex:1\n}\n.layout .zmiti-main-page .zmiti-unrole[data-v-1381f7e2]{display:flex;display:-webkit-flex;flex-flow:row;justify-content:center;height:100%;align-items:center\n}\n.layout .zmiti-main-page .zmiti-unrole img[data-v-1381f7e2]{width:400px\n}\n.layout .zmiti-main-page .zmiti-unrole>div[data-v-1381f7e2]:nth-of-type(2){margin-left:20px;font-size:20px;padding-top:100px;line-height:40px\n}\n.layout .zmiti-company-info[data-v-1381f7e2]{position:absolute;top:0;width:80%;text-align:center;left:10%;font-weight:bold\n}\n.layout .zmiti-company-info a[data-v-1381f7e2]{display:inline-block;width:30px;height:30px;vertical-align:middle;position:relative\n}\n.layout .zmiti-company-info a[data-v-1381f7e2]:before{content:\'\';position:absolute;width:0;height:0;top:4px;border-width:8px;border-style:solid;border-color:#fff transparent transparent transparent;left:5px;top:10px\n}\n.layout .zmiti-tab-C[data-v-1381f7e2]{background:#373d41;width:50px;position:absolute;z-index:18;overflow:hidden;-webkit-transition:width 0.2s 0.1s;transition:width 0.2s 0.1s;color:#fff\n}\n.layout .zmiti-tab-C.active[data-v-1381f7e2]{width:230px\n}\n.layout .zmiti-tab-C>div[data-v-1381f7e2]{width:230px;background:#373d41;border:1px solid #373d41\n}\n.layout .zmiti-tab-C ul>li[data-v-1381f7e2]{height:40px;line-height:40px;cursor:pointer;display:flex;display:-webkit-flex;flex-flow:row\n}\n.layout .zmiti-tab-C ul>li>div[data-v-1381f7e2]:nth-of-type(1){width:50px;text-align:center\n}\n.layout .zmiti-tab-C ul>li>div:nth-of-type(1) img[data-v-1381f7e2]{width:16px\n}\n.layout .zmiti-tab-C ul>li>div:nth-of-type(1) i[data-v-1381f7e2]{font-size:16px\n}\n.layout .zmiti-tab-C ul>li>div[data-v-1381f7e2]:nth-of-type(2){flex:1;-webkit-flex:1\n}\n.layout .zmiti-tab-C .zmiti-menu-title[data-v-1381f7e2]{font-size:14px;margin:6px 0;position:relative\n}\n.layout .zmiti-tab-C .zmiti-menu-title[data-v-1381f7e2]:hover{background:#00c1de\n}\n.layout .zmiti-tab-C .zmiti-menu-title[data-v-1381f7e2]:before,.layout .zmiti-tab-C .zmiti-menu-title[data-v-1381f7e2]:after{content:"";position:absolute;width:100%;height:1px;background:rgba(255,255,255,0.1);left:0;top:-6px\n}\n.layout .zmiti-tab-C .zmiti-menu-title[data-v-1381f7e2]:after{top:auto;bottom:-6px\n}\n.layout .zmiti-tab-C .zmiti-menu-item1[data-v-1381f7e2]{font-size:12px;margin-left:-1px;position:relative\n}\n.layout .zmiti-tab-C .zmiti-menu-item1.active[data-v-1381f7e2]{background:#00c1de !important\n}\n.layout .zmiti-tab-C .zmiti-menu-item1[data-v-1381f7e2]:hover{background:#192129\n}\n.layout .zmiti-tab-C .zmiti-menu-item1 a[data-v-1381f7e2]{position:relative;width:100%;height:100%;left:0;top:0\n}\n.layout .zmiti-tab-C a[data-v-1381f7e2]{display:block;width:100%;height:100%;color:inherit\n}\n.layout .zmiti-tab-C img[data-v-1381f7e2]{width:20px\n}\n.layout .ivu-layout-sider-children[data-v-1381f7e2]{overflow:hidden\n}\n.layout .layout-nav li>a[data-v-1381f7e2]{color:rgba(255,255,255,0.7)\n}\n.layout .layout-nav li>a[data-v-1381f7e2]:hover{color:#fff\n}\n.layout .layout-nav li>a.router-link-active[data-v-1381f7e2]{color:#fff\n}\n.layout .zmiti-main-layout[data-v-1381f7e2]{display:flex;display:-webkit-flex;flex-flow:row\n}\n.layout .symbin-main-menu[data-v-1381f7e2]{background:#333744 !important\n}\n.layout .symbin-main-menu li[data-v-1381f7e2]{position:relative\n}\n.layout .symbin-main-menu a[data-v-1381f7e2]{position:absolute;width:100%;height:100%;color:inherit;left:0;top:0;text-align:center;line-height:50px\n}\n.layout .symbin-main-menu a[data-v-1381f7e2]:hover{color:inherit\n}\n.layout i.ivu-icon-ionic[data-v-1381f7e2]{opacity:0\n}\n.layout .ivu-menu-item[data-v-1381f7e2]{text-indent:0em\n}\n.layout .ivu-menu-item>a>i[data-v-1381f7e2]{margin-right:6px\n}\n.layout .ivu-menu-submenu .ivu-menu-item[data-v-1381f7e2]{padding-left:10px !important\n}\n',""])},251:function(t,i,e){var n=e(252);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,e(6).default)("b1c9e44e",n,!1,{})},252:function(t,i,e){(t.exports=e(4)()).push([t.i,"\n.ivu-layout-header{\n   padding: 0 !important;\n}\n.ivu-layout{\n   position: relative;\n}\n",""])},253:function(t,i,e){var n=e(254);"string"==typeof n&&(n=[[t.i,n,""]]);e(12)(n,{});n.locals&&(t.exports=n.locals)},254:function(t,i,e){(t.exports=e(4)()).push([t.i,"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\r\n.sysbin-group-ui .ivu-menu-item > a {\r\n  color: #495060;\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li {\r\n  background: #d2d2d2;\r\n  border-top: 1px solid #D9DEE4;\r\n  -webkit-user-select: none;\r\n  cursor: pointer;\r\n  line-height: 50px;\r\n  text-indent: 3em;\r\n  position: relative;\r\n  /* &:hover{\r\n\t\t\t\tbackground: #F4F6F8;\r\n\t\t\t\t&>ol{\r\n\t\t\t\t\tbackground: #e2e2e2;\r\n\r\n\t\t\t\t}\r\n\t\t\t} */\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li a {\r\n  color: inherit;\r\n  display: block;\r\n  width: 100%;\r\n  height: 100%;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li.open:before {\r\n  content: '';\r\n  position: absolute;\r\n  left: 0;\r\n  top: 20px;\r\n  z-index: 10;\r\n  width: 0;\r\n  height: 0;\r\n  left: 1.5em;\r\n  border-left: 5px solid transparent;\r\n  border-right: 5px solid transparent;\r\n  border-top: 8px solid #000;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li.level1:before {\r\n  content: '';\r\n  position: absolute;\r\n  left: 1.6em;\r\n  top: 20px;\r\n  z-index: 10;\r\n  width: 0;\r\n  height: 0;\r\n  border-top: 5px solid transparent;\r\n  border-left: 8px solid #000;\r\n  border-bottom: 5px solid transparent;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li a.active {\r\n  background: #F4F6F8;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li ol {\r\n  overflow: hidden;\r\n  height: 100%;\r\n  -webkit-transition: 0.2s height;\r\n  transition: 0.2s height;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li ol.close {\r\n  height: 0;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li ol > li {\r\n  text-indent: 4em;\r\n}\r\n\r\n.sysbin-group-ui .symbin-tab-menu li.active {\r\n  background: #f2f2f2;\r\n  font-weight: bold;\r\n  color: #3390ff;\r\n}\r\n",""])},255:function(t,i,e){var n=e(256);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,e(6).default)("132ca206",n,!1,{})},256:function(t,i,e){(t.exports=e(4)()).push([t.i,"\n.zmiti-tab-ui{background:#fff\n}\n.zmiti-tab-ui .zmiti-tab-bar{width:180px;height:100%;background:#e2e2e2;position:absolute;left:0;top:0;z-index:14;overflow:hidden;-webkit-transition:.2s;transition:.2s\n}\n.zmiti-tab-ui .zmiti-tab-bar.hide{z-index:17;overflow:visible;-webkit-transform:translate3d(-180px, 0, 0);transform:translate3d(-180px, 0, 0)\n}\n.zmiti-tab-ui .zmiti-tab-bar.hide .zmiti-tab-btn{-webkit-transform:translate3d(25px, 0, 0);transform:translate3d(25px, 0, 0)\n}\n.zmiti-tab-ui .zmiti-tab-bar.hide .zmiti-tab-btn:hover{-webkit-transform:translate3d(25px, 0, 0);transform:translate3d(25px, 0, 0)\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-title{width:100%;height:70px;line-height:70px;text-align:center;font-weight:bold;background:#D9DEE4\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu-submenu-title,.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu-item{background:#EAEDF1 !important\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu .ivu-menu-submenu-title,.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-menu .ivu-menu .ivu-menu-item{background:#f4f6f8 !important\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn{width:50px;height:40px;position:absolute;z-index:10;top:50%;right:0;cursor:pointer;-webkit-transform-style:preserve-3d;transform-style:preserve-3d;perspective:800px;-webkit-perspective:800px;-webkit-transform:translate3d(5px, 0, 0);transform:translate3d(5px, 0, 0);-webkit-transition:.1s;transition:.1s\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn:hover{-webkit-transform:translate3d(0, 0, 0);transform:translate3d(0, 0, 0)\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn:after{content:'';position:absolute;width:100%;height:100%;background:#ccc;z-index:0;left:0;-webkit-transform-origin:right;transform-origin:right;-webkit-transform:rotateY(-55deg);transform:rotateY(-55deg)\n}\n.zmiti-tab-ui .zmiti-tab-bar .zmiti-tab-btn img{width:20px;position:absolute;z-index:2;left:25px;top:10px\n}\n.zmiti-tab-ui .zmiti-tab-content{position:absolute;height:100%;z-index:16;right:0;background:#f2f2f2\n}\n",""])},39:function(t,i,e){"use strict";e.d(i,"c",(function(){return m})),e.d(i,"h",(function(){return n})),e.d(i,"e",(function(){return o})),e.d(i,"a",(function(){return s})),e.d(i,"b",(function(){return l})),e.d(i,"d",(function(){return u})),e.d(i,"g",(function(){return d})),e.d(i,"f",(function(){return a}));var n={0:"财务类",1:"会员账号",2:"定制服务类",3:"产品技术类",4:"其它类"};let a={0:{status:"女"},1:{status:"男"}},o={0:{status:"已禁用"},1:{status:"已受理"},2:{status:"已处理"},3:{status:"已确认"},4:{status:"已评价"}},r=[{name:"全部",type:-1},{name:"图片",type:0},{name:"视频",type:1},{name:"音频",type:2},{name:"文本",type:3}],s=(t=3)=>[{name:"系统",icon:"&#xe611;",id:1},{name:"单位",icon:"&#xe612;",id:2},{name:"个人",icon:"&#xe613;",id:t,cateList:r.concat([])}],l={pdf:"&#xe665;",xls:"&#xe614;",xlsx:"&#xe614;",mp3:"&#xe7df;",ogg:"&#xe7df;",m4a:"&#xe7df;",doc:"&#xe63c;",docx:"&#xe63c;",mp4:"&#xe601;",webm:"&#xe601;",mov:"&#xe601;",flv:"&#xe601;",other:"&#xe606;"},u=[{name:"待审核",icon:"&#xe6bc;",color:"#fbec00"},{name:"审核通过",icon:"&#xe61b;",color:"#45b203"},{name:"拒绝",icon:"&#xe61e;",color:"#ff4664"},{name:"暂缓",icon:"&#xe61f;",color:"#ffce01"}],d=["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30"],m=["resourcelist","workorder","workorderlist","home","myself"]},778:function(t,i,e){"use strict";e.r(i);var n=e(0),a=e(2),o=e(39);let{userActions:r}=a.a;var s={props:["isAdmin"],name:"zmitiindex",data:()=>({defaultRolePages:o.c,imgs:window.imgs,showMenu:!1,showModifyPass:!1,viewH:document.documentElement.clientHeight,tabIndex:0,newpwd:"",oldpwd:"",isLead:a.a.getCurrentCompanyId().islead,userinfo:{info:{}},currentComapny:a.a.getCurrentCompanyId(),productList:[],kw:"",topMenu:[],defaultMenu:[],menus:[{name:"用户单位",link:"/company",icon:"&#xe605;",active:["user","company"]},{name:"产品管理",link:"/product",icon:"&#xe64c;",active:["product","productrole","adminchangyue","adminchangyuesetting","adminchangyuelog"]},{name:"新闻公告管理",link:"/news",icon:"&#xe667;",active:["news"]},{name:"财务管理",link:"/finance",icon:"&#xe600;",active:["finance"]},{name:"订单管理",link:"/order",icon:"&#xe60b;",active:["order"]},{name:"系统管理",link:"/admin",icon:"&#xe60f;",active:"basicconfig_admin_rolegroup_setrole_pv_form".split("_")}],pages:""}),components:{},beforeCreate(){},mounted(){("login"!==this.$route.name&&"register"!==this.$route.name||"passwordfind"!==this.$route.name)&&!this.isAdmin&&a.a.listener();var t=n.default.obserable,i=a.a[this.isAdmin?"getAdminUserInfo":"getUserInfo"]();this.userinfo=i||{info:{}};var e=this;t.on("loginError",()=>{this.$Modal.warning({title:"智小媒提醒您",content:"<p>您的帐号已在其他终端登录。</p> <p>如非本人操作，建议您重新登录后更改密码。</p>",onOk:()=>{window.localStorage.clear(),window.location.href=window.location.href.split("#")[0]}})}),t.on("getProduct",()=>{window.isAdmin||"login"===e.$route.name||"register"===e.$route.name||a.a.getProductList(t=>{0===t.getret&&(e.productList=t.list,n.default.productList=e.productList)},e)}),setTimeout(()=>{this.getUserRole()},100),setTimeout(()=>{t.trigger({type:"getProduct"})},100)},watch:{kw(t){n.default.obserable.trigger({type:"searchReport",data:t})}},methods:{getUserRole(){var{$route:t}=this;if(!this.isAdmin&&"login"!==t.name&&"register"!==t.name&&"passwordfind"!==t.name){var i=this;a.a.ajax({remark:"getUserRole",data:{action:r.getUserRole.action,companyid:a.a.getCurrentCompanyId().companyid},success(t){console.log(t),0===t.getret&&(i.pages=t.list.map(t=>t.pages).join(""))}})}},modifyPass(){var t=this;this.oldpwd?this.newpwd?a.a.ajax({remark:"userModifyPassword",data:{action:r.userModifyPassword.action,oldpwd:t.oldpwd,newpwd:t.newpwd},success(i){t.showModifyPass=!1,0===i.getret&&t.$Modal.success({title:"修改密码成功",content:"即将退出重新登录",onOk:()=>{window.localStorage.clear(),t.$router.push({path:"/login"})}})}}):this.$Message.error("新密码不能为空"):this.$Message.error("旧密码不能为空")},mouseout(){this.showMenu=!1},mouseover(){this.showMenu=!0},logout(){window.localStorage.clear(),window.location.hash="#/login"},tab(t){this.tabIndex=t}}},l=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"layout"},["login"!==t.$route.name&&"register"!==t.$route.name&&"passwordfind"!==t.$route.name?e("Layout",[e("Header",[e("div",[e("div",{staticClass:"zmiti-title"},[e("img",{attrs:{src:t.imgs.userLoginTitle,alt:""}}),t._v(" "),e("span",[t._v("v2.0")])])]),t._v(" "),e("div",[t.isAdmin?e("div",[t._v("管理端控制平台")]):e("div",[e("span",[e("router-link",{attrs:{to:"/home"}},[t._v("单位端控制平台")])],1),t._v(" "),e("div",{staticClass:"zmiti-company-info"},[t.currentComapny?e("span",{staticStyle:{margin:"0 10px 0 20px"}},[e("keep-alive",[e("span",[t._v("当前单位："+t._s(t.currentComapny.companyname))])]),t._v(" "),t.currentComapny.islead?e("span",{staticStyle:{"font-size":"12px","margin-left":"10px"}},[t._v(" (管理员)")]):t._e()],1):t._e(),t._v(" "),t.userinfo.info&&t.userinfo.info.company_list&&t.userinfo.info.company_list.length>1?e("router-link",{staticStyle:{"font-size":"12px",cursor:"pointer"},attrs:{to:"/login"}}):t._e()],1)])]),t._v(" "),e("div",{staticClass:"zmiti-user-info"},[t.isAdmin?[e("span",[e("router-link",{attrs:{to:"/resourcelist"}},[t._v("资源库")])],1),t._v(" "),e("span",[t._v("\n\t\t\t\t\t\t\t消息发布\n\t\t\t\t\t\t")]),t._v(" "),e("span",[e("router-link",{attrs:{to:t.isAdmin?"/unworkorder":"/workorderlist"}},[t._v("工单处理")])],1)]:[t.currentComapny.islead?e("span",[e("router-link",{attrs:{to:"/companyinfo"}},[t._v("单位管理")])],1):t._e(),t._v(" "),e("span",[e("router-link",{attrs:{to:"/resourcelist"}},[t._v("资源库")])],1),t._v(" "),e("span",[t._v("\n\t\t\t\t\t\t\t消息\n\t\t\t\t\t\t")]),t._v(" "),e("span",[e("router-link",{attrs:{to:"/workorderlist"}},[t._v("工单")])],1)],t._v(" "),e("span",{staticClass:"zmiti-user-avatar"},[t._v("\n \t\t\t\t\t\t"+t._s(t.userinfo.username)+"\n\t\t\t\t\t\t"),e("span",{staticClass:"zmt_iconfont",domProps:{innerHTML:t._s(t.userinfo.info&&t.userinfo.info.avatar||"&#xe6a4;")}}),t._v(" "),e("ul",[e("li",{staticClass:"zmiti-hover-username"},[t._v("\n\t\t\t\t\t\t\t\t"+t._s(t.userinfo.username||"无")+"\n\t\t\t\t\t\t\t")]),t._v(" "),e("li",{staticClass:"zmiti-hover-tab"},[e("div",[e("router-link",{attrs:{to:"/myself"}},[t._v("基本信息")])],1),t._v(" "),e("div",{on:{click:function(i){t.showModifyPass=!0}}},[t._v("安全管理")])]),t._v(" "),e("li",{staticClass:"zmiti-hover-company"},[e("span",{staticClass:"zmt_iconfont"},[t._v("")]),t._v(" "),e("span",{attrs:{title:t.currentComapny.companyname}},[t._v(t._s(t.currentComapny.companyname))])]),t._v(" "),e("li",{staticClass:"zmiti-hover-exit",on:{click:t.logout}},[t._v("\n\t\t\t\t\t\t\t\t退出平台\n\t\t\t\t\t\t\t")])])]),t._v(" "),t._e()],2)]),t._v(" "),e("Layout",{staticClass:"zmiti-main-layout",style:{height:t.viewH-50+"px"}},[e("div",{staticClass:"zmiti-tab-C",class:{active:t.showMenu},style:{height:t.viewH-50+"px"},on:{mouseover:t.mouseover,mouseout:t.mouseout}},[e("div",[e("keep-alive",[e("ul",[t.isAdmin?t._e():e("li",{staticClass:"zmiti-menu-title"},[e("div",[e("img",{attrs:{src:t.imgs.zmiti,alt:""}})]),e("div",[t._v(t._s(t.isAdmin?"系统管理":"产品与服务"))])]),t._v(" "),t._l(t.productList,(function(i,n){return e("li",{key:n,staticClass:"zmiti-text-overflow zmiti-menu-item1",class:{active:t.$route.name.indexOf(i.producturl.substring(1))>-1},attrs:{name:i.productid},on:{click:t.mouseout}},[e("div",[e("router-link",{attrs:{to:i.producturl+"/"+i.productid}},[e("span",{staticClass:"zmt_iconfont",domProps:{innerHTML:t._s(i.icon||"&#xe609;")}})])],1),t._v(" "),e("div",[e("router-link",{attrs:{to:i.producturl+"/"+i.productid}},[t._v(" "+t._s(i.productname)+" ")])],1)])})),t._v(" "),t.isAdmin?t._l(t.menus,(function(i,n){return e("li",{key:n,staticClass:"zmiti-menu-item1",class:{active:i.active.some((function(i){return i===t.$route.name}))},on:{click:t.mouseout}},[e("div",[e("router-link",{attrs:{to:i.link}},[e("span",{staticClass:"zmt_iconfont",domProps:{innerHTML:t._s(i.icon)}})])],1),t._v(" "),e("div",[e("router-link",{attrs:{to:i.link}},[t._v(t._s(i.name))])],1)])})):t._e()],2)])],1)]),t._v(" "),e("div",{staticStyle:{width:"50px",height:"100%"}}),t._v(" "),e("Layout",{staticClass:"zmiti-main-page",style:{height:t.viewH-50+"px"}},[t.isAdmin||t.isLead||t.pages.indexOf(t.$route.name)>-1||t.defaultRolePages.some((function(i){return i===t.$route.name}))?e("router-view"):e("div",{staticClass:"zmiti-unrole"},[e("div",[e("img",{attrs:{src:"./assets/images/icon-404.svg",alt:""}})]),t._v(" "),e("div",[e("div",[t._v("抱歉，您可能没权限浏览这张页面")]),t._v(" "),e("Button",{attrs:{type:"primary",to:"/home"}},[t._v("返回首页")])],1)])],1)],1)],1):e("div",[e("router-view")],1),t._v(" "),e("Modal",{attrs:{title:"修改密码"},on:{"on-ok":t.modifyPass},model:{value:t.showModifyPass,callback:function(i){t.showModifyPass=i},expression:"showModifyPass"}},[e("Form",[e("FormItem",{attrs:{label:"原始密码：","label-width":100}},[e("Input",{on:{"on-keydown":function(i){return i.type.indexOf("key")||13===i.keyCode?t.modifyPass(i):null}},model:{value:t.oldpwd,callback:function(i){t.oldpwd=i},expression:"oldpwd"}})],1),t._v(" "),e("FormItem",{attrs:{label:"新密码：","label-width":100}},[e("Input",{on:{"on-keydown":function(i){return i.type.indexOf("key")||13===i.keyCode?t.modifyPass(i):null}},model:{value:t.newpwd,callback:function(i){t.newpwd=i},expression:"newpwd"}})],1)],1)],1)],1)};l._withStripped=!0;var u=e(3),d=!1;var m=function(t){d||(e(249),e(251))},p=Object(u.a)(s,l,[],!1,m,"data-v-1381f7e2",null);p.options.__file="common\\main\\index.vue";i.default=p.exports},791:function(t,i,e){"use strict";e.r(i);e(253);var n=e(2),a=e(0),o=e(248),r=e(5);a.default.component("Tab",e(248).default);var s={props:["isAdmin"],data:()=>({tabIndex:[0,-1,-1],theme2:"light",menuObj:{},tabs:[]}),components:{Tab:o.default},watch:{$route:{deep:!0,handler(){this.changeGroup()}}},mounted(){var t=a.default.obserable;this.changeGroup(),n.a.isCompanyLeader()||this.menuObj.tabs.forEach((t,i)=>{"/changyuecompany"===t.link&&this.menuObj.tabs.splice(i,1)}),t.on("fillTabs",t=>{this.tabs=t||[]}),t.on("fillTabIndex",t=>{-1!==t[2]&&(this.tabs[t[2]].status=!0),t.length=2,this.tabIndex=t})},beforeDestory(){},beforeCreate(){},methods:{mouseover(t){"A"===t.target.nodeName&&t.target.classList.add("active")},mouseout(t){"A"===t.target.nodeName&&t.target.classList.remove("active")},checkActive(t){t.forEach(t=>{t.children&&(t.status=t.children.some(t=>t.link.substring(1)===this.$route.name))})},changeGroup(){for(var t in r.a)r.a[t].keys.forEach((i,e)=>{i===this.$route.name&&(this.menuObj=r.a[t],this.tabs=this.menuObj.tabs,this.checkActive(this.tabs))})},tab1(t,i){i&&i.length?(this.tabs[t].status=!this.tabs[t].status,this.tabs=this.tabs.concat([])):this.tabIndex=[t,-1],window.lastRouteName===this.$route.name&&!i&&a.default[this.$route.name]&&a.default[this.$route.name](),window.lastRouteName=this.$route.name},tab2(t,i){this.tabIndex=[t,i],window.lastRouteName===this.$route.name&&a.default[this.$route.name]&&a.default[this.$route.name](),window.lastRouteName=this.$route.name}}},l=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"sysbin-group-ui"},[e("Tab",{attrs:{title:t.menuObj.title,tabs:t.tabs,tabIndex:t.tabIndex}},[e("div",{attrs:{slot:"zmiti-tab-menu"},slot:"zmiti-tab-menu"},[e("ul",{staticClass:"symbin-tab-menu"},t._l(t.tabs,(function(i,n){return e("li",{key:n,class:{active:!i.children&&i.link.substring(1)===t.$route.name&&!i.children,level1:i.children&&!i.status,open:i.status||i.children&&i.children.some((function(i){return i.link.substring(1)===t.$route.name}))},on:{mouseover:t.mouseover,mouseout:t.mouseout,click:function(e){return e.stopPropagation(),e.preventDefault(),t.tab1(n,i.children)}}},[i.children&&i.children.length>0?t._e():e("div",[e("router-link",{attrs:{to:i.link}},[t._v(t._s(i.name))])],1),t._v(" "),i.children&&i.children.length>0?e("div",[t._v("\n\t\t\t\t\t\t"+t._s(i.name)+"\n\t\t\t\t\t")]):t._e(),t._v(" "),i.children?e("ol",{style:{height:(i.status?50*i.children.length:0)+"px"}},t._l(i.children,(function(i,a){return e("li",{key:a,class:{active:t.$route.name===i.link.substring(1)},on:{mouseover:t.mouseover,mouseout:t.mouseout,click:function(i){return i.stopPropagation(),i.preventDefault(),t.tab2(n,a)}}},[i.link?e("div",[e("router-link",{attrs:{to:i.link}},[t._v(t._s(i.name))])],1):t._e(),t._v(" "),i.link?t._e():e("div",[t._v(t._s(i.name))])])})),0):t._e()])})),0)])])],1)};l._withStripped=!0;var u=e(3),d=Object(u.a)(s,l,[],!1,null,null,null);d.options.__file="common\\group\\index.vue";i.default=d.exports}}]);