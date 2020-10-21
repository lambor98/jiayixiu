/*
 * @Author: your name
 * @Date: 2020-05-25 17:38:37
 * @LastEditTime: 2020-10-13 13:33:43
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
import WapHome from "@/views/wap/wapHome.vue"
import {comLog} from"@/axios"
import WapLogin from "@/views/wap/login.vue"
import WapService from "@/views/wap/service.vue"
import WapApply from '@/views/wap/apply.vue'
import WapUserCenter from "@/views/wap/userCenter.vue"
import WapUserInfo from "@/views/wap/userinfo.vue"
import WapUpdatePwd from "@/views/wap/updatePwd.vue"
import WapMyOrder from "@/views/wap/myOrder.vue"





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
        {
            path:'/wap',
            component:Wap,
            name:'wapHome',
            redirect:'/wap/index',
            children:[
                {
                    path:'index',
                    name:'wapHome',
                    component:WapHome
                },
                {
                    path:'login',
                    name:'wapLogin',
                    component:WapLogin
                },
                {
                    path:'service',
                    name:'wapService',
                    component:WapService
                },
                {
                    path:'apply',
                    name:'wapApply',
                    component:WapApply
                },{
                    path:'userCenter',
                    name:"wapUserCenter",
                    component:WapUserCenter,
                    children:[
                        
                    ]
                },
                {
                    path:'userinfo',
                    name:'wapUserInfo',
                    component:WapUserInfo,
                },
                {
                    path:'updatePwd',
                    name:'wapUpdatePwd',
                    component:WapUpdatePwd
                },
                {
                    path:'myOrder',
                    name:'wapMyOrder',
                    component:WapMyOrder
                }
            ]
        },
        {path:"*",redirect:'/web'},
        
       
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