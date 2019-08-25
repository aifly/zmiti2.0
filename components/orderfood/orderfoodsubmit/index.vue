<template>
	<div class="zmiti-orderfood-main-ui">

		<Form style="width:80%;margin:40px auto;" class='zmiti-add-form-C' :model="formObj" :label-width="80">
			<FormItem label="订餐人数：">
				<Input v-model="formObj.number" placeholder="订餐人数：" />
			</FormItem>

			<FormItem label="订餐时间：">
				 <DatePicker type="date" format='yyyy-MM-dd HH:mm:ss' v-model="formObj.orderdate" placeholder="请选择订餐时间"></DatePicker>
			</FormItem>
			<FormItem label="手机号：">
				<Input v-model="formObj.mobile" placeholder="手机号：" />
			</FormItem>
			<FormItem label="备注：">
				<Input type="textarea" v-model="formObj.remarks" placeholder="备注：" />
			</FormItem>

		</Form>


		<div style="width:100px; margin:30px auto;">
			<Button type="primary" long @click="orderFood">提交</Button>
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
	var {orderFoodActions} = zmitiUtil;
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				formObj:{

				},
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
			
			this.init(()=>{
				//this.orderFood();
			})
			
		},

		watch:{

			
			
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
						this.$router.push({path:'/orderfoodsubmit/'+productid});
						
						fn && fn(productid)
					}
				}, 100);
			},

			orderFood(){

				var s = this;
				zmitiUtil.ajax({
					remark:'userOrderFood',
					data:{
						action:orderFoodActions.userOrderFood.action,
						info:{
							companyid:zmitiUtil.getCurrentCompanyId().companyid,
							productid:s.$route.params.id,
							number:s.formObj.number,
							mobile:s.formObj.mobile,
							orderdate:s.formatDate(s.formObj.orderdate),
							remarks:s.formObj.remarks,
						}
					},
					success(data){ 
						console.log(data);
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						s.formObj = {};
					}
				})
			},
			formatDate(date, format) {
				if (!date) return;
				if (!format)
					format = "yyyy-MM-dd";
				switch (typeof date) {
				case "string":
					date = new Date(date.replace(/-/, "/"));
					break;
				case "number":
					date = new Date(date);
					break;
				}
				if (!date instanceof Date) return;
				var dict = {
					"yyyy" : date.getFullYear(),
					"M" : date.getMonth() + 1,
					"d" : date.getDate(),
					"H" : date.getHours(),
					"m" : date.getMinutes(),
					"s" : date.getSeconds(),
					"MM" : ("" + (date.getMonth() + 101)).substr(1),
					"dd" : ("" + (date.getDate() + 100)).substr(1),
					"HH" : ("" + (date.getHours() + 100)).substr(1),
					"mm" : ("" + (date.getMinutes() + 100)).substr(1),
					"ss" : ("" + (date.getSeconds() + 100)).substr(1)
				};
				return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
					return dict[arguments[0]];
				});
			}



		}
	}
</script>
 