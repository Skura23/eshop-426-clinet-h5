<template>
  <div
    class="app"
    id="app"
  >
    <TopBar
      :title="title"
      :name="$route.name"
      v-show="!$route.meta.noTopbar"
    ></TopBar>
    <!-- <div
      class=""
      @click="test"
    >tap</div> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
    <!-- tabbar -->
    <TabBar></TabBar>


  </div>
</template>
<script>
  import Cookies from 'js-cookie'

  import utils from '@/utils/index' // get token from cookie
  import {
    getToken,
    setToken
  } from '@/utils/auth' // get token from cookie
  import globals from '@/utils/globals' // get token from cookie

  import TabBar from '@/components/TabBar'
  import TopBar from '@/components/TopBar'
  import api from '@/api/api'
  console.log(api, 'api');
  export default {
    name: 'App',
    components: {
      TabBar,
      TopBar
    },
    data() {
      return {
        title: ''
      }
    },
    watch: {
      // '$route.meta.title'(newVal, oldVal) {
      //   // if (newVal == 0) {
      //   //   clearInterval(this.timer);
      //   //   this.f_canSendCode = true;
      //   //   this.codeTime = 60
      //   // }
      //   this.title = newVal
      //   console.log(this.title, 'this.title');
      //   setTimeout(() => {
      //     this.$route.meta.title = 33
      //     console.log(this.$route.meta.title, '$route.meta.title');
      //   }, 1500);
      // },
    },
    computed: {
      // title(){
      //   console.log(this.$route.meta.title, '$route.meta.title');
      //   return this.$route.meta.title
      // }
    },
    mounted() {
      // console.log('app mounted');
      // 监听名片聊天里导致的头部title变化
      setInterval(() => {
        console.log(this.$route.meta.title);
        this.title = this.$route.meta.title
      }, 1000);
    },
    methods: {
      // test() {
      //   this.$router.go(0)
      // },
    },

    created() {

      // 设置全局分享
      this.$wxShare.wxShowMenu();

      // 如果地址栏带code参数则加上#后重新跳转

      // api.authorization({
      //   redirect_uri: '123',
      //   dealer_id: '1'
      // }).then((res) => {

      // })

      // {
      //   "apiName": "login_by_open_id",
      //   "v": "tms_login",
      //   "info": {
      //     "open_id": "oeCN0vwjvKR1EfbdnFOuSq-_8wCU",
      //     "dealer_id": 1,
      //     "factory_id": 1
      //   }
      // }


      // api.wei_xin_check_login({
      //   "root_factory_id": 1
      // }).then((res) => {
      //   console.log(res, 'login_by_open_id');
      //   // globals.userInfo = res.data.response
      //   if (res.data.shop_code == 9999) {
      //     setToken(res.data.response.token)
      //   }else if (res.data.shop_code == 3100) {
      //     // 去登录
      //   }
      // })


      // setToken('a350e12763c943bd43af404cd330d4f6')

      let loginProcess = () => {
        let href = window.location.href;
        if (href.includes("code=")) {
          let arr = href.split('?')

          // 如果无#, 重新跳转到带#地址
          if (!arr[0].includes("#")) {
            arr[0] = arr[0] + '#'
            let pathname = location.pathname.replace('/h5/h5', '/h5/#')
            let url = location.origin + pathname + location.search

            window.location.href = url
          } else {
            // 如果有#, 则获取code

            let obj = utils.param2Obj(href)
            console.log(obj, 'href');
            api.wei_xin_check_login({
              root_factory_id: 1,
              wei_xin_code: obj.code,
              referrer_id: Cookies.get('eshop-426-client-h5_authorization-mid') || obj.mid
            }).then((res) => {
              if (res.data.shop_code == 3100) {
                console.log('this.$router.replace to login');
                this.$router.replace(`/login?open_id=${res.data.open_id}`)
              } else {
                // 登陆成功
                setToken(res.data.response.token)
                console.log(obj, res.data, 'wei_xin_check_login');
                // alert(JSON.stringify(res.data))
                Cookies.set('eshop-426-client-h5_userinfo', {
                  ...res.data.response,
                  open_id: res.data.response.open_id
                })
                console.log(Cookies.get('eshop-426-client-h5_authorization-mid'),
                  "Cookies.get('eshop-426-client-h5_authorization-mid')");
                Cookies.get('eshop-426-client-h5_authorization-mid') && Cookies.remove(
                  'eshop-426-client-h5_authorization-mid')
                let url = Cookies.get('eshop-426-client-h5_authorization-url')
                if (url) {
                  Cookies.remove('eshop-426-client-h5_authorization-url')
                  window.location.href = url
                }

                this.$wxShare.wxShowMenu();
                // 获取token后刷新页面, 否则会出现其他接口无token异步执行的问题
                this.$router.go(0)
              }

            })
          }

        } else {
          let mid = utils.param2Obj(href).mid
          api.authorization({
            // redirect_uri: '/mall',
            redirect_uri: location.href.replace(location.origin, ''),
            root_factory_id: 1,
          }).then((res) => {
            let url = res.data.url + `&mid=${mid}`
            // mid分两种情况, 一种走authorization, 一种不走, 前者下, 先保存mid到本地, 再在wei_xin_check_login里移除
            // 保存推荐人id到本地, 解决authorization后跳转mid丢失的问题
            Cookies.set('eshop-426-client-h5_authorization-mid', mid)
            Cookies.set('eshop-426-client-h5_authorization-url', location.href)
            console.log(url, 'authorization', 1);
            // url = url.replace('crm.metujia.com', '127.0.0.1:9020')
            window.location.href = url
          })
        }
      }

      if (getToken()) {
        api.shop_goods({}).then((res) => {
          if (res.code == 9998) {
            loginProcess()
          }
        })
      } else {
        loginProcess()
      }



    },
  }
</script>
<style lang="scss"></style>