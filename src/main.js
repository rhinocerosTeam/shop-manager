import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import filters from "./utils/filters";
import EventBuilder from "utils/eventbuilder";
import Local from "utils/local";
import "scss/main.scss";
import api from "api";
import {
  Button,
  Select,
  cascader,
  loading,
  Tag,
  Row,
  Steps,
  step,
  Alert,
  Table,
  TableColumn,
  Col,
  Card,
  Popover,
  Menu,
  Submenu,
  Form,
  FormItem,
  option,
  MenuItem,
  MenuItemGroup,
  Input,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Header,
  Aside,
  Main,
  Footer,
  Container,
  Pagination,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Tabs,
  TabPane,
  InputNumber,
  Dialog,
  Loading,
  Radio,
  RadioGroup,
  RadioButton,
  MessageBox,
  Message,
  Notification
} from "element-ui";

Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Steps);
Vue.use(step);
Vue.use(Alert);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Col);
Vue.use(Tag);
Vue.use(Card);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);
Vue.use(Dropdown);
Vue.use(DropdownMenu);
Vue.use(DropdownItem);
Vue.use(Popover);
Vue.use(Footer);
Vue.use(Main);
Vue.use(Aside);
Vue.use(Header);
Vue.use(Container);
Vue.use(Pagination);
Vue.use(option);
Vue.use(CheckboxGroup);
Vue.use(CheckboxButton);
Vue.use(Checkbox);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Dialog);
Vue.use(loading);
Vue.use(Radio);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(cascader);
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;
Vue.prototype.$loading = Loading.service;

window.Vue = Vue;
EventBuilder($);
// Vue.use(ElementUI);
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});
let hasUserInfo = false;
//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
let eleVue = new Vue();
window.eleVue = eleVue;

function loadUI(params) {
  eleVue.ajaxing = eleVue.$loading({
    fullscreen: true,
    lock: true,
    text: '正在获取用户信息...',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.1)',
    customClass: 'loadingC'
  })
}
//登录验证
router.beforeEach(async (to, from, next) => {
  /**
   * 上架和下架监听页面离开
   * 宋佩兰
   *

  let nextFlag = false

  if (from.path == '/waresManage/downWares' || from.path == '/waresManage/upWares') {
    await new Vue().$confirm('是否离开此页面，所填信息将不予保存', '提示', {
      confirmButtonText: '离开',
      cancelButtonText: '取消',
      type: 'warning'
    }).then(() => {
      nextFlag = true
    }).catch(() => {
      nextFlag = false
    });
    if (!nextFlag) {
      return
    }
  }
   */

  if (to.path == "/login" || to.path == "/dianprotocol") {
    hasUserInfo = false;
    store.dispatch("loginOut");
    next();
    return;
  }
  let userInfo = store.state.userInfo || null;


  if (userInfo && userInfo.token) {
    // if (!hasUserInfo) {
    //   loadUI()
    //   let data = await api.getUserByParam(userInfo.token).catch(err => {
    //     eleVue.$message.error("获取用户信息失败,请重新登录");
    //   });
    //   if (data && data.code == 1000 && data.data && data.data.user) {
    //     hasUserInfo = true;
    //     store.dispatch("loginIn", data.data.user);
    //     eleVue.ajaxing.close()
    //     next();
    //   } else {
    //     eleVue.$message.error("获取用户信息失败,请重新登录");
    //     store.dispatch("loginOut");
    //     eleVue.ajaxing.close()
    //     next({
    //       path: "/login"
    //     });
    //   }
    // } else {
      next();
   // }

    //return;
  } else {
    next({
      path: "/login"
    });
  }
});
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});

