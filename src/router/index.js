import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);
import store from "../store/index";
export default new Router({
  routes: [
    {
      path: "*",
      redirect: "/"
    },
    {
      path: "/",
      name: "PageView",
      component: resolve => require(["@/view/PageView"], resolve),
      children: [
        {
          path: "/",
          redirect: "/CN/home"
        },
        {
          path: "/CN/home",
          name: "home",
          component: resolve => require(["@/view/CN/HomePage"], resolve),
          meta: {
            title: "首页"
          }
        },
        {
          path: "/CN/activity",
          name: "activity",
          component: resolve => require(["@/view/CN/activity"], resolve),
          meta: {
            title: "组织活动"
          }
        },
        {
          path: "/CN/newsinformation",
          name: "newsinformation",
          component: resolve => require(["@/view/CN/News"], resolve),
          meta: {
            title: "新闻动态"
          }
        },
        {
          path: "/CN/product",
          name: "product",
          component: resolve => require(["@/view/CN/product"], resolve),
          meta: {
            title: "地标产品"
          }
        },
        {
          path: "/CN/Protect",
          name: "Protect",
          component: resolve => require(["@/view/CN/Protect"], resolve),
          meta: {
            title: "中国《中欧地理标志保护与合作协定》"
          }
        },
        {
          path: "/CN/member",
          name: "member",
          component: resolve => require(["@/view/CN/member"], resolve),
          meta: {
            title: "组织成员"
          }
        },
        {
          path: "/CN/about",
          name: "About",
          component: resolve => require(["@/view/CN/About"], resolve),
          meta: {
            title: "关于我们"
          }
        },
        {
          path: "/CN/newsDetail",
          name: "newsDetail",
          component: resolve => require(["@/view/CN/NewsDetail"], resolve),
          meta: {
            title: "新闻详情"
          }
        },
        {
          path: "/CN/activityDetails",
          name: "activityDetails",
          component: resolve => require(["@/view/CN/activityDetails"], resolve),
          meta: {
            title: "活动详情"
          }
        },
        {
          path: "/CN/productDetail",
          name: "productDetail",
          component: resolve => require(["@/view/CN/productDetail"], resolve),
          meta: {
            title: "产品详情"
          }
        },

        {
          path: "/EN/home",
          name: "home",
          component: resolve => require(["@/view/EN/HomePage"], resolve),
          meta: {
            title: "Home"
          }
        },

        {
          path: "/EN/activity",
          name: "activity",
          component: resolve => require(["@/view/EN/activity"], resolve),
          meta: {
            title: "组织活动"
          }
        },
        {
          path: "/EN/newsinformation",
          name: "newsinformation",
          component: resolve => require(["@/view/EN/News"], resolve),
          meta: {
            title: "新闻动态"
          }
        },
        {
          path: "/EN/product",
          name: "product",
          component: resolve => require(["@/view/EN/product"], resolve),
          meta: {
            title: "地标产品"
          }
        },
        {
          path: "/EN/member",
          name: "member",
          component: resolve => require(["@/view/EN/member"], resolve),
          meta: {
            title: "Member"
          }
        },
        {
          path: "/EN/about",
          name: "About",
          component: resolve => require(["@/view/EN/About"], resolve),
          meta: {
            title: "关于我们"
          }
        },
        {
          path: "/EN/newsDetail",
          name: "newsDetail",
          component: resolve => require(["@/view/EN/NewsDetail"], resolve),
          meta: {
            title: "新闻详情"
          }
        },
        {
          path: "/EN/activityDetails",
          name: "activityDetails",
          component: resolve => require(["@/view/EN/activityDetails"], resolve),
          meta: {
            title: "活动详情"
          }
        },
        {
          path: "/EN/productDetail",
          name: "productDetail",
          component: resolve => require(["@/view/EN/productDetail"], resolve),
          meta: {
            title: "产品详情"
          }
        }
      ]
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return {
        x: 0,
        y: 0
      };
    }
  }
});
