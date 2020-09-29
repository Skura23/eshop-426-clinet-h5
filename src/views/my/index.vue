<!-- home -->
<template>
  <div class="app-container page-my re">
    <img
      src="@/assets/imgs/43.png"
      style="width:100%;z-index:-1;"
      alt=""
      class="ab"
    >
    <div class="_page-wra">
      <div class="_d0">
        <div class=" _d0-0">
          <div class="_l re">
            <van-image
              width="13vw"
              height="13vw"
              fit="cover"
              round
              :src="require('@/assets/imgs/78.png')"
            />
            <span class="ml font16 cl-whi">封印</span>
            <img
              src="@/assets/imgs/44.png"
              style="width:5.2vw;"
              alt=""
              class="ab _edit"
            >
          </div>
          <!-- <div class="_r">
            <img
              src="@/assets/imgs/45.png"
              style="width:10.3vw"
              alt=""
            >
          </div> -->

        </div>

        <div class="_d0-1 mt cl-whi">
          <div class="">
            <div class="font18">0</div>
            <div class="">我的佣金</div>
          </div>
          <div class="">
            <div class="font18">0</div>
            <div class="">我的积分</div>
          </div>
        </div>


      </div>

      <div class="_d1 m-card">
        <van-cell
          title="我的订单"
          is-link
          value="全部订单"
          :border="false"
          @click="jumpTo('orders')"
        />
        <van-row class="tc _b mt font12">
          <van-col
            span="6"
            @click="jumpTo('orders', 'topay')"
          >
            <img
              src="@/assets/imgs/26.png"
              alt=""
            >
            <div class="mt5">待付款</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('orders', 'tosend')"
          >
            <img
              src="@/assets/imgs/25.png"
              alt=""
            >
            <div class="mt5">待发货</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('orders', 'torecieve')"
          >
            <img
              src="@/assets/imgs/28.png"
              alt=""
            >
            <div class="mt5">待收货</div>
          </van-col>
          <van-col span="6">
            <img
              src="@/assets/imgs/27.png"
              @click="jumpTo('refund-orders')"
              alt=""
            >
            <div class="mt5">退款 售后</div>
          </van-col>
        </van-row>
      </div>

      <div class="mt"></div>

      <div class="_d2 m-card ">
        <van-cell
          title="我的权益"
          :border="false"
        />
        <van-row class="tc _b mt font12">
          <van-col
            span="6"
            @click="jumpTo('bussi')"
          >
            <img
              src="@/assets/imgs/29.png"
              alt=""
            >
            <div class="mt5">创业中心</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('bargain')"
          >
            <img
              src="@/assets/imgs/30.png"
              alt=""
            >
            <div class="mt5">我的砍价</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('seckill')"
          >
            <img
              src="@/assets/imgs/31.png"
              alt=""
            >
            <div class="mt5">我的秒杀</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('group')"
          >
            <img
              src="@/assets/imgs/32.png"
              alt=""
            >
            <div class="mt5">我的拼团</div>
          </van-col>
        </van-row>

        <van-row class="tc _b mt font12">
          <van-col
            span="6"
            @click="jumpTo('credit')"
          >
            <img
              src="@/assets/imgs/33.png"
              alt=""
            >
            <div class="mt5">积分商城</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('checkin')"
          >
            <img
              src="@/assets/imgs/34.png"
              alt=""
            >
            <div class="mt5">每日任务</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('cart')"
          >
            <img
              src="@/assets/imgs/36.png"
              alt=""
            >
            <div class="mt5">购物车</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('coupon')"
          >
            <img
              src="@/assets/imgs/35.png"
              alt=""
            >
            <div class="mt5">优惠券</div>
          </van-col>
        </van-row>
      </div>

      <div class="mt"></div>

      <div class="_d3 m-card">
        <van-cell
          value="更多"
          is-link
          :border="false"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">积分商城</span>
            <!-- <img
              src="@/assets/imgs/42.png"
              class="ml10"
              style="width:3.5vw"
              alt=""
            >
            <span class="font12"> 封印成功领取“无门槛优惠券···</span> -->
          </template>
          <template>
            <span @click="jumpTo('credit')">更多</span>
          </template>
        </van-cell>
        <div class="_cont mt10">
          <div
            class="_i font12 mb10 mr10"
            v-for="(item, index) in 4"
            :key="index"
          >
            <div class="_i-0 tc">
              <van-image
                width="21vw"
                height="23vw"
                fit="cover"
                :src="require('@/assets/imgs/78.png')"
              />
            </div>
            <div class="_i-1 mt5">
              <img
                src="@/assets/imgs/40.png"
                style="width:15vw;"
                alt=""
              >
            </div>
            <div class="_i-2 mt10">
              小米小钢炮蓝牙音箱
            </div>
            <div class="_i-3 mt10">
              <span class="font16 cl-red bold">4000</span>
              <span> 积分+￥5···</span>
            </div>
          </div>
        </div>
      </div>

      <div class="mt"></div>

      <div class="_d4 m-card">
        <van-cell
          value="更多"
          is-link
          :border="false"
        >
          <!-- 使用 title 插槽来自定义标题 -->
          <template #title>
            <span class="custom-title">免费领</span>
            <!-- <img
              src="@/assets/imgs/42.png"
              class="ml10"
              style="width:3.5vw"
              alt=""
            >
            <span class="font12"> 封印成功领取“无门槛优惠券···</span> -->
          </template>
        </van-cell>
        <div class="_cont mt10">
          <div
            class="_i font12 mb10 mr10"
            v-for="(item, index) in 4"
            :key="index"
          >
            <div class="_i-0 tc">
              <van-image
                width="21vw"
                height="23vw"
                fit="cover"
                :src="require('@/assets/imgs/78.png')"
              />
            </div>
            <div class="_i-1 mt5">
              <img
                src="@/assets/imgs/41.png"
                style="width:15vw;"
                alt=""
              >
            </div>
            <div class="_i-2 mt10">
              小米小钢炮蓝牙音箱
            </div>
            <div class="_i-3 mt10">
              距门店4679m
            </div>
          </div>
        </div>
      </div>
      <div class="mt"></div>

      <div class="_d5 m-card ">
        <van-cell
          title="其他服务"
          :border="false"
        />
        <van-row class="tc _b mt font12">
          <van-col
            span="6"
            @click="jumpTo('book')"
          >
            <img
              src="@/assets/imgs/38.png"
              alt=""
            >
            <div class="mt5">我的收藏</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpTo('address')"
          >
            <img
              src="@/assets/imgs/39.png"
              alt=""
            >
            <div class="mt5">收货地址</div>
          </van-col>
          <van-col
            span="6"
            @click="jumpToServ"
          >
            <img
              src="@/assets/imgs/37.png"
              alt=""
            >
            <div class="mt5">客服咨询</div>
          </van-col>
        </van-row>

      </div>
    </div>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import Vue from 'vue'

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        serviceUrl: ''
      }

    },

    computed: {},
    created() {
      api.shop_card_detail({}).then((res) => {
        this.serviceUrl = `/card/chat?auth_code=${res.data.auth_code}`
      })
    },
    mounted() {},

    methods: {
      jumpToServ() {
        this.$router.push(this.serviceUrl)
      },
      jumpTo(str, flag0) {

        if (str == 'bussi') {
          this.$router.push('/my/bussi-center')
        }
        if (str == 'orders') {
          // this.$router.push('/my/orders')
          if (flag0) {
            utils.jumpTo(`/my/orders?orderType=${flag0}`)
          } else {
            utils.jumpTo('/my/orders')
          }
        }
        if (str == 'refund-orders') {
          utils.jumpTo('/my/refund-orders')
        }
        if (str == 'seckill') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/seckill')
        }
        if (str == 'group') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/group')
        }
        if (str == 'checkin') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/checkin')
        }
        if (str == 'cart') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/cart')
        }
        if (str == 'coupon') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/coupon')
        }
        if (str == 'book') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/book')
        }
        if (str == 'address') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/address')
        }
        if (str == 'service') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/my/service')
        }
        if (str == 'credit') {
          // this.$router.push('/my/orders')
          utils.jumpTo('/credit/index')
        }

      },
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-my {
    ._page-wra {
      ._d0 {
        padding: 6vw;

        ._d0-0 {
          @include flexbox();

          ._l {
            display: flex;
            align-items: center;

            ._edit {
              left: 10vw;
              top: 8vw;
            }
          }
        }

        ._d0-1 {
          text-align: center;
          @include flexbox();
          justify-content: space-evenly;
        }
      }

      ._d1 {
        ._b {
          img {
            height: 6.4vw;
          }
        }
      }

      ._d2,
      ._d5 {
        ._b {
          img {
            height: 6.4vw;
          }
        }
      }

      ._d3,
      ._d4 {
        ._cont {
          overflow-x: scroll;
          white-space: nowrap;

          ._i {
            width: 27.3vw;
            display: inline-block;

            ._i-2 {
              @include textoverflow();

            }

            ._i-3 {
              @include textoverflow();

            }
          }
        }
      }

      .van-cell {
        padding: 0;

        .van-cell__title {
          flex: 3;
          @include textoverflow();
        }

        .van-cell__value {
          font-size: 3vw;
        }
      }
    }
  }
</style>