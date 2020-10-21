
<template>
    <div id="wapService">
         <van-nav-bar
        title="用户报修"
        left-arrow
        @click-left="onClickLeft"
        />
        <van-form @submit="onSubmit">
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
                v-model="form.address"
                name="address"
                label="街道地址"
                placeholder="街道地址"
                :rules="[{ required: true, message: '请填写街道地址' }]"
            />
            <van-field
                readonly
                clickable
                label="家电"
                :value="jiadian"
                placeholder="选择家电类型"
                @click="showPicker2 = true"
            />
             <van-popup v-model="showPicker2" round position="bottom">
                <van-picker
                    show-toolbar
                    :columns="jdList"
                    value-key='name'
                    @cancel="showPicker2 = false"
                    @confirm="onConfirm2"
                />
            </van-popup>
             <van-field
                v-model="form.problem"
                name="problem"
                label="出现的问题"
                placeholder="出现的问题"
                type="textarea"
                autosize
                rows="2"
                show-word-limit
                maxlength="50"
                :rules="[{ required: true, message: '请填写出现的问题' }]"
            />
              <van-field
                readonly
                clickable
                label="上门时间"
                :value="goTime"
                placeholder="选择上门时间"
                @click="showPicker3 = true"
                 :rules="[{ required: true, message: '请填写上门时间' }]"
            />
             <van-popup v-model="showPicker3" round position="bottom">
                <van-datetime-picker
                    position="bottom"
                    v-model="currentDate"
                    type="datetime"
                    title="选择完整时间"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="showPicker3 = false"
                    @confirm="onConfirm3"
                />
             </van-popup>
            <van-field
                v-model="form.name"
                name="name"
                label="联系人"
                placeholder="联系人"
                :rules="[{ required: true, message: '请填写联系人' }]"
            />
             <van-field
                v-model="form.phone"
                name="phone"
                label="联系电话"
                placeholder="联系电话"
                :rules="[{ required: true, message: '请填写联系电话' },{pattern:/^[1][3,4,5,6,7,8,9][0-9]{9}$/, message: '请出入正确的手机号'}]"
            />
            <div style="margin:.5rem">
                <van-button round block type="info">提交</van-button>
            </div>
        </van-form>
    </div>
 
</template>
<script>
import {getAppliance,submitOrder,comLog,getCity} from "@/axios"
export default {
    data() {
            return {
            minDate: new Date(),
            maxDate: new Date(2021, 10, 1),
            currentDate:new Date(),
            city: '',
            jiadian:'',
            goTime:'',
            showPicker1:false,
            showPicker2:false,
            showPicker3:false,
            cityList: [],
            jdList:[],
            form:{},
            };
        },
    mounted(){
        getCity().then((res)=>{
            let cityList = res;
            for(let  i in cityList){
            cityList[i].children = cityList[i].city
            delete cityList[i].city;
            for(let k in cityList[i].children ){
                    cityList[i].children[k].children=[]; //声明这是一个数组
                for(let j in cityList[i].children[k].area){
                        cityList[i].children[k].children.push({'name':cityList[i].children[k].area[j]});
                }
                    delete cityList[i].children[k].area;
            }
            }
            this.cityList = cityList
        })
        getAppliance().then(res=>{
            let jdList = res;
            for(let i in jdList){
                jdList[i].children = jdList[i].type;
                delete jdList[i].type;
                this.jdList = jdList
            }
        })
    },
    methods:{
        onClickLeft(){
            this.$router.back()
        },
        onSubmit(value){
            // console.log(value)
            // console.log(this.form)
            // this.form.tjTime = new Date()
            submitOrder({type:'insert',data:this.form}).then(res=>{
                // console.log(res)
                if(res.code==200){
                    this.$toast.success(res.txt+',请等待师傅接单')
                    this.form ={};
                    this.city=null;
                    this.jiadian=null;
                    this.goTime=null;
                }else{
                    this.$toast.fail(res.txt)

                }
            })
        },  
        onConfirm1(value) {
            this.city = value[0]+','+value[1]+','+value[2];
            this.form.province = value[0];
            this.form.city = value[1];
            this.form.area = value[2]
            this.showPicker1 = false;
            // console.log(value)
        },
        onConfirm2(value){
            this.jiadian = value[0]+','+value[1];
            this.form.jdType = value[0];
            this.form.jdBrand = value[1];
            this.showPicker2 = false;
        },
        onConfirm3(value){
            this.goTime = this.timeFlt(value)
            this.form.goTime = new Date(value).getTime()
            // console.log(this.timeFlt(this.form.goTime))
            this.showPicker3 =false;
        },
        timeFlt(value){
          if(value){
            let time= new Date(value);
            function fill(value){
            if(value*1<10){
              return "0"+value
            }else{
              return value
            }
          }
            return time.getFullYear()+'年'+fill(time.getMonth()*1+1)+'月'+fill(time.getDate())+'日'+fill(time.getHours())+':'+fill(time.getMinutes());
          }else{
            return ""
          }
        }
    
    },
    beforeRouteEnter(to,from,next){
        // console.log(to)
        // console.log(from)
        comLog().then(res=>{
            if(res.code==200){
                next();
            }else{
                next(that=>{
                    sessionStorage.setItem("lastPath",to.name)
                    if(that.$cookies.get("user")){
                        that.$cookies.remove("user")
                    }
                    that.$toast("请先登录")
                    that.$router.replace({name:'wapLogin'})
                })
            }
        })
    }
}
</script>