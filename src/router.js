/*
 * @Author: your name
 * @Date: 2020-05-25 17:38:37
 * @LastEditTime: 2020-10-13 00:02:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git项目\jiayixiu\src\router.js
 */
import Vue from "vue"
import Router from "vue-router"

//组件
import Index from "@/views/web/index.vue"
import Home from "@/views/web/Home.vue"
import Service from "@/views/web/service.vue"
import Tiyan from "@/views/web/tiyan.vue"
import Apply from '@/views/web/apply.vue'
import userCenter from '@/views/web/userCenter.vue'
import Wap from '@/views/wap/index.vue'
import {comLog} from"@/axios"




Vue.use(Router);
const router = new Router({
    mode:"history",
    routes:[
        {
           path:"/web",
           component:Index,   //首页
           name:"web" ,
           redirect:"/web/index",
           children:[
               {
                   path:'index',
                   name:'home',
                   component:Home    
               },
                {
                    path:'service',
                    name:'service',
                    component:Service  //维修家电首页
                },
                {
                    path:'apply',
                    component:Apply, //维修工入驻
                    name:'Apply'
                },
                {
                    path:'userCenter',
                    component:userCenter, //维修工入驻
                    name:'userCenter',
                    meta:{
                        isLogin:true
                    }
                }
           ]
        },
        {path:"*",redirect:'/web'},
        // {path:'/service',component:Service,name:"serviceIndex"}
        {
            path:'/wap',
            component:Wap,
            redirect:'/wap/index',
        }
       
    ]

})

// router.beforeEach((to,from,next)=>{
//     console.log(to)
//     if(to.meta.isLogin){
//         comLog().then(res=>{
//             if(res.code==400){
//                 next('/index')
//             }else{
//                 next();
//             }
//         })
//     } else{
//         next()

//     }  

// })


export default router;