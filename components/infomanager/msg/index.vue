<template>
	<div>
		<template v-if="showTemplate==true">
			<ininfor-manager :productid="productid" columntitle="消息" specialnum="0"></ininfor-manager>
		</template>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import IninforManager from './list';
	var {companyActions,zmitiActions,infomanagerActions,formatDate,userActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				targetKeys:[],
				showAvatarModal:false,				
				companyname:'',
				addDataSource:[],
				imgs:window.imgs,
				total:0,
				loading:true,
				currentCityIndex: -1,
				currentCityId: -1,
				transX: 0,
				transY: 0,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				productid:0,
				showTemplate:false
			}
		},
		components:{
			IninforManager
		},

		beforeCreate(){
			
		},
		created(){
			this.companyid=zmitiUtil.getCurrentCompanyId().companyid;
		},
		mounted(){
			this.init(()=>{
				//console.log(this.productid,'this.productid')
			})	
		},

		watch:{
			$route:{
				handler(){
					var productid = this.productid;
					productid && this.$router.push({path:'/infomanagermsg/'+productid});
				}
			},
			productid(){
				this.showTemplate=true;
			}
		},
		
		methods:{
			init(fn){
				var s = this;
				var t = setInterval(() => {
					if(Vue.productList){
						clearInterval(t);
						var productid =  this.$route.params.id ;
						if(!productid){
							Vue.productList.forEach(p=>{
								if(s.$route.name.indexOf(p.producturl.substr(1))>-1){
									productid  = p.productid;
								}
							})
						}
						this.$router.push({path:'/infomanagermsg/'+productid});
						this.productid = productid;
						fn && fn(productid)
					}
				}, 100);
			},
			
		}
	}
</script>
 