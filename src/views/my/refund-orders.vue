<!-- home -->
<template>
  <div class="app-container page-order page-mall">
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

    <!-- <div class="mt10">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div> -->

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

            <span>{{item.factory_name}}</span>;

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
              <!-- <div class="u-btn _btn0">提醒发货</div> -->
              <div class="u-btn _btn1">查看订单</div>
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
        tabList: [{
          text: '全部',
          val: 0,
        }, {
          text: '退款中',
          val: 1,
        }, {
          text: '已退款',
          val: 3,
        }, {
          text: '已拒绝',
          val: 2,
        }],
        
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
        api.order_refund_list({
          page: this.page,
          refund_status: this.active
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

  .app-container.page-mall {

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
            margin-left: 2vw;
            background: $red;
            color: #fff;
          }
        }
      }
    }
  }
</style>