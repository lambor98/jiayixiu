import ajax from './axios'


export const PRE_URL = '/ajax'

export const reqLogin = (user) => ajax(PRE_URL+'/login', user, 'post')
export const reqReg = (user) => ajax(PRE_URL+'/register', user, 'post')
export const comLog = (user) => ajax(PRE_URL+'/confirmLog',user, 'post')
export const loginOut = user => ajax(PRE_URL+'/loginOut',user, 'post')
export const getCity = user => ajax(PRE_URL+'/cityList',user, 'get') //获取省市列表
export const getAppliance = user => ajax(PRE_URL+'/applianceList',user, 'get') //获取家电种类
export const submitOrder = data =>ajax(PRE_URL+'/submitOrder',data,'post')//提交维修申请
export const uploadPic = data =>ajax(PRE_URL+'/uploadPic',data,'post')
export const employeeApply = data =>ajax(PRE_URL+'/employeeApply',data,'post')
export const findUser = data =>ajax(PRE_URL+'/findUser',data,'post')
export const updateUser = data =>ajax(PRE_URL+'/updateUser',data,'post')
export const checkPwd = data =>ajax(PRE_URL+'/checkPwd',data,'post')
export const updatePwd = data =>ajax(PRE_URL+'/updatePwd',data,'post')










