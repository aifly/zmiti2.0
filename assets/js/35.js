(window.webpackJsonp=window.webpackJsonp||[]).push([[35],{38:function(r,e,t){"use strict";t.r(e);var o=t(3),i=o.a.userActions,n={props:["obserable"],name:"zmitiindex",data:()=>({productionList:[],formWorkOrder:{workordertype:-1,smstime:2,productid:""},imgs:window.imgs,userinfo:{username:"一位巨蟹",avatar:window.imgs.zmiti1},ruleValidate:{content:[{required:!0,message:"问题描述不能为空",trigger:"blur"}],usermobile:[{required:!0,message:"手机号不能为空",trigger:"blur"}]},workOrderType:[{type:"财务类",desc:"订单，合同，充值，发票，汇款，等与资金相关问题"},{type:"会员帐号类",desc:"更换用户信息，找回密码，空间，到期时间，用户数等相关"},{type:"定制服务类",desc:"个性化定制，设计，规划及相关服务类问题"},{type:"产品技术类",desc:"现有产品的所有技术相关问题及接口类问题"},{type:"其它类",desc:"您无法判断的所有问题都可以此选择提问"}]}),components:{},beforeCreate(){window.s=this},watch:{},mounted(){this.getProductList()},methods:{chooseOrderType(r){this.formWorkOrder.productid=r.productid,console.log(this.formWorkOrder,"this.formWorkOrder")},getProductList(){o.a.getProductList(r=>{0===r.getret&&(this.productionList=r.list)})},submitWorkOrder(){-1===this.formWorkOrder.workordertype&&delete this.formWorkOrder.workordertype;var{$Message:r}=this;o.a.ajax({remark:"userCommitWorkOrder",data:{action:i.userCommitWorkOrder.action,info:this.formWorkOrder},success(e){r[0===e.getret?"success":"error"](e.msg),setTimeout(()=>{window.location.hash="/workorderlist"},1e3)}})}}},a=function(){var r=this,e=r.$createElement,t=r._self._c||e;return t("div",{staticClass:"zmiti-workorder-main-ui lt-full"},[r._m(0),r._v(" "),t("div",{staticClass:"zmiti-workorder-choose"},[t("header",{staticClass:"zmiti-workorder-header-bar"},[r._v("\n\t\t\t咨询类工单问题\n\t\t")]),r._v(" "),r.formWorkOrder.workordertype<=-1&&!r.formWorkOrder.productid?[t("ul",r._l(r.workOrderType,function(e,o){return t("li",{key:o},[t("div",{staticClass:"zmiti-workerorder-type-top"},[t("div",[r._v(r._s(e.type))]),r._v(" "),t("div",[t("Button",{on:{click:function(e){r.formWorkOrder.workordertype=o}}},[r._v("提问")])],1)]),r._v(" "),t("div",[r._v("\n\t\t\t\t\t\t"+r._s(e.desc)+"\n\t\t\t\t\t")])])}),0),r._v(" "),t("header",{staticClass:"zmiti-workorder-header-bar",staticStyle:{"margin-top":"30px"}},[r._v("\n\t\t\t\t产品类型工单问题\n\t\t\t")]),r._v(" "),t("ul",r._l(r.productionList,function(e,o){return t("li",{key:o,staticStyle:{background:"#eee"}},[t("div",{staticClass:"zmiti-workerorder-type-top zmiti-workerorder-type-top1"},[t("div",{staticStyle:{"margin-right":"30px"}},[r._v(r._s(e.productname))]),r._v(" "),t("div",[t("Button",{on:{click:function(t){return r.chooseOrderType(e)}}},[r._v("提问")])],1)]),r._v(" "),t("div",[r._v("\n\t\t\t\t\t\t"+r._s(e.desc)+"\n\t\t\t\t\t")])])}),0)]:t("Form",{staticClass:"zmiti-add-form-C",staticStyle:{"padding-top":"20px",width:"90%",margin:"0 auto"},attrs:{rules:r.ruleValidate,model:r.formWorkOrder,"label-width":100}},[t("FormItem",{attrs:{label:"问题描述：",prop:"content"}},[t("Input",{attrs:{rows:4,type:"textarea",placeholder:"问题描述："},model:{value:r.formWorkOrder.content,callback:function(e){r.$set(r.formWorkOrder,"content",e)},expression:"formWorkOrder.content"}})],1),r._v(" "),t("FormItem",{attrs:{label:"手机号：",prop:"usermobile"}},[t("Input",{attrs:{placeholder:"手机号："},model:{value:r.formWorkOrder.usermobile,callback:function(e){r.$set(r.formWorkOrder,"usermobile",e)},expression:"formWorkOrder.usermobile"}})],1),r._v(" "),t("FormItem",{attrs:{label:"接收短信时间："}},[t("RadioGroup",{model:{value:r.formWorkOrder.smstime,callback:function(e){r.$set(r.formWorkOrder,"smstime",e)},expression:"formWorkOrder.smstime"}},[t("Radio",{attrs:{label:0}},[r._v("任意时间")]),r._v(" "),t("Radio",{attrs:{label:1}},[r._v("每天9点~18点")]),r._v(" "),t("Radio",{attrs:{label:2}},[r._v("从不接收")])],1)],1),r._v(" "),t("FormItem",{attrs:{label:"邮箱：",prop:"useremail"}},[t("Input",{attrs:{placeholder:"邮箱："},model:{value:r.formWorkOrder.useremail,callback:function(e){r.$set(r.formWorkOrder,"useremail",e)},expression:"formWorkOrder.useremail"}})],1),r._v(" "),t("FormItem",{attrs:{label:"附件上传："}},[t("Button",{attrs:{icon:"md-cloud-upload"}},[r._v("上传")])],1),r._v(" "),t("FormItem",{attrs:{label:""}},[t("Button",{attrs:{type:"primary"},on:{click:r.submitWorkOrder}},[r._v("提交")])],1)],1)],2)])};a._withStripped=!0;var d=t(7),s=!1;var m=function(r){s||t(93)},l=Object(d.a)(n,a,[function(){var r=this.$createElement,e=this._self._c||r;return e("header",{staticClass:"zmiti-tab-header"},[e("div",[this._v("提交工单")]),this._v(" "),e("div")])}],!1,m,"data-v-0e1afbdb",null);l.options.__file="components\\workorder\\index.vue";e.default=l.exports},93:function(r,e,t){var o=t(94);"string"==typeof o&&(o=[[r.i,o,""]]),o.locals&&(r.exports=o.locals);(0,t(6).default)("25e92926",o,!1,{})},94:function(r,e,t){(r.exports=t(2)()).push([r.i,"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\r\n    background-color: #fff;\r\n    border-color: #bf1616;\r\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\r\n}*/\n.zmiti-workorder-main-ui[data-v-0e1afbdb] {\n  background: #fff;\n  padding: 10px;\n}\n.zmiti-workorder-main-ui .zmiti-workorder-choose[data-v-0e1afbdb] {\n    width: 100%;\n    border: 1px solid #ccc;\n    margin-top: 10px;\n    padding: 10px;\n    padding-bottom: 20px;\n}\n.zmiti-workorder-main-ui .zmiti-workorder-choose .zmiti-workorder-header-bar[data-v-0e1afbdb] {\n      text-indent: 1em;\n      font-size: 14px;\n      position: relative;\n      height: 40px;\n      border: 1px solid #f5f6fa;\n      background: #f5f6fa;\n      line-height: 40px;\n}\n.zmiti-workorder-main-ui .zmiti-workorder-choose .zmiti-workorder-header-bar[data-v-0e1afbdb]:before {\n        content: '';\n        left: 0;\n        top: 0;\n        height: 100%;\n        width: 4px;\n        background: #333;\n        position: absolute;\n}\n.zmiti-workorder-main-ui .zmiti-workorder-choose > ul[data-v-0e1afbdb] {\n      margin-top: 30px;\n      display: flex;\n      display: -webkit-flex;\n      flex-flow: row;\n      justify-content: space-between;\n      -webkit-justify-content: space-between;\n}\n.zmiti-workorder-main-ui .zmiti-workorder-choose > ul li[data-v-0e1afbdb] {\n        margin: 0 10px;\n}\n.zmiti-workorder-main-ui .zmiti-workorder-choose > ul .zmiti-workerorder-type-top[data-v-0e1afbdb] {\n        justify-content: space-between;\n        -webkit-justify-content: space-between;\n        align-items: center;\n        display: flex;\n        display: -webkit-flex;\n        flex-flow: row;\n        line-height: 50px;\n        padding: 0;\n}\n.zmiti-workorder-main-ui .zmiti-workorder-choose > ul .zmiti-workerorder-type-top.zmiti-workerorder-type-top1[data-v-0e1afbdb] {\n          padding: 0 20px;\n          box-sizing: border-box;\n          min-width: 250px;\n}\n",""])}}]);