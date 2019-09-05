
let adminActions = {
	//管理员模块
	adminlogin: {
		desc: '管理员登录',
		action: '1000000'
	},
	getAdminList: {
		desc: '获取管理员列表',
		action: '1000100'
	},
	addAdminUser: {
		desc: '管理员添加管理员',
		action: '1000101'
	}, 
	editAdminUser: {
		desc: '管理员编辑',
		action: '1000102'
	},
	initUserPass:{
		desc:'修改用户密码',
		action:'1000804'
	},
	delAdmin: {
		desc: '管理员删除',
		action: '1000103'
	},
	modifyAdminPassword: {
		desc: '修改管理员密码',
		action: '1000104'
	},
	modifyAdminSelfPassword: {
		desc: '管理员自助修改密码',
		action: '1000105'
	},
	
	checkAdminUserName:{
		desc:"管理员检测用户名是否存在",
		action:'1000106'
	},
	getGroupList:{
		desc:"管理员组列表",
		action:'1000200'
	},
	addGroup:{
		desc:"添加管理员组",
		action:'1000201'
	},
	editGroup: {
		desc: "编辑管理员组",
		action: '1000202'
	},
	delGroup: {
		desc: "删除管理员组",
		action: '1000203'
	},
	getAdminGroupSipleList:{
		desc:'管理员组列表（简要信息，不参与权限验证）',
		action:'1000204'
	},
	getProductList: {
		desc: "获取产品列表",
		action: '1000300'
	},
	delProduct:{
		desc:"管理员删除产品",
		action:'1000303'
	},
	addProduct: {
		desc: "管理员添加产品",
		action: '1000301'
	}, 
	editProduct: {
		desc: "管理员修改产品",
		action: '1000302'
	},
	getUserWorkOrderList:{
		desc:'管理员查看工单列表',
		action:'1000111'
	},
	userReadWorkOrder:{
		desc:"管理员查看工单",
		action:'1000113'
	},
	replayWorkOrder:{
		desc:"管理员回复工单",
		action:'1000112'
	},
	getProductPowerList:{
		desc:"获取产品授权列表",
		action:'1000314'
	},
	delProductPower:{
		desc:"删除产品授权",
		action:'1000313'
	},
	addProductPower: {
		desc: "添加产品授权",
		action: '1000311'
	},
	editProductPower: {
		desc: "修改产品授权",
		action: '1000312'
	},
	addCMS:{
		desc:"添加CMS",
		action:'1001900'
	},
	delCMS:{
		desc:'删除CMS',
		action:'1001901'
	},
	editCMS: {
		desc: '编辑CMS',
		action: '1001902'
	},
	getCMSList:{
		desc:'获取CMS列表',
		action:'1001903'
	},
	getCompanyByProduct:{
		desc:'获取使用产品的单位列表',
		action:'1000304'
	}
	
}

let companyActions = {//用户单位模块
	getCompanyList: {
		desc: '单位列表',
		action: '1000700'
	},
	editCompany: {
		desc: '编辑单位',
		action: '1000702'
	},
	addCompany: {
		desc: '添加单位',
		action: '1000701'
	},
	delCompany: {
		desc: '删除单位',
		action: '1000703'
	},
	modifyCompanyStatus: {
		desc: '单位状态修改',
		action: '1000705'
	},
	getCompanyListWithoutAuth: {
		desc: "单位列表(简要信息，不参与权限验证)",
		action: '1000706'
	},
	addUser:{
		desc:'添加用户',
		action:'1000801',
	},
	getUserList:{
		desc:'获取用户列表',
		action:'1000800'
	},
	editUser:{
		desc:'编辑用户',
		action:'1000802'
	},
	delUser:{
		desc:'删除用户',
		action:"1000803"
	},
	modifyUserStatus:{
		desc:'修改用户状态',
		action: '1000805'
	},
	checkUserName:{
		desc:"用户检测用户名",
		action:"1000806"
	},
	checkUserEmail:{
		desc:'用户检测邮箱',
		action:'1000807'
	},
	checkUserMobile:{
		desc:'用户检测手机号',
		action:'1000808'
	},
	joinCompany:{
		desc:'用户加入单位',
		action:'1000809'
	},
	exitCompany: {
		desc: '用户退出单位',
		action: '1000810'
	},
	getUserListByCompanyId:{
		desc:"单位获取用户列表",
		action:'1000708'
	},
	getJoinedCompany:{
		desc:'用户获取已加入单位',
		action:'1000811'
	},
	changeCompanyAdmin:{
		desc:'单位变更管理员',
		action:'1000709'
	},
	
	

}

