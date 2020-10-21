import Vue from 'vue'
import App from './index.vue'
import axios from "axios"
import router from "./router"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from "./vuex/index"
import VueCookies from 'vue-cookies';
// import Vant from 'vant';
// import 'vant/lib/index.css';
import $ from 'jquery'
axios.defaults.withCredentials = true; 
axios.defaults.crossDomain = true;
axios.defaults.dataType = 'json';
Vue.use(VueCookies)
Vue.use(ElementUI);
import {Button,Swipe,Picker,Divider ,List ,Uploader ,Empty ,Tab, Tabs,Image as VanImage ,Icon, Cell,CellGroup,Checkbox, CheckboxGroup ,Collapse, CollapseItem,DatetimePicker,Popup,SwipeItem,Tabbar, TabbarItem,Grid, GridItem,NoticeBar,NavBar,Form,Field,Toast,} from "vant"
Vue.use(Button)
Vue.use(List)
Vue.use(Divider)
Vue.use(Empty)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(Icon)
Vue.use(Checkbox)
Vue.use(CheckboxGroup)
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(VanImage);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Grid);
Vue.use(NoticeBar);
Vue.use(GridItem);
Vue.use(NavBar);
Vue.use(Form);
Vue.use(Field);
Vue.use(Picker);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Popup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(DatetimePicker);
Vue.use(Uploader);
Vue.use(Toast);
// Vue.prototype.$toast = Toast;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
