<template>
    <div id="myOrder">
        <van-nav-bar
        title="我的订单"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-tabs v-model="activeName" animated @change="changeTab">
            <van-tab title="全部" name="0">
                <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                <div class="mainBox" v-for="(item,index) in allList" :key="index"> 
                        <van-cell :title="'订单号:'+item.orderId" :class="item.type=='1'?'ready':item.type=='2'?'going':item.type=='3'?'':'red'"  :value="item.type=='1'?'待抢单':item.type=='2'?'正在进行':item.type=='3'?'已完成':'有争议'"  :label="item.jiadian"  is-link/>
                        <div class="mid_bar">
                            <div class="mid_bar_left">
                                <img :src="require('@/assets/images/logo.png')" alt="">
                            </div>
                            <div class="mid_bar_mid">
                                <p>{{item.name}}<span>{{item.phone}}</span></p>
                                <p>{{item.dizhi}}</p>
                                <p></p>
                            </div>
                        </div>
                </div>
                </van-list>
                <van-empty v-if="!allList[0]" description="真没有啦" />
            </van-tab>
            <van-tab title="待抢单" name="1">
                   <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                <div class="mainBox" v-for="(item,index) in allList" :key="index"> 
                        <van-cell :title="'订单号:'+item.orderId" :class="item.type=='1'?'ready':item.type=='2'?'going':item.type=='3'?'':'red'"  :value="item.type=='1'?'待抢单':item.type=='2'?'正在进行':item.type=='3'?'已完成':'有争议'"  :label="item.jiadian"  is-link/>
                        <div class="mid_bar">
                            <div class="mid_bar_left">
                                <img :src="require('@/assets/images/logo.png')" alt="">
                            </div>
                            <div class="mid_bar_mid">
                                <p>{{item.name}}<span>{{item.phone}}</span></p>
                                <p>{{item.dizhi}}</p>
                                <p></p>
                            </div>
                        </div>
                </div>
                </van-list>
                <van-empty v-if="!allList[0]" description="真没有啦" />
                </van-tab>
            <van-tab title="正在进行" name="2">
                   <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                <div class="mainBox" v-for="(item,index) in allList" :key="index"> 
                        <van-cell :title="'订单号:'+item.orderId" :class="item.type=='1'?'ready':item.type=='2'?'going':item.type=='3'?'':'red'"  :value="item.type=='1'?'待抢单':item.type=='2'?'正在进行':item.type=='3'?'已完成':'有争议'"  :label="item.jiadian"  is-link/>
                        <div class="mid_bar">
                            <div class="mid_bar_left">
                                <img :src="require('@/assets/images/logo.png')" alt="">
                            </div>
                            <div class="mid_bar_mid">
                                <p>{{item.name}}<span>{{item.phone}}</span></p>
                                <p>{{item.dizhi}}</p>
                                <p></p>
                            </div>
                        </div>
                </div>
                </van-list>
                <van-empty v-if="!allList[0]" description="真没有啦" />
                </van-tab>
            <van-tab title="有争议" name="4">
                   <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="onLoad"
                >
                <div class="mainBox" v-for="(item,index) in allList" :key="index"> 
                        <van-cell :title="'订单号:'+item.orderId" :class="item.type=='1'?'ready':item.type=='2'?'going':item.type=='3'?'':'red'"  :value="item.type=='1'?'待抢单':item.type=='2'?'正在进行':item.type=='3'?'已完成':'有争议'"  :label="item.jiadian"  is-link/>
                        <div class="mid_bar">
                            <div class="mid_bar_left">
                                <img :src="require('@/assets/images/logo.png')" alt="">
                            </div>
                            <div class="mid_bar_mid">
                                <p>{{item.name}}<span>{{item.phone}}</span></p>
                                <p>{{item.dizhi}}</p>
                                <p></p>
                            </div>
                        </div>
                </div>
                </van-list>
                <van-empty v-if="!allList[0]" description="真没有啦" />
                </van-tab>
        </van-tabs>
    </div>
</template>
<script>
import "@/assets/style/wap/myOrder.scss"
import {submitOrder} from '@/axios'
export default {
    data(){
        return{
            activeName:0,
            allList:[],
            loading:false,
            finished: false,
            type:'',
            page:0
        }
    },
    mounted(){
        if(this.$route.query){
            this.activeName = this.$route.query.active
              switch (this.activeName){
                case '1':
                    this.type = 1;
                    break;
                case '2':
                    this.type = 2;
                    break;
                case '4':
                    this.type = 4
                    break;
                default:
                    this.type = null;
            }
        }
        // console.log(this.$route.query.active)
        // this.activeName = '2'
    
     
    },
    methods:{
        onLoad(){
            this.page+=1;
            submitOrder({type:'find',data:{page:this.page,search:{type:this.type}}}).then(res=>{
            if(res.code ==200){
                this.allList = this.allList.concat(res.data)
                // console.log(res.data)
                if(res.data.length<6){
                    this.finished = true
                }else{
                    this.loading = false
                }
            }else{
                this.$toast.fail(res.txt)
            }
        })

        },
        onClickLeft(){
            this.$router.go(-1)
        },
        changeTab(){
            console.log(this.activeName)
            this.allList = [];
            this.page = 0;
            switch (this.activeName){
                case '1':
                    this.type = 1;
                    break;
                case '2':
                    this.type = 2;
                    break;
                case '4':
                    this.type = 4
                    break;
                default:
                    this.type = null;
            }
            this.onLoad()
        }
    }
    
}
</script>