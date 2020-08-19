<!-- home -->
<template>
  <div class="app-container page-my-refund">
    <div
      class="bac-whi mt10 _d0"
      style="padding:3vw"
    >
      <div class="_d0_0">
        <van-image
          width="20vw"
          height="20vw"
          fit="cover"
          :src="require('@/assets/imgs/78.png')"
        />
      </div>
      <div class="_d0_1 ml10">
        <div class="">
          睡衣睡裤春季纯棉睡衣睡裤
          春季纯棉
        </div>
        <div class="mt cl-gray">
          黄色；30寸
        </div>
      </div>
    </div>

    <div class="_d1 mt10">
      <van-cell
        title="退款原因"
        is-link
      />
      <van-field
        v-model="text"
        label="退款金额:"
      />
      <van-cell
        title="可修改，最多￥1000，含发货邮费：￥0.00"
        class="_tip"
      />
      <van-cell
        title="退货方式"
        is-link
      />

      <van-field
        v-model="text"
        label="退货说明:"
        class="mt10"
      />
    </div>

    <div
      class="_d2 bac-whi mt10"
      style="padding: 10px 16px;"
    >
      上传凭证
      <van-uploader
        v-model="fileList"
        :max-count="9"
        class="mt10"
        :after-read="afterRead"
        @delete="deleteImg"
      />
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
  .app-container.page-my-refund {
    ._d0 {
      @include flexbox();
      justify-content: start;

      ._d0_0 {}

      ._d0_1 {}
    }

    ._d1 {
      ._tip {
        .van-cell__title {
          font-size: 2vw;
          color: darkgray;
        }
      }
    }
  }
</style>