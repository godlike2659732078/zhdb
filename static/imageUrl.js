exports.install = function(Vue, options) {
  Vue.prototype.getImageUrl = function(url) {
    //全局函数1
    // return "http://img.wgio.net/" + url;
    return "https://image.wgio.net/image/" + url;
  };
};
