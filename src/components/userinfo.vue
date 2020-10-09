<template>
    <div id="userinfo" class="clearfix">
        <el-form ref="form" :model="form" label-width="80px" style="width:300px" :rules="rules" >
            <el-form-item label="用户名">
                <el-input v-model="form.uname" :disabled='true' size="small"></el-input>
            </el-form-item>
            <el-form-item label="注册时间">
                <el-input v-model="rgTime" :disabled='true'  size="small"></el-input>
                 <!-- <span>{{ form.rgTime | timeFlt }}</span> -->
            </el-form-item>
            <el-form-item label="联系电话" prop='tel' >
                <el-input v-model="form.tel" :disabled='flag'  size="small" ></el-input>
            </el-form-item>
            <el-form-item label="真实姓名" >
                <el-input v-model="form.realName" :disabled='flag'  size="small"></el-input>
            </el-form-item>
             <el-form-item label="QQ" >
                <el-input v-model="form.qq" :disabled='flag'  size="small"></el-input>
            </el-form-item>
             <el-form-item label="微信" >
                <el-input v-model="form.wechat" :disabled='flag'  size="small"></el-input>
            </el-form-item>
              <el-button type="primary" class="update" v-if="flag1?false:true" @click="flagOpen">完善/修改</el-button>
              <div class="update"  v-if="flag1">
                   <el-button type="primary"  @click="submit('form')">提交</el-button>
                   <el-button type="primary"  @click="flag=true;flag1=false">取消</el-button>
              </div>
             
        </el-form>
    </div>
</template>
<script>
import {findUser,updateUser} from '@/axios'
export default {
    props:['info'],
    data(){
        return{
            form:{

            },
            flag:true,
            flag1:false,
            rules:{
                 tel:[{required:true,message:'手机号码不能为空',trigger:'change'},
                    {pattern:/^[1][3,4,5,6,7,8,9][0-9]{9}$/ , message: '请出入正确的手机号', trigger: 'blur'}],
            }
        }
    },
    mounted(){
        findUser({id:this.info.id}).then(res=>{
            this.form = res.data
        })
    },
    methods:{
        flagOpen(){
            this.flag = false;
            this.flag1 = true;
        },
        submit(formName){
             this.$refs[formName].validate((valid,object) => {
                if (valid) {
                    console.log(this.form)
                  updateUser(this.form).then(res=>{
                     if(res.code==200){
                         this.$message.success(res.txt)
                     }else{
                         this.$message.error(res.txt)
                     }
                  })
                  this.flag1= false;
                  this.flag= true;
                } else {
                    return false;
                }
                });
        }
    },
    filters:{
        timeFlt:function(value){
           let time= new Date(value);
           return time.getFullYear()+'年'+(time.getMonth()*1+1)+'月'+time.getDate()+'日'+time.getHours()+':'+time.getMinutes();
        }
    },
    computed: {
     rgTime:function(){
            let value = this.form.rgTime
            let time= new Date(value);
           return time.getFullYear()+'年'+(time.getMonth()*1+1)+'月'+time.getDate()+'日'+time.getHours()+':'+time.getMinutes();
          }
      
    }
    
}
</script>