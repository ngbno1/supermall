<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="setActiveColor"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    data(){
      return {

      }
    },
    props: {
      path: String,
      activeColor:{
        type: String,
        default: 'red'
      }
    },
    computed:{
      isActive(){
        // console.log(this.$route.path, this.path);
        return this.$route.path == this.path;
      },
      setActiveColor(){
        return this.isActive? {color: this.activeColor}: {}
      }
    },
    methods: {
      itemClick(){
        this.$router.replace(this.path)
      }
    }
  }
</script>

<style scoped>
  .tab-bar-item{
    flex: 1;
    text-align: center;
    font-size:14px;
    height: 49px;
    box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
  }

  .isActive{
    color: red;
  }
</style>
