var imgs = {
	loginLogo :"./assets/images/login-logo.png",
	userLoginTitle :"./assets/images/userlogo.png",
	loginPerson :"./assets/images/login-person.png",
	loginLock :"./assets/images/login-lock.png",
	open :"./assets/images/open.png",
	search :"./assets/images/search.png",
	zmiti :"./assets/images/zmiti.jpg",
	loginBg:"./assets/images/login-bg.jpg",
	logout:'./assets/images/logout.png',
	checked:'./assets/images/checked.png',

	


};

/* Date.prototype.Format = function (fmt) { //author: meizz 
	var o = {
		"M+": this.getMonthgetMonth() + 1, //月份 
		"d+": this.getDate(), //日 
		"h+": this.getHours(), //小时 
		"m+": this.getMinutes(), //分 
		"s+": this.getSeconds(), //秒 
		"q+": Math.floor((this.getMonth() + 3) / 3), //季度 
		"S": this.getMilliseconds() //毫秒 
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
		if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
 */


var imgExtensions = 'gif,jpg,jpeg,bmp,png,tiff,tif'.split(','),
	videoExtensions = 'mp4,webm,mov,ogg,aac,wma,vnd.dlna.adts,mp3'.split(','),
	textExtensions = ' xlsx, pdf, doc, ppt, xlsx, doc, docx, pdf, txt, ppt, pptx, xls, rar, css, scss,vb, zip'.split(',');
(function () {
	var allExtensions = imgExtensions.concat(videoExtensions).concat(textExtensions);
	window.config = {
		swf: './assets/ckplayer/ckplayer.swf',
		baseUrl: 'https://api.zmiti.com/v2/',
		uploadUrl: 'http://h5.wenming.cn/wmreport/index.html#/',
		isRequestLocal:false,//下载页面是否请求本地的json文件。
		"图片-zmiti":"./assets/js/img.json",
		"视频-zmiti":"./assets/js/video.json",
		"音频-zmiti":"./assets/js/audio.json",
		"动漫-zmiti":"./assets/js/dongman.json",
		"h5-zmiti":"./assets/js/h5.json",
		downloadConfig:{
			"1":{
				p1: "wmpublicadupload",
				p2:'2018'
			},
			"2": {
				p1: "wmpublicadupload1",
				p2: '2018'
			}
		},
		adminDownloadConfig:{
			"1":{
				p1: "public",
				p2:'downloads',
				p3:'zip'
			},
			"2": {
				p1: "public",
				p2:'downloads',
				p3:'zip'
			}
		},
		
		accepts: [{
			id: 0,
			name: '图片',
			type: 'Image',
			extensions: imgExtensions.join(',')
		}, {
			id: 1,
			name: '视频',
			type:'video',
			extensions: videoExtensions.join(',')
		}, {
			id: 2,
			name: '文本',
			type:'text',
			extensions: textExtensions.join(',')
		}, {
			id: 3,
			name: '全部',
			type:'all',
			extensions: allExtensions.join(',')
		}]
	}

	if (window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('zmiti.com') > -1) {
		//window.config.baseUrl = "https://api.symbin.cn/v1";
	}

})();