let newsActions = {
	addNews:{
		desc:'添加新闻',
		action:'1001910'
	},
	delNews: {
		desc: '删除新闻',
		action: '1001911'
	},
	editNews: {
		desc: '修改新闻',
		action: '1001912'
	},
	getNewsList: {
		desc: '查询新闻列表',
		action: '1001913'
	}
}

let userActions = {

	userLogin:{
		desc:'用户端登录',
		action: '2000000'
	},//
	userModifyPassword:{
		desc:'用户端修改密码',
		action: '2000010'
	},//
	addCompany:{
		desc:"创建单位",
		action:'2000100'
	},
	userRegister: {
		desc:'用户注册',
		action: '2000004'
	},//用户注册
	registerCompanyUser: {
		desc: "公司管理员添加用户信息并加入公司",
		action: '2000112'
	},
	checkUserIntoCompany:{
		desc:'用户审核公司邀请',
		action:'2000114'
	},
	userCommitWorkOrder:{
		desc:'用户提交工单',
		action:"2001000"
	},
	userCloseWorkOrder:{
		desc:"用户关闭工单",
		action:'2001001'
	},
	userReadWorkOrder:{
		desc:"用户查看工单",
		action:'2001002'
	},
	userDelWorkOrderFile:{
		desc:'用户删除工单附件',
		action:'20010003'
	},
	delWorkOrder:{
		desc:'用户删除工单',
		action:'2001004'
	},
	getUserWorkOrderList:{
		desc:"获取用户工单列表",
		action:'2001006'
	},
	userApplyJoinCompany:{
		desc:"用户申请加入单位",
		action:"2000102"
	},
	getProductList:{
		desc:"获取产品列表",
		action:'2001009'
	}, 
	replayWorkOrder: {
		desc: "用户回复工单",
		action: '2001005'
	},
	searchCompanyList: {
		desc: "搜索单位",
		action: '2000104'
	},
	changeAdmin:{
		desc:'转让单位管理员',
		action:'2000105'
	},
	evaluateWorkOrder:{
		desc:"用户评价工单",
		action:"2001008"
	},
	getCompanyUserList: {
		desc: "获取公司用户列表",
		action:"2000106"
	},
	addCompanyUser:{
		desc:"添加公司会员",
		action:'2000107'
	},
	editCompanyUser:{
		desc:"修改公司会员状态",
		action:"2000108"
	},
	delCompanyUser:{
		desc:"删除公司会员",
		action:'2000109'
	},
	getCompanyInfo:{
		desc:'查看公司详细',
		action:'2000110'
	},
	editCompanyInfo:{
		desc:"修改公司信息",
		action:"2000111"
	},
	getAllProductList:{
		desc:'用户获取所有的产品列表',
		action:"2001007"
	},
	getRoleList:{
		desc: '获取用户产品权限列表',
		action:"2001100"
	},
	getDepartmentUserList:{
		desc:'获取部门用户列表',
		action:"2001916"
	},
	addDepartmentUser:{
		desc:'部门下新增用户',
		action:'2001917'
	},
	delDepartmentUser:{
		desc:'删除下新增用户',
		action:'2001918'
	},
	getAllCompanyUserList:{
		desc:'获取公司下所有用户列表',
		action:'2001919'
	},
	getMobileCode:{
		desc:'手机获取验证码',
		action:'3004001'
	},
	getWXCode:{
		desc:'获取微信QRCode',
		action:"2000099"
	},
	getTempToken:{
		desc:'微信扫码绑定临时token',
		action:'10000001'
	},
	getWXFollow:{
		desc:'定时刷新获取微信关注',
		action:'2000098'
	},
	addUserRoleGroup:{
		desc:'添加用户权限组',
		action:'2001101'
	},
	delUserRoleGroup:{
		desc: '删除用户权限组',
		action: '2001102'
	},
	editUserRoleGroup: {
		desc: '编辑用户权限组',
		action: '2001103'
	},
	addUserForUserRoleGroup:{
		desc:"添加权限组成员",
		action:'2001104'
	},
	delUserForUserRoleGroup: {
		desc: "删除权限组成员",
		action: '2001106'
	},
	getUserRoleGroupUserList:{
		desc:'获取权限组成员列表',
		action:"2001107"
	},
	passwordFind:{
		desc:'找回密码',
		action:"2000001"
	}

};

