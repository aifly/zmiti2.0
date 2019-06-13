<template>
	<div class='zmiti-wo-detail-ui' :style="{height:viewH - 60+'px'}">
		<div class='zmiti-wo-step'>
			<ul>
				<li :class="{'through':workinfo.status>i,'active':workinfo.status==i}" v-for='(step,i) of orderStatus' :key="i">
					<span v-if='i<=2'>{{step.status}}</span>
					<span v-else>{{workinfo.status === 3 ? step.status:"未评价"}}</span>
				</li>
			</ul>
		</div>
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

		<div class='zmiti-wo-detail-content zmiti-scroll'>
			<div>
				<header>沟通内记录</header>
				<ul>
					<li v-for='(op,i) of workinfo.operainfo' :key="i">
						<div>
							<span class='zmt_iconfont' v-html='op.avatar||"&#xe6a4;"'></span>
							<span class='zmiti-realname'>{{op.realname}}</span>
						</div>
						<div class='zmiti-reply-content'>
							{{op.content}}
						</div>
						<div>
							{{op.operatime}}
						</div>
					</li>
				</ul>
			</div>
			<div class='zmiti-wo-reply-ui'>
				<template v-if='!(workinfo.status >=2 && isAdmin)'>
					<header >{{workinfo.status === 2 ? '我要评价':workinfo.status === 3 ?"用户评价": '我要反馈'}}</header>
					<div class='zmiti-reply-input' v-if='workinfo.status>=2' >
						评分 :<Rate :disabled='workinfo.status === 3' clearable v-model="workinfo.grade" /> 
					</div>
					<div class='zmiti-reply-input'  v-if='workinfo.status>=3'>
						用户评价 :{{workinfo.feedback}}
					</div>
					<div class='zmiti-reply-input' v-if='workinfo.status>=2'>
						是否解决：
						<RadioGroup v-model="workinfo.issettle" >
							<Radio :value='0' :label="0" :disabled='workinfo.status === 3'>已解决</Radio>
							<Radio :value='1' :label="1" :disabled='workinfo.status === 3'>未解决</Radio>
						</RadioGroup>
					</div>
					<Input v-if='workinfo.status < 3' class='zmiti-reply-input' type='textarea' :rows='8' v-model='content'/>
					<div class='zmiti-reply-btn' v-if='workinfo.status < 3'>
						<Button style='position:relative;z-index:1' type='primary' @click='replyOrder'>提交</Button>
					</div>
				</template>
			</div>
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
			viewH:window.innerHeight,
			workinfo:{
				status:0,
				grade:1,
				issettle:1,
				operainfo:[]
			}
		}

	},
	mounted() {
		this.userReadWorkOrder();
	},
	methods: {
		formatDate:zmitiUtil.formatDate,
		replyOrder(){//回复工单
			var {content,isAdmin,workinfo,$Message} = this;
			var {grade,issettle} = workinfo;
			var s = this;
			if(workinfo.status >= 2){//已确认
				if(workinfo.status === 3 ||isAdmin){
					return;
				} 
				zmitiUtil[isAdmin ? 'adminAjax':'ajax']({
					remark:"evaluateWorkOrder",
					data:{
						action:userActions.evaluateWorkOrder.action,
						info:{
							workorderid:workinfo.workorderid,
							feedback:content,
							grade,
							issettle
						}
					},
					success(data){
						s.content = '' ;
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
						 s.userReadWorkOrder();
					}
				});

			}
			else{
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
						s.content = '' ;
						$Message[data.getret === 0 ? 'success':'error'](data.msg);
						s.userReadWorkOrder();
					}
				});
			}
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
			var {workinfo,$Message} = this;
			var s = this;
			zmitiUtil.ajax({
				remark:"userCloseWorkOrder",
				data:{
					action:userActions.userCloseWorkOrder.action,
					info:{
						workorderid:workinfo.workorderid
					}
				},
				success(data){
					$Message[data.getret === 0 ? 'success':'error'](data.msg);
					s.userReadWorkOrder();
				}
			})
		}
	},
}
</script>
