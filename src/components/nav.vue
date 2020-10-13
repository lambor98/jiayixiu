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
            <router-link tag="div"  class="navBtn" :to="{name:'Apply'}">维修工入驻</router-link>
            <!-- <div class="navBtn">
                维修工入驻
            </div> -->
            <div class="navBtn">
                服务商入驻
            </div>
          </div>
          <!-- <div class="navTel">
            <p>服务热线：0000-0000-0000</p>
          </div> -->
          <div class="loginBtn" >
            <div class="log-reg" v-if="!this.$store.state.isLogin" @click="$store.state.dialogVisible=true">
                 登陆/注册
            </div>
            <div class="user-box" v-if="this.$store.state.isLogin">
              <router-link tag="p" :to="{name:'userCenter'}">{{this.$store.state.username}}</router-link>
              <!-- <p></p> -->
              <p @click="logOut">退出登录</p>
            </div>
          </div>
         
        </div>
        <el-dialog
          title="欢迎登录家易修"
          :visible.sync="$store.state.dialogVisible"
          :close-on-click-modal='false'
          width="400px"
         >
        <el-form ref="form" :model="loginForm" label-width="40px" v-if="logbox">
            <el-form-item label="账号" style="width:340px">
              <el-input v-model="loginForm.uname" size="medium"></el-input>
            </el-form-item>
             <el-form-item label="密码"  style="width:340px">
              <el-input v-model="loginForm.pwd" show-password size="medium"></el-input>
            </el-form-item>
            <div class="btnBox">
                <el-button type="danger" size="small" @click="login">登录</el-button>
                <el-button type="primary" size="small" @click="regbox=true;logbox=false">注册账号</el-button>
            </div>
        </el-form>
        <el-form ref="form" :model="regForm" label-width="80px" v-if="regbox">
            <el-form-item label="输入账号" style="width:340px">
              <el-input v-model="regForm.uname" size="medium" placeholder="以字母开头的6位组成" ></el-input>
            </el-form-item>
             <el-form-item label="输入密码"  style="width:340px">
              <el-input v-model="regForm.pwd"  show-password size="medium" placeholder="6-12位字母数字组成"></el-input>
            </el-form-item>
             <el-form-item label="确认密码"  style="width:340px">
              <el-input v-model="regForm.pwd1" show-password size="medium" placeholder="确认密码"></el-input>
            </el-form-item>
              <el-form-item label="手机号码" style="width:340px">
              <el-input v-model="regForm.tel" size="medium" placeholder="输入手机号"></el-input>
            </el-form-item>
            <div class="btnBox">
                <el-button type="danger" size="small" @click="register">注册</el-button>
                <el-button type="primary" size="small" @click="regbox=false;logbox=true">返回</el-button>
            </div>
        </el-form>
    
        </el-dialog>

      </div>
</template>
<script>
import "@/assets/style/common/nav.scss"
import {reqLogin,reqReg,comLog,loginOut} from "@/axios"
import axios from 'axios'
export default {
  data(){
    return{
      // dialogVisible:false,
      loginForm:{},
      regForm:{},
      regbox:false,
      logbox:true,
      isLogin:false,
      username:null,
    }
  },
  mounted(){
    // if(this.$cookies.get("user")){
    //     // comLog(this.$cookies.get("user")).then(res=>{
    //     //  if(res.code==400){
    //     //    this.$cookies.remove("user")
    //     //  }
    //     // })
    //   this.username = this.$cookies.get("user").uname;
    //   this.isLogin = true
    // }
    this.$store.dispatch('checkLogin');
    this.$store.dispatch('getCityList');

  
  },
  methods:{
    login(){
      // axios.post("http://localhost:8888/ajax/login",this.loginForm).then(res=>{
      //   console.log(res)
      // })
      reqLogin(this.loginForm).then(res=>{
          // console.log(res)
          if(res.code==200){
              this.$message({message: res.txt,type: 'success'});
              // console.log(res.data)
              let {id,uname,pwd,tel} = res.data
              this.$cookies.set('user',{id,uname,tel},'7d')
              this.$store.state.dialogVisible = false;
              this.isLogin = true
              this.username = res.data.uname;
              this.$store.commit('loginName', {uname:res.data.uname,flag:true})
              //  comLog(this.$cookies.get("user")).then(res=>{
              //   console.log(res)
              // })
          }else{
              this.$message({message: res.txt,type: 'warning'});
          }
      })
    },
    register(){
      if(this.regForm.pwd && this.regForm.pwd1 && this.regForm.uname && this.regForm.tel){
        if(this.regForm.pwd == this.regForm.pwd1){
             reqReg(this.regForm).then(res=>{
                if(res.code==200){
                  this.$message({message: res.txt,type: 'success'});
                  this.regbox=false;
                  this.logbox=true
                }else{
                    this.$message({message: res.txt,type: 'warning'});
                }
            })
        }else{
          this.$message("两次密码需要相同")
        }
        
      }else{
        this.$message("请完整填写信息")
      }
       
    },
    logOut(){ 
       this.$confirm('您即将退出登录，是否继续', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            loginOut().then(res=>{
            if(res.code== 200){
              this.$message.success("成功退出!")
              this.$cookies.remove("user")
              this.$store.commit("loginName",{uname:null,flag:false})
              this.$router.push({name:"home"})
            }
          })
        }).catch(e=>e)
     
    }
  }
    
}
</script>