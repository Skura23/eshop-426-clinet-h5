<!-- home -->
<template>
  <div class="app-container page-union">
    <div class="">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div>

    <van-swipe
      class="my-swipe mt10"
      indicator-color="#ff7728"
      height="70vw"
    >
      <van-swipe-item>
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="require('@/assets/imgs/78.png')"
        />
      </van-swipe-item>
      <van-swipe-item>
        <van-image
          width="100%"
          height="100%"
          fit="cover"
          :src="require('@/assets/imgs/78.png')"
        />
      </van-swipe-item>

    </van-swipe>

    <div class="_nav">
      <div class="_i">
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/16.png')"
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
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/17.png')"
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
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/18.png')"
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
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/19.png')"
          />
        </div>
        <div class="">
          联盟专区
        </div>
      </div>
      <div
        class="_i"
        @click="$router.push('/mall/service')"
      >
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/20.png')"
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
        <div>
          <van-image
            width="10.3vw"
            height="10.3vw"
            fit="cover"
            :src="require('@/assets/imgs/20.png')"
          />
        </div>
        <div class="">
          领优惠券
        </div>
      </div>
    </div>

    <div>
      <van-image
        width="100%"
        height="35vw"
        fit="cover"
        :src="require('@/assets/imgs/78.png')"
      />
    </div>

    <van-tabs
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
          class="v-h-center"
          @click="$router.push('/mall/goodslist?type=union')"
        />
      </div>
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.class_name"
        :name="item.class_1"
      >
      </van-tab>
    </van-tabs>


    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >
      <van-grid
        column-num="2"
        gutter="2.5vw"
        class="mt"
      >
        <van-grid-item
          class="_card re"
          v-for="(item, index) in dataList"
          :key="index"
          @click="toDetail(item)"
        >
          <div class="ab _top-right tc2 font10">
            <img
              src="@/assets/imgs/23.png"
              class="ab"
              width="100%"
              style="z-index:-1"
              alt=""
            >
            <!--  type todo -->
            砍价商品
          </div>
          <van-image
            width="100%"
            height="47vw"
            fit="cover"
            :src="item.goods_image[0]"
          />
          <div
            class="_tit mt5"
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
          <div class="_price mt5 w100">
            <div>
              <span class="cl-red font16">¥{{item.price}}</span>
              <span class="cl-gray font12 ml5">¥{{item.market_price}}</span>
            </div>
            <div>
              <span class="bor99 _buy font10">立即购买</span>
            </div>
          </div>
          <div class="_comp mt5 cl-gray font10 w100">
            {{item.factory_name}}
            <van-icon name="arrow" />
          </div>
        </van-grid-item>
      </van-grid>
    </van-list>

    <!-- <HoverNav></HoverNav> -->
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
        tabList: [],
        active: '',
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
      api.league_goods_class({}).then((res) => {
        this.tabList = [{
          class_1: "",
          class_name: "全部"
        }].concat(res.data.list)
      })
    },
    mounted() {

    },
    components: {
      HoverNav
    },

    methods: {
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
        api.league_goods({
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

  .app-container.page-union {

    ._nav {
      text-align: center;
      padding: 8.7vw 3.2vw 8vw 3.2vw;
      @include flexbox();

      ._i {}
    }

    ._tabs {
      width: 91vw;
      position: relative;

      ._r {
        width: 9vw;
        height: 11.73vw;
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

      }

      ._comp {
        @include textoverflow(1);

      }

      ._buy {
        padding: 0.5vw 1.5vw;
        background-color: $cl-oran;
        color: #fff;
      }

      .van-grid-item__content {
        padding: 1vw 2vw;
      }

      .van-button {
        width: 16vw;
        background-color: $cl-oran;
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
  }
</style>