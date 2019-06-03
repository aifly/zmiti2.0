


let adminActions = {
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
		desc:'管理员组列表1000204（简要信息，不参与权限验证）',
		action:'1000204'
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
	userRegister: {
		desc:'用户注册',
		action: '2000004'
	},//用户注册
	userCommitWorkOrder:{
		desc:'用户提交工单',
		action:"2001000"
	}
};

let zmitiActions =  {
	userActions,
	adminActions
}

export default zmitiActions;