(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{742:function(t,i,e){"use strict";e.r(i);var r=e(11),o=e(0),u={data:()=>({productid:""}),components:{RoleGroup:r.a},mounted(){this.init()},watch:{},methods:{init(){var t=this,i=setInterval(()=>{if(o.default.productList){clearInterval(i);var e=this.$route.params.id;e||o.default.productList.forEach(i=>{t.$route.name.indexOf(i.producturl.substr(1))>-1&&(e=i.productid)}),this.$router.push({path:"/dutysetting/"+e}),this.productid=e}},100)}}},s=function(){var t=this.$createElement,i=this._self._c||t;return this.productid?i("RoleGroup",{attrs:{productid:this.productid}}):this._e()};s._withStripped=!0;var d=e(3),n=Object(d.a)(u,s,[],!1,null,null,null);n.options.__file="components\\Duty\\setting\\index.vue";i.default=n.exports}}]);