<template>
  <section
    id="total"
    class="border_1px_top"
  >
    <span class="total_left" @click="leftClick">
      清空
      <!-- <label for="selectAll" class="radio_label">
        <input
          type="checkbox"
          id="selectAll"
          class="select_radio"
          v-model="selectAllStatus"
          @change="selectAll()"
        >
        <i class="iconfont radio_icon icon-round"></i>
        全选
      </label> -->
    </span>
    <span class="total_right">
      <span>
        合计：
        <span class="price_wrapper">
          <span class="large_text">{{ curTotalPrice.toString().split('.')[0] }}.</span>
          <span class="small_text">
            {{ curTotalPrice.toString().split('.')[1] ? curTotalPrice.toString().split('.')[1] : '00' }}
          </span>
        </span>
        <span class="settle_wrapper">
          <button
            class="settle_btn"
            @click="submitOrder()"
          >结算({{ selectListLength }})</button>
        </span>
      </span>
    </span>
  </section>
</template>
<script>
import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    name: 'total',
    data() {
      return {
        selectAllStatus: false,
      };
    },
    props: {
      selectListLength: Number,
      curTotalPrice: Number,
      leftClick: Function,
    },
    mounted() {},
    methods: {
      
      selectAll() {
        this.$emit('getSelectAllFeedback', this.selectAllStatus);
      },
      submitOrder() {
        this.$emit('getSubmitOderFeedback');
      },
    },
  };
</script>

<style lang="scss">
  #total {
    box-sizing: border-box;
    position: fixed;
    display: flex;
    justify-content: space-between;
    align-items: center;
    // bottom: calc(#{rem(42)} + env(safe-area-inset-bottom));
    bottom: 13vw;
    width: 100%;
    height: rem(48);
    // border-top: rem(1) solid $border_gray;
    background: $white;
  }

  .total_left {
    position: relative;
    margin-left: rem(10);
    font-size: $font_size_16;
  }

  .radio_label {
    display: flex;
    align-items: center;
  }

  .total_right {
    font-size: $font_size_16;
  }

  .settle_btn {
    width: rem(100);
    height: rem(48);
    margin-left: rem(12);
    background: $orange;
    color: $white;
    font-size: $font_size_14;
  }
</style>