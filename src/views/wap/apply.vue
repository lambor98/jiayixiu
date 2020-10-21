<template>
    <div id="wapApply">
        <van-nav-bar
        title="维修工入驻"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-collapse v-model="activeName" accordion>
            <van-collapse-item name="1">
                 <template #title>
                    <div>报名须知<van-icon name="warning"  /></div>
                </template>
                1.报名信息必须真实有效
                <br>
                2.确认贵公司与本司的合作出于自愿，您获得合作效益的同时需依法履行合作的义务。
            </van-collapse-item>
        </van-collapse>
        <van-form @submit="onSubmit">
             <van-field
                v-model="form.uname"
                name="uname"
                label="姓名"
                placeholder="姓名"
                :rules="[{ required: true, message: '请填写用户名' }]"
            />
             <van-field
                readonly
                clickable
                label="城市"
                :value="city"
                placeholder="选择城市"
                @click="showPicker1 = true"
                 :rules="[{ required: true, message: '请选择城市' }]"
            />
            <van-popup v-model="showPicker1" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="cityList"
                    value-key='name'
                    @cancel="showPicker1 = false"
                    @confirm="onConfirm1"
                />
            </van-popup>
             <van-field
                v-model="form.userId"
                name="userId"
                type="number"
                label="身份证号"
                placeholder="身份证号"
                :rules="[{ required: true, message: '请填写身份证号' }
                        ,{validator:rules1,message:'输入正确的身份证号'}]"
            />
              <van-field
                v-model="form.workYear"
                name="workYear"
                type="number"
                label="从业年限"
                placeholder="从业年限"
                :rules="[{ required: true, message: '请填写从业年限' }]"
            />
             <van-field
                readonly
                clickable
                label="可维修的家电"
                :value="jiadian"
                placeholder="可维修的家电(可多选)"
                @click="showPicker2 = true"
                 :rules="[{ required: true, message: '请选择您所擅长维修的家电' }]"
            />
             <van-popup v-model="showPicker2" round position="bottom" @click-overlay="onConfirm2">
                 <div class="topBtn">
                    <div class="topBtn_btn" @click="showPicker2=false">取消</div>
                    <div class="topBtn_btn" @click="onConfirm2">确定</div>
                 </div>
                 <van-checkbox-group v-model="form.myJdType" >
                      <van-cell-group  ref="checkboxGroup">
                             <van-cell
                                v-for="(item, index) in jdList"
                                clickable
                                :key="index"
                                :title="item"
                                @click="toggle(index)"
                                >
                                <template #right-icon>
                                    <van-checkbox :name="item" ref="checkboxes" />
                                </template>
                             </van-cell>
                      </van-cell-group>
                 </van-checkbox-group>
             </van-popup>
             <div class="uploadPic van-hairline--bottom">
                 <div class="uploadPic_left">
                    身份证正面
                 </div>
                 <div class="uploadPic_right">  
                    <van-uploader v-model="idPic1" :max-count="1" :after-read="uploadPic1" />
                </div>
                <p class="uploadPic_tip" v-show="tips1">请上传身份证正面照片</p>
             </div>
             <div class="uploadPic van-hairline--bottom">
                 <div class="uploadPic_left">
                    身份证反面
                 </div>
                 <div class="uploadPic_right">  
                    <van-uploader v-model="idPic2" :max-count="1" :after-read="uploadPic2" />
                </div>
                <p class="uploadPic_tip" v-show="tips2">请上传身份证反面照片</p>
             </div>
            <van-field
                v-model="form.tel"
                name="tel"
                type="number"
                label="手机号码"
                placeholder="手机号码"
                :rules="[{ required: true, message: '请填写手机号码' },{pattern:/^[1][3,4,5,6,7,8,9][0-9]{9}$/ , message: '请出入正确的手机号'}]"
            >
                <template #button>
                    <div class="codeBtn" @click="getCode">
                        {{codeTxt}}
                    </div>
                </template>
            </van-field>
             <van-field
                v-model="form.code"
                name="code"
                type="number"
                label="验证码"
                placeholder="暂时随便填"
                :rules="[{ required: true, message: '请填写验证码' }]"
            />
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">提交</van-button>
            </div>
        </van-form>
    </div>
