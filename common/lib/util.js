import zmitiActions from '../action.js';
import   './qrcode';
import Vue from 'vue';


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
	tripActions: zmitiActions.tripActions,
	newsActions: zmitiActions.newsActions,
	infomanagerActions: zmitiActions.infomanagerActions,
	orderFoodActions: zmitiActions.orderFoodActions,
	partyActions: zmitiActions.partyActions,
	voteActions:zmitiActions.voteActions,
	mettingroomActions: zmitiActions.mettingroomActions,
	inquireActions: zmitiActions.inquireActions,
	dutyActions: zmitiActions.dutyActions,
	departmentAction: zmitiActions.departmentAction,
	createQrCode(container, url,size=150) {
		//实例化
		var qrcode = new QRCode(
			//二维码存放的div
			container, {
				width: size, //设置宽高
				height: size
			}
		);
		//根据input框的值生成二维码
		qrcode.makeCode(url);
	},

	dataToNumber(date,ms=1000){
		return new Date(date).getTime() / ms
	},


	randomString(len) {
		var len = len || 32;
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
		var maxPos = $chars.length;
		var pwd = '';
		for (var i = 0; i < len; i++) {
			pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return pwd;
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
			loginObj = JSON.parse(localStorage.getItem(key)) || {};
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
	heart(){
		if (!this.getUserInfo() || !this.getUserInfo().ui){
			return;
		}

		var { userid, token } = this.getUserInfo().ui;
		var { socket} = this;
		if (!socket){
			return;
		}
		setTimeout(() => {
			var json = JSON.stringify({ action: 500, ui: { userid: userid, token: token } })			
			socket.send(json);
		}, 10*1000);
	},

	getTempToken(token){
		if (!this.socket){
			this.socket = new WebSocket("ws://newapi.zmiti.com:50294");
			var { socket } = this;
			this.socket.onopen = function () {
				
				var json = JSON.stringify({ action: zmitiActions.userActions.getTempToken.action, client_token: token });
				
				socket.send(json);
			};
			
			this.heart();
			this.socket.onclose = this.socket.onerror = ()=>{
				this.socket = null;
			}
			this.socket.onmessage = (evt) => {
				
				var data = JSON.parse(evt.data);
				//console.log(data,'===');
				
				switch (data.action) {
					case 0:
					case 9995:
						//提示并退出
						break;
					case 90000001://授权成功。
						if(data.getret === 0){
						}
						Vue.obserable.trigger({
							type: 'closeQrcodePage'
						});
						break;
					case 90000002:
						Vue.obserable.trigger({
							type: 'loginSuccess',
							data
						});
						break;
					case 500:
						this.heart();
						break;
					default:
						break;
				}
			};
		}else{
		}
		
	},

	listener(uid, tk) {


		if (!this.getUserInfo()){
			return;
		}
		var { userid, token } = this.getUserInfo().ui||{};

		if (!userid || !token) {
		  return;
		}
		
		if (this.socket) {
			return;
		}

		var socket = new WebSocket("ws://newapi.zmiti.com:50294");

		socket.onopen = function () {
			var json = JSON.stringify({ type:3,action: 10000000, ui: { userid: userid, token: token } })
			socket.send(json);
		};

		this.socket = socket;
		this.heart();

		this.socket.onclose = this.socket.onerror = () => {
			this.socket = null;
		}


		socket.onmessage = (evt) => {
			var data = JSON.parse(evt.data);
			console.log(data,'..msg..')
			if (data.getret === 0) {

				switch (data.action) {
					case 0:
					case 9995:
						
						break;
					case 90000001:
						Vue.obserable.trigger({
							type: 'closeQrcodePage'
						});
						break;
					case 90000002:
						break;
					case 500:
						this.heart();
						break;
					default:
						break;
				}
			}
			if (data.getret === 9995 || data.getret === 9994) {
				Vue.obserable.trigger({
					type: 'loginError'
				});
			}
		};

	},

	getAdminUserInfo() {
		return this.getUserInfo('adminlogin');
	},
	formatDate(time = +new Date(),ms=1000) {
		var date = new Date(time * ms  + 8 * 3600 * 1000); // 增加8小时
		return date.toJSON().substr(0, 10).replace('T', ' ');
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

		try {
			var company = JSON.parse(window.localStorage.getItem('currentCompany'))
			return company ||{};
		}
		catch (e) {
			return {};
		}
	},
	isCompanyLeader(){
		if(!window.isAdmin){
			return this.getCurrentCompanyId().islead;
		}
		return 0;
	},
	getProductList(fn) { //
		var companyid = this.getCurrentCompanyId();
		if (!companyid || !companyid.companyid){
			//window.localStorage.clear();
			//window.location.hash = '/login';
			return;
		}
		this.productList = this.productList || [];
		var s = this;
		if(this.productList.length>0){
			fn &&fn({
				getret:0,
				msg:'',
				list:this.productList
			})
		}else{

			
			this.ajax({
				remark: 'getProductList',
				data: {
					action: zmitiActions.userActions.getProductList.action,
					condition: {
						companyid: companyid.companyid,
						page_index: 0,
						page_size: 20,
					}
				},
				success(data) {
					fn && fn(data);
					if(data.getret === 0){
						s.productList = data.list;
					}
				}
			})
		}

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
			//console.log(data.data);
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
					window.localStorage.clear();
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