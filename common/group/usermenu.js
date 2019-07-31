let changyue_changyuemysubmit_changyuemycheck_changyuecompany = {
	title: '畅阅',
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
					link:'/department'
				},
				{
					name: '人员管理',
					link: '/department'
				}
			]
		}
	]
}

export {
	changyue_changyuemysubmit_changyuemycheck_changyuecompany
}