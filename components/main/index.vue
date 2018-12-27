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
                      <Menu width='300' size='small'  active-name="1" :open-names="['1']" theme='dark' >
                            <MenuGroup  name="1" :title='isAdmin?"系统管理":"产品与服务"'>
                                <MenuItem :title='item.resourcecnname' :to='"/myreport/"+item.productid' class='zmiti-text-overflow' :key='i' v-for="(item,i) in productList" :name="item.productid">
                                    {{item.title}}
                                </MenuItem>

                                <MenuItem v-if='isAdmin' class='zmiti-text-overflow' to='product' name='product'>
                                    <Icon type="ios-basket" />产品管理
                                </MenuItem>
                            </MenuGroup >
                           
                        </Menu>
                   </div>
                </div>
                <div style='width:50px;'></div>
                <Layout>
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
               });
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