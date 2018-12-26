<template>
    <div class="layout">
        <Layout v-if='$route.name !== "login" && $route.name !== "register"'>
            <Header>
               <div>
                    <div class="wm-title">
                        <img :src="imgs.adminLoginTitle" alt="">
                    </div>
               </div>
               <div>
                   <div v-if='false'>
                       <span><img :src="imgs.search" alt=""></span><input type="text" placeholder="查询我的上报" />
                   </div>
               </div>
               <div class="wm-user-info">
                   <span><img :src='imgs.man' /></span>
                   <span class="zmiti-text-overflow">{{userinfo.adminusername}}</span>
                   <div @click="logout">
                       <img :src="imgs.logout" alt="">
                   </div>
               </div>
            </Header>
            <Layout class="wm-main-layout">
                <div class="wm-tab-C" :style='{height:(viewH - 64)+"px"}'>
                    <Menu width='300'   theme='dark'  @on-select='select'>
                        
                        <Submenu name="1">
                            <template slot="title">
                                <Icon type="ios-paper" />
                                人员管理
                            </template>
                            <!--  <MenuItem :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "rate"}' :key='i' v-for="(item,i) in sourceList" :name="item.resourceid">{{item.resourcecnname}}
                            </MenuItem> -->
                            <MenuItem name='adminuser' to='/adminuser/' :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "adminuser"}'>
                                上报人员管理
                            </MenuItem>
                            <!--  <MenuItem :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "rate"}' :key='i' v-for="(item,i) in sourceList" :name="item.resourceid">{{item.resourcecnname}}
                            </MenuItem> -->
                            <MenuItem to='/rater/' name='rater' :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "rater"}'>
                                评委管理
                            </MenuItem>
                        </Submenu>
                         <Submenu name='4'>
                            <template slot="title">
                                <Icon type="ios-paper-plane" />
                                征集管理
                            </template>
                            <MenuItem name='recruit' to='/recruit/' :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name.indexOf("recruit")>-1||$route.name.indexOf("collection")>-1}'>
                                征集管理
                            </MenuItem>
                            <!-- <MenuItem v-for='(resource,i) in resourceList' :key="i" :name='"collection"+i' :to='"/collection/"+resource.resourceid+"/0"' :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "collection"}'>
                                {{resource.resourcecnname}}
                            </MenuItem> -->
                        </Submenu>
                        <Submenu name='2'>
                            <template slot="title">
                                <Icon type="ios-paper" />
                                我的
                            </template>
                            <MenuItem name='user' to='/user/' :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "user"}'>
                                个人中心
                            </MenuItem>
                            <MenuItem name='download' to='/download/' :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "download"}'>
                                我的下载
                            </MenuItem>
                        </Submenu>
                    </Menu>
                </div>
                <Layout :style="{maxWidth:viewW-200+'px'}">
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
    import symbinUtil from '../lib/util';
    import sysbinVerification from '../lib/verification';

	export default {
		props:[],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
                viewH:document.documentElement.clientHeight,
                viewW:window.innerWidth,
                tabIndex:0,
                userinfo:{},
                
                resourceList:[],
                menus:[]
			}
		},
		components:{
		},
        beforeCreate(){
            this.validateData = sysbinVerification.validate(this);
        },
        watch:{
           $route(e){
               //console.log(e)
           }
        },
		mounted(){
            window.s = this;
           ///this.menus = this.defaultMenu.concat([]);
            var obserable = Vue.obserable;
            
            var userinfo = symbinUtil.getUserInfo();

            this.userinfo = userinfo; 
            
            window.onresize = ()=>{
                this.viewW  = window.innerWidth;
            }
            
            if(this.$route.name !== 'login'){
               this.getResourceList();
            }
            setTimeout(() => {
                $('.ivu-menu-submenu-title').trigger('click')
            }, 100);
        },
       
		methods:{
            select(name){
                switch (name) {
                    case "adminuser":
                        Vue.obserable.trigger({
                            type:'freshadminuser'
                        })
                        break;
                
                    default:
                        break;
                }
            },
            getResourceList(){
                var s = this;
                symbinUtil.ajax({
                    _this:s,
                    url:window.config.baseUrl+'/wmadadmin/getsourcelist/',
                    data:{
                        admintoken:s.userinfo.admintoken,
					    adminusername:s.userinfo.adminusername,
                    },
                    success(data){
                        if(data.getret === 0){
                            s.resourceList = data.list;
                         
                            Vue.obserable.on('getResource',()=>{
                                return data.list;
                            });
                        }
                    }
                })
			},

            
            tab(index){
                this.tabIndex = index;
            },
           
            loadMenu(option,fn){
                var s = this;
                return;
                symbinUtil.ajax({
                    _this:s,
                    url:window.config.baseUrl+"/admin/getmenulist",
                    validate:s.validateData,
                    data:{
                        status:option.status,
                    },
                    fn(data){

                       // console.log(JSON.stringify(data));
                        
                        if(data.getret===0){

                            fn && fn(data);
                        }
                        else{
                            s.$Message.error({
                                content:data.getmsg,
                                duration: 10
                            });
                             
                        }
                        
                    }
                })
            },
            logout(){
                var s = this;
                symbinUtil.ajax({
                    _this:s,
                    url:window.config.baseUrl+'/wmadadmin/exitlogin/',
                    data:{
                        adminusername:s.userinfo.adminusername,
						admintoken:s.userinfo.admintoken
                    },
                    error(){
                        s.$Message.success('注销成功');
                        symbinUtil.clearCookie('login');
                        window.location.hash = '/login';
                        window.sessionStorage.clear();
                    },
                    success(data){
                        s.$Message.success('注销成功');
                        symbinUtil.clearCookie('login');
                        window.location.hash = '/login';
                        window.sessionStorage.clear();
                    }
                });
            }
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