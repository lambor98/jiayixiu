<template>
    <div id="myOrder">
        <h4>订单信息</h4>
        <el-form class="searchBox"  :model="search">
            <el-form-item label="订单号">
              <el-input v-model="search.orderId"   :clearable="true"></el-input>
            </el-form-item>
             <el-form-item label="订单状态">
              <el-select v-model="search.type">
                <el-option v-for="(item,index) in options" :key="index" :value="item.type" :label="item.name" >
              </el-option>
              </el-select>
            </el-form-item>
            <el-form-item  label="家电类型" class="selectType">
                <el-select  v-model="search.jdType" placeholder="家电种类"  @change="chooseBrand2">
                    <el-option
                            v-for="(item,index) in applianceList"
                            :key="index"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="家电品牌" class="selectType">
                <el-select  v-model="search.jdBrand" placeholder="家电品牌" >
                    <el-option
                            v-for="(item,index) in brandList"
                            :key="index"
                            :value="item.name">
                            </el-option>
                </el-select>   
            </el-form-item>
            <el-form-item  class="searchBtn">
              <el-button type='primary' size='small' @click="findOrder(1)">查询</el-button>
              <el-button type='primary' size='small' @click="search={},findOrder()">重置</el-button>
            </el-form-item>
        </el-form>
      <el-table
      :data="tableData"
      border
      style="width: 100%">
      <el-table-column
        prop="orderId"
        label="订单号"
        width="130"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="type"
        :show-overflow-tooltip="true"
        label="订单状态"
        align="center"
        width='80'>
        <template slot-scope="scope">
          <span v-if="scope.row.type==1" style="color:green">等待抢单</span>
           <span v-if="scope.row.type==2" style="color:green">正在进行</span>
            <span v-if="scope.row.type==3" >已完成</span>
             <span v-if="scope.row.type==4" style="color:red">有争议</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="联系人"
        width="80"
        :show-overflow-tooltip="true">
      </el-table-column>
      <el-table-column
        prop="dizhi"
        :show-overflow-tooltip="true"
        width="250"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="jiadian"
        :show-overflow-tooltip="true"
        label="家电类型"
        width='100'>
      </el-table-column>
       <el-table-column
        prop="problem"
        :show-overflow-tooltip="true"
        label="维修问题"
        width='100'>
      </el-table-column>
       <el-table-column
        prop="shangmen"
        :show-overflow-tooltip="true"
        label="上门时间"
        width='150'>
      </el-table-column>
       <el-table-column
        prop="worker"
        :show-overflow-tooltip="true"
        label="维修师傅"
        align='center'
        width='100'>
      </el-table-column>

      <el-table-column
      fixed="right"
      label="操作"
       align='center'
      width="80">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
    </el-table>
    <el-pagination
    background
    fixed="right"
    layout="prev, pager, next"
    :current-page='page'
    @current-change="findOrder"
    :page-size=6
    :total="total">
  </el-pagination>
    <el-dialog
    title="订单详情"
    :visible.sync="dialogVisible"
    :close-on-click-modal='false'
    width="700px"
    :before-close="handleClose">
    <div class="infoBox">
    <el-form ref="form" :model="form" :rules='rules' label-width="75px">
        <div class="topStauts">
          <el-form-item label="订单Id:" style='width:200px'>
              <span>{{form.orderId}}</span>
          </el-form-item>
          <el-form-item label="订单状态:" style='width:200px'>
              <span v-if="form.type==1" style="color:green">等待抢单</span>
              <span v-if="form.type==2" style="color:green">正在进行</span>
              <span v-if="form.type==3" >已完成</span>
              <span v-if="form.type==4" style="color:red">有争议</span>
          </el-form-item>
        </div>
        <div class="address_1">
            <el-form-item prop="province" >
                <el-select :disabled='flag'  v-model="form.province" placeholder="省"  style="width:140px"   @change="chooseCity" >
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
                <el-select :disabled='flag' v-model="form.city" placeholder="市"  style="width:140px" @change="chooseArea">
                    <el-option
                            v-for="(item,index) in shi"
                            :key="index"
                            :label="item.name"
                            :value="item">
                            </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="area">
                <el-select :disabled='flag' v-model="form.area" placeholder="区/县" style="width:140px">
                    <el-option
                            v-for="(item,index) in qu"
                            :key="index"
                            :value="item">
                            </el-option>
                </el-select>
            </el-form-item>   
        </div> 
        <el-form-item prop="address" >
        <el-input :disabled='flag' v-model="form.address" placeholder="街道和小区门牌号" required></el-input>
        </el-form-item>
        <div class="goods_1 ">
            <el-form-item  prop="jdType" required>
                <el-select :disabled='flag' v-model="form.jdType" placeholder="家电种类" style="width:240px" @change="chooseBrand">
                    <el-option
                            v-for="(item,index) in applianceList"
                            :key="index"
                            :label="item.name"
                            :value="item">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  prop="jdBrand"  required>
                <el-select :disabled='flag' v-model="form.jdBrand" placeholder="家电品牌" style="width:240px">
                    <el-option
                            v-for="(item,index) in brandList"
                            :key="index"
                            :value="item.name">
                            </el-option>
                </el-select>   
            </el-form-item>
        </div>
        <el-form-item class="problem" prop="problem">
              <el-input :disabled='flag' v-model="form.problem" placeholder="出现的问题"></el-input>
        </el-form-item>
        <el-form-item class="goTime" prop="goTime">
            <el-date-picker
                :disabled='flag'
                style="width:100%"
                v-model="form.goTime"
                format="yyyy 年 MM 月 dd 日 HH 时 mm 分钟"
                type="datetime"
                placeholder="上门时间"
                :picker-options="pickerOptions">>
            </el-date-picker>
        </el-form-item>
        <el-form-item class="customerName" prop="name">
            <el-input :disabled='flag' v-model="form.name" placeholder="联系人姓名"></el-input>
        </el-form-item>
        <el-form-item class="phone"  prop="phone">
            <el-input :disabled='flag' v-model="form.phone" placeholder="联系电话"></el-input>
        </el-form-item>
        <div class="topStauts">
            <el-form-item label="提交时间:" style='width:50%'>
                  <span>{{form.tjTime | timeFlt}}</span>
            </el-form-item>
            <el-form-item label="修改时间:" style='width:50%'>
                  <span>{{form.upTime | timeFlt}}</span>
            </el-form-item>
        </div>
        <el-form-item class="submit">
            <el-button @click="flag=false" v-if="flag">修改</el-button>
            <el-button v-if="flag" @click="deleteOrder">删除</el-button>
            <el-button v-if="!flag" @click="updateOrder('form')">确认</el-button>
            <el-button v-if="!flag" @click="flag=true">返回</el-button>
        </el-form-item>
     
    </el-form>
    </div>
  </el-dialog>

    </div>
