<template>
  <section id="noCommodities" class="re">
    <!-- <div class="no_commodities_logo_wrapper">
      <figure class="no_commodities_logo"></figure>
    </div>
    <p class="no_commodities_warning">购物车空空如也</p>
    <p class="no_commodities_suggest">快给我挑点宝贝吧</p> -->
    <div class="v-h-center"></div>
    <img src="@/assets/imgs/61.png" alt="">
    <!-- <button class="link_to_home" @click="$router.push('/mall/index')">去逛逛</button> -->
    <div class="tc">
<van-button type="primary" color="#ff7728" style="width:40vw; border-radius:2vw;">随便逛逛</van-button>
    </div>
  </section>
</template>

<script>
export default {
  name: 'noCommodities',
  data() {
    return {};
  },
  props: {},
  mounted() {
  },
  methods: {},
};
</script>

<style lang="scss">
  #noCommodities {
    height: 100vh;
    // background: $no_commodities_gray;
    margin: 0 auto;
    padding-top: rem(100);
    text-align: center;
    .no_commodities_logo_wrapper {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      width: rem(110);
      height: rem(110);
      background: $no_commodities_log_bg_gray;
      border-radius: 50%;
      .no_commodities_logo {
        width: rem(60);
        height: rem(60);
        background: url('http://gw.alicdn.com/tfscom/TB1xdQSJFXXXXcuXXXXy7S8WFXX-176-176.png') no-repeat center center;
        background-size: cover;
      }
    }
    .no_commodities_warning {
      font-size: $font_size_14;
      color: $no_commodities_txt_black;
      margin: rem(12) 0 rem(5);
    }
    .no_commodities_suggest {
      color: $invaid_gray;
    }
    .link_to_home {
      margin-top: rem(20);
      border: rem(.5) solid $no_commodities_txt_black;
      color: $no_commodities_txt_black;
      padding: rem(4) rem(25);
      border-radius: rem(4);
      background: transparent;
    }
  }
</style>
