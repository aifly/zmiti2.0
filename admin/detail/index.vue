<template>
	<div class="wm-detail-main-ui">
		<header>
			<span>征集管理>评选详情>票数</span>
			<ul>
				<li @click='currentType = 0' :class="{'active':currentType === 0}">全部({{totalnum}})</li>
				<li @click='currentType = 1' :class="{'active':currentType === 1}">通过({{passnum}})</li>
				<li @click='currentType = 2' :class="{'active':currentType === 2}">拒绝({{rejectnum}})</li>
			</ul>
		</header>
		<a :href='"#/collection/"+resourceid+"/1"' class="wm-vote-back">
			<img :src="imgs.back" alt="">
		</a>
		<div class="wm-vote-list wm-scroll" :style="{height:viewH - 64 - 130 +'px',overflow:'auto'}">
			<ul>
				<li v-for='(vote,i) in voteList' :key="i">
					<header>
						{{vote.filetitle}}
						<div><img :src="vote.score === 100 ? imgs.pass2:imgs.reject1" alt=""></div>
					</header>
					<section>
						<div class="wm-ratername">{{vote.ratername}}</div>
						<div class="wm-vote-comments">
							<div>评论：</div>
							<div>{{vote.comments}}</div>
						</div>
					</section>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import './index.css';
	import symbinUtil from '../lib/util';
	import Vue from 'vue';
	export default {
		props:['obserable'],
		name:'zmitiindex',
		data(){
			return{
				visible:false,
				totalnum:0,
				passnum:0,
				rejectnum:0,
				resourceid:0,
				imgs:window.imgs,
				isLoading:false,
				currentType:0,
				viewH:window.innerHeight,
				currentRateid:-1,
				formAdmin:{
					raterpwd:'111111'
				},
				
				voteList:[],
				
				userinfo:{}
			}
		},
		components:{
		},
		beforeCreate(){
			
		},
		watch:{
			currentType(){
				this.getVoteList();
			}
		},
		mounted(){
			this.userinfo = symbinUtil.getUserInfo();
			this.getVoteNum();
			var t = setInterval(()=>{
				this.resource = Vue.obserable.trigger({type:'getResource'});

				if(this.resource){
					clearInterval(t);
					this.getVoteList();
				}
			})
		},
		
		methods:{
			getVoteNum(){//
				var s = this;
				var id = this.$route.params.id;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/getcountvotenum',
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername,
						id
					},
					success(data){
						if(data.getret === 0){
							s.totalnum = data.scorenum_success + data.scorenum_faild;
							s.passnum =  data.scorenum_success;
							s.rejectnum =  data.scorenum_faild;
						}
					}
				})
			},
			getVoteList(){
				var resourceid = this.resource[0].resourceid;
				this.resourceid = resourceid;
				console.log( )
				var s = this;
				var id = this.$route.params.id;
				symbinUtil.ajax({
					_this:s,
					url:window.config.baseUrl+'/wmadadmin/getvotedetail',
					data:{
						admintoken:s.userinfo.admintoken,
						adminusername:s.userinfo.adminusername,
						id,
						resourceid,
						status:s.currentType+1
					},
					success(data){
						console.log(data)
						if(data.getret === 0){
							s.voteList = data.list;
							//data.list[0].comments=  '默认是设置垂直方向的对齐方式,设置子元素之间如何分配多余空间设置子元素之间如何分配多余空间设置子元素之间如何分配多余空间设置子元素之间如何分配多余空间,设置子元素之间如何分配多余空间';
							/* for(var i = 0;i<3;i++){
								s.voteList = s.voteList.concat(s.voteList);
							} */
						}
					}
				})
			}
		}
	}
</script>