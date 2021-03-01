<template>
  <div id="HomePage">
    <!-- 轮播图 -->
    <a-spin :spinning="showLoading">
      <div class="row bannerBox">
        <div id="swiper" class="col-xs-12 col-sm-12 col-md-8 container-fuild">
          <div class="swiper-container banner-swiper">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item, index) in swiperList"
                :key="index"
                :data-url="item.url"
              >
                <img :src="getImageUrl(item.image)" alt="轮播图" />

                <div class="swiper-slide-title">
                  <div class="banner_title">{{ item.title }}</div>
                </div>
              </div>
            </div>

            <!-- 如果需要分页器 -->
            <div class="swiper-pagination"></div>
          </div>
        </div>
        <div
          id="banner_right"
          class="col-xs-12 col-sm-12 col-md-4 container-fuild"
        >
          <a-spin :spinning="showLoading">
            <div
              class="bannerRight_text"
              v-for="(item, index) in banner_rightList"
              :key="index"
            >
              <img
                class="banner_right_img"
                :src="getImageUrl(item.image)"
                alt="轮播新闻"
                @click="gotoDetails(item.id)"
              />
              <div class="text_type" v-if="item.type == 1">新闻</div>
              <div v-else class="text_type">活动</div>
              <div class="banner_right_title">{{ item.title }}</div>
            </div>
          </a-spin>
        </div>
      </div>
    </a-spin>
    <!-- 大数据管理系统 -->
    <div id="bigData" class="container-fuild">
      <div class="row bigData-container">
        <div class="col-xs-12 col-sm-12 col-md-9 wow fadeIn">
          <div class="wow fadeIn">
            <div class="row activity_newBox">
              <div class="newActivityTitle col-xs-12 col-sm-12 col-md-4">
                <img src="../../assets/img/news-tit.png" alt="" />
                <p>最新活动</p>
              </div>
              <div class="col-xs-12 col-sm-12 col-md-4 wow fadeInUp">
                <img
                  :src="getImageUrl(newActivity.image)"
                  style="width: 100%; height: auto; display: block"
                  alt="图片"
                />
              </div>
              <div
                class="newActivityOne col-xs-12 col-sm-12 col-md-4 wow fadeInUp"
                @click="gotoNewsDetail(newActivity.id)"
              >
                <div class="newActivityOne_title_time">
                  <p class="newActivityOne_news_time">
                    {{ newActivity.createTime }}
                  </p>
                  <p class="newActivityOne_news_title">
                    {{ newActivity.title }}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-7 wow fadeIn">
            <a-spin :spinning="showLoading_news">
              <div class="newsBox">
                <div class="newsBox_header">
                  <p>新闻</p>
                  <p @click="gotoNews">更多新闻</p>
                </div>
                <div class="newsBox_content">
                  <ul>
                    <li v-for="(item, index) in newsList" :key="index">
                      <div class="newsOne" @click="gotoNewsDetail(item.id)">
                        <img :src="getImageUrl(item.image)" alt="图片" />
                        <div class="title_time">
                          <p class="news_time">{{ item.createTime }}</p>
                          <p class="news_title">{{ item.title }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </a-spin>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-5 wow fadeIn">
            <a-spin :spinning="showLoading_events">
              <div class="newsBox">
                <div class="newsBox_header">
                  <p>活动</p>
                  <p @click="gotoActivity">更多动态</p>
                </div>
                <div class="newsBox_content">
                  <ul>
                    <li v-for="(item, index) in eventList" :key="index">
                      <div
                        class="newsOne"
                        @click="gotoActivityDetails(item.id)"
                      >
                        <img :src="getImageUrl(item.image)" alt="图片" />
                        <div class="title_time">
                          <p class="news_title">{{ item.title }}</p>
                          <p class="news_time">{{ item.createTime }}</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </a-spin>
          </div>
          <!-- 地标产品 -->
          <div id="products" class="container-fuild">
            <div class="row products-container products_box">
              <div class="col-xs-12 col-sm-12 col-md-12">
                <div class="home_product_head">
                  <div class="product_title">
                    <h3>地标产品</h3>
                    <p style="color: #b2b2b2">Landmark products</p>
                  </div>
                  <div class="more_product" @click="gotoProduct">
                    更多产品&nbsp;&nbsp;>
                  </div>
                </div>
              </div>
              <a-spin :spinning="showLoading_products">
                <div
                  class="col-xs-12 col-sm-12 col-md-4 wow fadeIn"
                  v-for="(item, index) in customerList"
                  :key="index"
                >
                  <div
                    class="productsBox wow fadeIn"
                    @click="gotoProductDetail(item.id)"
                  >
                    <div class="customer-logo">
                      <img
                        class="customer-yh"
                        :src="getImageUrl(item.image)"
                        alt="logo"
                      />
                    </div>
                    <div class="textBox">
                      <div class="customer-content2">{{ item.title }}</div>
                      <div class="customer-content1">{{ item.introduct }}</div>
                    </div>
                  </div>
                </div>
              </a-spin>
            </div>
          </div>
        </div>
        <div class="col-xs-12 col-sm-12 col-md-3 wow fadeIn">
          <h2 class="bigData-title">
            中华国际地标发展组织
            <small>/ Greater International Development Organization</small>
          </h2>
          <p>
            “地理标志”是世界知识产权的重要门类，是关于产品、品牌和文化的国家名片，也是全球各个国家和地区发展实体经济、促进减饥饿减贫困的重要路径选择。
          </p>
          <p>
            中国是全世界地理标志产品最多的国家，据统计共有9958个；欧盟4844个，居第2位；美国587个，居第15位；俄罗斯262个，居第20位。
          </p>
          <div class="newsTop">
            <div class="hots_head">☞热点推荐</div>
            <a-spin :spinning="showLoading_hot">
              <div class="hots_list">
                <ul>
                  <li v-for="(item, index) in hotList" :key="index">
                    <div class="hotOne" @click="gotoNewsDetail(item.id)">
                      <img :src="getImageUrl(item.image)" alt="图片" />
                      <div class="hot_title_time">
                        <p class="hot_title">{{ item.title }}</p>
                        <p class="hot_time">{{ item.createTime }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </a-spin>
          </div>
        </div>
      </div>
    </div>

    <!-- 中华国际地标发展组织 -->
    <div id="contactUs" class="container-fuild text-center home_aboutBox">
      <div class="container contactUs-container wow fadeIn">
        <h1>中华国际地标发展组织</h1>
        <h3>Greater International Development Organization</h3>
        <button
          class="btn btn-default btn-sm"
          onmouseleave="this.style.borderColor='#ffffff'; this.style.backgroundColor='#ffffff'; this.style.color='#3f3f3f';"
          onmouseenter="this.style.backgroundColor='transparent'; this.style.borderColor='#ffffff'; this.style.color='#ffffff';"
          @click="gotoAbout"
        >
          关于我们
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { WOW } from "wowjs";
import {
  findBanners,
  findTwoArticles,
  findAllArticles,
  findFiveArticles,
  findAllProduct,
} from "../../server/api";
export default {
  name: "HomePage",
  data() {
    return {
      showLoading: true,
      showLoading_news: true,
      showLoading_events: true,
      showLoading_hot: true,
      showLoading_products: true,
      lang: this.$store.state.language,
      language: 0,
      swiperList: null,
      newActivity: [],
      newsList: [],
      eventList: [],
      hotList: [],
      customerList: [],
      banner_rightList: [],
    };
  },
  watch: {
    lang() {
      //console.log(this.lang);
    },
  },
  methods: {
    carouselScroll() {
      let that = this;
      let mySwiper = new Swiper(".swiper-container", {
        effect: "fade",
        loop: true,
        autoplay: {
          disableOnInteraction: false, // 用户操作swiper之后，是否禁止autoplay （没有加入之前轮播图设置 autoplay：true无效）
          delay: 3000, // 自动切换的时间间隔（单位ms）
        },
        on: {
          click: function () {
            let id = this.clickedSlide.attributes["data-url"].nodeValue;
            that.$router.push({ path: "/CN/newsDetail", query: { id: id } });
          },
        },
        // 如果需要分页器
        pagination: {
          clickable: true,
          el: ".swiper-pagination",
        },
        observeParents: true, //必须加入
        observer: true, //必须加入
      });
    },

    gotoDetails(id) {
      this.$router.push({ path: "/CN/newsDetail", query: { id: id } });
    },
    gotoNews() {
      this.$router.push({ path: "/CN/newsinformation" });
    },
    gotoActivity() {
      this.$router.push({ path: "/CN/activity" });
    },
    gotoAbout() {
      this.$router.push({ path: "/CN/About" });
    },
    gotoNewsDetail(id) {
      this.$router.push({ path: "/CN/newsDetail", query: { id: id } });
    },
    gotoActivityDetails(id) {
      this.$router.push({ path: "/CN/activityDetails", query: { id: id } });
    },
    gotoProduct() {
      this.$router.push({ path: "/CN/product" });
    },
    gotoProductDetail(id) {
      this.$router.push({ path: "/CN/productDetail", query: { id: id } });
    },
  },

  mounted() {
    let obj = {
      language: this.language,
    };
    findBanners(obj).then((res) => {
      if (res) {
        this.showLoading = false;
        this.swiperList = res.data;
        //console.log(this.swiperList);
        this.$nextTick(function () {
          //l轮播图初始化函数carouselScroll一定要放在$nextTick回调中执行
          this.carouselScroll();
        });
      }
    });
    findTwoArticles(obj).then((res) => {
      this.banner_rightList = res.data;
    });

    findAllArticles({
      language: this.language,
      type: 1,
      pageSize: 5,
      pageNum: 1,
    }).then((res) => {
      if (res) {
        this.showLoading_news = false;
        this.newsList = res.data;
      }
    });
    findAllArticles({
      language: this.language,
      type: 2,
      pageSize: 5,
      pageNum: 1,
    }).then((res) => {
      if (res) {
        this.showLoading_events = false;
        this.eventList = res.data;
        this.newActivity = res.data[0];
      }
    });
    findFiveArticles({ language: this.language }).then((res) => {
      if (res) {
        //console.log(res);
        this.hotList = res.data;
        this.showLoading_hot = false;
      }
    });
    findAllProduct({ language: this.language, pageSize: 10, pageNum: 1 }).then(
      (res) => {
        if (res) {
          this.showLoading_products = false;
          //console.log(res);
          this.customerList = res.data;
        }
      }
    );
    /* wowjs动画 */
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 50,
      mobile: true,
      live: true,
    });
    wow.init();
  },
};
</script>
<style scoped>
/* 整体盒子 */
#HomePage {
  width: 100%;
  background-color: aliceblue;
}

