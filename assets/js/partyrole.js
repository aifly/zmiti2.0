(window.webpackJsonp=window.webpackJsonp||[]).push([[50],{765:function(t,r,e){"use strict";e.r(r);var i=e(11),o=e(0),u={data:()=>({productid:""}),components:{RoleGroup:i.a},mounted(){this.init()},watch:{$route:{handler(){var t=this.productid;t&&this.$router.push({path:"/partyrole/"+t})}}},methods:{init(){var t=this,r=setInterval(()=>{if(o.default.productList){clearInterval(r);var e=this.$route.params.id;e||o.default.productList.forEach(r=>{t.$route.name.indexOf(r.producturl.substr(1))>-1&&(e=r.productid)}),this.$router.push({path:"/partyrole/"+e}),this.productid=e}},100)}}},a=function(){var t=this.$createElement,r=this._self._c||t;return this.productid?r("RoleGroup",{attrs:{productid:this.productid}}):this._e()};a._withStripped=!0;var p=e(3),s=Object(p.a)(u,a,[],!1,null,null,null);s.options.__file="components\\party\\partyrole\\index.vue";r.default=s.exports}}]);