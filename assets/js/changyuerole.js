(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{790:function(t,r,e){"use strict";e.r(r);var i=e(11),o=e(0),u={data:()=>({productid:""}),components:{RoleGroup:i.a},mounted(){this.init()},watch:{$route:{handler(){var t=this.productid;t&&this.$router.push({path:"/changyuerole/"+t})}}},methods:{init(){var t=this,r=setInterval(()=>{if(o.default.productList){clearInterval(r);var e=this.$route.params.id;e||o.default.productList.forEach(r=>{t.$route.name.indexOf(r.producturl.substr(1))>-1&&(e=r.productid)}),this.$router.push({path:"/changyuerole/"+e}),this.productid=e}},100)}}},s=function(){var t=this.$createElement,r=this._self._c||t;return this.productid?r("RoleGroup",{attrs:{productid:this.productid}}):this._e()};s._withStripped=!0;var a=e(3),d=Object(a.a)(u,s,[],!1,null,null,null);d.options.__file="components\\changyuerole\\index.vue";r.default=d.exports}}]);