<template>
  <div id="NewsInformation">
    <div class="banner container-fuild text-center">组织活动</div>

    <div class="container">
      <!-- <div class="container text-center">
               
            </div> -->
      <div class="nav container text-center">
        <div class="active"></div>
      </div>
      <a-spin :spinning="showLoading" size="large">
        <ul class="news-container container-fuild">
          <li v-for="(item, index) in newsList" :key="index" class="wow fadeIn">
            <div class="content" @click="gotoActivityDetails(item.id)">
              <div class="news_image">
                <img :src="getImageUrl(item.image)" />
              </div>
              <div>
                <p class="activity_title">{{ item.title }}</p>
                <p class="activity_content">{{ item.introduct }}</p>
              </div>
            </div>
            <div class="time">
              <p>{{ item.year }}</p>
              <span>{{ item.createTime }}</span>
            </div>
            <div class="circle">
              <img src="../../assets/img/circle.png" />
              <i class="line center-block"></i>
            </div>
          </li>
        </ul>
      </a-spin>
      <div class="contaianer-fuild text-center more">
        <i class="glyphicon glyphicon-th"></i>
      </div>
      <!--分页-->
      <div class="page_barBox">
        <div class="page-bar">
          <ul>
            <li v-if="cur > 1">
              <a v-on:click="cur--, pageClick()">上一页</a>
            </li>
            <li v-if="cur == 1"><a class="banclick">上一页</a></li>
            <li
              v-for="index in indexs"
              v-bind:class="{ active: cur == index }"
              :key="index"
            >
              <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="cur != all">
              <a v-on:click="cur++, pageClick()">下一页</a>
            </li>
            <li v-if="cur == all"><a class="banclick">下一页</a></li>
            <li>
              <a
                >共<i>{{ all }}</i
                >页</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
import { findAllArticles, GoTop } from "../../server/api";
export default {
  name: "NewsInformation",
  data() {
    return {
      showLoading: true,
      newsList: [],
      all: 10, //总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数
    };
  },
  methods: {
    getActivitys() {
      findAllArticles({
        language: 0,
        type: 2,
        pageSize: 6,
        pageNum: this.cur,
      }).then((res) => {
        if (res) {
          this.showLoading = false;
          for (let item of res.data) {
            item.createTime = item.createTime.substring(0, 10);
            item.year = item.createTime.substring(0, 4);
          }

          this.newsList = res.data;
          this.all = res.count;
        }
      });
    },
    gotoActivityDetails(id) {
      this.$router.push({ path: "/CN/activityDetails", query: { id: id } });
    },
    //分页
    btnClick: function (data) {
      //页码点击事件
      this.showLoading = true;
      if (data != this.cur) {
        this.cur = data;
      }
      GoTop();
      //console.log(this.cur);
      this.getActivitys();
    },
    pageClick: function () {
      this.showLoading = true;
      //console.log(this.cur);
      GoTop();
      this.getActivitys();
    },
  },
  computed: {
    //分页
    indexs: function () {
      var left = 1;
      var right = this.all;
      var ar = [];
      if (this.all >= 5) {
        if (this.cur > 3 && this.cur < this.all - 2) {
          left = this.cur - 2;
          right = this.cur + 2;
        } else {
          if (this.cur <= 3) {
            left = 1;
            right = 5;
          } else {
            right = this.all;
            left = this.all - 4;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    },
  },
  mounted() {
    this.getActivitys();
    var wow = new WOW();
    wow.init();
  },
};
</script>
<style scoped>
.banner {
  color: #fff;
  font-size: 30px;
  height: 150px;
  line-height: 150px;
  background-image: url("../../assets/img/banner_events.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
.nav {
  margin: 20px 0;
}
.nav > a {
  display: inline-block;
  text-decoration: none;
  width: 120px;
  height: 45px;
  line-height: 45px;
  color: #333;
  border: 1px solid #333;
}
.nav > a.active {
  color: #1e73be;
  border-color: #1e73be;
}
.nav > a:hover {
  color: #1e73be;
  border-color: #1e73be;
}
.news-container {
  overflow: hidden;
  margin-bottom: 0;
  min-height: 600px;
}
.news-container > li {
  width: 55.6%;
  height: 120px;
  float: left;
  color: #333;
  text-align: right;
  border-left: 1px solid transparent;
  border-right: 1px solid transparent;
}
.activity_title {
  font-size: 16px;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.activity_content {
  font-size: 14px;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.news-container > li:hover {
  color: #1e73be;
  border: 1px solid #1e73be;
  cursor: pointer;
}
.news-container > li:nth-of-type(2n) {
  float: right;
  text-align: left;
}
.news-container > li > .content {
  width: 60%;
  float: left;
  padding: 20px 0;
}
.news-container > li > .time {
  width: 20%;
  float: left;
  padding: 10px 0;
}
.news-container > li > .time > p {
  font-size: 30px;
  margin: 5px 0;
}
.news-container > li > .circle {
  width: 20%;
  height: 100%;
  float: left;
  position: relative;
}
.news-container > li > .circle > img {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 20px;
  height: 20px;
}
.news-container > li > .circle > i {
  display: block;
  width: 1px;
  height: 100%;
  background: #707070;
}
.news-container > li:nth-of-type(1n) > .content {
  display: flex;
  align-items: center;
}
.news_image img {
  width: 80px;
  height: 80px;
  margin: 10px;
}
.news-container > li:nth-of-type(2n) > .content {
  float: right;
  display: flex;
}
.news-container > li:nth-of-type(2n) > .time {
  float: right;
}
.news-container > li:nth-of-type(2n) > .circle {
  float: right;
}
.news-container > li:nth-of-type(1) > .circle > i {
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
}
.more {
  font-size: 25px;
  color: #707070;
}
.more > i {
  cursor: pointer;
}
/*分页*/
.page_barBox {
  display: flex;
  justify-content: center;
}
.page-bar ul {
  width: 600px;
  margin: 40px 0px;
  text-align: center;
  display: flex;
  justify-content: center;
}
ul,
li {
  /* width: 100%; */
  margin: 0px;
  padding: 0px;
}
li {
  list-style: none;
}
.page-bar li:first-child > a {
  margin-left: 0px;
}
.page-bar a {
  border: 1px solid #ddd;
  text-decoration: none;
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  line-height: 1.42857143;
  color: #5d6062;
  cursor: pointer;
  margin-right: 20px;
}
.page-bar a:hover {
  background-color: #eee;
}
.page-bar a.banclick {
  cursor: not-allowed;
}
.page-bar .active a {
  color: #fff;
  cursor: default;
  background-color: #e96463;
  border-color: #e96463;
}
.page-bar i {
  font-style: normal;
  color: #d44950;
  margin: 0px 4px;
  font-size: 12px;
}
@media screen and (max-width: 767px) {
  .page-bar ul {
    width: 300px;
  }
  .news-container > li {
    width: 100%;
  }
  .news-container > li > .content {
    width: 70%;
    text-align: left;
    float: right;
  }
  .news-container > li > .time {
    width: 30%;
    text-align: left;
    float: right;
  }
  .news-container > li > .circle {
    display: none;
  }
}
</style>

