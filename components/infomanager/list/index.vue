<template>
	<div>
		<template v-if="showTemplate==true">
		<ininfor-manager :productid="productid" columntitle="公告" specialnum="3"></ininfor-manager>
		</template>
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../../common/lib/util';
	import ZmitiTable from '../../../common/table';
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
				dataSource:[],				
				showTable:false,
				currentNumber:1,
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{},
				typeDataList:[],
				typeid:-1,
				productid:0,
				showTemplate:false,
				title:'',
				begin_time:0,
				end_time:0,
				modal1: false,
                targetKeys1:[],
                mockData:[],
                currUserList:[],
				statusVal:'-1',
				selectStatus:[{
                    value: '-1',
                    label: '全部'
                },{
                    value: '0',
                    label: '禁用'
                },{
                    value: '1',
                    label: '待审'
                },{
                    value: '2',
                    label: '通过'
                },{
                    value: '3',
                    label: '拒绝'
                }],
                infoid:-1,
                companyid:'',
                userSource:[],				
			}
		},
		components:{
			ZmitiTable,
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
					productid && this.$router.push({path:'/infomanagerlist/'+productid});
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
						this.$router.push({path:'/infomanagerlist/'+productid});
						this.productid = productid;
						fn && fn(productid)
					}
				}, 100);
			}
		}
	}
</script>
 