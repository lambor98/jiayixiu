<template>
    <div id="login">
        <van-nav-bar
        :title="!flag?'用户登录':'用户注册'"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="logo">
            <img :src="require('@/assets/images/logo.png')" alt="">
        </div>
        <van-form @submit="onSubmit" class="loginBox" v-if="!flag">
            <van-field
                v-model="uname"
                name="uname"
                label="用户名"
                placeholder="用户名"
                 left-icon="contact"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="pwd"
                type="password"
                name="pwd"
                label="密码"
                placeholder="密码"
                 left-icon="closed-eye"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">登录</van-button>
                <br>
            </div>
        </van-form>
         <div style="margin: 0 16px;" v-if="!flag">
            <van-button round block type="warning" @click="flag=true" >没有账号？注册</van-button>
         </div>
          <van-form @submit="onRegister" class="RegBox" v-if="flag">
            <van-field
                v-model="form.uname"
                name="uname"
                label="用户名"
                placeholder="用户名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                v-model="form.pwd"
                type="password"
                name="pwd"
                label="密码"
                placeholder="密码"
                :rules="[{ required: true, message: '请填写密码' }]"
            />
             <van-field
                v-model="form.pwd1"
                type="password"
                name="pwd1"
                label="确认密码"
                placeholder="确认密码"
                :rules="[{ validator:rules1, message: '请确认密码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">注册</van-button>
            </div>
        </van-form>
         <div style="margin: 0 16px;">
                <van-button round block type="primary" v-if="flag" @click="flag=false">返回</van-button>
            </div>
    </div>
</template>
<script>
import "@/assets/style/wap/login.scss"
import {reqLogin,reqReg} from "@/axios"
export default {
     data() {
            return {
            uname: '',
            pwd: '',
            flag:false,
            form:{},
            };
        },
    methods:{
        rules1(val){
            return (this.form.pwd == val)
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        onSubmit(value){
            reqLogin(value).then(res=>{
                if(res.code==200)
                {
                    this.$toast.success(res.txt);
                    let {id,uname,pwd,tel} = res.data
                    this.$cookies.set('user',{id,uname,tel},'7d')
                    if(sessionStorage.getItem("lastPath")){
                        this.$router.replace({name:sessionStorage.getItem("lastPath")})
                    }else{
                        this.$router.replace({name:'wapHome'})
                    }

                }else{
                    this.$toast.fail(res.txt);
                }

            })
        },
        onRegister(value){
            if(value.pwd===value.pwd1){
                let {uname,pwd,pwd1}= value;
                reqReg({uname,pwd}).then(res=>{
                    if(res.code==200){
                        this.$toast.success(res.txt);
                        this.flag = false;
                    }else this.$toast.fail(res.txt)
                })
            }else this.$toast.fail('请确认两次密码相同')
        }
    }
}
</script>