import { request } from "./http";
import store from "../store";
// 获取banner
export function findBanners(obj) {
  return request({
    method: "get",
    url: "/banner/findBanners",
    params: obj
  });
}
// 获取新闻活动各一条
export function findTwoArticles(obj) {
  return request({
    method: "get",
    url: "/article/findTwoArticles",
    params: obj
  });
}
// 获取首页新闻列表
export function findAllArticles(obj) {
  return request({
    method: "get",
    url: "/article/findAllArticles",
    params: obj
  });
}
// 获取首页热点推荐
export function findFiveArticles(obj) {
  return request({
    method: "get",
    url: "/article/findFiveArticles",
    params: obj
  });
}
// 查询首页产品列表
export function findAllProduct(obj) {
  return request({
    method: "get",
    url: "/product/findAllProduct",
    params: obj
  });
}
// 获取新闻详情
export function findArticleById(obj) {
  return request({
    method: "get",
    url: "/article/findArticleById",
    params: obj
  });
}
// 获取产品详情
export function findProductById(obj) {
  return request({
    method: "get",
    url: "/product/findProductById",
    params: obj
  });
}
// 获取产品分类
export function findAllProductClass(obj) {
  return request({
    method: "get",
    url: "/product/findAllProductClass",
    params: obj
  });
}
// 获取产品区域
export function findAllProductRegion(obj) {
  return request({
    method: "get",
    url: "/product/findAllProductRegion",
    params: obj
  });
}
// 获取热门产品
export function findFiveProductFive(obj) {
  return request({
    method: "get",
    url: "/article/findFiveProductFive",
    params: obj
  });
}
// 获取关于我们详情
export function findAboutUsById(obj) {
  return request({
    method: "get",
    url: "/aboutUs/findAboutUsById",
    params: obj
  });
}
// 查询友情链接
export function findAllFriendLinks(obj) {
  return request({
    method: "get",
    url: "/friendLink/findAllFriendLinks",
    params: obj
  });
}
// 获取组织成员
export function allOrganizations(obj) {
  return request({
    method: "get",
    url: "/organization/allOrganizations",
    params: obj
  });
}
export function GoTop() {
  (function smoothscroll() {
    var currentScroll =
      document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
      window.requestAnimationFrame(smoothscroll);
      window.scrollTo(0, currentScroll - currentScroll / 10);
    }
  })();
}
