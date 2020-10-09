<template>
  <div id="app">
    <el-carousel height="450px" width="100%" class="banner">
      <el-carousel-item v-for="(item,index) in bannerList" :key="index">
        <img :src="require('@/assets/images/'+item.name)" alt="">
      </el-carousel-item>
    </el-carousel>
    <div class="mid">
      <div class="mid_1">
        <p>家易修平台</p>
      </div>
      <img class="line" src="@/assets/images/icon_2.png" alt="">
      <div class="mid_a">
        <div class="mid_a_box mid_a_lt" >
            <div v-for="item in 3" :key="item" class="mid_a_box_a" > 
              <div v-if="item!=2" :class="`mid_a_box_b boxs${item}`">
                <p v-if="item==1">优优易修微信平台是一款基于微信的在线报修平台，维修师傅有可能就是您的邻居！通过实时定位，维修师傅就近上门，快速维修！快来点击体验</p>
                <p v-if="item==3">服务卡是优优易修平台推出的维修工专属微信卡片，扫描维修工服务卡二维码即可领取，功能简单实用，一对一服务方便，安全可靠！快来点击体验</p>
                  <div class="sanjiao sj1"></div>
              </div>
            </div>
        </div>
        <img  class="mid_a_pic" src="@/assets/images/btn_5.jpg" alt="">
        <div class="mid_a_box mid_a_rt">
          <div class="mid_a_box mid_a_lt" >
            <div v-for="item in 3" :key="item"  class="mid_a_box_a" >
              <div v-if="item==2"  :class="`mid_a_box_b boxs${item}`">
                <p>优优易修平台的工人都有各大家电厂商维修经验，专业维修家电多年，均为资深工程师；平台保证，收费低廉合理，用户不必担心维修善后问题！</p>
                  <div class="sanjiao sj2"></div>
              </div>
            </div>
        </div>
        </div>
      </div>
    </div>
    <div class="mid1">
        <div class="mid1_1">
          <p>为什么选择家易修</p>
        </div>
        <img class="line" src="@/assets/images/icon_2.png" alt="">
        <ul class="mid1_a">
          <li>
            <img src="@/assets/images/icon_23.png" alt="">
            <div class="mid1_a_a">
              <p>足不出户</p>
              <p>找到专业家电维修师傅</p>
            </div>
          </li>
            <li>
            <img src="@/assets/images/icon_24.png" alt="">
            <div class="mid1_a_a">
              <p>快速维修</p>
              <p>规定时间内上门维修</p>
            </div>
          </li>
            <li>
            <img src="@/assets/images/icon_25.png" alt="">
            <div class="mid1_a_a">
              <p>专业维修</p>
              <p>各大品牌维修工专业维修</p>
            </div>
          </li>
            <li>
            <img src="@/assets/images/icon_26.png" alt="">
            <div class="mid1_a_a">
              <p>价格实惠</p>
              <p>收费合理优惠 享受最低价</p>
            </div>
          </li>

        </ul>
    </div>
    <div class="mid2">
       <div class="mid2_1">
          <p>维修利器——服务卡</p>
        </div>
        <img class="line" src="@/assets/images/icon_2.png" alt="">
        <div class="mid2_a">
          <div class="mid2_a_city">
            <p class="cityName">{{$store.state.test}}</p>
            <p>[切换城市]</p>
          </div>
          <div class="mid2_a_repair">
            <div class="mid2_a_repair_1">
              <img src="@/assets/images/icon_35.png" alt="">
            </div>
            <div class="mid2_a_repair_2">
              “维修师傅的专属微信卡片，家电维修一键下单，轻松找到满意的维修师傅。领取您附近维修师傅的服务卡，他有可能就是您的邻居哦，从此家电维修无烦恼......”
              <a href="#">更多介绍>></a>
            </div>
          </div>
        </div>
    </div>
    <div class="nav_right">
      <div class="kswx nav_btn">
        <img src="@/assets/images/btn_kswx1.png" alt="">
      </div>
      <div class="sys nav_btn">
        <img src="@/assets/images/btn_sys1.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
 /* eslint-disable */
import "@/assets/style/home.scss";
export default {
  name: 'App',
  data(){
    return{
      bannerList:[
        {name:"banner1.jpg",href:"#"},{name:"banner2.jpg",href:"#"},{name:"banner3.jpg",href:"#"}
      ]
    }
  }
  
}
</script>

  

<style lang="scss">
.banner{
  img{
    width: 100%;
  }
}
</style>
