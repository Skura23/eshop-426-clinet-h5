<!-- home -->
<template>
  <div class="app-container page-my-checkin">
    <div class="_d0 ab">
      <img
        src="@/assets/imgs/47.png"
        class="w100"
        alt=""
      >
      <div
        class="_num font20 h-center cl-red"
        style="top:19.9vw;left: 47.7%;"
      >{{signData.integral}}</div>
      <img
        src="@/assets/imgs/55.png"
        class="ab"
        style="width:11.5vw;right:0;top:24vw;"
        alt=""
      >
    </div>
    <div class="_d1">
      <div class="_d1-0 tc cl-oran borr">
        当月已累计<span class="font18">{{signData.current_month_day}}</span>天签到，获得<span
          class="font18">{{signData.current_month_integral}}</span>积分
      </div>
      <div class="m-card ">
        <div
          class="ov"
          :style="{height:f_calenFold?'35vw':'auto'}"
        >
          <Calendar
            v-on:choseDay="clickDay"
            v-on:changeMonth="changeDate"
            v-on:isToday="clickToday"
            :markDate="signData.sign_detail"
          ></Calendar>
        </div>

        <div
          class="tc"
          style="color:#b4b4b4"
          @click="togCalend"
        >{{f_calenFold?"展开":"收起"}}日历
          <van-icon :name="`arrow-${f_calenFold?'down':'up'}`" />
        </div>
        <div class="tc">
          <van-button
            size="large"
            class="mt"
            round
            style="width:74vw;"
            color="linear-gradient(90deg, #ff7115 0%, #ff3e13 100%)"
            @click="sign"
          >签到领积分</van-button>
        </div>

      </div>
    </div>

    <div class="mt"></div>

    <div class="_d2 m-card ">
      <van-cell
        title="签到累计福利"
        is-link
        value="积分明细"
        :border="false"
      />
      <div class="tc _b mt font12 tc">
        <div class="_i i-b">
          <div class="">
            <img
              src="@/assets/imgs/46.png"
              alt=""
              style="width:8vw"
              v-if="signData.current_month_day>=7"
              @click="getSignBonus(7)"
            >
            <img
              src="@/assets/imgs/54.png"
              alt=""
              style="width:8vw"
              v-else
            >
          </div>
          <div class="mt10">7天</div>
        </div>
        <div class="_i i-b">
          <img
            src="@/assets/imgs/50.png"
            alt=""
            class="_line"
            style=""
          >
        </div>
        <div class="_i i-b">
          <div class="">
            <img
              src="@/assets/imgs/54.png"
              alt=""
              style="width:8vw"
              v-if="signData.current_month_day>=14"
              @click="getSignBonus(14)"
            >
            <img
              src="@/assets/imgs/54.png"
              alt=""
              style="width:8vw"
              v-else
            >
          </div>
          <div class="mt10">14天</div>
        </div>
        <div class="_i i-b">
          <img
            src="@/assets/imgs/50.png"
            alt=""
            class="_line"
            style=""
          >
        </div>
        <div class="_i i-b">
          <div class="">
            <img
              src="@/assets/imgs/54.png"
              alt=""
              style="width:8vw"
              v-if="signData.current_month_day>=21"
              @click="getSignBonus(21)"
            >
            <img
              src="@/assets/imgs/54.png"
              alt=""
              style="width:8vw"
              v-else
            >
          </div>
          <div class="mt10">21天</div>
        </div>
        <div class="_i i-b">
          <img
            src="@/assets/imgs/50.png"
            alt=""
            class="_line"
            style=""
          >
        </div>
        <div class="_i i-b">
          <div class="">
            <img
              src="@/assets/imgs/54.png"
              alt=""
              style="width:8vw"
              v-if="signData.current_month_day>=28"
              @click="getSignBonus(28)"
            >
            <img
              src="@/assets/imgs/54.png"
              alt=""
              style="width:8vw"
              v-else
            >
          </div>
          <div class="mt10">28天</div>
        </div>

      </div>
    </div>

    <div class="mt"></div>

    <div class="_d3 bac-whi mb">
      <div class="tc">
        <img
          src="@/assets/imgs/52.png"
          style="width:55vw;"
          alt=""
        >
      </div>
      <van-tabs v-model="active">
        <van-tab title="标签 1">
          <template #title>
            <img
              src="@/assets/imgs/49.png"
              style="width:3.5vw"
              alt=""
            > 每日任务
          </template>
          <van-cell
            center
            title="使用优惠券"
            label="+10 积分"
            v-for="(item, index) in 3"
            :key="index"
          >
            <template>
              <img
                src="@/assets/imgs/53.png"
                style="width:20vw;"
                alt=""
              >
            </template>

          </van-cell>
        </van-tab>
        <van-tab title="标签 2">
          <template #title>
            <img
              src="@/assets/imgs/51.png"
              style="width:3.5vw"
              alt=""
            > 积分任务
          </template>

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import Calendar from 'vue-calendar-component';

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        signData: {},
        f_calenFold: false,
        active: 0
      }

    },
    components: {
      Calendar
    },

    computed: {},
    created() {
      api.integral_detail({}).then((res) => {
        this.signData = res.data
      })
    },
    mounted() {},

    methods: {
      getSignBonus(num) {
        api.integral_goods_detail({
          welfare: num
        }).then((res) => {
          if (res.code == 9999) {
            Toast('领取成功')
          }
        })
      },
      sign() {
        api.integral_sign({}).then((res) => {
          api.integral_detail({}).then((res) => {
            this.signData = res.data
          })
          utils.editCb(res)
        })
      },
      togCalend() {
        this.f_calenFold = !this.f_calenFold
      },
      clickDay(data) {
        //选中某天
        console.log(data);
      },
      changeDate(data) {
        //左右点击切换月份
        console.log(data);
      },
      clickToday(data) {
        // 跳到了本月
        console.log(data);
      }
    }
  }
</script>


<style lang="scss">
  .app-container.page-my-checkin {
    .wh_content_all {
      background-color: transparent;
    }

    .wh_content_item,
    .wh_content_item_tag {
      color: #535353;
    }

    .wh_item_date,
    .wh_top_tag {
      width: 8vw;
      height: 8vw;
      line-height: 8vw;
    }

    .wh_top_changge li {
      color: #535353;
    }

    .wh_jiantou2 {
      border-top: 2px solid #535353;
      border-right: 2px solid #535353;
    }

    .wh_jiantou1 {
      border-top: 2px solid #535353;
      border-left: 2px solid #535353;
    }

    .wh_content_item .wh_isToday {
      // background-color: transparent;
      background: unset;
    }

    .wh_content_item .wh_chose_day {
      background-color: $cl-oran;
      color: #fff;
    }

    .wh_content_item>.wh_isMark {
      background-color: $cl-oran;
      color: #fff;
    }



    overflow: auto;

    ._d0 {
      z-index: -1;
    }

    ._d1 {
      margin-top: 37.7vw;

      ._d1-0 {
        padding: 3vw 0;
        background-color: #feebdd;
      }
    }

    ._d2 {
      ._b {
        color: #d0c49a;

        ._line {
          width: 10vw;
          vertical-align: 12vw;
          margin: 0 1vw;
        }
      }
    }

    ._d3 {
      padding-top: 4vw;

      .van-cell {
        padding: 5vw;
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
</style>