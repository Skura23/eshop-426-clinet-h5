<!-- card -->
<template>
  <div class="app-container page-card">
    <div class="_wra0 tc ">
      <div
        class="borr i-b ov"
        style="font-size:0"
      >
        <van-image
          width="97vw"
          height="44.5vw"
          fit="cover"
          class="u-box-s "
          :src="require('@/assets/imgs/78.png')"
        />
      </div>
    </div>

    <div class="_wra1">
      <div class="_more tc font12">
        <div @click="togCard">
          展示全部名片信息
          <van-icon
            name="arrow-down"
            v-if="!cardShowAll"
          />
          <van-icon
            name="arrow-up"
            v-if="cardShowAll"
          />
        </div>


        <div
          class="mt10 _a"
          v-if="cardShowAll"
        >
          <span>手机 13546352638</span>
          <span>
            <a href="tel:13546352638">
              <van-tag
                plain
                type="primary"
              >拨打</van-tag>
            </a>
          </span>
        </div>
      </div>

      <div class="mt _b ">
        <van-button
          class="borr"
          plain
          type="info"
          style="width:47%;"
          @click="shareCard"
        >分享名片</van-button>
        <van-button
          class="borr"
          type="info"
          style="width:47%;"
        >交换联系方式</van-button>
      </div>

      <div class="_d0 mt cl-gray font12">
        <div class="_d0-l">
          <div class="_d0-l-u">
            <van-image
              width="6.3vw"
              height="6.3vw"
              fit="cover"
              class="mr5"
              radius="1.3vw"
              :src="item.headimgurl"
              v-for="(item, index) in dataset.pv_list"
              :key="index"
              v-if="index<5"
            />

            <img
              src="@/assets/imgs/11.png"
              style="width:4vw;vertical-align: 4vw;"
              alt=""
              class="ml5"
            >
          </div>
          <div class="_d0-l-d">
            浏览 {{dataset.pv_num}}
          </div>
        </div>
        <div class="_d0-r tc">
          <div
            class="i-b"
            @click="likeCard"
          >
            <div class="_d0-r _d0-r-t">
              <van-icon
                name="good-job-o"
                v-if="dataset.is_like==2"
              />
              <van-icon
                name="good-job"
                v-if="dataset.is_like==1"
              />
            </div>
            <div class="_d0-r _d0-r-b">
              点赞 {{dataset.like_num}}
            </div>
          </div>
          <div
            class="i-b ml"
            @click="$router.push('/card/qr')"
          >
            <div class="_d0-r _d0-r-t">
              <van-icon name="qr" />
            </div>
            <div class="_d0-r _d0-r-b">
              名片码
            </div>
          </div>
        </div>
      </div>

      <div class="_d1 mt">
        <van-image
          width="100%"
          height="50vw"
          fit="cover"
          radius="2.7vw"
          :src="require('@/assets/imgs/78.png')"
        />
      </div>

      <div class="_d2 mt">
        <div class="_t">
          <span class="iconmingpian iconfont"></span>
          <span class="ml5">
            自我推荐
          </span>
        </div>
        <div class="_c bac-whi borr mt10">
          {{dataset.intro}}
        </div>
      </div>

      <div class="_d3 mt">
        <div class="_t">
          <img
            src="@/assets/imgs/9.png"
            style="width:4vw;vertical-align: bottom;"
            alt=""
          >
          <span class="ml10">印象标签</span>
        </div>
        <div class="_c ">
          <div
            class="i-b _c-i bac-whi borr mr10 mt10"
            v-for="(item, index) in dataset.tag_list"
            :key="index"
          >
            {{item.tag_name}} <span class="cl-gray ml5 mr5">|</span>
            <van-icon
              size="4.6vw"
              style="vertical-align: bottom;"
              name="good-job-o"
              v-if="item.is_like==2"
              @click="likeTag(item)"
            />
            <van-icon
              size="4.6vw"
              style="vertical-align: bottom;"
              name="good-job"
              v-if="item.is_like==1"
              @click="likeTag(item)"
            />
            {{item.like_num}}
          </div>
        </div>
      </div>

      <div class="_d4 mt">
        <div class="_t">
          <img
            src="@/assets/imgs/8.png"
            style="width:5.5vw;vertical-align: bottom;"
            alt=""
          >
          <span class="ml10">照片墙</span>
        </div>
        <div class="_c">
          <van-image
            class="mt10"
            width="100%"
            height="50vw"
            fit="cover"
            radius="2.7vw"
            :src="item"
            v-for="(item, index) in dataset.photo_wall"
            :key="index"
          />
        </div>
      </div>

    </div>

    <van-popup
      v-model="showShare"
      position="bottom"
      :style="{ height: '30%' }"
    >
      <div class="_card-share">
        <div
          class="_l"
          @click="showShare=false;showShareGuide = true"
        >
          <div class="_t">
            <van-image
              width="11vw"
              fit="cover"
              :src="require('@/assets/imgs/14.png')"
            />
          </div>
          <div class="_b mt">
            转发到好友或群聊
          </div>
        </div>
        <div
          class="_r"
          @click="getPoster"
        >
          <div class="_t">
            <van-image
              width="11vw"
              fit="cover"
              :src="require('@/assets/imgs/15.png')"
            />
          </div>
          <div class="_b mt">
            生成名片海报
          </div>
        </div>
      </div>
    </van-popup>

    <div
      class="fixed"
      style="right:10vw;bottom:20vw"
      @click="$router.push(`/card/chat?auth_code=${dataset.auth_code}`)"
    >
      <van-image
        round
        width="10vw"
        height="10vw"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      >

      </van-image>
      <van-icon
        name="chat-o"
        class="ab"
        size="5vw"
        color="blue"
        style="right:-0.3vw;bottom:1vw;"
      />
    </div>

    <van-popup
      v-model="posterShow"
      class="tc"
    >
      <img
        :src="posterUrl"
        alt=""
        style="width:70vw;"
      >
      <van-button
        type="info"
        class="mb10"
      >长按图片保存</van-button>
    </van-popup>

    <wx-share-guide :show.sync="showShareGuide"></wx-share-guide>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import WxShareGuide from '@/components/WxShareGuide'

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        showShare: false,
        dataset: {},
        cardShowAll: false,
        posterShow: false,
        posterUrl: '',
        cardIslike: false,
        showShareGuide: false,
      }

    },
    components: {
      WxShareGuide
    },
    computed: {},
    created() {

      api.shop_card_detail({}).then((res) => {
        this.dataset = res.data
        this.dataset.like_num = +this.dataset.like_num
      })
    },
    mounted() {},

    methods: {
      getPoster() {
        api.create_image({
          auth_code: this.dataset.auth_code
        }).then((res) => {
          this.showShare = false
          this.posterShow = true
          this.posterUrl = res.data.url
        })
      },
      likeTag(item) {
        api.tag_like({
          tag_id: item.tag_id
        }).then((res) => {
          if (res.code == 9999) {
            item.like_num = Number(item.like_num)
            item.like_num += 1
          }
        })
      },
      likeCard() {
        api.auth_like({
          auth_code: this.dataset.auth_code
        }).then((res) => {
          if (res.code == 9999) {
            this.dataset.is_like = 1
            this.dataset.like_num += 1
          }
        })
      },
      togCard() {
        this.cardShowAll = !this.cardShowAll
      },
      shareCard() {
        this.showShare = true
      },
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-card {
    ._wra0 {
      margin-top: 1.5vw;
    }

    ._wra1 {
      padding: 0 4.4vw;

      /* padding-bottom:  */
      ._more {
        color: #2b2a2a;
        opacity: 0.83;
        margin: 4.5vw 0;

        ._a {
          @include flexbox();
        }


      }

      ._b {
        @include flexbox();


      }

      ._d0 {
        @include flexbox();

        ._d0-r-t {
          font-size: 7.5vw;
          color: #000;
        }
      }

      ._d2 {
        ._c {
          padding: 4.5vw 3.5vw;
        }
      }

      ._d3 {
        ._c-i {
          padding: 2vw;

        }
      }
    }

    ._card-share {
      @include flexbox();
      height: 100%;
      text-align: center;
      justify-content: space-around;

      ._l {}
    }
  }
</style>