/* 轮播图 */
#swiper {
  height: 600px;
}
.bannerBox {
  background-color: #fff;
  padding-bottom: 20px;
}
#swiper .banner-swiper {
  width: 100%;
  height: 100%;
  cursor: pointer;
}
#swiper .banner-swiper .swiper-slide img {
  width: 100%;
  height: 100%;

  display: block;
  object-fit: cover;
}
#swiper .banner-swiper .swiper-slide {
  position: relative;
}
#swiper .banner-swiper .swiper-slide-title {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
  width: 100%;
  height: 100%;
  color: #fff;
  /* background: rgba(51, 51, 51, 0.534); */
  text-align: center;
  line-height: 80px;
}
#swiper .banner-swiper .swiper-slide-title .banner_title {
  text-align: left;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.521);
  font-size: 20px;
  position: absolute;
  line-height: 40px;
  left: 0px;
  bottom: 0px;
  padding: 0px 20px;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

/* 大数据管理系统 */
#bigData {
  padding: 40px 20px;
  transition: all ease 0.6s;
  box-sizing: border-box;
}
#bigData .bigData-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.hots_list {
  min-height: 300px;
}
.newsBox {
  background-color: #fff;
  height: auto;
  border-radius: 2px;
  min-height: 300px;
}
.newsBox .newsBox_header {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  height: 40px;
  background-color: #001ca7;
}
.newsBox .newsBox_header p:first-child {
  font-size: 18px;
  color: #ffffff;
}
.newsBox .newsBox_header p:last-child {
  font-size: 14px;
  color: rgb(255, 255, 255);
  cursor: pointer;
}
.newsOne {
  padding: 10px 20px;
  border-bottom: 1px solid rgb(252, 252, 252);
  display: flex;
  justify-content: left;
  align-items: center;
}
.newsOne img {
  width: 60px;
  height: 60px;
  margin-right: 20px;
  display: block;
  object-fit: cover;
}
.title_time {
  max-width: 350px;
}
.newsOne .title_time .news_title {
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
  display: block;
  object-fit: cover;
}
.hot_title_time {
  max-width: 216px;
}
.hotOne .hot_title_time .hot_title {
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
.newActivityOne {
  /* width: 100%; */
  padding: 10px 20px;
  border-bottom: 1px solid rgb(252, 252, 252);
  display: flex;
  justify-content: left;
  align-items: center;
}
.newActivityOne_news_time {
  font-size: 38px;
  color: rgb(82, 82, 82);
  text-align: center;
  border-bottom: 1px solid #aaa;
}
.newActivityOne_news_title {
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 3;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #1d2088;
  cursor: pointer;
  font-size: 20px;
}
.activity_newBox {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  background: #fff;
  padding: 30px 10px;
  border-top: 2px solid #001ca7;
  border-bottom: 2px solid #001ca7;
}
.newActivityTitle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24px;
  color: #333;
}
.newActivityTitle p {
  margin-left: 20px;
  margin-bottom: 0px;
}
#bigData .bigData-device {
  margin: 50px 0 20px;
}

