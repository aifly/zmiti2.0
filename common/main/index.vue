<template>
    <div class="layout">
        <Layout v-if='$route.name !== "login" && $route.name !== "register"'>
            <Header>
               <div>
                    <div class="zmiti-title">
                        <img :src="imgs.userLoginTitle" alt="">
						<span>v2.0</span>
                    </div>
               </div>
               <div>
                  <div v-if='isAdmin'>管理端控制平台</div>
                  <div v-else>单位端控制平台</div>
               </div>
               <div class="zmiti-user-info">
				    <template v-if='!isAdmin'>
						<span>
							消息
						</span>
						<span>
							工单
						</span>
					</template>
					<template v-else>
						<span>
							信息发布
						</span>
						<span>
							工单处理
						</span>
					</template>
                   <span class="zmiti-text-overflow">
					   {{userinfo.username}}
					</span>
					<span class='zmiti-user-avatar'>
						<img :src="imgs.zmiti1" alt="">
						<ul>
							<li class='zmiti-hover-username'>
								{{userinfo.username}}
							</li>
							<li class='zmiti-hover-tab'>
								<div>基本信息</div>
								<div>安全管理</div>
							</li>
							<li class='zmiti-hover-company'>
								<span class='zmt_iconfont'>&#xe6a1;</span> 单位信息
							</li>
							<li class='zmiti-hover-exit'>
								退出平台
							</li>
						</ul>
					</span>
                   <div v-if='false' title='退出' @click="logout">
                       <img :src="imgs.logout" alt="">
                   </div>
               </div>
            </Header>
            <Layout class="zmiti-main-layout" :style='{height:(viewH - 50)+"px"}'>
                <div class="zmiti-tab-C" :class="{'active':showMenu}" :style='{height:(viewH - 50)+"px"}' @mouseover='mouseover' @mouseout="mouseout">
                   <div>
                       <ul>
                           <li class='zmiti-menu-title' v-if='!isAdmin'>
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
                                <li @click='mouseout'  class='zmiti-menu-item' :class="{'active':menu.active.some(ar=>ar === $route.name)}" v-for="(menu,i) in menus" :key='i'>
									
                                    <div><router-link :to="menu.link"><span class='zmt_iconfont' v-html='menu.icon'></span></router-link> </div>
                                    <div><router-link :to="menu.link">{{menu.name}}</router-link></div>
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
<style lang='scss' scoped>
	@import './index.scss';
</style>


<script>
    import Vue from 'vue';
    import zmitiUtil from '../lib/util';
    

	export default {
		props:['isAdmin'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				showMenu:false,
                viewH:document.documentElement.clientHeight,
                tabIndex:0,
                userinfo:{},
                productList:[],
                kw:"",
                topMenu:[
                ],
                defaultMenu:[
                  
                ],
                menus:[
					{
						name:"用户单位",
						link:'/company',
						icon:'&#xe605;',
						active:['user','company'] //高亮的路由
					},{
						name:"产品管理",
						link:'/product',
						icon:'&#xe64c;',
						active:['product'] 
					},{
						name:"财务管理",
						link:'/finance',
						icon:'&#xe600;',
						active:['finance'] 
					},{
						name:"订单管理",
						link:'/order',
						icon:'&#xe60b;',
						active:['order']
					},{
						name:"系统管理",
						link:'/admin',
						icon:'&#xe60f;',
						active:'basicconfig_admin_rolegroup_setrole_pv_form'.split('_') 
					}
				]
			}
		},
		components:{
		},
        beforeCreate(){
            
            if(this.$route.name !== 'login' && this.$route.name !== 'register'){
            }

        },
		mounted(){
           ///this.menus = this.defaultMenu.concat([]);
			var obserable = Vue.obserable;
			
			
			var userinfo = zmitiUtil[this.isAdmin ? 'getAdminUserInfo':'getUserInfo']();
			

            this.userinfo = userinfo; 
            if(this.$route.name !== 'login' && this.$route.name !== 'register' && !this.isAdmin){
				
               /* zmitiUtil.getProductList((arr)=>{
                   this.productList = arr;
               },this); */
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
			mouseout(){
				this.showMenu = false;
			},
			mouseover(){
				this.showMenu = true;
			},
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