// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import imageUrl from "../static/imageUrl";
document.title = sessionStorage.getItem("title") || "中华国际地标发展组织";
/* 路由 */
import router from "./router";
import store from "./store";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
Vue.use(Antd);

/* swiper */
import "swiper/dist/css/swiper.min.css";

/* 重置样式 */
import "./assets/css/reset.min.css";

/* jquery */
import "jquery";

/* bootstarp */
import "./assets/css/bootstrap.min.css";
import "./assets/js/bootstrap.min";

/* animate.css */
import "animate.css";
Vue.use(imageUrl);

/* 头部组件 */
import Header from "./components/Header";
Vue.component(Header.name, Header);
/* 头部组件 */
import Headers from "./components/Headers.vue";
Vue.component(Headers.name, Headers);

/* 尾部组件 */
import Footer from "./components/Footer";
Vue.component(Footer.name, Footer);
/* 尾部组件 */
import Footers from "./components/Footers.vue";
Vue.component(Footers.name, Footers);

/* 回到顶部 */
import GoTop from "./components/GoTop";
Vue.component(GoTop.name, GoTop);

Vue.config.productionTip = false;

router.beforeEach((to, from, next) => {
  next();
});

new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
