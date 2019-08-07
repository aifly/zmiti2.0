<template>
	<div>
		<div class='zmiti-user-table' >
			<Table @on-selection-change='selection' ref='selection'  :loading='loading' :data='dataSource' :columns='myColumns'></Table>
		</div>
		<div class='zmiti-pager'>
			<div>
				<Checkbox @on-change='selectAll'>全选</Checkbox>
				<slot name='table-btns'></slot>
			</div>
			<Page @on-change='change' :page-size='page_size' :total="total" show-total />
		</div>
	</div>
</template>
<style lang="scss" scoped>
@import '../css/base.scss';
.zmiti-user-table {
	width: 98%;
	margin: 0 auto;
}
@at-root.zmiti-text-overflow {
  overflow: hidden;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;
  -webkit-text-overflow: ellipsis;
}
@at-root.zmiti-pager{
	margin: 0px auto;
	width: 98%;
	padding: 10px 0;
	background: #eee;
	@include displayFlex(row);
	justify-content: space-between;
	-webkit-justify-content: space-between;
	border:1px solid #dcdee2;
	border-top: none;
	&>div,&>ul{
		margin:0 20px;
		line-height:30px;
	}
}

</style>
<script>
export default {
	props:{
		dataSource:{
			type:Array,
			default:[]
		},
		columns:{
			type:Array,
			default:[]
		},
		change:{
			type:Function,
			default:()=>{

			}
		},
		page_size:{
			type:Number,
			default:10,
		},
		total:{
			type:Number,
			default:0
		},
		loading:{
			type:Boolean,
			type:true,
		}
	},
	data(){
		return {
			myColumns:[{
					type: 'selection',
					width: 60,
					align: 'center'
				},
			],
			
		}
	},
	mounted(){
		this.myColumns = this.myColumns.concat(this.columns);
	},
	methods:{
		selectAll(e){
			 this.$refs.selection.selectAll(e);
		},
		selection(data){
			this.$emit('getSelection',data);
		}
	}
}
</script>
