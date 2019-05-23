var user_company ={
	title:'用户单位',
	tabs:[
		{
			name: '用户单位',
			link: '',
			status: true,
			children: [
				{
					name: '用户管理',
					link: 'user'

				},
				{
					name: '单位管理',
					link: 'company'
				}
			]
		}
	]
};

var admin_rolegroup_setrole ={
	title:"系统管理",
	tabs: [
		{
			name: '管理员管理',
			link: 'admin'
		}, {
			name: '权限管理',
			link: 'role',
			children: [
				{
					name: '权限组管理',
					link: 'rolegroup'
				}, {
					name: '权限分配',
					link: 'setrole'
				}
			]
		}
	]
};


var menuObj = {
	user_company,
	admin_rolegroup_setrole
};

export default menuObj;