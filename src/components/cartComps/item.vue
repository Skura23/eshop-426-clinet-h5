<template>
  <section id="item">
    <ul
      class="store_list"
      v-if="totalNum != 0"
    >
      <!-- 有效的宝贝 -->
      <li
        class="store_item"
        ref="getStoreDOM"
        v-for="(store, storeIndex) in vaildCommodities"
        :key="store.factory_id"
      >
        <div class="store_wrapper">
          <!-- <div :class="['store_wrapper',
            store.store_promotion.length === 0? '' : 'border_1px_bottom']"> -->
          <span class="store_basic">
            <label
              :for="`selectStoreAll_${store.factory_id}`"
              class="radio_label"
              @change="handleOneStoreSelect($event)"
            >
              <input
                type="checkbox"
                :id="`selectStoreAll_${store.factory_id}`"
                class="select_radio"
              >
              <i class="iconfont radio_icon icon-round"></i>
            </label>
            <!-- <i
              class="store_type_logo"
              :style="{backgroundImage: `url(${getStoreType(store.store_type)})`}"
            >
            </i> -->
            <span class="store_name ml10">{{ store.factory_name }} ></span>

          </span>
          <span class="store_attach">
            <!-- <span
              class="get_coupon"
              v-if="store.coupon"
            >领券</span> -->
            <span
              class="get_edit"
              @click="toggleDelete(storeIndex)"
            >编辑</span>
          </span>
        </div>
        <!-- <div
          class="store_activity_wrapper"
          v-if="store.store_promotion.length !== 0"
        >
          <span class="activity_title">本店活动</span>
          <span class="activity_content">{{ store.store_promotion }}</span>
        </div> -->
        <ul class="commodity_list">
          <li
            class="commodity_item"
            v-for="(commodity, commodityIndex) in store.goods"
            :key="commodity.cart_id"
          >
            <div
              class="commodity_item_container"
              :id="`commodityItem_${store.factory_id}_${commodity.cart_id}`"
              v-touch:swipe="handleSwiper(store.factory_id, commodity.cart_id)"
            >
              <div class="radio_img_wrapper">
                <label
                  :for="`selectStoreOne_${store.factory_id}_${commodity.cart_id}`"
                  class="radio_label"
                  @change="handleOneSelect($event, commodity.cart_id, commodity.num,
                    commodity.price, store.factory_id)"
                >
                  <input
                    type="checkbox"
                    :id="`selectStoreOne_${store.factory_id}_${commodity.cart_id}`"
                    class="select_radio"
                    :data-cur="
                      `${commodity.cart_id}_${commodity.num}_${commodity.price}`"
                  >
                  <i class="iconfont radio_icon icon-round"></i>
                </label>
                <img
                  :src="commodity.goods_image[0]"
                  :alt="commodity.goods_name"
                  class="commodity_img"
                >
              </div>
              <div class="commodity_detail_wrapper">
                <h3 class="commodity_title">{{ commodity.goods_name }}</h3>
                <!-- <p
                  class="warning tmall_wuyou_logo_wrapper"
                  v-if="commodity.is_tmall_wuyou"
                >
                  <img
                    :src="tmall_wuyou_logo"
                    alt="tmall_wuyou_logo"
                  >
                </p> -->
                <!-- @click="handleSkuSelect()" -->
                <!-- <p
                  class="sku_picker"
                  v-if="commodity.type_union.length !== 0"
                >
                  {{ commodity.type_union.join(';') }}
                </p> -->
                <!-- <div
                  v-for="(warning, index) in commodity.warning_msg"
                  :key="index"
                >
                  <p class="warning low_stock_warning">{{ warning }}</p>
                </div> -->
                <div class="handle_count_wrapper">
                  <span class="price_wrapper">
                    <span class="small_text">¥</span>
                    <span class="large_text">
                      {{ commodity.price.toString().split('.')[0] }}
                    </span>
                    <span
                      class="large_text"
                      v-if="commodity.price.toString().split('.').length === 2"
                    >
                      .
                    </span>
                    <span class="small_text">
                      {{ commodity.price.toString().split('.')[1] }}
                    </span>
                  </span>
                  <span class="handle_count">
                    <!-- 减少数量需要传递四个参数，分别是 店铺索引/商品索引/当前数量/skuId -->
                    <i
                      class="iconfont icon-move handle_count_btn"
                      @click="reduceCount(
                          storeIndex,
                          commodityIndex,
                          commodity.num,
                          commodity.cart_id)"
                    >
                    </i>
                    <span>{{ commodity.num }}</span>
                    <!-- 增加数量需要传递六个参数，分别是 店铺索引/商品索引/当前数量/购买上限/库存总量/skuId-->
                    <i
                      class="iconfont icon-add handle_count_btn"
                      @click="addCount(
                          storeIndex,
                          commodityIndex,
                          commodity.num,
                          commodity.purchase_restriction_num,
                          commodity.sku_rest_stock,
                          commodity.cart_id)"
                    >
                    </i>
                  </span>
                </div>
              </div>
            </div>
            <div
              class="delete_commodity"
              :id="`delete_${store.factory_id}_${commodity.cart_id}`"
              @click="deleteCommodity(storeIndex, commodityIndex, commodity.cart_id)"
            >
              删除
            </div>
          </li>
        </ul>
      </li>

      <!-- 失效的宝贝 -->
      <!-- <li
        class="store_item"
        v-if="invaildCommodities.length > 0"
      >
        <div class="invaid_title_wrapper">
          <span class="invaid_big_logo">失效宝贝</span>
          <span
            class="remove_invaid_commodity"
            @click="deleteInvaidCommodities()"
          >
            清空失效宝贝
          </span>
        </div>
        <ul class="goods">
          <li
            class="commodity_item"
            v-for="commodity in invaildCommodities"
            :key="commodity.commodity_id"
          >
            <div class="commodity_item_container invaild_item_container">
              <span :class="['invaid_logo', commodity.pre_hot ? 'pre_hot' : '']">
                {{ commodity.pre_hot ? '预热' : '失效' }}
              </span>
              <img
                :src="commodity.goods_image[0]"
                :alt="commodity.goods_name"
                class="goods_image[0] invalid_img"
              >
              <div class="invaid_detail_wrapper">
                <h3 class="commodity_title invaid_title">{{ commodity.goods_name }}</h3>
                <p class="invaid_reason">{{ commodity.fail_reason }}</p>
                <p class="link_to_likely">找相似</p>
              </div>
            </div>
          </li>
        </ul>
      </li> -->
    </ul>

    <!-- no commodities -->
    <NoCommodities v-if="totalNum == 0"></NoCommodities>

    <!-- modal -->
    <div
      class='dialog_wrapper'
      v-show="showDialog"
    >
      <Overlay></Overlay>
      <PurchaseRestrictionDialog
        :warningMsg="warningMsg"
        :isDialog="isDialog"
        @getDialogFeedback="getDialogFeedback"
      >
      </PurchaseRestrictionDialog>
    </div>

    <!-- total -->
    <Total
      :selectListLength="selectListLength"
      :curTotalPrice="curTotalPrice"
      @getSelectAllFeedback="getSelectAllFeedback"
      @getSubmitOderFeedback="getSubmitOderFeedback"
      :left-click=clearCart
      ref="selectAllStatus"
      v-if="totalNum != 0"
    >
    </Total>

    <!-- sku selector -->
    <SkuSelector
      class="hidden_sku_selector"
      :showSkuPicker="showSkuPicker"
      @getSkuPickFeedback="getSkuPickFeedback"
    >
    </SkuSelector>
  </section>
