<!--
 * @Author: your name
 * @Date: 2020-10-08 19:37:39
 * @LastEditTime: 2020-10-13 00:05:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \git项目\jiayixiu\src\views\web\userCenter.vue
-->
<template>
    <div id="userCenter" class="clearfix">
        <div class="left">
            <h5 @click="slide">我的信息<img @click="slides" src="@/assets/images/point.png" alt=""></h5>
            <ul>
                <li class="choose" @click="choose" data-id='Userinfo'>个人信息</li>
                <li @click="choose" data-id='UpdatePwd'>修改密码</li>
            </ul>
            <h5 @click="slide">我的订单<img @click="slides" src="@/assets/images/point.png" alt=""></h5>
            <ul>
                <li @click="choose" data-id='MyOrder' >订单信息</li>
            </ul>
        </div>
        <div class="right">
            <component :is="views" :info="$cookies.get('user')"></component>
        </div>
    </div>
</template>
<script>
import '@/assets/style/userCenter.scss'
import Userinfo from '@/components/userCenter/userinfo.vue'
import UpdatePwd from '@/components/userCenter/updatePwd.vue'
import MyOrder from '@/components/userCenter/myOrder.vue'
import {comLog} from"@/axios"

export default {
    components:{
                Userinfo,UpdatePwd,MyOrder
        },
    data(){
        return{
            userinfo:null,
            views:'Userinfo',
        }
    },
    beforeMount(){
       this.$store.dispatch('checkLogin').then(()=>{
           if(!this.$store.state.isLogin){
               this.$message.error('您未登录')
               this.$router.push({name:"home"})
           }

       })
    },
    mounted(){
        this.userinfo = this.$cookies.get('user');
    },
    methods:{
        slide(e){
            if( $(e.target).next().css('display')=='none'){
                 $(e.target).next().slideDown(300)
                $(e.target).children("img").css("transform",'rotate(180deg)')
            }else{
                 $(e.target).next().slideUp(300)
                 $(e.target).children("img").css("transform",'rotate(360deg)')
            }
           
        },
        slides(e){
             $(e.target).parent().click()
        },
        choose(e){
            $("ul").find('li').removeClass('choose');
            $(e.target).addClass('choose');
            this.views = $(e.target).attr('data-id')
        }
    }
    
}
</script>
