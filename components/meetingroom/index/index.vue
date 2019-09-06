<template>
	<div class="zmiti-meetingroom-main-ui lt-full">
		<Table style="margin:40px auto" width='800' height='300' :columns='dataSource.columns' :data='dataSource.data'></Table>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiMask from '../../../common/mask';
	import {timeRange} from '../../../common/config'
	var {orderFoodActions,userActions} = zmitiUtil;

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				dataSource:{
					columns:[
						{
							title:"时间",
							width:200,
							align:'center',
							 fixed: 'left',
							render:(h,params)=>{
								return h('div',{},timeRange[params.index]);
							}
						},
						{
							title:'第一会议室',
							width:200,
							key:'meeting1',
							align:'center',
							render:(h,params)=>{
								return h('div',{
									style:{
										width:'100%',
										height:'30px',
										background:params.row.meeting1? 'red':'transparent'

									}
								})
							}
						},
						{
							title:'第二会议室',
							width:200,
							key:'meeting2',
							align:'center',
							render:(h,params)=>{
								return h('div',{
									style:{
										width:'100%',
										height:'100%',
										width:'100%',
										height:'30px',
										background:params.row.meeting2? 'red':'transparent'

									}
								})
							}
						},
						{
							title:'第3会议室',
							width:200,
							key:'meeting3',
							align:'center',
							render:(h,params)=>{
								return h('div',{
									style:{
										width:'100%',
										height:'30px',
										background:params.row.meeting3? 'red':'transparent'

									}
								})
							}
						},
						{
							title:'第4会议室',
							width:200,
							key:'meeting4',
							align:'center',
							render:(h,params)=>{
								return h('div',{
									style:{
										width:'100%',
										height:'30px',
										background:params.row.meeting4? 'red':'transparent'

									}
								})
							}
						},
						{
							title:'第5会议室',
							width:200,
							key:'meeting5',
							align:'center',
							render:(h,params)=>{
								return h('div',{
									style:{
										width:'100%',
										height:'30px',
										background:params.row.meeting5? 'red':'transparent'

									}
								})
							}
						},
						{
							title:'第6会议室',
							width:200,
							key:'meeting6',
							align:'center',
							render:(h,params)=>{
								return h('div',{
									style:{
										width:'100%',
										height:'30px',
										background:params.row.meeting6? 'red':'transparent'

									}
								})
							}
						}
					],
					data:[
						{
							meeting1:1,
							meeting2:0,
							meeting3:1,
							meeting4:0,
							meeting5:0,
							meeting6:1,
						},{
							meeting1:1,
							meeting2:0,
							meeting3:0,
							meeting4:1,
							meeting5:0,
							meeting6:1,
						},
						{
							meeting1:1,
							meeting2:0,
							meeting3:1,
							meeting4:0,
							meeting5:0,
							meeting6:1,
						},
						{
							meeting1:1,
							meeting2:0,
							meeting3:1,
							meeting4:0,
							meeting5:0,
							meeting6:1,
						},
						{
							meeting1:1,
							meeting2:0,
							meeting3:1,
							meeting4:0,
							meeting5:1,
							meeting6:1,
						},
						{
							meeting1:1,
							meeting2:0,
							meeting3:1,
							meeting4:0,
							meeting5:1,
							meeting6:1,
						},
						{
							meeting1:1,
							meeting2:0,
							meeting3:1,
							meeting4:0,
							meeting5:1,
							meeting6:1,
						},
						{
							meeting1:1,
							meeting2:0,
							meeting3:1,
							meeting4:0,
							meeting5:1,
							meeting6:1,
						},
					]
				},
				condition:{
					page_index:0,
					page_size:200,
				},
			}
		},
		components:{
			ZmitiMask
		},

		beforeCreate(){
			
		},
		mounted(){

		 
 
			//
			
		},

		watch:{
			$route:{
				handler(){
					var productid = this.productid;
					productid && this.$router.push({path:'/meeingroom/'+productid});
				}
			}
			
			
		},
		
		methods:{

			 
			closeMaskPage(){
				Vue.obserable.trigger({
					type:'toggleMask',
					data:false
				})
			},
		    
			


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
						this.$router.push({path:'/meeingroom/'+productid});
						this.productid = productid;
						fn && fn(productid)
					}
				}, 100);
			},

		 

		 
 
		 

		}
	}
</script>
 