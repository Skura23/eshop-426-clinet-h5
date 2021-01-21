<!-- home -->
<template>
  <div class="app-container page-order page-mall">

    <div
      class=""
      style="background-color: #FD8642"
    >
      <p
        class="cl-whi pd3"
        style="padding-bottom: 0;"
      >低价买 放心购！</p>
      <div class="">
        <van-search
          v-model="keyword"
          placeholder="搜索你感兴趣的商品    "
          :clearable="true"
          @clear="clearSear"
          @search="sear"
          shape="round"
        />
      </div>
    </div>



    <div class="re ov">
      <div
        class="ab"
        style="width:100vw;left:0;top:0;"
      >
        <img
          :src="require('@/assets/imgs/127.png')"
          class="w100"
          alt=""
        >
      </div>
      <van-swipe
        class="my-swipe  "
        style="margin:2vw;"
        indicator-color="#ff7728"
        height="70vw"
      >

        <van-swipe-item class="">
          <van-image
            width="100%"
            height="100%"
            fit="cover"
            :src="require('@/assets/imgs/114.png')"
          />
        </van-swipe-item>
        <!-- <van-swipe-item>
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="require('@/assets/imgs/78.png')"
        />
      </van-swipe-item> -->

      </van-swipe>
    </div>


    <div style="margin:2vw;">
      <van-image
        width="100%"
        :src="require('@/assets/imgs/115.png')"
      />
    </div>


    <div class="_nav">
      <div
        class="_i"
        @click="$router.push('/mall/hotgroup')"
      >
        <div class="ab font10 _num">
          {{iconNums.tuan_gou}}
        </div>
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/116.png')"
          />
        </div>
        <div class="">
          热团拼购
        </div>
      </div>
      <div
        class="_i"
        @click="$router.push('/mall/bargain')"
      >
        <div
          class="ab font10 _num"
          style="right: -4.5vw;"
        >
          大额
        </div>
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/123.png')"
          />
        </div>
        <div class="">
          砍出优惠
        </div>
      </div>
      <div
        class="_i"
        @click="$router.push('/mall/seckill')"
      >
        <div class="ab font10 _num">
          {{iconNums.miao_sha}}
        </div>
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="contain"
            :src="require('@/assets/imgs/122.png')"
          />
        </div>
        <div class="">
          低价秒杀
        </div>
      </div>
      <div
        class="_i"
        @click="$router.push('/mall/union')"
      >
        <div class="ab font10 _num">
          {{iconNums.lian_meng}}
        </div>
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/121.png')"
          />
        </div>
        <div class="">
          联盟专区
        </div>
      </div>

    </div>
    <div class="_nav _nav2">
      <div
        class="_i"
        @click="$router.push('/mall/service')"
      >
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="contain"
            :src="require('@/assets/imgs/120.png')"
          />
        </div>
        <div class="">
          服务专区
        </div>
      </div>
      <div
        class="_i"
        @click="$router.push('/mall/coupon')"
      >
        <div class="ab font10 _num">
          领
        </div>
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/119.png')"
          />
        </div>
        <div class="">
          领优惠券
        </div>
      </div>
      <div
        class="_i"
        style=""
        @click="$router.push('/credit/index')"
      >
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/118.png')"
          />
        </div>
        <div class="">
          积分商城
        </div>
      </div>
      <div
        class="_i"
        style=""
        @click="$router.push('/my/checkin')"
      >
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/117.png')"
          />
        </div>
        <div class="">
          每日任务
        </div>
      </div>
    </div>

    <div>
      <van-image
        width="100%"
        fit="cover"
        :src="require('@/assets/imgs/124.png')"
      />
    </div>

    <!-- <van-tabs
      @change="changeTab"
      v-model="active"
      class="_tabs"
    >
      <div class="_r ">
        <van-image
          width="5vw"
          height="3.7vw"
          fit="cover"
          :src="require('@/assets/imgs/21.png')"
          @click="$router.push('/mall/goodslist')"
          class="v-h-center"
        />
      </div>
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.class_name"
        :name="item.class_1"
      >
      </van-tab>
    </van-tabs> -->

    <!-- 砍价 秒杀 -->
    <!-- <div
      class="_promo mt10 mb"
      v-if="curbargains || seckillList[0]"
    >


      <div
        class="_bar"
        v-if="!curbargains || curbargains.length"
      >
        <div
          class="_in "
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
                  @click="$router.push('/mall/bargain')"
                >继续砍价</van-button>
              </div>
              <div class="mt10"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        class="_sec mt"
        v-if="seckillList[0]"
      >
        <div class="_in">
          <div
            class="_l _d"
            v-if="seckillList[0]"
            @click="$router.push(`/mall/detail?type=seckill&goodsid=${seckillList[0].goods_id}`)"
          >
            <div
              class="_time "
              style=""
            >
              <div class="i-b _end">距结束剩 </div>
              <van-count-down :time="seckillList[0].end_time*1000-(+new Date())">
                <template v-slot="timeData">
                  <span class="borr tc _num ml5">{{ timeData.hours }}</span> :
                  <span class="borr tc _num">{{ timeData.minutes }}</span> :
                  <span class="borr tc _num">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>

            </div>
            <div class="_cont mt10">
              <div class="_cont-l">
                <div class="_0 bold">¥{{seckillList[0].market_price}}</div>
                <div class="mt _1 mt10">{{seckillList[0].goods_name}}</div>
                <div class=" _2 mt10">
                  {{seckillList[0].sell_num || 0}}件已抢
                </div>

              </div>
              <div class="_cont-r">
                <van-image
                  width="14vw"
                  height="17vw"
                  fit="cover"
                  :src="seckillList[0].goods_image[0]"
                />
              </div>

            </div>
          </div>
          <div
            class="_r _d"
            v-if="seckillList[1]"
            @click="$router.push(`/mall/detail?type=seckill&goodsid=${seckillList[1].goods_id}`)"
          >
            <div
              class="_time "
              style=""
            >
              <div class="i-b _end">距结束剩 </div>
              <van-count-down :time="seckillList[1].end_time*1000-(+new Date())">
                <template v-slot="timeData">
                  <span class="borr tc _num ml5">{{ timeData.hours }}</span> :
                  <span class="borr tc _num">{{ timeData.minutes }}</span> :
                  <span class="borr tc _num">{{ timeData.seconds }}</span>
                </template>
              </van-count-down>
            </div>
            <div class="_cont mt10">
              <div class="_cont-l">
                <div class="_0 bold">¥{{seckillList[1].market_price}}</div>
                <div class="mt _1 mt10">{{seckillList[1].goods_name}}</div>
                <div class=" _2 mt10">
                  {{seckillList[1].sell_num || 0}}件已抢
                </div>

              </div>
              <div class="_cont-r">
                <van-image
                  width="14vw"
                  height="17vw"
                  fit="cover"
                  :src="seckillList[1].goods_image[0]"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </div> -->

    <!-- 活动 -->
    <div class="m-card _promos ">
      <div class="_c1">
        <van-card
          :desc="'一 切 只 为 安 全'"
          :title="curGrouppromo.goods_name"
          :thumb="curGrouppromo.goods_image[0]"
          @click="$router.push(`/mall/detail?type=group&goodsid=${curGrouppromo.goods_share_id}`)"
        >
          <template #tags>
            <van-tag
              round
              color="#FB8996"
              type="primary"
              class="font12"
            >点 击 更 多 拼 团</van-tag>
          </template>
          <template #price>
            <div class="clearfix w100 font16">
              <div
                class="fl  bold"
                style="color:#FF0000;"
              >
                ¥{{curGrouppromo.price}}
              </div>
              <div class="fr">
                <van-button
                  type="info"
                  color="#FF0000"
                  size="mini"
                >拼团</van-button>
              </div>
            </div>
          </template>
        </van-card>
      </div>
      <div class="_c2 mt">
        <div class="">
          每日秒杀
          <van-tag
            round
            color="#FB8996"
            type="primary"
            class="font12"
          >每日秒杀等你来</van-tag>
        </div>
        <div
          class="mt tc"
          v-if="seckillList[0]"
        >
          <van-row gutter="15">
            <van-col span="8" @click="$router.push(`/mall/detail?type=seckill&goodsid=${seckillList[0].goods_id}`)">
              <van-image
                width="100%"
                height="23vw"
                fit="contain"
                :src="seckillList[0].goods_image[0]"
              />
              <div class="font16 mt10" style="color:#FF0000;">
                ¥{{curGrouppromo.price}}
              </div>
              <div class="mt10">
                <van-button
                  type="info"
                  color="#FF0000"
                  size="mini"
                >秒杀</van-button>
              </div>
            </van-col>
            <van-col
              span="8"
              v-if="seckillList[1]"
              @click="$router.push(`/mall/detail?type=seckill&goodsid=${seckillList[1].goods_id}`)"
            >
              <van-image
                width="100%"
                height="23vw"
                fit="contain"
                :src="seckillList[1].goods_image[0]"
              />
            </van-col>
            <van-col
              span="8"
              v-if="seckillList[2]"
              @click="$router.push(`/mall/detail?type=seckill&goodsid=${seckillList[2].goods_id}`)"
            >
              <van-image
                width="100%"
                height="23vw"
                fit="contain"
                :src="seckillList[2].goods_image[0]"
              />
            </van-col>
          </van-row>
        </div>
      </div>

    </div>


    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
      class=""
    >
      <van-grid
        column-num="1"
        gutter="2.5vw"
        :border="false"
        class=""
        direction="horizontal"
      >
        <van-grid-item
          class="_card re bb"
          v-for="(item, index) in dataList"
          :key="index"
          @click="toDetail(item)"
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
                  <span class="cl-red font16">¥{{item.price}}</span>
                  <span
                    class="cl-gray font12 ml5"
                    style="text-decoration: line-through;"
                  >¥{{item.market_price}}</span>
                </div>
                <div>
                  <span class="bor99 _buy font12">立即购买</span>
                </div>
              </div>
              <div class="_comp mt5 cl-gray font10 w100">
                {{item.factory_name}} {{item.province_name}}
                <van-icon
                  name="arrow"
                  style="vertical-align:-2px;"
                />
              </div>
            </div>

          </div>

        </van-grid-item>
      </van-grid>
    </van-list>

    <HoverNav></HoverNav>
  </div>
