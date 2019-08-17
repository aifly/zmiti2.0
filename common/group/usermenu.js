let changyue = {
	title: '畅阅',
	keys:[
		'changyue',
		'changyuemysubmit',
		'changyuemycheck',
		'changyuecompany',
		'changyuedepartment',
		'changyuedepartmentuser',
	],
	tabs: [
		{
			name: "概述",
			link: '/changyue'
		}, {
			name: "我的提交",
			link: '/changyuemysubmit'
		}, {
			name: '我的审核',
			link: '/changyuemycheck'
		},{
			name:"产品设置",
			link:'/changyuecompany',
			children:[
				{
					name:'角色管理',
					link:'/changyuedepartment'
				},
				
			]
		}
	]
}

let workorder_workorderlist = {
	title: "工单管理",
	keys:[
		'workorder',
		'workorderlist'
	],
	tabs: [
		{
			name: '提交工单',
			link: '/workorder'
		}, {
			name: '工单列表',
			link: '/workorderlist'
		}
	]
};


let company = {
	title:"单位管理",
	keys: ['companyinfo', 'user', 'usercheck', 'checkproduct','companydetail','order','consume'],
	tabs:[
		{
			name:'概览',
			link:"/companyinfo"
		},
		{
			name:'单位人员管理',
			link:'',
			children:[
				{
					name:'用户列表',
					link:'/user'
				},{
					name:'用户审核',
					link:'/usercheck'
				}
			]

		},
		{
			name:'单位信息管理',
			link:"",
			children:[
				{
					name: '单位详情',
					link: '/companydetail'
				},
				{
					name:'授权管理',
					link:'/checkproduct'
				},
				{
					name: '订单管理',
					link: '/order'
				},
				{
					name: '消费管理',
					link: '/consume'
				}
			]
		}
	]
}

let triptraffic ={
	title:"出差宝",
	keys: ['trip', 'triptraffic', 'tripnotice', 'tripreason','tripost'],
	tabs: [
		{
			name:'交通工具',
			link:'/triptraffic'
		},
		{
			name: '差旅费',
			link: "/trip"
		},
		{
			name:'出差事由',
			link:'/tripreason'
		},{
			name:"注意事项",
			link:'/tripnotice'
		},{
			name:"职位",
			link:'/tripost'
		}
	]
}

export {
	changyue,
	company,
	workorder_workorderlist,
	triptraffic
}