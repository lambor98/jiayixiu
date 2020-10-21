<template>
    <div id="userinfo">
        <van-nav-bar
        title="用户信息"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-cell-group> 
                <van-cell title="用户名" :value="form.uname" />
                <van-cell title="注册时间" :value="form.rgTime | timeFlt" />
                <van-cell title="联系电话" :value="form.tel?form.tel:'待完善'"  is-link @click="update"/>
                <van-cell title="真实姓名" :value="form.realName?form.realName:'待完善'"  is-link @click="update"/>
                <van-cell title="QQ" :value="form.qq?form.qq:'待完善'"  is-link @click="update"/>
                <van-cell title="微信" :value="form.wechat?form.wechat:'待完善'"  is-link @click="update"/>
        </van-cell-group>

        <van-popup v-model="show" position="bottom" closeable @close="close" >
            <br>
            <van-form @submit="onSubmit">
                <van-field
                    v-model="newForm.tel"
                    name="tel"
                    label="联系电话"
                    placeholder="联系电话"
                    required
                    :rules="[{ required: true, message: '请填写联系电话' },{pattern:/^[1][3,4,5,6,7,8,9][0-9]{9}$/ , message: '请出入正确的手机号'}]"
                />
                 <van-field
                    v-model="newForm.realName"
                    name="realName"
                    label="真实姓名"
                    placeholder="真实姓名"
                />
                 <van-field
                    v-model="newForm.qq"
                    name="qq"
                    label="QQ"
                    placeholder="QQ"
                />
                 <van-field
                    v-model="newForm.wechat"
                    name="wechat"
                    label="微信"
                    placeholder="微信"
                />
                <div style="margin:10px">
                    <van-button  style="width:100%" type="primary">修改</van-button>
                </div>
            </van-form>
        </van-popup>
    </div>
</template>
<script>
import {findUser,updateUser} from '@/axios'
export default {
    data(){
        return{
            form:{},
            newForm:{},
            show:false
        }
    },
    mounted(){
        findUser().then(res=>{
            if(res.code==200){
                this.form = res.data;
                this.newForm = JSON.parse(JSON.stringify(res.data))
            }else this.$toast.fail(res.txt)
        })
    },
    methods:{
        onClickLeft(){
            this.$router.go(-1)
        },
        update(){
            this.show = true
        },
        onSubmit(){
            updateUser(this.newForm).then(res=>{
                if(res.code==200){
                    this.$toast.success(res.txt)
                    this.form = JSON.parse(JSON.stringify(this.newForm))
                    this.show = false;
                }else{
                    this.$toast.error(res.txt)
                }
            })
        },
        close(){
            this.newForm = JSON.parse(JSON.stringify(this.form));
        }
    },
    filters:{
        timeFlt:function(value){
            if(value){
                function fill(value){
                    if(value*1<10){
                    return "0"+value
                    }else{
                    return value
                    }
                }
                let time= new Date(value);
                return time.getFullYear()+'年'+fill(time.getMonth()*1+1)+'月'+fill(time.getDate())+'日'+fill(time.getHours())+':'+fill(time.getMinutes());
            }else{
                return ''
            }
        }
    }
    
}
</script>