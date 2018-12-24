<template>
	<div class="symbin-landowner-ui">
		农场主页面。
	</div>

</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import farmerUtil from '../lib/farmerutil';
	//import symbinTable from './symbintable.vue';
	export default {
		props:[],
		name:'zmitiindex',

		data(){
			return {

			}
		},
		components:{
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);

		},
		methods:{

			 
			
		},
		mounted(){//页面加载完成后显示

			var id = this.$route.params.id;


			farmerUtil.getColumnByMenuId(id,this);
			
		},
	}
</script>
 