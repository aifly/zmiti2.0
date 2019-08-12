
var user_company = {
	title: '用户单位',
	keys:[
		'user',
		'company'
	],
	tabs: [
		{
			name: '用户单位',
			link: '/',
			status: true,
			children: [
				{
					name: '用户管理',
					link: '/user'

				},
				{
					name: '单位管理',
					link: '/company'
				}
			]
		}
	]
};

var basicconfig_admin_rolegroup_setrole_pv_form = {
	title: "系统管理",
	keys:[
		'basicconfig',
		'admin',
		'role',
		'rolegroup',
		'setrole',
		'pv',
		'form'
	],
	tabs:
	 [
		{
			name: '基础配置',
			link: '/basicconfig'
		},
		{
			name: '管理员管理',
			link: '/admin'
		}, 
		{
			name: '权限管理',
			link: '/role',
			children: [
				{
					name: '权限组管理',
					link: '/rolegroup'
				}, {
					name: '权限分配',
					link: '/setrole'
				}
			]
		}, 
		{
			name: "简易统计",
			link: '/',
			children: [
				{
					name: '浏览量统计',
					link: '/pv'
				},
				{
					name: '简易表单',
					link: '/form'
				}
			]
		}
	]
};

let workorder_workorderlist = {
	title: "工单处理",
	keys:[
		'workorderlist',
		'unworkorder',
		'doneworkorder'
	],
	tabs: [
		{
			name: '待处理工单',
			link: '/unworkorder'
		}, {
			name: '已结束工单',
			link: '/doneworkorder'
		}, {
			name: '工单列表',
			link: '/workorderlist'
		}
	]
};

let adminchangyue_adminchangyuesetting_adminchangyuelog = {
	title: '畅阅',
	keys: ['adminchangyue','adminchangyuesetting','adminchangyuelog'],
	tabs: [
		{
			name: "首页",
			link: '/adminchangyue'
		}, {
			name: "CMS配置",
			link: '/adminchangyuesetting'
		}, {
			name: '操作日志',
			link: '/adminchangyuelog'
		}
	]
}

let product_productrole = {
	title: "产品管理",
	keys: ['product','productrole'],
	tabs: [
		{
			name: "产品列表",
			link: '/product'
		}, {
			name: '产品授权',
			link: '/productrole'
		}
	]
};

export {
	user_company,
	basicconfig_admin_rolegroup_setrole_pv_form,
	workorder_workorderlist,
	adminchangyue_adminchangyuesetting_adminchangyuelog,
	product_productrole
}