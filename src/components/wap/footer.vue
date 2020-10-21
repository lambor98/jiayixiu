 
<template>
    <div id="wapFooter">
         <van-grid clickable :column-num="2"  direction="horizontal" class="wapBottom">
            <van-grid-item icon="home-o" text="主页" to="/wap/index"  @click="selected"/>
            <van-grid-item icon="user-o" text="个人中心" to='/wap/userCenter'  @click="selected"/>
            <div class="baoxiu">
                立即报修
            </div>
        </van-grid>
    </div>
</template>
<script>
export default {

    methods:{
        selected(e){
            // e.currentTarget.class("selected")
        }
    }
    
}
</script>
<style>
#wapFooter{
    z-index: 99999;
    position: relative;
}
 .wapBottom{
        position: fixed;
        bottom: 0;
        width: 100%;
    }
    .baoxiu{
        position: absolute;
        width: 2rem;
        height: 2rem;
        border-radius: 50%;
        line-height: 2rem;
        text-align: center;
        font-size: 12px;
        background-color: royalblue;
        color: #fff;
        left: 0;
        right: 0;
        bottom: 0;
        top: -2rem;
        margin: auto;
        z-index: 999;
    }
</style>