</template>
<script>
import "@/assets/style/wap/apply.scss"
import {getAppliance,uploadPic,employeeApply,getCity} from "@/axios"
// import {getObjectURL} from '@/tools/function.js'
import lrz from 'lrz'
export default {
    data(){
        return{
            form:{
                myJdType:[]
            },
            activeName:"1",
            showPicker1:false,
            showPicker2:false,
            cityList:[],
            jdList:[],
            city:null,
            jiadian:null,
            fileList:[],
            idPic1:[],
            idPic2:[],
            codeTxt:'点击获取验证码',
            tips1:false,
            tips2:false,
        }
    },
    mounted(){
       this. getCityNow()
        getAppliance().then(res=>{
            for(let i in res){
                this.jdList.push(res[i].name)
            }
            // console.log(res)
        })
    },
    methods:{
        getCityNow(){
             getCity().then(res=>{
                let cityList = res;
                for(let  i in cityList){
                cityList[i].children = cityList[i].city
                delete cityList[i].city;
                }
                this.cityList = cityList
            })
        },
        toggle(index){
             this.$refs.checkboxes[index].toggle();
            //  console.log(this.form.myJdType)
        },
        rules1(val){
            // console.log(val.length)
            if(val.length==18){
                return true  
            }else return false;
        },
         onClickLeft(){
            this.$router.back()
        },
        onSubmit(value){
            // console.log(this.form)
            this.tips1 = !this.idPic1[0]?true:false;
            this.tips2 = !this.idPic2[0]?true:false;
            if(!this.tips1 && !this.tips2){
                 employeeApply(this.form).then(res=>{
                        if(res.code==200){
                            this.$toast.success('提交成功,请等候短信通知');
                            setTimeout(()=>{
                                this.$router.go(0)
                            },1000)
                        }else{
                            this.$taost.fail('提交失败');
                        }
                })
            }
            

        },
        onConfirm1(value){
            // console.log(value)
            this.city = value[0]+','+value[1];
            this.form.province = value[0];
            this.form.city = value[1]
            this.showPicker1 = false
        },
        onConfirm2(){
            this.showPicker2 = false;
            let myJdType =  JSON.parse(JSON.stringify(this.form.myJdType))
            this.jiadian = JSON.stringify(myJdType).replace(/\"/g,'').replace(/\[/g,'').replace(/\]/g,'');
            // this.form.myJdType = this.form.myJdType.split(",");
            console.log(this.form.myJdType)
        },
        // clearCheckBox(){
        //     // console.log(  this.$refs.checkboxGroup)
        //      this.$refs.checkboxes.toggleAll();
        // }
        uploadPic1(files){
            this.tips1 = false;
            this.afterRead(files,1)
        },
        uploadPic2(files){
            this.tips2 = false;
             this.afterRead(files,2)
        },
        afterRead(files,type){
            files.status = 'uploading';
            files.message = '上传中...';
            let file = files.file
            let fileType=file.type?file.type.split("/")[1]:''
              lrz(file,{width:600,height:800,quality:0.6}).then((rst)=>{
                    let base64 = rst.base64;
                    let nameHeader = type==1?'idf_':'idb_'
                    let fileName = nameHeader+new Date().getTime()
                    uploadPic({fileName,base64,fileType}).then(res=>{
                        console.log(res)
                        if(res.code==200){
                            files.status = "done"
                            // files.message = null
                            if(type==1){
                                this.form.idPic1 = res.data.fileName;
                            }else{
                                this.form.idPic2 = res.data.fileName;
                            }
                        }else{
                            files.status = 'failed';
                            files.message = '上传失败';
                        }
                    })
            })
        },
        getCode(){
            let num = 10
            this.codeTxt = num+'秒后再次获取'
            let timer = setInterval(() => {
                num--;
                this.codeTxt = num+'秒后再次获取';
                if(num==0){
                    clearInterval(timer)
                    this.codeTxt = '点击获取验证码'
                }
            }, 1000);
        }
    }
    
}
</script>