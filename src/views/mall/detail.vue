<!-- home -->
<template>
  <div class="app-container page-mall-detail">
    <van-tabs
      v-model="active"
      scrollspy
      sticky
    >
      <van-tab
        title="宝贝"
        class="_d0"
      >
        <van-swipe
          class="my-swipe"
          style="height: 89vw;"
          indicator-color="white"
        >
          <van-swipe-item>
            <van-image
              v-for="(item, index) in goodsdata.goods_image"
              :key="index"
              width="100%"
              height="100%"
              fit="cover"
              :src="item"
            />
          </van-swipe-item>
        </van-swipe>

        <div class=" _d0-0 re">
          <div class="ab _ab">
            <img
              src="@/assets/imgs/24.png"
              height="100%"
              alt=""
              v-if="type=='seckill'"
            >
          </div>
          <div class="_l">
            <div
              class="_t"
              v-if="type != 'credit'"
            >
              <span class="bold font18">¥{{goodsdata.price}}</span>
              <span class=" _1 ml10 font16">¥{{goodsdata.market_price}}</span>
            </div>
            <div
              class=""
              v-else
            >
              {{goodsdata.integral}}积分兑换
            </div>
            <!-- todo 2020.07.07 -->
            <div
              class="_b i-b"
              v-if="type=='group'"
            >
              {{goodsdata.group_num}}人团 ● 已团0件
            </div>
          </div>
          <div
            class="_r re"
            v-if="type=='seckill'"
          >
            <!-- todo 2020.07.07 -->

            <div class="_t">
              距活动结束还剩
            </div>
            <div class="_b mt10">
              <span>11</span> :
              <span>11</span> :
              <span>11</span>
            </div>
          </div>
        </div>

        <div class="_d0-1 bac-whi">
          <div class="bold">{{goodsdata.goods_name}}</div>
          <div class="mt10 cl-gray font10">· 已售{{goodsdata.sale_num}}件</div>
        </div>

        <div
          class="_group"
          v-if="type=='group'"
        >
          <img
            src="@/assets/imgs/77.jpg"
            alt=""
            class="w100 mt10"
          >
          <div class="_group-list">
            <div
              style="padding:3vw;"
              class="bac-whi"
            >这些人刚刚购买成功，可参与拼团</div>

            <div
              class="_item"
              v-for="(item, index) in groupList"
              :key="index"
            >
              <div class="">
                <van-image
                  width="10vw"
                  height="10vw"
                  fit="cover"
                  :src="item.headimgurl"
                />
                <div class="ml10">{{item.member_name}}</div>
              </div>
              <van-button
                type="danger"
                size="small"
              >去拼团</van-button>
            </div>
          </div>
        </div>

        <div class="_d0-2 mt10 bac-whi">
          <div>
            <span>
              发货: {{goodsdata.send_address}}
            </span>
            <span class="ml">
              快递: 免运费
            </span>
          </div>
          <!-- <div class="">
            月销2558
          </div> -->
        </div>

        <div
          class="_d0-3 mt10 bac-whi"
          v-if="goodsdata.goods_params"
        >
          <!-- todo 2020.07.07 规格展示无设计图 done-->
          <van-cell
            is-link
            v-for="(item, index) in goodsdata.goods_params"
            :key="index"
            :border="false"
          >
            <template>
              <span>
                {{item.column}}
              </span>
              <span class="ml">
                {{item.value}}
              </span>
            </template>
          </van-cell>
          <!-- <van-cell
            title="颜色     白色"
            is-link
            :border="false"
          />
          <van-cell
            title="参数     品牌  材质 "
            is-link
            :border="false"
          /> -->
          <!-- 暂无 -->
          <!-- <div
            class="font10 cl-gray mt5 "
            style="padding-left:3.7vw"
          >
            嵊州板川集成灶有限公司 <span class="ml">杭州
              <van-icon name="arrow" /></span>
          </div> -->
        </div>
      </van-tab>
      <!-- <van-tab
        title="评价"
        class="_d1 bac-whi mt10"
      >
        <div class="">宝贝评价（172839）</div>
        <div class="_tags mt10">
          <van-tag
            round
            type="primary"
            text-color="black"
            color="#fad8c4"
            class="mb5 mr5"
          >宝贝很好</van-tag>
          <van-tag
            round
            type="success"
            text-color="black"
            color="#fad8c4"
            class="mb5 mr5"
          >宝贝很好</van-tag>
          <van-tag
            round
            type="danger"
            text-color="black"
            color="#fad8c4"
            class="mb5 mr5"
          >宝贝很好</van-tag>
        </div>
      </van-tab> -->
      <van-tab title="详情">
        <div
          v-html="handledCont"
          style="white-space:pre-wrap"
        ></div>
      </van-tab>
    </van-tabs>

    <van-goods-action class="_bot-wra">
      <van-goods-action-icon
        icon="star"
        :text="goodsdata.is_collect==1?'已收藏':'未收藏'"
        :color="goodsdata.is_collect==1?'#ff5000':''"
        @click="onClickBookIcon"
        v-if="!type"
      />
      <van-goods-action-icon
        icon="chat-o"
        text="资讯"
        @click="onClickIcon"
      />
      <van-goods-action-icon
        icon="cart-o"
        text="购物车"
        @click="$router.push('/my/cart')"
      />

      <template v-if="type=='seckill'">
        <van-goods-action-button
          type="danger"
          text="秒杀"
          @click="onClickSeckill"
          style="border-radius: 999px;"
        />
      </template>

      <template v-if="type=='credit'">
        <van-goods-action-button
          type="danger"
          text="立即兑换"
          @click="onClickExchange"
          style="border-radius: 999px;"
        />
      </template>

      <template v-else-if="type=='group'">
        <van-goods-action-button
          color="#adaaaa"
          @click="onClickBuy"
        >
          <div>¥{{goodsdata.price}}</div>
          <div>单独购买</div>
        </van-goods-action-button>
        <van-goods-action-button
          type="warning"
          @click="onClickGroupBuy"
          v-if="type=='group'"
        >
          <div>¥{{goodsdata.group_price}}</div>
          <div>一键开团</div>
        </van-goods-action-button>
      </template>

      <template v-else>
        <!-- <van-goods-action-button
          color="#adaaaa"
          @click="onAddtoCart"
        >
          <div>¥5499</div>
          <div>加入购物车</div>
        </van-goods-action-button> -->
        <van-goods-action-button
          color="#adaaaa"
          @click="onClickBuy"
        >
          <div>¥{{goodsdata.price}}</div>
          <div>全款购买</div>
        </van-goods-action-button>
        <van-goods-action-button
          color="#adaaaa"
          @click="onClickGroupBuy"
          v-if="type=='group'"
        >
          <div>¥{{goodsdata.group_price}}</div>
          <div>一键开团</div>
        </van-goods-action-button>
        <van-goods-action-button
          type="warning"
          @click="onClickPrepay"
          v-if="goodsdata.is_prepay==1"
        >
          <div>¥{{goodsdata.prepay_price}}</div>
          <div>预付定金</div>
        </van-goods-action-button>
      </template>

    </van-goods-action>

    <van-sku
      v-model="skuPopShow"
      :sku="sku"
      :goods="goods"
      :goods-id="goodsid"
      :quota="quota"
      :hide-quota-text="quota==1"
      :hide-stock="true"
      @buy-clicked="toBuy"
      @add-cart="toCart"
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
  import {
    Dialog
  } from 'vant';


  export default {
    data() {
      return {
        fromOrderNo: '',
        groupList: [],
        type: '',
        active: 0,
        goodsid: '',
        goodsdata: {},
        skuPopShow: false,
        // 限购数
        quota: 0,
        // buyType三种 normal, group, prepay
        // buyType:'normal',
        // 购买弹窗相关
        goods: {
          picture: ''
        },
        sku: {
          tree: [],
          list: [],
          price: '', // 默认价格（单位元）
          stock_num: 9999, // 商品总库存
          collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
          none_sku: false, // 是否无规格商品
        }

      }

    },

    watch: {
      // 如果 `question` 发生改变，这个函数就会运行
      skuPopShow: function (newQuestion, oldQuestion) {
        if (!newQuestion) {
          if (this.type == 'nomal') {
            this.setPrice('normal')
          }
          if (this.type == 'group') {
            this.fromOrderNo = ''
          }

        }
      }
    },

    computed: {
      handledCont() {
        if (this.goodsdata.goods_text) {
          let _cont = this.goodsdata.goods_text;
          return _cont
            .replace(_cont ? /&(?!#?\w+;)/g : /&/g, "&amp;")
            .replace(/&lt;/g, "<")
            .replace(/&gt;/g, ">")
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .replace(/&nbsp;/g, "");
        }
      }
    },
    created() {
      this.goodsid = this.$route.query.goodsid
      this.type = this.$route.query.type || 'normal'
      let data = {
        goods_share_id: this.goodsid
      }
      if (this.type == 'seckill') {
        api.shop_goods_detail = api.seckill_goods_detail
        data = {
          goods_id: this.goodsid
        }
      } else if (this.type == 'group') {
        api.join_group_order_list({
          goods_share_id: this.goodsid
        }).then((res) => {
          this.groupList = res.data.list
        })

      } else if (this.type == 'credit') {
        // 积分类型
        api.shop_goods_detail = api.integral_goods_detail
        data = {
          goods_id: this.goodsid
        }
      }


      api.shop_goods_detail(data).then((res) => {
        this.goodsdata = res.data
        this.goods.picture = this.goodsdata.goods_image[0]
        this.rebuildSpec()
      })


    },
    mounted() {},

    methods: {
      setPrice(type) {
        // type三种 normal, group, prepay
        let obj = {
          normal: 'price',
          group: 'group_price',
          prepay: 'prepay_price',
        }

        this.sku.price = this.goodsdata[obj[type]]

        let list = []
        if (this.goodsdata.is_spec == 1) {
          for (let i = 0; i < this.goodsdata.option_list.length; i++) {
            let elem = this.goodsdata.option_list[i];
            list[i] = {}
            list[i].id = elem.option_id
            list[i].price = elem[obj[type]] * 100
            list[i] = {
              ...list[i],
              ...elem.option_name_combine,
              stock_num: 9999,
            }
          }
        }

        this.sku.list = list
      },

      onClickBookIcon() {

        api.goods_collect_create({
          goods_share_id: this.goodsdata.goods_share_id,
          status: this.goodsdata.is_collect == 1 ? 2 : 1
        }).then((res) => {
          this.goodsdata.is_collect = res.data.status
        })
      },
      onClickSeckill() {
        api.get_member_default_receipt_address({}).then((res) => {
          if (!res.data.receiver_id) {
            Dialog.alert({
              message: '请先设置默认地址',
            }).then(() => {
              utils.jumpTo('/my/address')
            });
          } else {
            api.seckill_order_create({
              receiver_id: res.data.receiver_id,
              goods_id: this.goodsid
            }).then((res) => {
              if (res.code != 9999) {
                Toast(res.info)
              } else {
                api.order_pay({
                  order_no: res.data.order_no
                }).then((res) => {
                  Toast(res.info)
                })
              }
            })
          }
        })

      },
      rebuildSpec() {

        // price: '1.00', // 默认价格（单位元）
        // stock_num: 227, // 商品总库存
        // collection_id: 2261, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
        // none_sku: false, // 是否无规格商品
        // this.sku
        this.sku.collection_id = this.goodsdata.goods_share_id
        this.sku.price = this.goodsdata.price
        if (this.goodsdata.is_spec == 2) {
          this.sku.none_sku = true
          // this.sku.stock_num = 
        } else {
          //     {
          //   k: '颜色', // skuKeyName：规格类目名称
          //   k_s: 's1', // skuKeyStr：sku 组合列表（下方 list）中当前类目对应的 key 值，value 值会是从属于当前类目的一个规格值 id
          //   v: [
          //     {
          //       id: '1', // skuValueId：规格值 id
          //       name: '红色', // skuValueName：规格值名称
          //       imgUrl: 'https://img.yzcdn.cn/1.jpg', // 规格类目图片，只有第一个规格类目可以定义图片
          //       previewImgUrl: 'https://img.yzcdn.cn/1p.jpg', // 用于预览显示的规格类目图片
          //     },
          //     {
          //       id: '1',
          //       name: '蓝色',
          //       imgUrl: 'https://img.yzcdn.cn/2.jpg',
          //       previewImgUrl: 'https://img.yzcdn.cn/2p.jpg',
          //     }
          //   ],
          //   largeImageMode: true, //  是否展示大图模式
          // }
          let tree = []
          let list = []
          for (let i = 0; i < this.goodsdata.spec.length; i++) {
            let elm = this.goodsdata.spec[i];
            tree[i] = {}
            tree[i].k = elm.spec_name
            tree[i].k_s = elm.spec_name
            tree[i].v = []
            for (let i2 = 0; i2 < elm.item_list.length; i2++) {
              let elm2 = elm.item_list[i2];
              tree[i].v[i2] = {}
              tree[i].v[i2].id = elm2.item_name
              tree[i].v[i2].name = elm2.item_name
              tree[i].v[i2].previewImgUrl = this.goodsdata.goods_image[0]
            }
          }
          // s1: '1', // 规格类目 k_s 为 s1 的对应规格值 id
          // s2: '1', // 规格类目 k_s 为 s2 的对应规格值 id
          // price: 100, // 价格（单位分）
          // stock_num: 110 // 当前 sku 组合对应的库存
          for (let i = 0; i < this.goodsdata.option_list.length; i++) {
            let elem = this.goodsdata.option_list[i];
            list[i] = {}
            list[i].id = elem.option_id
            list[i].price = elem.price * 100
            list[i] = {
              ...list[i],
              ...elem.option_name_combine,
              stock_num: 9999,
            }
          }

          this.sku.tree = tree
          this.sku.list = list

        }
      },
      onClickIcon() {

      },
      onClickBuy() {
        this.skuPopShow = true
      },
      onClickPrepay() {
        this.quota = 1
        this.setPrice('prepay')
        this.skuPopShow = true
      },
      onClickGroupBuy() {
        this.quota = 1
        this.setPrice('group')
        this.skuPopShow = true


      },
      toBuy(data) {
        let obj = {
          goods_share_id: this.goodsdata.goods_share_id,
          option_id: data.selectedSkuComb.id,
          num: data.selectedNum,
          type: this.type
        }
        this.$router.push({
          path: `/mall/settlement`,
          name: "my-settlement",
          query: obj
        })

      },
      toCart(data) {
        console.log(data, 'toCart');
        api.goods_cart_create({
          goods_share_id: this.goodsdata.goods_share_id,
          option_id: data.selectedSkuComb.id,
          num: data.selectedNum,
        }).then((res) => {
          Toast(res.info)
        })
      },

    }
  }
</script>


<style lang="scss">
  .app-container.page-mall-detail {
    ._d0 {
      ._d0-0 {
        padding: 2.8vw 3.2vw;
        background-color: #fd863f;
        @include flexbox();

        ._l {
          ._t {
            ._1 {
              color: #fff;
              text-decoration: line-through;
            }
          }

          ._b {
            background-color: #ffffff36;
            padding: 0.5vw 1.1vw;
            color: #fff;
          }
        }

        ._r {
          ._t {
            color: #fd863f;
          }

          ._b {
            color: #fff;

            span {
              padding: 1vw;
              background-color: #fd863f;
            }
          }
        }

        ._ab {
          right: 0;
          top: 0;
          height: 100%;
          z-index: 0;
        }
      }

      ._d0-1 {
        padding: 3.2vw 3.7vw;
      }

      ._group {
        ._group-list {
          ._item {
            padding: 3vw;
            @include flexbox();
          }
        }
      }

      ._d0-2 {
        padding: 2.2vw 3.7vw;
        @include flexbox();
      }

      ._d0-3 {
        padding: 3.2vw 0;

        .van-cell {
          padding: 0.7vw 3.7vw;

        }
      }
    }

    .van-goods-action-button--last {
      margin-right: 5px;
      border-top-right-radius: 999px;
      border-bottom-right-radius: 999px;
    }

    .van-goods-action-button--first {
      margin-left: 5px;
      border-top-left-radius: 999px;
      border-bottom-left-radius: 999px;
    }

    ._d1 {
      padding: 2vw 3.7vw;
    }


    ._bot-wra {
      bottom: 50px;
    }

    padding-bottom: 35vw;
  }
</style>