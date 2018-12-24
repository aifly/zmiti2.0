<template>
	<div class="sysbin-home-ui">
		
	</div>
</template>

<script>
	import './index.css';
	import sysbinVerification from '../lib/verification';
	import symbinUtil from '../lib/util';
	import Tab from '../tab/index';
	import $ from 'jquery';

	export default {
		props:['obserable'],
		data(){
			return{
				tabIndex:0,
				theme2:"light",
				tabs:[
					{
						name:'全部'
					},{
						name:'已审核',
						children:[
							{name:"审核通过"},
							{name:"审核未通过"}
						]
					},{
						name:'未审核'
					}
				]
			}
		},
		components:{
			Tab
		},

		beforeCreate(){
			this.validateData = sysbinVerification.validate(this);
			//symbinUtil.clearCookie('login');

		},
		mounted(){

			var s =this;

			/*symbinUtil.ajax({
 				//url:'https://api.symbin.cn/v1/admin/addmenu',
 				url:'https://api.symbin.cn/v1/admin/delmenu',
 				data:{
 					adminusername:s.validateData.adminusername,
 					admintoken:s.validateData.admintoken,
 					menuids:1109426180,
 					menuname:"子菜单",
 					menuename:'',
 					menuurl:"/home1/",
 					sort:1,
 					showwhere:2
 				},
 				fn(data){
 					console.log(data);
 				}
 			})*/
		},
		methods:{
			tab(index){
				this.tabIndex = index;
			}
		}
	}
</script>
 