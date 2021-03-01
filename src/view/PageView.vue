<template>
  <div id="container">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "PageView",
};
</script>
<style scoped>
#container{
  min-height: 600px;
}
</style>

