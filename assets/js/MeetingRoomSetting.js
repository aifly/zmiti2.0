(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{700:function(t,e,o){var i=o(701);"string"==typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);(0,o(6).default)("2917b38a",i,!1,{})},701:function(t,e,o){(t.exports=o(4)()).push([t.i,"\n.zmiti-meetingroom-main-ui[data-v-1339b6c8]{background:#f2f2f2;box-sizing:border-box;height:100%;width:99%;margin:0 auto\n}\n.zmiti-meetingroom-main-ui .zmiti-list-main[data-v-1339b6c8]{box-sizing:border-box;background:#fff;margin:0 auto\n}\n.zmiti-meetingroom-main-ui .zmiti-list-where[data-v-1339b6c8]{font-size:14px;width:98%;margin:10px auto;display:flex;display:-webkit-flex;flex-flow:row\n}\n.zmiti-meetingroom-main-ui .zmiti-list-where .ivu-input-wrapper[data-v-1339b6c8]{width:200px;margin-right:10px\n}\n.zmiti-meetingroom-main-ui .zmiti-scroll[data-v-1339b6c8]{overflow:auto\n}\n.zmiti-meetingroom-main-ui .zmiti-submit-main[data-v-1339b6c8]{flex:5;-webkit-flex:5;width:100%\n}\n.zmiti-meetingroom-main-ui .zmiti-submit-main>div[data-v-1339b6c8]{-webkit-transition:.3s;transition:.3s\n}\n.zmiti-meetingroom-main-ui .zmiti-submit-main .zmiti-submit-table[data-v-1339b6c8]{width:98%;margin:0 auto\n}\n.zmiti-add-form[data-v-1339b6c8]{width:500px;overflow:auto;position:absolute !important;top:0;right:0;z-index:100;height:100%;box-shadow:0 0 0 1px #ccc;box-sizing:border-box;background:#f9f9f9\n}\n.zmiti-add-form .zmiti-add-form-C[data-v-1339b6c8]{margin:10px auto 2px;width:90%\n}\n.zmiti-add-form .zmiti-add-form-item[data-v-1339b6c8]{line-height:50px;height:50px\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns[data-v-1339b6c8]{text-align:center;position:relative;z-index:10\n}\n.zmiti-add-form .zmiti-add-form-item.zmiti-add-btns button[data-v-1339b6c8]{margin:0 20px;padding:2px 20px\n}\n.zmiti-add-form .zmiti-add-form-item input[data-v-1339b6c8]{padding-left:6px;height:32px;width:70%;border:1px solid #d8d8d8;outline:none\n}\n",""])},750:function(t,e,o){"use strict";o.r(e);var i=o(0),a=o(2),r=o(10),n=o(9),s={props:["obserable"],name:"meetingroomsetting",data(){return{imgs:window.imgs,mettingroomActions:a.a.mettingroomActions,company:a.a.getCurrentCompanyId(),total:0,loading:!1,viewH:window.innerHeight,productid:0,selectList:[],searchForm:{roomname:"",companyroom:"",roomlaber:""},label:"",devicesData:[],layout:[],columns:[{title:"名称",key:"roomname",align:"center"},{title:"布局",width:100,key:"layoutid",align:"center",render:(t,e)=>{return t("div",{},this.layout.filter(t=>t.layoutid==e.row.layoutid)[0].layoutname)}},{title:"容纳人数",width:100,key:"peoplenumber",align:"center"},{title:"所属单位",key:"companyroom",align:"center"},{title:"详细地址",key:"roomadress",align:"center"},{title:"设备",width:200,key:"configids",align:"center",render:(t,e)=>{let o=[];return e.row.configids.forEach(t=>{o.push(this.devicesData.filter(e=>e.configid==t)[0].configname)}),t("div",o.join(","))}},{title:"标签",width:200,key:"roomlaber",align:"center",render:(t,e)=>{let o=[];return e.row.roomlaber.forEach(e=>{""!=e&&o.push(t("Tag",{props:{color:"green",type:"border"}},e))}),t("div",o)}},{title:"是否需审核",width:120,key:"needaudit",align:"center",render:(t,e)=>t("div",{},e.row.needaudit?"是":"否")},{title:"操作",key:"action",align:"center",width:200,render:(t,e)=>t("div",[t("span",{style:{cursor:"pointer",color:"rgb(0, 102, 204)"},on:{click:()=>{console.log(e.row);e.row.roomlaber,e.row.configids;this.formObj.roomid=e.row.roomid,this.formObj.roomname=e.row.roomname,this.formObj.layoutid=e.row.layoutid,this.formObj.roomlaber=e.row.roomlaber,this.formObj.needaudit=e.row.needaudit,this.formObj.peoplenumber=e.row.peoplenumber,this.formObj.companyroom=e.row.companyroom,this.formObj.roomadress=e.row.roomadress,this.formObj.configids=e.row.configids,this.formObj.remarks=e.row.remarks,i.default.obserable.trigger({type:"toggleMask",data:!0})}}},"编辑"),t("Poptip",{props:{confirm:!0,title:"确定要删除吗？",placement:"left"},on:{"on-ok":()=>{this.delete(e.row.roomid)}}},[t("span",{props:{type:"error",size:"small"},style:{cursor:"pointer",color:"#06C",marginLeft:"10px"},on:{click:()=>{}}},"删除")])])}],dataSource:[],condition:{page_index:0,page_size:10},showDetailPage:-1,formObj:{roomid:void 0,roomname:"",layoutid:0,roomlaber:[],needaudit:0,peoplenumber:0,companyroom:"",roomadress:"",configids:[],remarks:""},ruleValidate:{roomname:[{required:!0,message:"请输入会议室名称",trigger:"blur"}],companyroom:[{required:!0,message:"请输入会议室所属单位",trigger:"blur"}],roomadress:[{required:!0,message:"请输入会议室地址",trigger:"blur"}]},selectList:[]}},components:{ZmitiMask:r.a,ZmitiTable:n.a},mounted(){this.init()},methods:{init(){a.a.getUserInfo()||this.$router.push({path:"/login"});var t=setInterval(()=>{i.default.productList&&(clearInterval(t),this.productid||(i.default.productList.forEach(t=>{this.$route.name.indexOf(t.producturl.substr(1))>-1&&(this.productid=t.productid)}),this.productid&&(this.getDeviceList(),this.getLayoutList(),this.getDataList())))},200)},getDeviceList(){let t=this,e={companyid:this.company.companyid,productid:this.productid,page_index:0,page_size:100};a.a.ajax({remark:"getDeviceList",data:{action:this.mettingroomActions.getDeviceList.action,condition:e},success(e){0===e.getret&&(t.devicesData=e.list)}})},getLayoutList(){let t=this,e={companyid:this.company.companyid,productid:this.productid,page_index:0,page_size:100};a.a.ajax({remark:"getLayoutList",data:{action:this.mettingroomActions.getLayoutList.action,condition:e},success(e){0===e.getret&&(t.layout=e.list,t.formObj.layoutid=t.layout[0]?t.layout[0].layoutid:0)}})},searchHandle(){this.condition.page_index=0,this.getDataList()},getSelection(t){console.log(t),this.selectList=t},getDataList(){let t=this;t.loading=!0;let e=Object.assign({companyid:this.company.companyid,productid:this.productid},this.condition,this.searchForm);a.a.ajax({remark:"getMettingroomList",data:{action:this.mettingroomActions.getMettingroomList.action,condition:e,list:[]},error(){t.loading=!1},success(e){t.loading=!1,0===e.getret&&(t.total=e.total,t.dataSource=e.list)}})},change(t){this.condition.page_index=t-1,this.getDataList()},deletes(){if(this.selectList.length<=0)this.$Message.warning("请选择要删除的会议室！");else{let t=[];this.selectList.forEach(e=>{t.push(e.roomid)}),this.goDelete(t)}},delete(t){this.goDelete([t])},goDelete(t){var e=this;a.a.ajax({remark:"delMettingroom",data:{action:this.mettingroomActions.delMettingroom.action,info:{companyid:this.company.companyid,productid:this.productid},list:t},success(t){e.$Message[0===t.getret?"success":"error"](t.msg||t.getmsg),0===t.getret&&(e.getDataList(),e.selectList=[])}})},add(){i.default.obserable.trigger({type:"toggleMask",data:!0})},closeMaskPage(){this.$refs.ruleForm.resetFields(),this.formObj.configids=[],this.formObj.roomlaber=[],this.formObj.roomid=void 0,i.default.obserable.trigger({type:"toggleMask",data:!1})},adminAction(t){console.log(this.formObj),this.$refs[t].validate(t=>{if(t){let t=this.formObj.roomid?this.mettingroomActions.editMettingroom.action:this.mettingroomActions.addMettingroom.action,e=Object.assign({companyid:this.company.companyid,productid:this.productid},this.formObj),o=this;a.a.ajax({remark:this.formObj.roomid?"editMettingroom":"addMettingroom",data:{action:t,info:e},success(t){o.$Message[0===t.getret?"success":"error"](t.msg||t.getmsg),0===t.getret&&(o.closeMaskPage(),o.getDataList())}})}})},handleAddLaber(){""!=this.label?(this.formObj.roomlaber.push(this.label),this.label=""):this.$Message.warning("请输入标签")},handleCloseLaber(t,e){const o=this.formObj.roomlaber.indexOf(e);this.formObj.roomlaber.splice(o,1)}}},m=function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("div",{staticClass:"zmiti-meetingroom-main-ui lt-full"},[o("div",{staticClass:"zmiti-list-main"},[o("header",{staticClass:"zmiti-tab-header"},[o("div",[t._v("会议室设置")]),t._v(" "),o("div",[o("Button",{attrs:{loading:t.loading,type:"primary"},on:{click:function(e){return t.getDataList()}}},[t._v("刷新")]),t._v(" "),o("Button",{attrs:{type:"primary"},on:{click:function(e){return t.add()}}},[t._v("添加")]),t._v(" "),o("Button",{attrs:{type:"primary"},on:{click:function(e){return t.deletes()}}},[t._v("删除")])],1)]),t._v(" "),o("div",{staticClass:"zmiti-submit-main zmiti-scroll",style:{height:t.viewH-130+"px"}},[o("section",{staticClass:"zmiti-list-where"},[o("Input",{attrs:{placeholder:"请输入会议室名称"},model:{value:t.searchForm.roomname,callback:function(e){t.$set(t.searchForm,"roomname",e)},expression:"searchForm.roomname"}}),t._v(" "),o("Input",{attrs:{placeholder:"请输入所属单位"},model:{value:t.searchForm.companyroom,callback:function(e){t.$set(t.searchForm,"companyroom",e)},expression:"searchForm.companyroom"}}),t._v(" "),o("Input",{attrs:{placeholder:"请输入会议室标签"},model:{value:t.searchForm.roomlaber,callback:function(e){t.$set(t.searchForm,"roomlaber",e)},expression:"searchForm.roomlaber"}}),t._v(" "),o("Button",{attrs:{icon:"md-search"},on:{click:t.searchHandle}},[t._v("搜索")])],1),t._v(" "),o("ZmitiTable",{attrs:{loading:t.loading,dataSource:t.dataSource,columns:t.columns,change:t.change,current:t.condition.page_index+1,"page-size":t.condition.page_size,total:t.total},on:{getSelection:t.getSelection}})],1)]),t._v(" "),o("ZmitiMask",{on:{closeMaskPage:t.closeMaskPage},model:{value:t.showDetailPage,callback:function(e){t.showDetailPage=e},expression:"showDetailPage"}},[o("div",{attrs:{slot:"mask-content"},slot:"mask-content"},[o("transition",{attrs:{name:"detail"}},[o("section",{staticClass:"zmiti-add-form zmiti-scroll"},[o("header",{staticClass:"zmiti-add-header"},[o("img",{attrs:{src:t.imgs.back,alt:""},on:{click:t.closeMaskPage}}),t._v(" "),o("span",[t._v("会议室信息")])]),t._v(" "),o("Form",{ref:"ruleForm",staticClass:"zmiti-add-form-C",attrs:{model:t.formObj,rules:t.ruleValidate,"label-width":90}},[o("input",{directives:[{name:"model",rawName:"v-model",value:t.formObj.roomid,expression:"formObj.roomid"}],attrs:{type:"hidden"},domProps:{value:t.formObj.roomid},on:{input:function(e){e.target.composing||t.$set(t.formObj,"roomid",e.target.value)}}}),t._v(" "),o("FormItem",{attrs:{label:"名称：",prop:"roomname"}},[o("Input",{attrs:{placeholder:"名称"},model:{value:t.formObj.roomname,callback:function(e){t.$set(t.formObj,"roomname",e)},expression:"formObj.roomname"}})],1),t._v(" "),o("FormItem",{attrs:{label:"布局：",prop:"layoutid"}},[o("RadioGroup",{model:{value:t.formObj.layoutid,callback:function(e){t.$set(t.formObj,"layoutid",e)},expression:"formObj.layoutid"}},t._l(t.layout,(function(e){return o("Radio",{key:e.layoutid,attrs:{label:e.layoutid}},[t._v(t._s(e.layoutname))])})),1)],1),t._v(" "),o("FormItem",{attrs:{label:"容纳人数：",prop:"peoplenumber"}},[o("InputNumber",{attrs:{min:1},model:{value:t.formObj.peoplenumber,callback:function(e){t.$set(t.formObj,"peoplenumber",e)},expression:"formObj.peoplenumber"}})],1),t._v(" "),o("FormItem",{attrs:{label:"所属单位：",prop:"companyroom"}},[o("Input",{attrs:{placeholder:"所属单位"},model:{value:t.formObj.companyroom,callback:function(e){t.$set(t.formObj,"companyroom",e)},expression:"formObj.companyroom"}})],1),t._v(" "),o("FormItem",{attrs:{label:"详细地址：",prop:"roomadress"}},[o("Input",{attrs:{placeholder:"详细地址"},model:{value:t.formObj.roomadress,callback:function(e){t.$set(t.formObj,"roomadress",e)},expression:"formObj.roomadress"}})],1),t._v(" "),o("FormItem",{attrs:{label:"设备：",prop:"configids"}},[o("CheckboxGroup",{model:{value:t.formObj.configids,callback:function(e){t.$set(t.formObj,"configids",e)},expression:"formObj.configids"}},t._l(t.devicesData,(function(e){return o("Checkbox",{key:e.configid,attrs:{label:e.configid}},[t._v(t._s(e.configname))])})),1)],1),t._v(" "),o("FormItem",{attrs:{label:"标签："}},[t._l(t.formObj.roomlaber,(function(e){return o("Tag",{key:e,attrs:{name:e,closable:"",color:"green",type:"border"},on:{"on-close":t.handleCloseLaber}},[t._v(t._s(e))])})),t._v(" "),o("Input",{staticStyle:{width:"80px"},attrs:{size:"small",placeholder:"输入标签"},model:{value:t.label,callback:function(e){t.label=e},expression:"label"}}),t._v(" "),o("Button",{attrs:{icon:"ios-add",type:"dashed",size:"small"},on:{click:t.handleAddLaber}},[t._v("添加标签")])],2),t._v(" "),o("FormItem",{attrs:{label:"是否需审核：",prop:"needaudit"}},[o("i-switch",{attrs:{"false-value":0,"true-value":1},model:{value:t.formObj.needaudit,callback:function(e){t.$set(t.formObj,"needaudit",e)},expression:"formObj.needaudit"}})],1),t._v(" "),o("FormItem",{attrs:{label:"备注：",prop:"remarks"}},[o("Input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:5}},model:{value:t.formObj.remarks,callback:function(e){t.$set(t.formObj,"remarks",e)},expression:"formObj.remarks"}})],1)],1),t._v(" "),o("div",{staticClass:"zmiti-add-form-item zmiti-add-btns"},[o("Button",{attrs:{size:"large",type:"primary"},on:{click:function(e){return t.adminAction("ruleForm")}}},[t._v(t._s(t.formObj.infoid?"保存":"确定"))])],1)],1)])],1)])],1)};m._withStripped=!0;var l=o(3),d=!1;var c=function(t){d||o(700)},u=Object(l.a)(s,m,[],!1,c,"data-v-1339b6c8",null);u.options.__file="components\\meetingroom\\setting\\index.vue";e.default=u.exports}}]);