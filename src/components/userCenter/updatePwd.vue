<template>
    <div id="updatePwd">
        <h4>修改密码</h4>
       <el-form ref="pwd" :model='pwd' label-width="80px" style="width:300px" :rules="rule"  v-if="flag?false:true">
            <el-form-item label="原密码" prop='orgPwd'>
                <el-input v-model="pwd.orgPwd" size="small" show-password></el-input> 
            </el-form-item>
             <el-form-item>
                <el-button type="primary" @click="onSubmit('pwd')">确认</el-button>
            </el-form-item>
       </el-form>
        <el-form ref="form" :model="form" label-width="80px" style="width:300px" :rules="rules" v-show="flag" >
             <el-form-item label="新密码" prop='newPwd'>
                <el-input v-model="form.newPwd" size="small" show-password autocomplete="off"> </el-input>
            </el-form-item> 
            <el-form-item label="重复密码" prop='comPwd'>
                <el-input v-model="form.comPwd" size="small" show-password autocomplete="off"></el-input>
            </el-form-item> 
            <br>
              <el-form-item>
                <el-button type="primary" @click="updatePwd('form')">确认</el-button>
                <el-button type="primary" @click="flag=false">取消</el-button>
            </el-form-item>
       </el-form>
    </div>
</template>
<script>
import {checkPwd,updatePwd,loginOut} from '@/axios'
export default {
    
    data(){
        const validatePass = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入新密码'));
            } else if (value.toString().length < 6 || value.toString().length > 12) {
                callback(new Error('密码长度为6 - 12个字符'))
            } else {
                callback();
            }
        };
         const validatePass1 = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请再次输入密码'));
            } else if (value != this.form.newPwd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
            callback();
            }
        };
        return{
            rules:{
               newPwd:[{ required: true, validator:validatePass, trigger: 'blur' }],
                comPwd:[{ required: true, validator:validatePass1, trigger: 'blur' }]
            },
            rule:{
                  orgPwd:[{required:true,message:'密码不可为空',trigger:'blur'},
                  {max:12,min:6,message:'密码为6-12位'}]
            },
            pwd:{
                orgPwd:null
            },
            form:{
                newPwd:null,
                comPwd:null
            },
            flag:false
        }
      
    },
    methods:{
        onSubmit(formName){
              this.$refs[formName].validate((valid,object) => {
                if (valid) {
                        let pwd = this.pwd.orgPwd
                        checkPwd({pwd}).then(res=>{
                        if(res.code==200){
                            this.flag = true
                        }else if(res.code ==500){
                            this.$message.error(res.txt)
                            setTimeout(()=>{
                            this.$router.replace({name:'home'})
                            },1000)
                        }else{  
                            this.$message.error(res.txt)
                        }

                        })
                }else{
                    return false
                }
            })
        
        },
        updatePwd(formName){
            this.$refs[formName].validate((valid,object)=>{
                if(valid){
                    updatePwd({pwd:this.form.newPwd}).then(res=>{
                        if(res.code ==200){
                            this.$message.success(res.txt+'，请重新登录')
                            setTimeout(()=>{
                                 loginOut().then(res=>{
                                    if(res.code== 200){
                                    this.$cookies.remove("user")
                                    this.$store.commit("loginName",{uname:null,flag:false})
                                    this.$router.replace({name:'home'})
                                    }
                                })
                            },1000)
                        }else{
                              this.$message.error(res.txt)
                        }
                    })
                }else{
                    return false
                }
            })
        }
    }
}
</script>