import router from './router'
import store from './store'
import wxShare from '@/utils/wx_share.js'

// import { Message } from 'element-ui'
import {
  getToken
} from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {
  // start progress bar
  // NProgress.start()

  // set page title
  // document.title = getPageTitle(to.meta.title)

  // determine whether the user has logged in
  const hasToken = getToken()



  console.log(to.path, 'to.path');


  if (to.path.includes('/credit')) {
    store.commit('setTabType', 'credit')
  } else {
    store.commit('setTabType', 'normal')
  }

  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({
        path: '/'
      })
      // NProgress.done()
      // next()
    } else {

      // const hasGetUserInfo = store.getters.name
      // if (hasGetUserInfo) {
      //   next()
      // } else {
      //   try {
      //     // get user info
      //     await store.dispatch('user/getInfo')

      //     next()
      //   } catch (error) {
      //     // remove token and go to login page to re-login
      //     await store.dispatch('user/resetToken')
      //     Message.error(error || 'Has Error')
      //     next(`/login?redirect=${to.path}`)
      //     NProgress.done()
      //   }
      // }

      next()
      // NProgress.done()
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      // next(`/login?redirect=${to.path}`)
      next()


      // NProgress.done()
    }
  }


})

router.afterEach((to, from) => {
  // finish progress bar
  // NProgress.done()
  // detail页不走全局, 在detail页内自定义
  console.log(to, 'afterEach');
  if (!(to.path == '/mall/detail')) {
    setTimeout(() => {
      console.log(location.href, 'location.href');
      // 设置全局分享
      wxShare.wxShowMenu();
    }, 200);
  }

})