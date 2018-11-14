import "babel-polyfill";
import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./store";
import filters from "./utils/filters";
import EventBuilder from "utils/eventbuilder";
import "less/main.scss";
import {
  Button,
  Select,
  Row,
  Alert,
  Table,
  TableColumn,
  Col,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber
} from "element-ui";

Vue.use(Button);
Vue.use(Select);
Vue.use(Row);
Vue.use(Alert);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Col);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Input);
Vue.use(InputNumber);

window.Vue = Vue;
EventBuilder($);
// Vue.use(ElementUI);

router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});
//实例化Vue的filter
Object.keys(filters).forEach(k => Vue.filter(k, filters[k]));
//登录验证
router.beforeEach((to, from, next) => {
  next();
});

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
