<!-- home -->
<template>
  <div class="app-container page-order-detail">
    <div class="_d0">
      <div class="_l">
        <div class="cl-whi">{{orderData.status_desc}}</div>
        <div class=""></div>
      </div>
      <div class="_r">
        <van-icon
          name="clock"
          color="#fff"
          size="10vw"
        />
      </div>
    </div>

    <div class="_d00 _pd bb">
      <van-icon
        name="location"
        size="7vw"
        color="#ff7728"
      />
      <div class="ml10 ">
        <div class="">{{orderData.receipt_name+' '+orderData.receipt_phone}}</div>
        <div class="mt10">{{orderData.receipt_address}}</div>
      </div>
    </div>

    <div class="_d1 mt10 bb">
      <div class="_pd">
        {{orderData.factory_name}} >
      </div>
      <div
        class="m-goodscard font14 bac-whi _card0"
        v-for="(item, index) in orderData.goods"
        :key="index"
      >
        <!-- thumb goods(title total optiontitle price) -->

        <div class="_m">
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
            <div
              class="_p0 _p clearfix"
              style="marginTop:0;"
            >
              <span class="fl">{{item.goods_name}}</span>
              <span class="fr">￥{{item.price}}</span>
            </div>
            <!-- <div class="_p1 _p mt10">
              <van-tag>标签</van-tag>
            </div> -->
            <div class="_p2 _p mt font16 cl-red clearfix">
              <!-- <div class="fl cl-gray">
                库存{{item.price}}
              </div> -->
              <div class="fr">
                <span>x {{item.num}}</span>
              </div>
            </div>
          </div>
          <div class="_r"></div>
        </div>
        <div class="_b mt10">
          <!-- <van-field
            v-model="remark"
            label="备注"
            placeholder="建议备注之前先与卖家沟通"
            autosize
            type="textarea"
          /> -->
        </div>
      </div>

      <van-cell-group :border="false">
        <van-cell
          title="商品总价"
          :value="'￥'+orderData.amount"
          :border="false"
        />
        <van-cell
          title="优惠"
          :value="'￥'+orderData.yh"
          :border="false"
        />
        <van-cell
          title="需付款"
          :value="'￥'+orderData.real_amount"
          :border="false"
        />
      </van-cell-group>



    </div>


    <div class="">
      <div class="_pd">
        订单信息
      </div>
      <van-cell-group :border="false">
        <van-cell
          title="订单单号"
          :value="orderData.order_no"
          :border="false"
        />
      </van-cell-group>
    </div>

    <div class="clearfix mt10">
      <div
        class="u-btn _btn0 fr mr"
        @click="toRefund(orderData)"
        v-show="orderData.can_return"
      >退款</div>
      <div
        class="u-btn _btn0 fr mr"
        @click="cancelOrder(orderData)"
        v-show="orderData.can_cancel"
      >取消订单</div>
      <div
        class="u-btn fr mr"
        v-show="orderData.can_sign"
        style="border-color:#ff7728;color:#ff7728"
        @click="cfmOrder(orderData)"
      >确认收货</div>
      <div
        class="u-btn fr mr"
        v-show="orderData.can_pay"
        style="border-color:#ff7728;color:#ff7728"
        @click="toPay"
      >付款</div>
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
        orderData: {},
        disabled: false,
        query: ''
      }

    },
    created() {
      this.query = this.$route.query
      this.getDetail()

    },
    mounted() {},
    computed: {

    },

    methods: {
      getDetail() {
        api.order_detail({
          order_no: this.query.order_no
        }).then((res) => {
          this.orderData = res.data
        })
      },
      cfmOrder(item) {
        api.order_sign({
          order_no: item.order_no
        }).then((res) => {
          utils.editCb(res, () => {
            this.getDetail()
          })
        })
      },
      toRefund(item) {
        this.$router.push(`/my/refund?order_no=${item.order_no}`)
      },
      cancelOrder(item) {
        api.order_cancel({
          order_no: item.order_no
        }).then((res) => {
          utils.editCb(res, () => {
            this.getDetail()
          })
        })
      },
      toPay() {
        if (this.disabled) {
          return
        }
        let orderPay = () => {
          this.disabled = true
          api.factory_order_pay({
            order_no: this.orderData.order_no
          }).then((res2) => {
            this.disabled = false
            if (typeof WeixinJSBridge == "undefined") {
              if (document.addEventListener) {
                document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
              } else if (document.attachEvent) {
                document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
              }
            } else {
              utils.onBridgeReady(res2.data, () => {
                Toast('支付成功')
              }, () => {
                Toast('支付失败')
              })
            }
            // if (res2.code == 9999) {
            //   Toast('支付成功')
            // } else {
            //   Toast('支付失败')
            // }
          })
        }
        orderPay()
      },

    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-order-detail {
    .van-cell {
      padding: 1vw 3vw;
    }

    ._pd {
      padding: 3vw;
    }

    background-color: #ffffff;

    ._d0 {
      padding: 4vw 7vw;
      background-color: $cl-oran;
      @include flexbox();
      justify-content: space-between;
    }

    ._d00 {
      @include flexbox();
      justify-content: flex-start;

    }

    ._d1 {
      ._card0 {
        ._b {
          .van-cell {
            padding: 0;
          }

        }
      }
    }
  }
</style>