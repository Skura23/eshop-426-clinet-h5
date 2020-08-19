<!-- home -->
<template>
  <div class="app-container page-shopapply">
    <div class="_wra">
      <van-cell-group>
        <!-- 

邀请码
手机号
申请理由
店铺名称
店铺地址
申请人姓名
入驻模式 

-->
        <van-field
          v-model="dataset.invite_code"
          label=""
          left-icon="envelop-o"
          placeholder="邀请码"
          required
        />
        <van-field
          v-model="dataset.phone"
          label=""
          left-icon="phone-o"
          placeholder="手机号"
          required
        />
        <van-field
          v-model="dataset.reason"
          label=""
          left-icon="records"
          placeholder="申请理由"
          required
        />
        <van-field
          v-model="dataset.factory_name"
          label=""
          left-icon="shop-o"
          placeholder="店铺名称"
          required
        />
        <van-field
          v-model="location"
          label=""
          left-icon="location-o"
          placeholder="店铺地址"
          @click="areaPopshow=true"
          class=""
        />
        <van-field
          v-model="dataset.area_detail"
          label=""
          placeholder="详细地址"
          class="_detail-addr"
        />
        <van-field
          v-model="dataset.request_name"
          label=""
          left-icon="contact"
          placeholder="申请人姓名"
          required
        />

        <van-cell
          title="入驻模式"
          value="内容"
          icon="aim"
          required
          class="cl-gray _mode"
        >
          <template>
            <van-radio-group v-model="dataset.enter_type">
              <van-radio
                name="1"
                checked-color="#07c160"
                size="3vw"
              >服务扣点</van-radio>
              <van-radio
                class="mt5"
                name="2"
                checked-color="#07c160"
                size="3vw"
              >入驻费 注：入驻费 **元</van-radio>
            </van-radio-group>

          </template>
        </van-cell>

        <!-- <van-icon name="envelop-o" />
<van-icon name="phone-o" />
<van-icon name="records" />
<van-icon name="shop-o" />
<van-icon name="location-o" />
<van-icon name="contact" />
<van-icon name="aim" /> -->


      </van-cell-group>
      <div class="mt"></div>
      <div class="mt">
        <van-button
          round
          type="info"
          size="large"
          color="#FD912B"
          @click="submit"
        >注册</van-button>
      </div>
    </div>


    <van-popup
      v-model="areaPopshow"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-area
        title=""
        :area-list="areaList"
        @confirm="setArea"
        @cancel="areaPopshow=false"
      />
    </van-popup>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import areaList from '@/utils/area' // get token from cookie


  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        areaPopshow: false,
        dataset: {

        },
        areaList,
        areaCodes: {},
        location: ''
      }

    },

    computed: {},
    created() {

    },
    mounted() {},

    methods: {
      submit() {

        api.factory_request({
          ...this.dataset,
          ...this.areaCodes
        }).then((res) => {
          if (res.code == 9999) {
            Toast({
              message: '申请成功',
              duration: 1500,
              onClose: () => {
                utils.jumpTo('/mall')
              }
            })
          } else {
            Toast({
              message: res.info,
              duration: 1500,
              onClose: () => {

              }
            })
          }
        })
      },
      setArea(data) {
        console.log(data, 'setArea');
        this.areaCodes = {
          province_id: data[0].code,
          area_id: data[1].code,
          city_id: data[2].code,
        }
        let str = ""
        for (let i = 0; i < data.length; i++) {
          const elem = data[i];
          str += elem.name
        }
        this.location = str
        this.areaPopshow = false
      },
    }
  }
</script>


<style lang="scss">
  .app-container.page-shopapply {
    min-height: 100vh;
    background-color: #FD912B;
    overflow: auto;

    ._wra {
      margin: 4vw;
      padding: 10vw 4vw;
      background-color: #ffffff;
      box-shadow: 0vw 0vw 6.5vw 0vw #f39b00;
      border-radius: 4vw;
    }

    .van-icon {
      color: #FD912B;
    }

    ._mode {
      .van-cell__value {
        flex: 0 0 70%;
        color: #ffffff;

        .van-radio__icon {
          transform: scale(0.8);
        }

        .van-radio__label {
          color: #C8C9CC;

        }
      }

      .van-cell__title {
        color: #C8C9CC;
      }
    }

    ._detail-addr {
      .van-field__control {
        padding-left: 5.6vw;
      }
    }
  }
</style>