<template>
    <div id="service">
        <h3>快速报修</h3>
        <div class="mainbox">
            <div class="leftbox">
                <div class="note">
                    <img src="@/assets/images/wechat.png" alt="">
                    <p>微信扫一扫 报修更有效</p>
                </div>
            </div>
            <div class="rightbox">
              <el-form ref="form" :model="form" label-width="80px" :rules="rules">
                    <div class="address_1">
                        <el-form-item prop="province">
                            <el-select v-model="form.province" placeholder="省"  style="width:140px"   @change="chooseCity" >
                                    <el-option
                                        v-for="(item,index) in $store.state.cityList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item"
                                    >
                                        </el-option>
                                    </el-select>
                        </el-form-item>
                        <el-form-item prop="city">
                            <el-select v-model="form.city" placeholder="市"  style="width:140px" @change="chooseArea">
                                <el-option
                                        v-for="(item,index) in shi"
                                        :key="index"
                                        :label="item.name"
                                        :value="item">
                                        </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item prop="area">
                            <el-select v-model="form.area" placeholder="区/县" style="width:140px">
                                <el-option
                                        v-for="(item,index) in qu"
                                        :key="index"
                                        :value="item">
                                        </el-option>
                            </el-select>
                        </el-form-item>   
                    </div> 
                    <el-form-item prop="address" class="formbox" >
                    <el-input v-model="form.address" placeholder="街道和小区门牌号" required></el-input>
                    </el-form-item>
                    <div class="goods_1 formbox">
                        <el-form-item  prop="jdType" required>
                            <el-select v-model="form.jdType" placeholder="家电种类" style="width:240px" @change="chooseBrand">
                                <el-option
                                        v-for="(item,index) in applianceList"
                                        :key="index"
                                        :label="item.name"
                                        :value="item">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  prop="jdBrand"  required>
                            <el-select v-model="form.jdBrand" placeholder="家电品牌" style="width:240px">
                                <el-option
                                        v-for="(item,index) in brandList"
                                        :key="index"
                                        :value="item.name">
                                        </el-option>
                            </el-select>   
                        </el-form-item>
                    </div>
                    <el-form-item class="problem formbox" prop="problem">
                         <el-input v-model="form.problem" placeholder="出现的问题"></el-input>
                    </el-form-item>
                    <el-form-item class="goTime formbox" prop="goTime">
                        <el-date-picker
                            style="width:100%"
                            v-model="form.goTime"
                            format="yyyy 年 MM 月 dd 日 HH 时 mm 分钟"
                            type="datetime"
                            placeholder="上门时间"
                            :picker-options="pickerOptions">>
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item class="customerName formbox" prop="name">
                        <el-input v-model="form.name" placeholder="联系人姓名"></el-input>
                    </el-form-item>
                    <el-form-item class="phone formbox"  prop="phone">
                        <el-input v-model="form.phone" placeholder="联系电话"></el-input>
                    </el-form-item>
                    <el-form-item class="submit formbox">
                        <el-button type="primary" style="width:100%;height:50px" @click="submitForm('form')">提交</el-button>
                    </el-form-item>
                </el-form>  
            </div>
        </div>
    </div>
        
</template>
<script>
import "@/assets/style/service.scss"
import {getCity,getAppliance,submitOrder} from "@/axios"

export default {
    data(){
        return{
            rules: { //表单必填
                    province:[{required:true,message:'选择您所在的省', trigger: 'change'}],
                    city:[{required:true,message:'选择您所在的市', trigger: 'change'}],
                    area:[{required:true,message:'选择您所在的区/县', trigger: 'change'}],
                    address:[{required:true,message:'请填写您的具体住址', trigger: 'change'}],
                    jdType:[{required:true,message:'请填写您需要维修家电类型', trigger: 'change'}],
                    jdBrand:[{required:true,message:'请填写您需要维修家电品牌', trigger: 'change'}],
                    problem:[{required:true,message:'请填写您家电的具体问题', trigger: 'change'}],
                    goTime:[{required:true,message:'请填写您方便的上门时间', trigger: 'change'}],
                    name:[{required:true,message:'请填写您的称呼', trigger: 'change'}],
                    phone:[{required:true,message:'手机号码不能为空',trigger:'change'},
                            {pattern:/^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请出入正确的手机号', trigger: 'change'}
                            ],
                },
            form:{
                province:null,//省
                city:null,//市
                area:null,//区
                jdType:null,//家电种类
                jdBrand:null,//家电品牌
            },
                sheng:[],
                shi:[],
                qu:[],
                applianceList:[],//家电品牌种类合集列表
                brandList:[],//家电品牌列表
            pickerOptions:{
                disabledDate(time){
                    return time.getTime() < Date.now()
                }
            }
           
        }
    },
    mounted(){
      getAppliance().then(res=>{ 
          this.applianceList = res
        //   console.log(res)
      })
    // this.$store.dispatch('checkLogin');//检查登陆
        // console.log(this.$cookies.get("user"))
        // if(this.$store.state.isLogin){
        // let obj=this.$cookies.get('user')
        // let {_id:id} = obj
        // console.log(obj)
        // }
    },
    methods:{
        chooseCity(item){
            this.form.province = item.name;
            this.form.city = null;
            this.form.area = null;
            this.shi = item.city;
        },
        chooseArea(item){
            this.form.city = item.name;
            this.form.area = null;
            this.qu = item.area
        },
        chooseBrand(item){
            this.form.jdBrand=null;
            this.form.jdType = item.name;
            this.brandList = item.type;
        },
        submitForm(formName){ //提交
            // function fill(value){
            //     if(value*1<10){
            //     return "0"+value
            //     }else{
            //     return value
            //     }
            // }
            if(this.$store.state.isLogin){
                this.$refs[formName].validate((valid,object) => {
                if (valid) {
                    // let obj = Object.assign(this.$cookies.get("user"),this.form)
                    // console.log(obj)
                    // obj.tjTime = new Date()
                    // this.form.dizhi = this.form.province+'省(市)'+this.form.city+'市'+this.form.area+this.form.address
                    // this.form.jiadian = this.form.jdBrand+this.form.jdType
                    // let date = new Date(this.form.goTime)
                    // this.form.shangmen =date.getFullYear()+'-'+fill((date.getMonth()+1))+'-'+fill(date.getDate())+' '+fill(date.getHours())+':'+fill(date.getMinutes())
                    submitOrder({type:'insert',data:this.form}).then(res=>{
                        if(res.code==200){
                        this.$message({message:'提交成功', type: 'success' });
                        setTimeout(()=>{
                            this.$router.go(0)
                        },1000)
                        }else{
                        this.$message.error(res.txt);
                        }
                    })
                } else {
                    console.log(object);
                    return false;
                }
                });
            }else{
                this.$store.state.dialogVisible = true
            }
        }
    }    
}
</script>
