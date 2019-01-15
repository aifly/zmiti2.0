<template>
	<div class="zmiti-tab-content zmiti-practice-box">
		<header class="zmiti-practice-header">
			<div>练习</div>
			<div>
				<Button @click="changeWid" type="primary">新增项目</button>
			</div>
		</header>
		<div class="zmiti-practice-cont">
			<div class="zmiti-table" :style="{'width': wid+'%'}">
				<table cellspacing="0" border="0">
					<tr>
						<th>单位名称</th>
						<th>负责人账号</th>
						<th>用戶总数</th>
						<th>到期时间</th>
						<th>空间使用量</th>
						<th>操作</th>
					</tr>
				</table>
				<table cellspacing="0" border="0">
					<tr>
						<td>单位名称</td>
						<td>负责人账号</td>
						<td>用戶总数</td>
						<td>到期时间</td>
						<td>空间使用量</td>
						<td>
							<Button type="primary">权限设置</Button>
							<Button type="primary" style="background-color: rgb(250, 184, 46);border: 1px solid rgb(250, 184, 46);" @click="changeWid">详情</Button>
							<Button type="error">删除</Button>
						</td>
					</tr>
					<tr>
						<td>单位名称</td>
						<td>负责人账号</td>
						<td>用戶总数</td>
						<td>到期时间</td>
						<td>空间使用量</td>
						<td>
							<Button type="primary">权限设置</Button>
							<Button type="primary" style="background-color: rgb(250, 184, 46);border: 1px solid rgb(250, 184, 46);" @click="changeWid">详情</Button>
							<Button type="error">删除</Button>
						</td>
					</tr>
					<tr>
						<td>单位名称</td>
						<td>负责人账号</td>
						<td>用戶总数</td>
						<td>到期时间</td>
						<td>空间使用量</td>
						<td>
							<Button type="primary">权限设置</Button>
							<Button type="primary" style="background-color: rgb(250, 184, 46);border: 1px solid rgb(250, 184, 46);" @click="changeWid">详情</Button>
							<Button type="error">删除</Button>
						</td>
					</tr>
					<tr>
						<td>单位名称</td>
						<td>负责人账号</td>
						<td>用戶总数</td>
						<td>到期时间</td>
						<td>空间使用量</td>
						<td>
							<Button type="primary">权限设置</Button>
							<Button type="primary" style="background-color: rgb(250, 184, 46);border: 1px solid rgb(250, 184, 46);" @click="changeWid">详情</Button>
							<Button type="error">删除</Button>
						</td>
					</tr>
					<tr>
						<td>单位名称</td>
						<td>负责人账号</td>
						<td>用戶总数</td>
						<td>到期时间</td>
						<td>空间使用量</td>
						<td>
							<Button type="primary">权限设置</Button>
							<Button type="primary" style="background-color: rgb(250, 184, 46);border: 1px solid rgb(250, 184, 46);" @click="changeWid">详情</Button>
							<Button type="error">删除</Button>
						</td>
					</tr>
					<tr>
						<td>单位名称</td>
						<td>负责人账号</td>
						<td>用戶总数</td>
						<td>到期时间</td>
						<td>空间使用量</td>
						<td>
							<Button type="primary">权限设置</Button>
							<Button type="primary" style="background-color: rgb(250, 184, 46);border: 1px solid rgb(250, 184, 46);" @click="changeWid">详情</Button>
							<Button type="error">删除</Button>
						</td>
					</tr>
					<tr>
						<td>单位名称</td>
						<td>负责人账号</td>
						<td>用戶总数</td>
						<td>到期时间</td>
						<td>空间使用量</td>
						<td>
							<Button type="primary">权限设置</Button>
							<Button type="primary" style="background-color: rgb(250, 184, 46);border: 1px solid rgb(250, 184, 46);" @click="changeWid">详情</Button>
							<Button type="error">删除</Button>
						</td>
					</tr>
				</table>
			</div>
			
			<div class="zmiti-add" :style="{'width':formW+'%'}">
				<header>新增项目</header>
				<form>
					<div class="zmiti-add-form">
						<label class="zmiti-add-name">项目名称:</label>
						<div class="zmiti-practice-input"><input type="text" /></div>
					</div>
					<div class="zmiti-add-form">
						<label>说明:</label>
						<div class="zmiti-practice-input"><textarea></textarea></div>
					</div>
					<div class="zmiti-btn">
						<Button @click="restore">返回</Button>
						<Button type="primary">确定</Button>
					</div>
				</form>
			</div>
			
		</div>
		<div>
			
		</div>
	</div>
</template>

<script>
	import './index.css';
	export default {
			data(){
				return {
					wid:100,
					formW:0
				}
			},
			methods:{
				changeWid:function(){
					this.wid = 70;
					this.formW = 28
				},
				restore:function(){
					this.wid = 100;
					this.formW = 0
				}
			}
			
	}
</script>