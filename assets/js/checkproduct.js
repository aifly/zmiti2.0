(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{39:function(i,t,a){"use strict";a.d(t,"c",(function(){return c})),a.d(t,"h",(function(){return e})),a.d(t,"e",(function(){return o})),a.d(t,"a",(function(){return m})),a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return d})),a.d(t,"g",(function(){return u})),a.d(t,"f",(function(){return n}));var e={0:"财务类",1:"会员账号",2:"定制服务类",3:"产品技术类",4:"其它类"};let n={0:{status:"女"},1:{status:"男"}},o={0:{status:"已禁用"},1:{status:"已受理"},2:{status:"已处理"},3:{status:"已确认"},4:{status:"已评价"}},s=[{name:"全部",type:-1},{name:"图片",type:0},{name:"视频",type:1},{name:"音频",type:2},{name:"文本",type:3}],m=(i=3)=>[{name:"系统",icon:"&#xe611;",id:1},{name:"单位",icon:"&#xe612;",id:2},{name:"个人",icon:"&#xe613;",id:i,cateList:s.concat([])}],r={pdf:"&#xe665;",xls:"&#xe614;",xlsx:"&#xe614;",mp3:"&#xe7df;",ogg:"&#xe7df;",m4a:"&#xe7df;",doc:"&#xe63c;",docx:"&#xe63c;",mp4:"&#xe601;",webm:"&#xe601;",mov:"&#xe601;",flv:"&#xe601;",other:"&#xe606;"},d=[{name:"待审核",icon:"&#xe6bc;",color:"#fbec00"},{name:"审核通过",icon:"&#xe61b;",color:"#45b203"},{name:"拒绝",icon:"&#xe61e;",color:"#ff4664"},{name:"暂缓",icon:"&#xe61f;",color:"#ffce01"}],u=["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30"],c=["resourcelist","workorder","workorderlist","home","myself"]},613:function(i,t,a){var e=a(614);"string"==typeof e&&(e=[[i.i,e,""]]),e.locals&&(i.exports=e.locals);(0,a(6).default)("822c4350",e,!1,{})},614:function(i,t,a){(i.exports=a(4)()).push([i.i,'\n.zmiti-submit-main-ui[data-v-7b600605]{background:#f2f2f2;box-sizing:border-box;height:100%;width:99%;margin:0 auto\n}\n.zmiti-pager[data-v-7b600605]{margin:0px auto;width:98%;padding:10px 0;background:#eee;display:flex;display:-webkit-flex;flex-flow:row;justify-content:center;-webkit-justify-content:center;border:1px solid #dcdee2;border-top:none\n}\n.zmiti-submit-main-ui .zmiti-cy-tag[data-v-7b600605]{color:red\n}\n.zmiti-submit-main-ui .zmiti-avatar-list[data-v-7b600605]{display:flex;display:-webkit-flex;flex-flow:row\n}\n.zmiti-submit-main-ui .zmiti-avatar-list span[data-v-7b600605]{font-size:40px;margin-right:20px;cursor:pointer\n}\n.zmiti-submit-main-ui .zmiti-avatar-list span.active[data-v-7b600605]{color:#3390ff\n}\n.zmiti-submit-main-ui .ivu-table-wrapper[data-v-7b600605]{border-bottom:none;border-right:none\n}\n.zmiti-submit-main-ui .zmiti-list-main[data-v-7b600605]{box-sizing:border-box;background:#fff;margin:0 auto;flex:2;-webkit-flex:2;position:relative;top:5px;display:flex;display:-webkit-flex;flex-flow:column\n}\n.zmiti-submit-main-ui .zmiti-list-main[data-v-7b600605]:before{content:"";position:absolute;width:100%;height:100%;left:0;top:0;box-shadow:0 0 0 1px #ccc\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-add-form-close[data-v-7b600605]{z-index:100\n}\n.zmiti-submit-main-ui .zmiti-list-main>div[data-v-7b600605]{margin:10px auto 10px;position:relative;flex:1;-webkit-flex:1\n}\n.zmiti-submit-main-ui .zmiti-list-main>div .zmiti-meet-form[data-v-7b600605]{width:100%;margin:0px auto;padding:20px 40px;height:600px;overflow:auto\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-list-where[data-v-7b600605]{width:98%;margin:10px auto 0;height:40px;line-height:40px;font-size:14px;position:relative;z-index:10\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-list-where input[data-v-7b600605]{height:30px\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-submit-main[data-v-7b600605]{flex:5;-webkit-flex:5;width:100%\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-submit-main>div[data-v-7b600605]{-webkit-transition:.3s;transition:.3s\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-submit-main .zmiti-submit-table[data-v-7b600605]{width:98%;margin:0 auto\n}\n.zmiti-submit-main-ui .lt-full[data-v-7b600605]{position:fixed !important;background:rgba(0,0,0,0.5);z-index:1001;overflow:hidden\n}\n.zmiti-submit-main-ui .lt-full .zmiti-left-pannel[data-v-7b600605]{position:absolute;width:100%;height:100px;left:0;top:0;z-index:10\n}\n.zmiti-submit-main-ui .zmiti-add-form[data-v-7b600605]{flex:1;-webkit-flex:1;width:500px;overflow:auto;position:absolute !important;top:0;right:0;z-index:100;height:100%;position:relative;box-shadow:0 0 0 1px #ccc;box-sizing:border-box;background:#f9f9f9\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content[data-v-7b600605]{display:flex;display:-webkit-flex;flex-flow:row;-webkit-align-items:center;align-items:center;margin-top:30px;justify-content:space-around;-webkit-justify-content:space-around;border:1px dashed #ccc;padding:10px 0\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content>div[data-v-7b600605]:nth-of-type(1){text-align:center;width:120px;font-weight:bold\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content>div[data-v-7b600605]:nth-of-type(2){flex:1;-webkit-flex:1\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content>div[data-v-7b600605]:nth-of-type(3){width:80px;cursor:pointer;text-align:center;color:#06c\n}\n.zmiti-submit-main-ui .zmiti-add-form.detail-enter-active[data-v-7b600605],.zmiti-submit-main-ui .zmiti-add-form.detail-leave-active[data-v-7b600605]{-webkit-transition:.2s;transition:.2s\n}\n.zmiti-submit-main-ui .zmiti-add-form.detail-enter[data-v-7b600605],.zmiti-submit-main-ui .zmiti-add-form.detail-leave-to[data-v-7b600605]{-webkit-transform:translateX(100%);transform:translateX(100%)\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-submit-avatar[data-v-7b600605]{background:rgba(51,144,255,0.1);border-radius:50%;text-align:center;width:80px;height:80px;line-height:80px;margin:0 auto 30px;cursor:pointer;position:relative\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-submit-avatar label[data-v-7b600605]{position:absolute;bottom:-50px;font-size:12px;width:100%;text-align:center;left:0\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-submit-avatar span[data-v-7b600605]{font-size:40px;color:rgba(51,144,255,0.8)\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-C[data-v-7b600605]{margin:10px auto 2px;width:90%\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item[data-v-7b600605]{line-height:50px;height:50px\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-7b600605]{text-align:center;position:relative;z-index:10\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-7b600605]{margin:0 20px;padding:2px 20px\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item input[data-v-7b600605]{padding-left:6px;height:32px;width:70%;border:1px solid #d8d8d8;outline:none\n}\n.ivu-icon-ios-help-circle[data-v-7b600605]{left:25px\n}\n.ivu-radio-inner[data-v-7b600605]:after{border-radius:10px !important\n}\n',""])},759:function(i,t,a){"use strict";a.r(t);var e=a(2),n=a(10),o=a(9),{companyActions:s,zmitiActions:m,changYueAcions:r,formatDate:d}=(a(39),e.a),u={props:["obserable"],name:"zmitiindex",data:()=>({targetKeys:[],showAvatarModal:!1,companyname:"",roleList:[],imgs:window.imgs,isLoading:!1,showDetail:!1,total:0,showDetailPage:-1,currentClassId:-1,adminuserId:"",loading:!0,currentUserid:"",formUser:{isover:0,usersign:1,usertypesign:1,avatar:"&#xe6a4;"},address:"",showPass:!1,showMap:!1,viewH:window.innerHeight,viewW:window.innerWidth,dataSource:[],groupList:[],companyList:[],hideMenu:!1,unJoinedCompany:[],columns:[{title:"产品编号",key:"productid",align:"center"},{title:"产品名称",key:"productname",align:"center"},{title:"开始时间",key:"startdate",align:"center",width:220,render:(i,t)=>i("div",{},d(t.row.startdate))},{title:"结束时间",key:"enddate",width:220,render:(i,t)=>i("div",{},d(t.row.enddate))}],formUser:{pdfurl:"",longitude:"116.585856",latitude:"40.364989"},directoryList:{},condition:{page_index:0,page_size:10},userinfo:{}}),components:{ZmitiMask:n.a,ZmitiTable:o.a},beforeCreate(){},mounted(){window.s=this,this.getDataList()},watch:{showDetail(i){i?this.showDetailPage=1:setTimeout(()=>{this.showDetailPage=-1},310)},$route:{deep:!0,handler(){this.getDataList()}}},methods:{change(i){this.condition.page_index=i-1,this.getMyCheckList()},closeMaskPage(){this.showDetailPage=-1},handleChange2(i,t,a){var n=this;a.forEach((i,a)=>{e.a.adminAjax({remark:"left"===t?"exitCompany":"joinCompany",data:{action:s["left"===t?"exitCompany":"joinCompany"].action,userid:n.currentUserid,companyid:i},success(i){n.$Message[0===i.getret?"success":"error"](i.msg),n.getJoinedCompany()}})})},filterMethod:(i,t)=>i.label.indexOf(t)>-1,getJoinedCompany(){var i=this;e.a.adminAjax({remark:"getJoinedCompany",data:{action:s.getJoinedCompany.action,condition:{userid:i.currentUserid,page_index:0,page_size:20}},success(t){0===t.getret&&(i.targetKeys=[],t.list.forEach(t=>{i.targetKeys.push(t.companyid)}))}})},checkUser(){var i=this.formUser.username,{$Message:t}=this;e.a.adminAjax({remark:"checkUserName",data:{action:m.checkUserName.action,username:i},success(i){t[0===i.getret?i.used?"error":"success":"error"](i.msg)}})},getAvatar(i){this.formUser.avatar=i},delete(i){var t=this;e.a.ajax({remark:"delManuscript",data:{action:r.delManuscript.action,condition:{manuscriptids:i}},success(i){t.$Message[0===i.getret?"success":"error"](i.msg),0===i.getret&&t.getDataList()}})},change(i){this.condition.page_index=i-1,this.getDataList()},getDataList(){e.a.getProductList(i=>{0===i.getret&&(this.loading=!1,this.dataSource=i.list)},this)}}},c=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("div",{staticClass:"zmiti-submit-main-ui"},[a("div",{staticClass:"zmiti-list-main"},[a("header",{staticClass:"zmiti-tab-header"},[a("div",[i.companyname?a("span",[i._v(i._s(i.companyname)+" —— ")]):i._e(),i._v("单位授权")]),i._v(" "),a("div",[a("Button",{attrs:{loading:i.loading,type:"primary"},on:{click:function(t){return i.getDataList()}}},[i._v("刷新")])],1)]),i._v(" "),i._m(0),i._v(" "),a("div",{staticClass:"zmiti-submit-main zmiti-scroll ",style:{height:i.viewH-180+"px"}},[a("ZmitiTable",{attrs:{loading:i.loading,dataSource:i.dataSource,columns:i.columns,change:i.change,"page-size":i.condition.page_size,total:i.total}})],1)])])};c._withStripped=!0;var l=a(3),p=!1;var b=function(i){p||a(613)},f=Object(l.a)(u,c,[function(){var i=this.$createElement,t=this._self._c||i;return t("section",{staticClass:"zmiti-list-where"},[this._v("\n\t\t\t用户编号 "),t("input",{attrs:{type:"text"}})])}],!1,b,"data-v-7b600605",null);f.options.__file="components\\checkproduct\\index.vue";t.default=f.exports}}]);