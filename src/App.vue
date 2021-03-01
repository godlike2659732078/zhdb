<template>
  <div id="app">
    <Header v-if="this.$store.state.language == 'CN'"></Header>
    <Headers v-else></Headers>
    <router-view />
    <Footer v-if="this.$store.state.language == 'CN'"></Footer>
    <Footers v-else></Footers>
    <GoTop></GoTop>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      lan: this.$store.state.language,
    };
  },
  watch: {
    "$store.state.language"(newval, olval) {
      // console.log(newval);
      // console.log(this.$route);
      if (this.$route.query.id) {
        this.$router.push({ path: "/" + newval + "/" + this.$route.name+"?id="+this.$route.query.id});
      }else{
         this.$router.push({ path: "/" + newval + "/" + this.$route.name});
      }
    },
  },

};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

</style>
