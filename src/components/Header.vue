<template>
  <!-- 头部整体盒子 -->
  <div id="header" class="container-fuild">
    <!-- 电脑导航 -->
    <div class="header-nav hidden-xs">
      <!-- 导航logo -->
      <div class="header-nav-logo">
        <div class="logoBox">
          <img src="@/assets/img/logo_black.png" />
        </div>
        <div class="logo_text">
          <p>中华国际地标发展组织</p>
          <p>Greater International Development Organization</p>
        </div>
      </div>
      <!-- 导航内容 -->
    </div>
    <ul class="header-nav-wrapper">
      <li
        v-for="(item, index) in navList"
        :key="index"
        :class="$route.path == item.path ? 'active' : ''"
        @click="navClick(index, item)"
      >
        <router-link :to="item.path">
          {{ item.name }}
          <span
            v-if="item.children.length > 0"
            class="glyphicon glyphicon-menu-down"
          ></span>
          <i class="underline"></i>
        </router-link>
        <dl v-if="item.children.length > 0">
          <dt v-for="(i, n) in item.children" :key="n">
            <router-link :to="i.path">{{ i.name }}</router-link>
          </dt>
        </dl>
      </li>

      <div class="header-right-manage">
        <div
          :class="[this.$store.state.language == 'CN' ? 'CNS' : 'CN']"
          data-lan="CN"
          @click="changeLanguage(CN)"
        >
          中文
        </div>
        /
        <div
          :class="[this.$store.state.language == 'EN' ? 'CNS' : 'EN']"
          data-lan="EN"
          @click="changeLanguage(EN)"
        >
          English
        </div>
      </div>
    </ul>
    <!-- 手机导航 -->
    <div class="header-nav-m container-fuild visible-xs">
      <div class="miniHeader">
        <img src="../assets/img/logo_black.png" alt="" />
        <p>中华国际地标发展组织</p>
      </div>
      <!-- 导航栏 -->
      <div class="header-nav-m-menu text-center">
        {{ menuName }}
        <div
          class="header-nav-m-menu-wrapper"
          data-toggle="collapse"
          data-target="#menu"
          @click="menuClick"
        >
          <span :class="menuClass"></span>
        </div>
        <!-- 导航内容 -->
        <ul id="menu" class="header-nav-m-wrapper collapse">
          <li
            v-for="(item, index) in navList"
            :key="index"
            :class="index == navIndex ? 'active' : ''"
            @click="navClick(index, item)"
            data-toggle="collapse"
            data-target="#menu"
          >
            <router-link :to="item.path">
              {{ item.name }}
              <i class="underline"></i>
            </router-link>
          </li>

          <div class="header-right-manage">
            <div
              :class="[this.$store.state.language == 'CN' ? 'CNS' : 'CN']"
              data-lan="CN"
              @click="changeLanguage(CN)"
            >
              中文
            </div>
            /
            <div
              :class="[this.$store.state.language == 'EN' ? 'CNS' : 'EN']"
              data-lan="EN"
              @click="changeLanguage(EN)"
            >
              English
            </div>
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Header",
  data() {
    return {
      navIndex: sessionStorage.getItem("navIndex")
        ? sessionStorage.getItem("navIndex")
        : 0,
      menuName: "首页",
      menuClass: "glyphicon glyphicon-menu-down",
      navList: [
        {
          name: "首页",
          path: "/CN/home",
          children: [],
        },
        {
          name: "新闻资讯",
          path: "/CN/newsinformation",
          children: [],
        },
        {
          name: "活动动态",
          path: "/CN/activity",
          children: [],
        },
        {
          name: "地标产品",
          path: "/CN/product",
          children: [
            {
              name: "地标产品",
              path: "/CN/product",
            },
            {
              name: "中国《中欧地理标志保护与合作协定》",
              path: "/CN/Protect",
            },
          ],
        },
        {
          name: "组织成员",
          path: "/CN/member",
          children: [],
        },
        {
          name: "关于我们",
          path: "/CN/About",
          children: [],
        },
      ],
      CN: "CN",
      EN: "EN",
    };
  },
  methods: {
    changeLanguage(lan) {
      console.log(lan);
      this.$store.commit("changeLanguage", lan);
      console.log(this.$store);
    },
    navClick(index, item) {
      this.navIndex = index;
      sessionStorage.setItem("navIndex", index);
      this.menuName = item.name;
      // this.$router.push({ path: item.path });
    },
    menuClick() {
      if (this.menuClass == "glyphicon glyphicon-menu-down") {
        this.menuClass = "glyphicon glyphicon-menu-up";
      } else {
        this.menuClass = "glyphicon glyphicon-menu-down";
      }
    },
  },
};
</script>
<style scoped>
/* 顶部 */
@media screen and (min-width: 1200px) {
  #header {
    background: #ffffff;
    /* transition: all ease 0.6s; */
  }
}
.header-right-manage {
  float: right;
  display: flex;
  width: 200px;
  margin-left: 20px;
  color: white;
  text-align: right;
}
.CN {
  cursor: pointer;
  color: #c4c4c4;
}
.CNS {
  color: #fff;
  font-size: 16px;
}
.EN {
  cursor: pointer;
  color: #c4c4c4;
}
#header .header-top {
  height: 50px;
  color: #fff;
  font-size: 12px;
  line-height: 50px;
  background: #474747;
}
/* 顶部的图标 */
#header .header-top span {
  margin: 0 8px;
}
/* 导航栏 */
#header .header-nav {
  height: 150px;
}
/* 导航栏logo */
#header .header-nav .header-nav-logo {
  height: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-left: 100px;
}
.logoBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.logo_text {
  width: 738px;
  font-size: 30px;
  color: rgb(122, 122, 122);
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: center;
}
.logo_text p {
  margin: 0px;
  color: #2b658f;
}
/* 导航栏logo图片 */
.logoBox img {
  width: 130px;
  height: 130px;
  margin-right: 20px;
}
/* 导航栏 导航容器 */
.header-nav-wrapper {
  line-height: 60px;
  height: 60px;
  background: #001ca7;
  padding: 0px 100px;
}
/* 导航栏 每个导航 */
.header-nav-wrapper > li {
  float: left;
  margin: 0px;
  position: relative;
  color: #fff;
  font-size: 16px;
  text-align: center;
  margin-right: 20px;
}
.header-nav-wrapper > li:hover {
  float: left;
  margin: 0px;
  position: relative;
  background: #17104f;
  font-size: 16px;
  margin-right: 20px;
}
/* 导航栏 每个导航下面的 a 链接 */
.header-nav-wrapper > li > a {
  color: #fff;
  font-size: 15px;
  font-weight: bold;
  padding: 15px 10px;
  position: relative;
  min-width: 80px;
}
/* 导航栏 每个导航下面的 a 链接的下划线 */
.header-nav-wrapper > li > a > i {
  display: block;
  position: absolute;
  bottom: -2px;
  left: 50%;
  width: 0;
  height: 2px;
  opacity: 0;
  transition: all 0.6s ease;
  background-color: #ffffff;
}
/* 导航栏 每个导航下面的 a 链接的右侧小三角 */
.header-nav-wrapper > li > a > span {
  font-size: 12px;
  transition: transform ease 0.5s;
}
.header-nav-wrapper > li > a:hover {
  color: #fff;
  text-decoration: none;
}
/* 导航栏 每个导航下面的 a 链接 鼠标滑上去下划线的样式 */
.header-nav-wrapper > li > a:hover .underline {
  opacity: 1;
  width: 100%;
  left: 0;
}
/* 导航栏 每个导航下面的 a 链接 鼠标滑上去三角标的样式 */
.header-nav-wrapper > li > a:hover span {
  transform: rotate(180deg);
}
/* 导航栏 每个导航下面的 a 链接 鼠标点击后的样式 */
.header-nav-wrapper > li.active > a {
  color: #fff;
  text-decoration: none;
  border-bottom: 2px solid #fff;
}
/* 导航栏 每个导航下面的二级导航容器 */
.header-nav-wrapper > li > dl {
  display: none;
  position: absolute;
  width: 240px;
  top: 80%;
  left: 0;
  z-index: 999999;
  /* box-shadow: 0 0 3px 1px #ccc; */
  background: #004faa;
  color: #fff !important;
}
/* 导航栏 每个导航下面的二级导航容器的每个导航 */
.header-nav-wrapper > li > dl > dt {
  width: 100%;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.header-nav-wrapper > li > dl > dt > a {
  color: #fff;
  font-weight: bold;
  font-size: 16px;
}
/* 导航栏 每个导航下面的二级导航容器的每个导航 当鼠标滑上时的样式*/
.header-nav-wrapper > li > dl > dt > a:hover {
  text-decoration: none;
  color: #fff;
}
/* 导航栏 滑上一级导航显示二级导航 */
.header-nav-wrapper > li:hover dl {
  display: block;
}
.header-nav-wrapper > li > dl > dt:hover {
  cursor: pointer;
  color: #fff;
  background: rgb(0, 19, 145);
}
@media screen and (max-width: 780px) {
  .miniHeader {
    display: flex;
    justify-content: left;
    align-items: center;
    padding: 10px 20px;
  }

  .miniHeader img {
    width: 50px;
    height: 50px;
    display: block;
  }

  .miniHeader p {
    margin-bottom: 0px;
    margin-left: 20px;
    font-size: 20px;
    color: #1d2088;
    font-weight: bold;
  }
  #header .header-nav-m {
    position: relative;
  }
  /* 导航栏logo容器 */
  #header .header-nav-m .header-nav-m-logo {
    height: 80px;
    position: relative;
  }
  /* 导航栏logo图片 */
  #header .header-nav-m .header-nav-m-logo img {
    width: 95px;
    height: 45px;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  /* 导航栏  菜单容器 */
  #header .header-nav-m .header-nav-m-menu {
    color: #fff;
    height: 50px;
    font-size: 20px;
    line-height: 50px;
    background: #001ca7;
    position: relative;
  }
  /* 导航栏 菜单图标 */
  #header .header-nav-m .header-nav-m-menu-wrapper {
    position: absolute;
    top: 50%;
    right: 20px;
    margin-top: -20px;
    width: 50px;
    height: 40px;
    color: #fff;
    z-index: 999999;
    font-size: 12px;
  }
  /* 导航栏 */
  #header .header-nav-m .header-nav-m-wrapper {
    position: absolute;
    top: 50px;
    left: 0;
    width: 100%;
    background: #001ca7;
    z-index: 9999999;
  }
  /* 导航栏 每个导航 */
  #header .header-nav-m .header-nav-m-wrapper > li {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #ccc;
  }
  /* 导航栏 每个导航下面的 a 链接 */
  #header .header-nav-m .header-nav-m-wrapper > li > a {
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    padding: 0px;
    position: relative;
    display: block;
    width: 100%;
  }
  /* 导航栏 每个导航下面的 a 链接的右侧小三角 */
  #header .header-nav .header-nav-wrapper > li > a > span {
    font-size: 10px;
  }
  .header-nav-wrapper {
    display: none;
  }
}
</style>
