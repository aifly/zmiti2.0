<template>
	<div class="zmiti-submit-main-ui">
		<div class="zmiti-list-main">
			<header class="zmiti-tab-header">
				<div><span v-if='companyname'>{{companyname}} —— </span>畅阅</div>
				<div>
					<Button :loading='loading' @click="getDataList()" type="primary">刷新</Button>
				</div>
			</header>
			<section class='zmiti-list-where'>
				用户编号 <input type="text">
			</section>
			
			<div class='zmiti-submit-main zmiti-scroll ' :style="{height:viewH - 180+'px' }">
				<ZmitiTable :loading='loading' :dataSource='dataSource' :columns='columns' :change='change' :page-size='condition.page_size'  :total="total"></ZmitiTable>
			</div>
		</div>
			 
	</div>
</template>

<style lang="scss" scoped>
	@import './index.scss';
</style>
<script>

	import Vue from 'vue';
	import zmitiUtil from '../../common/lib/util';
	import ZmitiMask from '../../common/mask/';
	import ZmitiTable from '../../common/table/';

	var {companyActions,zmitiActions,changYueAcions,formatDate} = zmitiUtil;

	import {manuscriptStatus} from '../../common/config';

	

	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{

				
				targetKeys:[],
				showAvatarModal:false,
				
				companyname:'',
				roleList:[],
				imgs:window.imgs,
				isLoading:false,
				showDetail:false,
				total:0,
				showDetailPage:-1,
				currentClassId:-1, 
				adminuserId:'',
				loading:true,
				currentUserid:'',
				formUser:{
					isover:0,
					usersign:1,
					usertypesign:1,
					avatar:'&#xe6a4;'
				},
				address:'',
				showPass:false,
				showMap:false,
				viewH:window.innerHeight,
				viewW:window.innerWidth,
				dataSource:[],
				groupList:[],
				companyList:[],
				hideMenu:false,
				unJoinedCompany:[],
				columns:[
					{
						title:"产品编号",
						key:'productid',
						align:'center',
					},
					{
						title:"产品名称",
						key:'productname',
						align:'center',
					},
					{
						title:"开始时间",
						key:'startdate',
						align:'center',
						width:220,
						render:(h,params)=>{
							return h('div',{},formatDate(params.row.startdate))
						}
					},
					{
						title:'结束时间',
						key:'enddate',
						width:220,
						render:(h,params)=>{
							return h('div',{},formatDate(params.row.enddate))
						}
					},
				],
				
				formUser:{
					pdfurl:'',
					longitude :'116.585856',
					latitude :'40.364989'
				},
				 
				directoryList:{

				},
				condition:{
					page_index:0,
					page_size:10,
				},
				userinfo:{}
			}
		},
		components:{
			ZmitiMask,
			ZmitiTable
		},

		beforeCreate(){
			//var validate = sysbinVerification.validate(this);
			//zmitiUtil.clearCookie('login');

			///this.validate = validate;
		},
		mounted(){
			window.s = this;

			this.getDataList();

			
			
		},

		watch:{
			

			showDetail(val){
				if(val){
					this.showDetailPage = 1;
				}else{
					setTimeout(() => {
						this.showDetailPage = -1;
					}, 310);
				}
			},
			$route:{
				deep:true,
				handler(){
					this.getDataList()
				}
			}
			
		},
		
		methods:{
			change(e){
				this.condition.page_index = e -1;
				this.getMyCheckList();
			},
			closeMaskPage(){
				this.showDetailPage = -1;
			},
			handleChange2(ids,index,companyids){
				var s = this;
				companyids.forEach((companyid,i)=>{
					zmitiUtil.adminAjax({
						remark:index === 'left'?"exitCompany":"joinCompany",
						data:{
							action:companyActions[index === 'left'?"exitCompany":"joinCompany"].action,
							userid:s.currentUserid,
							companyid
						},
						success(data){
							s.$Message[data.getret === 0 ? 'success' : 'error'](data.msg);
							s.getJoinedCompany();
						}
					});
				})

			},
			filterMethod (data, query) {
                return data.label.indexOf(query) > -1;
            },
			getJoinedCompany(){
				var s = this;
				zmitiUtil.adminAjax({
					remark:'getJoinedCompany',
					data:{
						action:companyActions.getJoinedCompany.action,
						condition:{
							userid:s.currentUserid,
							page_index:0,
							page_size:20,
						}
					},
					success(data){
						if(data.getret === 0){
							s.targetKeys = [];
							data.list.forEach(dt=>{
								s.targetKeys .push(dt.companyid)
							})
						}
					}
				});
			},
			 
			 
			checkUser(){
				var username = this.formUser.username;
				var {$Message} = this;
				zmitiUtil.adminAjax({
					remark:'checkUserName',
					data:{
						action:zmitiActions.checkUserName.action,
						username
					},
					success(data){
						$Message[data.getret === 0 ? data.used  ? 'error':'success':'error'](data.msg);
					}
				})
			},
			getAvatar(avatar){
				this.formUser.avatar = avatar;
			},
		 
			 

			delete(manuscriptids){
				var s = this;
				zmitiUtil.ajax({
					remark:'delManuscript',
					data:{
						action:changYueAcions.delManuscript.action,
						condition:{
							manuscriptids
						}
					},
					success(data){
						s.$Message[data.getret === 0 ? 'success':'error'](data.msg);
						if(data.getret === 0){
							
							s.getDataList();
							///s.dataSource = data.list;	 
						}
					}
				})
			},
			change(e){
				this.condition.page_index = e -1;
				this.getDataList();
			},
			getDataList(){
				 zmitiUtil.getProductList((arr)=>{
					if(arr.getret === 0 ){
						this.loading = false;
						this.dataSource = arr.list;
					}
				},this);
			},
			
		}
	}
</script>
 