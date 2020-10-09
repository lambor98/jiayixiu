<template>
    <div id="userCenter" class="clearfix">
        <div class="left">
            <h5 @click="slide">我的信息<img @click="slides" src="@/assets/images/point.png" alt=""></h5>
            <ul>
                <li class="choose" @click="choose" data-id='Userinfo'>个人信息</li>
                <li @click="choose">修改密码</li>
            </ul>
        </div>
        <div class="right">
            <component :is="views" :info="$cookies.get('user')"></component>
        </div>
    </div>
</template>
<script>
import '@/assets/style/userCenter.scss'
import Userinfo from '@/components/userinfo.vue'
export default {
    components:{
                Userinfo
        },
    data(){
        return{
            userinfo:null,
            views:'Userinfo',
        }
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
