<!-- home -->
<template>
  <div class="app-container page-mall-seckill">
    <div class="_d0 font16">
      限时秒杀 <span class="font10">距结束还剩 </span>
      <van-count-down :time="globalCounttime">
        <template v-slot="timeData">
          <span
            class="bac-whi borr cl-red"
            style="padding: 0.7vw 1.2vw"
          >{{ timeData.hours }}</span> :
          <span
            class="bac-whi borr cl-red"
            style="padding: 0.7vw 1.2vw"
          >{{ timeData.minutes }}</span> :
          <span
            class="bac-whi borr cl-red"
            style="padding: 0.7vw 1.2vw"
          >{{ timeData.seconds }}</span>
        </template>
      </van-count-down>
    </div>

    <!-- 砍价 秒杀 -->
    <div class="_promo">

      <div class="_sec ">
        <div class="_in">
          <div
            class="_l _d"
            @click="$router.push(`/mall/detail?type=seckill&goods_id=${firstTwo[0].goods_id}`)"
          >
            <div
              class="_time "
              style=""
            >
              <div class="i-b _end">距结束剩 </div>
              <van-count-down :time="firstTwo[0].end_time*1000-(+new Date())">
                <template v-slot="timeData">
                  <span class="borr tc _num ml5">{{ timeData.hours }}</span> :
                  <span class="borr tc _num">{{ timeData.minutes }}</span> :
                  <span class="borr tc _num">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>

            </div>
            <div class="_cont mt10">
              <div class="_cont-l">
                <div class="_0 bold">¥{{firstTwo[0].market_price}}</div>
                <div class="mt _1 mt10">{{firstTwo[0].goods_name}}</div>
                <div class=" _2 mt10">
                  {{firstTwo[0].sell_num || 0}}件已抢
                </div>

              </div>
              <div class="_cont-r">
                <van-image
                  width="14vw"
                  height="17vw"
                  fit="cover"
                  :src="firstTwo[0].goods_image[0]"
                />
              </div>

            </div>
          </div>
          <div
            class="_r _d"
            @click="$router.push(`/mall/detail?type=seckill&goods_id=${firstTwo[1].goods_id}`)"
          >
            <div
              class="_time "
              style=""
            >
              <div class="i-b _end">距结束剩 </div>
              <van-count-down :time="firstTwo[1].end_time*1000-(+new Date())">
                <template v-slot="timeData">
                  <span class="borr tc _num ml5">{{ timeData.hours }}</span> :
                  <span class="borr tc _num">{{ timeData.minutes }}</span> :
                  <span class="borr tc _num">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
            <div class="_cont mt10">
              <div class="_cont-l">
                <div class="_0 bold">¥{{firstTwo[1].market_price}}</div>
                <div class="mt _1 mt10">{{firstTwo[1].goods_name}}</div>
                <div class=" _2 mt10">
                  {{firstTwo[1].sell_num || 0}}件已抢
                </div>

              </div>
              <div class="_cont-r">
                <van-image
                  width="14vw"
                  height="17vw"
                  fit="cover"
                  :src="firstTwo[1].goods_image[0]"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >
      <div
        class="_card2 m-card f14 bac-whi"
        v-for="(item, index) in dataList"
        :key="index"
        v-if="item"
      >
        <!-- thumb goods(title total optiontitle price) -->

        <div class="_m" @click="$router.push(`/mall/detail?type=seckill&goodsid=${item.goods_id}`)">
          <div class="_l">
            <van-image
              width="20vw"
              height="20vw"
              fit="cover"
              style="border-radius:3vw;"
              :src="item.goods_image[0]"
            />
          </div>
          <div class="_mid">
            <p
              class="_p0 _p"
              style="marginTop:0;"
            >
              <span class="cl-oran">
                推荐
              </span>
              <span class="ml10">
                {{item.goods_name}}
              </span>
            </p>
            <!-- <p class="_p1 _p ml10">进入味蕾的感觉 是你从来没有体验过的茶香</p> -->
            <div class="_p2 _p">
              <div
                class="_pbar borr re mt"
                style="margin-top:4vw"
              >
                <div
                  class="_pbar-rest ab borr"
                  style="width:30%;"
                ></div>
              </div>
            </div>
            <div class="_p3 _p">
              <div class="">
                <span class="font16 cl-red">￥ {{item.price}} </span>
                <!-- <span
                  class="font10"
                  style="text-decoration:line-through;"
                >￥ 88</span> -->
              </div>
              <div
                class="cl-whi bac-red font16"
                style="padding:2vw"
              >
                马上抢
              </div>
            </div>
          </div>
        </div>

      </div>
    </van-list>
  </div>
</template>

<script>
  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie

  import {
    ImagePreview
  } from 'vant';
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        globalCounttime: '',
        firstTwo: [{
          goods_image: ''
        }, {
          goods_image: ''
        }],

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

    },
    mounted() {

    },

    methods: {
      // clearSear() {
      //   this.changeTab()
      // },
      // sear() {
      //   this.dataList = []
      //   this.page = 1
      //   this.loadList()
      // },
      // changeTab(data) {
      //   this.dataList = []
      //   this.page = 1
      //   this.keyword = ''
      //   this.loadList()
      // },
      loadList() {
        console.log('loadList');
        api.going_seckill({
          page: this.page
        }).then((res) => {
          // loadListCb(res) {

          if (res.code == 9999) {
            if (this.page == 1) {
              this.globalCounttime = res.data.end_time * 1000 - (+new Date())
              this.dataList = res.data.list

              this.firstTwo = [JSON.parse(JSON.stringify(this.dataList[0])), JSON.parse(JSON.stringify(this
                .dataList[1]))]
              this.dataList[0] = null
              this.dataList[1] = null
            } else {
              this.dataList = this.dataList.concat(res.data.list)

            }

            this.page++
            this.total = res.data.total


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
<style
  lang="scss"
  scoped
>
  $red: #f90250;
  $cardpad: 4vw;

  .app-container.page-mall-seckill {
    ._d0 {
      padding: 1.7vw 2.4vw;
      color: #fff;
      background-color: #c91e19;
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

          ._p {
            margin: 0;
            margin-top: 2.2vw;

            &._p1,
            &._p2 {
              opacity: 0.7;
            }

            &._p2 {
              ._pbar {
                width: 24.5vw;
                height: 1.7vw;
                background-color: #ff0000;

                ._pbar-rest {
                  position: absolute;
                  right: 0;
                  top: 0;
                  height: 100%;
                  background-color: #fbba94;
                }
              }
            }

            &._p3 {
              @include flexbox();
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

    ._sec {
      ._in {
        @include flexbox();
        width: 94vw;
        margin: 0 auto;
        margin-top: 2vw;

        ._d {
          width: 41%;

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
</style>