</template>

<script>
  import Overlay from '@/components/cartComps/overlay.vue';
  import PurchaseRestrictionDialog from '@/components/cartComps/purchaseRestrictionDialog.vue';
  import Total from '@/components/cartComps/total.vue';
  import SkuSelector from '@/components/cartComps/skuSelector.vue';
  import NoCommodities from '@/components/cartComps/noCommodities.vue';
  import urlList from '@/utils/temp-url';

  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import api from '@/api/api'
  import {
    Toast
  } from 'vant';
  import {
    Dialog
  } from 'vant';


  export default {
    name: 'item',
    data() {
      return {
        curFactoryId: '',
        tmall_wuyou_logo: 'http://gw.alicdn.com/tfs/TB10WFoJH9YBuNjy0FgXXcxcXXa-405-72.png',
        showDialog: false,
        warningMsg: '',
        isDialog: 0,
        selectList: [],
        selectListLength: 0,
        curTotalPrice: 0,
        dialogFeedback: false,
        showSkuPicker: false,
        // delete
        curStoreIndex: 0,
        curSkuIndex: 0,
        curSkuId: '',
      };
    },
    components: {
      Overlay,
      PurchaseRestrictionDialog,
      Total,
      SkuSelector,
      NoCommodities,
    },
    props: {
      vaildCommodities: Array,
      invaildCommodities: Array,
      totalNum: [Number, String],
    },
    mounted() {},
    watch: {
      // 监听选中list的变化，一定要深！
      selectList: {
        handler() {
          this.selectListLength = this.selectList.length;
          this.curTotalPrice = 0;
          for (let i = 0, l = this.selectListLength; i < l; i += 1) {
            this.curTotalPrice += this.selectList[i].curNum * this.selectList[i].unitPrice;
          }
        },
        deep: true,
      },
    },
    methods: {
      clearCart() {
        Dialog.confirm({
            title: '提示',
            message: '确定清空购物车?',
          })
          .then(() => {
            // on confirm
            api.goods_cart_clear({}).then((res) => {
              if (res.code == 9999) {
                this.vaildCommodities = []
                this.totalNum = 0
              }
            })
          })
          .catch(() => {
            // on cancel
          });

      },
      // 定时关闭对话框
      closeDialog() {
        setTimeout(() => {
          this.showDialog = false;
        }, 1000);
      },
      // skuId匹配
      matchSkuId(skuId) {
        const result = this.selectList.findIndex(
          skuItem => skuItem.skuId == skuId,
        );
        return result;
      },
      // 获取商铺类型  1-天猫 | 2-企业店铺 | 3-天猫国际
      // getStoreType(typeNum) {
      //   if (typeNum === 1) {
      //     return urlList.tmall;
      //   }
      //   if (typeNum === 2) {
      //     return urlList.enterprise;
      //   }
      //   if (typeNum === 3) {
      //     return urlList.tmall_internation;
      //   }
      //   return false;
      // },
      // 增加单品数量
      addCount(storeIndex, commodityIndex, curNum, limitMaxNum, maxStockNum, skuId) {
        // 暂设最多购买数为9999
        limitMaxNum = 9999
        maxStockNum = 9999

        let addNum = () => {
          api.goods_cart_add({
            type: 'plus',
            cart_id: skuId
          }).then((res) => {
            if (res.code != 9999) {
              Toast(res.info);
              return
            }
            this.vaildCommodities[storeIndex].goods[commodityIndex].num = +this.vaildCommodities[storeIndex]
              .goods[
                commodityIndex].num
            this.vaildCommodities[storeIndex].goods[commodityIndex].num += 1;

            if (this.matchSkuId(skuId) !== -1) {
              this.selectList[this.matchSkuId(skuId)].curNum = +this.selectList[this.matchSkuId(skuId)].curNum
              this.selectList[this.matchSkuId(skuId)].curNum += 1;
            }
          })
        }

        // 如果有限购条件
        if (limitMaxNum > 0) {
          // 如果增加一件的话将超过最大限购数
          if (curNum + 1 > limitMaxNum) {
            this.showDialog = true;
            this.warningMsg = '亲，该宝贝不能购买更多哦～';
            this.isDialog = 0;
            this.closeDialog();
          } else {
            addNum()
          }
          // 没有限购条件，数量只要不超过库存量即可
        } else if (curNum + 1 > maxStockNum) {
          this.showDialog = true;
          this.isDialog = 0;
          this.warningMsg = '亲，该宝贝不能购买更多哦～';
          this.closeDialog();
        } else {
          addNum()
        }


      },
      // 减少单品数量
      reduceCount(storeIndex, commodityIndex, curNum, skuId) {
        if (curNum - 1 === 0) {
          this.showDialog = true;
          this.isDialog = 0;
          this.warningMsg = '宝贝不能再减少了哦～';
          this.closeDialog();
        } else {
          api.goods_cart_add({
            type: 'minus',
            cart_id: skuId
          }).then((res) => {
            if (res.code == 9999) {
              this.vaildCommodities[storeIndex].goods[commodityIndex].num -= 1;
              if (this.matchSkuId(skuId) !== -1) {
                this.selectList[this.matchSkuId(skuId)].curNum -= 1;
              }
            }
          })

        }
      },
      // 全选按钮
      // handleSelectAll(type) {
      //   const selectAllDOM = document.querySelector('#selectAll');
      //   if (type) {
      //     selectAllDOM.nextElementSibling.classList.remove('icon-round');
      //     selectAllDOM.nextElementSibling.classList.add('icon-roundcheckfill');
      //     selectAllDOM.checked = true;
      //     this.$refs.selectAllStatus.selectAllStatus = true;
      //   } else {
      //     selectAllDOM.nextElementSibling.classList.add('icon-round');
      //     selectAllDOM.nextElementSibling.classList.remove('icon-roundcheckfill');
      //     selectAllDOM.checked = false;
      //     this.$refs.selectAllStatus.selectAllStatus = false;
      //   }
      // },
      // 判断所有店铺是否被选中
      getSelectStoreAll() {
        const selectStoreAllDOM = document.querySelectorAll(
          'input[id^=selectStoreAll]',
        );
        const selectAllDOM = document.querySelector('#selectAll');
        const result = Array.from(selectStoreAllDOM).every(item => item.checked);

        if (result) {
          selectAllDOM.nextElementSibling.classList.remove('icon-round');
          selectAllDOM.nextElementSibling.classList.add('icon-roundcheckfill');
          selectAllDOM.checked = true;
          this.$refs.selectAllStatus.selectAllStatus = true;
        }
      },
      // 选择单品
      handleOneSelect(e, skuId, curNum, unitPrice, factory_id) {
        const sku = {
          skuId,
          curNum,
          unitPrice,
        };

        // 检查factory_id, 相同则提示无法选择
        if (this.curFactoryId != '' && factory_id != this.curFactoryId) {
          Toast('暂不支持跨商户选择商品')
          return
        } else {
          this.curFactoryId = factory_id
        }
        const storeId = e.target.id.split('_')[1];
        const curStoreDOM = document.querySelector(
          `input[id=selectStoreAll_${storeId}]`,
        );
        const curStoreCommoditiesDOMList = document.querySelectorAll(
          `input[id^=selectStoreOne_${storeId}]`,
        );


        // 取消选中时
        if (!e.target.checked) {
          this.selectList.splice(this.matchSkuId(skuId), 1);
          // 若全部取消选中则重置curFactoryId
          if (this.selectList.length == 0) {
            this.curFactoryId = ''
          }
          e.target.nextElementSibling.classList.add('icon-round');
          e.target.nextElementSibling.classList.remove('icon-roundcheckfill');

          // 若先点击了店铺全选 再去取消一件单品时 将店铺全选按钮熄掉
          curStoreDOM.nextElementSibling.classList.add('icon-round');
          curStoreDOM.nextElementSibling.classList.remove('icon-roundcheckfill');
          curStoreDOM.checked = false;

          // 全选也要熄掉
          // this.handleSelectAll(false);

          // 选中时
        } else {
          this.selectList.push(sku);
          e.target.nextElementSibling.classList.remove('icon-round');
          e.target.nextElementSibling.classList.add('icon-roundcheckfill');

          // 判断如果此时恰好一个商铺底下的商品全部被勾选 将店铺全选按钮点亮
          const result = Array.from(curStoreCommoditiesDOMList).every(item => item.checked);

          if (result) {
            curStoreDOM.nextElementSibling.classList.remove('icon-round');
            curStoreDOM.nextElementSibling.classList.add('icon-roundcheckfill');
            curStoreDOM.checked = true;
          }

          this.getSelectStoreAll();
        }
      },
      // 按商铺批量选择
      handleOneStoreSelect(e) {
        const storeId = e.target.id.split('_')[1];
        const commoditiesOfStore = document.querySelectorAll(
          `input[id^=selectStoreOne_${storeId}]`,
        );
        if (e.target.checked) {
          e.target.nextElementSibling.classList.remove('icon-round');
          e.target.nextElementSibling.classList.add('icon-roundcheckfill');
          for (let i = 0, l = commoditiesOfStore.length; i < l; i += 1) {
            if (!commoditiesOfStore[i].checked) {
              commoditiesOfStore[i].checked = true;
              commoditiesOfStore[i].nextElementSibling.classList.remove('icon-round');
              commoditiesOfStore[i].nextElementSibling.classList.add('icon-roundcheckfill');

              const dataCurArr = commoditiesOfStore[i].dataset.cur.split('_');
              const sku = {
                skuId: dataCurArr[0],
                curNum: parseInt(dataCurArr[1], 10),
                unitPrice: parseFloat(dataCurArr[2]),
              };
              this.selectList.push(sku);
            }
          }
          this.getSelectStoreAll();
        } else {
          e.target.nextElementSibling.classList.add('icon-round');
          e.target.nextElementSibling.classList.remove('icon-roundcheckfill');
          for (let i = 0, l = commoditiesOfStore.length; i < l; i += 1) {
            commoditiesOfStore[i].checked = false;
            commoditiesOfStore[i].nextElementSibling.classList.add('icon-round');
            commoditiesOfStore[i].nextElementSibling.classList.remove('icon-roundcheckfill');
            const dataCurArr = commoditiesOfStore[i].dataset.cur.split('_');
            this.selectList.splice(this.matchSkuId(dataCurArr[0]), 1);
            // this.handleSelectAll(false);
          }
        }
      },
      // 获取全选按钮传递过来的信息
      getSelectAllFeedback(params) {
        const allInputDOM = document.querySelectorAll('input');
        const commoditiesDOM = document.querySelectorAll(
          'input[id^=selectStoreOne]',
        );
        this.selectList.splice(0, this.selectList.length);
        if (params) {
          for (const item of allInputDOM) {
            item.checked = true;
            item.nextElementSibling.classList.remove('icon-round');
            item.nextElementSibling.classList.add('icon-roundcheckfill');
          }
          for (let i = 0, l = commoditiesDOM.length; i < l; i += 1) {
            const dataCurArr = commoditiesDOM[i].dataset.cur.split('_');
            const sku = {
              skuId: dataCurArr[0],
              curNum: parseInt(dataCurArr[1], 10),
              unitPrice: parseFloat(dataCurArr[2]),
            };
            this.selectList.push(sku);
          }
        } else {
          for (const item of allInputDOM) {
            item.checked = false;
            item.nextElementSibling.classList.add('icon-round');
            item.nextElementSibling.classList.remove('icon-roundcheckfill');
          }
        }
      },
      // 显示隐藏一个商铺下的所有商品的删除按钮
      toggleDelete(storeIndex) {
        const curStoreDOM = this.$refs.getStoreDOM[storeIndex];
        const deleteDOM = curStoreDOM.querySelectorAll('.delete_commodity');
        const commodityDOM = curStoreDOM.querySelectorAll('.commodity_item_container');
        const editorTagDOM = curStoreDOM.querySelector('.get_edit');
        for (let i = 0, l = deleteDOM.length; i < l; i += 1) {
          deleteDOM[i].classList.toggle('show_delete');
          commodityDOM[i].classList.toggle('shrink_commodity_item');
        }
        if (editorTagDOM.innerText === '编辑') {
          editorTagDOM.innerText = '完成';
        } else {
          editorTagDOM.innerText = '编辑';
        }
      },
      // 左滑展示删除按钮
      handleSwiper(storeId, skuId) {
        return (direction) => {
          const curCommodityDOM = document.querySelector(`#commodityItem_${storeId}_${skuId}`);
          const curDeleteDOM = document.querySelector(`#delete_${storeId}_${skuId}`);
          if (direction === 'left') {
            curDeleteDOM.classList.add('show_delete');
            curCommodityDOM.classList.add('shrink_commodity_item');
          } else {
            curDeleteDOM.classList.remove('show_delete');
            curCommodityDOM.classList.remove('shrink_commodity_item');
          }
        };
      },
      // 删除无效商品
      deleteInvaidCommodities() {
        this.showDialog = true;
        this.warningMsg = '确定要删除失效产品吗？';
        this.isDialog = 1;
      },
      // 删除单品
      deleteCommodity(curStoreIndex, curSkuIndex, curSkuId) {
        this.showDialog = true;
        this.warningMsg = '确定要删除这个宝贝吗？';
        this.isDialog = 2;
        this.curStoreIndex = curStoreIndex;
        this.curSkuIndex = curSkuIndex;
        this.curSkuId = curSkuId;
      },
      // 获取对话框传递过来的信息（确认删除无效商品 / 确认删除有效商品）
      getDialogFeedback(type, params) {
        if (type === 1) {
          if (params) {
            this.invaildCommodities.splice(0, this.invaildCommodities.length);
            this.showDialog = false;
          } else {
            this.showDialog = false;
          }
        } else if (params) {
          api.goods_cart_edit({
            cart_id: this.curSkuId,
            num: 0,
          }).then((res) => {

          })
          this.vaildCommodities[this.curStoreIndex].goods.splice(this.curSkuIndex, 1);
          if (this.vaildCommodities[this.curStoreIndex].goods.length === 0) {
            this.vaildCommodities.splice([this.curStoreIndex], 1);
          }

          this.$emit('handleTotalNum', true);

          // 在删除一件商品时，如果这件商品已经被选中，那么selectList需要做出变化，相应的总价/总数量也要发生变化
          const result = this.matchSkuId(this.curSkuId);
          if (result !== -1) {
            this.selectList.splice(result, 1);
          }
          this.showDialog = false;
        } else {
          this.showDialog = false;
        }
      },
      // todo
      // 显示隐藏sku picker
      handleSkuSelect() {
        const bodyDOM = document.querySelector('body');
        bodyDOM.style.position = 'fixed';
        this.showSkuPicker = true;
      },
      // 获取Sku Picker反馈以关闭
      getSkuPickFeedback(params) {
        const bodyDOM = document.querySelector('body');
        if (params) {
          bodyDOM.style.position = 'relative';
          this.showSkuPicker = false;
        }
      },
      // 获取提交订单的反馈
      getSubmitOderFeedback() {
        if (this.selectList.length === 0) {
          this.showDialog = true;
          this.isDialog = 0;
          this.warningMsg = '您还没有选择宝贝哦～';
          this.closeDialog();
        } else {
          // this.showDialog = true;
          // this.isDialog = 0;
          // this.warningMsg = '家里有矿啊，你还真买啊？！';
          // this.closeDialog();
          let arr = this.selectList.map(v => v.skuId)
          console.log(arr, 'arr');

          let obj = {
            cart_ids: arr.join(),
            factory_id: this.curFactoryId,
            type: 'cart'
          }
          this.$router.push({
            path: `/mall/settlement`,
            name: "my-settlement",
            query: obj
          })
        }
      },
    },
  };
