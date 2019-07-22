<template>
	<div>
		<Table  :data='powerData' :columns='columns'></Table>
	</div>
</template>

<script>

import zmitiUtil from '../../common/lib/util';
let {formatDate,adminActions} = zmitiUtil;
export default {

	props:['dataSource'],
	data(){
		return {
			powerData:[],
			formatDate,
			columns:[
				{
					title:'产品名称',
					key:'productname',
					align:'center'
				},{
					title:'开始时间',
					key:'startdate',
					align:'center',
					render:(h,params)=>{
						return h('div',{},formatDate(params.row.startdate))
					}
				},{
					title:'结束时间',
					key:'enddate',
					align:'center',
					render:(h,params)=>{
						return h('div',{},formatDate(params.row.enddate))
					}
				},{
					title:'使用状态',
					key:'status',
					align:'center',
					render:(h,params)=>{
						var isOk = params.row.status === 1;
						return h('div',{
							style:isOk ?　{
								color:'green',
								fontWeight:'bold'
							}:{
								color:'red',
								fontWeight:'bold'
							}
						},isOk ? '正常使用':'已禁用');
					}
				},
				{
					title:'操作',
					key:'action',
					align:'center',
					width:200,
					render:(h,params)=>{

						return h('div', [
							h('Poptip',{
								props:{
									confirm:true,
									title:"确定要取消授权吗？",
									placement:'left'
								},
								on:{
									'on-ok':()=>{
										this.unpower(params.row,params.index);
									},
									
								}
							},[
								h('span', {
									props: {
										type: 'error',
										size: 'small'
									},
									style:{
										cursor:'pointer',
										color:'#06C'
									},
									on: {
										click: () => {
										}
									}
								}, '取消授权')
							]),
							h('span', {
								props: {
									type: 'primary',
									size: 'small'
								},
								style: {
									margin: '2px 10px',
									border:'none',
									fontSize: '12px',
									cursor:'pointer',
									color:'#06C'

								},
								on: {
									click: () => {
										this.$emit('openMask',params.row);
									}
								}
							}, '延期')
							
						]);
						
							
					}
				}
			]
		}
	},
	methods:{
		unpower(item,index){


			var s = this;
		
			zmitiUtil.adminAjax({
				remark:"delProductPower",
				data:{
					action:adminActions.delProductPower.action,
					powerid:item.powerid

				},
				success(data){
					s.powerData.splice(index,1);
				}
			});
		},
	},
	mounted(){
		this.powerData = this.dataSource;
	}

}
</script>