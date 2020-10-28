<!-- home -->
<template>
  <div class="app-container page-bussicenter">
    <div class="_d0">您总共赚取了佣金{{dataset.all_commission}}元</div>

    <div class="_d1">
      <img
        src="@/assets/imgs/58.png"
        class="w100"
        alt=""
      >
      <div class="_t clearfix">
        <div class="fl">
          累计佣金 <span class="font20">￥{{dataset.account}}</span>
        </div>
        <!-- <div class="fr">
          <van-button
            round
            type="info"
            size="small"
            color="#fff"
            style="color:#f16e2e"
            @click="cashout"
          >提现</van-button>
        </div> -->
      </div>
      <!-- <div class="_b">
        入账中 <span class="font20">￥{{dataset.entering_amount}}</span>
      </div> -->
    </div>
    <div class="m-card _d2">
      <div class="i-b tc _item" @click="$router.push(`/my/surplus-detail-list`)">
        <img
          src="@/assets/imgs/57.png"
          class="w100 mb10"
          alt=""
          style="width:5.9vw"
        >
        <div class="">佣金明细</div>
      </div>
      <!-- <div class="i-b tc _item">
        <img
          src="@/assets/imgs/56.png"
          class="w100 mb10"
          alt=""
          style="width:5.9vw"
        >
        <div class="">红包明细</div>
      </div> -->
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
        dataset: {}
      }

    },

    computed: {},
    created() {
      api.member_center({}).then((res) => {
        this.dataset = res.data
      })
    },
    mounted() {},

    methods: {
      cashout() {
        api.member_request_create({
          amount: this.dataset.account
        }).then((res) => {
          Toast(res.info)
        })
      },
    }
  }
</script>


<style lang="scss">
  .app-container.page-bussicenter {
    ._d0 {
      padding: 2vw 4.5vw;
      background-color: #d0d4d7;
    }

    ._d1 {
      width: 94vw;
      margin: 3vw auto;
      position: relative;
      color: #fff;

      ._t {
        width: 93%;
        position: absolute;
        top: 7vw;
        left: 3.5vw;

        button {
          color: #f16e2e !important;
        }
      }

      ._b {
        position: absolute;
        bottom: 7vw;
        left: 3.5vw;
      }
    }

    ._d2 {
      ._item {
        width: 33%;
      }
    }
  }
</style>