<template>
  <div class="templateCont">
    <!--轮播图-->
    <div class="swiper-box">
      <div class="swiper">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              750*370 -1
            </div>
            <div class="swiper-slide">
              750*370 -2
            </div>
            <div class="swiper-slide">
              750*370 -3
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>

    </div>

    <!--三张图片-->
    <div class="threeImg">
      <div class="one">
        370*530
      </div>
      <div class="two">373*260</div>
      <div class="three">373*260</div>
    </div>
    <!--两张图片-->
    <div class="twoImg">
      <div class="one">
        370*530
      </div>
      <div class="two">
        370*530
      </div>
    </div>
    <!--一张图片-->
    <div class="oneImg">
    750*>=200
    </div>

    <ul class="productCont">
      <li>
        <img src="" alt="">
        <p class="name">小米8 清楚本</p>
        <p class="desc">小米8 清楚本</p>
        <span class="price">1339元</span><span class="price-old">339元</span>
      </li>
      <li>
        <img src="" alt="">
        <p class="name">小米8 清楚本</p>
        <p class="desc">小米8 清楚本</p>
        <span class="price">1339元</span><span class="price-old">339元</span>
      </li>
    </ul>



  </div>
</template>
<script>
  import "scss/channel/template.scss"
  import Swiper from "swiper";
  import "swiper/dist/css/swiper.min.css";
  export default {
    data(){

    },
    mounted(){
      var mySwiper = new Swiper('.swiper-container', {
        autoplay:true,
        loop:true,
        pagination: {
          el: '.swiper-pagination',
        },
      })
    }
  }
</script>
