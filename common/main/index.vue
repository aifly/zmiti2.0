<template>
    <div class="layout">
        <Layout v-if='$route.name !== "login" && $route.name !== "register"'>
            <Header>
               <div>
                    <div class="zmiti-title">
                        <img :src="imgs.userLoginTitle" alt="">
                    </div>
               </div>
               <div>
                   <div v-if='!isAdmin'>
                       <a href="#">个人中心</a>
                   </div>
                   <div v-if='!isAdmin'>
                       <a href="#">我的定制</a>
                   </div>
                   <div v-if='userinfo.usertypesign === 4'>
                       <a href="./admin.html">系统管理</a>
                   </div>
               </div>
               <div class="zmiti-user-info">
                   <span>
                       工单
                   </span>
                   <span class="zmiti-text-overflow">{{userinfo.username}}</span>
                   <div title='退出' @click="logout">
                       <img :src="imgs.logout" alt="">
                   </div>
               </div>
            </Header>
            <Layout class="zmiti-main-layout">
                <div class="zmiti-tab-C" :style='{height:(viewH - 50)+"px"}'>
                   <div>
                       <ul>
                           <li class='zmiti-menu-title'>
                               <div><img :src="imgs.zmiti" alt=""></div><div>{{isAdmin?"系统管理":"产品与服务"}}</div>
                            </li>
                           <li  :title='item.resourcecnname' :to='"/myreport/"+item.productid' class='zmiti-text-overflow zmiti-menu-item' :key='i' v-for="(item,i) in productList" :name="item.productid">
                                <div>
                                    <router-link :to="item.linkTo"> <img :src="imgs.zmiti" alt=""></router-link>
                                </div>
                                <div>
                                    <router-link :to="item.linkTo">{{item.title}}</router-link>
                                </div>
                           </li>
                           <template v-if='isAdmin'>
                                <li  class='zmiti-menu-item'>
                                    <router-link to="product"> </router-link>
                                    <div><Icon type="ios-basket" /></div><div>产品管理</div>
                                </li>
                                <li  class='zmiti-menu-item'>
                                    <router-link to="company"> </router-link>
                                    <div><Icon type="ios-person" /></div><div>人员管理</div>
                                </li>
                           </template>
                       </ul>
                   </div>
                </div>

                <div style="width:50px;height:100%;"></div>
                
                <Layout class='zmiti-main-page'>
                   <router-view></router-view>
                </Layout>
            </Layout>
        </Layout>
        <div v-else>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
	import './index.css';
    import Vue from 'vue';
    import zmitiUtil from '../lib/util';
    import sysbinVerification from '../lib/verification';

	export default {
		props:['isAdmin'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
                viewH:document.documentElement.clientHeight,
                tabIndex:0,
                userinfo:{},
                productList:[],
                kw:"",
                topMenu:[
                ],
                defaultMenu:[
                  
                ],
                menus:[]
			}
		},
		components:{
		},
        beforeCreate(){
            this.validateData = sysbinVerification.validate(this);
            if(this.$route.name !== 'login' && this.$route.name !== 'register'){
            }

        },
		mounted(){
           ///this.menus = this.defaultMenu.concat([]);
            var obserable = Vue.obserable;
            var userinfo = zmitiUtil.getUserInfo();

            this.userinfo = userinfo; 
            if(this.$route.name !== 'login' && this.$route.name !== 'register' && !this.isAdmin){
               zmitiUtil.getProductList((arr)=>{
                   this.productList = arr;
               },this);
            }
            
        },
        watch:{
            kw(val){
                var s = this;
                Vue.obserable.trigger({
                    type:"searchReport",
                    data:val
                });
            }
        },
		methods:{
            logout(){
                var s = this;
                
                zmitiUtil.ajax({
                    _this:s,
                    url:window.config.baseUrl+'user/user_loginout/',
                    data:{
                        username:s.userinfo.username,
                        getusersigid:s.userinfo.getusersigid
                    },
                    success(data){
                        if(data.getret === 0){
                            s.$Message.success('注销成功');
                            setTimeout(() => {
                                window.location.hash = '#/login';
                            }, 500);
                        }
                        else{
                            s.$Message.error('注销失败');
                        }
                    }
                })
            },
            tab(index){
                this.tabIndex = index;
            },
         
           
         
          
		}
	}
</script>
 

 <style >
     .ivu-layout-header{
        padding: 0 !important; 
     }
     .ivu-layout{
        position: relative;
     }
 </style>