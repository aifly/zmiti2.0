<template>
	<RoleGroup v-if='productid' :productid='productid'></RoleGroup>
</template>

<script>
import RoleGroup from '../../rolegroup';
import Vue from 'vue';
export default {
	data(){
		return {
			productid:""
		}
	},
	components:{
		RoleGroup
	},
	mounted() {

		this.init();
		
	
	},
	watch: {
		$route:{
			handler(){
				var productid = this.productid;
				productid && this.$router.push({path:'/triprole/'+productid});
			}
		}
	},
	methods: {
		init(){
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
					this.$router.push({path:'/triprole/'+productid});
					this.productid = productid;
				}
			}, 100);
		}
	},
}
</script>