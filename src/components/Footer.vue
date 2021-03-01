<template>
  <div id="footer" class="container-fluid">
    <!-- <p class="title">中华国际地标发展组织</p> -->
    <div class="urlBox">
      <ul>
        <li v-for="(item, index) in urlList" :key="index">
          <img
            :src="getImageUrl(item.image)"
            @click="gotoUrlPage(item.url)"
            alt=""
          />
        </li>
      </ul>
    </div>
    <div class="row">
      <div class="col-xs-12 col-sm-12 col-md-4"></div>
      <div class="surlBox col-xs-12 col-sm-12 col-md-4">
        <ul>
          <li
            v-for="(item, index) in surlList"
            @click="gotoWeb(item.url)"
            :key="index"
          >
            {{ item.title }}
          </li>
        </ul>
      </div>
      <div class="col-xs-12 col-sm-12 col-md-4"></div>
    </div>
    <p class="copy">
      版权 &copy; 2020 - 2021 中华国际地标发展组织 Greater International
      Development Organization
    </p>
  </div>
</template>
<script>
import { findAllFriendLinks } from "../server/api";
export default {
  name: "Footer",
  data() {
    return {
      urlList: [],
      surlList: [
        // 地理标志产品保护规定.pdf
        {
          title: "中欧《中欧地理标志保护与合作协定》",
          url: "https://image.cigi.org.cn/files/zoxd.pdf",
        },
        {
          title: "中国《地理标志产品保护规定》",
          url: "https://image.cigi.org.cn/files/地理标志产品保护规定.pdf",
        },
        {
          title: "中国《农产品地理标志管理办法》",
          url: "https://image.cigi.org.cn/files/农产品地理标志管理办法.pdf",
        },

        {
          title: "中国《国外农产品地理标志登记审查规定》",
          url:
            "https://image.cigi.org.cn/files/国外农产品地理标志登记审查规定.pdf",
        },
      ],
    };
  },
  methods: {
    gotoUrlPage(url) {
      window.open(url, "_blank");
    },
    gotoWeb(url) {
      window.open(url, "_blank");
    },
  },
  mounted() {
    findAllFriendLinks({ language: 0 }).then((res) => {
      console.log(res);
      this.urlList = res.data;
    });
  },
};
</script>
<style scoped>
#footer {
  width: 100%;
  height: auto;
  color: #fff;
  background: #001ca7;
  overflow: hidden;
  text-align: center;
}
.logo {
  margin: 50px auto 20px;
}
.logo img {
  width: 90px;
  height: 90px;
  margin: auto;
}
.title {
  font-size: 25px;
  margin-bottom: 20px;
}
.address_tel_fax {
  color: #d3d3d3;
  font-size: 14px;
  margin: 10px 0;
}
.email_wx {
  color: #d3d3d3;
  font-size: 14px;
}
.copy {
  color: #d3d3d3;
  font-size: 14px;
  margin: 20px 0 10px;
}
.urlBox ul {
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin: 20px 0px 0px;
}
.surlBox ul {
  margin: 20px 0px 0px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.surlBox ul li {
  cursor: pointer;
  min-width: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
}
.urlBox ul li img {
  width: 30px;
  margin: 0px 10px;
}
@media screen and (max-width: 997px) {
  .title {
    font-size: 20px;
  }
  .address_tel_fax {
    font-size: 12px;
  }
  .email_wx {
    font-size: 12px;
  }
  .copy {
    font-size: 12px;
    margin: 30px 0 10px;
  }
}
</style>

