(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[5],{

/***/ "./common/config.js":
/*!**************************!*\
  !*** ./common/config.js ***!
  \**************************/
/*! exports provided: workOrderType, orderStatus, defaultClass, defaultExtNames, manuscriptStatus */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"workOrderType\", function() { return workOrderType; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"orderStatus\", function() { return orderStatus; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultClass\", function() { return defaultClass; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"defaultExtNames\", function() { return defaultExtNames; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"manuscriptStatus\", function() { return manuscriptStatus; });\nvar workOrderType = {\n\t0: '财务类',\n\t1: \"会员账号\",\n\t2: \"定制服务类\",\n\t3: \"产品技术类\",\n\t4: \"其它类\"\n};\n\nlet orderStatus = {\n\t0: {\n\t\tstatus: '已禁用'\n\t},\n\t1: {\n\t\tstatus: '已受理'\n\t},\n\t2: {\n\t\tstatus: '已处理'\n\t},\n\t3: {\n\t\tstatus: '已确认'\n\t},\n\t4: {\n\t\tstatus: '已评价'\n\t}\n};\nlet resourceClass = [//资源分类\n{\n\tname: \"全部\",\n\ttype: -1\n}, {\n\tname: '图片',\n\ttype: 0\n}, {\n\tname: '视频',\n\ttype: 1\n}, {\n\tname: '音频',\n\ttype: 2\n}, {\n\tname: '文件',\n\ttype: 3\n}];\nlet defaultClass = (id = 3) => [//资源库默认分类\n{\n\tname: '系统',\n\ticon: '&#xe611;',\n\tid: 1\n}, {\n\tname: '单位',\n\ticon: '&#xe612;',\n\tid: 2\n}, {\n\tname: \"个人\",\n\ticon: '&#xe613;',\n\tid,\n\tcateList: resourceClass.concat([])\n}];\n\nlet defaultExtNames = {\n\tpdf: '&#xe665;',\n\n\txls: '&#xe614;',\n\txlsx: '&#xe614;',\n\n\tmp3: '&#xe7df;',\n\togg: '&#xe7df;',\n\tm4a: '&#xe7df;',\n\n\tdoc: '&#xe63c;',\n\tdocx: '&#xe63c;',\n\n\tmp4: '&#xe601;',\n\twebm: '&#xe601;',\n\tmov: '&#xe601;',\n\tflv: '&#xe601;',\n\n\tother: '&#xe606;'\n\n};\nlet manuscriptStatus = [{\n\tname: '待审核',\n\ticon: '&#xe6bc;',\n\tcolor: \"#3390ff\"\n}, {\n\tname: '审核通过',\n\ticon: '&#xe61b;',\n\tcolor: \"#00c0de\"\n}, {\n\tname: '拒绝',\n\ticon: '&#xe61e;',\n\tcolor: \"#ff4664\"\n}, {\n\tname: '暂缓',\n\ticon: '&#xe61f;',\n\tcolor: \"#ffce01\"\n}];\n\n\n\n//# sourceURL=webpack:///./common/config.js?");

/***/ }),

