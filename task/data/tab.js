var menus = [{
        name: '概览',
        to: 'taskhome'
    },
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

export default  menus;