<!-- home -->
<template>
  <div class="app-container page-settlement">
    <div
      class="bac-whi _d0 clearfix"
      v-if="!addr"
      @click="$router.push('/my/address')"
    >
      <span>还没有收货地址，立即添加</span>
      <van-icon
        name="add"
        size="4.8vw"
        color="#fe9015"
        class="fr"
      />
    </div>

    <div
      class="bac-whi _d0 clearfix"
      @click="$router.push('/my/address')"
      v-else
    >
      <span>地址：{{addr}}</span>
      <span class="fr cl-gray">修改地址</span>
    </div>

    <div class="_d1 mt10">
      <div
        class="m-goodscard font14 bac-whi _card0"
        v-for="(item, index) in orderData.goods_list"
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
              class="_p0 _p"
              style="marginTop:0;"
            >{{item.goods_name}}</div>
            <!-- <div class="_p1 _p mt10">
              <van-tag>标签</van-tag>
            </div> -->
            <div class="_p2 _p mt font16 cl-red clearfix">
              <div class="fl">
                ￥{{goodsData.type == 'credit' ? item.money : item.price}}
              </div>
              <div class="fr">
                <van-stepper
                  v-model="item.num"
                  input-width="6vw"
                  button-size="6vw"
                  v-if="goodsData.type != 'cart' && goodsData.type != 'credit'"
                />
                <span v-if="goodsData.type == 'cart'">x {{item.num}}</span>
                <span v-if="goodsData.type == 'credit'">x 1</span>
              </div>
            </div>
          </div>
          <div class="_r"></div>
        </div>
        <div class="_b mt10">
          <van-field
            v-model="remark"
            label="备注"
            placeholder="建议备注之前先与卖家沟通"
            autosize
            type="textarea"
          />
        </div>
      </div>
    </div>

    <div class="_d2 mt10">
      <van-cell-group>
        <van-cell
          title="优惠券"
          v-if="goodsData.type != 'credit'"
        >
          <template slot="">
            <span class="cl-oran">
              {{orderData.yh_list && orderData.yh_list.length}}
            </span>
            张可用
          </template>
        </van-cell>
        <van-cell
          v-if="goodsData.type != 'credit'"
          title="商品金额"
          :value="orderData.order_amount"
          :border="false"
        />
        <van-cell
          title="优惠券"
          v-if="goodsData.type != 'credit'"
          :value="orderData.yh"
          :border="false"
        />
        <van-cell
          title="消耗积分"
          v-if="goodsData.type == 'credit'"
          :value="orderData.integral"
          :border="false"
        />
        <van-cell
          title="运费"
          value="包邮"
        />

        <van-cell
          title="需付款"
          value="内容"
          :border="false"
        >
          <template
            slot=""
            v-if="goodsData.type != 'credit'"
          >
            <span class="cl-oran">
              ¥ {{params.type=='cart'?orderData.real_amount : price/100}}
            </span>
          </template>
          <template
            slot=""
            v-if="goodsData.type == 'credit'"
          >
            <span class="cl-oran">
              ¥ {{orderData.money}}
            </span>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <van-submit-bar
      :price="params.type=='cart'?orderData.real_amount*100 : params.type=='credit'?orderData.money*100: price"
      :disabled="disabled"
      button-text="提交订单"
      @submit="onSubmit"
    />

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
        item: 12,
        // todo 用的测试数据
        goodsData: {},
        stepperVal: 1,
        addr: '',
        orderData: {
          real_amount: 222
        },
        disabled: true,
        receiverId: '',
        remark: '',
        params: {},
        pageIsfrom: ''
      }

    },
    beforeRouteEnter(to, from, next) {
      // this.pageIsfrom = from;
      console.log(this, from, 'beforeRouteEnter');
      next((vm) => {
        vm.pageIsfrom = from.name
      })
    },
    created() {
      // this.factory_id = this.$route.params.factory_id
      // this.cart_ids = this.$route.params.cart_ids
      if (this.pageIsfrom == 'my-address') {

      }

      let params = this.$route.query
      this.params = params
      console.log(params, 'params');
      this.goodsData = params
      if (params.type == 'cart') {
        api.goods_cart_check({
          factory_id: params.factory_id,
          cart_id: params.cart_ids,
        }).then((res) => {
          this.orderData = res.data
          this.disabled = false
          this.receiverId = res.data.receipt_address.receiver_id
        })
      } else if (params.type == 'buy' || params.type == 'normal') {
        api.order_check_create(this.goodsData).then((res) => {
          this.orderData = res.data
          this.disabled = false
          this.receiverId = res.data.receipt_address.receiver_id
        })
      } else if (params.type == 'group') {
        api.order_group_check_create(this.goodsData).then((res) => {
          this.orderData = res.data
          this.disabled = false
          this.receiverId = res.data.receipt_address.receiver_id
        })
      } else if (params.type == 'credit') {
        api.integral_order_check(this.goodsData).then((res) => {
          this.orderData = res.data
          this.orderData.goods_list = [res.data.goods]
          this.disabled = false
          this.receiverId = res.data.receipt_address.receiver_id
        })
      }

      api.get_member_default_receipt_address({}).then((res) => {
        if (this.pageIsfrom == 'my-address') {
          this.addr = this.$store.getters.curAddr.name
          this.receiverId = this.$store.getters.curAddr.id
          return
        }
        if (res.data.receiver_id) {
          this.addr = res.data.province_name +
            res.data.city_name +
            res.data.area_name
        }
      })


    },
    mounted() {},
    computed: {
      price() {
        console.log('price');
        let sum = 0
        let arr = this.orderData.goods_list
        for (let i = 0; i < arr.length; i++) {
          let elem = arr[i];
          console.log(elem);
          sum += elem.price * elem.num
        }
        console.log(sum);

        return sum * 100
      }
    },

    methods: {
      onSubmit() {
        let {
          type,
          buyType,
          goods_share_id,
          num,
          // cart
          option_id,
          factory_id,
          cart_ids,
          // credit
          goods_id,
        } = this.goodsData
        let order_create = api.order_create
        let data

        if (type == 'cart') {
          order_create = api.goods_cart_order_create
          data = {
            receiver_id: this.receiverId,
            factory_id,
            cart_id: cart_ids,
          }
        } else {
          data = {
            receiver_id: this.receiverId,
            factory_id,
            goods_list: this.orderData.goods_list
          }

          if (type == 'credit') {
            // data = {
            //   receiver_id: this.receiverId,
            //   option_id,
            //   goods_id
            // }
            order_create = api.integral_order_create
          }
        }
        if (buyType) {
          if (buyType == 'prepay') {
            order_create = api.order_prepay_create
          }
        }

        this.disabled = true

        order_create({
          coupon_no: this.orderData.coupon_no,
          receiver_id: this.receiverId,
          factory_id,
          cart_id: cart_ids,
          ...this.goodsData
        }).then((res) => {
          if (res.code == 9999) {
            let orderPay = () => {
              api.factory_order_pay({
                order_no: res.data.order_no
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


            if (type == 'credit') {
              if (res.data.is_pay == 1) {
                orderPay()
              } else {
                Toast('支付成功')
                this.disabled = false
              }
            } else {
              orderPay()
            }

          } else {
            Toast(res.info)
            this.disabled = false

          }
        })
      },
      // todo 用户修改地址操作

    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-settlement {
    ._d0 {
      padding: 4vw 3vw;

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