</template>
<script>
import {submitOrder,getCity,getAppliance} from"@/axios"
export default {
    
     data() {
        return {
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
          tableData:null, //表格数据
          orderData:null,
          dialogVisible:false, //详情弹窗
          page:1, //当前页数
          total:0, //数据总数
          flag:true, //是否可修改
          search:{
            // type:'全部'
          },//搜索条件
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
            },
            options:[
              {name:'等待抢单',type:'1'},
              {name:'正在进行',type:'2'},
              {name:'已完成',type:'3'},
              {name:'有争议',type:'4'},
              {name:'全部'},

              
            ]
        }
      },
      mounted(){
        getAppliance().then(res=>{ 
          this.applianceList = res
        })
        this.findOrder()
      },
      methods:{
        findOrder(page){
          page = page?page:this.page
          this.page = page?page:this.page
          submitOrder({type:'find',data:{page,search:this.search}}).then(res=>{
            if(res.code==200){
              this.total = res.count
              this.tableData = res.data
            }else{this.$message.error(res.txt)}
        })
        },
        handleClose(){
          this.dialogVisible = false
          this.flag = true; //保持输入框锁定
          // this.tableData = this.orderData
          // console.log(this.orderData)
        },
        handleClick(data){
          this.dialogVisible= true;
          let cityList = this.$store.state.cityList
          Object.keys(cityList).forEach(i=>{
            if(cityList[i].name==data.province){
              // console.log(cityList[i])
              this.shi = cityList[i].city
              // console.log(typeof(this.shi))
               Object.keys(this.shi).forEach(index=>{
                 if(this.shi[index].name==data.city){
                   this.qu = this.shi[index].area
                   return;
                 }
               })
            }
          })
          // let lists = Array.from({...cityList,length:this.$store.state.cityList.length})
          // console.log(cityList)
          // let list = lists.find((item,index)=>{
          //   return item.province == data.province
          // })
          // console.log(list)
          this.form = JSON.parse(JSON.stringify(data))
        },
         chooseCity(item){
            this.form.province = item.name;
            this.form.city = null;
            this.form.area = null;
            this.shi = item.city;
        },
        chooseArea(item){
            this.form.city = item.name;
            if(this.form.area) this.form.area = null;
            this.qu = item.area
        },
        chooseBrand(item){
             if(this.form.jdBrand)this.form.jdBrand=null;
            this.form.jdType = item.name;
            this.brandList = item.type;
        },
        chooseBrand2(item){
            // this.search.jdBrand=null;
            if(this.search.jdBrand)this.search.jdBrand=null;
            this.brandList = item.type;
            this.search.jdType = item.name;
        },
        updateOrder(formName){
          if(this.$store.state.isLogin){
              this.$refs[formName].validate((valid,object) => {
                if (valid) {
                  submitOrder({type:'update',data:this.form}).then(res=>{
                    if(res.code==200){
                      this.$message.success(res.txt);
                      this.flag = true;
                      this.dialogVisible = false;
                      this.findOrder()
                    }else{
                      this.$message.error(res.txt);
                      // if(res.code==400){
                      //    this.$cookies.remove("user");

                      // }
                    }
                  })
                }else{
                  return false
                }

              })
          }else{
              this.$message.error('您未登录');
              this.$router.replace({name:'home'})
          }
        },
        deleteOrder(){
            submitOrder({type:'delete',data:{_id:this.form._id}}).then(res=>{
              console.log(res)
              if(res.code==200){
                this.$message.success(res.txt);
                this.dialogVisible = false;
                this.findOrder();
              }else{
                this.$message.error(res.txt);
              }
            })
        }
   
      },
      filters:{
        timeFlt:function(value){
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
}
</script>