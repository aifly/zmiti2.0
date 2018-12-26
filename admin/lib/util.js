var symbinUtil = {
	
	getQueryString: function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	},
	changeURLPar: function(url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	},

	getUserInfo(key = 'adminlogin') {
		var loginObj = {};
		try {
			loginObj = JSON.parse(localStorage.getItem(key));;

		} catch (error) {
			this.clearCookie('adminlogin');
			window.location.hash = '/login';
		}

		return loginObj;
	},

 

	ajax(option){
		var opt = option.data || {};
	
		if(option.validate){
			opt.username = option.validate.username;
			opt.usertoken = option.validate.usertoken;
		}
		
		$.ajax({
			url:option.url,
			type:option.type || 'post',
			data:opt,
			error(){
				option.fnError && option.fnError();
				option.error && option.error();

				option._this && option._this.$Message.error('服务器开小差了，请稍后重试');

			}
		}).done((dt)=>{
			if (dt.getret === 1000) {
				window.localStorage['adminogin'] = '';
				window.location.hash = '/login';
			} else {}
			option.fn && option.fn(dt);
			option.success && option.success(dt);
		})
	},
	setCookie(cname, cvalue, exdays){
       var d = new Date();  
        d.setTime(d.getTime() + (exdays*24*60*60*1000));  
        var expires = "expires="+d.toUTCString();  
        document.cookie = cname + "=" + cvalue + "; " + expires;  
    },
    clearCookie(name){
        this.setCookie(name, "", -1); 
    },
    getCookie(cname) {
		var name = cname + "=";
		var ca = document.cookie.split(';');
		for (var i = 0; i < ca.length; i++) {
			var c = ca[i];
			while (c.charAt(0) == ' ') c = c.substring(1);
			if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
		}
		return "";
	}




}
export default symbinUtil;