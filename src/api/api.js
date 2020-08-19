import request from '@/utils/request'

var api = {}
// 通过遍历生成接口
// 调用方法: api.services_staff_edit
let apiList = [
  // 服务人员 相关
  "services_staff_edit|services",
  // 优惠券
  "coupon_create|coupon",
  "coupon_list|coupon",
  "coupon_detail|coupon",
  "coupon_delete|coupon",
  "coupon_change_status|coupon",
  // 积分商城 商品
  "integral_goods_create|integral",
  "integral_goods_list|integral",
  "integral_goods_detail|integral",
  "integral_goods_edit|integral",
  "integral_goods_put_away|integral",
  // 砍价商品
  "bargain_goods_create|bargain",
  "bargain_goods_list|bargain",
  "bargain_goods_edit|bargain",
  "bargain_goods_detail|bargain",
  "bargain_goods_put_away|bargain",
  // 秒杀活动
  "seckill_create|seckill",
  "seckill_list|seckill",
  "seckill_edit|seckill",
  "seckill_detail|seckill",
  "seckill_goods_create|seckill",
  "seckill_goods_edit|seckill",
  "seckill_goods_list|seckill",
  "seckill_goods_detail|seckill",
  "seckill_goods_put_away|seckill",
  "seckill_delete|seckill",


  // 登录相关
  "authorization",
  "login_by_open_id",

  // 客户相关
  "member_referrer_list|member",
  "member_detail|member",
  "member_dealer_log|member",
  "member_edit|member",
  // 发现相关
  // "case_class_list|cases",
  // "find_cases_list|cases",
  // "auth_cases_like|cases",
  // "auth_case_comment|cases",
  // "cases_comment_list|cases",
  // 案例相关
  "cases_create|cases",
  "cases_list|cases",
  "cases_detail|cases",
  "cases_edit|cases",
  "cases_change|cases",
  // 板川商品
  "factory_basic_goods_list|goods",
  "factory_basic_goods_putaway|goods",
  "factory_goods_detail|goods",
  "factory_basic_goods_price_update|goods",
  // 订单
  "order_list|order",
  // 企业管理
  "h5_this_auth_list|factory",
  "h5_auth_detail|factory",
  "group_list|factory",
  "h5_auth_edit|factory",
  // 自营商品
  "h5_use_class_list|goods",
  "factory_store_goods_list|goods",
  "store_goods_create|goods",
  "goods_store_edit|goods",
  "factory_store_goods_putaway|goods",
  "cascader_cache_class_list|goods",
  // 预付订单
  "prepay_order_list|order",


  // 以下为client h5接口
  "authorization",
  "wei_xin_check_login",
  "register",
  "factory_list",
  "factory_register",

  "shop_goods",
  "shop_goods_class",
  "league_goods_class",
  "league_goods",
  "shop_goods_detail|shop",
  "services_staff_list|shop",
  "get_goods_item_price|shop",
  // 优惠券
  "coupon_list|member",
  "member_coupon_create|member",
  // 订单
  "order_group_check_create|shop",
  "order_create|shop",
  "order_check_create|shop",
  "order_pay|shop",
  "member_order_list|member",
  // 砍价
  "bargain_goods_list|marketing",
  "bargain_create|marketing",
  "going_bargain|marketing",
  "bargain_detail|marketing",
  "bargain|marketing",
  "bargain_order_create|marketing",
  "bargain_order_list|marketing",
  // 秒杀
  "seckill_goods_detail|marketing",
  "going_seckill|marketing",
  "seckill_order_create|marketing",
  // 优惠券
  "member_coupon_create|member",
  "coupon_list|member",
  "member_coupon_list|member",
  // 我的
  "seckill_order_list|member",
  // 会员地址
  "member_receipt_address_create|member",
  "member_receipt_address|member",
  "member_receipt_address_edit|member",
  "member_receipt_address_detail|member",
  "get_member_default_receipt_address|member",
  // 积分
  "welfare|member",
  "integral_sign|member",
  "integral_detail|member",
  "integral_log|member",
  // 名片
  "shop_card_detail|card",
  "auth_like|card",
  "tag_like|card",
  "share_card_detail|card",
  "create_image|card",
  //发现
  "cases_class_list|shop",
  "find_cases_list|shop",
  "auth_cases_like|shop",
  "auth_case_comment|shop",
  "cases_comment_list|shop",

  // 购物车
  "goods_cart_list|shop",
  "goods_cart_create|shop",
  "goods_cart_edit|shop",
  "goods_cart_clear|shop",
  "goods_cart_check|shop",
  "goods_cart_order_create|shop",
  "goods_cart_add|shop",
  // 聊天相关
  "member_friend_log|member",
  "member_friend_log_create|member",
  "member_friend_red|member",
  // 积分商城
  "integral_goods_class|shop",
  "integral_goods_list|shop",
  "integral_goods_detail|shop",
  "integral_order_check|shop",
  "integral_order_create|shop",
  "member_integral_order_list|member",


  "group_order_list|shop",
  "seckill_order_list|member",
  "goods_collect_create|shop",
  "goods_collect_list|shop",
  "member_request_create|member",
  "member_center|member",
  "factory_detail|shop",
  "order_group_create|shop",
  "join_group_order_list|shop",
  "factory_request|member",
]

// 调用方法: api["class_create|integral"]
let apiList2 = [
  // 积分商城 分类
  "class_create|integral",
  "class_edit|integral",
  "class_delete|integral",
  "class_list|integral",



]

apiList.forEach(element => {
  let name = element.split('|')[0]
  api[name] = function name(data) {
    return request({
      url: '',
      method: 'post',
      data: {
        "apiName": element,
        ...data
      }
    })
  }
});

apiList2.forEach(element => {
  let name = element
  api[name] = function name(data) {
    return request({
      url: '',
      method: 'post',
      data: {
        "apiName": element,
        ...data
      }
    })
  }
});
export default api