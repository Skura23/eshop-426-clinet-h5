<!-- home -->
<template>
  <div class="app-container page-goodslist re">

    <div class="_d0">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div>
    <div class="_d1">
      <van-sidebar
        v-model="active"
        class="_d1-0"
        @change="changeTab"
      >
        <van-sidebar-item
          v-for="(item, index) in tabList"
          :key="index"
          :title="item.class_name"
          :name="item.class_1"
        />
      </van-sidebar>

      <van-list
        v-model="listLoading"
        :finished="listFinished"
        finished-text="暂无更多数据"
        error-text="请求失败，点击重新加载"
        @load="loadList"
        class="_d1-1"
      >
        <div
          class="_card2 f14 "
          v-for="(item, index) in dataList"
          :key="index"
        >
          <div
            class="_m bac-whi"
            @click="toDetail(item)"
          >
            <div class="_l ">
              <van-image
                width="20vw"
                height="20vw"
                fit="cover"
                style="border-radius:3vw;"
                :src="item.goods_image[0]"
              />
            </div>
            <div class="_mid bb ">
              <p
                class="_p0"
                style="marginTop:0;"
              >{{item.goods_name}}</p>
              <!-- todo 2020.07.07 -->
              <!-- <p class="_p1 font12">已售7件</p> -->
              <p
                class="_p2 font12"
                style="height:4.7vw;"
              >
                <span v-if="item.goods_tag">
                  <span
                    class="_p2-i bor99 mr10 mb10"
                    v-for="(tag, index) in item.goods_tag=typeof item.goods_tag=='string'?[item.goods_tag]:item.goods_tag"
                    :key="index"
                  >
                    {{tag}}
                  </span>
                </span>
              </p>
              <p class="_p3 font16">¥ {{item.price}}</p>
            </div>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  import api from '@/api/api'
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie


  import {
    ImagePreview
  } from 'vant';
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        type: '',
        tabList: [],
        active: '',
        keyword: '',
        dataList: [],
        page: 1,
        total: 0,
        listLoading: false,
        listFinished: false,
        classIdx: '',
      }

    },

    computed: {},
    created() {
      this.type = this.$route.query.type
      if (this.type == 'union') {
        api.shop_goods_class = api.league_goods_class
        api.shop_goods = api.league_goods
      }
      api.shop_goods_class({}).then((res) => {
        this.tabList = [{
          class_1: "",
          class_name: "全部"
        }].concat(res.data.list)
      })
    },
    mounted() {

    },

    methods: {
      toDetail(item) {
        utils.jumpTo(`/mall/detail?goodsid=${item.goods_share_id}`)
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
        this.classIdx = this.tabList[data].class_1
        this.dataList = []
        this.page = 1
        this.keyword = ''
        this.loadList()
      },
      loadList() {
        api.shop_goods({
          class_1: this.classIdx,
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
<style
  lang="scss"
  scoped
>
  $red: #f90250;
  $cardpad: 4vw;

  .app-container.page-goodslist {

    .m-card {
      box-sizing: border-box;
      padding: $cardpad;
      margin-top: 3.5vw;
    }

    ._card2 {

      ._m {
        display: flex;
        padding: 5vw 1vw 0 7vw;

        ._l {
          margin-left: 23vw;
        }

        ._l img {
          width: 21.3vw;
        }

        ._mid {
          padding-left: 4vw;
          padding-bottom: 6vw;
          flex: 1 1 auto;

          p {
            margin: 0;
            margin-top: 2.2vw;

            &._p0 {
              @include textoverflow(2);
            }

            &._p1,
            &._p2 {
              opacity: 0.7;
            }

            &._p1,
            &._p3 {
              color: $cl-oran;
            }

            &._p2 {
              ._p2-i {
                display: inline-block;
                background-color: #e5e5e5;
                color: #101010;
                padding: 0.4vw 1.2vw;
              }
            }

          }
        }

        ._r {
          padding-left: 2vw;
        }
      }

    }


    ._d1 {
      position: relative;

      ._d1-0 {
        position: absolute;
        top: 0;
        left: 0;
      }
    }

    .van-sidebar {
      width: 23vw;
    }
  }
</style>