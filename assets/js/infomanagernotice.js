(window.webpackJsonp=window.webpackJsonp||[]).push([[38],{159:function(t,e,i){var a=i(160);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,i(6).default)("7217a9bf",a,!1,{})},160:function(t,e,i){(t.exports=i(4)()).push([t.i,"\n.zmiti-informanagernews-main-ui[data-v-4a8899fe]{background:#f2f2f2;box-sizing:border-box;height:100%;width:99%;margin:0 auto\n}\n.zmiti-informanagernews-main-ui .zmiti-list-main[data-v-4a8899fe]{box-sizing:border-box;background:#fff;margin:0 auto\n}\n.zmiti-informanagernews-main-ui .zmiti-list-where[data-v-4a8899fe]{font-size:14px;width:98%;margin:0 auto 10px auto;display:flex;display:-webkit-flex;flex-flow:row\n}\n.zmiti-informanagernews-main-ui .zmiti-list-where .zmiti-search-dates[data-v-4a8899fe]{margin:0 10px\n}\n.zmiti-informanagernews-main-ui .zmiti-search-icon[data-v-4a8899fe]{font-size:20px;cursor:pointer\n}\n.zmiti-informanagernews-main-ui .zmiti-tabs-select[data-v-4a8899fe]{width:98%;margin:0 auto\n}\n.zmiti-informanagernews-main-ui .zmiti-submit-main[data-v-4a8899fe]{margin-top:10px;flex:5;-webkit-flex:5;width:100%\n}\n.zmiti-informanagernews-main-ui .zmiti-submit-main>div[data-v-4a8899fe]{-webkit-transition:.3s;transition:.3s\n}\n.zmiti-informanagernews-main-ui .zmiti-submit-main .zmiti-submit-table[data-v-4a8899fe]{width:98%;margin:0 auto\n}\n.zmiti-add-form[data-v-4a8899fe]{flex:1;-webkit-flex:1;width:500px;overflow:auto;position:absolute !important;top:0;right:0;z-index:100;height:100%;position:relative;box-shadow:0 0 0 1px #ccc;box-sizing:border-box;background:#f9f9f9\n}\n.zmiti-add-form .zmiti-safe-content[data-v-4a8899fe]{display:flex;display:-webkit-flex;flex-flow:row;-webkit-align-items:center;align-items:center;margin-top:30px;justify-content:space-around;-webkit-justify-content:space-around;border:1px dashed #ccc;padding:10px 0\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-4a8899fe]:nth-of-type(1){text-align:center;width:120px;font-weight:bold\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-4a8899fe]:nth-of-type(2){flex:1;-webkit-flex:1\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-4a8899fe]:nth-of-type(3){width:80px;cursor:pointer;text-align:center;color:#06c\n}\n.zmiti-add-form.detail-enter-active[data-v-4a8899fe],.zmiti-add-form.detail-leave-active[data-v-4a8899fe]{-webkit-transition:.2s;transition:.2s\n}\n.zmiti-add-form.detail-enter[data-v-4a8899fe],.zmiti-add-form.detail-leave-to[data-v-4a8899fe]{-webkit-transform:translateX(100%);transform:translateX(100%)\n}\n.zmiti-add-form .zmiti-submit-avatar[data-v-4a8899fe]{background:rgba(51,144,255,0.1);border-radius:50%;text-align:center;width:80px;height:80px;line-height:80px;margin:0 auto 30px;cursor:pointer;position:relative\n}\n.zmiti-add-form .zmiti-submit-avatar label[data-v-4a8899fe]{position:absolute;bottom:-50px;font-size:12px;width:100%;text-align:center;left:0\n}\n.zmiti-add-form .zmiti-submit-avatar span[data-v-4a8899fe]{font-size:40px;color:rgba(51,144,255,0.8)\n}\n.zmiti-add-form .zmiti-add-form-C[data-v-4a8899fe]{margin:10px auto 2px;width:90%\n}\n.zmiti-add-form .zmiti-add-form-item[data-v-4a8899fe]{line-height:50px;height:50px\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-4a8899fe]{text-align:center;position:relative;z-index:10\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-4a8899fe]{margin:0 20px;padding:2px 20px\n}\n.zmiti-add-form .zmiti-add-form-item input[data-v-4a8899fe]{padding-left:6px;height:32px;width:70%;border:1px solid #d8d8d8;outline:none\n}\n.zmiti-inforuserlist-select ul[data-v-4a8899fe]{display:flex;display:-webkit-flex;flex-flow:row;flex-wrap:wrap\n}\n.zmiti-inforuserlist-select ul li[data-v-4a8899fe]{width:120px\n}\n.zmiti-select-column[data-v-4a8899fe]{padding:10px\n}\n.zmiti-informanagerdetail-form[data-v-4a8899fe]{padding:20px\n}\n.zmiti-scroll[data-v-4a8899fe]{overflow:auto\n}\n",""])},164:function(t,e,i){"use strict";var a=i(2),n=i(9),{companyActions:s,zmitiActions:o,infomanagerActions:r,formatDate:d,userActions:l}=a.a,c={props:["productid","columntitle","specialnum"],name:"zmitiindex",data(){return{typename:"",targetKeys:[],showAvatarModal:!1,companyname:"",addDataSource:[],imgs:window.imgs,total:0,loading:!0,currentCityIndex:-1,currentCityId:-1,transX:0,transY:0,viewH:window.innerHeight,viewW:window.innerWidth,dataSource:[],showTable:!1,currentNumber:1,condition:{page_index:0,page_size:10},userinfo:{},typeDataList:[],typeid:-1,title:"",begin_time:0,end_time:0,modal1:!1,data1:this.getMockData(),targetKeys1:[],mockData:[],currUserList:[],statusVal:"-1",selectStatus:[{value:"-1",label:"全部"},{value:"0",label:"禁用"},{value:"1",label:"待审"},{value:"2",label:"通过"},{value:"3",label:"拒绝"}],infoid:-1,companyid:"",userSource:[],columns:[{title:"编号",key:"infoid",align:"left",width:80},{title:"标题",key:"title",align:"left"},{title:"权限",key:"visit",align:"left",width:80,render:(t,e)=>{let i=[t("span",{props:{type:"error",size:"small"},style:{cursor:"pointer",color:"#06C"},on:{click:()=>{this.modal1=!0,this.infoid=e.row.infoid,this.getaddAccessibleList(e.row.infoid,this.companyid)}}},"查看")];return t("div",{},0===e.row.visit?"全部":i)}},{title:"时间",key:"createtime",align:"center",width:100,render:(t,e)=>t("div",{},d(e.row.createtime))},{title:"操作",key:"action",align:"center",width:100,render:(t,e)=>t("div",[t("span",{style:{cursor:"pointer",color:"rgb(0, 102, 204)",marginRight:"10px"},on:{click:()=>{this.formObj=e.row,this.$router.push({name:"infomanagermsgdetail",params:{productid:this.productid,typeid:this.typeid,id:this.formObj.infoid,typename:this.typename}})}}},"编辑"),t("Poptip",{props:{confirm:!0,title:"确定要删除吗？",placement:"left"},on:{"on-ok":()=>{this.delete(e.row.infoid)}}},[t("span",{props:{type:"error",size:"small"},style:{cursor:"pointer",color:"#06C"},on:{click:()=>{}}},"删除")])])}]}},components:{ZmitiTable:n.a},beforeCreate(){},created(){this.companyid=a.a.getCurrentCompanyId().companyid},mounted(){this.getTypeList(this.specialnum),this.getUserList()},watch:{typeid(){this.getDataList()},statusVal(){this.getDataList()}},methods:{change(t){this.condition.page_index=t-1,this.currentNumber=t,this.getDataList()},add(){this.$router.push({name:"infomanagermsgdetail",params:{productid:this.productid,typeid:this.typeid,typename:this.typename}})},getDataList(){var t=this,{condition:e}=this;e=Object.assign(e,{typeid:t.typeid,productid:t.productid,title:t.title,begin_time:t.begin_time,end_time:t.end_time,status:t.statusVal}),a.a.ajax({remark:"getnewsList",data:{action:r.getnewsList.action,condition:e},error(){t.loading=!1},success(e){t.loading=!1,console.log(e,"获取列表"),0===e.getret?(t.total=e.total,e.total>0?t.dataSource=e.list:t.dataSource=[]):(t.$Message[0===e.getret?"success":"error"](e.msg||e.getmsg),t.dataSource=[])}})},delete(t){var e=this;a.a.ajax({remark:"delnews",data:{action:r.delnews.action,productid:this.productid,infoid:t},success(t){e.$Message[0===t.getret?"success":"error"](t.msg||t.getmsg),e.getDataList()}})},selectDates(t){console.log(t,"选择的时间"),this.begin_time=Date.parse(new Date(t[0]))/1e3,this.end_time=Date.parse(new Date(t[1]))/1e3,console.log(this.begin_time+" "+this.end_time,"选择的时间戳")},searchHandle(){this.getDataList()},getTypeList(t){var{condition:e}=this,i=this;a.a.ajax({remark:"getusertypeinfolist",data:{action:r.getusertypeinfolist.action,condition:{companyid:a.a.getCurrentCompanyId().companyid,specialnum:t,productid:i.productid,page_index:0,page_size:20}},success(t){0===t.getret&&(i.loading=!1,t.total>0&&(i.typeDataList=t.list,i.typeid=t.list[0].infotypeid,i.typename=t.list[0].typename))}})},currentTabs(t){this.typeid=parseInt(t),this.condition.page_index=0,this.currentNumber=1,this.typename=this.typeDataList.filter(e=>e.infotypeid==t).map(t=>t.typename).toString(),console.log(t,"当前标签")},infoStatus(t){this.statusVal=t,this.condition.page_index=0,this.currentNumber=1,console.log(this.statusVal,"选中的状态")},getUserList(){var t=this;a.a.ajax({remark:"getUserList",data:{action:l.getCompanyUserList.action,condition:{page_index:0,page_size:80,companyid:this.companyid,status:1}},success(e){0===e.getret&&e.list.forEach((e,i)=>{t.userSource.push({userid:e.userid,realname:e.user.realname,username:e.user.username})})}})},getMockData(){var t=this;let e=[];return setTimeout(()=>{t.userSource.forEach((t,i)=>{e.push({key:t.userid.toString(),label:t.realname,description:t.username})})},1e3),e},render1:t=>t.label,handleChange1(t,e,i){console.log(t,"newTargetKeys"),console.log(e),console.log(i,"moveKeys"),this.targetKeys1=t;var a=this.infoid;"right"===e?i.forEach((t,e)=>{this.addAccessible(t,a),console.log(t,"添加用户")}):(console.log("移除"),i.forEach((t,e)=>{let i=this.currUserList.filter(e=>e.userid==t).map(t=>t.infovisitid);this.delAccessible(Number(i)),console.log(Number(i)),console.log(t,"删除的用户")}))},getaddAccessibleList(t){var e=this;a.a.ajax({remark:"getaddAccessibleList",data:{action:r.getaddAccessibleList.action,condition:{page_index:0,page_size:50,productid:this.productid,infoid:t}},success(t){0===t.getret&&(console.log(t.list,"获取当前具有权限的用户列表"),t.total>0&&(e.currUserList=t.list,t.list.forEach((t,i)=>{e.targetKeys1.push(t.userid.toString())}),console.log(e.targetKeys1,"获取具有权限的userid")))}})},addAccessible(t,e){a.a.ajax({remark:"addAccessible",data:{action:r.addAccessible.action,info:{userid:Number(t),productid:this.productid,infoid:e}},success(t){t.getret}})},delAccessible(t){a.a.ajax({remark:"delAccessible",data:{action:r.delAccessible.action,info:{productid:this.productid,infovisitid:t}},success(t){0===t.getret&&console.log("获取当前具有权限的用户列表")}})},ok(){this.targetKeys1=[]},cancel(){this.targetKeys1=[]}}},m=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"zmiti-informanagernews-main-ui"},[i("div",{staticClass:"zmiti-list-main"},[i("div",{staticClass:"zmiti-informanagernews-table lt-full"},[i("header",{staticClass:"zmiti-tab-header"},[i("div",[i("span",[t._v(t._s(t.columntitle))])]),t._v(" "),i("div",[i("Button",{attrs:{type:"primary"},on:{click:function(e){return t.add()}}},[t._v("添加")])],1)]),t._v(" "),i("div",{staticClass:"zmiti-submit-main zmiti-scroll",style:{height:t.viewH-110+"px"}},[i("div",{staticClass:"zmiti-tabs-select"},[i("Tabs",{on:{"on-click":t.currentTabs}},t._l(t.typeDataList,(function(t,e){return i("TabPane",{key:e,attrs:{label:t.typename,name:t.infotypeid.toString()}})})),1)],1),t._v(" "),i("section",{staticClass:"zmiti-list-where"},[i("Input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入标题"},model:{value:t.title,callback:function(e){t.title=e},expression:"title"}}),t._v(" "),i("div",{staticClass:"zmiti-search-dates"},[i("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"daterange","start-date":new Date(2018,12,1),placement:"bottom-end",placeholder:"选择时间段"},on:{"on-change":t.selectDates}})],1),t._v(" "),i("Button",{attrs:{icon:"md-search"},on:{click:t.searchHandle}},[t._v("搜索")])],1),t._v(" "),i("ZmitiTable",{attrs:{loading:t.loading,dataSource:t.dataSource,columns:t.columns,current:t.currentNumber,change:t.change,"page-size":t.condition.page_size,total:t.total}})],1)])]),t._v(" "),i("Modal",{attrs:{title:"访问人员列表",width:"470"},on:{"on-ok":t.ok,"on-cancel":t.cancel},model:{value:t.modal1,callback:function(e){t.modal1=e},expression:"modal1"}},[i("Transfer",{attrs:{titles:["普通用户","可访问用户"],data:t.data1,"target-keys":t.targetKeys1,"render-format":t.render1},on:{"on-change":t.handleChange1}}),t._v(" "),i("div",{attrs:{slot:"footer"},slot:"footer"})],1)],1)};m._withStripped=!0;var p=i(3),u=!1;var f=function(t){u||i(159)},g=Object(p.a)(c,m,[],!1,f,"data-v-4a8899fe",null);g.options.__file="components\\infomanager\\msg\\list.vue";e.a=g.exports},653:function(t,e,i){var a=i(654);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,i(6).default)("07a90313",a,!1,{})},654:function(t,e,i){(t.exports=i(4)()).push([t.i,"",""])},774:function(t,e,i){"use strict";i.r(e);var a=i(0),n=i(2),s=i(164),{companyActions:o,zmitiActions:r,infomanagerActions:d,formatDate:l,userActions:c}=n.a,m={props:["obserable"],name:"zmitiindex",data:()=>({targetKeys:[],showAvatarModal:!1,companyname:"",addDataSource:[],imgs:window.imgs,total:0,loading:!0,currentCityIndex:-1,currentCityId:-1,transX:0,transY:0,viewH:window.innerHeight,viewW:window.innerWidth,productid:0,showTemplate:!1}),components:{IninforManager:s.a},beforeCreate(){},created(){this.companyid=n.a.getCurrentCompanyId().companyid},mounted(){this.init(()=>{})},watch:{$route:{handler(){var t=this.productid;t&&this.$router.push({path:"/infomanagernotice/"+t})}},productid(){this.showTemplate=!0}},methods:{init(t){var e=this,i=setInterval(()=>{if(a.default.productList){clearInterval(i);var n=this.$route.params.id;n||a.default.productList.forEach(t=>{e.$route.name.indexOf(t.producturl.substr(1))>-1&&(n=t.productid)}),this.$router.push({path:"/infomanagernotice/"+n}),this.productid=n,t&&t(n)}},100)}}},p=function(){var t=this.$createElement,e=this._self._c||t;return e("div",[1==this.showTemplate?[e("ininfor-manager",{attrs:{productid:this.productid,columntitle:"通知",specialnum:"2"}})]:this._e()],2)};p._withStripped=!0;var u=i(3),f=!1;var g=function(t){f||i(653)},h=Object(u.a)(m,p,[],!1,g,"data-v-e99ac89a",null);h.options.__file="components\\infomanager\\notice\\index.vue";e.default=h.exports}}]);