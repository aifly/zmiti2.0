var workOrderType = {
		0:'财务类',
		1:"会员账号",
		2:"定制服务类",
		3:"产品技术类",
		4:"其它类"
	};



let  orderStatus = {
	0: {
		status: '已禁用'
	},
	1:{
		status:'已受理'
	},
	2:{
		status:'已处理'
	},
	3:{
		status:'已确认'
	},
	4:{
		status:'已评价'
	}
};
let resourceClass = [//资源分类
	{
		name:"全部",
		type:-1,
	},{
		name:'图片',
		type:0
	},{
		name:'视频',
		type:1
	},{
		name:'音频',
		type:2
	},
	{
		name:'文本',
		type:3
	}
];
let defaultClass = (id=3)=> [ //资源库默认分类
	{
		name:'系统',
		icon:'&#xe611;',
		id:1
	},
	{
		name:'单位',
		icon:'&#xe612;',
		id:2
	},{
		name:"个人",
		icon:'&#xe613;',
		id,
		cateList:resourceClass.concat([])
	}
];

let defaultExtNames = {
	pdf:'&#xe665;',

	xls:'&#xe614;',
	xlsx: '&#xe614;',
	
	mp3:'&#xe7df;',
	ogg:'&#xe7df;',
	m4a:'&#xe7df;',
	
	doc:'&#xe63c;',
	docx:'&#xe63c;',
	
	mp4:'&#xe601;',
	webm:'&#xe601;',
	mov:'&#xe601;',
	flv:'&#xe601;',

	other:'&#xe606;'

}
let manuscriptStatus = [
	{
		name: '待审核',
		icon:'&#xe6bc;',
		color:"#fbec00"
	},
	{
		name: '审核通过',
		icon: '&#xe61b;',
		color: "#45b203"
	},{
		name: '拒绝',
		icon: '&#xe61e;',
		color: "#ff4664"
	}, {
		name: '暂缓',
		icon:'&#xe61f;',
		color: "#ffce01"
	}

];

let timeRange = [
	'08:00',
	'08:30',
	'09:00',
	'09:30',
	'10:00',
	'10:30',
	'11:00',
	'11:30',
	'12:00',
	'12:30',
	'13:00',
	'13:30',
	'14:00',
	'14:30',
	'15:00',
	'15:30',
	'16:00',
	'16:30',
	'17:00',
	'17:30',
	'18:00',
	'18:30',
	'19:00',
	'19:30',
	'20:00',
	'20:30',

];



//配置哪些页面不需要通过权限判断
let defaultRolePages = [
	'resourcelist',
	'workorder',
	'workorderlist',
	'home'
	
]


 export {
	defaultRolePages,
	workOrderType,
	orderStatus,
	defaultClass,
	defaultExtNames,
	manuscriptStatus,
	timeRange
};