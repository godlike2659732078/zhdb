import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    language: sessionStorage.getItem("language") || "CN"
  },
  mutations: {
    changeLanguage(state, language) {
      state.language = language;
      sessionStorage.setItem("language", language);
      if (language == "CN") {
        document.title="中华国际地标发展组织"
        sessionStorage.setItem("title", "中华国际地标发展组织");
      } else {
        document.title="Greater International Development Organization"
        sessionStorage.setItem("title", "Greater International Development Organization");
      
      }
    }
  },
  actions: {}
});
