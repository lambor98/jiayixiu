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
              <el-form ref="form" :model="form" label-width="80px">
                    <div class="address_1 formbox">
                        <el-select v-model="form.value" placeholder="省"  style="width:160px">
                                <el-option
                                    v-for="item in form.sheng"
                                    :key="item"
                                    :value="item">
                                    </el-option>
                                </el-select>
                        <el-select v-model="form.value" placeholder="市"  style="width:160px">
                            <el-option
                                    v-for="item in form.shi"
                                    :key="item"
                                    :value="item">
                                    </el-option>
                        </el-select>
                        <el-select v-model="form.value" placeholder="区/县" style="width:160px">
                            <el-option
                                    v-for="item in form.qu"
                                    :key="item"
                                    :value="item">
                                    </el-option>
                        </el-select>
                    </div>
                    <div class="address_2 formbox">
                    <el-input v-model="form.address" placeholder="街道和小区门牌号"></el-input>
                    </div>
                    <div class="goods_1 formbox">
                        <el-select v-model="form.value" placeholder="家电种类" style="width:250px">
                            <el-option
                                    v-for="item in form.type"
                                    :key="item"
                                    :value="item">
                            </el-option>
                        </el-select>
                         <el-select v-model="form.value" placeholder="家电品牌" style="width:250px">
                            <el-option
                                    v-for="item in form.product"
                                    :key="item"
                                    :value="item">
                                    </el-option>
                        </el-select>   
                    </div>
                    <div class="problem formbox">
                         <el-input v-model="form.problem" placeholder="出现的问题"></el-input>
                    </div>
                    <div class="goTime formbox">
                        <el-date-picker
                            style="width:100%"
                            v-model="form.goTime"
                            format="yyyy 年 MM 月 dd 日 hh 时 mm 分钟"
                            type="datetime"
                            placeholder="上门时间">
                        </el-date-picker>
                    </div>
                    <div class="customerName formbox">
                        <el-input v-model="form.name" placeholder="联系人姓名"></el-input>
                    </div>
                    <div class="phone formbox">
                        <el-input v-model="form.phone" placeholder="联系电话"></el-input>
                    </div>
                    <div class="submit formbox">
                        <el-button type="primary" style="width:100%;height:50px">提交</el-button>
                    </div>
                </el-form>  
            </div>
        </div>
    </div>
        
</template>
<script>
import "@/assets/style/service.scss"

export default {
    data(){
        return{
            form:{
                sheng:[],
                shi:[],
                qu:[]
            },
           
        }
    }

    
}
</script>