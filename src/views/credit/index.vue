<!-- home -->
<template>
  <div class="app-container page-bargain">
    <!-- <div
      class="_top-wra ov"
      :style="{backgroundImage: `url(${require('@/assets/imgs/81.png')})`}"
    >
      <div class="mt tc">
        {{creditData.integral}}积分
      </div>
      <van-row class="tc mt">
        <van-col span="12">
          <van-button
            type="warning"
            to="/credit/credit-list"
          >积分明细</van-button>
        </van-col>
        <van-col span="12">
          <van-button
            type="warning"
            to="/credit/ex-list"
          >积分订单列表</van-button>
        </van-col>
      </van-row>
    </div> -->
    <div class="mt10"></div>
    <div
      class="_top-div mt10 auto0 cl-whi font16"
      style=""
    >
      <div class="_t ">
        <van-image
          width="9.7vw"
          height="9.7vw"
          fit="cover"
          round
          :src="member_detail.headimgurl"
        />
        <span class="ml10 ">{{member_detail.member_name}}</span>
      </div>
      <div class="_b mt ov-a">
        <van-row class="tc mt">
          <van-col
            span="12"
            @click="$router.push(`/credit/credit-list`)"
          >
            积分明细
          </van-col>
          <van-col
            span="12"
            @click="$router.push(`/credit/ex-list`)"
          >
            积分订单列表
          </van-col>
        </van-row>
      </div>
    </div>

    <van-tabs
      @change="changeTab"
      v-model="active"
      class="mt10"
    >
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.class_name"
        :name="item.class_id"
        sticky
      >

      </van-tab>
    </van-tabs>

    <van-list
      class="mt10"
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >

      <!-- 砍价 秒杀 -->
      <div class="_promo">

        <van-grid
          gutter="2.5vw"
          column-num="1"
          direction="horizontal"
          class="mt10"
          
        >
          <van-grid-item
            class="_card re"
            v-for="(item, index) in dataList"
            :key="index"
            @click="$router.push(`/mall/detail?goodsid=${item.goods_id}&type=credit`)"
          >
            <div
              class="ab _top-right tc2 font10"
              v-show="item.goods_type"
            >
              <img
                src="@/assets/imgs/23.png"
                class="ab"
                width="100%"
                style="z-index:-1"
                alt=""
              >
              <!--  type todo -->
              {{item.goods_type}}
            </div>
            <div class="">
              <van-image
                width="42vw"
                height="45vw"
                fit="cover"
                :src="item.goods_image[0]"
              />
            </div>
            <div class="ml10 _card-r">
              <div class="_r-t">
                <div
                  class="_tit mt"
                  style=""
                >
                  {{item.goods_name}}
                </div>
                <div class="_tags mt5 w100">
                  <div style="height:5.3vw">
                    <span v-if="item.goods_tag">
                      <van-tag
                        plain
                        class="mr5"
                        v-for="(tag, index) in item.goods_tag=typeof item.goods_tag=='string'?[item.goods_tag]:item.goods_tag"
                        :key="index"
                      >{{tag}}</van-tag>
                    </span>
                  </div>
                  <!-- <div class="cl-red ">
              分享赚500
            </div> -->
                </div>
              </div>

              <div class="_r-b mb10">
                <div class="_price mt5 w100">
                  <div>
                    <span class="cl-red font16">{{item.price_show}}</span>
                    <!-- <span class="cl-red font16"> {{item.price}}</span> -->
                    <!-- <span
                      class="cl-gray font12 ml5"
                      style="text-decoration: line-through;"
                    >¥{{item.market_price}}</span> -->
                  </div>
                  <div>
                    <span class="bor99 _buy font12">立即兑换</span>
                  </div>
                </div>
                <!-- <div class="_comp mt5 cl-gray font10 w100">
                  {{item.factory_name}} {{item.province_name}}
                  <van-icon
                    name="arrow"
                    style="vertical-align:-2px;"
                  />
                </div> -->
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
        creditData: {},
        member_detail:{},
      }

    },

    computed: {},
    created() {
      api.integral_goods_class({}).then((res) => {
        this.tabList = [{
          class_id: "",
          class_name: "全部"
        }].concat(res.data.list)
      })

      api.integral_detail({}).then((res) => {
        this.creditData = res.data
      })

      // api.going_bargain({}).then((res) => {

      //   this.curbargains = res.data
      //   // this.countTime = this.curbargains.end_time * 1000 - (+new Date())
      // })

    },
    mounted() {

    },

    methods: {
      toDetail(data) {
        utils.jumpTo(`/mall/bargain-detail?bargain_id=${data.bargain_id}`)
      },
      toBuy(item) {
        let obj = {
          goods_id: item.goods_id,
          option_id: item.option_id,
          type: 'credit'
        }
        this.$router.push({
          path: `/mall/settlement`,
          name: "my-settlement",
          query: obj
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
        api.integral_goods_list({
          class_id: this.active,
          page: this.page,
        }).then((res) => {
          // loadListCb(res) {
          if (res.code == 9999) {
            this.page++
            this.total = res.data.total
            this.member_detail = res.data.member_detail

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
    .van-tabs__nav {
      background-color: transparent;
    }
    .van-grid-item__content {
        padding: 2vw 2vw;
      }

      .van-grid-item__content--center {
        align-items: flex-start;
      }

    ._top-div {
      width: 94vw;
      height: 35vw;
      background-color: #ff7728;
      border-radius: 1vw;
      padding: 3vw;
      box-sizing: border-box;

      ._t {
        @include flexbox();
        justify-content: flex-start;
      }
    }

    ._top-wra {
      background-size: 100% 80%;
      background-repeat: no-repeat;
      height: 30vw;
    }

    ._d0 {
      padding: 1.7vw 2.4vw;
      color: #fff;
      background-color: #c91e19;
    }

    ._card {

      ._buy {
        display: inline-block;
        padding: 0.5vw 1.5vw;
        background-color: $cl-oran;
        color: #fff;
        height: 4.5vw;
        line-height: 4.5vw;
      }
      ._top-right {
        top: 0;
        right: 0;
        width: 17vw;
        height: 6.3vw;
        z-index: 2;
        color: #fff;
      }

      ._card-r {
        height: 100%;
        @include flexbox();
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-start;

        ._r-b {
          width: 100%;
        }
      }

      ._tit {
        height: 9vw;
        width: 100%;
        @include textoverflow(2);
      }

      ._tags {
        @include flexbox();
        justify-content: space-between;
      }

      ._price {
        @include flexbox();
        justify-content: space-between;
      }

      ._promo {
        padding: 2.5vw;
        color: #c71814;

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
    }

    ._promo {
      padding: 2.5vw;
      color: #c71814;


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
        margin-top: 0;
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
        // background-color: transparent;
        // padding: 0;
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