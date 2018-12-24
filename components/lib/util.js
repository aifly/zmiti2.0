import sysbinVerification from './verification';

import $ from 'jquery';
var zmitiUtil = {
	
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
	ajax(option){
		var opt = option.data || {};
		var validateData = sysbinVerification.validate(this);
		if (!option.isLogin){
			if (!option.validate ) {
				opt.username = validateData.adminusername;
				opt.userpwd = validateData.admintoken;
			}
			else{
				opt.username = option.validate.adminusername;
				opt.admintoken = option.validate.admintoken;
			}
		}
		let formData = new FormData();
		for(var attr in opt){
			formData.append(attr, opt[attr]);
		}
		const instance = axios.create({
		withCredentials: true
		})
		instance.post(option.url, formData, {
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			}
		}).then((dt) => {
			if (dt.getret === 1000) {
				this.clearCookie('login');
				window.location.hash = '/login';
			} else {

			}
			option.fn && option.fn(dt);
			option.success && option.success(dt);
		}).catch(function (error) {
			option.fnError && option.fnError();
		});
		return;/* 
		$.ajax({
			url:option.url,
			type:option.type || 'post',
			data:opt,
			error(){
				option.fnError && option.fnError();
			}
		}).done((dt)=>{
			if(dt.getret === 1300){
				this.clearCookie('login');
				window.location.hash = '/login';
			}else{
			}
			option.fn && option.fn(dt);
			option.success && option.success(dt);
		}) */
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
export default zmitiUtil;