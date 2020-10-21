
<template>
    <div id="wapHome">
        <van-notice-bar
            left-icon="volume-o"
            text="欢迎来到家易修维修平台，家易修，你的生活好伙伴"
        />
       <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(item,index) in bannerList" :key="index">
                <img :src="require('@/assets/images/wap/'+item)">
            </van-swipe-item>
        </van-swipe>
        <div class="logo">
            <img :src="require('@/assets/images/logo.png')" alt="">
            <p>家易修，你的生活好伙伴</p>
        </div>
        <!-- <van-grid direction="horizontal" :column-num="1">
            <van-grid-item class="logo" :icon="require('@/assets/logo.png')" text="家易修你的生活好伙伴" />
        </van-grid> -->
        <van-grid clickable :column-num="3">
            <van-grid-item :icon="require('@/assets/images/wap/repair.png')" to="/wap/service" text="我要报修" />
            <van-grid-item :icon="require('@/assets/images/wap/worker.png')" text="我是维修工" />
            <van-grid-item :icon="require('@/assets/images/wap/join.png')" to='/wap/apply' text="我要当维修工" />
            <!-- <van-grid-item icon="photo-o" text="个人中心" /> -->
        </van-grid>
        <img :src="require('@/assets/images/wap/adv_1.jpg')" alt="">
        <img :src="require('@/assets/images/wap/adv_2.jpg')" alt="">
        <img :src="require('@/assets/images/wap/adv_3.jpg')" alt="">
        <img :src="require('@/assets/images/wap/adv_4.jpg')" alt="">
        <WapFooter/>
     
    </div>
</template>
<script>
import "@/assets/style/wap/wapHome.scss"
import WapFooter from "@/components/wap/footer.vue"
export default {
    components: {
        WapFooter
     },
    data(){
        return{
            bannerList:[
              "banner.png",
              "banner_2.jpg"
            ]
        }
    }
}
</script>
<style>
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
</style>