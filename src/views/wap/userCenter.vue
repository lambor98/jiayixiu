<template>
    <div id="wapUserCenter">
        <div class="topBar">
            <div class="topBar_main">
                <van-image
                round
                width="3rem"
                height="3rem"
                fit="cover"
                src="https://img.yzcdn.cn/vant/cat.jpeg"
                />
                <p>{{userInfo.uname?userInfo.uname:'用户'}}</p>
                <img :src="require('@/assets/images/wap/user.png')" alt="" class="userLogo" >
            </div>
            
            <div class="box1 box"></div>
            <div class="box2 box"></div>
            <div class="box3 box"></div>
        </div>  
        <div class="infoBar">
            <van-cell-group> 
                <van-cell title="我的订单" value="查看全部订单"  is-link to='/wap/myOrder'/>
                <van-grid>
                    <van-grid-item icon="todo-list-o"  text="待接单" :badge="tips.tip1>=1?tips.tip1:''"  to="/wap/myOrder?active=1"/>
                    <van-grid-item icon="send-gift-o" text="正进行" :badge="tips.tip2>=1?tips.tip2:''" to="/wap/myOrder?active=2"/>
                    <van-grid-item icon="question-o" text="有争议" :badge="tips.tip3>=1?tips.tip3:''" to="/wap/myOrder?active=4"/>
                    <van-grid-item icon="smile-comment-o" text="已完成" to="/wap/myOrder?active=0"/>
                </van-grid>
            </van-cell-group>
        </div>
        <div class="infoBar">
            <van-cell-group> 
                <van-cell title="我的信息" value="查看"  is-link/>
                <van-grid :gutter="10">
                     <van-grid-item icon="setting-o"  text="修改信息" to="/wap/userinfo"/>
                     <van-grid-item icon="friends-o"  text="修改密码" to='/wap/updatePwd'/>
                    <van-grid-item v-for="value in 6" :key="value" icon="photo-o" text="文字" />
                </van-grid>
            </van-cell-group>
        </div>
      
        <WapFooter/>
    </div>
</template>
<script>
import "@/assets/style/wap/userCenter.scss"
import WapFooter from "@/components/wap/footer.vue"
import {comLog,orderTip} from "@/axios"
export default {
     components: {
        WapFooter
     },
     data(){
         return{
             userInfo:{
                 uname:null,
             },
             tips:{},
         }
     },
     mounted(){
        //  this.userInfo = this.$cookies.get("user")
         orderTip().then((res)=>{
             if(res.code==200){
                this.tips  = res.data.val
             }else{
                 this.$toast.fail(res.txt)
             }
         })
     },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
    },
     beforeRouteEnter(to,from,next){
        comLog().then(res=>{
            if(res.code==200){
                next(that=>{
                    that.userInfo = that.$cookies.get("user")//获取cookies
                });
            }else{
                next(that=>{
                    sessionStorage.setItem("lastPath",to.name)
                    if(that.$cookies.get("user")){
                        that.$cookies.remove("user")
                    }
                    that.$toast("请先登录")
                    that.$router.replace({name:'wapLogin'})
                })
            }
        })
    }
    
}
</script>