<template>
  <div id="swiper-container">
    <div class="swiper" @touchstart="touchStart" @touchmove="touchMove" @touchend="touchEnd">
      <slot></slot>
    </div>
    <slot name="indicator">
    </slot>
    <div class="indecator" v-if="showIndicator && imageCount > 1">
        <slot name="indecator">
          <div v-for="(item, index) in imageCount" class="indi-item" :class="{active: index === currentIndex-1}" :key="index"></div>
        </slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Swiper",
    props: {
      interval: {
        type: Number,
        default: 3000
      },
      animDuration: {
        type: Number,
        default: 300
      },
      moveRatio: {
        type: Number,
        default: 0.25
      },
      showIndicator: {
        type: Boolean,
        default: true
      }
    },
    data(){
      return {
        currentIndex: 1,
        imageCount: 0,
        swiperStyle: {},
        totalWidth: 0,
        scrolling: false
      }
    },
    mounted() {
      setTimeout(()=>{
        //初始化相关数据及增加Dom
        this.initData();

        this.startTimer();
        },1000);
    },
    methods:{
      //初始化数据及添加dom
      initData(){
        let swiperEl = document.querySelector('.swiper');
        let swiperItemEl = swiperEl.getElementsByClassName('swiper-item');
        //设置轮换图片数量
        this.imageCount = swiperItemEl.length;
        this.swiperStyle = swiperEl.style;
        //前后添加2张图片,目的是为了实现无缝轮换
        let first = swiperItemEl[0].cloneNode(true);
        let last = swiperItemEl[this.imageCount -1].cloneNode(true);
        swiperEl.insertBefore(last,swiperItemEl[0]);
        swiperEl.appendChild(first);
        //设置宽度
        this.totalWidth = swiperEl.offsetWidth;

        //设置显示正常的第一张图片
        this.setTransform(-this.totalWidth);
      },
      setTransform(position){
        // console.log(position);
        //设置位移
        this.swiperStyle.transform = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-webkit-transform'] = `translate3d(${position}px,0,0)`;
        this.swiperStyle['-moz-transform'] = `translate3d(${position}px,0,0)`;
      },
      startTimer(){
        this.playTime = window.setInterval(() =>{
          this.currentIndex++;
          this.scrollContent(-this.currentIndex * this.totalWidth);
        },this.interval);
      },
      stopTimer(){
        window.clearInterval(this.playTime);
      },
      scrollContent(position){
        this.scrolling = true;

        this.swiperStyle.transition = 'transform ' + this.animDuration + 'ms';
        this.setTransform(position);
        //检查轮换图片位置
        this.checkSwiperPostion();

        this.scrolling = false;
      },
      checkSwiperPostion(){
        setTimeout(() => {
          this.swiperStyle.transition = '0ms';
          if(this.currentIndex >= this.imageCount + 1){
            this.currentIndex = 1;
            this.setTransform(-this.totalWidth);
          }else if(this.currentIndex <= 0){
            this.currentIndex = this.imageCount;
            this.setTransform(-this.currentIndex * this.totalWidth);
          }
        },this.animDuration)
      },
      touchStart(e){
        // 1.如果正在滚动, 不可以拖动
        if(this.scrolling) return;

        //停止自动滚动
        this.stopTimer();

        //保存移动起始位置
        this.startX = e.touches[0].pageX;
      },
      touchMove: function (e) {
        //移动坐标
        this.moveX = e.touches[0].pageX;
        //坐标差
        this.distance = this.moveX - this.startX;

        //设置移动当前距离
        this.setTransform(-this.currentIndex * this.totalWidth + this.distance);

      },

      touchEnd: function (e) {
        let currentX = Math.abs(this.distance);

        if(this.distance === 0) {
          return;
        }else if(this.distance > 0 && currentX > this.totalWidth * this.moveRatio){
          this.currentIndex--;
        }else if(this.distance < 0 && currentX > this.totalWidth * this.moveRatio){
          this.currentIndex++;
        }

        this.scrollContent(-this.currentIndex * this.totalWidth);

        this.startTimer();
      },
      /**
       * 控制上一个, 下一个
       */
      previous: function () {
        this.changeItem(-1);
      },
      next: function () {
        this.changeItem(1);
      },
      changeItem: function (num) {
        // 1.移除定时器
        this.stopTimer();

        // 2.修改index和位置
        this.currentIndex += num;
        this.scrollContent(-this.currentIndex * this.totalWidth);

        // 3.添加定时器
        this.startTimer();
      }
    }

  }
</script>

<style scoped>
  #swiper-container{
    overflow: hidden;
    position: relative;
  }

  .swiper{
    display: flex;
  }

  .indecator{
    display: flex;
    justify-content: center;
    position: absolute;
    width: 100%;
    bottom: 8px;
  }

  .indi-item{
    box-sizing: border-box;
    width: 8px;
    height: 8px;
    background: #fff;
    border-radius: 4px;
    line-height: 8px;
    font-size: 12px;
    text-align: center;
    margin: 0 5px;
  }

  .indi-item.active{
    background-color: rgba(212,62,46,1.0);
  }
</style>
