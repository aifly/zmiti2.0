(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{635:function(t,i,e){var a=e(636);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,e(6).default)("308c4b14",a,!1,{})},636:function(t,i,e){(t.exports=e(4)()).push([t.i,"\n.zmiti-informanager-main-ui[data-v-c7d2661a]{background:#f2f2f2;box-sizing:border-box;height:100%;width:99%;margin:0 auto\n}\n.zmiti-informanager-main-ui .zmiti-list-main[data-v-c7d2661a]{box-sizing:border-box;background:#fff;margin:0 auto\n}\n.zmiti-informanager-main-ui .zmiti-submit-main[data-v-c7d2661a]{flex:5;-webkit-flex:5;width:100%\n}\n.zmiti-informanager-main-ui .zmiti-submit-main>div[data-v-c7d2661a]{-webkit-transition:.3s;transition:.3s\n}\n.zmiti-informanager-main-ui .zmiti-submit-main .zmiti-submit-table[data-v-c7d2661a]{width:98%;margin:0 auto\n}\n.zmiti-add-form[data-v-c7d2661a]{flex:1;-webkit-flex:1;width:500px;overflow:auto;position:absolute !important;top:0;right:0;z-index:100;height:100%;position:relative;box-shadow:0 0 0 1px #ccc;box-sizing:border-box;background:#f9f9f9\n}\n.zmiti-add-form .zmiti-safe-content[data-v-c7d2661a]{display:flex;display:-webkit-flex;flex-flow:row;-webkit-align-items:center;align-items:center;margin-top:30px;justify-content:space-around;-webkit-justify-content:space-around;border:1px dashed #ccc;padding:10px 0\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-c7d2661a]:nth-of-type(1){text-align:center;width:120px;font-weight:bold\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-c7d2661a]:nth-of-type(2){flex:1;-webkit-flex:1\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-c7d2661a]:nth-of-type(3){width:80px;cursor:pointer;text-align:center;color:#06c\n}\n.zmiti-add-form.detail-enter-active[data-v-c7d2661a],.zmiti-add-form.detail-leave-active[data-v-c7d2661a]{-webkit-transition:.2s;transition:.2s\n}\n.zmiti-add-form.detail-enter[data-v-c7d2661a],.zmiti-add-form.detail-leave-to[data-v-c7d2661a]{-webkit-transform:translateX(100%);transform:translateX(100%)\n}\n.zmiti-add-form .zmiti-submit-avatar[data-v-c7d2661a]{background:rgba(51,144,255,0.1);border-radius:50%;text-align:center;width:80px;height:80px;line-height:80px;margin:0 auto 30px;cursor:pointer;position:relative\n}\n.zmiti-add-form .zmiti-submit-avatar label[data-v-c7d2661a]{position:absolute;bottom:-50px;font-size:12px;width:100%;text-align:center;left:0\n}\n.zmiti-add-form .zmiti-submit-avatar span[data-v-c7d2661a]{font-size:40px;color:rgba(51,144,255,0.8)\n}\n.zmiti-add-form .zmiti-add-form-C[data-v-c7d2661a]{margin:10px auto 2px;width:90%\n}\n.zmiti-add-form .zmiti-add-form-item[data-v-c7d2661a]{line-height:50px;height:50px\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-c7d2661a]{text-align:center;position:relative;z-index:10\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-c7d2661a]{margin:0 20px;padding:2px 20px\n}\n.zmiti-add-form .zmiti-add-form-item input[data-v-c7d2661a]{padding-left:6px;height:32px;width:70%;border:1px solid #d8d8d8;outline:none\n}\n.zmiti-inforuserlist-select ul[data-v-c7d2661a]{display:flex;display:-webkit-flex;flex-flow:row;flex-wrap:wrap\n}\n.zmiti-inforuserlist-select ul li[data-v-c7d2661a]{width:120px\n}\n.zmiti-select-column[data-v-c7d2661a]{padding:10px\n}\n.zmiti-transfer-userlist[data-v-c7d2661a]{width:435px;margin:0 auto\n}\n",""])},767:function(t,i,e){"use strict";e.r(i);var a=e(0),s=e(2),o=e(9),r=e(10),{companyActions:n,zmitiActions:d,infomanagerActions:l,formatDate:m,userActions:c}=s.a,u={props:["obserable"],name:"zmitiindex",data(){return{showTransferUserlist:!1,targetKeys:[],showAvatarModal:!1,companyid:"",companyname:"",imgs:window.imgs,total:0,loading:!0,viewH:window.innerHeight,viewW:window.innerWidth,showDetailPage:-1,dataSource:[],showTable:!1,currentNumber:1,condition:{page_index:0,page_size:10},userinfo:{},showSelectUser:!1,productid:0,userstatus:1,infotypeid:void 0,userList:[{username:"songxian",userid:4,status:1},{username:"liuxin",userid:2,status:0},{username:"songxian",userid:4,status:1},{username:"liuxin",userid:2,status:0},{username:"songxian",userid:4,status:1},{username:"liuxin",userid:2,status:0}],formObj:{specialnum:"",typename:"",isanonymous:0,isalluser:0,infotypeid:"",users:[],status:1},userSource:[],userDataList:[],specialnumVal:0,specialnumData:[{label:"消息",value:0},{label:"意见箱",value:1},{label:"通知",value:2},{label:"公告",value:3},{label:"新闻",value:4},{label:"其他",value:5}],persons:0,modal1:!1,data1:this.getMockData(),targetKeys1:[],mockData:[],columns:[{title:"编号",key:"infotypeid",align:"left",width:80},{title:"子栏目名称",key:"typename",align:"left"},{title:"创建时间",key:"createtime",align:"left",render:(t,i)=>t("div",{},s.a.formatDate(i.row.createtime)),width:100},{title:"允许匿名",key:"isanonymous",align:"left",width:100,render:(t,i)=>{return t("div",{},0===i.row.isanonymous?"禁止":1===i.row.isanonymous?"允许":"--")}},{title:"状态",key:"status",align:"left",width:80,render:(t,i)=>{return t("div",{},0===i.row.status?"禁用":2===i.row.status?"已删除":"正常")}},{title:"权限人员",key:"isalluser",align:"left",width:100,render:(t,i)=>{const e=[t("span",{style:{color:"#ff0000"}},"指定人员")];return t("div",{},0==i.row.isalluser?"全部人员":e)}},{title:"操作",key:"action",align:"center",width:100,render:(t,i)=>t("div",[t("Poptip",{props:{confirm:!0,title:"确定要删除吗？",placement:"left"},on:{"on-ok":()=>{this.delete(i.row.infotypeid)}}},[t("span",{props:{type:"error",size:"small"},style:{cursor:"pointer",color:"#06C"},on:{click:()=>{}}},"删除")]),t("span",{style:{cursor:"pointer",color:"rgb(0, 102, 204)",marginLeft:"10px"},on:{click:()=>{this.formObj=i.row,this.formObj.isalluser=String(i.row.isalluser),this.formObj.isanonymous=String(i.row.isanonymous),this.formObj.status=String(i.row.status),console.log(this.formObj,"this.formObj"),this.infotypeid=i.row.infotypeid,console.log(this.infotypeid,"infotypeid"),this.getpermission(i.row.infotypeid),"1"===i.row.isalluser&&(this.showTransferUserlist=!0),a.default.obserable.trigger({type:"toggleMask",data:!0})}}},"编辑")])}]}},components:{ZmitiMask:r.a,ZmitiTable:o.a},beforeCreate(){},created(){this.companyid=s.a.getCurrentCompanyId().companyid,this.getUserList()},mounted(){this.init(()=>{setTimeout(()=>{this.getDataList(0)},100)})},computed:{alluser:function(){return this.userSource}},watch:{$route:{handler(){var t=this.productid;t&&this.$router.push({path:"/infomanager/"+t})}}},methods:{init(t){var i=this,e=setInterval(()=>{if(a.default.productList){clearInterval(e);var s=this.$route.params.id;s||a.default.productList.forEach(t=>{i.$route.name.indexOf(t.producturl.substr(1))>-1&&(s=t.productid)}),this.$router.push({path:"/infomanager/"+s}),this.productid=s,t&&t(s)}},100)},currentTabs(t){this.specialnumVal=parseInt(t),this.formObj.specialnum=parseInt(t),this.formObj.status=1,this.condition.page_index=0,this.currentNumber=1,this.getDataList(this.specialnumVal),console.log(this.specialnumVal,"当前标签")},change(t){this.condition.page_index=t-1,this.currentNumber=t,this.getDataList(this.specialnumVal)},changeUserStatus(t){console.log(this.infotypeid,"this.infotypeid"),void 0===this.infotypeid?this.showSelectUser="1"===t:this.showTransferUserlist="1"===t,console.log(t,"element")},getDataList(t){var{condition:i}=this,e=this;i=Object.assign(i,{companyid:s.a.getCurrentCompanyId().companyid,specialnum:t,productid:e.productid}),s.a.ajax({remark:"gettypeList",data:{action:l.gettypeList.action,condition:i},error(){e.loading=!1},success(t){e.loading=!1,console.log(t,"获取列表"),0===t.getret&&(e.total=t.total,e.dataSource=t.list)}})},closeMaskPage(){this.showSelectUser=!1,console.log("关闭右侧"),a.default.obserable.trigger({type:"toggleMask",data:!1})},add(){this.showSelectUser=!1,this.formObj={},this.formObj.specialnum=this.specialnumVal,this.formObj.isanonymous="0",this.formObj.isalluser="0",this.formObj.status="1",this.infotypeid=void 0,this.formObj.users=[],this.showTransferUserlist=!1,console.log(this.formObj,"this.formObj"),a.default.obserable.trigger({type:"toggleMask",data:!0})},adminAction(){var t=this,i=this.infotypeid?l.edittypeList.action:l.addtypeList.action;let e={specialnum:this.specialnumVal,isalluser:this.formObj.isalluser,typename:this.formObj.typename,infotypeid:this.formObj.infotypeid,status:this.formObj.status,isanonymous:this.formObj.isanonymous,companyid:this.companyid,productid:this.productid};1==this.formObj.isalluser&&(e.users=[],null==t.infotypeid?this.formObj.users.forEach((t,i)=>{e.users.push({userid:t,status:1})}):e.users=t.formObj.users,console.log(e.users,"info.users")),console.log(e,"info-info"),s.a.ajax({remark:this.formObj.infotypeid?"edittypeList":"addtypeList",data:{action:i,info:e},success(i){t.$Message[0===i.getret?"success":"error"](i.msg||i.getmsg),t.closeMaskPage(),0===i.getret&&t.getDataList(t.specialnumVal)}})},delete(t){console.log(t,"infotypeid");var i=this;s.a.ajax({remark:"deltypeList",data:{action:l.deltypeList.action,infotypeid:t,productid:i.productid},success(t){i.$Message[0===t.getret?"success":"error"](t.msg||t.getmsg),i.getDataList(i.specialnumVal)}})},getUserList(){var t=this;s.a.ajax({remark:"getUserList",data:{action:c.getCompanyUserList.action,condition:{page_index:0,page_size:100,companyid:this.companyid,status:1}},success(i){0===i.getret&&i.list.forEach((i,e)=>{t.userSource.push({userid:i.userid,realname:i.user.realname,username:i.user.username})})}})},ok(){this.targetKeys1=[]},cancel(){this.targetKeys1=[]},getMockData(){var t=this;let i=[];return setTimeout(()=>{t.userSource.forEach((t,e)=>{i.push({key:t.userid.toString(),label:t.realname,description:t.username})})},1e3),i},getTargetKeys:()=>["4"],render1:t=>t.label,handleChange1(t,i,e){this.$Modal.confirm({title:"是否更改用户权限",onOk:()=>{setTimeout(()=>{console.log(t),console.log(i),console.log(e),this.targetKeys1=t;var a=this.infotypeid;"right"===i?(console.log("增加"),e.forEach((t,i)=>{this.addpermission(t,a),console.log(t,"添加用户")})):(console.log("移除"),e.forEach((t,i)=>{this.delpermission(t,a),console.log(t,"删除用户")})),this.$Modal.remove()},300)}})},addpermission(t,i){s.a.ajax({remark:"addpermission",data:{action:l.addpermission.action,info:{userid:t,productid:this.productid,status:1,infotypeid:i}},success(t){t.getret}})},getpermission(t){var i=this;s.a.ajax({remark:"getpermission",data:{action:l.getpermission.action,condition:{page_index:0,page_size:100,productid:this.productid,infotypeid:t}},success(t){0===t.getret&&(console.log(t.list,"获取当前具有权限的用户列表"),t.total>0&&(i.formObj.users=[],i.targetKeys1=[],t.list.forEach((t,e)=>{i.targetKeys1.push(t.userid.toString()),i.formObj.users.push({userid:t.user.userid,status:1})}),console.log(i.targetKeys1,"s.targetKeys1"),console.log(i.formObj.users,"s.formObj.users")))}})},delpermission(t,i){s.a.ajax({remark:"delpermission",data:{action:l.delpermission.action,info:{productid:this.productid,infotypeid:i,userid:t}},success(t){0===t.getret&&console.log("获取当前具有权限的用户列表")}})}}},p=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"zmiti-informanager-main-ui"},[e("div",{staticClass:"zmiti-list-main"},[e("div",{staticClass:"zmiti-informanager-table lt-full"},[e("header",{staticClass:"zmiti-tab-header"},[t._m(0),t._v(" "),e("div",[e("Button",{attrs:{type:"primary"},on:{click:function(i){return t.add()}}},[t._v("添加")])],1)]),t._v(" "),e("div",{staticClass:"zmiti-submit-main zmiti-scroll",style:{height:t.viewH-110+"px"}},[e("div",{staticClass:"zmiti-select-column"},[e("Tabs",{on:{"on-click":t.currentTabs}},t._l(t.specialnumData,(function(t,i){return e("TabPane",{key:i,attrs:{label:t.label,name:t.value.toString()}})})),1)],1),t._v(" "),e("ZmitiTable",{attrs:{loading:t.loading,dataSource:t.dataSource,columns:t.columns,current:t.currentNumber,change:t.change,"page-size":t.condition.page_size,total:t.total}})],1)])]),t._v(" "),e("ZmitiMask",{on:{closeMaskPage:t.closeMaskPage},model:{value:t.showDetailPage,callback:function(i){t.showDetailPage=i},expression:"showDetailPage"}},[e("div",{attrs:{slot:"mask-content"},slot:"mask-content"},[e("transition",{attrs:{name:"detail"}},[e("section",{staticClass:"zmiti-add-form zmiti-scroll"},[e("header",{staticClass:"zmiti-add-header"},[e("img",{attrs:{src:t.imgs.back,alt:""},on:{click:t.closeMaskPage}}),t._v(" "),e("span",[t._v("基础信息")])]),t._v(" "),e("Form",{staticClass:"zmiti-add-form-C",attrs:{model:t.formObj,"label-width":80}},[e("FormItem",{attrs:{label:"类型名称："}},[e("Input",{attrs:{placeholder:"类型名称"},model:{value:t.formObj.typename,callback:function(i){t.$set(t.formObj,"typename",i)},expression:"formObj.typename"}})],1),t._v(" "),e("FormItem",{attrs:{label:"支持匿名："}},[e("RadioGroup",{model:{value:t.formObj.isanonymous,callback:function(i){t.$set(t.formObj,"isanonymous",i)},expression:"formObj.isanonymous"}},[e("Radio",{attrs:{label:"0"}},[t._v("否")]),t._v(" "),e("Radio",{attrs:{label:"1"}},[t._v("是")])],1)],1),t._v(" "),e("FormItem",{attrs:{label:"权限人员："}},[e("RadioGroup",{on:{"on-change":t.changeUserStatus},model:{value:t.formObj.isalluser,callback:function(i){t.$set(t.formObj,"isalluser",i)},expression:"formObj.isalluser"}},[e("Radio",{attrs:{label:"0"}},[t._v("全部人员")]),t._v(" "),e("Radio",{attrs:{label:"1"}},[t._v("指定人员")])],1),t._v(" "),1==t.showSelectUser?e("div",{staticClass:"zmiti-inforuserlist-select"},[e("Select",{staticStyle:{width:"370px"},attrs:{multiple:""},model:{value:t.formObj.users,callback:function(i){t.$set(t.formObj,"users",i)},expression:"formObj.users"}},t._l(t.userSource,(function(i){return e("Option",{key:i.userid,attrs:{value:i.userid}},[t._v(t._s(i.realname))])})),1)],1):t._e()],1)],1),t._v(" "),1==t.showTransferUserlist?e("div",{staticClass:"zmiti-transfer-userlist"},[e("Transfer",{attrs:{titles:["选择用户","已分配用户"],data:t.data1,"target-keys":t.targetKeys1,"render-format":t.render1},on:{"on-change":t.handleChange1}})],1):t._e(),t._v(" "),e("div",{staticClass:"zmiti-add-form-item zmiti-add-btns"},[e("Button",{attrs:{size:"large",type:"primary"},on:{click:t.adminAction}},[t._v(t._s(t.formObj.jobid?"保存":"确定"))])],1)],1)])],1)])],1)};p._withStripped=!0;var f=e(3),g=!1;var h=function(t){g||e(635)},b=Object(f.a)(u,p,[function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("span",[this._v("栏目配置")])])}],!1,h,"data-v-c7d2661a",null);b.options.__file="components\\infomanager\\index\\index.vue";i.default=b.exports}}]);