<!-- home -->
<template>
  <div class="app-container page-homepage2">
    <van-swipe
      class="my-swipe"
      :autoplay="3500"
      indicator-color="white"
    >
      <van-swipe-item
        v-for="(item, index) in 4"
        :key="index"
      >
        <img
          :src="require(`@/assets/imgs/${93+index}.jpg`)"
          class="w100"
          alt=""
        >
      </van-swipe-item>

    </van-swipe>

    <div class="_d0 mt5 bac-whi auto0">
      <div class="_img0 _bor">
        <img
          src="@/assets/imgs/88.jpg"
          class="w100"
          alt=""
        >
      </div>

      <div class="_img1 mt5">
        <van-grid
          gutter="2vw"
          :column-num="2"
        >
          <van-grid-item
            v-for="(item, index) in 4"
            :key="value"
          >
            <img
              :src="require(`@/assets/imgs/${89+index}.jpg`)"
              class="w100 "
              alt=""
            >
          </van-grid-item>
        </van-grid>
      </div>

      <div class="_img2 mt5 _bor">
        <div class="mt ml10">
          荣 誉 与 专 利 Honor And Patents
        </div>
        <van-swipe
          class="my-swipe mt10"
          :autoplay="4000"
          indicator-color="white"
        >
          <van-swipe-item
            v-for="(item, index) in 4"
            :key="index"
          >
            <van-grid
              gutter="2vw"
              :column-num="3"
              :border="false"
            >
              <van-grid-item>
                <img
                  :src="require(`@/assets/imgs/${99+index*3+1}.jpg`)"
                  class="_i"
                  alt=""
                  @click="prevImg(99+index*3+1)"
                >
              </van-grid-item>
              <van-grid-item>
                <img
                  :src="require(`@/assets/imgs/${99+index*3+2}.jpg`)"
                  class="_i"
                  alt=""
                  @click="prevImg(99+index*3+2)"
                >
              </van-grid-item>
              <van-grid-item><img
                  :src="require(`@/assets/imgs/${99+index*3+3}.jpg`)"
                  class="_i"
                  alt=""
                  @click="prevImg(99+index*3+3)"
                >
              </van-grid-item>
            </van-grid>



          </van-swipe-item>

        </van-swipe>
      </div>

    </div>

  </div>

</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import {
    ImagePreview
  } from 'vant';
  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {

      }

    },

    computed: {},
    created() {

    },
    mounted() {},

    methods: {
      prevImg(idx) {
        ImagePreview([
          require(`@/assets/imgs/${idx}.jpg`)
        ]);
      },
    }
  }
</script>


<style lang="scss">
  .app-container.page-homepage2 {

    ._bor {
      border: 1px solid #A6A09C;
    }

    ._d0 {
      /* width: 94vw; */
      padding: 1.3vw 3vw;

      ._img0 {
        font-size: 0;
      }

      ._img1 {
        [class*=van-hairline]::after {
          border: 1px solid #A6A09C;
        }

        .van-grid-item {
          &:nth-child(2n) {
            padding-right: 0 !important;
          }
        }

        .van-grid {
          padding-left: 0 !important;

        }
      }

      ._img2 {
        ._i {
          width: 20vw;
        }

        .van-swipe__indicators {
          bottom: 7px;
        }

        .van-swipe__indicator {
          background-color: gray;
        }

        .van-swipe__indicator--active {
          background-color: red !important;
        }
      }
    }
  }
</style>