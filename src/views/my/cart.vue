<!-- home -->
<template>
  <div class="app-container page-">
    <Item
      :vaildCommodities='vaildCommodities'
      :invaildCommodities='invaildCommodities'
      :totalNum='totalNum'
      @handleTotalNum='handleTotalNum'
    >
    </Item>
  </div>
</template>

<script>
  import Item from '@/components/cartComps/item.vue';

  import globals from '@/utils/globals' // get token from cookie
  import utils from '@/utils/index' // get token from cookie
  import testdata from '@/utils/data.js' // get token from cookie

  import api from '@/api/api'
  import {
    Toast
  } from 'vant';

  export default {
    components: {
      Item
    },
    data() {
      return {
        vaildCommodities: [],
        invaildCommodities: [],
        totalNum: 0,
        invaildCommoditiesNum: 0,
      };
    },
    mounted() {
      this.getData();
    },
    watch: {
      // 当删除了失效商品后，购物车总数也要相应减少
      invaildCommodities() {
        if (this.invaildCommodities.length === 0) {
          this.totalNum = this.totalNum - this.invaildCommoditiesNum;
        }
      },
    },
    methods: {
      async getData() {
        // try {
        //   // const res = await fetch('../../utils/data.json');
        //   const data = testdata
        //   // const data = await res.json();
        //   this.vaildCommodities = data.vaild_commodities;
        //   this.invaildCommodities = data.invaild_commodities;
        //   for (let i = 0, l = this.vaildCommodities.length; i < l; i += 1) {
        //     this.totalNum += this.vaildCommodities[i].commodity_list.length;
        //   }
        //   this.totalNum += this.invaildCommodities.length;
        //   this.invaildCommoditiesNum += this.invaildCommodities.length;
        // } catch (e) {
        //   console.log(new Error(e));
        // }
        api.goods_cart_list({}).then((res) => {
          this.totalNum = res.data.total
          // test
          this.vaildCommodities = res.data.list
          // let store1 = utils.jsonClone(res.data.list[0])
          // let goods1 = utils.jsonClone(res.data.list[0].goods[0])
          // store1.factory_id = 99
          // goods1.goods_share_id = 66
          // this.vaildCommodities = this.vaildCommodities.concat(store1)
          // this.vaildCommodities[0].goods = this.vaildCommodities[0].goods.concat(goods1)
          // this.totalNum = 3

        })
      },
      handleTotalNum(params) {
        if (params) {
          this.totalNum -= 1;
        }
      },
      
    },
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container {}
</style>