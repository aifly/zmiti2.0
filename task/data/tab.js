

var home = {
    name: '概览',
    to: 'taskhome'
};

var companyAdminMenus = [
    home,
    {
        name: "项目列表",
        to: "taskproject",
    },
    {
        name:"任务",
        to:"",
        children:[
            {
                name:'新建任务',
                to: 'taskmgredit'
            },
            {
                name:'任务列表',
                to: 'taskmgrlist'
            }
        ]
    },
    {
        name:'人员管理',
        to:""
    }
];

let companyUserMenus = [

];

let zmitiUserMenus = [
    {
        name:'概览',
        to:''
    }, {
        name: "单位管理",
        to: 'taskadmincompany'
    }, {
        name: "项目管理",
        to: 'taskadminproject'
    }, {
        name: "任务类型管理",
        to: 'taskadmintasktype'
    }, {
        name: "我的任务",
        to: "",
        children: [{
                name: '新建任务',
                to: 'taskadmintaskedit'
            },
            {
                name: '任务列表',
                to: 'taskadmintasklist'
            }
        ]
    }
]

export default { companyAdminMenus, companyUserMenus, zmitiUserMenus};