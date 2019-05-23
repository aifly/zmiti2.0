let zmitiActions = {
	adminlogin:'1000000',//管理员登录
	getAdminList: '1000100',//管理员列表
	addAdminUser:'1000101',//管理员添加管理员	
	editAdminUser: '1000102',//管理员编辑 	
	delAdmin:'1000103',//管理员删除,
	modifyAdminPassword:'1000104',//修改管理员密码
	modifyAdminSelfPassword: '1000105',//管理员自助修改密码
	checkAdminUserName:'1000106',//管理员检测用户名是否存在
	getGroupList: '1000200',//管理员组列表
	addGroup: '1000201',//添加管理员组
	editGroup: '1000202',//编辑管理员组
	delGroup: '1000203',//删除管理员组
	getAdminGroupSipleList: '1000204',//管理员组列表1000204（简要信息，不参与权限验证）






}

export default zmitiActions;