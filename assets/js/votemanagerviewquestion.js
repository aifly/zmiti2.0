(window.webpackJsonp=window.webpackJsonp||[]).push([[67],{686:function(t,i,e){var a=e(687);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);(0,e(6).default)("c560fafa",a,!1,{})},687:function(t,i,e){(t.exports=e(4)()).push([t.i,"\n.zmiti-votemanagerviewanswer-main-ui[data-v-021568ec]{background:#f2f2f2;box-sizing:border-box;height:100%;width:99%;margin:0 auto\n}\n.zmiti-votemanagerviewanswer-main-ui .zmiti-list-main[data-v-021568ec]{box-sizing:border-box;background:#fff;margin:0 auto\n}\n.zmiti-votemanagerviewanswer-main-ui .zmiti-submit-main[data-v-021568ec]{flex:5;-webkit-flex:5;width:100%\n}\n.zmiti-votemanagerviewanswer-main-ui .zmiti-submit-main>div[data-v-021568ec]{-webkit-transition:.3s;transition:.3s\n}\n.zmiti-votemanagerviewanswer-main-ui .zmiti-submit-main .zmiti-submit-table[data-v-021568ec]{width:98%;margin:0 auto\n}\n.zmiti-add-form[data-v-021568ec]{flex:1;-webkit-flex:1;width:500px;overflow:auto;position:absolute !important;top:0;right:0;z-index:100;height:100%;position:relative;box-shadow:0 0 0 1px #ccc;box-sizing:border-box;background:#f9f9f9\n}\n.zmiti-add-form .zmiti-safe-content[data-v-021568ec]{display:flex;display:-webkit-flex;flex-flow:row;-webkit-align-items:center;align-items:center;margin-top:30px;justify-content:space-around;-webkit-justify-content:space-around;border:1px dashed #ccc;padding:10px 0\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-021568ec]:nth-of-type(1){text-align:center;width:120px;font-weight:bold\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-021568ec]:nth-of-type(2){flex:1;-webkit-flex:1\n}\n.zmiti-add-form .zmiti-safe-content>div[data-v-021568ec]:nth-of-type(3){width:80px;cursor:pointer;text-align:center;color:#06c\n}\n.zmiti-add-form.detail-enter-active[data-v-021568ec],.zmiti-add-form.detail-leave-active[data-v-021568ec]{-webkit-transition:.2s;transition:.2s\n}\n.zmiti-add-form.detail-enter[data-v-021568ec],.zmiti-add-form.detail-leave-to[data-v-021568ec]{-webkit-transform:translateX(100%);transform:translateX(100%)\n}\n.zmiti-add-form .zmiti-submit-avatar[data-v-021568ec]{background:rgba(51,144,255,0.1);border-radius:50%;text-align:center;width:80px;height:80px;line-height:80px;margin:0 auto 30px;cursor:pointer;position:relative\n}\n.zmiti-add-form .zmiti-submit-avatar label[data-v-021568ec]{position:absolute;bottom:-50px;font-size:12px;width:100%;text-align:center;left:0\n}\n.zmiti-add-form .zmiti-submit-avatar span[data-v-021568ec]{font-size:40px;color:rgba(51,144,255,0.8)\n}\n.zmiti-add-form .zmiti-add-form-C[data-v-021568ec]{margin:10px auto 2px;width:90%\n}\n.zmiti-add-form .zmiti-add-form-item[data-v-021568ec]{line-height:50px;height:50px\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-021568ec]{text-align:center;position:relative;z-index:10\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-021568ec]{margin:0 20px;padding:2px 20px\n}\n.zmiti-add-form .zmiti-add-form-item input[data-v-021568ec]{padding-left:6px;height:32px;width:70%;border:1px solid #d8d8d8;outline:none\n}\n.zmiti-inforuserlist-select ul[data-v-021568ec]{display:flex;display:-webkit-flex;flex-flow:row;flex-wrap:wrap\n}\n.zmiti-inforuserlist-select ul li[data-v-021568ec]{width:120px\n}\n.zmiti-scroll[data-v-021568ec]{overflow:auto\n}\n.zmiti-votemanagerviewanswer-list[data-v-021568ec]{margin:20px\n}\n.zmiti-list-nodata[data-v-021568ec]{text-align:center;background-color:#ffffff;border:1px solid #e8eaec;margin:10px;padding:8px 0\n}\n",""])},787:function(t,i,e){"use strict";e.r(i);var a=e(2),n=e(9),{companyActions:o,zmitiActions:r,infomanagerActions:d,formatDate:s,userActions:m,voteActions:c}=a.a,l={props:["obserable"],name:"zmitiindex",data(){return{companyid:"",companyname:"",votetitle:"",imgs:window.imgs,total:0,loading:!0,viewH:window.innerHeight,viewW:window.innerWidth,dataSource:[],showTable:!1,currentNumber:1,condition:{page_index:0,page_size:10},userinfo:{},productid:0,voteid:void 0,columns:[{title:"编号",key:"vuid",align:"center",width:100},{title:"名字",key:"username",align:"center"},{title:"邮箱",key:"email",align:"center"},{title:"投票时间",key:"createtime",align:"center",width:180,render:(t,i)=>t("div",{},this.timestampToTime(i.row.createtime))},{title:"操作",key:"action",align:"center",width:150,render:(t,i)=>t("div",{style:{cursor:"pointer",color:"rgb(0, 102, 204)"},on:{click:()=>{this.$router.push({name:"votemanagerviewuservote",params:{id:this.productid,voteid:i.row.voteid,vuid:i.row.vuid}})}}},"查看本次投票")}]}},components:{ZmitiTable:n.a},beforeCreate(){},created(){this.companyid=a.a.getCurrentCompanyId().companyid,this.productid=this.$route.params.id,this.voteid=this.$route.params.voteid},mounted(){this.getDataList()},computed:{},watch:{},methods:{goback(){window.history.back()},change(t){this.condition.page_index=t-1,this.currentNumber=t,this.getDataList()},getDataList(){var{condition:t}=this,i=this;t=Object.assign(t,{companyid:a.a.getCurrentCompanyId().companyid,productid:i.productid,voteid:i.voteid}),a.a.ajax({remark:"getuservoteList",data:{action:c.getuservoteList.action,condition:t},error(){i.loading=!1},success(t){i.loading=!1,console.log(t,"获取列表"),0===t.getret&&(i.total=t.total,i.dataSource=t.list)}})},timestampToTime(t){var i=new Date(1e3*t);return i.getFullYear()+"-"+((i.getMonth()+1<10?"0"+(i.getMonth()+1):i.getMonth()+1)+"-")+(i.getDate()+1<10?"0"+i.getDate():i.getDate())}}},p=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",{staticClass:"zmiti-votemanagerviewanswer-main-ui"},[e("div",{staticClass:"zmiti-list-main"},[e("div",{staticClass:"zmiti-informanager-table lt-full"},[e("header",{staticClass:"zmiti-tab-header"},[t._m(0),t._v(" "),e("div",[e("Button",{attrs:{type:"default"},on:{click:function(i){return t.goback()}}},[t._v("返回")])],1)]),t._v(" "),e("div",{staticClass:"zmiti-submit-main zmiti-scroll",style:{height:t.viewH-110+"px"}},[e("ZmitiTable",{attrs:{loading:t.loading,dataSource:t.dataSource,columns:t.columns,change:t.change,"page-size":t.condition.page_size,total:t.total}})],1)])])])};p._withStripped=!0;var v=e(3),u=!1;var f=function(t){u||e(686)},g=Object(v.a)(l,p,[function(){var t=this.$createElement,i=this._self._c||t;return i("div",[i("span",[this._v("查看参与用户")])])}],!1,f,"data-v-021568ec",null);g.options.__file="components\\votemanager\\view\\question.vue";i.default=g.exports}}]);