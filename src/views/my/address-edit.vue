<!-- home -->
<template>
  <div class="app-container page-address">
    <van-address-edit
      :area-list="areaList"
      :address-info="addressInfo"
      show-delete
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
    />
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
        addressInfo: {},
        areaList,
        searchResult: [],
        id: '',
        type: ''
      };
    },
    methods: {
      toDisplayData(b_data) {
        let data = {
          id: b_data.receiver_id,
          name: b_data.receipt_name,
          tel: b_data.receipt_phone,
          isDefault: b_data.is_default == 1,
          province: b_data.province_name,
          city: b_data.city_name,
          county: b_data.area_name,
          areaCode: b_data.area,
          addressDetail: b_data.area_detail,
        }
        this.addressInfo = data
      },
      onSave(data) {
        console.log(data, 'onSave');
        let provId = Object.keys(this.areaList.province_list).filter(x => this.areaList.province_list[x] == data
          .province)[0]
        let cityId = Object.keys(this.areaList.city_list).filter(x => this.areaList.city_list[x] == data.city)[0]
        let s_data = {
          receipt_name: data.name,
          receipt_phone: data.tel,
          is_default: data.isDefault?'1':'2',
          province_id: provId,
          city_id: cityId,
          area_id: data.areaCode,
          area_detail: data.addressDetail,
        }
        if (this.type == 'edit') {
          api.member_receipt_address_edit({
            ...s_data,
            receiver_id: this.id
          }).then((res) => {
            if (res.code == 9999) {
              Toast({
                message: '编辑成功!',
                onClose:()=> {
                  this.$router.back()
                },
              })
            } else {
              Toast('编辑失败')
            }
          })
        } else {
          api.member_receipt_address_create(s_data).then((res) => {
            if (res.code == 9999) {
              Toast({
                message: '添加成功!',
                onClose: ()=>{
                  this.$router.back()
                },
              })
            }
          })
        }
      },
      onDelete() {
        Dialog.confirm({
            title: '提示',
            message: '确定删除地址?',
          })
          .then(() => {
            // on confirm
          })
          .catch(() => {
            // on cancel
          });
        // Toast('delete');
      },
      // onChangeDetail(val) {
      //   if (val) {
      //     this.searchResult = [{
      //       name: '黄龙万科中心',
      //       address: '杭州市西湖区',
      //     }, ];
      //   } else {
      //     this.searchResult = [];
      //   }
      // }

    },

    computed: {},
    created() {
      this.id = this.$route.query.id
      if (this.id) {
        this.type = 'edit'
      }
      api.member_receipt_address_detail({
        receiver_id: this.id
      }).then((res) => {
        this.toDisplayData(res.data)
      })
    },
    mounted() {},
  }
</script>


<style
  lang="scss"
  scoped
>
  .app-container.page-address {}
</style>