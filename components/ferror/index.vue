<template>
	<div class="zmiti-login-ui">

		页面没找到
		
	</div>
</template>

<script>
	import './index.css';
	import $ from 'jquery';

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				
			}
		},
		components:{
		},
		
		methods:{
			

		},
		mounted(){
 			console.log(this.$route.params.id )
		}
	}
</script>
 