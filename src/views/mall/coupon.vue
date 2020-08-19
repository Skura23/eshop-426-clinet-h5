<!-- home -->
<template>
  <div class="app-container page-mall-coupon">
    <!-- <van-tabs
      @change="changeTab"
      v-model="active"
    >
      <van-tab
        v-for="(item, index) in tabList"
        :key="index"
        :title="item"
        sticky
      >

      </van-tab>
    </van-tabs> -->

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
        src="@/assets/imgs/67.png"
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
        class="_item re mt10"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <img
          src="@/assets/imgs/68.png"
          class="w100"
          alt=""
        >
        <!-- <div class="ab" style="width: 14vw;height: 11vw;top:0;right:3vw">
          <img src="@/assets/imgs/71.png" class="w100"  alt="">
        </div> -->
        <div
          class="_l ab"
          style="width: 43vw;height: 100%;top:0;left:0"
        >
          <div
            class="_l-i v-h-center"
            style="width:29vw;"
          >
            <div
              class="_l-0"
              style="color: #447520;"
            >
              ￥<span style="font-size:10vw">{{item.deduct}}</span>
            </div>
            <div class="_l-1 mt5">
              {{item.content}}
            </div>
            <div class="_l-2 mt5">
              有效期：
            </div>
            <div class="_l-3 mt5">
              {{item.time_start}}-{{item.time_end}}
            </div>
          </div>
        </div>
        <div
          class="_r ab"
          style="width:53vw;height: 100%;top:0;right:0"
        >
          <div
            class="_r-i v-h-center "
            style="width:35vw;"
          >
            <div class="font20">{{item.coupon_name}}</div>
            <div class="font12 mt10">{{item.num_info}}</div>
            <div class="mt10">
              <van-tag
                round
                color="#ffc78a"
                size="large"
                @click="getCoupon(item)"
              >立即领取</van-tag>
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
        // tabList: [
        //   '待使用',
        //   '已使用',
        //   '已过期',
        // ],
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
      getCoupon(item) {
        api.member_coupon_create({
          coupon_id: item.coupon_id
        }).then((res) => {
          Toast(res.info)
        })
      },
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
        api.coupon_list({
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

  .app-container.page-mall-coupon {
    ._item {
      width: 96vw;
      margin: 0 auto;
      margin-top: 3vw;
    }

  }
</style>