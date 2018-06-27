let green={template:'#green'}
let organic={template:"<div>有机蔬菜organic</div>"}
let inorganic={template:"<div>无机蔬菜inorganic</div>"}
let fruit={template:'#fruit'}
let sweet={template:"<div>甜的</div>"}
let acid={template:"<div>酸的</div>"}
//路由路径映射表
let routes=[
    //路由默认去的第一个组件
    {
        path:'',
        component:green
    },
    {
        path:"/green",
        component:green,
        children:[
            {
                path:"",
                component:organic
            },
            {
                path:"organic",
                component:organic
            },
            {
                path:"inorganic",
                component:inorganic
            }
        ]
    },
    {
        path:"/fruit",
        component:fruit,
        children:[
            {
                path:"",
                component:sweet
            },
            {
                path:"sweet",
                component:sweet
            },
            {
                path:"acid",
                component:acid
            }
        ]

    },
    //所有没有找到时候，去地址/green的组件
    {
        path:"*",
        redirect:'/green'
    }

]
//实例化一个路由
let router=new VueRouter({
    routes
})
let vm=new Vue({
    el:"#app",
    data:{
    },
    router
})