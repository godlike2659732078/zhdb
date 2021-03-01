<template>
  <div id="NewsInformation">
    <div class="banner container-fuild text-center">活动详情</div>
    <div>
      <!-- <div class="container text-center">
               
            </div> -->
      <div class="nav container text-center">
        <div class="active"></div>
      </div>
      <!-- 大数据管理系统 -->
      <div id="newsDetailBox" class="container-fuild">
        <div class="row newsDetailBox-container">
          <div class="col-xs-0 col-sm-0 col-md-1 wow zoomInDown"></div>
          <div class="col-xs-12 col-sm-12 col-md-8 wow fadeIn">
            <div class="newsDetailBox_newsBox">
              <div class="newsDetail">
                <div class="detail_head">
                  <p class="detail_title">
                    {{ title }}
                  </p>
                  <p class="detail_date">日期：{{ date }}</p>
                </div>
                <div class="detailContentBox">
                  <div class="detail_box" v-html="detailContent"></div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-0 col-sm-0 col-md-3 wow zoomInDown">
            <div class="newsTop">
              <div class="hots_head">☞热点聚焦</div>
              <div class="hots_list">
                <ul>
                  <li v-for="(item, index) in hotList" :key="index">
                    <div class="hotOne" @click="gotoActivityDetails(item.id)">
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
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
import { findFiveArticles, findArticleById } from "../../server/api";
export default {
  name: "NewsInformation",
  data() {
    return {
      detailContent: "",
      hotList: [
        // {
        //   image: require("../../assets/img/b1.png"),
        //   title:
        //     "屈冬玉会见土耳其共和国食品、农业和畜牧业部副部长麦赫迈特·丹尼诗",
        //   time: "2020-12-30",
        // },
        // {
        //   image: require("../../assets/img/b2.png"),
        //   title: "第一观察 | 开局之年，习近平为“关键少数”上了关键一课",
        //   time: "2020-12-30",
        // },
        // {
        //   image: require("../../assets/img/b3.png"),
        //   title: "TERRAFIBRA全球基于地球和植物纤维的建筑奖",
        //   time: "2020-12-30",
        // },
        // {
        //   image: require("../../assets/img/b4.png"),
        //   title: "中加地理标志发展协会成立：中华品牌走进加拿大",
        //   time: "2020-12-30",
        // },
        // {
        //   image: require("../../assets/img/b5.png"),
        //   title:
        //     "以优良作风书写非凡答卷——2020年以习近平同志为核心的党中央推进作风建设纪实",
        //   time: "2020-12-30",
        // },
      ],
      title: "",
      date: "",
      all: 10, //总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数
    };
  },
  methods: {
    getList() {
      findArticleById({
        language: 0,
        id: this.$route.query.id,
        type: 1,
      }).then((res) => {
        this.detailContent = res.data.particulars;
        this.title = res.data.title;
        this.date = res.data.createTime;
      });
    },
    gotoActivityDetails(id) {
      if (id == this.$route.query.id) {
        return false;
      } else {
        this.$router.push({ path: "/CN/activityDetails", query: { id: id } });
        this.getList();
      }
    },
    onPanelChange(value, mode) {
      //console.log(value._d);
      let d = new Date(value._d);
      let month =
        d.getMonth() > 8 ? d.getMonth() + 1 : "0" + (d.getMonth() + 1);
      let date = d.getFullYear() + "-" + month + "-" + d.getDate();
      let hour = d.getHours() > 9 ? d.getHours() : "0" + d.getHours();
      let minute = d.getMinutes() > 9 ? d.getMinutes() : "0" + d.getMinutes();
      let time = date + " " + hour + ":" + minute + ":00";
      //console.log(time);
    },
    //分页
    btnClick: function (data) {
      //页码点击事件
      if (data != this.cur) {
        this.cur = data;
      }
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
    },
    pageClick: function () {
      //根据点击页数请求数据
      this.dataListFn(this.cur.toString());
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
    findArticleById({ language: 0, id: this.$route.query.id, type: 1 }).then(
      (res) => {
        this.detailContent = res.data.particulars;
        this.title = res.data.title;
        this.date = res.data.createTime;
      }
    );
    findFiveArticles({ language: 0 }).then((res) => {
      this.hotList = res.data;
    });
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
  background-image: url("../../assets/img/banner1.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
/* 大数据管理系统 */
#newsDetailBox {
  padding: 40px 20px;
  transition: all ease 0.6s;
  box-sizing: border-box;
}
#newsDetailBox .newsDetailBox-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}

.newsDetailBox_newsBox {
  background-color: rgb(235, 235, 235);
  height: auto;
  border-radius: 2px;
  width: 100%;
}
.newsDetailBox_newsBox .newsDetailBox_newsBox_header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 40px;
  border-bottom: 1px solid rgb(245, 245, 245);
}
.newsDetailBox_newsBox .newsDetailBox_newsBox_header p:first-child {
  font-size: 18px;
  color: #001ca7;
}
.newsDetailBox_newsBox .newsDetailBox_newsBox_header p:last-child {
  font-size: 14px;
  color: #aaa;
  cursor: pointer;
}
.newsDetailBox_newsOne {
  padding: 10px 20px;
  border-bottom: 1px solid rgb(252, 252, 252);
  display: flex;
  justify-content: left;
  align-items: center;
  cursor: pointer;
}
.newsDetailBox_newsOne img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.newsDetailBox_title_time {
  max-width: 450px;
}
.newsDetailBox_title_time .news_time {
  font-size: 16px;
}
.newsDetailBox_newsOne .newsDetailBox_title_time .news_title {
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
.newsDetailBox_newsOne .newsDetailBox_title_time .news_content {
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  margin: 0px;
}
.detail_head {
  text-align: center;
  padding: 30px 50px;
}
.detail_title {
  font-size: 38px;
  font-weight: bold;
}
.detail_date {
  font-size: 20px;
}
#newsDetailBox .newsDetailBox-device {
  margin: 50px 0 20px;
}
.detailContentBox {
  box-sizing: border-box;
  text-align: center;
  padding: 30px 50px;
}
.detail_box {
  width: 100%;
  padding: 0px 20px;
  background: rgba(236, 236, 236, 0.856);
  border-radius: 2px;
}
.detail_box p {
  display: flex;
  align-items: center;
  justify-content: center;
}

.detail_box >>> img {
  width: 100%;
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
@media screen and (max-width: 767px) {
  .detail_head {
    text-align: center;
    padding: 20px 0px;
  }
  .detailContentBox {
    box-sizing: border-box;
    text-align: center;
    padding: 20px 10px;
  }
  .newsTop {
    display: none;
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

