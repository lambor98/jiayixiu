<template>
    <div id="updatePwd">
        <van-nav-bar
        title="修改密码"
        left-arrow
        @click-left="onClickLeft"
        />
        <div class="main">
            <van-form @submit="onSubmit" v-if="!show">
                <van-field
                    v-model="form.pwd"
                    name="pwd"
                    label="原密码"
                    placeholder="原密码"
                    :rules="[{ required: true, message: '请填写原密码' }]"
                />
                <div style="margin:10px 0 0 0">
                    <van-button  style="width:100%" type="primary">确定</van-button>
                </div>
            </van-form>
             <van-form @submit="updateNow" v-if="show">
                <van-field
                    v-model="newForm.pwd"
                    name="pwd"
                    label="原密码"
                    placeholder="原密码"
                    :rules="[{ required: true, message: '请填写原密码' }]"
                />
                  <van-field
                    v-model="newForm.pwd1"
                    name="pwd1"
                    label="确认密码"
                    placeholder="确认密码"
                    :rules="[{ validator:rules1, message: '两次密码不一致' }]"
                />
                <div style="margin:10px 0 0 0">
                    <van-button  style="width:100%" type="primary">确定</van-button>
                </div>
            </van-form>
        </div>
    </div>
</template>
<script>
import {updatePwd,checkPwd,loginOut} from "@/axios"
export default {
    data(){
        return{
            form:{},
            newForm:{},
            show:false,
        }
    },
    methods:{
        rules1(val){
            return (this.newForm.pwd == val)
        },
        onClickLeft(){
            this.$router.go(-1)
        },
        onSubmit(){
            checkPwd(this.form).then(res=>{
                if(res.code==200){
                    this.show = true
                }else{
                    this.$toast.fail(res.txt)
                }
            })
        },
        updateNow(){
            updatePwd(this.newForm).then(res=>{
                if(res.code==200){
                    this.$toast.success(res.txt+'，请重新登录')
                            setTimeout(()=>{
                                 loginOut().then(res=>{
                                    if(res.code== 200){
                                    this.$cookies.remove("user")
                                    this.$store.commit("loginName",{uname:null,flag:false})
                                    this.$router.replace({name:'wapLogin'})
                                    }
                                })
                            })
                }else{
                    this.$toast.fail(res.txt)
                }
            })
        }
    }
    
}
</script>
<style>
.main{
    width: 95%;
    margin:10px auto;
    /* border-radius: 10px; */
    overflow: hidden;
}

</style>