let companyAdminActions = {

	addCMSType:{
		desc:"单位管理员添加CMS类型",
		action:"2001900"
	},
	delCMSType: {
		desc: "单位管理员删除CMS类型",
		action: "2001901"
	},
	editCMSType: {
		desc: "单位管理员编辑CMS类型",
		action: "2001902"
	},
	getCMSTypeList: {
		desc: "单位管理员获取CMS类型列表",
		action: "2001903"
	},

	addDepartment:{
		desc:'单位管理员添加部门',
		action:"2001904"
	},
	delDepartment: {
		desc: "单位管理员删除单位部门",
		action: "2001905"
	},
	editDepartment: {
		desc: "单位管理员编辑单位部门",
		action: "2001906"
	},

	getDepartmentList:{
		desc:"单位管理员获取部门列表",
		action:'2001907'
	},
	getUserList:{}
}


//基础配置
let basicConfigActions = {
	getBasicConfig:{
		action:'1000210',
		desc:'获取基础配置'
	},
	updateBasicConfig:{
		action:'1000211',
		desc:'更新基础配置'
	}
};


let changYueAcions = {
	getMySubmitList:{
		desc:'获取我的提交列表',
		action:'2001910'
	},
	getMyCheckList:{
		desc:'获取我的审核列表',
		action:'2001909'
	},
	checkManuscript:{
		desc:'审核稿件',
		action:'2001911'
	},
	delManuscript:{
		desc:'删除稿件',
		action:'2001912'
	},
	manuscriptDetail:{
		desc:"稿件详情-无需登陆",
		action:"2001913"
	},
	revokeManuscript:{
		desc:'撤销审核',
		action:'2001921'
	},
	getuserManuscript:{
		desc:'获取稿件所有审核意见',
		action:'2001922'
	},
	getuserDetails:{
		desc:'审核人查看稿件详情',
		action:'2001920'
	}

}

let orderFoodActions = {
	setOrderFoodConfigTop:{
		desc:'设置订餐配置项',
		action:'2001800'
	},
	getOrderFoodConfigTop: {
		desc: '获取订餐配置数据',
		action: '2001805'
	},
	userOrderFood:{
		desc:'用户订餐',
		action:'2001801'
	},
	statisticsOrderFoodUserCount:{
		desc:'统计某个时间段内订餐人数',
		action:'2001802'
	},
	getDateRangeOrderFoodCount:{
		desc:'获取某个时间段内订餐人数',
		action:'2001803'
	},
	getOrderFoodDetailByDate:{
		desc:'获取某天订餐详细列表',
		action:"2001804"
	},
	getMyFoodOrderList:{
		desc:'获取我的订餐列表',
		action:'2001809'
	}
}

