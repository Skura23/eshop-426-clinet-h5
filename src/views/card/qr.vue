<!-- home -->
<template>
  <div class="app-container page-card-qr tc">
    <div class="_d0 font18">张三</div>
    <div class="_d1 font12">营销总监</div>
    <div class="_d2 re">
      <img
        src="@/assets/imgs/12.png"
        class=" v-h-center"
        style="width:56vw"
        alt=""
      >
      <div
        class="v-h-center bac-whi"
        style="width:47vw;height:47vw;"
      >
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="require('@/assets/imgs/78.png')"
        />
      </div>
      
    </div>
    <div class="_d3 font12 cl-gray">新零售</div>
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
  .app-container.page-card-qr {
    ._d0 {
      margin-top: 13vw;
    }

    ._d1 {
      margin-top: 4vw;
    }

    ._d2 {
      margin-top: 17vw;
      height: 56vw;
    }

    ._d3 {
      margin-top: 20vw;
    }
  }
</style>