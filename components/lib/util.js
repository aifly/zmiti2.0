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

	getUserInfo(key = 'login'){
		
		var loginObj = {};
		try {
			loginObj = JSON.parse(localStorage.getItem(key));
		} catch (error) {
			this.clearCookie('login');
			window.location.hash = '/login';
		}

		return loginObj;
	},

	getProductList(fn, self) { //
		this.ajax({
			self,
			url: window.config.baseUrl + 'product/get_product/',
			success(data) {
				if (data.getret === 0) {
					var arr = [];
					data.productlist.map((item, i) => {

						arr.push({
							"productid": item.productid,
							"linkTo": item.producturl,
							"key": item.producturl.split('/')[1],
							"title": item.productname,
							"iconType": item.icontype,
							"type": item.producticon,
							"outline": item.outline,
						})
					});
					window.globalMenus = arr;
					fn && fn(arr);
				}
			}
		});
	},

	ajax(option){
		var opt = option.data || {};
		var userInfo = this.getUserInfo();

		if (userInfo.username && userInfo.getusersigid && !option.isLogin) {
			opt.userid = userInfo.userid;
			opt.getusersigid = userInfo.getusersigid;
		}
		var formData = new FormData();

		for(var attr in opt){
			formData.append(attr,opt[attr]);
		}

	

		let config = {
				headers: {
					'Content-Type': 'multipart/form-data' //之前说的以表单传数据的格式来传递fromdata    
				}
			};
		axios.post(option.url, formData, config).then((dt) => {
			var dt = dt.data;
			
			if(dt.getret === 0){

			}
			else if(dt.getret === 1300){
				window.localStorage['login'] = '';
				window.location.hash = '/login';
			}
			option.fn && option.fn(dt);
			option.success && option.success(dt);
		}).catch((err)=>{
			
			option.fnError && option.fnError();
			option.error && option.error();
			option._this && option._this.$Message.error('服务器开小差了，请稍后重试');
		});

		return;
		
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
				window.localStorage['login'] = '';
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
export default zmitiUtil;