</template>

<script>
  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie

  import HoverNav from '@/components/HoverNav';
  import {
    ImagePreview
  } from 'vant';
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        curGrouppromo: {},
        seckillList: [],
        tabList: [],
        active: '',
        keyword: '',
        dataList: [],
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
        seckillList: [],
        iconNums: {}
      }

    },

    computed: {},
    created() {

      api.shop_goods_index({}).then((res) => {
        this.iconNums = res
      })
      api.shop_goods_class({}).then((res) => {
        this.tabList = [{
          class_1: "",
          class_name: "全部"
        }].concat(res.data.list)

      })

      // api.going_bargain({}).then((res) => {

      //   this.curbargains = res.data
      //   // this.countTime = this.curbargains.end_time * 1000 - (+new Date())
      // })
      api.shop_goods({
        is_group: 1
      }).then((res) => {
        this.curGrouppromo = res.data.list[0]
      })


      api.going_seckill({
        page: this.page
      }).then((res) => {
        this.seckillList = res.data.list.slice(0, 2)
      })
    },
    mounted() {

    },
    components: {
      HoverNav
    },

    methods: {
      // toDetail(data) {
      //   utils.jumpTo(`/mall/bargain-detail?bargain_id=${data.bargain_id}`)
      // },
      toDetail(item) {
        this.$router.push(`/mall/detail?goodsid=${item.goods_share_id}`)
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
        api.shop_goods({
          class_1: this.active,
          goods_like: this.keyword,
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

  .app-container.page-mall {
    background-color: #fff;

    input::-webkit-input-placeholder {
      text-align: center;
    }

    ._nav {
      .van-image {
        display: inline-block;
      }
    }

    .van-image {
      display: block;
    }

    .van-search {
      background-color: transparent;

      .van-search__content {
        background-color: #fff;

      }
    }

    ._nav {
      // background-color: #F9E1E3;
      text-align: center;
      padding: 8.7vw 3.2vw 8vw 3.2vw;
      @include flexbox();
      justify-content: space-around;

      ._i {
        position: relative;

        ._num {
          position: absolute;
          color: #ff7728;
          top: 0;
          right: -2.5vw;
        }
      }

      &._nav2 {
        // background-color: #F9E1E3;
        padding-top: 0vw;
      }
    }

    ._tabs {
      width: 91vw;
      position: relative;

      ._r {
        width: 9vw;
        height: 44px;
        position: absolute;
        right: -9vw;
        top: 0;
        background-color: #fff;
      }
    }

    ._card {
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
        height: 9.7vw;
        font-size: 3.5vw;
        line-height: 5vw;
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

      ._comp {
        @include textoverflow(1);

      }

      ._buy {
        display: inline-block;
        padding: 0.5vw 1.5vw;
        background-color: $cl-oran;
        color: #fff;
        height: 4.5vw;
        line-height: 4.5vw;
      }

      .van-grid-item__content {
        padding: 2vw 0;
      }

      .van-grid-item__content--center {
        align-items: flex-start;
      }

      .van-button {
        width: 16vw;
        background-color: $cl-oran;
      }
    }

    ._promo {
      padding: 2.5vw;
      padding-bottom: 0;
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

    ._promos {
      margin: 6.6vw;
      width: auto;
      border-radius: 0;
    }

    .van-card {
      background-color: transparent;

      .van-card__price {
        display: block;
      }

      .van-card__title {
        font-size: 16px;
      }
    }
  }
</style>