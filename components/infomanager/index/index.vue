<template>
	<div class="zmiti-tripexpence-main-ui">

		 <div :class="{'hide':showTable}" ref='tripexpence-main-ui' class='zmiti-tripexpence-map lt-full'>

		 </div>
		 <div :class="{'active':showTable}" v-if='showTable' class='zmiti-tripexpence-table lt-full'>
			 <header>
				 <div>
					 <span>信息管理</span>

				 </div>
				 <div>
					 <Button @click="back" type="primary">返回</Button>
				 </div>
			 </header>
			 <div class='zmiti-scroll' :style="{height:viewH - 110+'px'}">
				
				
			 </div>
		 </div>




	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
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
				dataSource:[],				
				showTable:false,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				productid:0,
			}
		},
		components:{
			ZmitiTable
		},

		beforeCreate(){
			
		},
		mounted(){

			setTimeout(() => {
				this.productid =  this.$route.params.id
			}, 100);
			
		},

		watch:{

			
			
		},
		
		methods:{



		}
	}
</script>
 