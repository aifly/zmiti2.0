(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{130:function(t,e,i){"use strict";i.r(e);var n=i(0),a=i(19),o=i(29),{companyActions:r,newsActions:s,adminActions:d}=a.a,l={props:["obserable"],name:"zmitiindex",data(){return{tabIndex:[0,-1],showAvatarModal:!1,visible:!1,avatarList:["&#xe6a5;","&#xe6a4;","&#xe6a3;","&#xe6a2;","&#xe6a0;"],editorOption:{modules:{toolbar:[["bold","link"],[{color:[]}],[{align:[]}],["clean"]]}},roleList:[],imgs:window.imgs,isLoading:!1,showDetail:!1,showDetailPage:-1,currentClassId:-1,adminuserId:"",currentUserid:"",formObj:{isover:0,newstype:0,avatar:"&#xe6a4;"},address:"",showPass:!1,showMap:!1,viewH:window.innerHeight,viewW:window.innerWidth,dataSource:[],groupList:[],hideMenu:!1,columns:[{title:"编号",key:"newsid",align:"center",width:100},{title:"新闻标题",key:"title",align:"center"},{title:"新闻类型",key:"newstype",align:"center",width:100,render:(t,e)=>{return t("div",{},["公告","新闻","产品更新说明"][e.row.newstype+1])}},{title:"发布者",key:"author",align:"center",width:100},{title:"发布时间",key:"createtime",align:"center",width:150,render:(t,e)=>t("div",{},this.formatDate(e.row.createtime))},{title:"状态",key:"isover",align:"center",width:80,render:(t,e)=>{return t("div",{},["禁用","待发","发布"][e.row.status])}},{title:"点击量",key:"views",align:"center",width:150},{title:"操作",key:"action",align:"center",width:150,render:(t,e)=>t("div",[t("span",{props:{type:"primary",size:"small"},style:{margin:"2px 10px",border:"none",fontSize:"12px",cursor:"pointer",color:"#06C"},on:{click:()=>{this.formObj=e.row,this.$router.push({name:"article",params:{newsid:e.row.newsid}})}}},"编辑"),t("Poptip",{props:{confirm:!0,title:"确定要删除吗？",placement:"left"},on:{"on-ok":()=>{this.delete(e.row.newsid)}}},[t("span",{props:{type:"error",size:"small"},style:{cursor:"pointer",color:"#06C"},on:{click:()=>{}}},"删除")])])}],loading:!0,formcompany:{pdfurl:"",longitude:"116.585856",latitude:"40.364989"},directoryList:{},condition:{page_index:0,page_size:10},productList:[],userCondition:{page_index:0,page_size:10},userList:[],userinfo:{},total:0}},components:{ZmitiTable:o.a},beforeCreate(){},mounted(){window.s=this,this.userinfo=a.a.getAdminUserInfo(),this.getDataList()},watch:{},methods:{change(){},getSelection(t){this.selectList=t},selectionDelete(){if(this.selectList.length<=0)this.$Message.error({content:"您还未选择任何要删除的项",duration:5});else{var t=this.selectList.map(t=>t.newsid).join(",");this.delete(t)}},closeMaskPage(){n.default.obserable.trigger({type:"toggleMask",data:!1})},delete(t){var e=this;a.a.adminAjax({remark:"delNews",data:{action:s.delNews.action,info:{newsids:t}},success(t){e.$Message[0===t.getret?"success":"error"](t.msg),0===t.getret&&e.getDataList()}})},getDataList(){var t=this;new Promise((e,i)=>{a.a.adminAjax({remark:"getNewsList",data:{action:s.getNewsList.action,condition:this.condition},success(i){t.loading=!1,0===i.getret&&(t.dataSource=i.list,t.total=i.total||i.list.length,e())}})})},onEditorBlur(){},onEditorFocus(){},onEditorChange(){},formatDate:function(t){let e=new Date(1e3*t),i=e.getFullYear(),n=e.getMonth()+1;n=n<10?"0"+n:n;let a=e.getDate();a=a<10?"0"+a:a;let o=e.getHours();o=o<10?"0"+o:o;let r=e.getMinutes();r=r<10?"0"+r:r;let s=e.getSeconds();return i+"-"+n+"-"+a+" "+o+":"+r+":"+(s=s<10?"0"+s:s)}}},c=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"zmiti-news-main-ui"},[i("div",{staticClass:"zmiti-list-main"},[i("header",{staticClass:"zmiti-tab-header"},[i("div",[t._v("新闻管理")]),t._v(" "),i("div",[i("router-link",{attrs:{to:{name:"article"}}},[i("Button",{attrs:{type:"primary"}},[t._v("新增新闻")])],1)],1)]),t._v(" "),i("section",{staticClass:"zmiti-list-where"},[t._v("\n\t\t\t新闻名称："),i("Input",{staticStyle:{width:"auto"},attrs:{placeholder:"新闻名称"}}),t._v("\n\t\t\t新闻地址："),i("Input",{staticStyle:{width:"auto"},attrs:{placeholder:"新闻地址"}}),t._v(" "),i("Button",{attrs:{type:"primary"}},[t._v("查询")])],1),t._v(" "),i("div",{staticClass:"zmiti-news-main zmiti-scroll ",style:{height:t.viewH-180+"px"}},[i("ZmitiTable",{attrs:{loading:t.loading,dataSource:t.dataSource,columns:t.columns,change:t.change,"page-size":t.condition.page_size,total:t.total},on:{getSelection:t.getSelection}},[i("div",{staticStyle:{display:"inline-block"},attrs:{slot:"table-btns"},slot:"table-btns"},[i("Poptip",{attrs:{confirm:"",title:"确定要删除吗?"},on:{"on-ok":t.selectionDelete}},[i("div",{staticClass:"zmiti-table-btn"},[t._v("删除")])]),t._v(" "),i("div",{staticClass:"zmiti-table-btn"},[t._v("禁用")])],1)])],1)])])};c._withStripped=!0;var m=i(18),p=!1;var f=function(t){p||i(73)},u=Object(m.a)(l,c,[],!1,f,"data-v-32bf3c78",null);u.options.__file="admin\\news\\index.vue";e.default=u.exports},17:function(t,e,i){"use strict";function n(t,e){for(var i=[],n={},a=0;a<e.length;a++){var o=e[a],r=o[0],s={id:t+":"+a,css:o[1],media:o[2],sourceMap:o[3]};n[r]?n[r].parts.push(s):i.push(n[r]={id:r,parts:[s]})}return i}i.r(e),i.d(e,"default",(function(){return u}));var a="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!a)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},r=a&&(document.head||document.getElementsByTagName("head")[0]),s=null,d=0,l=!1,c=function(){},m=null,p="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function u(t,e,i,a){l=i,m=a||{};var r=n(t,e);return h(r),function(e){for(var i=[],a=0;a<r.length;a++){var s=r[a];(d=o[s.id]).refs--,i.push(d)}e?h(r=n(t,e)):r=[];for(a=0;a<i.length;a++){var d;if(0===(d=i[a]).refs){for(var l=0;l<d.parts.length;l++)d.parts[l]();delete o[d.id]}}}}function h(t){for(var e=0;e<t.length;e++){var i=t[e],n=o[i.id];if(n){n.refs++;for(var a=0;a<n.parts.length;a++)n.parts[a](i.parts[a]);for(;a<i.parts.length;a++)n.parts.push(g(i.parts[a]));n.parts.length>i.parts.length&&(n.parts.length=i.parts.length)}else{var r=[];for(a=0;a<i.parts.length;a++)r.push(g(i.parts[a]));o[i.id]={id:i.id,refs:1,parts:r}}}}function v(){var t=document.createElement("style");return t.type="text/css",r.appendChild(t),t}function g(t){var e,i,n=document.querySelector("style["+p+'~="'+t.id+'"]');if(n){if(l)return c;n.parentNode.removeChild(n)}if(f){var a=d++;n=s||(s=v()),e=x.bind(null,n,a,!1),i=x.bind(null,n,a,!0)}else n=v(),e=z.bind(null,n),i=function(){n.parentNode.removeChild(n)};return e(t),function(n){if(n){if(n.css===t.css&&n.media===t.media&&n.sourceMap===t.sourceMap)return;e(t=n)}else i()}}var b,w=(b=[],function(t,e){return b[t]=e,b.filter(Boolean).join("\n")});function x(t,e,i,n){var a=i?"":n.css;if(t.styleSheet)t.styleSheet.cssText=w(e,a);else{var o=document.createTextNode(a),r=t.childNodes;r[e]&&t.removeChild(r[e]),r.length?t.insertBefore(o,r[e]):t.appendChild(o)}}function z(t,e){var i=e.css,n=e.media,a=e.sourceMap;if(n&&t.setAttribute("media",n),m.ssrId&&t.setAttribute(p,e.id),a&&(i+="\n/*# sourceURL="+a.sources[0]+" */",i+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(a))))+" */"),t.styleSheet)t.styleSheet.cssText=i;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(i))}}},18:function(t,e,i){"use strict";function n(t,e,i,n,a,o,r,s){var d=typeof(t=t||{}).default;"object"!==d&&"function"!==d||(t=t.default);var l,c="function"==typeof t?t.options:t;if(e&&(c.render=e,c.staticRenderFns=i,c._compiled=!0),n&&(c.functional=!0),o&&(c._scopeId=o),r?(l=function(t){(t=t||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext)||"undefined"==typeof __VUE_SSR_CONTEXT__||(t=__VUE_SSR_CONTEXT__),a&&a.call(this,t),t&&t._registeredComponents&&t._registeredComponents.add(r)},c._ssrRegister=l):a&&(l=s?function(){a.call(this,this.$root.$options.shadowRoot)}:a),l)if(c.functional){c._injectStyles=l;var m=c.render;c.render=function(t,e){return l.call(e),m(t,e)}}else{var p=c.beforeCreate;c.beforeCreate=p?[].concat(p,l):[l]}return{exports:t,options:c}}i.d(e,"a",(function(){return n}))},27:function(t,e,i){var n=i(28);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(17).default)("a2e08e78",n,!1,{})},28:function(t,e,i){(t.exports=i(1)()).push([t.i,"\n.zmiti-user-table[data-v-2dad493e]{width:98%;margin:2px auto\n}\n.zmiti-text-overflow[data-v-2dad493e]{overflow:hidden;white-space:nowrap;word-break:break-all;text-overflow:ellipsis;-webkit-text-overflow:ellipsis\n}\n.zmiti-pager[data-v-2dad493e]{margin:0px auto;width:98%;padding:10px 0;background:#eee;display:flex;display:-webkit-flex;flex-flow:row;justify-content:space-between;-webkit-justify-content:space-between;border:1px solid #dcdee2;border-top:none\n}\n.zmiti-pager button.ivu-btn[data-v-2dad493e]{height:32px;background:#fff;border-color:#ddd;color:#222\n}\n.zmiti-pager>div[data-v-2dad493e],.zmiti-pager>ul[data-v-2dad493e]{margin:0 20px;line-height:30px;position:relative;z-index:10\n}\n",""])},29:function(t,e,i){"use strict";var n={props:{height:{type:Number},current:{type:Number,default:1},dataSource:{type:Array,default:[]},columns:{type:Array,default:[]},change:{type:Function,default:()=>{}},pageSize:{type:Number},total:{type:Number,default:0},loading:{type:Boolean,default:!0},border:{type:Boolean,default:!1}},data:()=>({myColumns:[{type:"selection",width:60,align:"center"}]}),mounted(){this.myColumns=this.myColumns.concat(this.columns)},methods:{selectAll(t){this.$refs.selection.selectAll(t)},selection(t){this.$emit("getSelection",t)}}},a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"zmiti-user-table"},[i("Table",{ref:"selection",attrs:{height:t.height,border:t.border,loading:t.loading,data:t.dataSource,columns:t.myColumns},on:{"on-selection-change":t.selection}})],1),t._v(" "),i("div",{staticClass:"zmiti-pager"},[i("div",[i("Checkbox",{on:{"on-change":t.selectAll}},[i("span",{staticStyle:{opacity:"0"}},[t._v("全")])]),t._v(" "),t._t("table-btns")],2),t._v(" "),i("Page",{attrs:{current:t.current,"page-size":t.pageSize,total:t.total,"show-total":""},on:{"on-change":t.change}})],1)])};a._withStripped=!0;var o=i(18),r=!1;var s=function(t){r||i(27)},d=Object(o.a)(n,a,[],!1,s,"data-v-2dad493e",null);d.options.__file="common\\table\\index.vue";e.a=d.exports},73:function(t,e,i){var n=i(74);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);(0,i(17).default)("1473c395",n,!1,{})},74:function(t,e,i){(t.exports=i(1)()).push([t.i,'\n.zmiti-news-main-ui[data-v-32bf3c78]{background:#f2f2f2;box-sizing:border-box;height:100%;width:99%;margin:0 auto\n}\n.zmiti-news-main-ui .zmiti-avatar-list[data-v-32bf3c78]{display:flex;display:-webkit-flex;flex-flow:row\n}\n.zmiti-news-main-ui .zmiti-avatar-list span[data-v-32bf3c78]{font-size:40px;margin-right:20px;cursor:pointer\n}\n.zmiti-news-main-ui .zmiti-avatar-list span.active[data-v-32bf3c78]{color:#3390ff\n}\n.zmiti-news-main-ui .ivu-table-wrapper[data-v-32bf3c78]{border-bottom:none;border-right:none\n}\n.zmiti-news-main-ui .zmiti-list-main[data-v-32bf3c78]{box-sizing:border-box;background:#fff;margin:0 auto;flex:2;-webkit-flex:2;position:relative;top:5px;display:flex;display:-webkit-flex;flex-flow:column\n}\n.zmiti-news-main-ui .zmiti-list-main[data-v-32bf3c78]:before{content:"";position:absolute;width:100%;height:100%;left:0;top:0;box-shadow:0 0 0 1px #ccc\n}\n.zmiti-news-main-ui .zmiti-list-main .zmiti-add-form-close[data-v-32bf3c78]{z-index:100\n}\n.zmiti-news-main-ui .zmiti-list-main>div[data-v-32bf3c78]{margin:10px auto 10px;position:relative;flex:1;-webkit-flex:1\n}\n.zmiti-news-main-ui .zmiti-list-main>div .zmiti-meet-form[data-v-32bf3c78]{width:100%;margin:0px auto;padding:20px 40px;height:600px;overflow:auto\n}\n.zmiti-news-main-ui .zmiti-list-main .zmiti-list-where[data-v-32bf3c78]{width:98%;margin:10px auto 0;height:40px;line-height:40px;font-size:14px;position:relative;z-index:10\n}\n.zmiti-news-main-ui .zmiti-list-main .zmiti-list-where input[data-v-32bf3c78]{height:30px\n}\n.zmiti-news-main-ui .zmiti-list-main .zmiti-news-main[data-v-32bf3c78]{flex:5;-webkit-flex:5;width:100%\n}\n.zmiti-news-main-ui .zmiti-list-main .zmiti-news-main>div[data-v-32bf3c78]{-webkit-transition:.3s;transition:.3s\n}\n.zmiti-news-main-ui .zmiti-list-main .zmiti-news-main .zmiti-cnewstable[data-v-32bf3c78]{width:98%;margin:0 auto\n}\n.zmiti-news-main-ui .lt-full[data-v-32bf3c78]{position:fixed !important;background:rgba(0,0,0,0.5);z-index:1001;overflow:hidden\n}\n.zmiti-news-main-ui .lt-full .zmiti-left-pannel[data-v-32bf3c78]{position:absolute;width:100%;height:100px;left:0;top:0;z-index:10\n}\n.zmiti-add-form[data-v-32bf3c78]{flex:1;-webkit-flex:1;width:500px;overflow:auto;position:absolute !important;top:0;right:0;z-index:100;height:100%;position:relative;box-shadow:0 0 0 1px #ccc;box-sizing:border-box;background:#f9f9f9\n}\n.zmiti-add-form .zmiti-safe-content[data-v-32bf3c78]{display:flex;display:-webkit-flex;flex-flow:row;-webkit-align-items:center;align-items:center;margin-top:30px;justify-content:space-around;-webkit-justify-content:space-around;border:1px dashed #ccc;padding:10px 0\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-32bf3c78]:nth-of-type(1){text-align:center;width:120px;font-weight:bold\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-32bf3c78]:nth-of-type(2){flex:1;-webkit-flex:1\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-32bf3c78]:nth-of-type(3){width:80px;cursor:pointer;text-align:center;color:#06c\n}\n.zmiti-add-form.detail-enter-active[data-v-32bf3c78],.zmiti-add-form.detail-leave-active[data-v-32bf3c78]{-webkit-transition:.2s;transition:.2s\n}\n.zmiti-add-form.detail-enter[data-v-32bf3c78],.zmiti-add-form.detail-leave-to[data-v-32bf3c78]{-webkit-transform:translateX(100%);transform:translateX(100%)\n}\n.zmiti-add-form .zmiti-conewsvatar[data-v-32bf3c78]{background:rgba(51,144,255,0.1);border-radius:50%;text-align:center;width:80px;height:80px;line-height:80px;margin:0 auto 30px;cursor:pointer;position:relative\n}\n.zmiti-add-form .zmiti-conewsvatar label[data-v-32bf3c78]{position:absolute;bottom:-50px;font-size:12px;width:100%;text-align:center;left:0\n}\n.zmiti-add-form .zmiti-conewsvatar span[data-v-32bf3c78]{font-size:40px;color:rgba(51,144,255,0.8)\n}\n.zmiti-add-form .zmiti-add-form-C[data-v-32bf3c78]{margin:10px auto 2px;width:90%\n}\n.zmiti-add-form .zmiti-add-form-item[data-v-32bf3c78]{line-height:50px;height:50px\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-32bf3c78]{text-align:center;position:relative;z-index:10\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-32bf3c78]{margin:0 20px;padding:2px 20px\n}\n.zmiti-add-form .zmiti-add-form-item input[data-v-32bf3c78]{padding-left:6px;height:32px;width:70%;border:1px solid #d8d8d8;outline:none\n}\n.ivu-icon-ios-help-circle[data-v-32bf3c78]{left:25px\n}\n.ivu-radio-inner[data-v-32bf3c78]:after{border-radius:10px !important\n}\n.ivu-btn a[data-v-32bf3c78]{color:#333\n}\n.ivu-btn-primary a[data-v-32bf3c78]{color:#ffffff\n}\n',""])}}]);