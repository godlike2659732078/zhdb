<template>
  <div id="CompanyIntroduction">
    <div class="banner container-fuild text-center">About us</div>
    <div class="container">
      <div class="row CompanyIntroduction-container">
        <div class="col-xs-12 col-sm-12 col-md-4 wow zoomIn about_contentImage">
          <img
            class="img-responsive center-block"
            src="../../assets/img/logo_black.png"
          />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-8">
          <h3>Greater International Development Organization</h3>

          <p class=".text-justify">
            {{ aboutObj.introduct }}
          </p>
        </div>
      </div>
      <div class="detailContentBox col-xs-12 col-sm-12 col-md-12 wow zoomIn">
        <div class="detail_box" v-html="aboutObj.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
import { findAboutUsById } from "../../server/api";
export default {
  name: "CompanyIntroduction",
  data() {
    return {
      aboutObj: {},
      detailContent:
        '<p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"="">河北燕山山脉盛产板栗，由于其独特的气候和富含丰富矿物质的土壤，使其营养丰富、口感甜糯，尤其是经过炒制以后，香气扑鼻、入口即化。</p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"="">京东板栗个大皮薄，色泽鲜艳，外观整洁，果肉细腻有糯性，风味芳酣独特。栗子果实可生食、炒食、煮食；可磨成栗粉，制做各种精美点心；亦可做烹调原料。</p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"="">营养价值京东板栗果仁含蛋白质10.7%，脂肪7.4%，淀粉60%，糖20%，以及丰富的胡萝卜素、抗坏血酸、硫胺素、核黄素、尼克酸、维生素C、B1、B2等多种维生素和钙、磷、铁、钾等多种微量元素。热能及多种维生素和微量元素等多种成分，可供人体吸收和利用的养分高达98%。营养成分居中国板栗之首，因此京东板栗素有“干果之王”的美誉。 [4] 药用价值板栗，性味甘温，入脾、胃、肾三经，可以养胃、健脾、补肾、壮腰、强筋、活血、止血、消肿等。南梁陶弘景说其能“益气，厚肠胃，补肾气”。唐代医学名家孙思邈曾说：“栗，肾之果也，肾病宜食之；生食治腰、脚不遂。”明代李时珍称“栗能通肾”、“久食必强健”，可“治肾虚，腰脚无力，以袋盛生栗悬干，每日吃十余颗，吃猪肾粥助之，久必强健。”适用于脾胃虚寒引起的慢性腹泻，肾虚所致的腰酸膝软、腰肢不遂，小便频数以及金疮、折伤肿痛等症。吃食栗子可以益气血、养胃、补肾、健肝脾；生食还有治疗腰腿酸疼、舒筋活络的功效，栗还有驱寒止泻之效。其对人体的滋补功能可与人参、黄芪、当归等比美，而又价廉易得，倍受历代医家推崇。营养专家也指出，常食板栗，不但能养胃健脾、补肾强筋，还能健肤美容、延缓衰老。</p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"="">适量吃栗，还可以治疗核黄素缺乏引起的口角炎、舌炎、唇炎、阴囊炎等。将捣烂的生栗敷外伤，则可消肿散瘀。板栗的壳、树叶、花、树皮、根均可入药。唐代《食疗本草》介绍：以栗壳煮汁饮服，可治翻胃及消渴。宋代《圣惠方》说：将栗壳烘干研末，以粥汤饮季，可治鼻出血；栗树皮煎汁，可用于某些虫咬和疮肿的外治。栗子以风干为佳，如治腰腿病，需生食，细嚼，连液慢咽。栗子与白果一同炖煮，再加百合，更是秋季补益的佳品。栗子因其生食难消化，熟食又易滞气，因此，脾胃虚弱、消化不良、脘胀腹满者尤其不宜多食。 [5]</p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"=""><strong><span style="color:navy;">京东板栗</span></strong> </p><p align="center" style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"=""> <img id="{D5C8E26E-F443-4C99-8215-63B6074FEE8B}" src="https://res.chainmall.pro/adm/2021/01/18/e9868ce08161504ac5622478e2cef9112021-01-18-16-10-46.png" align="center" style="vertical-align:top;max-width:90%;height:auto !important;" /> </p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"=""> <span style="color:#333399;font-family:楷体;">京东板栗果仁含蛋白质10.7%，脂肪7.4%，淀粉60%，糖20%，以及丰富的胡萝卜素、抗坏血酸、硫胺素、核黄素、尼克酸、维生素C、B1、B2等多种维生素和钙、磷、铁、钾等多种微量元素。热能及多种维生素和微量元素等多种成分，可供人体吸收和利用的养分高达98%。营养成分居中国板栗之首，因此京东板栗素有“干果之王”的美誉。</span> </p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"="">药用价值板栗，性味甘温，入脾、胃、肾三经，可以养胃、健脾、补肾、壮腰、强筋、活血、止血、消肿等。南梁陶弘景说其能“益气，厚肠胃，补肾气”。唐代医学名家孙思邈曾说：“栗，肾之果也，肾病宜食之；生食治腰、脚不遂。”明代李时珍称“栗能通肾”、“久食必强健”，可“治肾虚，腰脚无力，以袋盛生栗悬干，每日吃十余颗，吃猪肾粥助之，久必强健。”适用于脾胃虚寒引起的慢性腹泻，肾虚所致的腰酸膝软、腰肢不遂，小便频数以及金疮、折伤肿痛等症。吃食栗子可以益气血、养胃、补肾、健肝脾；生食还有治疗腰腿酸疼、舒筋活络的功效，栗还有驱寒止泻之效。其对人体的滋补功能可与人参、黄芪、当归等比美，而又价廉易得，倍受历代医家推崇。营养专家也指出，常食板栗，不但能养胃健脾、补肾强筋，还能健肤美容、延缓衰老。</p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"=""> <span style="color:#333399;font-family:楷体;">由于不同母岩的矿物组成、结构构造、风化程度等存在显著差异，因此母岩的岩石类型不仅决定着土壤层的地球化学特征，进而对板栗的生长和其品质的形成起着重要作用。京东板栗优质主产区的母岩主要为太古宙变质岩，包括跑马厂组、上川组、三屯营组、单塔子组、凤凰咀组、白庙组和茨榆山组等层位。岩性主要为斜长角闪岩、变粒岩、黑云斜长片麻岩等变质程度较高的变质岩。少部分板栗产在中—新元古代盖层中，主要包括常州沟组、大红峪组、高于庄组、雾迷山组和团山子组等地层，岩性主要为长石石英砂岩、含燧石条带或叠层石白云岩、白云质灰岩等。板栗喜生于花岗岩、片麻岩和砂岩发育和酸性土，pH值5.5—6.5为最适宜，且盐基应在0.2%以内，若pH值超过7.5，盐基超过0.3%，则生长不良，故盐碱土不适栽板栗。微酸性至偏酸性土壤适于栗共生的菌根菌繁殖生长，也利于对锰的吸收（栗为多锰植物）；微碱性土壤则相反。京东板栗优质产区土壤类型主要为淋溶褐土，仅在承德区域板栗取样点土壤有少量中性粗骨土出现。 [6] </span> </p><p style="margin-top:0px;margin-bottom:20px;padding:0px;font-family:" font-size:18px;white-space:normal;"=""><br /></p>',
    };
  },
  mounted() {
    findAboutUsById({ language: 1, id: 1 }).then((res) => {
      this.aboutObj = res.data;
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
  background-image: url("../../assets/img/banner_products.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
.row {
  margin-right: 0;
  margin-left: 0;
}
.about_contentImage {
  display: flex;
  justify-content: center;
  align-items: center;
}
.CompanyIntroduction-container {
  padding: 50px 0;
  color: #808080;
  transition: all ease 0.5s;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 600px;
}
.CompanyIntroduction-container > div > p {
  font-size: 14px;
  line-height: 2.5rem;
}
.img-responsive {
  width: 320px;
  height: 300px;
}
.detailContentBox {
  box-sizing: border-box;
  text-align: center;
  padding: 30px 50px;
}
.detail_box {
  width: 100%;
  padding: 30px 20px;
  background: rgba(255, 255, 255, 0.856);
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
@media screen and (max-width: 997px) {
  .about_contentImage {
    display: none;
  }
  .CompanyIntroduction-container {
    padding: 10px 0;
    color: #808080;
  }
}
</style>

