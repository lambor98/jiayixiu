<template>
    <div id="apply">
        <el-form class="fomrbox" :model="form" :rules="rules" label-width="100px" ref="form">
            <h1 class="title">维修工在线报名</h1>
            <div class="mainbox">
                <div>
                    <h2 class="tip_title">报名须知</h2>
                    <p>1.报名信息必须真实有效；</p>
                    <p>2.确认贵公司与本司的合作出于自愿，您获得合作效益的同时需依法履行合作的义务。</p>
                </div>
                <div>
                    <h2 class="tip_title">报名信息</h2>
                    <el-form-item label="姓名" prop="uname">
                        <el-input v-model="form.uname"></el-input>
                    </el-form-item> 
                    <div class="pro_city" >
                        <p>*  服务城市</p>
                        <el-form-item prop="province" class="province">
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
                        <el-form-item prop="city" class="city">
                            <el-select v-model="form.city" placeholder="市"  style="width:140px" @change="chooseArea">
                                <el-option
                                        v-for="(item,index) in shi"
                                        :key="index"
                                        :label="item.name"
                                        :value="item">
                                        </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                      <el-form-item label="身份证号" prop="userId" >
                        <el-input v-model="form.userId"></el-input>
                    </el-form-item>
                    <el-form-item label="从业年限" prop="workYear" >
                        <el-input v-model="form.workYear"></el-input>
                    </el-form-item>
                    <div class="picBox">
                            <p>* 身份证正面照(支持JPG和PNG)</p><span class="tip1 tip" v-show="flag1">您还未上传照片</span>
                            <img :src="IdFont" alt="" @click="open(1)">
                            <input accept="image/*" name="img" id="imgFile" type="file" v-show="2>3" data-id=1 @change="upload">
                    </div>
                     <div class="picBox">
                            <p>* 身份证背面照(支持JPG和PNG)</p><span class="tip2 tip"  v-show="flag2">您还未上传照片</span>
                            <img :src="IdBehind" alt="" @click="open(2)">
                            <input accept="image/*" name="img" id="imgFile2" type="file" v-show="2>3" data-id=2 @change="upload">
                    </div>
                    <el-form-item label="我擅长维修的家电(可多选)" prop="myJdType" class="myJdType">
                         <el-checkbox-group v-model="form.myJdType">
                            <el-checkbox 
                                v-for="(item,index) in applianceList"
                                :key="index"
                                :label="item.name"
                                :value="item.name" name="type"></el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="手机号码" prop='tel'>
                        <el-input v-model="form.tel"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" id="submit" @click="submit('form')">提交</el-button>
                    </el-form-item>
                </div>
            </div>

        </el-form>
    </div>
</template>
<script>
import '@/assets/style/apply.scss'
import {getObjectURL} from '@/tools/function.js'
import {uploadPic,getAppliance,employeeApply} from "@/axios"
import lrz from 'lrz'
export default {
    data(){
        return{
            test:null,
            form:{
                uname:null,
                province:[],
                city:[],
                userId:null,
                workYear:null,
                idPic1:null,
                idPic2:null,
                myJdType:[],
                
            },
            flag1:false,
            flag2:false,
            applianceList:null,
            IdFont:require('../../assets/images/upload_1.png'),
            IdBehind:require('../../assets/images/upload_1.png'),
            rules:{
                uname:[{required:true,message:'请输入您的姓名',trigger:'change'}],
                province:[{required:true,message:'选择您所在的省',trigger: 'blur' ,trigger: 'change'}],
                city:[{required:true,message:'选择您所在的市', trigger: 'blur',trigger: 'change'}],
                userId:[{required:true,message:'请输入您的身份证',trigger:'change'},
                        {max:18,min:18,message:'输入正确的身份证号'}],
                workYear:[{required:true,message:'请输入您的从业年限',trigger:'change'},
                        {type:'number',message:'请输入数字',trigger:'blur', transform: (value) => Number(value)}],
                imageUrl:[{required:true,message:'上传您的身份证照片',trigger:'change'}],
                myJdType:[{required:true,message:'选择您擅长修理的家电',trigger:'change'}],
                tel:[{required:true,message:'手机号码不能为空',trigger:'change'},
                            {pattern:/^[1][3,4,5,6,7,8,9][0-9]{9}$/ , message: '请出入正确的手机号', trigger: 'blur'}
                            ],
                    
            },
            shi:[]
        }
    },
    mounted(){
        getAppliance().then(res=>{
            this.applianceList = res
        })
    },
    methods:{
        checkPic(){
            this.flag1= this.form.idPic1?false:true
            this.flag2=this.form.idPic2?false:true
        },
        open(type){
            if(type==1){
                document.getElementById("imgFile").click();
            }else{
                 document.getElementById("imgFile2").click();
            }
           
        },
        upload(e){
            let type = e.currentTarget.getAttribute("data-id")
            let file = e.currentTarget.files[0];
            let fileType=file.type?file.type.split("/")[1]:''
            if(fileType=='jpeg' || fileType=='png'){
                lrz(file,{width:600,height:800,quality:0.6}).then((rst)=>{
                    let base64 = rst.base64;
                    let nameHeader = type==1?'idf_':'idb_'
                    let fileName = nameHeader+new Date().getTime()
                    uploadPic({fileName,base64,fileType}).then(res=>{
                        console.log(res)
                        if(res.code==200){
                            if(type==1){
                                this.IdFont = getObjectURL(file);
                                this.form.idPic1 = res.data.fileName;
                                this.checkPic();//消除提示
                            }else{
                                this.IdBehind = getObjectURL(file);
                                this.form.idPic2 = res.data.fileName;
                            }
                        }else{
                            this.$message.error(res.txt)
                        }
                    })
                   
            })
            }else{
                this.$message.error('只支持jpg以及png格式的图片');
                document.getElementById("imgFile").value = null //清空input的缓存
            }
        },
        chooseCity(item){
            this.form.province = item.name;
            this.form.city = null;
            this.shi = item.city;
        },
        chooseArea(item){
            this.form.city = item.name;
        },
        submit(formName){
              this.checkPic()
             this.$refs[formName].validate((valid,object) => {
                if (valid) {
                    employeeApply(this.form).then(res=>{
                        if(res.code==200){
                            this.$message.success('提交成功');
                            this.$router.go(0)
                        }else{
                            this.$message.error('提交失败');
                        }
                    })
                } else {
                    return false;
                }
                });
        },

    }
    
}
</script>