<!-- home -->
<template>
  <div class="app-container page-order">

    <div class="m-search">
      <van-search
        shape="round"
        v-model="keyword"
        placeholder="搜索我的订单"
        left-icon=""
        :clearable="false"
        @clear="clearSear"
        @search="sear"
      />
    </div>

    <van-tabs
      @change="changeTab"
      v-model="active"
    >
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item.text"
        :name="item.val"
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
      <div
        class="_card2 m-card f14 bac-whi"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <!-- thumb goods(title total optiontitle price) -->
        <div class="_t">
          <div class="_l">

            <span>{{item.factory_name}} <img
                style="width:1.8vw;height:3.7vw;vertical-align: -2px;"
                src="@/assets/imgs/84.png"
                alt=""
              ></span>

          </div>
          <div class="_r cl-oran">{{item.status_desc}}</div>
        </div>
        <div
          class="_m"
          v-for="(goods, index) in item.goods"
          :key="index"
        >
          <div class="_l">
            <van-image
              width="20vw"
              height="20vw"
              fit="cover"
              style="border-radius:3vw;"
              :src="goods.goods_image[0]"
            />
          </div>
          <div class="_mid">
            <p
              class="_p0"
              style="marginTop:0;"
            >{{goods.goods_name}}</p>
            <!-- <p class="_p1">规格:{{goods.option_name && goods.option_name.join()}}</p> -->
            <p class="_p2 cl-oran font10">七天无理由退换</p>
          </div>
          <div class="_r">
            <p>
              ¥{{goods.price}}
            </p>
            <p class="mt10">×{{goods.num}}</p>
          </div>
        </div>
        <div class="_b">
          <div class="_b-t">
            <!-- <span>共{{}}件商品 </span> -->
            合计：￥{{item.real_amount}}
          </div>
          <div class="_b-b">
            <div></div>
            <div>
              <div
                class="u-btn _btn0 mr10"
                @click="btn0Click(item)"
                v-show="item.status == 1"
              >{{textMap[item.status] && textMap[item.status].btn}}</div>
              <div
                class="u-btn _btn0 mr10"
                @click="toRefund(item)"
                v-show="item.can_return"
              >退款</div>
              <div
                class="u-btn fr mr10"
                v-show="item.can_sign"
                style="border-color:#ff7728;color:#ff7728"
                @click="cfmOrder(item)"
              >确认收货</div>
              <div
                class="u-btn _btn0 mr10"
                @click="cancelOrder(item)"
                v-show="item.can_cancel"
              >取消订单</div>
              <div
                class="u-btn _btn1 "
                @click="$router.push(`/my/order-detail?order_no=${item.order_no}`)"
              >查看订单</div>
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
  import utils from '@/utils' // get token from cookie

  import {
    ImagePreview
  } from 'vant';
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        tabList: [{
          text: '全部',
          val: 0,
        }, {
          text: '待支付',
          val: 1,
        }, {
          text: '已付款',
          val: 2,
        }, {
          text: '待收货',
          val: 3,
        }, {
          text: '已完成',
          val: 4,
        }, ],
        textMap: {
          1: {
            desc: '等待买家付款',
            btn: '付款'
          },
          2: {
            desc: '等待卖家发货',
            btn: '修改地址'
          },
          3: {
            desc: '卖家已发货',
            btn: '确认收货'
          },
          4: {
            desc: '订单已完成',
            btn: '评价'
          },
        },
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
      let orderType = this.$route.query.orderType
      if (orderType == 'topay') {
        this.active = 1
      }
      if (orderType == 'tosend') {
        this.active = 2

      }
      if (orderType == 'torecieve') {
        this.active = 3

      }

    },
    mounted() {

    },

    methods: {
      cfmOrder(item) {
        api.order_sign({
          order_no: item.order_no
        }).then((res) => {
          utils.editCb(res, () => {
            this.changeTab()
          })
        })
      },
      cancelOrder(item) {

        api.order_cancel({
          order_no: item.order_no
        }).then((res) => {
          utils.editCb(res, () => {
            this.changeTab()
          })
        })
      },
      toRefund(item) {
        this.$router.push(`/my/refund?order_no=${item.order_no}`)
      },
      btn0Click(item) {
        if (item.status == 1) {
          api.factory_order_pay({
            order_no: item.order_no
          }).then((res) => {
            this.disabled = false

            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              utils.onBridgeReady(res.data, () => {
                Toast('支付成功')
              }, () => {
                Toast('支付失败')
              })
            }
            // if (res.code == 9999) {
            //   Toast('支付成功')
            // } else {
            //   Toast('支付失败')
            // }
          })
        }
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
        api.member_order_list({
          status: this.active,
          keywords_like: this.keyword,
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
<style
  lang="scss"
  scoped
>
  $red: #f90250;
  $cardpad: 4vw;

  .app-container {

    .m-card {
      box-sizing: border-box;
      padding: $cardpad;
      margin-top: 3.5vw;

      width: auto;
      border-radius: 0;
      box-shadow: none;
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
          /* color: $red; */
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

            &._p2 {
              margin-top: 1vw;

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
            background: $red;
            color: #fff;
          }
        }
      }
    }


  }
</style>