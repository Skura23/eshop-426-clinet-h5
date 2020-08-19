<!-- home -->
<template>
  <div class="app-container page-bargain">
    <div class="_d0 font16">
      砍价0元拿 包邮送到家
    </div>

    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >

      <!-- 砍价 秒杀 -->
      <div class="_promo">
        <div
          class="_bar"
          v-if="!curbargains || curbargains.length"
        >
          <div
            class="_in mt10"
            v-for="(item, index) in curbargains"
            :key="index"
          >
            <div class="tc mt10">正在进行中</div>
            <div
              class=" _cont"
              style="margin-top:7vw"
            >
              <div class="_l">
                <van-image
                  width="24vw"
                  height="30vw"
                  fit="cover"
                  :src="item.goods_image[0]"
                />
              </div>

              <div class="_r">
                <div class="font16">
                  <!--2020.07.14 todo 仅差xx -->
                  已砍{{item.bargain_price}}元，仅差{{item.surplus_price}}元
                </div>
                <div
                  class="_pbar borr re mt"
                  style="margin-top:4vw"
                >
                  <div
                    class="_pbar-rest ab borr"
                    :style="{width:item.surplus_rate+'%'}"
                  ></div>
                </div>
                <div
                  class="_time mt"
                  style="margin-top:7vw"
                >
                  <van-count-down :time="item.end_time * 1000 - (+new Date())">
                    <template v-slot="timeData">
                      <span class="borr tc _num">{{ timeData.hours }}</span> :
                      <span class="borr tc _num">{{ timeData.minutes }}</span> :
                      <span class="borr tc _num">{{ timeData.seconds }}</span>
                      <div class="i-b _end ml5">后结束</div>
                    </template>
                  </van-count-down>


                </div>
                <div class="_btn mt10 font18">
                  <van-button
                    round
                    type="info"
                    size="normal"
                    color="#ff7726"
                    @click="toDetail(item)"
                  >继续砍价</van-button>
                </div>
                <div class="mt10"></div>
              </div>
            </div>
          </div>
        </div>

        <van-grid
          gutter="2.5vw"
          :column-num="2"
          class="mt10"
        >
          <van-grid-item
            class=""
            v-for="(item, index) in dataList"
            :key="index"
          >
            <div class="_bar-i font12 tc">
              <div class="_0 bac-oran borr i-b">
                已送出{{item.sell_num}}件
              </div>
              <div class="_1  cl-oran mt10">
                {{item.goods_name}}
              </div>
              <div class="_2 mt">
                <van-image
                  width="23vw"
                  height="29vw"
                  fit="cover"
                  :src="item.goods_image[0]"
                />
              </div>
              <div
                class="_3 borr2 cl-whi bac-oran i-b mt"
                style="padding:1.1vw 5vw;"
                @click="toBuy(item)"
              >
                点击免费拿
              </div>
            </div>
          </van-grid-item>
        </van-grid>

      </div>

    </van-list>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  import {
    ImagePreview
  } from 'vant';
  

  export default {
    data() {
      return {
        countTime: '',
        curbargains: [],
        tabList: [],
        active: 0,
        keyword: '',
        dataList: [],
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
      }

    },

    computed: {},
    created() {
      api.going_bargain({}).then((res) => {

        this.curbargains = res.data
        // this.countTime = this.curbargains.end_time * 1000 - (+new Date())
      })

    },
    mounted() {

    },

    methods: {
      toDetail(data) {
        utils.jumpTo(`/mall/bargain-detail?bargain_id=${data.bargain_id}`)
      },
      toBuy(item) {
        Toast.loading({
          message: '加载中...',
          forbidClick: true,
        });
        api.bargain_create({
          goods_id: item.goods_id
        }).then((res) => {
          Toast.clear()
          if (res.code == 9999) {
            utils.jumpTo(`/mall/bargain-detail?bargain_id=${res.data.bargain_id}`)
          } else {
            Toast(res.info)
          }
        })

      },
      clearSear() {
        this.changeTab()
      },
      sear() {
        this.dataList = []
        this.page = 1
        this.loadList()
      },
      changeTab(data) {
        this.dataList = []
        this.page = 1
        this.keyword = ''
        this.loadList()
      },
      loadList() {
        api.bargain_goods_list({
          page: this.page
        }).then((res) => {
          // loadListCb(res) {
          if (res.code == 9999) {
            this.page++
            this.total = res.data.total

            this.dataList = this.dataList.concat(res.data.list)

            // 加载状态结束
            this.listLoading = false;

            // 数据全部加载完成
            if (this.dataList.length >= this.total) {
              this.listFinished = true;
            }
          }
          // }
        })
      },
    }
  }
</script>
<style lang="scss">
  $red: #f90250;
  $cardpad: 4vw;

  .app-container.page-bargain {
    ._d0 {
      padding: 1.7vw 2.4vw;
      color: #fff;
      background-color: #c91e19;
    }

    ._promo {
      padding: 2.5vw;
      color: #c71814;

      ._bar {
        ._in {
          border: solid 1px #ff7726;
          border-radius: 6.7vw;
          background-color: #ffe6d6;

          ._cont {
            @include flexbox();
            align-items: flex-start;
            justify-content: space-around;

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
                height: auto;
                padding: 1.5vw 14vw;
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

    ._promo {
      padding: 2.5vw;
      color: #c71814;

      ._bar {
        ._in {
          border: solid 1px #ff7726;
          border-radius: 6.7vw;
          background-color: #ffe6d6;

          ._cont {
            @include flexbox();
            align-items: flex-start;
            justify-content: space-around;

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
                height: auto;
                padding: 1.5vw 14vw;
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

    ._promo {
      padding: 0;

      ._bar {
        margin: 2.5vw;
        margin-top:0;
      }

      ._bar-i {
        border: solid 1px #ff7726;
        border-radius: 6.7vw;
        background-color: #ffe6d6;
        width: 100%;
        height: 100%;
        padding: 2.5vw;
        box-sizing: border-box;

        ._0 {
          color: #fff;
          padding: 0.4vw 2vw;
        }
      }

      .van-grid-item__content {
        background-color: transparent;
        padding: 0;
      }
    }

    .m-card {
      box-sizing: border-box;
      padding: $cardpad;
      margin-top: 3.5vw;
    }

    ._card2 {
      ._t {
        display: flex;
        justify-content: space-between;
        align-items: center;

        ._l {
          display: flex;
          align-items: center;

          img {
            width: 6.6vw;
            height: 6.6vw;
            border-radius: 50%;
          }
        }

        ._r {
          color: $red;
        }
      }

      ._m {
        margin-top: 2vw;
        display: flex;

        ._l img {
          width: 21.3vw;
        }

        ._mid {
          padding-left: 2vw;
          flex: 1 1 auto;

          p {
            margin: 0;
            margin-top: 2.2vw;

            &._p1,
            &._p2 {
              opacity: 0.7;
            }
          }
        }

        ._r {
          padding-left: 2vw;
        }
      }

      ._b {
        ._b-t {
          text-align: right;
          font-size: 4vw;

          span {
            font-size: 2.4vw;
          }
        }

        ._b-b {
          display: flex;
          justify-content: space-between;
          font-size: 3vw;
          margin-top: 2vw;

          ._btn0,
          ._btn1 {
            justify-content: flex-end;
          }

          ._btn0 {}

          ._btn1 {
            margin-left: 2vw;
            background: $red;
            color: #fff;
          }
        }
      }
    }
  }
</style>