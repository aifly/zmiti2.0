(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{749:function(t,e,r){"use strict";r.r(e);var o=r(11),i=r(0),u={data:()=>({productid:""}),components:{RoleGroup:o.a},mounted(){this.init()},watch:{},methods:{init(){var t=this,e=setInterval(()=>{if(i.default.productList){clearInterval(e);var r=this.$route.params.id;r||i.default.productList.forEach(e=>{t.$route.name.indexOf(e.producturl.substr(1))>-1&&(r=e.productid)}),this.$router.push({path:"/meetingroomrole/"+r}),this.productid=r}},100)}}},s=function(){var t=this.$createElement,e=this._self._c||t;return this.productid?e("RoleGroup",{attrs:{productid:this.productid}}):this._e()};s._withStripped=!0;var n=r(3),d=Object(n.a)(u,s,[],!1,null,null,null);d.options.__file="components\\meetingroom\\role\\index.vue";e.default=d.exports}}]);