/* 中华国际地标发展组织 */
#contactUs {
  color: #fff;
  height: 300px;
  background: url("../../assets/img/banner_events.png") 0 0 no-repeat;
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
  transition: all ease 0.6s;
}
#contactUs .contactUs-container {
  padding-top: 50px;
}
#contactUs .contactUs-container button {
  width: 300px;
  height: 50px;
  margin-top: 40px;
}
#contactUs .contactUs-container .contactUs-contactWay span {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin: 30px;
}

.products_box {
  min-height: 500px;
}
/* 地标产品 */
.productsBox {
  background-color: #fff;
  margin: 10px 0px;
  /* min-width: 260px; */
  height: auto;
  padding: 10px;
  cursor: pointer;
}
.customer-logo {
  overflow: hidden;
}
.customer-yh {
  width: 100%;
  height: 220px;
  transition: all 2s;
}
.customer-yh:hover {
  transform: scale(1.4);
}
.textBox {
  /* background-color: rgba(0, 0, 0, 0.781); */
  margin-top: 10px;
}
.customer-content2 {
  font-size: 16px;
  text-align: left;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #001ca7;
  font-weight: bold;
  cursor: pointer;
  padding: 4px 8px 0px;
}
.customer-content1 {
  font-size: 12px;
  text-align: left;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 2;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  color: #666;
  line-height: 20px;
  height: 40px;
  padding: 0px 10px;
  margin: 1px 0px;
  box-sizing: border-box;
}
.bannerRight_text:first-child {
  margin-bottom: 20px;
}
.bannerRight_text {
  width: 100%;
  height: 290px;
  position: relative;
  cursor: pointer;
  border: 6px solid rgba(0, 0, 0, 0.349);
}
.banner_right_img {
  height: 100%;
  width: 100%;
  display: block;
  object-fit: cover;
}
.text_type {
  position: absolute;
  top: 120px;
  right: 0px;
  padding: 4px;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.39);
}
.banner_right_title {
  background-color: rgba(0, 0, 0, 0.39);
  width: 100%;
  position: absolute;
  bottom: 0px;
  padding: 4px;
  color: #fff;
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.home_product_head {
  margin-top: 20px;
  background-color: #001ca7;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #001ca7;
  border-top: 2px solid #001ca7;
}
.more_product {
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;
}
.product_title p {
  margin: 0px;
  color: #fff;
}
.product_title h3 {
  margin: 10px;
  color: #fff;
}
.product_title {
  text-align: left;
}
/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
  #swiper .banner-swiper .swiper-slide-title .banner_title {
    font-size: 16px;

    line-height: 24px;
  }

  #bigData {
    padding: 40px 0px;
  }
  .newActivityOne {
    display: none;
  }
  #swiper {
    height: 200px;
  }

  #bigData .bigData-title {
    font-size: 20px;
  }
  #bigData .bigData-device {
    font-size: 20px;
    margin: 10px 0 10px;
  }
  #contactUs {
    height: 200px;
    transition: all ease 0.6s;
  }
  #contactUs .contactUs-container {
    padding-top: 0;
  }
  #contactUs .contactUs-container h1 {
    font-size: 25px;
  }
  #contactUs .contactUs-container h3 {
    font-size: 18px;
  }
  #contactUs .contactUs-container button {
    width: 200px;
    height: 30px;
    margin-top: 20px;
  }
  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin: 10px;
  }

  #whyChooseUs {
    padding: 20px 0;
    transition: all ease 0.6s;
  }
  #whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 700;
  }
  #whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
    font-size: 12px;
  }
  #whyChooseUs .server-block {
    padding: 50px 0;
    border: 1px solid #ccc;
    border-bottom: 5px solid #ccc;
  }
  #whyChooseUs .server-block img {
    width: 48px;
    height: 48px;
  }
  #whyChooseUs .server-block > p {
    font-size: 20px;
    margin: 30px 0;
  }
  #whyChooseUs .server-block > div {
    color: #ccc;
  }
}

/* 媒体查询（平板） */
@media screen and (min-width: 768px) and (max-width: 996px) {
  #swiper {
    height: 400px;
  }
  #bigData {
    padding: 60px;
  }
  #bigData .bigData-title {
    font-size: 30px;
  }
  #bigData .bigData-device {
    font-size: 30px;
    margin: 30px 0 15px;
  }
  #contactUs {
    height: 300px;
  }
  #contactUs .contactUs-container {
    padding-top: 50px;
  }
  #contactUs .contactUs-container h1 {
    font-size: 30px;
  }
  #contactUs .contactUs-container h3 {
    font-size: 20px;
  }
  #contactUs .contactUs-container button {
    width: 300px;
    height: 50px;
    margin-top: 30px;
  }
  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 15px;
  }
  #customer .customer-title {
    font-size: 24px;
  }
  #whyChooseUs {
    padding: 20px 0;
  }
}
</style>

