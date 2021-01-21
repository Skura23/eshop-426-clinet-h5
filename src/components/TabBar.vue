<template>
  <div>
    <div
      class=""
      v-if="$store.getters.tabType=='normal'"
    >
      <van-tabbar
        fixed
        route
        z-index="3"
        active-color="#ff7728"
      >
        <van-tabbar-item
          to="/mall"
          icon="shop-o"
        >
          商城
          <template #icon="props">
      <img :src="props.active ? require('@/assets/imgs/129.png') : require('@/assets/imgs/128.png')" />
    </template>
        </van-tabbar-item>
        <van-tabbar-item
          to="/card"
          icon="idcard"
        >
          名片
          <template #icon="props">
      <img :src="props.active ? require('@/assets/imgs/131.png') : require('@/assets/imgs/130.png')" />
    </template>
        </van-tabbar-item>
        <van-tabbar-item
          to="/find"
          icon="eye-o"
        >
          发现
          <template #icon="props">
      <img :src="props.active ? require('@/assets/imgs/133.png') : require('@/assets/imgs/132.png')" />
    </template>
        </van-tabbar-item>
        <van-tabbar-item
          to="/homepage2"
          icon="browsing-history-o"
        >
          官网
          <template #icon="props">
      <img :src="props.active ? require('@/assets/imgs/135.png') : require('@/assets/imgs/134.png')" />
    </template>
        </van-tabbar-item>
        <van-tabbar-item
          to="/my"
          icon="user-o"
        >
          我的
          <template #icon="props">
      <img :src="props.active ? require('@/assets/imgs/137.png') : require('@/assets/imgs/136.png')" />
    </template>
        </van-tabbar-item>
      </van-tabbar>
    </div>

    <div
      class=""
      v-if="$store.getters.tabType=='credit'"
    >
      <van-tabbar
        fixed
        route
        z-index="3"
        active-color="#ff7728"

      >
        <van-tabbar-item
          to="/credit/index"
          icon="shop-o"
        >
          积分商城
        </van-tabbar-item>
        <van-tabbar-item
          to="/credit/ex-list"
          icon="orders-o"
        >
          兑换记录
        </van-tabbar-item>
        <van-tabbar-item
          to="/credit/credit-list"
          icon="balance-list-o"
        >
          积分明细
        </van-tabbar-item>
      </van-tabbar>
    </div>
    <!--  <van-tabbar fixed v-model="active" @change="onChange">
      <van-tabbar-item  to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item  to="/about" icon="user-o">关于我</van-tabbar-item>
    </van-tabbar> -->
  </div>
</template>

<script>
  export default {
    name: 'TabBar',
    data() {
      return {
        active: 0,
        // type: this.
      }
    },
    created() {
      console.log(this.$store.getters, 'path');
    },

    methods: {

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h3 {
    margin: 40px 0 0;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>