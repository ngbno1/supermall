<template>

  <main-tab-bar/>
  <router-view></router-view>
</template>

<script>
import MainTabBar from "components/content/MainTabBar/MainTabBar";
export default {
  name: 'App',
  components: {
    MainTabBar
  }
}
</script>

<style>
  @import "assets/css/base.css";

</style>
