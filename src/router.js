import Vue from "vue"
import Router from "vue-router"
//组件
import Home from "@/views/Home.vue"
import Service from "@/views/web/service.vue"
import Tiyan from "@/views/web/tiyan.vue"



Vue.use(Router);
const router = new Router({
    mode:"hash",
    routes:[
        {path:"/",redirect:"home"},
        {
           path:"/home",
           component:Home,   //首页
           name:"home" 
        },
        {path:"/web",redirect:"home"},
        {
            path:"/web/service/index",
            component:Service,  //维修家电首页
            name:"service"
        }
    ]

})


export default router;