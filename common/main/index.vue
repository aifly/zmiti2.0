<template>
    <div class="layout">
        <Layout v-if='$route.name !== "login" && $route.name !== "register" && $route.name !== "passwordfind"'>
            <Header>
               <div>
                    <div class="zmiti-title">
                        <img :src="imgs.userLoginTitle" alt="">
						<span>v2.0</span>
                    </div>
               </div>
               <div>
                  <div v-if='isAdmin'>管理端控制平台</div>
                  <div v-else>
					  <span><router-link to='/home'>单位端控制平台</router-link></span>
					  <div class='zmiti-company-info'>
						   <span style='margin:0 10px 0 20px' v-if='currentComapny'>
							   <keep-alive>
							   		<span>当前单位：{{currentComapny.companyname}}</span>
							   </keep-alive>
							<span v-if='currentComapny.islead' style="font-size:12px;margin-left:10px;"> (管理员)</span> </span>
					  <router-link style='font-size:12px;cursor:pointer;' to='/login' v-if='userinfo.info&&userinfo.info.company_list&&userinfo.info.company_list.length>1'></router-link>
					  </div>
				  </div>
               </div>
               <div class="zmiti-user-info">
				    <template v-if='!isAdmin'>
						<span v-if='currentComapny.islead'>
							<router-link to='/companyinfo'>单位管理</router-link> 
						</span>
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
							<router-link :to='isAdmin?"/unworkorder":"/workorderlist"'>工单处理</router-link> 
						</span>
					</template>
					<span class='zmiti-user-avatar'>
 						{{userinfo.username}}
						<span class='zmt_iconfont' v-html='userinfo.info && userinfo.info.avatar||"&#xe6a4;"'>
							
						</span>
						<ul>
							<li class='zmiti-hover-username'>
								{{userinfo.username||'无'}}
							</li>
							<li class='zmiti-hover-tab'>
								<div>基本信息</div>
								<div @click="showModifyPass=true">安全管理</div>
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
					   <keep-alive>
							<ul>
								<li class='zmiti-menu-title' v-if='!isAdmin'>
									<div><img :src="imgs.zmiti" alt=""></div><div>{{isAdmin?"系统管理":"产品与服务"}}</div>
									</li>
								<li @click='mouseout' class='zmiti-text-overflow zmiti-menu-item1' :class='{"active":$route.name.indexOf(item.producturl.substring(1))>-1}' :key='i' v-for="(item,i) in productList" :name="item.productid">
										<div><router-link :to='item.producturl+"/"+item.productid'><span class='zmt_iconfont' v-html='item.icon || "&#xe609;"'></span></router-link> </div>
										<div>
											<router-link  :to='item.producturl+"/"+item.productid'> {{item.productname}} </router-link>
										</div>
								</li>
								<template v-if='isAdmin'>
										<li @click='mouseout'  class='zmiti-menu-item1' :class="{'active':menu.active.some(ar=>ar === $route.name)}" v-for="(menu,i) in menus" :key='i'>
											
											<div><router-link :to="menu.link"><span class='zmt_iconfont' v-html='menu.icon'></span></router-link> </div>
											<div><router-link :to="menu.link">{{menu.name}}</router-link></div>
										</li>
								</template>
							</ul>
					   </keep-alive>
                   </div>
                </div>

                <div style="width:50px;height:100%;"></div>
                
                <Layout class='zmiti-main-page' :style="{height:viewH - 50+'px'}">
                   <router-view></router-view>
                </Layout>
            </Layout>
        </Layout>
        <div v-else>
            <router-view></router-view>
        </div>

		<Modal v-model="showModifyPass" title='修改密码' @on-ok='modifyPass'>
			<Form>
				<FormItem label='原始密码：' :label-width='100'>
					<Input @on-keydown.13='modifyPass' v-model="oldpwd"/>
				</FormItem>
				<FormItem label='新密码：' :label-width='100'>
					<Input @on-keydown.13='modifyPass' v-model="newpwd"/>
				</FormItem>
			</Form>
		</Modal>
    </div>
</template>
<style lang='scss' scoped>
	@import './index.scss';
</style>


<script>
    import Vue from 'vue';
	import zmitiUtil from '../lib/util';
	let {userActions} = zmitiUtil;
	export default {
		props:['isAdmin'],
		name:'zmitiindex',
		data(){
			return{
				imgs:window.imgs,
				showMenu:false,
				showModifyPass:false,
                viewH:document.documentElement.clientHeight,
				tabIndex:0,
				newpwd:'',
				oldpwd:'',
				isLead:zmitiUtil.getCurrentCompanyId().islead,
                userinfo:{
					info:{

					}
				},
				currentComapny:zmitiUtil.getCurrentCompanyId(),
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
						active:['product','productrole','adminchangyue','adminchangyuesetting','adminchangyuelog'] 
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
			
			this.userinfo = userinfo||{info:{}};  
			
			var s = this;


			obserable.on('loginError',()=>{
				this.$Modal.warning({
					title:'智小媒提醒您',
					content:'<p>您的帐号已在其他终端登录。</p> <p>如非本人操作，建议您重新登录后更改密码。</p>',
					onOk:()=>{
						window.localStorage.clear();
						window.location.href = window.location.href.split('#')[0]; 
					}
				});
			});
			
            obserable.on('getProduct',()=>{
				if(!window.isAdmin && s.$route.name !=='login' && s.$route.name !=='register'){
					 
					zmitiUtil.getProductList((arr)=>{
					   if(arr.getret === 0 ){
						   s.productList = arr.list;
						   Vue.productList = s.productList;
					   }
				   },s);
				}
			});


			
			setTimeout(() => {
				obserable.trigger({
					type:'getProduct'
				})
			}, 100);
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
			modifyPass(){
				var s = this;
				if(!this.oldpwd){
					this.$Message.error('旧密码不能为空');
					return;
				};
				if(!this.newpwd){
					this.$Message.error('新密码不能为空');
					return;
				}
				zmitiUtil.ajax({
					remark:"userModifyPassword",
					data:{
						action:userActions.userModifyPassword.action,
						oldpwd:s.oldpwd,
						newpwd:s.newpwd,
					},
					success(data){
						s.showModifyPass = false;
						if(data.getret === 0 ){
							s.$Modal.success({
								title:"修改密码成功",
								content:"即将退出重新登录",
								onOk:()=>{
									window.localStorage.clear();
									s.$router.push({path:'/login'});
								}
							});
							
						}
					}
				})
			},
			mouseout(){
				this.showMenu = false;
			},
			mouseover(){
				this.showMenu = true;
			},
            logout(){
                var s = this;
                
				window.localStorage.clear();
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