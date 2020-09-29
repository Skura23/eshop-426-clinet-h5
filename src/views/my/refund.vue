<!-- home -->
<template>
  <div class="app-container page-my-refund">
    <div
      class="bac-whi mt10 _d0"
      style="padding:3vw"
    >
      <div class="_d0_0">
        <van-image
          width="20vw"
          height="20vw"
          fit="cover"
          :src="require('@/assets/imgs/78.png')"
        />
      </div>
      <div class="_d0_1 ml10">
        <div class="">
          睡衣睡裤春季纯棉睡衣睡裤
          春季纯棉
        </div>
        <div class="mt cl-gray">
          黄色；30寸
        </div>
      </div>
    </div>

    <div class="_d1 mt10">
      <van-cell
        title="退款原因"
        :value="reasonText"
        @click="f_reasonPop = true"
        is-link
      />
      <!-- <van-field
        v-model="text"
        label="退款金额:"
      /> -->
      <van-cell
        title="退款金额"
        :value="refundData.money"
      />
      <van-cell
        title="可修改，最多￥1000，含发货邮费：￥0.00"
        class="_tip"
      />
      <van-cell
        title="退货方式"
        :value="returnTypeMap[refundData.return_type-1]"
      />

      <van-field
        v-model="refundText"
        label="退货说明:"
        class="mt10"
      />
    </div>

    <div
      class="_d2 bac-whi mt10"
      style="padding: 10px 16px;"
    >
      上传凭证
      <van-uploader
        v-model="fileList"
        :max-count="9"
        class="mt10"
        :after-read="afterRead"
        @delete="deleteImg"
      />
    </div>

    <van-popup
      v-model="f_reasonPop"
      position="bottom"
    >
      <van-picker
        title="选择分类"
        show-toolbar
        :columns="refundData.refund_reason"
        :default-index="defaultIndex"
        :value-key="'reason'"
        @cancel="onReasonCancel"
        @confirm="onReasonConfirm"
      />
    </van-popup>

    <div
      class="fixed w100"
      style="bottom:50px"
    >
      <van-button
        type="primary"
        color="#ff7728"
        block
        @click="submit"
      >提交</van-button>
    </div>
  </div>
</template>

<script>
  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import axios from 'axios'

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    data() {
      return {
        columns: [],
        defaultIndex: '',
        refundData: {},
        returnTypeMap: [
          '退款退货',
          '退款(仅退款不退货)'
        ],
        f_reasonPop: false,
        reasonText: '',
        reasonId: '',
        refundText: '',
        fileList: [],
      }

    },

    computed: {},
    created() {
      api.order_refund_check({
        order_no: 20083100010001
      }).then((res) => {
        this.refundData = res.data

      })
    },
    mounted() {},

    methods: {
      onReasonCancel() {
        this.f_reasonPop = false
      },

      submit() {
        let arr = this.fileList.map(v => v.url)
        api.order_refund_create({
          order_no: '',
          reason_id: this.reasonId,
          image_url: arr,
          remark: this.refundText,
        }).then((res) => {
          if (res.code == 9999) {
            this.$router.push(`/my`)
          } else {
            Toast(res.info)
          }
        })
      },
      onReasonConfirm(val, idx) {
        this.reasonText = val.reason
        this.reasonId = this.refundData.refund_reason[idx].reason_id
        this.f_reasonPop = false
      },

      deleteImg(file, detail) {
        // console.log(detail, 'delete');
        // this.fileList.splice(detail.index, 1)
      },
      afterRead(file) {
        //文件读取完成后的回调函数
        let content = file.file;
        //创建一个新的FormData
        let formData = new FormData();
        // upload这个名字是后台给的
        formData.append("image", content);
        //获取formdata表单所有的数据
        console.log(formData.getAll(""));
        // axios
        //   .post(
        //服务器上传地址
        //     `http://xxxxxxxxxxxx`,
        //服务器需要的数据，此处是formdata表单
        //     formData,（名字是后台参数确定的）
        //如果默认请求头是json，需要改一下请求头数据格式
        //     {
        //       "Content-Type": "multipart/form-data"
        //     }
        //   )
        //   .then(res => {
        //     console.log(res);
        //     console.log(res.config.headers);
        //   });
        axios({
          method: "post",
          //服务器上传地址
          url: `${globals.curBaseUrl}/upload`,
          data: formData, //（名字是后台接口参数确定的）
          headers: {
            // 修改请求头
            "Content-Type": "multipart/form-data"
          }
        }).then(res => {
          console.log(res, this.fileList, 'upload');
          this.fileList[this.fileList.length - 1] = {
            url: res.data.data[0].all_path
          }
          console.log(this.fileList, 'this.fileList');
          // console.log(res.config.headers);
        });
      }
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-my-refund {
    ._d0 {
      @include flexbox();
      justify-content: start;

      ._d0_0 {}

      ._d0_1 {}
    }

    ._d1 {
      ._tip {
        .van-cell__title {
          font-size: 2vw;
          color: darkgray;
        }
      }
    }
  }
</style>