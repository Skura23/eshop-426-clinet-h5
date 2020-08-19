<!-- home -->
<template>
  <div class="app-container page-cashout-list">
    <div class="_item">
      <div class="font18 bold mt10 ml10">2020年8月</div>
      <div class="cl-gray mt10 ml10">收入¥8769.77</div>
      <div
        class="bac-whi mt10 _d0"
        style="padding: 3vw;"
      >
        <van-image
          width="11vw"
          height="11vw"
          fit="cover"
          :src="require('@/assets/imgs/80.png')"
        />
        <div class="_mid">
          <div class="font18">零钱提现-工商银行（8876）</div>
          <div class="cl-gray mt10">4月27日 08:55</div>
        </div>
        <div class="">700.70</div>
      </div>
    </div>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {

      }

    },

    computed: {},
    created() {

    },
    mounted() {},

    methods: {}
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-cashout-list {
    ._d0{
      @include flexbox();
      ._mid{
        flex:1;
        margin: 0 2vw;
      }
    }
  }
</style>