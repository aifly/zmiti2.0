(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{175:function(t,i,n){var a=n(176);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n(6).default)("0a906352",a,!1,{})},176:function(t,i,n){(t.exports=n(2)()).push([t.i,"",""])},177:function(t,i,n){"use strict";var a={props:["dataSource","columns","change","page_size","total","loading"],data:()=>({})},e=function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("div",{staticClass:"zmiti-user-table"},[i("Table",{attrs:{loading:this.loading,data:this.dataSource,columns:this.columns}})],1),this._v(" "),i("div",{staticClass:"zmiti-pager"},[i("Page",{attrs:{"page-size":this.page_size,total:this.total,"show-total":""},on:{"on-change":this.change}})],1)])};e._withStripped=!0;var o=n(7),s=!1;var r=function(t){s||n(175)},m=Object(o.a)(a,e,[],!1,r,null,null);m.options.__file="common\\table\\index.vue";i.a=m.exports},41:function(t,i,n){"use strict";n.r(i);var a=n(3),e=n(66),o=n(177),s=n(70),{companyActions:r,zmitiActions:m,changYueAcions:d,formatDate:l}=a.a,c={props:["obserable"],name:"zmitiindex",data(){return{targetKeys:[],showAvatarModal:!1,companyname:"",roleList:[],imgs:window.imgs,isLoading:!1,showDetail:!1,total:0,showDetailPage:-1,currentClassId:-1,adminuserId:"",loading:!0,currentUserid:"",formUser:{isover:0,usersign:1,usertypesign:1,avatar:"&#xe6a4;"},address:"",showPass:!1,showMap:!1,viewH:window.innerHeight,viewW:window.innerWidth,dataSource:[],groupList:[],companyList:[],hideMenu:!1,unJoinedCompany:[],columns:[{title:"稿件编号",key:"manuscriptid",align:"center"},{title:"稿件标题",key:"doctitle",align:"center"},{title:"提交时间",key:"createtime",align:"center",render:(t,i)=>t("div",{},l(i.row.createtime))},{title:"审核人",key:"status",width:220,render:(t,i)=>t("div",(i.row.checkuserlist||[]).map((i,n)=>t("span",{style:{marginRight:"5px"},on:{click:()=>{console.log(i),this.$Modal.info({title:i.realname+"的审核意见 —— "+s.c[i.status].name,content:"<p>审核意见：</p>"+(i.suggestion||"暂无 ：("),okText:"确定",closable:!0,cancelText:"取消"})}},domProps:{innerHTML:`\n\t\t\t\t\t\t\t\t\t\t\t<label>${i.realname}</label>\n\t\t\t\t\t\t\t\t\t\t\t<label title='${s.c[i.status].name}' class='zmiti-cy-tag zmt_iconfont' style='color:${s.c[i.status].color}'>\n\t\t\t\t\t\t\t\t\t\t\t\t${s.c[i.status].icon}\n\t\t\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t\t`}})))},{title:"操作",key:"action",align:"center",width:200,render:(t,i)=>t("div",[t("Poptip",{props:{confirm:!0,title:"确定要删除吗？",placement:"left"},on:{"on-ok":()=>{this.delete(i.row.manuscriptid)}}},[t("span",{props:{type:"error",size:"small"},style:{cursor:"pointer",color:"#06C"},on:{click:()=>{}}},"删除")])])}],formUser:{pdfurl:"",longitude:"116.585856",latitude:"40.364989"},directoryList:{},condition:{page_index:0,page_size:10},userinfo:{}}},components:{ZmitiMask:e.a,ZmitiTable:o.a},beforeCreate(){},mounted(){window.s=this,this.getDataList()},watch:{showDetail(t){t?this.showDetailPage=1:setTimeout(()=>{this.showDetailPage=-1},310)},$route:{deep:!0,handler(){this.getDataList()}}},methods:{change(t){this.condition.page_index=t-1,this.getMyCheckList()},closeMaskPage(){this.showDetailPage=-1},handleChange2(t,i,n){var e=this;n.forEach((t,n)=>{a.a.adminAjax({remark:"left"===i?"exitCompany":"joinCompany",data:{action:r["left"===i?"exitCompany":"joinCompany"].action,userid:e.currentUserid,companyid:t},success(t){e.$Message[0===t.getret?"success":"error"](t.msg),e.getJoinedCompany()}})})},filterMethod:(t,i)=>t.label.indexOf(i)>-1,getJoinedCompany(){var t=this;a.a.adminAjax({remark:"getJoinedCompany",data:{action:r.getJoinedCompany.action,condition:{userid:t.currentUserid,page_index:0,page_size:20}},success(i){0===i.getret&&(t.targetKeys=[],i.list.forEach(i=>{t.targetKeys.push(i.companyid)}))}})},checkUser(){var t=this.formUser.username,{$Message:i}=this;a.a.adminAjax({remark:"checkUserName",data:{action:m.checkUserName.action,username:t},success(t){i[0===t.getret?t.used?"error":"success":"error"](t.msg)}})},getAvatar(t){this.formUser.avatar=t},delete(t){var i=this;a.a.ajax({remark:"delManuscript",data:{action:d.delManuscript.action,condition:{manuscriptids:t}},success(t){i.$Message[0===t.getret?"success":"error"](t.msg),0===t.getret&&i.getDataList()}})},change(t){this.condition.page_index=t-1,this.getDataList()},getDataList(){var t=this;t.loading=!0;var{condition:i}=this;i=Object.assign(i,{companyid:a.a.getCurrentCompanyId().companyid}),a.a.ajax({remark:"getMySubmitList",data:{action:d.getMySubmitList.action,condition:i},success(i){t.loading=!1,0===i.getret&&(t.total=i.total,t.dataSource=i.list)}})}}},u=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"zmiti-submit-main-ui"},[n("div",{staticClass:"zmiti-list-main"},[n("header",{staticClass:"zmiti-tab-header"},[n("div",[t.companyname?n("span",[t._v(t._s(t.companyname)+" —— ")]):t._e(),t._v("畅阅")]),t._v(" "),n("div",[n("Button",{attrs:{loading:t.loading,type:"primary"},on:{click:function(i){return t.getDataList()}}},[t._v("刷新")])],1)]),t._v(" "),t._m(0),t._v(" "),n("div",{staticClass:"zmiti-submit-main zmiti-scroll ",style:{height:t.viewH-180+"px"}},[n("ZmitiTable",{attrs:{loading:t.loading,dataSource:t.dataSource,columns:t.columns,change:t.change,"page-size":t.condition.page_size,total:t.total}})],1)])])};u._withStripped=!0;var f=n(7),p=!1;var h=function(t){p||n(97)},g=Object(f.a)(c,u,[function(){var t=this.$createElement,i=this._self._c||t;return i("section",{staticClass:"zmiti-list-where"},[this._v("\n\t\t\t用户编号 "),i("input",{attrs:{type:"text"}})])}],!1,h,"data-v-11022ff6",null);g.options.__file="components\\changyuemysubmit\\index.vue";i.default=g.exports},64:function(t,i,n){var a=n(65);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n(6).default)("61f6dc8c",a,!1,{})},65:function(t,i,n){(t.exports=n(2)()).push([t.i,"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.zmiti-mask-ui[data-v-bc775556] {\n  position: fixed;\n  z-index: 1002;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.6);\n  left: 0;\n  top: 0;\n}\n.zmiti-mask-ui .zmiti-mask-right[data-v-bc775556] {\n    position: absolute;\n    background: #fff;\n    top: 50px;\n    right: 0;\n    overflow: auto;\n    z-index: 10;\n}\n.zmiti-mask-ui .zmiti-mask-right.right-enter-active[data-v-bc775556], .zmiti-mask-ui .zmiti-mask-right.right-leave-active[data-v-bc775556] {\n      -webkit-transition: 0.2s;\n      transition: 0.2s;\n}\n.zmiti-mask-ui .zmiti-mask-right.right-leave-to[data-v-bc775556], .zmiti-mask-ui .zmiti-mask-right.right-enter[data-v-bc775556] {\n      -webkit-transform: translate3d(600px, 0, 0);\n      transform: translate3d(600px, 0, 0);\n}\n.zmiti-mask-ui .lt-full[data-v-bc775556] {\n    z-index: 8;\n    height: 100%;\n}\n",""])},66:function(t,i,n){"use strict";var a=n(1),e={props:{value:{type:Number,default:function(){return-1}},width:{type:Number,default:function(){return 500}}},watch:{value(t){this.showPannel=t>-1}},data:()=>({viewH:window.innerHeight,showPannel:!1}),methods:{change(t){},hidePannel(){this.showPannel=!1},afterLeave(){this.$emit("input",!1),this.$emit("closeMaskPage")}},mounted(){a.default.obserable.on("toggleMask",t=>{this.showPannel=t})}},o=function(){var t=this,i=t.$createElement;return(t._self._c||i)("Drawer",{attrs:{title:"",placement:"right",width:500,closable:!1},on:{"on-visible-change":t.change},model:{value:t.showPannel,callback:function(i){t.showPannel=i},expression:"showPannel"}},[t._t("mask-content")],2)};o._withStripped=!0;var s=n(7),r=!1;var m=function(t){r||n(64)},d=Object(s.a)(e,o,[],!1,m,"data-v-bc775556",null);d.options.__file="common\\mask\\index.vue";i.a=d.exports},70:function(t,i,n){"use strict";n.d(i,"e",function(){return a}),n.d(i,"d",function(){return e}),n.d(i,"a",function(){return s}),n.d(i,"b",function(){return r}),n.d(i,"c",function(){return m});var a={0:"财务类",1:"会员账号",2:"定制服务类",3:"产品技术类",4:"其它类"};let e={0:{status:"已禁用"},1:{status:"已受理"},2:{status:"已处理"},3:{status:"已确认"},4:{status:"已评价"}},o=[{name:"全部",type:-1},{name:"图片",type:0},{name:"视频",type:1},{name:"音频",type:2},{name:"文件",type:3}],s=(t=3)=>[{name:"系统",icon:"&#xe611;",id:1},{name:"单位",icon:"&#xe612;",id:2},{name:"个人",icon:"&#xe613;",id:t,cateList:o.concat([])}],r={pdf:"&#xe665;",xls:"&#xe614;",xlsx:"&#xe614;",mp3:"&#xe7df;",ogg:"&#xe7df;",m4a:"&#xe7df;",doc:"&#xe63c;",docx:"&#xe63c;",mp4:"&#xe601;",webm:"&#xe601;",mov:"&#xe601;",flv:"&#xe601;",other:"&#xe606;"},m=[{name:"待审核",icon:"&#xe6bc;",color:"#3390ff"},{name:"审核通过",icon:"&#xe61b;",color:"#00c0de"},{name:"拒绝",icon:"&#xe61e;",color:"#ff4664"},{name:"暂缓",icon:"&#xe61f;",color:"#ffce01"}]},97:function(t,i,n){var a=n(98);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,n(6).default)("51a92bd7",a,!1,{})},98:function(t,i,n){(t.exports=n(2)()).push([t.i,'/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.zmiti-submit-main-ui[data-v-11022ff6] {\n  background: #f2f2f2;\n  box-sizing: border-box;\n  height: 100%;\n  width: 99%;\n  margin: 0 auto;\n}\n.zmiti-submit-main-ui .zmiti-cy-tag[data-v-11022ff6] {\n    color: red;\n}\n.zmiti-submit-main-ui .zmiti-avatar-list[data-v-11022ff6] {\n    display: flex;\n    display: -webkit-flex;\n    flex-flow: row;\n}\n.zmiti-submit-main-ui .zmiti-avatar-list span[data-v-11022ff6] {\n      font-size: 40px;\n      margin-right: 20px;\n      cursor: pointer;\n}\n.zmiti-submit-main-ui .zmiti-avatar-list span.active[data-v-11022ff6] {\n        color: #3390ff;\n}\n.zmiti-submit-main-ui .ivu-table-wrapper[data-v-11022ff6] {\n    border-bottom: none;\n    border-right: none;\n}\n.zmiti-submit-main-ui .zmiti-list-main[data-v-11022ff6] {\n    box-sizing: border-box;\n    background: #fff;\n    margin: 0 auto;\n    flex: 2;\n    -webkit-flex: 2;\n    position: relative;\n    top: 5px;\n    display: flex;\n    display: -webkit-flex;\n    flex-flow: column;\n}\n.zmiti-submit-main-ui .zmiti-list-main[data-v-11022ff6]:before {\n      content: "";\n      position: absolute;\n      width: 100%;\n      height: 100%;\n      left: 0;\n      top: 0;\n      box-shadow: 0 0 0 1px #ccc;\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-add-form-close[data-v-11022ff6] {\n      z-index: 100;\n}\n.zmiti-submit-main-ui .zmiti-list-main > div[data-v-11022ff6] {\n      margin: 10px auto 10px;\n      position: relative;\n      flex: 1;\n      -webkit-flex: 1;\n}\n.zmiti-submit-main-ui .zmiti-list-main > div .zmiti-meet-form[data-v-11022ff6] {\n        width: 100%;\n        margin: 0px auto;\n        padding: 20px 40px;\n        height: 600px;\n        overflow: auto;\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-list-where[data-v-11022ff6] {\n      width: 98%;\n      margin: 10px auto 0;\n      height: 40px;\n      line-height: 40px;\n      font-size: 14px;\n      position: relative;\n      z-index: 10;\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-list-where input[data-v-11022ff6] {\n        height: 30px;\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-submit-main[data-v-11022ff6] {\n      flex: 5;\n      -webkit-flex: 5;\n      width: 100%;\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-submit-main > div[data-v-11022ff6] {\n        -webkit-transition: 0.3s;\n        transition: 0.3s;\n}\n.zmiti-submit-main-ui .zmiti-list-main .zmiti-submit-main .zmiti-submit-table[data-v-11022ff6] {\n        width: 98%;\n        margin: 0 auto;\n}\n.zmiti-submit-main-ui .lt-full[data-v-11022ff6] {\n    position: fixed !important;\n    background: rgba(0, 0, 0, 0.5);\n    z-index: 1001;\n    overflow: hidden;\n}\n.zmiti-submit-main-ui .lt-full .zmiti-left-pannel[data-v-11022ff6] {\n      position: absolute;\n      width: 100%;\n      height: 100px;\n      left: 0;\n      top: 0;\n      z-index: 10;\n}\n.zmiti-submit-main-ui .zmiti-add-form[data-v-11022ff6] {\n    flex: 1;\n    -webkit-flex: 1;\n    width: 500px;\n    overflow: auto;\n    position: absolute !important;\n    top: 0;\n    right: 0;\n    z-index: 100;\n    height: 100%;\n    position: relative;\n    box-shadow: 0 0 0 1px #ccc;\n    box-sizing: border-box;\n    background: #f9f9f9;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content[data-v-11022ff6] {\n      display: flex;\n      display: -webkit-flex;\n      flex-flow: row;\n      -webkit-align-items: center;\n      align-items: center;\n      margin-top: 30px;\n      justify-content: space-around;\n      -webkit-justify-content: space-around;\n      border: 1px dashed #ccc;\n      padding: 10px 0;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content > div[data-v-11022ff6]:nth-of-type(1) {\n        text-align: center;\n        width: 120px;\n        font-weight: bold;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content > div[data-v-11022ff6]:nth-of-type(2) {\n        flex: 1;\n        -webkit-flex: 1;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-safe-content > div[data-v-11022ff6]:nth-of-type(3) {\n        width: 80px;\n        cursor: pointer;\n        text-align: center;\n        color: #0066cc;\n}\n.zmiti-submit-main-ui .zmiti-add-form.detail-enter-active[data-v-11022ff6], .zmiti-submit-main-ui .zmiti-add-form.detail-leave-active[data-v-11022ff6] {\n      -webkit-transition: 0.2s;\n      transition: 0.2s;\n}\n.zmiti-submit-main-ui .zmiti-add-form.detail-enter[data-v-11022ff6], .zmiti-submit-main-ui .zmiti-add-form.detail-leave-to[data-v-11022ff6] {\n      -webkit-transform: translateX(100%);\n      transform: translateX(100%);\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-submit-avatar[data-v-11022ff6] {\n      background: rgba(51, 144, 255, 0.1);\n      border-radius: 50%;\n      text-align: center;\n      width: 80px;\n      height: 80px;\n      line-height: 80px;\n      margin: 0 auto 30px;\n      cursor: pointer;\n      position: relative;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-submit-avatar label[data-v-11022ff6] {\n        position: absolute;\n        bottom: -50px;\n        font-size: 12px;\n        width: 100%;\n        text-align: center;\n        left: 0;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-submit-avatar span[data-v-11022ff6] {\n        font-size: 40px;\n        color: rgba(51, 144, 255, 0.8);\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-C[data-v-11022ff6] {\n      margin: 10px auto 2px;\n      width: 90%;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item[data-v-11022ff6] {\n      line-height: 50px;\n      height: 50px;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-11022ff6] {\n        text-align: center;\n        position: relative;\n        z-index: 10;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-11022ff6] {\n          margin: 0 20px;\n          padding: 2px 20px;\n}\n.zmiti-submit-main-ui .zmiti-add-form .zmiti-add-form-item input[data-v-11022ff6] {\n        padding-left: 6px;\n        height: 32px;\n        width: 70%;\n        border: 1px solid #d8d8d8;\n        outline: none;\n}\n.ivu-icon-ios-help-circle[data-v-11022ff6] {\n  left: 25px;\n}\n.ivu-radio-inner[data-v-11022ff6]:after {\n  border-radius: 10px !important;\n}\n',""])}}]);