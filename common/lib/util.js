import zmitiActions from '../action.js';


var zmitiUtil = {
	userActions: zmitiActions.userActions,
	adminActions: zmitiActions.adminActions,
	companyActions: zmitiActions.companyActions,
	resourceActions: zmitiActions.resourceActions,
	basicConfigActions: zmitiActions.basicConfigActions,
	weatherActions: zmitiActions.weatherActions,
	cityActions: zmitiActions.cityActions,
	changYueAcions: zmitiActions.changYueAcions,
	companyAdminActions: zmitiActions.companyAdminActions,

	dataToNumber(date){
		return new Date(date).getTime() / 1000
	},

	formatDate(inputTime,flag = false){
		var date = new Date(inputTime * 1000);
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? ('0' + m) : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		var h = date.getHours();
		h = h < 10 ? ('0' + h) : h;
		var minute = date.getMinutes();
		var second = date.getSeconds();
		minute = minute < 10 ? ('0' + minute) : minute;
		second = second < 10 ? ('0' + second) : second;
		if(flag){
			return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
		}
		return y + '-' + m + '-' + d ;
	},

	getQueryString: function (name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return (r[2]);
		return null;
	},
	changeURLPar: function (url, arg, val) {
		var pattern = arg + '=([^&]*)';
		var replaceText = arg + '=' + val;
		return url.match(pattern) ? url.replace(eval('/(' + arg + '=)([^&]*)/gi'), replaceText) : (url.match('[\?]') ? url + '&' + replaceText : url + '?' + replaceText);
	},
	downloadFile(fileid){


		window.location.href = 'http://file.zmiti.com/index/files/download?fileid=' + fileid;

		
	},
	getUserInfo(key = 'login') {

		var loginObj = {};
		try {
			loginObj = JSON.parse(localStorage.getItem(key));
		} catch (error) {
			//window.location.reload();
			window.location.hash = 'login';
			if (window.location.hash != '#/login') {
				//window.location.reload();
			}
		}

		return loginObj;
	},

	getAdminUserInfo() {
		return this.getUserInfo('adminlogin');
	},
	formatDate(time = +new Date()) {
		var date = new Date(time * 1000 + 8 * 3600 * 1000); // 增加8小时
		return date.toJSON().substr(0, 19).replace('T', ' ');
	},
	getProductListByAdmin(opt={}) {

		var data = Object.assign({
			action: this.companyActions.getCompanyList.action
		},opt);
		this.adminAjax({
			remark:"getProductListByAdmin",
			data,
			success(data){
				opt.success && opt.success(data);
			}
		})
	},
	getCurrentCompanyId(){
		return window.localStorage.getItem('currnetCompanyId');
	},
	getProductList(fn) { //
		var companyid = this.getCurrentCompanyId();
		if (!companyid){
			window.localStorage.clear();
			window.location.hash = '/login';
			return;
		}
		this.ajax({
			remark: 'getProductList',
			data: {
				action: zmitiActions.userActions.getProductList.action,
				condition: {
					companyid,
					page_index: 0,
					page_size: 20,
				}
			},
			success(data) {
				fn && fn(data);
			}
		})

	},

	adminAjax(option = {}) {
		option.isAdmin = true;
		this.ajax(option, () => {
			if (window.location.hash === '#/login') {
				setTimeout(() => {
					window.location.reload();
				}, 10);
			}
			window.location.hash = 'login';
			window.location.reload();

		});
	},

	createViewData(h5id) {
		axios.post('http://newapi.zmiti.com:50293/api/viewdata', JSON.stringify({ h5id, appsecret: 'c9GxtUre3kOJCgvp' })).then(data => {
			console.log(data.data);
		})
	},

	baseUpload(option) {
		var opt = option.data || {};
		axios.post('http://file.zmiti.com/index/upload/upload_file', (opt)).then((dt) => {
			var dt = dt.data;
			if (dt.getret === 0) {

			}
			else if (dt.getret === 9997 || dt.getret === 9996) {
				window.localStorage[option.isAdmin ? 'adminlogin' : 'login'] = '';
				if (option.isAdmin) {
					adminErrorFn && adminErrorFn();
				} else {
					window.location.hash = '/login';
					setTimeout(() => {
						window.location.reload();
					}, 10);
				}

			}
			option.fn && option.fn(dt);
			option.success && option.success(dt);
		}).catch((err) => {

			option.fnError && option.fnError();
			option.error && option.error();
			option._this && option._this.$Message.error('服务器开小差了，请稍后重试');
		});
	},

	ajax(option, adminErrorFn) {


		var opt = option.data || {};
		var _ui = option._ui || {};
		var userInfo = this.getUserInfo(option.isAdmin ? 'adminlogin' : 'login');

		if (userInfo && userInfo.ui) {
			opt.ui = Object.assign(userInfo.ui, _ui);
		}


		axios.post(window.config.baseUrl + '?name=' + (option.remark || '').toLowerCase(), JSON.stringify(opt)).then((dt) => {
			var dt = dt.data;


			if (dt.getret === 0) {

			}
			else if (dt.getret === 9997 || dt.getret === 9996) {

				window.localStorage[option.isAdmin ? 'adminlogin' : 'login'] = '';
				if (option.isAdmin) {
					adminErrorFn && adminErrorFn();
				} else {
					window.location.hash = '/login';
					setTimeout(() => {
						window.location.reload();
					}, 10);
				}

			}
			option.fn && option.fn(dt);
			option.success && option.success(dt);
		}).catch((err) => {

			option.fnError && option.fnError();
			option.error && option.error();
			option._this && option._this.$Message.error('服务器开小差了，请稍后重试');
		});

		return;

	}




}
export default zmitiUtil;