(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{135:function(i,t,a){"use strict";a.r(t);var n=a(0),e=a(7),o=a(6),r=n.a.weatherActions,d=n.a.adminActions,m={props:["obserable"],name:"zmitiindex",data(){return{tabIndex:[0,-1],showAvatarModal:!1,visible:!1,avatarList:["&#xe6a5;","&#xe6a4;","&#xe6a3;","&#xe6a2;","&#xe6a0;"],roleList:[],imgs:window.imgs,isLoading:!1,showDetail:!1,showDetailPage:-1,currentClassId:-1,adminuserId:"",currentUserid:"",formAdmin:{isover:0,avatar:"&#xe6a4;"},address:"",showPass:!1,showMap:!1,viewH:window.innerHeight,viewW:window.innerWidth,companyList:[],adminList:[],groupList:[],hideMenu:!1,roleCol:[{title:"产品名称",key:"productname",align:"center"},{title:"访问权限",key:"role",align:"center",render:(i,t)=>(console.log(t.row),i("Checkbox",{props:{checked:!0,value:1===t.row.authstatus},on:{"on-change":i=>{n.a.ajax({url:window.config.baseUrl+"admin/setuserauth",data:{setuserid:this.currentUserid,productids:t.row.productid,isdel:1===t.row.authstatus?1:2}})}}},"访问权限"))}],columns:[{title:"管理员名称",key:"adminusername",align:"center"},{title:"真实姓名",key:"realname",align:"center"},{title:"邮箱",key:"adminemail",align:"center"},{title:"电话",key:"adminmobile",align:"center"},{title:"所在组",key:"groupname",align:"center"},{title:"操作",key:"action",align:"center",width:200,render:(i,t)=>i("div",[i("span",{style:{border:"none",fontSize:"12px",cursor:"pointer",color:"#06C"},on:{click:()=>{this.visible=!0;var i=this;this.currentUserid=t.row.userid,n.a.ajax({url:window.config.baseUrl+"admin/getuserauth",data:{setuserid:t.row.userid},success(t){i.roleList=t.list,console.log(t)}})}}},"权限设置"),i("span",{props:{type:"primary",size:"small"},style:{margin:"2px 10px",border:"none",fontSize:"12px",cursor:"pointer",color:"#06C"},on:{click:()=>{var i=this;i.showDetail=!0,i.formAdmin=t.row,i.adminuserId=t.row.adminuserid,i.showDetailPage=1}}},"详情"),i("Poptip",{props:{confirm:!0,title:"确定要删除吗？"},on:{"on-ok":()=>{this.delAdmin(t.row.adminuserid)}}},[i("span",{props:{type:"error",size:"small"},style:{cursor:"pointer",color:"#06C"},on:{click:()=>{}}},"删除")])])}],formcompany:{pdfurl:"",longitude:"116.585856",latitude:"40.364989"},companyList:[],directoryList:{},condition:{page_index:0,page_size:10},userinfo:{}}},components:{Avatar:e.a,ZmitiMask:o.a},beforeCreate(){},mounted(){window.s=this,this.userinfo=n.a.getAdminUserInfo(),this.getAdminList(),this.getWeatherData()},watch:{showDetail(i){i?this.showDetailPage=1:setTimeout(()=>{this.showDetailPage=-1},310)}},methods:{focus:i=>(i.preventDefault(),!1),closeMaskPage(){this.showDetailPage=-1},getWeatherData(){n.a.adminAjax({remark:"viewTrafficdata",_ui:{type:1},data:{action:r.viewTrafficdata.action,info:{cityid:2}},success(i){console.log(i)}})},getAvatar(i){this.formAdmin.avatar=i},initPassword(){var{$Message:i}=this;n.a.adminAjax({data:{action:d.modifyAdminPassword.action,adminuserid:this.formAdmin.adminuserid,adminpwd:window.config.defaultPass},success(t){i[0===t.getret?"success":"error"](t.msg),t.getret}})},addAdmin(){this.showDetail=!0,this.adminuserId="",this.formAdmin={isover:0,avatar:"&#xe6a4;"},this.showDetailPage=1},delAdmin(i){var t=this;n.a.adminAjax({remark:"delAdmin",data:{action:d.delAdmin.action,adminuserid:i},success(i){t.$Message[0===i.getret?"success":"error"](i.msg),0===i.getret&&t.getAdminList()}})},help(){n.a.adminAjax({remark:"getAdminList",data:{action:d.getAdminList.action,condition:this.condition},success(i){0===i.getret&&(s.adminList=i.list,n.a.adminAjax({remark:"getGroupList",data:{action:d.getGroupList.action,condition:this.condition},success(i){0===i.getret&&(s.groupList=i.list)}}))}})},getAdminList(){var i=this;if("function"!=typeof window.Promise)return this.help(),void console.log("当前浏览器不支持Promise");var t=new Promise((t,a)=>{n.a.adminAjax({remark:"getAdminList",data:{action:d.getAdminList.action,condition:this.condition},success(a){0===a.getret&&(i.adminList=a.list,t())}})}),a=new Promise((t,a)=>{n.a.adminAjax({remark:"getGroupList",data:{action:d.getGroupList.action,condition:this.condition},success(a){0===a.getret&&(i.groupList=a.list,console.log(i.groupList,"groupList"),t())}})});Promise.all([t,a]).then(()=>{i.adminList.map((t,a)=>{i.groupList.map((i,a)=>{t.groupid==i.id&&(t.groupname=i.groupname)})}),i.adminList=i.adminList.concat([])})},adminAction(){var i=this,t=this.adminuserId?d.editAdminUser.action:d.addAdminUser.action;n.a.adminAjax({remark:this.adminuserId?"editAdminUser":"addAdminUser",data:{action:t,info:this.formAdmin},success(t){i.$Message[0===t.getret?"success":"error"](t.msg),0===t.getret&&(i.showDetail=!1,i.getAdminList())}})}}},l=function(){var i=this,t=i.$createElement,a=i._self._c||t;return a("div",{staticClass:"zmiti-admin-main-ui"},[a("div",{staticClass:"zmiti-list-main"},[a("header",{staticClass:"zmiti-tab-header"},[a("div",[i._v("管理员管理")]),i._v(" "),a("div",[a("Button",{attrs:{type:"primary"},on:{click:i.addAdmin}},[i._v("新增管理员")])],1)]),i._v(" "),i._m(0),i._v(" "),a("div",{staticClass:"zmiti-admin-main zmiti-scroll ",style:{height:i.viewH-180+"px"}},[a("div",{staticClass:"zmiti-admin-table",class:{active:i.showDetail}},[a("Table",{attrs:{data:i.adminList,columns:i.columns}})],1)]),i._v(" "),(i.showDetail,i._e())]),i._v(" "),a("ZmitiMask",{on:{closeMaskPage:i.closeMaskPage},model:{value:i.showDetailPage,callback:function(t){i.showDetailPage=t},expression:"showDetailPage"}},[a("div",{attrs:{slot:"mask-content"},slot:"mask-content"},[a("transition",{attrs:{name:"detail"}},[a("section",{staticClass:"zmiti-add-form zmiti-scroll"},[a("header",{staticClass:"zmiti-add-header"},[a("img",{attrs:{src:i.imgs.back,alt:""},on:{click:function(t){i.showDetail=!1}}}),i._v(" "),a("span",[i._v("基础信息")])]),i._v(" "),a("div",{staticClass:"zmiti-admin-avatar",on:{click:function(t){i.showAvatarModal=!0}}},[a("span",{staticClass:"zmt_iconfont",domProps:{innerHTML:i._s(i.formAdmin.avatar)}}),i._v(" "),a("label",[i._v("更换头像")])]),i._v(" "),a("Form",{staticClass:"zmiti-add-form-C",attrs:{model:i.formAdmin,"label-width":80}},[a("FormItem",{attrs:{label:"用户名："}},[a("Input",{attrs:{placeholder:"用户名："},model:{value:i.formAdmin.adminusername,callback:function(t){i.$set(i.formAdmin,"adminusername",t)},expression:"formAdmin.adminusername"}})],1),i._v(" "),a("FormItem",{attrs:{label:"真实姓名："}},[a("Input",{attrs:{name:(new Date).getTime()+"",autocomplete:"on",placeholder:"真实姓名："},model:{value:i.formAdmin.realname,callback:function(t){i.$set(i.formAdmin,"realname",t)},expression:"formAdmin.realname"}})],1),i._v(" "),i.adminuserId?i._e():a("FormItem",{attrs:{label:"密码："}},[a("Input",{attrs:{type:"password",autocomplete:"on",name:(new Date).getTime()+"",placeholder:"密码："},on:{"on-focus":function(t){return i.focus(t)}},model:{value:i.formAdmin.adminpwd,callback:function(t){i.$set(i.formAdmin,"adminpwd",t)},expression:"formAdmin.adminpwd"}}),i._v(" "),a("input",{directives:[{name:"model",rawName:"v-model",value:i.formAdmin.adminpwd,expression:"formAdmin.adminpwd"}],staticClass:"zmiti-hidepass",domProps:{value:i.formAdmin.adminpwd},on:{input:function(t){t.target.composing||i.$set(i.formAdmin,"adminpwd",t.target.value)}}})],1),i._v(" "),a("FormItem",{attrs:{label:"邮箱："}},[a("Input",{attrs:{placeholder:"邮箱："},model:{value:i.formAdmin.adminemail,callback:function(t){i.$set(i.formAdmin,"adminemail",t)},expression:"formAdmin.adminemail"}})],1),i._v(" "),a("FormItem",{attrs:{label:"电话："}},[a("Input",{attrs:{placeholder:"电话："},model:{value:i.formAdmin.adminmobile,callback:function(t){i.$set(i.formAdmin,"adminmobile",t)},expression:"formAdmin.adminmobile"}})],1),i._v(" "),a("FormItem",{attrs:{label:"所在组："}},[a("Select",{model:{value:i.formAdmin.groupid,callback:function(t){i.$set(i.formAdmin,"groupid",t)},expression:"formAdmin.groupid"}},i._l(i.groupList,function(t){return a("Option",{key:t.id,attrs:{value:t.id}},[i._v(i._s(t.groupname))])}),1)],1),i._v(" "),a("FormItem",{attrs:{label:"状态："}},[a("RadioGroup",{model:{value:i.formAdmin.isover,callback:function(t){i.$set(i.formAdmin,"isover",t)},expression:"formAdmin.isover"}},[a("Radio",{attrs:{value:1,label:1}},[i._v("正常")]),i._v(" "),a("Radio",{attrs:{value:0,label:0}},[i._v("禁用")])],1)],1),i._v(" "),a("FormItem",{attrs:{label:"备注："}},[a("Input",{attrs:{placeholder:"备注："},model:{value:i.formAdmin.admincomment,callback:function(t){i.$set(i.formAdmin,"admincomment",t)},expression:"formAdmin.admincomment"}})],1)],1),i._v(" "),a("div",{staticClass:"zmiti-add-form-item zmiti-add-btns"},[a("Button",{attrs:{size:"large",type:"primary"},on:{click:i.adminAction}},[i._v(i._s(i.adminuserId?"保存":"确定"))])],1),i._v(" "),i.formAdmin.adminuserid?[a("header",{staticClass:"zmiti-add-header zmiti-safe-bar"},[a("span",[i._v("安全信息")])]),i._v(" "),a("div",{staticClass:"zmiti-safe-content"},[a("div",[i._v("密码初始化")]),i._v(" "),a("div",[i._v("点击右侧初始化按钮，系统将会把密码初始化为：123456。首次登录需更新密码")]),i._v(" "),a("div",[a("Poptip",{attrs:{confirm:"",title:"确定要初始化吗?"},on:{"on-ok":i.initPassword}},[a("span",[i._v("初始化")])])],1)])]:i._e()],2)])],1)]),i._v(" "),a("Modal",{attrs:{title:"权限设置"},model:{value:i.visible,callback:function(t){i.visible=t},expression:"visible"}},[a("Table",{attrs:{data:i.roleList,columns:i.roleCol}})],1),i._v(" "),a("Avatar",{attrs:{avatar:i.formAdmin.avatar},on:{getAvatar:i.getAvatar},model:{value:i.showAvatarModal,callback:function(t){i.showAvatarModal=t},expression:"showAvatarModal"}})],1)};l._withStripped=!0;var c=a(1),u=!1;var p=function(i){u||a(80)},v=Object(c.a)(m,l,[function(){var i=this.$createElement,t=this._self._c||i;return t("section",{staticClass:"zmiti-list-where"},[this._v("\n\t\t\t管理员编号 "),t("input",{attrs:{type:"text"}})])}],!1,p,"data-v-746bbd4c",null);v.options.__file="admin\\admin\\index.vue";t.default=v.exports},33:function(i,t,a){var n=a(34);"string"==typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);(0,a(4).default)("61f6dc8c",n,!1,{})},34:function(i,t,a){(i.exports=a(2)()).push([i.i,"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.zmiti-mask-ui[data-v-bc775556] {\n  position: fixed;\n  z-index: 1002;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  left: 0;\n  top: 0;\n}\n.zmiti-mask-ui .zmiti-mask-right[data-v-bc775556] {\n    position: absolute;\n    background: #fff;\n    top: 50px;\n    right: 0;\n    overflow: auto;\n    z-index: 10;\n}\n.zmiti-mask-ui .zmiti-mask-right.right-enter-active[data-v-bc775556], .zmiti-mask-ui .zmiti-mask-right.right-leave-active[data-v-bc775556] {\n      -webkit-transition: 0.2s;\n      transition: 0.2s;\n}\n.zmiti-mask-ui .zmiti-mask-right.right-leave-to[data-v-bc775556], .zmiti-mask-ui .zmiti-mask-right.right-enter[data-v-bc775556] {\n      -webkit-transform: translate3d(600px, 0, 0);\n      transform: translate3d(600px, 0, 0);\n}\n.zmiti-mask-ui .lt-full[data-v-bc775556] {\n    z-index: 8;\n    height: 100%;\n}\n",""])},37:function(i,t,a){var n=a(38);"string"==typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);(0,a(4).default)("a75f7b58",n,!1,{})},38:function(i,t,a){(i.exports=a(2)()).push([i.i,"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.zmiti-avatar-list[data-v-e6b7be7c] {\n  display: flex;\n  display: -webkit-flex;\n  flex-flow: row;\n}\n.zmiti-avatar-list span[data-v-e6b7be7c] {\n    font-size: 40px;\n    margin-right: 20px;\n    cursor: pointer;\n}\n.zmiti-avatar-list span.active[data-v-e6b7be7c] {\n      color: #3390ff;\n}\n",""])},6:function(i,t,a){"use strict";var n={props:{value:{type:Number,default:function(){return-1}},width:{type:Number,default:function(){return 500}}},watch:{value(i){this.showPannel=i>-1}},data:()=>({viewH:window.innerHeight,showPannel:!0}),methods:{hidePannel(){this.showPannel=!1},afterLeave(){this.$emit("input",!1),this.$emit("closeMaskPage")}},mounted(){}},e=function(){var i=this,t=i.$createElement,a=i._self._c||t;return i.value>-1?a("div",{staticClass:"zmiti-mask-ui lt-full"},[a("transition",{attrs:{name:"right"},on:{"after-leave":i.afterLeave}},[i.showPannel?a("div",{staticClass:"zmiti-mask-right zmiti-scroll",style:{height:i.viewH-50+"px",width:i.width+"px"}},[i._t("mask-content")],2):i._e()]),i._v(" "),a("div",{staticClass:"lt-full",on:{click:i.hidePannel}})],1):i._e()};e._withStripped=!0;var o=a(1),s=!1;var r=function(i){s||a(33)},d=Object(o.a)(n,e,[],!1,r,"data-v-bc775556",null);d.options.__file="common\\mask\\index.vue";t.a=d.exports},7:function(i,t,a){"use strict";var n={props:{value:{type:Boolean},avatar:{type:String,default:""}},watch:{value(i){i||(this.chooseAvatar(),this.show=!1),this.show=i}},methods:{chooseAvatar(){this.$emit("getAvatar",this.avatarList[this.index]),this.$emit("input",!1)},closeModal(i){i||(this.chooseAvatar(),this.show=!1),this.show=i}},data:()=>({show:!0,index:-1,avatarList:["&#xe6a5;","&#xe6a4;","&#xe6a3;","&#xe6a2;","&#xe6a0;"]}),mounted(){this.avatarList.forEach((i,t)=>{i===this.avatar&&(this.index=t)})}},e=function(){var i=this,t=i.$createElement,a=i._self._c||t;return i.value?a("div",[a("Modal",{attrs:{title:"更换头像",transfer:!1,"mask-closable":!1},on:{"on-visible-change":i.closeModal},model:{value:i.show,callback:function(t){i.show=t},expression:"show"}},[a("div",{attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"primary"},on:{click:i.chooseAvatar}},[i._v("确定")])],1),i._v(" "),a("div",{staticClass:"zmiti-avatar-list"},i._l(i.avatarList,function(t,n){return a("span",{key:n,staticClass:"zmt_iconfont",class:{active:i.index===n},domProps:{innerHTML:i._s(t)},on:{click:function(t){i.index=n}}})}),0)])],1):i._e()};e._withStripped=!0;var o=a(1),s=!1;var r=function(i){s||a(37)},d=Object(o.a)(n,e,[],!1,r,"data-v-e6b7be7c",null);d.options.__file="common\\avatar\\index.vue";t.a=d.exports},80:function(i,t,a){var n=a(81);"string"==typeof n&&(n=[[i.i,n,""]]),n.locals&&(i.exports=n.locals);(0,a(4).default)("04ee39be",n,!1,{})},81:function(i,t,a){(i.exports=a(2)()).push([i.i,'/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.zmiti-admin-main-ui[data-v-746bbd4c] {\n  background: #f2f2f2;\n  box-sizing: border-box;\n  height: 100%;\n  width: 99%;\n  margin: 0 auto;\n}\n.zmiti-admin-main-ui .zmiti-avatar-list[data-v-746bbd4c] {\n    display: flex;\n    display: -webkit-flex;\n    flex-flow: row;\n}\n.zmiti-admin-main-ui .zmiti-avatar-list span[data-v-746bbd4c] {\n      font-size: 40px;\n      margin-right: 20px;\n      cursor: pointer;\n}\n.zmiti-admin-main-ui .zmiti-avatar-list span.active[data-v-746bbd4c] {\n        color: #3390ff;\n}\n.zmiti-admin-main-ui .ivu-table-wrapper[data-v-746bbd4c] {\n    border-bottom: none;\n    border-right: none;\n}\n.zmiti-admin-main-ui .zmiti-list-main[data-v-746bbd4c] {\n    box-sizing: border-box;\n    background: #fff;\n    margin: 0 auto;\n    flex: 2;\n    -webkit-flex: 2;\n    position: relative;\n    top: 5px;\n    display: flex;\n    display: -webkit-flex;\n    flex-flow: column;\n}\n.zmiti-admin-main-ui .zmiti-list-main[data-v-746bbd4c]:before {\n      content: "";\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      left: 0;\n      top: 0;\n      box-shadow: 0 0 0 1px #ccc;\n}\n.zmiti-admin-main-ui .zmiti-list-main .zmiti-add-form-close[data-v-746bbd4c] {\n      z-index: 100;\n}\n.zmiti-admin-main-ui .zmiti-list-main > div[data-v-746bbd4c] {\n      margin: 10px auto 10px;\n      position: relative;\n      flex: 1;\n      -webkit-flex: 1;\n}\n.zmiti-admin-main-ui .zmiti-list-main > div .zmiti-meet-form[data-v-746bbd4c] {\n        width: 100%;\n        margin: 0px auto;\n        padding: 20px 40px;\n        height: 600px;\n        overflow: auto;\n}\n.zmiti-admin-main-ui .zmiti-list-main .zmiti-list-where[data-v-746bbd4c] {\n      width: 98%;\n      margin: 10px auto 0;\n      height: 40px;\n      line-height: 40px;\n      font-size: 14px;\n      position: relative;\n      z-index: 10;\n}\n.zmiti-admin-main-ui .zmiti-list-main .zmiti-list-where input[data-v-746bbd4c] {\n        height: 30px;\n}\n.zmiti-admin-main-ui .zmiti-list-main .zmiti-admin-main[data-v-746bbd4c] {\n      flex: 5;\n      -webkit-flex: 5;\n      width: 100%;\n}\n.zmiti-admin-main-ui .zmiti-list-main .zmiti-admin-main > div[data-v-746bbd4c] {\n        -webkit-transition: 0.3s;\n        transition: 0.3s;\n}\n.zmiti-admin-main-ui .zmiti-list-main .zmiti-admin-main .zmiti-admin-table[data-v-746bbd4c] {\n        width: 98%;\n        margin: 0 auto;\n}\n.zmiti-admin-main-ui .lt-full[data-v-746bbd4c] {\n    position: fixed !important;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 1001;\n    overflow: hidden;\n}\n.zmiti-admin-main-ui .lt-full .zmiti-left-pannel[data-v-746bbd4c] {\n      position: absolute;\n      width: 100%;\n      height: 100px;\n      left: 0;\n      top: 0;\n      z-index: 10;\n}\n.zmiti-admin-main-ui .zmiti-add-form[data-v-746bbd4c] {\n    flex: 1;\n    -webkit-flex: 1;\n    width: 500px;\n    overflow: auto;\n    position: absolute !important;\n    top: 0;\n    right: 0;\n    z-index: 100;\n    height: 100%;\n    position: relative;\n    box-shadow: 0 0 0 1px #ccc;\n    box-sizing: border-box;\n    background: #f9f9f9;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-safe-content[data-v-746bbd4c] {\n      display: flex;\n      display: -webkit-flex;\n      flex-flow: row;\n      -webkit-align-items: center;\n      align-items: center;\n      margin-top: 30px;\n      justify-content: space-around;\n      -webkit-justify-content: space-around;\n      border: 1px dashed #ccc;\n      padding: 10px 0;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-safe-content > div[data-v-746bbd4c]:nth-of-type(1) {\n        text-align: center;\n        width: 120px;\n        font-weight: bold;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-safe-content > div[data-v-746bbd4c]:nth-of-type(2) {\n        flex: 1;\n        -webkit-flex: 1;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-safe-content > div[data-v-746bbd4c]:nth-of-type(3) {\n        width: 80px;\n        cursor: pointer;\n        text-align: center;\n        color: #0066cc;\n}\n.zmiti-admin-main-ui .zmiti-add-form.detail-enter-active[data-v-746bbd4c], .zmiti-admin-main-ui .zmiti-add-form.detail-leave-active[data-v-746bbd4c] {\n      -webkit-transition: 0.2s;\n      transition: 0.2s;\n}\n.zmiti-admin-main-ui .zmiti-add-form.detail-enter[data-v-746bbd4c], .zmiti-admin-main-ui .zmiti-add-form.detail-leave-to[data-v-746bbd4c] {\n      -webkit-transform: translateX(100%);\n      transform: translateX(100%);\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-admin-avatar[data-v-746bbd4c] {\n      background: rgba(51, 144, 255, 0.1);\n      border-radius: 50%;\n      text-align: center;\n      width: 80px;\n      height: 80px;\n      line-height: 80px;\n      margin: 0 auto 30px;\n      cursor: pointer;\n      position: relative;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-admin-avatar label[data-v-746bbd4c] {\n        position: absolute;\n        bottom: -50px;\n        font-size: 12px;\n        width: 100%;\n        text-align: center;\n        left: 0;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-admin-avatar span[data-v-746bbd4c] {\n        font-size: 40px;\n        color: rgba(51, 144, 255, 0.8);\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-add-form-C[data-v-746bbd4c] {\n      margin: 10px auto 2px;\n      width: 90%;\n      position: relative;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-add-form-C .zmiti-hidepass[data-v-746bbd4c] {\n        position: absolute;\n        top: 0;\n        height: 40px;\n        width: 100%;\n        left: 0;\n        opacity: 0;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-add-form-item[data-v-746bbd4c] {\n      line-height: 50px;\n      height: 50px;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-746bbd4c] {\n        text-align: center;\n        position: relative;\n        z-index: 10;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-746bbd4c] {\n          margin: 0 20px;\n          padding: 2px 20px;\n}\n.zmiti-admin-main-ui .zmiti-add-form .zmiti-add-form-item input[data-v-746bbd4c] {\n        padding-left: 6px;\n        height: 32px;\n        width: 70%;\n        border: 1px solid #d8d8d8;\n        outline: none;\n}\n.ivu-icon-ios-help-circle[data-v-746bbd4c] {\n  left: 25px;\n}\n.ivu-radio-inner[data-v-746bbd4c]:after {\n  border-radius: 10px !important;\n}\n',""])}}]);