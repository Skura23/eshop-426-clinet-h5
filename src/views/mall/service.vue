<!-- home -->
<template>
  <div class="app-container page-mall-service">
    <!-- <div class="_d0">
      <span class="i-b mr10 mb10 _i borr on">
        设计师
      </span>
      <span class="i-b mr10 mb10 _i borr ">
        设计师
      </span>
    </div> -->

    <div class="_d1 ">
      <van-search
        v-model="query"
        placeholder="搜索／手机号后四位／名字"
        :clearable="true"
        @clear="clearSear"
        @search="sear"
      />
    </div>

    <div class="_d2 mt font12">
      <van-grid
        :column-num="2"
        gutter="2vw"
      >
        <van-grid-item
          v-for="(item, index) in list"
          :key="index"
          class="_i "
        >
          <div class="_t bb w100">
            <div>{{item.row_num}}:</div>
            <div>
              <van-image
                width="7.5vw"
                height="7.5vw"
                fit="cover"
                :src="item.head_image"
              />
            </div>
            <div class="ml5">
              <div class="">{{item.staff_name}}
                <!-- <van-icon
                  name="edit"
                  color="#ff7728"
                /> -->
              </div>
              <!-- todo 2020.07.07 -->
              <!-- <div class="cl-gray font10">2020-03-13 10:34</div> -->
            </div>
          </div>
          <div class="_b w100">
            <div class="mt10">姓名：{{item.staff_name}}</div>
            <div class="mt10">手机号：{{item.service_phone}}</div>
            <div class="mt10">工种：{{item.service_name}}</div>
          </div>
        </van-grid-item>
      </van-grid>
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
        query: '',
        list: []
      }

    },

    computed: {},
    created() {
      this.getList()
    },
    mounted() {},

    methods: {
      clearSear() {
        // this.query=''
      },
      sear() {
        this.dataList = []
        this.page = 1
        this.getList()
      },
      getList() {
        api.services_staff_list({
          keywords_like: this.query
        }).then((res) => {
          this.list = res.data.list
        })
      },
    }
  }
</script>


<style lang="scss">
  .app-container.page-mall-service {
    padding: 3vw 4vw;

    ._d0 {
      ._i {
        background-color: #fff;
        padding: 1.5vw 3.6vw;

        &.on {
          background-color: $cl-oran;
          color: #fff;
        }
      }
    }

    ._d1 {
      .van-search {
        padding: 0;
        background-color: transparent;
        width: 69vw;

        .van-search__content {
          background-color: #fff;
        }
      }
    }

    ._d2 {
      ._i {
        ._t {
          @include flexbox();
          // justify-content: space-between;
          justify-content: flex-start;
          padding-bottom: 2vw;
        }

        .van-grid-item__content {
          border-radius: 1.3vw;
        }
      }
    }
  }
</style>