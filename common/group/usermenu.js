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
			name: "首页",
			link: '/changyue'
		}, {
			name: "我的提交",
			link: '/changyuemysubmit'
		}, {
			name: '我的审核',
			link: '/changyuemycheck'
		},{
			name:"单位管理",
			link:'/changyuecompany',
			children:[
				{
					name:'部门管理',
					link:'/changyuedepartment'
				},
				{
					name: '人员管理',
					link: '/user'
				}
			]
		}
	]
}

let company = {
	title:"单位管理",
	keys: ['companyinfo', 'user', 'usercheck', 'checkproduct','order','consume'],
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

export {
	changyue,
	company
}