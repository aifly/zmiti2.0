import zmitiActions from '../action';


var zmitiUtil = {
	userActions: zmitiActions.userActions,
	adminActions: zmitiActions.adminActions,
	companyActions: zmitiActions.companyActions,
	resourceActions: zmitiActions.resourceActions,
	basicConfigActions: zmitiActions.basicConfigActions,
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
			//window.location.reload();
			window.location.hash = 'login';
			if (window.location.hash!='#/login'){
				//window.location.reload();
			}
		}

		return loginObj;
	},

	getAdminUserInfo(){
		return this.getUserInfo('adminlogin');
	},
	formatDate(time = +new Date()) {
		var date = new Date(time*1000 + 8 * 3600 * 1000); // 增加8小时
		return date.toJSON().substr(0, 19).replace('T', ' ');
	},
	getProductListByAdmin(){
		
	},
	getProductList(fn) { //

		this.ajax({
			remark:'getProductList',
			data:{
				action: zmitiActions.userActions.getProductList.action,
				condition:{
					page_index:0,
					page_size:20,
				}
			},
			success(data){
				fn && fn(data);
			}
		})
		 
	},

	adminAjax(option = {}){
		option.isAdmin = true;
		this.ajax(option,()=>{
			if(window.location.hash === '#/login'){
				setTimeout(() => {
					window.location.reload();
				}, 10);
			}
			window.location.hash = 'login';
			window.location.reload();
			
		});
	},

	createViewData(h5id){
		axios.post('http://newapi.zmiti.com:50293/api/viewdata', JSON.stringify({ h5id, appsecret: 'c9GxtUre3kOJCgvp' })).then(data => {
			console.log(data.data);
		})
	},

	ajax(option,adminErrorFn){

		
		var opt = option.data || {};
		var userInfo = this.getUserInfo(option.isAdmin? 'adminlogin':'login');
		
		if (userInfo && userInfo.ui) {
			opt.ui = userInfo.ui;
		}
		
 
		axios.post(window.config.baseUrl + '?name=' + (option.remark || '').toLowerCase(), JSON.stringify(opt)).then((dt) => {
			var dt = dt.data;
			if (dt.getret === 0){
				
			}
			else if (dt.getret === 9997 || dt.getret === 9996){
				window.localStorage[option.isAdmin ? 'adminlogin' : 'login'] = '';
				if (option.isAdmin) {
					adminErrorFn && adminErrorFn();
				}else{
					window.location.hash = '/login';
					setTimeout(() => {
						window.location.reload();
					}, 10);
				}

			}
			option.fn && option.fn(dt);
			option.success && option.success(dt);
		}).catch((err)=>{
			
			option.fnError && option.fnError();
			option.error && option.error();
			option._this && option._this.$Message.error('服务器开小差了，请稍后重试');
		});

		return;
		
	}




}
export default zmitiUtil;