<template>
    <div class="layout">
        <Layout v-if='$route.name !== "login" && $route.name !== "register"'>
            <Header>
               <div>
                    <div class="wm-title">
                        <img :src="imgs.loginTitle" alt="">
                    </div>
               </div>
               <div>
                   <div>
                       <span><img :src="imgs.search" alt=""></span><input type="text" placeholder="查询上报" @keydown="searchByKw" v-model='kw'/>
                   </div>
               </div>
               <div class="wm-user-info">
                   <span><img :src='imgs.man' /></span>
                   <span class="zmiti-text-overflow">{{userinfo.ratername}}</span>
                   <div title='退出' @click="logout">
                       <img :src="imgs.logout" alt="">
                   </div>
               </div>
            </Header>
            <Layout class="wm-main-layout">
                <div class="wm-tab-C" :style='{height:(viewH - 64- 10)+"px"}'>
                   <div>
                      <Menu width='300' :open-names="['1']"  >
                            <Submenu name="1">
                                <template slot="title">
                                    <Icon type="ios-paper" />
                                    作品评选
                                </template>
                                <a href='#/rate'>
                                    <MenuItem :class='{"ivu-menu-item-active ivu-menu-item-selected":$route.name === "rate"}' :key='i' v-for="(item,i) in sourceList" :name="item.resourceid">{{item.resourcecnname}}
                                    </MenuItem>
                                </a>
                            </Submenu>
                            <Submenu name="3">
                                <template slot="title">
                                    <Icon type="ios-paper" />
                                    我的
                                </template>
                                     <MenuItem to='/user/' name="13">个人中心 </MenuItem>
                            </Submenu>
                        </Menu>
                   </div>
                </div>
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
    import symbinUtil from '../lib/util';
    import sysbinVerification from '../lib/verification';

	export default {
		props:[],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
                viewH:document.documentElement.clientHeight,
                tabIndex:0,
                userinfo:{},
                sourceList:[],
                topMenu:[
                ],
                defaultMenu:[
                  
                ],
                menus:[],
                kw:'',
			}
		},
		components:{
		},
        beforeCreate(){
            this.validateData = sysbinVerification.validate(this);
        },
        watch:{
           $route(e){
               console.log(e)
           }
        },
		mounted(){
           ///this.menus = this.defaultMenu.concat([]);
            var obserable = Vue.obserable;
            
            var userinfo = symbinUtil.getUserInfo();

            this.userinfo = userinfo; 
            this.getSourceList();
            

            
        },
       
		methods:{
            searchByKw(){
                clearTimeout( this.timer );
                var s = this;
                if(!s.kw){
                    return;
                }
                this.timer = setTimeout(() => {
                    var {obserable} = Vue;
                    obserable.trigger({
                        type:"searchReportByKw",
                        data:s.kw
                    })
                }, 400);
                console.log(this.kw)
            },
            logout(){
                var s = this;
                
                symbinUtil.ajax({
                    _this:s,
                    url:window.config.baseUrl+'/wmreview/exitlogin',
                    data:{
                        ratername:s.userinfo.ratername,
                        accesstoken:s.userinfo.accesstoken
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
            getSourceList(){
                var s = this;

                var {obserable} = Vue;
                symbinUtil.ajax({
                    _this:s,
                    url:window.config.baseUrl+'/wmreview/checkresources/',
                    data:{
                        ratername:s.userinfo.ratername,
                        accesstoken:s.userinfo.accesstoken
                    },
                    success(data){
                        if(data.getret === 0){
                                s.sourceList = data.list;
                              
                                obserable.on("getCurrentSource",()=>{
                                    return data.list[0];
                                });
                              
                                obserable.on("getFeildList",()=>{
                                    return JSON.parse(data.list[0].tablefield).fieldlist;
                                });

                            }
                    }
                })
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