/***/ "./common/workorderdetail/index.vue":
/*!******************************************!*\
  !*** ./common/workorderdetail/index.vue ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_node_modules_iview_loader_index_js_ref_4_1_index_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !babel-loader!../../node_modules/vue-loader/lib/selector?type=script&index=0!../../node_modules/iview-loader??ref--4-1!./index.vue */ \"./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue\");\n/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_4836f6c1_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_node_modules_iview_loader_index_js_ref_4_1_index_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/template-compiler/index?{\"id\":\"data-v-4836f6c1\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!../../node_modules/vue-loader/lib/selector?type=template&index=0!../../node_modules/iview-loader??ref--4-1!./index.vue */ \"./node_modules/vue-loader/lib/template-compiler/index.js?{\\\"id\\\":\\\"data-v-4836f6c1\\\",\\\"hasScoped\\\":false,\\\"optionsId\\\":\\\"0\\\",\\\"buble\\\":{\\\"transforms\\\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue\");\n/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/component-normalizer */ \"./node_modules/vue-loader/lib/runtime/component-normalizer.js\");\nvar disposed = false\nfunction injectStyle (context) {\n  if (disposed) return\n  __webpack_require__(/*! !vue-loader/node_modules/vue-style-loader!css-loader!../../node_modules/vue-loader/lib/style-compiler/index?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!sass-loader!../../node_modules/vue-loader/lib/selector?type=styles&index=0!../../node_modules/iview-loader??ref--4-1!./index.vue */ \"./node_modules/vue-loader/node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\\\"optionsId\\\":\\\"0\\\",\\\"vue\\\":true,\\\"scoped\\\":false,\\\"sourceMap\\\":false}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue\")\n}\n/* script */\n\n\n/* template */\n\n/* template functional */\nvar __vue_template_functional__ = false\n/* styles */\nvar __vue_styles__ = injectStyle\n/* scopeId */\nvar __vue_scopeId__ = null\n/* moduleIdentifier (server only) */\nvar __vue_module_identifier__ = null\n\nvar Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__[\"default\"])(\n  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_node_modules_iview_loader_index_js_ref_4_1_index_vue__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_4836f6c1_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_node_modules_iview_loader_index_js_ref_4_1_index_vue__WEBPACK_IMPORTED_MODULE_1__[\"render\"],\n  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_4836f6c1_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_node_modules_iview_loader_index_js_ref_4_1_index_vue__WEBPACK_IMPORTED_MODULE_1__[\"staticRenderFns\"],\n  __vue_template_functional__,\n  __vue_styles__,\n  __vue_scopeId__,\n  __vue_module_identifier__\n)\nComponent.options.__file = \"common\\\\workorderdetail\\\\index.vue\"\n\n/* hot reload */\nif (false) {}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Component.exports);\n\n\n//# sourceURL=webpack:///./common/workorderdetail/index.vue?");

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue":
/*!******************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/iview-loader??ref--4-1!./common/workorderdetail/index.vue ***!
  \******************************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _lib_util__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../lib/util */ \"./common/lib/util.js\");\n/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../config */ \"./common/config.js\");\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n//\n\n\n\n\nvar { userActions, adminActions } = _lib_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n\n/* harmony default export */ __webpack_exports__[\"default\"] = ({\n\tprops: {\n\t\tisAdmin: {\n\t\t\ttype: Boolean,\n\t\t\tdefault: false\n\t\t}\n\t},\n\tdata() {\n\n\t\treturn {\n\t\t\tcontent: \"\",\n\t\t\torderStatus: _config__WEBPACK_IMPORTED_MODULE_1__[\"orderStatus\"],\n\t\t\tviewH: window.innerHeight,\n\t\t\tworkinfo: {\n\t\t\t\tstatus: 0,\n\t\t\t\tgrade: 1,\n\t\t\t\tissettle: 1,\n\t\t\t\toperainfo: []\n\t\t\t}\n\t\t};\n\t},\n\tmounted() {\n\t\tthis.userReadWorkOrder();\n\t},\n\tmethods: {\n\t\tformatDate: _lib_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].formatDate,\n\t\treplyOrder() {\n\t\t\t//回复工单\n\t\t\tvar { content, isAdmin, workinfo, $Message } = this;\n\t\t\tvar { grade, issettle } = workinfo;\n\t\t\tvar s = this;\n\t\t\tif (workinfo.status >= 2) {\n\t\t\t\t//已确认\n\t\t\t\tif (workinfo.status === 3 || isAdmin) {\n\t\t\t\t\treturn;\n\t\t\t\t}\n\t\t\t\t_lib_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"][isAdmin ? 'adminAjax' : 'ajax']({\n\t\t\t\t\tremark: \"evaluateWorkOrder\",\n\t\t\t\t\tdata: {\n\t\t\t\t\t\taction: userActions.evaluateWorkOrder.action,\n\t\t\t\t\t\tinfo: {\n\t\t\t\t\t\t\tworkorderid: workinfo.workorderid,\n\t\t\t\t\t\t\tfeedback: content,\n\t\t\t\t\t\t\tgrade,\n\t\t\t\t\t\t\tissettle\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\t\t\t\t\tsuccess(data) {\n\t\t\t\t\t\ts.content = '';\n\t\t\t\t\t\t$Message[data.getret === 0 ? 'success' : 'error'](data.msg);\n\t\t\t\t\t\ts.userReadWorkOrder();\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t} else {\n\t\t\t\t_lib_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"][isAdmin ? 'adminAjax' : 'ajax']({\n\t\t\t\t\tremark: \"replayWorkOrder\",\n\t\t\t\t\tdata: {\n\t\t\t\t\t\taction: (isAdmin ? adminActions : userActions).replayWorkOrder.action,\n\t\t\t\t\t\tinfo: {\n\t\t\t\t\t\t\tworkorderid: workinfo.workorderid,\n\t\t\t\t\t\t\tcontent,\n\t\t\t\t\t\t\tattachment: \"\",\n\t\t\t\t\t\t\toperatype: isAdmin ? 0 : 1 //\n\t\t\t\t\t\t}\n\t\t\t\t\t},\n\t\t\t\t\tsuccess(data) {\n\t\t\t\t\t\ts.content = '';\n\t\t\t\t\t\t$Message[data.getret === 0 ? 'success' : 'error'](data.msg);\n\t\t\t\t\t\ts.userReadWorkOrder();\n\t\t\t\t\t}\n\t\t\t\t});\n\t\t\t}\n\t\t},\n\t\tuserReadWorkOrder() {\n\t\t\tvar { isAdmin } = this;\n\t\t\tvar s = this;\n\t\t\t_lib_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"][isAdmin ? 'adminAjax' : 'ajax']({\n\t\t\t\tremark: \"userReadWorkOrder\",\n\t\t\t\tdata: {\n\t\t\t\t\t//action:isAdmin ? adminActions.userReadWorkOrder.action : userActions.userReadWorkOrder.action,\n\t\t\t\t\taction: (isAdmin ? adminActions : userActions).userReadWorkOrder.action,\n\t\t\t\t\tinfo: {\n\t\t\t\t\t\tworkorderid: this.$route.params.id\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tsuccess(data) {\n\t\t\t\t\tif (data.getret === 0) {\n\t\t\t\t\t\ts.workinfo = data.workinfo;\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\t\tcloseOrder() {\n\t\t\t//用户关闭工单 \n\t\t\tif (this.isAdmin) {\n\t\t\t\treturn;\n\t\t\t}\n\t\t\tvar { workinfo, $Message } = this;\n\t\t\tvar s = this;\n\t\t\t_lib_util__WEBPACK_IMPORTED_MODULE_0__[\"default\"].ajax({\n\t\t\t\tremark: \"userCloseWorkOrder\",\n\t\t\t\tdata: {\n\t\t\t\t\taction: userActions.userCloseWorkOrder.action,\n\t\t\t\t\tinfo: {\n\t\t\t\t\t\tworkorderid: workinfo.workorderid\n\t\t\t\t\t}\n\t\t\t\t},\n\t\t\t\tsuccess(data) {\n\t\t\t\t\t$Message[data.getret === 0 ? 'success' : 'error'](data.msg);\n\t\t\t\t\ts.userReadWorkOrder();\n\t\t\t\t}\n\t\t\t});\n\t\t}\n\t}\n});\n\n//# sourceURL=webpack:///./common/workorderdetail/index.vue?./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./node_modules/iview-loader??ref--4-1");

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader??ref--4-1!./common/workorderdetail/index.vue ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/lib/css-base.js */ \"./node_modules/css-loader/lib/css-base.js\")();\n// imports\n\n\n// module\nexports.push([module.i, \"/*.ant-btn:focus, .ant-btn:hover,.ant-input:focus, .ant-input:hover {\\r\\n    background-color: #fff;\\r\\n    border-color: #bf1616;\\r\\n    box-shadow: 0 0 0 2px rgba(191, 22, 22, 0.1);\\r\\n}*/\\n.zmiti-wo-detail-ui {\\n  width: 100%;\\n  display: flex;\\n  display: -webkit-flex;\\n  flex-flow: column;\\n  height: 100%;\\n}\\n.zmiti-wo-detail-ui .zmiti-wo-detail-header {\\n    background: #d9dee4;\\n}\\n.zmiti-wo-detail-ui .zmiti-wo-detail-header > div {\\n      padding: 10px 10px 10px 10px;\\n      line-height: 30px;\\n}\\n.zmiti-wo-detail-ui .zmiti-wo-detail-header > div:nth-of-type(2) {\\n        padding-top: 0;\\n}\\n.zmiti-wo-detail-status {\\n  display: flex;\\n  display: -webkit-flex;\\n  flex-flow: row;\\n  justify-content: space-between;\\n  width: 100%;\\n}\\n.zmiti-wo-step {\\n  width: 100%;\\n}\\n.zmiti-wo-step ul {\\n    width: 100%;\\n    display: flex;\\n    display: -webkit-flex;\\n    flex-flow: row;\\n    justify-content: space-between;\\n    color: #fff;\\n    margin: 4px 0;\\n}\\n.zmiti-wo-step ul li {\\n      background: #cacaca;\\n      text-align: center;\\n      line-height: 30px;\\n      flex: 1;\\n      -webkit-flex: 1;\\n      position: relative;\\n      font-size: 14px;\\n}\\n.zmiti-wo-step ul li.through {\\n        background: linear-gradient(to right, #9bdbf6, #9ddcee);\\n}\\n.zmiti-wo-step ul li.through::before {\\n          background: linear-gradient(to right, #9bdbf6, #9ddcee);\\n}\\n.zmiti-wo-step ul li.active {\\n        background: linear-gradient(to right, #00a4c5, #089fca);\\n}\\n.zmiti-wo-step ul li.active::before {\\n          background: linear-gradient(to right, #00a4c5, #089fca);\\n}\\n.zmiti-wo-step ul li:last-of-type::before {\\n        display: none;\\n}\\n.zmiti-wo-step ul li:before {\\n        content: \\\"\\\";\\n        position: absolute;\\n        width: 24px;\\n        height: 24px;\\n        top: 3px;\\n        border: 4px solid #fff;\\n        -webkit-transform: rotate(45deg);\\n        transform: rotate(45deg);\\n        border-left: none;\\n        border-bottom: none;\\n        right: -14px;\\n        z-index: 10;\\n}\\n.zmiti-close-order {\\n  cursor: pointer;\\n  color: blue;\\n}\\n.zmiti-wo-detail-content {\\n  flex: 1;\\n  -webkit-flex: 1;\\n  margin-top: 10px;\\n  overflow: auto;\\n}\\n.zmiti-wo-detail-content header {\\n    height: 40px;\\n    line-height: 40px;\\n    text-indent: 1em;\\n    background: #e2eee2;\\n    border-left: 4px solid #333;\\n    font-size: 14px;\\n    font-weight: bold;\\n}\\n.zmiti-wo-detail-content ul {\\n    width: 90%;\\n    margin: 0 auto;\\n}\\n.zmiti-wo-detail-content ul li {\\n      min-height: 130px;\\n      border-bottom: 1px dashed #ccc;\\n      display: flex;\\n      display: -webkit-flex;\\n      flex-flow: column;\\n      justify-content: space-around;\\n}\\n.zmiti-wo-detail-content ul li > div.zmiti-reply-content {\\n        font-weight: bold;\\n}\\n.zmiti-wo-detail-content ul li .zmt_iconfont {\\n        font-size: 20px;\\n        border-radius: 50%;\\n        padding: 10px;\\n        color: rgba(51, 144, 255, 0.8);\\n        background: rgba(51, 144, 255, 0.1);\\n}\\n.zmiti-wo-detail-content ul li .zmiti-realname {\\n        font-weight: bold;\\n        color: rgba(51, 144, 255, 0.8);\\n        margin-left: 10px;\\n        font-size: 14px;\\n}\\n.zmiti-reply-input {\\n  width: 90%;\\n  margin: 20px auto;\\n  display: block;\\n}\\n.zmiti-reply-btn {\\n  width: 90%;\\n  margin: 20px auto 60px;\\n}\\n.zmiti-reply-btn button {\\n    width: 100px;\\n}\\n\", \"\"]);\n\n// exports\n\n\n//# sourceURL=webpack:///./common/workorderdetail/index.vue?./node_modules/css-loader!./node_modules/vue-loader/lib/style-compiler?%7B%22optionsId%22:%220%22,%22vue%22:true,%22scoped%22:false,%22sourceMap%22:false%7D!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader??ref--4-1");

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-4836f6c1\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue":
/*!*************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4836f6c1","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/iview-loader??ref--4-1!./common/workorderdetail/index.vue ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"staticRenderFns\", function() { return staticRenderFns; });\nvar render = function() {\n  var _vm = this\n  var _h = _vm.$createElement\n  var _c = _vm._self._c || _h\n  return _c(\n    \"div\",\n    {\n      staticClass: \"zmiti-wo-detail-ui\",\n      style: { height: _vm.viewH - 60 + \"px\" }\n    },\n    [\n      _c(\"div\", { staticClass: \"zmiti-wo-step\" }, [\n        _c(\n          \"ul\",\n          _vm._l(_vm.orderStatus, function(step, i) {\n            return _c(\n              \"li\",\n              {\n                key: i,\n                class: {\n                  through: _vm.workinfo.status > i,\n                  active: _vm.workinfo.status == i\n                }\n              },\n              [\n                i <= 2\n                  ? _c(\"span\", [_vm._v(_vm._s(step.status))])\n                  : _c(\"span\", [\n                      _vm._v(\n                        _vm._s(\n                          _vm.workinfo.status === 3 ? step.status : \"未评价\"\n                        )\n                      )\n                    ])\n              ]\n            )\n          }),\n          0\n        )\n      ]),\n      _vm._v(\" \"),\n      _c(\"header\", { staticClass: \"zmiti-wo-detail-header\" }, [\n        _c(\"div\", [_vm._v(\"问题标题：\" + _vm._s(_vm.workinfo.content))]),\n        _vm._v(\" \"),\n        _c(\"div\", { staticClass: \"zmiti-wo-detail-status\" }, [\n          _c(\"div\", [_vm._v(\"工单编号：\" + _vm._s(_vm.workinfo.workorderid))]),\n          _vm._v(\" \"),\n          _c(\"div\", [_vm._v(\"用户手机号：\" + _vm._s(_vm.workinfo.usermobile))]),\n          _vm._v(\" \"),\n          _c(\"div\", [\n            _vm._v(\n              \"提交时间：\" + _vm._s(_vm.formatDate(_vm.workinfo.createtime))\n            )\n          ]),\n          _vm._v(\" \"),\n          _c(\"div\", [\n            _vm._v(\n              \"状态：\" + _vm._s(_vm.orderStatus[_vm.workinfo.status].status)\n            )\n          ]),\n          _vm._v(\" \"),\n          _c(\n            \"div\",\n            { staticClass: \"zmiti-close-order\", on: { click: _vm.closeOrder } },\n            [_vm._v(\"确认结单\")]\n          )\n        ])\n      ]),\n      _vm._v(\" \"),\n      _c(\"div\", { staticClass: \"zmiti-wo-detail-content zmiti-scroll\" }, [\n        _c(\"div\", [\n          _c(\"header\", [_vm._v(\"沟通内记录\")]),\n          _vm._v(\" \"),\n          _c(\n            \"ul\",\n            _vm._l(_vm.workinfo.operainfo, function(op, i) {\n              return _c(\"li\", { key: i }, [\n                _c(\"div\", [\n                  _c(\"span\", {\n                    staticClass: \"zmt_iconfont\",\n                    domProps: { innerHTML: _vm._s(op.avatar || \"&#xe6a4;\") }\n                  }),\n                  _vm._v(\" \"),\n                  _c(\"span\", { staticClass: \"zmiti-realname\" }, [\n                    _vm._v(_vm._s(op.realname))\n                  ])\n                ]),\n                _vm._v(\" \"),\n                _c(\"div\", { staticClass: \"zmiti-reply-content\" }, [\n                  _vm._v(\"\\n\\t\\t\\t\\t\\t\\t\" + _vm._s(op.content) + \"\\n\\t\\t\\t\\t\\t\")\n                ]),\n                _vm._v(\" \"),\n                _c(\"div\", [\n                  _vm._v(\n                    \"\\n\\t\\t\\t\\t\\t\\t\" + _vm._s(op.operatime) + \"\\n\\t\\t\\t\\t\\t\"\n                  )\n                ])\n              ])\n            }),\n            0\n          )\n        ]),\n        _vm._v(\" \"),\n        _c(\n          \"div\",\n          { staticClass: \"zmiti-wo-reply-ui\" },\n          [\n            !(_vm.workinfo.status >= 2 && _vm.isAdmin)\n              ? [\n                  _c(\"header\", [\n                    _vm._v(\n                      _vm._s(\n                        _vm.workinfo.status === 2\n                          ? \"我要评价\"\n                          : _vm.workinfo.status === 3\n                          ? \"用户评价\"\n                          : \"我要反馈\"\n                      )\n                    )\n                  ]),\n                  _vm._v(\" \"),\n                  _vm.workinfo.status >= 2\n                    ? _c(\n                        \"div\",\n                        { staticClass: \"zmiti-reply-input\" },\n                        [\n                          _vm._v(\"\\n\\t\\t\\t\\t\\t评分 :\"),\n                          _c(\"Rate\", {\n                            attrs: {\n                              disabled: _vm.workinfo.status === 3,\n                              clearable: \"\"\n                            },\n                            model: {\n                              value: _vm.workinfo.grade,\n                              callback: function($$v) {\n                                _vm.$set(_vm.workinfo, \"grade\", $$v)\n                              },\n                              expression: \"workinfo.grade\"\n                            }\n                          })\n                        ],\n                        1\n                      )\n                    : _vm._e(),\n                  _vm._v(\" \"),\n                  _vm.workinfo.status >= 3\n                    ? _c(\"div\", { staticClass: \"zmiti-reply-input\" }, [\n                        _vm._v(\n                          \"\\n\\t\\t\\t\\t\\t用户评价 :\" +\n                            _vm._s(_vm.workinfo.feedback) +\n                            \"\\n\\t\\t\\t\\t\"\n                        )\n                      ])\n                    : _vm._e(),\n                  _vm._v(\" \"),\n                  _vm.workinfo.status >= 2\n                    ? _c(\n                        \"div\",\n                        { staticClass: \"zmiti-reply-input\" },\n                        [\n                          _vm._v(\"\\n\\t\\t\\t\\t\\t是否解决：\\n\\t\\t\\t\\t\\t\"),\n                          _c(\n                            \"RadioGroup\",\n                            {\n                              model: {\n                                value: _vm.workinfo.issettle,\n                                callback: function($$v) {\n                                  _vm.$set(_vm.workinfo, \"issettle\", $$v)\n                                },\n                                expression: \"workinfo.issettle\"\n                              }\n                            },\n                            [\n                              _c(\n                                \"Radio\",\n                                {\n                                  attrs: {\n                                    value: 0,\n                                    label: 0,\n                                    disabled: _vm.workinfo.status === 3\n                                  }\n                                },\n                                [_vm._v(\"已解决\")]\n                              ),\n                              _vm._v(\" \"),\n                              _c(\n                                \"Radio\",\n                                {\n                                  attrs: {\n                                    value: 1,\n                                    label: 1,\n                                    disabled: _vm.workinfo.status === 3\n                                  }\n                                },\n                                [_vm._v(\"未解决\")]\n                              )\n                            ],\n                            1\n                          )\n                        ],\n                        1\n                      )\n                    : _vm._e(),\n                  _vm._v(\" \"),\n                  _vm.workinfo.status < 3\n                    ? _c(\"Input\", {\n                        staticClass: \"zmiti-reply-input\",\n                        attrs: { type: \"textarea\", rows: 8 },\n                        model: {\n                          value: _vm.content,\n                          callback: function($$v) {\n                            _vm.content = $$v\n                          },\n                          expression: \"content\"\n                        }\n                      })\n                    : _vm._e(),\n                  _vm._v(\" \"),\n                  _vm.workinfo.status < 3\n                    ? _c(\n                        \"div\",\n                        { staticClass: \"zmiti-reply-btn\" },\n                        [\n                          _c(\n                            \"Button\",\n                            {\n                              staticStyle: {\n                                position: \"relative\",\n                                \"z-index\": \"1\"\n                              },\n                              attrs: { type: \"primary\" },\n                              on: { click: _vm.replyOrder }\n                            },\n                            [_vm._v(\"提交\")]\n                          )\n                        ],\n                        1\n                      )\n                    : _vm._e()\n                ]\n              : _vm._e()\n          ],\n          2\n        )\n      ])\n    ]\n  )\n}\nvar staticRenderFns = []\nrender._withStripped = true\n\nif (false) {}\n\n//# sourceURL=webpack:///./common/workorderdetail/index.vue?./node_modules/vue-loader/lib/template-compiler?%7B%22id%22:%22data-v-4836f6c1%22,%22hasScoped%22:false,%22optionsId%22:%220%22,%22buble%22:%7B%22transforms%22:%7B%7D%7D%7D!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./node_modules/iview-loader??ref--4-1");

/***/ }),

