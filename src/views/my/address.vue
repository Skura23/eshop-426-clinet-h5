<!-- home -->
<template>
  <div class="app-container page-address">
    <van-address-list
      v-model="chosenAddressId"
      :list="localList"
      disabled-text=""
      :switchable="true"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
      @select="onSelect"
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
        pageIsfrom: ''
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
      this.query = this.$route.query

      api.member_receipt_address({}).then((res) => {
        this.localList = utils.jsonClone(res.data.list)
        this.reBuildList()
      })
    },
    mounted() {
      console.log(this.$route, this.$router, 'router');
    },

    beforeRouteEnter(to, from, next) {
      // this.pageIsfrom = from;
      console.log(this, from, 'beforeRouteEnter');
      next((vm) => {
        vm.pageIsfrom = from.name
      })
    },



    methods: {
      onSelect(item, idx) {
        // if (this.pageIsfrom == 'my-settlement') {
        //   this.$store.commit('setCurAddr', {
        //     name: item.address,
        //     id: item.id,
        //   })
        //   this.$router.back()
        // }
        this.$store.commit('setCurAddr', {
          name: item.address,
          id: item.id,
        })
        this.$router.push({
          path: '/my/settlement',
          query: this.query
        })


      },
      reBuildList() {
        let arr = []
        for (let i = 0; i < this.localList.length; i++) {
          let elem = this.localList[i];
          let obj = utils.renameKeyName(elem, ['receiver_id', 'receipt_name',
            'receipt_phone',
            'receipt_address', 'is_default'
          ], [
            'id',
            'name',
            'tel',
            'address',
            'isDefault'
          ])
          obj.isDefault = obj.isDefault == 1 ? true : false
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