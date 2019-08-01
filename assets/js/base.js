var imgs = {
	loginLogo :"./assets/images/login-logo.png",
	userLoginTitle :"./assets/images/userlogo.png",
	loginPerson :"./assets/images/login-person.png",
	loginLock :"./assets/images/login-lock.png",
	open :"./assets/images/open.png",
	search :"./assets/images/search.png",
	zmiti :"./assets/images/zmiti1.png",
	zmiti1 :"./assets/images/zmiti.jpg",
	
	loginBg:"./assets/images/login-bg.jpg",
	logout:'./assets/images/logout.png',
	move:'./assets/images/move.png',
	back:'./assets/images/back.png',
	deleted:'./assets/images/deleted.png',
	checked:'./assets/images/checked.png',
	adminLoginBg:'./assets/images/adminlogin-bg.jpg',
	adminUser:'./assets/images/admin-user.png',
	adminLock:'./assets/images/admin-lock.png',


	W0:'./assets/images/weather/W0.png',
	W1:'./assets/images/weather/W1.png',
	W2:'./assets/images/weather/W2.png',
	W3:'./assets/images/weather/W3.png',
	W4:'./assets/images/weather/W4.png',
	W5:'./assets/images/weather/W5.png',
	W6:'./assets/images/weather/W6.png',
	W7:'./assets/images/weather/W7.png',
	W8:'./assets/images/weather/W8.png',
	W9:'./assets/images/weather/W9.png',
	W10:'./assets/images/weather/W10.png',
	W13:'./assets/images/weather/W13.png',
	W14:'./assets/images/weather/W14.png',
	W15:'./assets/images/weather/W15.png',
	W16:'./assets/images/weather/W16.png',
	W17:'./assets/images/weather/W17.png',
	W18:'./assets/images/weather/W18.png',
	W19:'./assets/images/weather/W19.png',
	W20:'./assets/images/weather/W20.png',
	W29:'./assets/images/weather/W29.png',
	W30:'./assets/images/weather/W30.png',
	W31:'./assets/images/weather/W31.png',
	W32:'./assets/images/weather/W32.png',
	W33:'./assets/images/weather/W33.png',
	W34:'./assets/images/weather/W34.png',
	W35:'./assets/images/weather/W35.png',
	W36:'./assets/images/weather/W36.png',
	W44:'./assets/images/weather/W44.png',
	W45:'./assets/images/weather/W45.png',
	W46:'./assets/images/weather/W46.png',

	CHOME1:'./assets/images/cy-home1.png',
	CHOME2:'./assets/images/cy-home2.png',
	CHOME3:'./assets/images/cy-home3.png',
	CHOME4:'./assets/images/cy-home4.png',
	CHOME5:'./assets/images/cy-home5.png',
	CHOME6:'./assets/images/cy-home6.png',
	CHOME7:'./assets/images/cy-home7.png',
	CHOME8:'./assets/images/cy-home8.png'

};

(function () {
	window.config = {
		swf: './assets/ckplayer/ckplayer.swf',
		baseUrl: 'http://newapi.zmiti.com/',
		taskSystemUrl:'http://webapi.zmiti.com/v1/',
		uploadUrl: 'http://h5.wenming.cn/wmreport/index.html#/',
		defaultPass:'123456',
		host:'http://file.zmiti.com/index/files/file?p=',//配置图片访问的域名

	}
	if (window.location.href.indexOf('localhost') > -1 || window.location.href.indexOf('zmiti.com') > -1) {
		//window.config.baseUrl = "https://api.symbin.cn/v1";
	}


/* 	axios.post('http://newapi.zmiti.com:9508',{
		action:1000000,
		username:'admin',
		password:'888888'
	}).then((data)=>{
		console.log(data.data)
	});
 
 */

})();

