/*
 * @Author: your name
 * @Date: 2020-05-25 17:38:37
 * @LastEditTime: 2020-10-13 00:00:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git项目\jiayixiu\src\vuex\index.js
 */
import Vue from "vue"
import Vuex from "vuex"
import {comLog,getCity} from "@/axios"
Vue.use(Vuex);

const store = new Vuex.Store({
    state:{
        test:"测试测试",
        username:null,
        isLogin:false,
        cityList:null, //省市联动总数据
        sheng:null, //省级数据
        shi:null, //市级数据
        qu:null ,//区级数据
        dialogVisible:false,
    },
    mutations:{
        //es6语法，等同edit:funcion(){...}
        loginName(state,data){
            state.username = data.uname
            state.isLogin = data.flag
        },
        updateCityList(state,data){
            state.cityList = data
        },
        updateSheng(state,data){
            state.sheng = data
        },
        updateShi(state,data){
            state.shi = data
        },
        updateQu(state,data){
            state.qu = data
        },
      
    },
    actions:{
        checkLogin({commit}){
            if($cookies.get("user")){
                comLog().then(res=>{
                    if(res.code==400){
                        $cookies.remove("user")
                        commit("loginName",{uname:null,flag:false})
                    }else{
                        commit("loginName",{uname:$cookies.get("user").uname,flag:true})

                    }
                })
            }else{
                commit("loginName",{uname:null,flag:false})
            }
        },
        getCityList({commit}){
            getCity().then(res=>{
                commit("updateCityList",res)
            })
        }
    }
})


export default store;