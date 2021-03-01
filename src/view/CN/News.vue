<template>
  <div id="NewsInformation">
    <div class="banner container-fuild text-center">新闻资讯</div>
    <div>
      <!-- <div class="container text-center">
               
            </div> -->
      <div class="nav container text-center">
        <div class="active"></div>
      </div>
      <!-- 新闻列表 -->
      <div id="newsPage" class="container-fuild">
        <div class="row newsPage-container">
          <div class="col-xs-12 col-sm-12 col-md-8 wow fadeIn">
            <div class="col-xs-12 col-sm-12 col-md-3 wow fadeIn"></div>
            <div class="col-xs-12 col-sm-12 col-md-9 wow fadeIn">
              <div class="headRoute">首页>新闻资讯 > 新闻列表</div>
              <a-spin :spinning="showLoading" size="large">
                <div class="newsPage_newsBox">
                  <div class="newsPage_newsPage_newsBox_content">
                    <ul>
                      <li v-for="(item, index) in newsList" :key="index">
                        <div
                          class="newsPage_newsOne"
                          @click="gotoNewsDetail(item.id)"
                        >
                          <img :src="getImageUrl(item.image)" alt="图片" />
                          <div class="newsPage_title_time">
                            <p class="news_title">{{ item.title }}</p>
                            <p class="news_time">{{ item.createTime }}</p>

                            <p class="news_content">{{ item.introduct }}</p>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </a-spin>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-3 wow fadeIn">
            <div
              :style="{
                width: '100%',
                border: '1px solid #d9d9d9',
                borderRadius: '4px',
              }"
            >
              <a-calendar :fullscreen="false" @change="onPanelChange" />
            </div>

            <div class="newsTop">
              <div class="hots_head">☞热点聚焦</div>
              <div class="hots_list">
                <ul>
                  <li v-for="(item, index) in hotList" :key="index">
                    <div class="hotOne" @click="gotoNewsDetail(item.id)">
                      <img :src="getImageUrl(item.image)" alt="图片" />
                      <div class="hot_newsPage_title_time">
                        <p class="hot_title">{{ item.title }}</p>
                        <p class="hot_time">{{ item.createTime }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-1 wow zoomInDown"></div>
        </div>
      </div>
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
import { findAllArticles, findFiveArticles, GoTop } from "../../server/api";
export default {
  name: "NewsInformation",
  data() {
    return {
      showLoading: true,
      newsList: [],
      hotList: [],
      all: 10, //总页数
      cur: 1, //当前页码
      createTime: "",
    };
  },
  methods: {
    GoTop() {
      (function smoothscroll() {
        var currentScroll =
          document.documentElement.scrollTop || document.body.scrollTop;
        if (currentScroll > 0) {
          window.requestAnimationFrame(smoothscroll);
          window.scrollTo(0, currentScroll - currentScroll / 10);
        }
      })();
    },
    getNews() {
      findAllArticles({
        language: 0,
        type: 1,
        pageSize: 10,
        pageNum: this.cur,
      }).then((res) => {
        if (res) {
          this.showLoading = false;
          this.newsList = res.data;
          this.all = res.count;
        }
      });
    },
    onPanelChange(value, mode) {
      let d = new Date(value._d);
      let month =
        d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      let date = d.getFullYear() + "-" + month + "-" + d.getDate();
      let hour = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
      let minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
      let time = date;
      //console.log(time);
      findAllArticles({
        language: 0,
        type: 1,
        pageSize: 10,
        createTime: time,
        pageNum: this.cur,
      }).then((res) => {
        //console.log(res);
        this.newsList = res.data;
        this.all = res.count;
      });
    },

    gotoNewsDetail(id) {
      this.$router.push({ path: "/CN/newsDetail", query: { id: id } });
    },
    //分页
    btnClick: function (data) {
      //页码点击事件
      this.showLoading = true;
      if (data != this.cur) {
        this.cur = data;
      }
      //console.log(this.cur);
      this.getNews();
      GoTop();
    },
    pageClick: function () {
      GoTop();
      this.showLoading = true;
      //console.log(this.cur);
      this.getNews();
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
    findFiveArticles({ language: 0 }).then((res) => {
      //console.log(res);
      this.hotList = res.data;
    });
    this.getNews();
    var wow = new WOW();
    wow.init();
  },
};
</script>
<style scoped>
#NewsInformation {
  background-color: #f0f0f0be;
}
.banner {
  color: #fff;
  font-size: 30px;
  height: 150px;
  line-height: 150px;
  background-image: url("../../assets/img/banner_news.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
.headRoute {
  margin-bottom: 10px;
  display: block;
  padding: 10px;
  color: #001ca7;
  background-color: #fff;
}
/* 新闻列表 */
#newsPage {
  padding: 20px 20px;
  transition: all ease 0.6s;
  box-sizing: border-box;
}
#newsPage .newsPage-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.newsPage_newsBox {
  height: auto;
  min-height: 900px;
  border-radius: 2px;
}
.newsPage_newsBox .newsPage_newsBox_header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 40px;
  border-bottom: 1px solid rgb(245, 245, 245);
}
.newsPage_newsBox .newsPage_newsBox_header p:first-child {
  font-size: 18px;
  color: #001ca7;
}
.newsPage_newsBox .newsPage_newsBox_header p:last-child {
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
}
.newsPage_newsOne {
  padding: 10px 20px;
  border-bottom: 6px solid rgb(252, 252, 252);
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
  background-color: #fff;
}
.newsPage_newsOne img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.newsPage_title_time {
  max-width: 450px;
}
.newsPage_title_time .news_time {
  font-size: 16px;
}
.newsPage_newsOne .newsPage_title_time .news_title {
  font-size: 16px;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #001ca7;
  cursor: pointer;
}
.newsPage_newsOne .newsPage_title_time .news_content {
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 0px;
}

.newsTop {
  background-color: #fff;
  height: auto;
  border-radius: 2px;
}
.hots_head {
  font-size: 18px;
  color: #001ca7;
  border-bottom: 1px solid rgb(248, 248, 248);

  padding: 10px 20px;
}
.hotOne {
  padding: 10px 20px;
  border-bottom: 1px solid rgb(252, 252, 252);
  display: flex;
  justify-content: left;
  align-items: center;
  height: 100px;
}
.hotOne img {
  width: 70px;
  height: 70px;
  margin-right: 20px;
}
.hot_newsPage_title_time {
  max-width: 216px;
}
.hotOne .hot_newsPage_title_time .hot_title {
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #001ca7;
  cursor: pointer;
}

#newsPage .newsPage-device {
  margin: 50px 0 20px;
}
/*分页*/
.page_barBox {
  display: flex;
  justify-content: center;
}
.page-bar {
  width: 540px;
  margin: 40px 0px;
}
ul,
li {
  width: 100%;
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
  .newsPage_newsBox {
    height: auto;
    min-height: 200px;
    border-radius: 2px;
  }
  .page-bar {
    width: 300px;
    margin: 40px 0px;
  }
  /* 新闻列表 */
  #newsPage {
    padding: 20px 0px;
    transition: all ease 0.6s;
    box-sizing: border-box;
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