/***/ "./node_modules/vue-loader/node_modules/vue-style-loader/index.js!./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":false}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader??ref--4-1!./common/workorderdetail/index.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// style-loader: Adds some css to the DOM by adding a <style> tag\n\n// load the styles\nvar content = __webpack_require__(/*! !../../node_modules/css-loader!../../node_modules/vue-loader/lib/style-compiler?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":false}!../../node_modules/sass-loader/lib/loader.js!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!../../node_modules/iview-loader??ref--4-1!./index.vue */ \"./node_modules/css-loader/index.js!./node_modules/vue-loader/lib/style-compiler/index.js?{\\\"optionsId\\\":\\\"0\\\",\\\"vue\\\":true,\\\"scoped\\\":false,\\\"sourceMap\\\":false}!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader/index.js?!./common/workorderdetail/index.vue\");\nif(typeof content === 'string') content = [[module.i, content, '']];\nif(content.locals) module.exports = content.locals;\n// add the styles to the DOM\nvar add = __webpack_require__(/*! ../../node_modules/vue-loader/node_modules/vue-style-loader/lib/addStylesClient.js */ \"./node_modules/vue-loader/node_modules/vue-style-loader/lib/addStylesClient.js\").default\nvar update = add(\"479751b2\", content, false, {});\n// Hot Module Replacement\nif(false) {}\n\n//# sourceURL=webpack:///./common/workorderdetail/index.vue?./node_modules/vue-loader/node_modules/vue-style-loader!./node_modules/css-loader!./node_modules/vue-loader/lib/style-compiler?%7B%22optionsId%22:%220%22,%22vue%22:true,%22scoped%22:false,%22sourceMap%22:false%7D!./node_modules/sass-loader/lib/loader.js!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./node_modules/iview-loader??ref--4-1");

/***/ })

}]);