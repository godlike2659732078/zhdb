<template>
  <div id="productBox">
    <div class="banner container-fuild text-center">Product list</div>
    <!-- 大数据管理系统 -->
    <a-spin :spinning="showLoading" size="large">
      <div id="productsData" class="container-fuild">
        <div class="row productsData-container">
          <div class="col-xs-12 col-sm-12 col-md-9 wow fadeIn">
            <!-- 地标产品 -->

            <div id="products" class="container-fuild">
              <div class="row products-container products_box">
                <div class="col-xs-12 col-sm-12 col-md-12 home_product_head">
                  <div class="product_title">
                    <h3>Landmark products</h3>
                    <p style="color: #b2b2b2">Landmark products</p>
                  </div>
                  <div class="more_product"></div>
                </div>
                <div
                  class="col-xs-12 col-sm-12 col-md-4 wow fadeIn"
                  v-for="(item, index) in customerList"
                  :key="index"
                >
                  <div
                    class="productsPage_Box"
                    @click="gotoProductDetail(item.id)"
                  >
                    <div class="customer-logo">
                      <img
                        class="customer-yh"
                        :src="getImageUrl(item.image)"
                        alt="logo"
                      />
                    </div>
                    <div class="customer-content2">{{ item.title }}</div>
                    <div class="customer-content1">{{ item.introduct }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-xs-12 col-sm-12 col-md-3 wow fadeIn">
            <h2 class="productsData-title">
              Geographical indication products
              <small>/ 地理标志产品</small>
            </h2>
            <p>
              Geographical indication products refer to products that are
              produced in a specific area and whose quality, reputation or other
              characteristics are essentially determined by the natural and
              human factors of the place of origin, and are named after review
              and approval by geographical names.
            </p>
            <div class="cardBox">
              <p class="cardTitle">Product categories</p>
              <a-tag
                color="blue"
                @click="getClassProduct(item.id)"
                v-for="(item, index) in classList"
                :key="index"
              >
                {{ item.name }}
              </a-tag>
              <a-tag color="blue" @click="getALLProduct"> All </a-tag>
            </div>
            <div class="cardBox">
              <p class="cardTitle">Product areas</p>
              <a-tag
                color="cyan"
                @click="getReginProduct(item.id)"
                v-for="(item, index) in reginList"
                :key="index"
              >
                {{ item.name }}
              </a-tag>
              <a-tag color="cyan" @click="getAllReginProduct"> All </a-tag>
            </div>
            <div class="newsTop">
              <div class="hots_head">☞Hot products</div>
              <div class="hots_list">
                <ul>
                  <li v-for="(item, index) in hotList" :key="index">
                    <div class="hotOne" @click="gotoProductDetail(item.id)">
                      <img :src="getImageUrl(item.image)" alt="图片" />
                      <div class="hot_title_time">
                        <p class="hot_title">{{ item.introduct }}</p>
                        <p class="hot_time">{{ item.title }}</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <!--分页-->
        <div class="page_barBox">
          <div class="page-bar">
            <ul>
              <li v-if="cur > 1">
                <a v-on:click="cur--, pageClick()">On</a>
              </li>
              <li v-if="cur == 1"><a class="banclick">On</a></li>
              <li
                v-for="index in indexs"
                v-bind:class="{ active: cur == index }"
                :key="index"
              >
                <a v-on:click="btnClick(index)">{{ index }}</a>
              </li>
              <li v-if="cur != all">
                <a v-on:click="cur++, pageClick()">Next</a>
              </li>
              <li v-if="cur == all"><a class="banclick">Next</a></li>
              <li>
                <a
                  >Total<i>{{ all }}</i
                  >Pages</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </a-spin>
  </div>
</template>
<script>
import { WOW } from "wowjs";
import {
  findAllProduct,
  findAllProductClass,
  findAllProductRegion,
  findFiveProductFive,
  GoTop,
} from "../../server/api";
export default {
  name: "productBox",
  data() {
    return {
      showLoading: true,
      classId: "",
      regionId: "",
      all: 10, //总页数
      cur: 1, //当前页码
      totalPage: 0, //当前条数
      lang: this.$store.state.language,
      classList: [],
      reginList: [],
      hotList: [],
      customerList: [],
    };
  },
  methods: {
    getProduct() {
      findAllProduct({
        language: 1,
        pageNum: this.cur,
        pageSize: 10,
        regionId: this.regionId,
        classId: this.classId,
      }).then((res) => {
        if (res) {
          this.showLoading = false;
          this.customerList = res.data;
          this.all = res.count;
        }
      });
    },
    getClassProduct(id) {
      this.classId = id;
      this.getProduct();
    },
    getALLProduct() {
      this.classId = "";
      this.getProduct();
    },
    getReginProduct(id) {
      this.regionId = id;
      this.getProduct();
    },
    getAllReginProduct() {
      this.regionId = "";
      this.getProduct();
    },
    gotoNews() {
      this.$router.push({ path: "/EN/newsinformation" });
    },
    gotoActivity() {
      this.$router.push({ path: "/EN/activity" });
    },
    gotoAbout() {
      this.$router.push({ path: "/EN/about" });
    },
    gotoNewsDetail() {
      this.$router.push({ path: "/EN/newsDetail" });
    },
    gotoProductDetail(id) {
      this.$router.push({ path: "/EN/productDetail", query: { id: id } });
    },
    //分页
    btnClick: function (data) {
      //页码点击事件

      this.showLoading = true;
      if (data != this.cur) {
        this.cur = data;
      }
      GoTop();
      this.getProduct();
    },
    pageClick: function () {
      this.showLoading = true;
      GoTop();
      this.getProduct();
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
    this.getProduct();
    findAllProductClass({ language: 1 }).then((res) => {
      this.classList = res.data;
    });
    findAllProductRegion({ language: 1 }).then((res) => {
      this.reginList = res.data;
    });
    findFiveProductFive({ language: 1 }).then((res) => {
      this.hotList = res.data;
    });
    /* wowjs动画 */
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true,
    });
    wow.init();
  },
};
</script>
<style scoped>
/* 整体盒子 */
#productBox {
  width: 100%;
  background-color: aliceblue;
}
/* 大数据管理系统 */
#productsData {
  padding: 20px 20px;
  transition: all ease 0.6s;
  box-sizing: border-box;
}
#productsData .productsData-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
.banner {
  color: #fff;
  font-size: 30px;
  height: 150px;
  line-height: 150px;
  background-image: url("../../assets/img/banner_details.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
.cardBox {
  background-color: #fff;
  border-radius: 2px;
  margin: 10px 0px;
  padding: 10px;
}
.cardBox span {
  cursor: pointer;
  margin: 5px 5px;
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
.hot_time {
  white-space: normal;
  word-break: break-all;
  overflow: hidden;
  -webkit-line-clamp: 1;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}

#productsData .productsData-device {
  margin: 50px 0 20px;
}

/* 地标产品 */
.productsPage_Box {
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
.home_product_head {
  margin-top: 20px;
  background-color: #fff;
  padding: 10px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.more_product {
  font-size: 16px;
  color: #001ca7;
  cursor: pointer;
}
.product_title p {
  margin: 0px;
}
.product_title h3 {
  margin: 10px;
}
.product_title {
  text-align: left;
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
/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
  #swiper {
    height: 200px;
  }
  #productsData {
    padding: 00px;
    min-height: 500px;
  }
  #productsData .productsData-title {
    font-size: 20px;
  }
  #productsData .productsData-device {
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
  #productsData {
    padding: 60px;
  }
  #productsData .productsData-title {
    font-size: 30px;
  }
  #productsData .productsData-device {
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