let tripActions = {
	getCityList:{
		desc:'城市基础数据',
		action:"2001931"
	},
	addJob:{
		desc:'新增职称',
		action:'2001933'
	},
	editJob:{
		desc:'修改职称',
		action:'2001934'
	},
	delJob:{
		desc:'删除职称',
		action:'2001935'
	},
	getJobList:{
		desc:'获取单位职称列表',
		action:'2001937'
	},
	getExpenselist:{
		desc:"获取公司交通费用标准列表",
		action:'2001953'
	},
	addBusinesstrip:{
		desc:"新增出差事由",
		action:'2001959'
	},
	delBusinesstrip: {
		desc: "删除出差事由",
		action: '2001960'
	},
	editBusinesstrip: {
		desc: "编辑出差事由",
		action: '2001961'
	},
	searchBusinesstripList:{
		desc:"查询出差事由",
		action:"2001962"
	},
	getTrafficlist:{
		desc:"获取公司交通费用标准列表",
		action:"2001948"
	},
	getTrafficbase:{
		desc:"交通工具基础数据",
		action:'2001943'
	},
	addTraffic:{
		desc:'新增交通费用标准',
		action:"2001944"
	},
	editTraffic:{
		desc:'新增交通费用标准',
		action:"2001945"
	},
	delTraffic: {
		desc: '删除交通费用标准',
		action: "2001946"
	},
	addSeason:{
		desc:'新增淡旺季',
		action:'2001938'
	},
	editSeason: {
		desc: '编辑淡旺季',
		action: '2001939'
	},
	delSeason: {
		desc: '编辑淡旺季',
		action: '2001940'
	},
	getCompanySeasonDateList:{
		desc:'获取公司谈旺季列表',
		action:'2001942'
	},
	searchNotice:{
		desc:'查询注意事项',
		action:'2001957'
	},
	addNotice:{
		desc:'添加注意事项',
		action:'2001954'
	},
	editNotice:{
		desc: '编辑注意事项',
		action: '2001955'
	},
	editExpense:{
		desc:"修改差旅费标准",
		action:'2001950'
	},
	addExpense: {
		desc: "新增差旅费标准",
		action: '2001949'
	}
};


