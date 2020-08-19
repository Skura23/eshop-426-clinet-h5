<!-- home -->
<template>
  <div class="app-container page-address">
    <van-address-list
      v-model="chosenAddressId"
      :list="localList"
      disabled-text=""
      :switchable="false"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
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
        chosenAddressId: '1',
        localList: [],
        // disabledList: [{
        //   id: '3',
        //   name: '王五',
        //   tel: '1320000000',
        //   address: '浙江省杭州市滨江区江南大道 15 号',
        // }, ],
      };

    },

    computed: {},
    created() {
      api.member_receipt_address({}).then((res) => {
        this.localList = utils.jsonClone(res.data.list)
        this.reBuildList()
      })
    },
    mounted() {},

    methods: {
      reBuildList() {
        let arr = []
        for (let i = 0; i < this.localList.length; i++) {
          let elem = this.localList[i];
          let obj=utils.renameKeyName(elem, ['receiver_id', 'receipt_name',
            'receipt_phone',
            'receipt_address', 'is_default'
          ], [
            'id',
            'name',
            'tel',
            'address',
            'isDefault'
          ])
          obj.isDefault = obj.isDefault==1 ? true:false
          arr.push(obj)
        }
        this.localList = arr
      },
      onAdd() {
        // Toast('新增地址');
        this.$router.push('/my/address-edit')
      },
      onEdit(item, index) {
        // Toast('编辑地址:' + index);
        this.$router.push(`/my/address-edit?id=${item.id}`)
      },
    }
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-address {}
</style>