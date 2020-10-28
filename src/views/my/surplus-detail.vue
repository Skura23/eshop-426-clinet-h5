<!-- home -->
<template>
  <div class="app-container page-surplus-detail">
    <div class="mt tc">
      <van-icon
        name="checked"
        size="13vw"
        color="green"
      />
    </div>
    <div class="mt10 tc">
      {{query.remark}}
    </div>
    <div
      class="mt10 tc bold"
      style="font-size:6vw;"
    >
      {{item.symbol + query.amount}}
    </div>
    <van-divider />
    <van-cell-group :border="false">
      <van-cell
        title="来源订单"
        :value="query.from_order_no"
        :border="false"
      />
      <van-cell
        title="入账时间"
        :value="query.add_time"
        :border="false"
      />
      <van-cell
        title="来源对象"
        :value="query.from_member_name"
        :border="false"
      />
    </van-cell-group>
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
        query: {}
      }

    },

    computed: {},
    created() {
      this.query = this.$route.query
    },
    mounted() {},

    methods: {}
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container {
    .van-cell-group {
      background-color: transparent;

      .van-cell {
        background-color: transparent;

      }
    }

  }
</style>