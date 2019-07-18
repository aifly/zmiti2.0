<template>
	<div>
		<Table  :data='dataSource' :columns='columns'></Table>
	</div>
</template>

<script>
export default {
	props:['dataSource'],
	data(){
		return {
			columns:[
				{
					title:'产品名称',
					key:'productname',
					align:'center'
				},{
					title:'开始时间',
					key:'startdate',
					align:'center'
				},{
					title:'结束时间',
					key:'enddate',
					align:'center'
				},{
					title:'使用状态',
					key:'status',
					align:'center'
				},
				{
					title:'操作',
					key:'action',
					align:'center',
					width:200,
					render:(h,params)=>{

						return h('div', [
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
										var s = this;
										s.showDetail = true;
										s.formUser = params.row;
										s.showDetailPage = 1;
									
									}
								}
							}, '取消授权'),
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
										var s = this;
										s.showDetail = true;
										s.formUser = params.row;
										s.showDetailPage = 1;
									
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

	},
	mounted(){

	}

}
</script>