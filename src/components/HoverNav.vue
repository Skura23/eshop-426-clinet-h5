<template>
  <div class="hover-nav">
    <div class="_hover-nav-btns  re">
      <div
        :class="[{'fadeInUp' :f_hoverNavFadeining === true}, {'fadeOutDown':f_hoverNavFadeining === false},'_inner', 'animated', 'ab']"
      >
        <!-- <img
          src="@/assets/imgs/13.png"
          class="_0"
          @click="toggleQr"
          alt
        >
        <img
          src="@/assets/imgs/13.png"
          class="_3"
          @click="toOuterSite('tel')"
          alt
        >
        <img
          src="@/assets/imgs/13.png"
          class="_1"
          @click="toOuterSite('kefu')"
          alt
        > -->
        <div
          style="width:10vw;background-color:#3333338f;color:#fff;font-size:5vw;height:10vw;"
          class="animated bor99 tc font18 _0"
        >
          <div style="height:100%;">
            <van-icon name="share" style="vertical-align: -2.5vw;" />
          </div>
        </div>
        <div
          style="width:10vw;background-color:#3333338f;color:#fff;font-size:5vw;height:10vw;"
          class="animated bor99 tc _1"
          @click="toOuterSite('cart')"
        >
          <div style="height:100%;">
            <van-icon name="cart-o" style="vertical-align: -2.5vw;" />
          </div>
        </div>
        <div
          style="width:10vw;background-color:#3333338f;color:#fff;font-size:5vw;height:10vw;"
          class="animated bor99 tc _3"
          @click="toOuterSite('service')"
        >
          <div style="height:100%;">
            <van-icon name="service-o" style="vertical-align: -2.5vw;" />
          </div>
        </div>
        <!-- <img src="@/assets/images/46.png" class="_2" @click="toOuterSite('sns')" alt> -->
      </div>
    </div>
    <div class="_hover-nav-btn ab">
      <!-- <img
        src="@/assets/imgs/13.png"
        class="animated"
        :class="[{'cwRotate' :f_hoverNavFadeining === true}, {'ccwRotate':f_hoverNavFadeining === false}]"
        @click="hoverNavFade"
        alt
      > -->
      <div
        style="background-color:#3333338f;color:#fff;font-size:2.5vw;height:100%;overflow: auto;"
        class="animated bor99 tc"
        :class="[{'cwRotate' :f_hoverNavFadeining === true}, {'ccwRotate':f_hoverNavFadeining === false}]"
        @click="hoverNavFade"
      >
        <div style="margin-top: 0.7vw;">快捷</div>
        <div>导航</div>
      </div>
    </div>
    <!-- <SimplePop :f_show="f_qrShow" @onChildClose="toggleQr">
      <img
        slot="content"
        src="http://maibao.com/web/resource/images/h5-home/8.png"
        style="width: 84vw;position: fixed;z-index: 200;"
        class="v-h-center u-mask-cont"
      >
    </SimplePop> -->
  </div>
</template>

<script type='text/babel'>
  // import SimplePop from "@/components/SimplePop.vue";
export default {
  data() {
    return {
      // hover nav 是否在fadein
      f_hoverNavFadeining: false,
      f_qrShow: false
    };
  },
  name:'HoverNav',
  created() {},
  mounted() {},
  methods: {
    toOuterSite(type) {
      let href = "";
      if (type === "cart") {
        this.$router.push('/my/cart')
      } else if (type === "service") {
        // href ='http://www.maibao.com/app/index.php?i=4&c=entry&id=1&do=groupchat&m=cy163_customerservice'
      } else if (type === "tel") {
        href ="tel:18096622920";
      } 
      // else if (type === "sns") {
      //   href = window.g.url + "&r=sns.board&id=6&from=mbh5home";
      // } else if (type === "fenxiao") {
      //   href = window.g.url + "&r=commission&from=mbh5home";
      // }
      // window.location.href = href;
    },
    hoverNavFade() {
      // location.href = 'http://www.maibao.com/app/index.php?i=4&c=entry&id=1&do=groupchat&m=cy163_customerservice';
      // return
      if (this.f_hoverNavFadeining === null) {
        this.f_hoverNavFadeining = true;
      } else {
        this.f_hoverNavFadeining = !this.f_hoverNavFadeining;
      }
    },
    toggleQr() {
      this.f_qrShow = !this.f_qrShow;
    }
  },
  components: {
    // SimplePop
  }
};
</script>

<style
  scoped
  lang='scss'
>
  .animated {
    // animation-duration: 1s;
    // animation-fill-mode: forwards;
    transition: 0.6s;
  }

  .cwRotate {
    transform: rotate(360deg);
  }

  .ccwRotate {
    transform: rotate(0deg);
  }

  .fadeInUp {
    // -webkit-animation-name: fadeInUp;
    // animation-name: fadeInUp;
    opacity: 1;
    transform: translate3d(0, calc(-12vw - 100%), 0);
  }

  .fadeOutDown {
    // -webkit-animation-name: fadeOutDown;
    // animation-name: fadeOutDown;
    opacity: 0;
    transform: translate3d(0, -95%, 0);
  }

  @keyframes fadeInUp {
    0% {
      // -webkit-transform: translate3d(0, 100%, 0);
      opacity: 0;
      // transform: translate3d(0, 0, 0);
    }

    to {
      // -webkit-transform: translateZ(0);
      opacity: 1;
      // transform: translateZ(0);
      transform: translate3d(0, -100%, 0);
    }
  }

  @keyframes fadeOutDown {
    // 0% {
    //   opacity: 1;
    //   // transform: translate3d(0, -100%, 0);
    // }

    to {
      // -webkit-transform: translate3d(0, 0, 0);
      opacity: 0;
      transform: translate3d(0, 0, 0);
    }
  }

  .hover-nav {
    position: fixed;
    right: 6vw;
    bottom: 20vw;
    width: 10vw;
    z-index: 300;

    img {
      width: 100%;
    }

    ._hover-nav-btns {
      width: 10vw;
      // height: 60vw;
      border-radius: 999px;

      // margin-bottom: 2vw;
      ._inner {
        // top: 100%;
        top: 100%;
        left: 0;
        font-size: 0;

        // transform: translate3d(0, 100%, 0);
        ._0,
        ._1,
        ._3 {
          margin-bottom: 2vw;
        }
      }
    }

    ._hover-nav-btn {
      width: 10vw;
      height: 10vw;
      bottom: 0;
      left: 0;

      img {
        &._i0 {
          margin-bottom: 2vw;
        }
      }
    }
  }
</style>