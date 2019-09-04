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
	success:'./assets/images/success.png',
	defaultImg:'./assets/images/default-img.png',


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
	CLIENT1:'./assets/images/client/view-a0.png',
	CLIENT2:'./assets/images/client/view-a1.png',
	CLIENT3:'./assets/images/client/view-a2.png',
	CLIENT4:'./assets/images/client/view-a3.png',
	CLIENT5:'./assets/images/client/view-b1.png',
	CLIENT6:'./assets/images/client/view-b2.png',
	CLIENT7:'./assets/images/client/view-b3.png',
	CLIENT8:'./assets/images/client/view-b4.png',
	CLIENT9:'./assets/images/client/view-c1.png',
	CLIENT10:'./assets/images/client/view-c2.png',
	CLIENT11:'./assets/images/client/view-c3.png',
	CLIENT12:'./assets/images/client/view-t1.png',
	CLIENT13:'./assets/images/client/view-t2.png',
	CLIENT14:'./assets/images/client/cy-home2.png',
	CLIENT15:'./assets/images/client/view-a4.png',
	CLIENT16:'./assets/images/client/cy-home1.png',
	CLIENT17:'./assets/images/client/cy-home8.png',
	CLIENT18:'./assets/images/client/cy-home7.png',
	CLIENT19:'./assets/images/client/view-b2.jpg',
	CHECK0:'./assets/images/client/static-a0.png',
	CHECK1:'./assets/images/client/static-a1.png',
	CHECK2:'./assets/images/client/static-a2.png',
	CHECKb0:'./assets/images/client/static-b0.png',
	loginU1:'./assets/images/login-a1.png',
	loginU2:'./assets/images/login-a2.png',
	loginU3:'./assets/images/login-a3.png',
	loginU4:'./assets/images/login-a4.png',
	loginU5:'./assets/images/login-a5.png',
	loginU6:'./assets/images/login-a6.png',
	mobileSkin:'./assets/images/phone-bg.png',
	wxHeader:'./assets/images/wx-header.png',

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

