<template>
	<div class="wm-download-mask-ui" v-if='isdownloading'>
		<div class='wm-download-loading' >
			<header>
				<div>下载提示</div>
				<div @click="hideDownloadTip"><Icon type="md-close" /></div>
			</header>
			<div  class='wm-download-tip'>
				<div>
					<img :src="imgs.createzip" alt="">
				</div>
				<div>
					<div>您所下载的文件正在打包中，为了不影响您浏览，</div>
					<div>请在 <a href="javascript:void(0)">我的下载</a> 中查看</div>
				</div>
			</div>

			<div class="wm-download-btn" @click="hideDownloadTip">我知道了</div>
		</div>
	</div>
</template>

<script>

	///下载提示框
	import './download.css';
	export default {
		name:"",
		props:['isdownloading','hideDownloadTip'],
		data(){
			return {
				imgs:window.imgs,
			}
		},
		mounted(){
		},
		methods:{

		}
	}
</script>