</script>

<style lang="scss">
  body {
    max-width: 540px;
    min-width: 320px;
  }

  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }

  /*
KISSY CSS Reset
理念：1. reset 的目的不是清除浏览器的默认样式，这仅是部分工作。清除和重置是紧密不可分的。
2. reset 的目的不是让默认样式在所有浏览器下一致，而是减少默认样式有可能带来的问题。
3. reset 期望提供一套普适通用的基础样式。但没有银弹，推荐根据具体需求，裁剪和修改后再使用。
特色：1. 适应中文；2. 基于最新主流浏览器。
维护：玉伯<lifesinger@gmail.com>, 正淳<ragecarrier@gmail.com>
 */

  /** 清除内外边距 **/
  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  hr,
  p,
  blockquote,
  /* structural elements 结构元素 */
  dl,
  dt,
  dd,
  ul,
  ol,
  li,
  /* list elements 列表元素 */
  pre,
  /* text formatting elements 文本格式元素 */
  form,
  fieldset,
  legend,
  button,
  input,
  textarea,
  /* form elements 表单元素 */
  th,
  td

  /* table elements 表格元素 */
    {
    margin: 0;
    padding: 0;
  }

  /** 设置默认字体 **/
  body,
  button,
  input,
  select,
  textarea

  /* for ie */
    {
    font: 12px/1.5 tahoma, arial, \5b8b\4f53, sans-serif;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-size: 100%;
  }

  address,
  cite,
  dfn,
  em,
  var {
    font-style: normal;
  }

  /* 将斜体扶正 */
  code,
  kbd,
  pre,
  samp {
    font-family: courier new, courier, monospace;
  }

  /* 统一等宽字体 */
  small {
    font-size: 12px;
  }

  /* 小于 12px 的中文很难阅读，让 small 正常化 */

  /** 重置列表元素 **/
  ul,
  ol {
    list-style: none;
  }

  /** 重置文本格式元素 **/
  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }


  /** 重置表单元素 **/
  legend {
    color: #000;
  }

  /* for ie6 */
  fieldset,
  img {
    border: 0;
  }

  /* img 搭车：让链接里的 img 无边框 */
  button,
  input,
  select,
  textarea {
    font-size: 100%;
  }

  /* 使得表单元素在 ie 下能继承字体大小 */
  /* 注：optgroup 无法扶正 */

  /** 重置表格元素 **/
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  /* 清除浮动 */
  .ks-clear:after,
  .clear:after {
    content: '\20';
    display: block;
    height: 0;
    clear: both;
  }

  .ks-clear,
  .clear {
    *zoom: 1;
  }

  a,
  body {
    color: #051b28;
  }

  button {
    outline: none;
    border: none;
  }

  .emphasize_color {
    color: $orange;
  }

  .select_radio {
    position: absolute;
    width: $font_size_22;
    height: $font_size_22;
    opacity: 0;
    visibility: hidden;
  }

  .radio_icon {
    margin-right: rem(8);
    font-size: $font_size_22 !important;
    font-weight: 500;
    color: $gray;
  }

  .price_wrapper {
    color: $orange;

    .large_text {
      font-size: $font_size_16;
    }

    .small_text {
      font-size: $font_size_14;
    }
  }

  .inline_block_wrapper {
    display: inline-block;
  }

  .flex_center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .border_1px_top {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      top: -50%;
      bottom: -50%;
      left: -50%;
      right: -50%;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-top: 1px solid $border_gray;
      z-index: -1;
    }
  }

  .border_1px_bottom {
    position: relative;

    &::after {
      position: absolute;
      content: '';
      top: -50%;
      bottom: -50%;
      left: -50%;
      right: -50%;
      -webkit-transform: scale(0.5);
      transform: scale(0.5);
      border-bottom: 1px solid $border_gray;
      z-index: -1;
    }
  }





  #item {
    position: relative;
    width: 100%;
    padding-bottom: env(safe-area-inset-bottom);
  }

  .store_list {
    margin-bottom: rem(100);
    padding-top: rem(12);
    background: $background_gray;

    .store_item {
      margin-top: rem(12);
      background: $white;

      &:first-child {
        margin-top: 0;
      }
    }
  }

  .icon-roundcheckfill {
    color: $orange !important;
  }

  .store_wrapper {
    display: flex;
    align-items: center;
    padding: rem(2) rem(10);

    .store_basic {
      display: flex;
      // justify-content: space-between;
      align-items: center;
      width: 50%;

      .store_type_logo {
        display: inline-block;
        width: $font_size_16;
        height: $font_size_16;
        background-repeat: no-repeat;
        background-size: contain;
      }

      .store_name {
        width: rem(100);
        height: rem(18);
        overflow: hidden;
      }

      .go_store_hp {
        font-size: $font_size_18;
        font-weight: bold;
      }
    }

    .store_attach {
      display: inline-flex;
      justify-content: flex-end;
      align-items: center;
      width: 50%;
      height: rem(20);

      .get_coupon {
        margin-right: rem(10);
        padding-right: rem(10);
        display: inline-block;
        border-right: 1px solid $border_gray;
      }
    }
  }

  .store_activity_wrapper {
    margin: rem(12) rem(50);

    .activity_title {
      margin-right: rem(8);
      padding: rem(1) rem(2);
      font-size: $font_size_12;
      color: $orange;
      border: 1px solid $orange;
      border-radius: 4px;
    }
  }

  .commodity_item {
    position: relative;
    overflow: hidden;
  }

  .commodity_item_container {
    display: flex;
    justify-content: space-around;
    margin-top: rem(8);
    padding: rem(4) rem(10);
    transition: transform 0.2s ease-in 0s;
    transform: translateX(0);
    will-change: transform;

    .radio_img_wrapper {
      display: flex;
      height: rem(98);
    }

    .commodity_img {
      width: rem(98);
      height: rem(98);
      min-width: rem(98);
      min-height: rem(98);
      object-fit: cover;
      margin-left: rem(10);
    }

    .commodity_detail_wrapper {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      min-height: rem(98);
      padding: 0 0 rem(6) rem(12);

      .sku_picker {
        position: relative;
        margin: rem(8) 0;
        padding: rem(2) rem(24) rem(2) rem(2);
        background: $_background_gray;
        color: $invaid_gray;
        border-radius: rem(4);
      }

      .warning {
        margin-top: rem(2);
        color: $orange;
      }

      .tmall_wuyou_logo_wrapper {
        margin-top: rem(8);

        img {
          display: block;
          height: rem(12);
        }
      }
    }

    .handle_count_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: rem(8);

      .handle_count {
        width: rem(60);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: rem(12);
        font-size: rem(14);

        .handle_count_btn {
          color: $gray;
          font-size: rem(14) !important;
        }
      }
    }
  }

  .commodity_title {
    width: 54vw;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .invaid_container {
    align-items: center;
  }

  .invaid_title_wrapper {
    display: flex;
    justify-content: space-between;
    padding: rem(16) rem(10) 0 rem(48);
    font-size: $font_size_14;

    .remove_invaid_commodity {
      color: $orange;
      border: 1px solid $orange;
      border-radius: rem(4);
      padding: rem(6);
    }
  }

  .invaild_item_container {
    align-items: center;
  }

  .invaid_logo {
    box-sizing: border-box;
    display: inline-block;
    width: rem(84);
    background: $invaid_logo_gray;
    color: $white;
    border-radius: rem(4);
    text-align: center;
    padding: 0 rem(1);
    line-height: 1.4;
  }

  .pre_hot {
    background: $pre_hot;
  }

  .invalid_img {
    margin-left: rem(8) !important;
  }

  .invaid_detail_wrapper {
    width: rem(602);
    padding: rem(6) 0 rem(6) rem(12);
  }

  .invaid_title {
    color: $invaid_gray;
  }

  .invaid_reason {
    margin: rem(8) 0;
  }

  .link_to_likely {
    display: inline-block;
    padding: rem(4) rem(8);
    font-size: $font_size_14;
    color: $orange;
    border: 1px solid $orange;
    border-radius: rem(4);
  }

  .delete_commodity {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0;
    top: 0;
    width: rem(60);
    height: 96%;
    background: $orange;
    font-size: $font_size_14;
    color: $white;
    text-align: center;
    line-height: rem(98);
    transition: transform 0.2s ease-in 0s;
    transform: translateX(rem(60));
    will-change: transform;
  }

  .shrink_commodity_item {
    transition: transform 0.2s ease-in 0s;
    transform: translateX(rem(-60));
    will-change: transform;
  }

  .show_delete {
    transition: transform 0.2s ease-in 0s;
    transform: translateX(0);
    will-change: transform;
  }

  .hidden_sku_selector {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 0;
    height: 100%;
    z-index: 9999;
  }
</style>