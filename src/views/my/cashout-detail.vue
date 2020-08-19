<!-- home -->
<template>
  <div class="app-container page-cashout-detail">
    <div class="_d0 tc">
      <van-image
        width="11vw"
        height="11vw"
        style="margin-top:11vw"
        fit="cover"
        :src="require('@/assets/imgs/80.png')"
      />
      <div class="font16 mt">
        零钱提现-到工商银行（8876）
      </div>
      <div class="font16 mt">
        700.70
      </div>
    </div>

    <div class="_d1 clearfix mt">
      <div
        class="fl"
        style="margin-left:16px;"
      >当前状态</div>
      <div class="fl">
        <div class="_d1_d re">
          <div class="ab _ab _dot"></div>
          <div class="">发起提现</div>
          <div class="mt10">2020-07-17 13：34：12</div>
        </div>
        <div class="_d1_d re">
          <div class="ab _ab _dot"></div>
          <div class="">银行处理中</div>
          <div class="mt10">2020-07-17 13：34：12</div>
        </div>
        <div class="_d1_d re">
          <div class="ab _ab">
            <van-image
              width="9vw"
              height="9vw"
              fit="cover"
              :src="require('@/assets/imgs/79.png')"
            />
          </div>
          <div class="">到账</div>
          <div class="mt10">2020-07-17 13：34：12</div>
        </div>
      </div>
    </div>

    <div class="_d2">
      <van-cell-group>
        <van-cell
          title="提现金额"
          value="内容"
        />
        <van-cell
          title="服务费"
          value="内容"
        />
        <van-cell
          title="申请时间"
          value="内容"
        />
        <van-cell
          title="提现金额"
          value="内容"
        />
        <van-cell
          title="提现银行"
          value="内容"
        />
        <van-cell
          title="提现单号"
          value="内容"
        />
      </van-cell-group>
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
  .app-container.page-cashout-detail {

    .van-cell,
    .van-cell-group {
      background-color: transparent;
    }

    .van-cell__title {
      flex: unset;
    }

    .van-cell__value {
      margin-left: 4vw;
      text-align: left;
    }

    ._d1 {
      ._d1_d {
        height: 9vw;
        margin-bottom: 5vw;
        margin-left: 19vw;

        ._dot {
          width: 3vw;
          height: 3vw;
          border-radius: 99px;
          background-color: #019e0c;
        }

        .ab {
          left: -10vw;
          top: 0;
          transform: translateX(-50%);
        }
      }
    }
  }
</style>