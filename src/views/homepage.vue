<!-- home -->
<template>
  <div class="app-container page-homepage">
    <img
      src="@/assets/imgs/1.png"
      class="borr2 w100 mt5"
      style=""
      alt=""
    >
    <div class="_cont-wra">
      <div class="_d0">
        <div class="mt">
          <span class="iconmingpian iconfont"></span>
          官网介绍
        </div>
        <div class="_0-cont mt">
          <div class="m-card _0inner ">
            浙江板川电器有限公司是一家专注以集成灶为核心
            的现代新型厨房电器的研发、设计、生产和销售的厨电企业。
            作为国内集成灶行业的领先企业之一，
            旨在打造安全厨房生活第一品牌，成为全球消费者厨房
            安全的守护者。公司拥有集成灶行业内领先的实验室以及
            检测实验设备，为集成灶行业国际、国家、行业以及团体
            标准的制定提供了核心性能数据;成为集成灶行业的标准制
            订者与推动者，同时凭借多年持续的技术研发，
            公司积累了多项集成灶生产的核心技术，
            获得多项“发明专利”“外观专利”“实用专利”，
            产品多项性能指标处于行业前列。
            优质的产品与服务使公司获得了良好的行业和市场口碑，
            公司产品获得“集成灶十大品牌”、
            “全球中小企业联盟官方指定集成灶”、
            “米兰世博会KIP馆指定集成灶“等多项殊荣。
          </div>
        </div>
      </div>

      <div class="_d1">
        <div class="mt">
          <span class="iconmingpian iconfont"></span>
          企业荣誉
        </div>
        <div class="_1-cont mt">
          <div
            class="_item ov re"
            v-for="(item, index) in honorList"
            :key="index"
          >
            <!-- <img
              src=""
              class="h-center borr2"
              alt=""
            > -->
            <van-image
              radius="2.7vw"
              class="h-center borr2"
              width="41vw"
              height="47vw"
              fit="cover"
              :src="require(`@/assets/imgs/${index+2}.png`)"
            />
            <div class="_a borr2 bac-whi mt">
              <div class="_b h-center ab"></div>
              <div class="_c tc ab">{{item}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="_d2">
        <div class="mt">
          <van-icon name="location-o" />
          联系地址
        </div>
        <div class="mt"></div>
        <div class="m-card _2-cont ">
          <baidu-map
            class="map"
            :center="center"
            :zoom="16"
          >
            <bm-marker
              :position="center"
              animation="BMAP_ANIMATION_BOUNCE"
            >
              <!-- <bm-label
                content="浙江板川电器有限公司"
                ,
                :labelStyle="{color: '#fff', fontSize : '3vw',height: '5vw',lineHeight: '5vw', borderRadius:'3vw', padding:'1vw 2vw', background:'#ED0336', transform: 'translateX(calc(10px - 50%))'}"
                :offset="{ height: 30}"
              /> -->
            </bm-marker>
          </baidu-map>
          <div class="mt">
            {{dataset.phone}}
          </div>
          <div class="mt10 _a">
            <div style="width:43vw">
              {{dataset.address}}
            </div>
            <div class="font20 cl-oran">
              <a :href="`tel:${dataset.phone}`" class="" style="color: #ff7728!important">
                <van-icon name="phone-o" />
              </a>
              <van-icon
                name="location-o"
                class="ml10"
                @click="centerMap"
              />
            </div>
          </div>
        </div>
      </div>

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
        honorList: [
          '入选CCTV「品牌力量」',
          '工业企业三是优',
          '「集成水槽」参编单位',
          '全国百佳质量诚信标杆企业',
          '影响力品牌',
          '指定集成灶品牌',
        ],
        dataset: {},
        center: {}
      }

    },

    computed: {},
    created() {
      api.factory_detail({}).then((res) => {
        this.dataset = res.data
        let {
          lng,
          lat
        } = this.dataset
        this.center = {
          lng,
          lat
        }
      })
    },
    mounted() {},

    methods: {
      centerMap() {
        let {
          lng,
          lat
        } = this.dataset
        this.center = {
          lng: 0,
          lat: 0
        }
        setTimeout(() => {
          this.center = {
            lng,
            lat,
          }
        }, 10);

      },
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-homepage {
    ._cont-wra {
      padding: 4.4vw;
      padding-top: 0;
      padding-bottom: 10vw;

      ._0-cont {
        line-height: 6.4vw;

        ._0inner {
          width: 100%;
          padding: 5vw 3vw;
        }
      }

      ._1-cont {
        ._item {
          display: inline-block;
          width: 44vw;
          height: 64.4vw;
          margin-right: 3vw;
          margin-top: 6.8vw;

          &:nth-child(2n) {
            margin-right: 0;
          }

          &:first-child,
          &:nth-child(2) {
            margin-top: 0;

          }

          /* img {
            width: 41vw;
            height: 47vw;
          } */
          ._a {
            height: 58.4vw;

            ._b {
              width: 7.1vw;
              height: 0.8vw;
              background-color: #ff7726;
              bottom: 11.7vw;
            }

            ._c {
              bottom: 3.6vw;
              width: 100%;
            }
          }
        }

      }

      ._d2 {
        ._2-cont {
          padding: 2vw;
          width: 100%;

          .map {
            width: 100%;
            height: 38vw;
          }

          ._a {
            @include flexbox();
          }
        }
      }
    }
  }
</style>