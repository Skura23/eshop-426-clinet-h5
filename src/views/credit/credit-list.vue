<!-- home -->
<template>
  <div class="app-container page-credit-list">
    <div
      class="_top-wra ov"
      :style="{backgroundImage: `url(${require('@/assets/imgs/81.png')})`}"
    >
      <div class="mt tc">
        当前积分值
      </div>
      <div class="mt tc">
        {{point}}积分
      </div>
    </div>

    <van-list
      v-model="listLoading"
      :finished="listFinished"
      finished-text="暂无更多数据"
      error-text="请求失败，点击重新加载"
      @load="loadList"
    >
      <van-cell
        :title="item.log"
        size="large"
        :label="item.add_time"
        v-for="(item, index) in dataList"
        :key="index"
      >
        <template>
          <div class="">{{item.integral_after-item.integral_before}}积分</div>
          <div class="">剩余{{item.integral_after}}积分</div>
        </template>
      </van-cell>
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
        tabList: [],
        point:'',
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
        api.integral_log({
          page: this.page
        }).then((res) => {
          // loadListCb(res) {
          if (res.code == 9999) {
            this.page++
            this.total = res.data.total

            this.dataList = this.dataList.concat(res.data.list)
            this.point = res.data.integral

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

  .app-container.page-credit-list {
    .van-cell {
      background-color: transparent;
    }

    .van-cell:not(:last-child)::after {
      border-bottom: 1px solid #bdbfc3;
      right: 4vw;
    }

    ._top-wra {
      background-size: 100% 100%;
      background-repeat: no-repeat;
      height: 30vw;
    }

    .m-card {
      box-sizing: border-box;
      padding: $cardpad;
      margin-top: 3.5vw;
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
          color: $red;
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