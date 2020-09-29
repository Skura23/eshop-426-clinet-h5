import Vue from 'vue'
import Router from 'vue-router'

const layout = import('@/layout');

Vue.use(Router)
export const router = [{
    path: '/',
    name: 'mall',
    component: () => import('@/views/mall'),
    meta: {
      title: '商城',
      keepAlive: false,
      noTopbar: true
    }
  },
  {
    path: '/home/chat',
    name: 'index',
    component: () => import('@/views/home/chat'), // 路由懒加载
    meta: {
      title: '聊天', // 页面标题
      keepAlive: false, // keep-alive 标识
    }
  },
  {
    path: '/card',
    name: 'card',
    component: () => import('@/views/card'),
    meta: {
      title: '名片',
      keepAlive: false,
      noTopbar: true
    }
  },
  {
    path: '/card/qr',
    name: 'card-qr',
    component: () => import('@/views/card/qr'),
    meta: {
      title: '名片码',
      keepAlive: false,
    }
  },
  {
    path: '/card/chat',
    name: 'card-chat',
    component: () => import('@/views/card/chat'),
    meta: {
      title: '名片',
      keepAlive: false,
      noTopbar: false
    }
  },
  {
    path: '/card/chat2',
    name: 'card-chat',
    component: () => import('@/views/card/chat2'),
    meta: {
      title: '名片',
      keepAlive: false,
      noTopbar: false
    }
  },
  {
    path: '/card/chat-list',
    name: 'card-chat-list',
    component: () => import('@/views/card/chat-list'),
    meta: {
      title: '名片',
      keepAlive: false,
      noTopbar: false
    }
  },
  {
    path: '/card/generate-post',
    name: 'card-generate-post',
    component: () => import('@/views/card/generate-post'),
    meta: {
      title: '生成名片海报',
      keepAlive: false,
      noTopbar: false
    }
  },
  {
    path: '/card/card-edit',
    name: 'card-card-edit',
    component: () => import('@/views/card/card-edit'),
    meta: {
      title: '名片编辑',
      keepAlive: false,
      noTopbar: false
    }
  },


  {
    path: '/mall',
    name: 'mall',
    component: () => import('@/views/mall'),
    meta: {
      title: '商城',
      keepAlive: false,
      noTopbar: true
    }
  },
  {
    path: '/mall/service',
    name: 'mall-service',
    component: () => import('@/views/mall/service'),
    meta: {
      title: '服务专区',
      keepAlive: false,
    }
  },
  {
    path: '/mall/goodslist',
    name: 'mall-goodslist',
    component: () => import('@/views/mall/goodslist'),
    meta: {
      title: '商品列表',
      keepAlive: false,
    }
  },
  {
    path: '/mall/detail',
    name: 'mall-detail',
    component: () => import('@/views/mall/detail'),
    meta: {
      title: '商品详情',
      keepAlive: false,
    }
  },
  {
    path: '/mall/bargain',
    name: 'mall-bargain',
    component: () => import('@/views/mall/bargain'),
    meta: {
      title: '砍价',
      keepAlive: false,
    }
  },
  {
    path: '/mall/bargain-detail',
    name: 'mall-bargain-detail',
    component: () => import('@/views/mall/bargain-detail'),
    meta: {
      title: '砍价详情',
      keepAlive: false,
    }
  },
  {
    path: '/mall/seckill',
    name: 'mall-seckill',
    component: () => import('@/views/mall/seckill'),
    meta: {
      title: '秒杀',
      keepAlive: false,
    }
  },
  {
    path: '/mall/coupon',
    name: 'mall-coupon',
    component: () => import('@/views/mall/coupon'),
    meta: {
      title: '领取优惠券',
      keepAlive: false,
    }
  },
  
  {
    path: '/mall/union',
    name: 'mall-union',
    component: () => import('@/views/mall/union'),
    meta: {
      title: '联盟专区',
      keepAlive: false,
    }
  },
  {
    path: '/client',
    name: 'client',
    component: () => import('@/views/client'),
    meta: {
      title: '客户',
      keepAlive: false,
      noTopbar: true
    }
  },
  {
    path: '/client/detail',
    name: 'client-detail',
    component: () => import('@/views/client/detail'),
    meta: {
      title: '客户信息',
      keepAlive: false,
    }
  },
  
  {
    path: '/find',
    name: 'find',
    component: () => import('@/views/find'),
    meta: {
      title: '发现',
      keepAlive: false,
      noTopbar: true

    }
  },
  {
    path: '/my',
    name: 'my',
    component: () => import('@/views/my'),
    meta: {
      title: '我的',
      keepAlive: false,
      noTopbar: true
    }
  },
  {
    path: '/my/cash',
    name: 'my',
    component: () => import('@/views/my/cash'),
    meta: {
      title: '提现',
      keepAlive: false,
    }
  },
  {
    path: '/my/goods',
    name: 'my',
    component: () => import('@/views/my/goods'),
    meta: {
      title: '推广商品',
      keepAlive: false,
    }
  },
  {
    path: '/my/checkin',
    name: 'my-checkin',
    component: () => import('@/views/my/checkin'),
    meta: {
      title: '积分签到',
      keepAlive: false,
    }
  },
  {
    path: '/my/address',
    name: 'my-address',
    component: () => import('@/views/my/address'),
    meta: {
      title: '收货地址',
      keepAlive: false,
    }
  },
  {
    path: '/my/address-edit',
    name: 'my-address-edit',
    component: () => import('@/views/my/address-edit'),
    meta: {
      title: '地址编辑',
      keepAlive: false,
    }
  },
  {
    path: '/my/bussi-center',
    name: 'my-bussi-center',
    component: () => import('@/views/my/bussi-center'),
    meta: {
      title: '创业中心',
      keepAlive: false,
    }
  },
  {
    path: '/my/orders',
    name: 'my-orders',
    component: () => import('@/views/my/orders'),
    meta: {
      title: '订单列表',
      keepAlive: false,
    }
  },
  {
    path: '/my/refund-orders',
    name: 'my-refund-orders',
    component: () => import('@/views/my/refund-orders'),
    meta: {
      title: '退款/售后',
      keepAlive: false,
    }
  },
  {
    path: '/my/cart',
    name: 'my-cart',
    component: () => import('@/views/my/cart'),
    meta: {
      title: '购物车',
      keepAlive: false,
    }
  },
  {
    path: '/my/settlement',
    name: 'my-settlement',
    component: () => import('@/views/my/settlement'),
    meta: {
      title: '结算',
      keepAlive: false,
    }
  },
  {
    path: '/my/book',
    name: 'my-book',
    component: () => import('@/views/my/book'),
    meta: {
      title: '收藏商品',
      keepAlive: false,
    }
  },
  {
    path: '/my/service',
    name: 'my-service',
    component: () => import('@/views/my/service'),
    meta: {
      title: '售后服务',
      keepAlive: false,
    }
  },
  {
    path: '/my/bargain',
    name: 'my-bargain',
    component: () => import('@/views/my/bargain'),
    meta: {
      title: '砍价',
      keepAlive: false,
    }
  },
  {
    path: '/my/seckill',
    name: 'my-seckill',
    component: () => import('@/views/my/seckill'),
    meta: {
      title: '秒杀',
      keepAlive: false,
    }
  },
  {
    path: '/my/group',
    name: 'my-group',
    component: () => import('@/views/my/group'),
    meta: {
      title: '拼团',
      keepAlive: false,
    }
  },
  {
    path: '/my/coupon',
    name: 'my-coupon',
    component: () => import('@/views/my/coupon'),
    meta: {
      title: '优惠券',
      keepAlive: false,
    }
  },{
    path: '/my/refund',
    name: 'my-refund',
    component: () => import('@/views/my/refund'),
    meta: {
      title: '申请退款',
      keepAlive: false,
    }
  },{
    path: '/my/surplus-detail',
    name: 'my-surplus-detail',
    component: () => import('@/views/my/surplus-detail'),
    meta: {
      title: '余额明细',
      keepAlive: false,
    }
  },
  {
    path: '/my/cashout-list',
    name: 'my-cashout-list',
    component: () => import('@/views/my/cashout-list'),
    meta: {
      title: '提现历史',
      keepAlive: false,
    }
  },{
    path: '/my/cashout-detail',
    name: 'my-cashout-detail',
    component: () => import('@/views/my/cashout-detail'),
    meta: {
      title: '提现详情',
      keepAlive: false,
    }
  },
  {
    path: '/my/cashout-detail',
    name: 'my-cashout-detail',
    component: () => import('@/views/my/cashout-detail'),
    meta: {
      title: '提现详情',
      keepAlive: false,
    }
  },



  {
    path: '/credit/index',
    name: 'credit-index',
    component: () => import('@/views/credit/index'),
    meta: {
      title: '积分商城',
      keepAlive: false,
    }
  },
  {
    path: '/credit/index',
    name: 'credit-index',
    component: () => import('@/views/credit/index'),
    meta: {
      title: '积分商城',
      keepAlive: false,
    }
  },
  {
    path: '/credit/ex-list',
    name: 'credit-ex-list',
    component: () => import('@/views/credit/ex-list'),
    meta: {
      title: '兑换记录',
      keepAlive: false,
    }
  },
  {
    path: '/credit/credit-list',
    name: 'credit-credit-list',
    component: () => import('@/views/credit/credit-list'),
    meta: {
      title: '积分',
      keepAlive: false,
    }
  },


  {
    path: '/others/shopapply',
    name: 'others-shopapply',
    component: () => import('@/views/others/shopapply'),
    meta: {
      title: '店铺申请',
      keepAlive: false,
    }
  },
  
  


  {
    path: '/homepage',
    name: 'homepage',
    component: () => import('@/views/homepage'),
    meta: {
      title: '官网',
      keepAlive: false,
      noTopbar: true
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login'),
    meta: {
      title: '登录注册',
      keepAlive: true,
      noTopbar: true

    }
  },
  {
    path: '/login/factory-list',
    name: 'factory-list',
    component: () => import('@/views/login/factory-list'),
    meta: {
      title: '店铺列表',
      keepAlive: false,
      noTopbar: true

    }
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 如果你是 history模式 需要配置vue.config.js publicPath
    // base: '/app/',
    scrollBehavior: () => ({
      y: 0
    }),
    routes: router
  })

export default createRouter()