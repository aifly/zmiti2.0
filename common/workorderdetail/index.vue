<template>
	<div class='zmiti-wo-detail-ui'>
		<header class='zmiti-wo-detail-header'>
			<div>问题标题：{{workinfo.content}}</div>
			<div class='zmiti-wo-detail-status'>
				<div>工单编号：{{workinfo.workorderid}}</div>
				<div>用户手机号：{{workinfo.usermobile}}</div>
				<div>提交时间：{{formatDate(workinfo.createtime)}}</div>
				<div>状态：{{orderStatus[workinfo.status].status}}</div>
				<div class='zmiti-close-order' @click='closeOrder'>确认结单</div>
			</div>
		</header>

		<div class='zmiti-wo-detail-content'>
			<header>沟通内容</header>
			<Input v-model='content'/>
			<Button style='position:relative;z-index:1' type='primary' @click='replyOrder'>提交</Button>
		</div>
	</div>
</template>
<style lang="scss">
	@import './index.scss';
</style>
<script>
import zmitiUtil from '../lib/util';
import {orderStatus} from '../config';

var {userActions,adminActions} = zmitiUtil;

export default {
	props:{
		isAdmin:{
			type:Boolean,
			default:false
		}
	},
	data(){

		return {
			content:"",
			orderStatus,
			workinfo:{
				status:0
			}
		}

	},
	mounted() {
		this.userReadWorkOrder();
	},
	methods: {
		formatDate:zmitiUtil.formatDate,
		replyOrder(){//回复工单
			var {content,isAdmin,workinfo} = this;
			zmitiUtil[isAdmin ? 'adminAjax':'ajax']({
				remark:"replayWorkOrder",
				data:{
					action:(isAdmin?adminActions:userActions).replayWorkOrder.action,
					info:{
						workorderid:workinfo.workorderid,
						content,
						attachment:"",
						operatype:isAdmin ? 0 : 1 //
					}
				},
				success(data){
					console.log(data,'replayWorkOrder')
				}
			});
		},
		userReadWorkOrder(){
			var {isAdmin } = this;
			var s = this;
			zmitiUtil[isAdmin ? 'adminAjax':'ajax']({
				remark:"userReadWorkOrder",
				data:{
					//action:isAdmin ? adminActions.userReadWorkOrder.action : userActions.userReadWorkOrder.action,
					action:(isAdmin?adminActions:userActions).userReadWorkOrder.action,
					info:{
						workorderid:this.$route.params.id
					}
				},
				success(data){
					if(data.getret === 0){
						s.workinfo = data.workinfo;
					}
				}
			});
		},
		closeOrder(){//用户关闭工单 
			if(this.isAdmin){
				return;
			}
			var {workinfo} = this;
			zmitiUtil.ajax({
				remark:"userCloseWorkOrder",
				data:{
					action:userActions.userCloseWorkOrder.action,
					info:{
						workorderid:workinfo.workorderid
					}
				},
				success(data){
					console.log(data,'userCloseWorkOrder');
				}
			})
		}
	},
}
</script>
