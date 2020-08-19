<!-- home -->
<template>
  <div class="app-container page-my-bargain">
    <van-tabs
      @change="changeTab"
      v-model="activeName"
    >
      <van-tab
        v-for="(item, index) in tabList"
        :name="item.val"
        :key="index"
        :title="item.text"
        sticky
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

    <div
      class="v-h-center"
      v-if="dataList.length==0"
      style="
    z-index: -1;
"
    >
      <img
        src="@/assets/imgs/64.png"
        alt=""
      >
    </div>

    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >
      <div
        class="m-goodscard font14 bac-whi _card0 mt10"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <!-- thumb goods(title total optiontitle price) -->
        <!-- <div class="_t font16">
          xx家
        </div> -->
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
            <div class="_p1 _p mt10">
              <!-- 2020.07.15 todo -->
              <van-tag>标签</van-tag>
            </div>
            <div class="_p2 _p mt font16 cl-oran clearfix">
              <div class="fl">
                ￥{{item.market_price}}
              </div>
              <div class="fr">
                <van-tag
                  color="#fe9015"
                  size="large"
                >砍价</van-tag>
              </div>
            </div>
          </div>
          <div class="_r"></div>
        </div>
        <!-- <div class="_b mt10">
          <van-field
            v-model="value"
            label="备注"
            placeholder="建议备注之前先与卖家沟通"
            autosize
            type="textarea"
          />
        </div> -->
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
          val:0,
          text: '全部'
        },
        {
          val:-1,
          text: '待付款'
        },
        {
          val:1,
          text: '已付款'
        },
        {
          val:2,
          text: '砍价中'
        },
        {
          val:3,
          text: '已过期'
        }],
        activeName: 0,
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
      changeTab(data) {
        this.dataList = []
        this.page = 1
        this.keyword = ''
        this.loadList()
      },
      loadList() {
        api.bargain_order_list({
          status: this.activeName,
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

  .app-container.page-my-service {}
</style>