<!-- home -->
<template>
  <div class="app-container page-mall-bargaindetail">
    <div class="ml mt">{{bargainData.goods_name}}
      <!-- <span class="cl-oran">待发货</span> -->
    </div>
    <img
      src="@/assets/imgs/73.png"
      class="w100"
      alt=""
    >

    <div class="_promo">
      <div class="_bar">
        <div class="_in re">
          <div class="ab h-center _top bac-whi">
            <div class="i-b">
              <van-count-down :time="bargainData.end_time * 1000 - (+new Date())">

              </van-count-down>
            </div>
            <span> 后过期</span>
          </div>
          <div class="tc mt10">正在进行中</div>
          <div
            class=" _cont"
            style="margin-top:7vw"
          >
            <div class="_r tc ">

              <div class="font16">
                已砍{{bargainData.bargain_price}}元，仅差{{bargainData.surplus_price}}元
              </div>
              <div
                class="_pbar borr re mt"
                style="margin-top:4vw"
              >
                <div
                  class="_pbar-rest ab borr"
                  :style="{width:bargainData.surplus_rate+'%'}"
                ></div>
              </div>
              <!-- <div
                class="_time mt"
                style="margin-top:7vw"
              >
                <span class="borr tc _num">11</span> :
                <span class="borr tc _num">11</span> :
                <span class="borr tc _num">11</span>
                <div class="i-b _end">后结束</div>
              </div> -->
              <div class="_btn mt font18">
                <van-row v-if="bargainData.can_bargain">
                  <van-col span="24">
                    <van-button
                      round
                      type="info"
                      size="small"
                      color="#ff7726"
                      block
                      @click="bargain"
                    >砍一刀</van-button>
                  </van-col>
                </van-row>

                <van-row
                  class="mt10"
                  v-if="bargainData.can_pay"
                >
                  <van-col span="24">
                    <van-button
                      round
                      type="info"
                      size="small"
                      color="#ff7726"
                      block
                      @click="toPay"
                    >立即支付</van-button>
                  </van-col>
                </van-row>


              </div>
              <div class="mt10"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="_d3">
      砍价记录
    </div>

    <div class="_d4">
      <div
        class="_item"
        v-for="(item, index) in barginList"
        :key="index"
      >
        <van-image
          round
          width="10vw"
          height="10vw"
          :src="item.bargain_headimgurl"
        />
        <div class="_4m">
          <div class="">{{item.bargain_member_name}}</div>
          <div class="">{{item.remark}}</div>
        </div>
        <div class="">
          <img
            src="@/assets/imgs/74.png"
            alt=""
            style="width:8vw"
          >
          砍掉{{item.bargain_price}}元
        </div>
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
        test: 0.5,
        bargain_id: '',
        barginList: [],
        bargainData: {}
      }

    },

    computed: {},
    created() {
      this.bargain_id = this.$route.query.bargain_id

      api.bargain_detail({
        bargain_id: this.bargain_id
      }).then((res) => {
        this.bargainData = res.data
        this.barginList = res.data.log
      })

    },
    mounted() {},

    methods: {
      toPay() {
        // api.bargain_order_create({
        //   bargain_id: this.bargain_id
        // }).then((res) => {
        //   if (res.code == 9999) {
        //     if (res.data.status == 1) {
        //       api.order_pay({
        //         order_no: res.data.order_no
        //       }).then((res) => {

        //       })
        //     } else {
        //       Toast('购买成功')
        //     }
        //   } else {
        //     Toast(res.info)
        //   }
        // })
        this.$router.push(`/my/settlement?type=bargain&bargain_id=${this.bargain_id}`)
      },
      bargain() {
        api.bargain({
          bargain_id: this.bargain_id
        }).then((res) => {
          api.bargain_detail({
            bargain_id: this.bargain_id
          }).then((res) => {
            this.bargainData = res.data
            this.barginList = res.data.log
          })
        })
      },
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-mall-bargaindetail {
    ._promo {
      padding: 2.5vw;
      color: #c71814;

      ._bar {
        ._in {
          ._top {
            top: 0;
            padding: 1.5vw 5vw;
          }

          border: solid 1px #ff7726;
          border-radius: 6.7vw;
          background-color: #ffe6d6;

          ._cont {
            @include flexbox();
            align-items: flex-start;
            justify-content: space-around;

            ._r {
              width: 80%;
            }

            ._pbar {
              height: 4.5vw;
              background-color: #ff7726;

              ._pbar-rest {
                position: absolute;
                right: 0;
                top: 0;
                height: 100%;
                background-color: #fbba94;
              }
            }

            ._time {
              padding: 0.5vw 1.5vw;

              ._num {
                color: #fff;
                background-color: #ff7726;
                padding: 0.7vw 1.5vw;
              }

              ._end {
                color: #c91e19;
              }
            }

            ._btn {
              .van-button {
                /* height: auto; */
                /* padding: 1.5vw 10vw; */
              }
            }
          }
        }
      }

      ._sec {


        ._in {
          @include flexbox();

          ._d {
            ._time {
              font-size: 2.5vw;

              ._num {
                color: #fff;
                background-color: #ff7726;
                padding: 0.7vw 1.5vw;
              }

              ._end {
                color: #c91e19;
              }
            }

            border: solid 1px #ff7726;
            border-radius: 6.7vw;
            background-color: #ffe6d6;
            padding: 2.9vw 3.3vw;

            ._cont {
              @include flexbox();

              ._cont-l {
                ._2 {
                  padding: 0.4vw 2vw;
                  color: #fff;
                  background-color: #e82317;
                  border-radius: 1.3vw;
                }
              }
            }
          }
        }
      }
    }

    ._d3 {
      padding: 3vw 4vw;
      background-color: #ffe6d6;
    }

    ._d4 {
      ._item {
        @include flexbox();
        padding: 3vw;

        ._4m {
          width: 45vw;
        }
      }
    }
  }
</style>