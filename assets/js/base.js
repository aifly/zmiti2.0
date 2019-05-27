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
	back:'./assets/images/back.png',
	checked:'./assets/images/checked.png',
	adminLoginBg:'./assets/images/adminlogin-bg.jpg',
	adminUser:'./assets/images/admin-user.png',
	adminLock:'./assets/images/admin-lock.png',
};

 


(function () {
	window.config = {
		swf: './assets/ckplayer/ckplayer.swf',
		baseUrl: 'http://newapi.zmiti.com/',
		taskSystemUrl:'http://webapi.zmiti.com/v1/',
		uploadUrl: 'http://h5.wenming.cn/wmreport/index.html#/',
		defaultPass:'123456'
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

