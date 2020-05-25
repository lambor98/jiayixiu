<template>
    <div class="topNav">
        <div class="nav_box">
          <div class="logo">
            <img src="@/assets/logo.png" alt="logo">
            <div class="logoName">
              <p>家易修</p>
              <p>baidu.com</p>
            </div>
          </div>
          <div class="city">
            <p class="cityName">鹰潭市</p>
            <p>[切换城市]</p>
          </div>
          <ul class="navBar">
            <router-link tag="li" :to="{ name: 'home'}">首页</router-link>
            <router-link tag="li" :to="{ name: 'service'}">维修家电</router-link>
            <!-- <li >维修家电</li> -->
            <li>优优咨询</li>
            <li>体验</li>
            <li>关于我们</li>
          </ul>
          <div class="nav_btn">
            <div class="navBtn">
                维修工入驻
            </div>
            <div class="navBtn">
                服务商入驻
            </div>
          </div>
          <div class="navTel">
            <p>服务热线：0000-0000-0000</p>
          </div>
        </div>
      </div>
</template>
<script>
import "@/assets/style/common/nav.scss"
export default {
    
}
</script>