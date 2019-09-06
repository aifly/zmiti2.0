let changyue = {
	title: '畅阅',
	route:"changyue",
	keys:[
		'changyue',
		'changyuemysubmit',
		'changyuemycheck',
		'changyuecompany',
		'changyuedepartment',
		'changyuedepartmentuser',
		'changyuerole'
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
		},
		{
			name: '权限管理',
			link: '/changyuerole'
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
	route: "workorder",
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
	keys: ['companyinfo', 'user', 'usercheck', 'checkproduct', 'companydetail', 'order', 'consume','rolegroup'],
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
		},{
			name:"用户权限管理",
			link:'',
			children:[
				{
					name:'权限组管理',
					link:'/rolegroup'
				}
			]
		}
	]
}

let triptraffic ={
	title:"出差宝",
	route: "trip",
	keys: ['trip', 'triptraffic', 'tripnotice', 'tripreason', 'tripost','triprole'],
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
			name:"职务",
			link:'/tripost'
		
		},{
			name:"权限管理",
			link:'/triprole'
		}
	]
}

let infomanager ={
	title:"信息管理",
	route: "infomanager",
	keys: ['infomanager','infomanagermsg','infomanagermsgdetail','infomanagerlist','infomanagerlistdetail','infomanagernotice','infomanagerbox','infomanagerboxdetail','infomanagerboxcomment','infomanagernews','infomanagernewsdetail','infomanagerdoc','infomanagersetting'],
	tabs: [
		{
			name:"消息",
			link:'/infomanagermsg'
		},
		{
			name:'公告',
			link:'/infomanagerlist'
		},
		{
			name:'通知',
			link:'/infomanagernotice'
		},
		{
			name:'意见箱',
			link:'/infomanagerbox'
		},
		{
			name:'新闻',
			link:'/infomanagernews'
		},
		{
			name:'资料',
			link:'/infomanagerdoc'
		},
		{
			name:"配置管理",
			link:'/infomanager',
			children:[
				{
					name:'栏目配置',
					link:'/infomanager'
				},
				{
					name:'权限配置',
					link:'/infomanagersetting'
				},
				
			]
		},
	]
}

let voteManager={
	title: "投票管理",
	route: "votemanager",
	keys: ['votemanager','votemanagerview','votemanagerviewquestion'],
	tabs:[
		{
			name:'投票管理',
			link:'/votemanager'
		}
	]
}

let orderFood ={
	title: "订餐管理",
	route: "orderfood",
	keys: ['orderfood', 'orderfoodsubmit','orderfoodrole'],
	tabs:[
		{
			name: '订餐预览表',
			link: '/orderfood'
		},
		{
			name:'用户订餐',
			link:'/orderfoodsubmit'
		},
		{
			name: '权限管理',
			link: '/orderfoodrole'
		},
		
	]
}

let meetingRoom = {
	title: "会议室预定",
	keys: ['meetingroom', 'meetingroomsetting'],
	route: "meetingroom",
	tabs:[
		{
			name: '会议室预定',
			link: "/meetingroom"
		}, {
			name: '会议室设置',
			link: "/meetingroomsetting"
		}
	]
}
let  Party = {
	title:"活动管理",
	route: "party",
	keys: ['party', 'partydetail', 'partyexport','partyrole'],
	tabs:[
		{
			name:'活动列表',
			link:"/party"
		},
		{
			name:'活动权限设置',
			link:"/partyrole"
		}
	]
}
let Inquire = {
	title:"问卷调差",
	route: "inquire",
	keys: ['inquire', 'inquiredetail','inquiresetting'],
	tabs:[
		{
			name:'问卷调查',
			link:"/inquire"
		},{
			name: "配置管理",
			link: '/inquiresetting',
			children: [{
				name: '权限配置',
				link: '/inquiresetting'
			}]
		},
	]
};

export {
	changyue,
	company,
	workorder_workorderlist,
	triptraffic,
	infomanager,
	orderFood,
	meetingRoom,
	Party,
	voteManager,
	Inquire
}