//通用接口
let resourceActions = {
	getResourceCateList:{
		desc:'获取资源分类',
		action:'3001300'
	},
	addResourceCate:{
		desc:'添加资源分类',
		action:'3001301'
	},
	editResourceCate:{
		desc:'编辑资源分类',
		action:'3001302'
	},
	delResourceCate:{
		desc:'删除资源分类',
		action:'3001303'
	},
	getResourceList:{
		desc:'获取资源文件列表',
		action:'3001310'
	},
	editResource:{
		desc:'编辑资源文件',
		action:'3001312'
	},
	delResource:{
		desc:'删除资源文件',
		action:'3001313'
	},
	basicUpdload:{
		desc:"基础上传",
		action:'/index/upload/upload_file'
	},
	fileCopy:{
		desc:'文件复制',
		action:"3001314"
	},
	fileClip:{
		desc:"文件剪切",
		action:"3001315"
	},
	fileZip:{
		desc:"文件打包",
		action:'3001316'
	},
	getZipFileList:{
		desc:'获取打包列表',
		action:'3001317'
	},
};
let infomanagerActions = {	
	addtypeList:{
		desc:'添加类型列表',
		action:"2001300"
	},
	edittypeList:{
		desc:'修改类型列表',
		action:"2001301"
	},
	deltypeList:{
		desc:'删除类型列表',
		action:"2001302"
	},
	gettypeList:{
		desc:'获取类型列表',
		action:"2001303"
	},
	addpermission:{
		desc:'添加信息管理权限列表',
		action:"2001305"
	},
	editpermission:{
		desc:'修改信息管理权限列表',
		action:"2001306"
	},
	delpermission:{
		desc:'删除信息管理权限列表',
		action:"2001307"
	},
	getpermission:{
		desc:'获取信息管理权限列表',
		action:"2001308"
	},
	addnews:{
		desc:'添加信息',
		action:"2001310"
	},
	editnews:{
		desc:'修改信息',
		action:"2001311"
	},
	delnews:{
		desc:'删除信息',
		action:"2001312"
	},
	getnewsList:{
		desc:'获取信息列表',
		action:"2001313"
	},
	getnewsDetail:{
		desc:'获取信息详情',
		action:"2001314"
	},
	addAccessible:{
		desc:'添加可访问人信息',
		action:"2001315"
	},
	editAccessible:{
		desc:'修改可访问人信息',
		action:"2001316"
	},
	delAccessible:{
		desc:'删除可访问人信息',
		action:"2001317"
	},
	getaddAccessibleList:{
		desc:'获取可访问人列表',
		action:"2001318"
	},
	getViewList:{
		desc:'普通用户查看评论列表',
		action:"2001319"
	},
	getViewDetail:{
		desc:'普通用户查看评论详细',
		action:"2001320"
	},
	addcomment:{
		desc:'发布评论信息',
		action:"2001321"
	},
	getusertypeinfolist:{
		desc:'获取用户信息类型列表',
		action:"2001304"
	},
};
//投票管理
let voteActions={
	addVote:{
		desc:"新增投票",
		action:"2001400"
	},
	editVote:{
		desc:"修改投票",
		action:"2001401"
	},
	deleteVote:{
		desc:"删除投票",
		action:"2001402"
	},
	getVoteList:{
		desc:"获取投票列表(管理)",
		action:"2001403"
	},
	addquesion:{
		desc:"新增投票问题",
		action:"2001405"
	},
	editquesion:{
		desc:"修改投票问题",
		action:"2001406"
	},
	deletequesion:{
		desc:"删除投票问题",
		action:"2001407"
	},
	getquesionList:{
		desc:"获取投票问题列表（管理）",
		action:"2001408"
	},
	addQuesionOption:{
		desc:"新增投票问题选项",
		action:"2001409"
	},
	editQuesionOption:{
		desc:"修改投票问题选项",
		action:"2001410"
	},
	deleteQuesionOption:{
		desc:"删除投票问题选项",
		action:"2001411"
	},
	getuservoteList:{
		desc:"获取用户投票列表（管理）",
		action:"2001412"
	},
	getuservoteResultList:{
		desc:"获取用户投票相关列表",
		action:"2001413"
	}
};
//天气预报
let weatherActions = {
	viewTrafficdata:{
		desc:"限行数据",
		action:'3002000'
	},
	viewLastdata:{
		desc:"精简预报6天",
		action:'3002001'
	},
	viewTimedata:{
		desc:"精简实况",
		action:'3002002'
	},
	viewAir:{
		desc:"空气质量指数",
		action:'3002003'
	},
	viewCitydata:{
		desc:"天气预警",
		action:'3002004'
	},
	getWeatherData:{
		desc:"天气预报",
		action:'3002007'
	}
};
//获取城市信息
let cityActions = {
	ipView:{
		desc:"通过IP地址获取城市信息",
		action:'3002005'
	},
	postView:{
		desc:"通过经纬度获取城市信息",
		action:'3002006'
	}
};

//获取活动列表
let partyActions = {
	addParty:{
		desc:'新增活动',
		action:'2001704'
	},
	editParty: {
		desc: '修改活动',
		action: '2001706'
	},
	delParty: {
		desc: '删除活动',
		action: '2001705'
	},
	getPartyList:{
		desc:'获取活动列表',
		action:'2001707'
	},
	addPartyEntered:{
		desc:'提交活动报名',
		action:'2001708'
	},
	delPartyEntered:{
		desc:'删除活动报名',
		action:'2001709'
	},
	updatePartyEntered:{
		desc:'修改活动报名',
		action:"2001710"
	},
	getPartyEnteredList:{
		desc:'获取活动报名列表',
		action:"2001711"
	},
	getPartyDetail:{
		desc:'获取活动详情',
		action:"2001713"
	}

};

var zmitiActions =   /*#__PURE__*/{
	userActions,
	resourceActions,
	adminActions,
	companyActions,
	basicConfigActions,
	weatherActions,
	cityActions,
	companyAdminActions,
	changYueAcions,
	newsActions,
	tripActions,
	infomanagerActions,
	orderFoodActions,
	partyActions,
	voteActions
}

export  default zmitiActions;

