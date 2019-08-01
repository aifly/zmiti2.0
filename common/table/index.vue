<template>
	<div>
		<div class='zmiti-user-table' >
			<Table  :loading='loading' :data='dataSource' :columns='columns'></Table>
		</div>
		<div class='zmiti-pager'>
			<Page @on-change='change' :page-size='page_size' :total="total" show-total />
		</div>
	</div>
</template>
<style lang="scss">
	
</style>
<script>
export default {

	props:['dataSource','columns','change','page_size','total','loading'],
	data(){
		return {

		}
	},
}
</script>
