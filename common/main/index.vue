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
							<router-link to='/resourcelist'>资源库</router-link> 
						</span>
						<span>
							消息
						</span>
						<span>
							<router-link to='/workorderlist'>工单</router-link> 
						</span>
					</template>
					<template v-else>
						<span>
							<router-link to='/resourcelist'>资源库</router-link> 
						</span>
						<span>
							消息发布
						</span>
						<span>
							<router-link to='/workorderlist'>工单处理</router-link> 
						</span>
					</template>
                   <span class="zmiti-text-overflow">
					   {{userinfo.username}}
					</span>
					<span class='zmiti-user-avatar'>
						<span class='zmt_iconfont' v-html='userinfo.info && userinfo.info.avatar||"&#xe6a4;"'>
							
						</span>
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
							<li class='zmiti-hover-exit' @click='logout'>
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
                           <li  :to='"/myreport/"+item.productid' class='zmiti-text-overflow zmiti-menu-item' :key='i' v-for="(item,i) in productList" :name="item.productid">
						  		 <div><router-link :to='item.producturl'><span class='zmt_iconfont' v-html='item.icon || "&#xe609;"'></span></router-link> </div>
                                <div>
                                    <router-link  :to='item.producturl'> {{item.productname}} </router-link>
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
                userinfo:{
					info:{}
				},
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
						active:['product','productrole'] 
					},{
						name:"新闻公告管理",
						link:'/news',
						icon:'&#xe667;',
						active:['news'] 
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
			
            obserable.on('getProduct',()=>{
				zmitiUtil.getProductList((arr)=>{
				   if(arr.getret === 0 ){
					   this.productList = arr.list;
				   }

               },this);
			})
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
                
				window.localStorage.setItem(this.isAdmin?'adminlogin':'login','');
				window.location.hash = '#/login';
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