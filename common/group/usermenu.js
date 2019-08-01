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
	keys: ['user', 'usercheck', 'checkproduct','uncheckproduct'],
	tabs:[
		{
			name:'人员管理',
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
			name:'单位授权',
			link:"",
			children:[
				{
					name:'已授权产品',
					link:'/checkproduct'
				},{
					name:'未授权产品',
					link:'/uncheckproduct'
				}
			]
		}
	]
}

export {
	changyue,
	company
}