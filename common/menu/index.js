var menus = [{
	name: "单位管理",
	link: "company"
},
{
	name: "个人管理",
	link: "user",
	children:[
		{
			name: "单位管理",
			link: "company"
		},
		{
			name: "个人管理",
			link: "user"
		}
	]
}];

export default menus;