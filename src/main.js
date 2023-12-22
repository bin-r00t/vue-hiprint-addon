import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VueClodopView from "../packages/index";
import App from "./App.vue";

Vue.use(ElementUI);
Vue.use(VueClodopView);
Vue.config.productionTip = false;

import { autoConnect, disAutoConnect } from "vue-plugin-hiprint";
disAutoConnect();

new Vue({
  render: (h) => h(App),
}).$mount("#app");
