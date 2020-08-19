<template>
  <div class="dialogue">
    <section class="first-page hide">
      <p>过年了，避免不了的家族聚会中，久未见面的七大姑八大姨又出现了，想要和你“唠唠嗑”</p>
      <button>点击继续</button>
    </section>
    <section class="chat-page show-selector">
      <!-- <header>
        <div class="nav-back">
          <i class="icon icon-back"></i>
          <span>微信</span>
        </div>
        <h1>小肥羊</h1>
        <div class="nav-person">
          <i class="icon icon-person"></i>
        </div>
      </header> -->
      <main>
        <div class="message-list">
          <div class="message-item message-item--left">
            <img
              class="avatar"
              :src="require('@/assets/imgs/78.png')"
              alt="头像"
            >
            <div class="message-bubble">你住的 巷子里 我租了一间公寓</div>
          </div>
          <div class="message-item message-item--left">
            <img
              class="avatar"
              :src="require('@/assets/imgs/78.png')"
              alt="头像"
            >
            <div class="message-bubble">为了想与你不期而遇</div>
          </div>
          <div class="message-item message-item--right">
            <img
              class="avatar"
              :src="require('@/assets/imgs/78.png')"
              alt="头像"
            >
            <div class="message-bubble">高中三年 我为什么 为什么不好好读书 没考上跟你一样的大学</div>
          </div>
        </div>
      </main>
      <footer>
        <i class="icon icon-voice"></i>
        <input
          type="text"
          class="text-input"
        >
        <i class="icon icon-face"></i>
        <i class="icon icon-plus"></i>
      </footer>
      <!-- <div class="message-select">
            <div class="message-item message-item--right js-to-select" data-score="3">
                <img class="avatar" :src="require('@/assets/imgs/78.png')" alt="头像">
                <div class="message-bubble">我找了份工作</div>
            </div>
            <div class="message-item message-item--right js-to-select" data-score="-2">
                <img class="avatar" :src="require('@/assets/imgs/78.png')" alt="头像">
                <div class="message-bubble">离你宿舍很近</div>
            </div>
            <div class="message-item message-item--right js-to-select" data-score="1">
                <img class="avatar" :src="require('@/assets/imgs/78.png')" alt="头像">
                <div class="message-bubble">当我开始学会做蛋饼</div>
            </div>
        </div> -->
    </section>
    <div class="cover-tips hide">
      <div class="mask"></div>
      <div class="tips-container">
        <p class="tips-text">你真棒</p>
        <div class="tips-icons">
          <i class="icon icon-replay"></i>
          <i class="icon icon-share"></i>
        </div>
      </div>
    </div>
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

      }

    },

    computed: {},
    created() {

    },
    mounted() {},

    methods: {}
  }
</script>



<style lang="scss">
  .first-page {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 18px;
    z-index: 100;

    button {
      border: 1px solid #ccc;
      padding: 6px 20px;
      border-radius: 5px;
      margin-top: 30px;
      background: transparent;
      margin-bottom: 50px;
    }
  }

  .first-page-text {
    padding: 0 20px;
  }

  header {
    height: 44px;
    background: #2b2b2b;
    color: #fff;
    vertical-align: middle;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .icon {
    display: inline-block;
    background-repeat: no-repeat;
    background-size: 100%;
  }

  header {
    .nav-back {
      height: 100%;
      line-height: 44px;
      position: relative;
      width: 66px;
      font-size: 16px;
      font-weight: lighter;
      display: flex;
      align-items: center;
      padding-left: 8px;
    }

    .icon-back {
      height: 20px;
      width: 20px;
      background-image: url('../../assets/icon/back.svg');
    }

    h1 {
      font-size: 18px;
      position: absolute;
      left: 50%;
      transform: translate(-50%, 0);
    }

    .nav-person {
      padding-right: 8px;
    }

    .icon-person {
      width: 23px;
      height: 21px;
      background-image: url('../../assets/icon/person.svg');
      float: right;
    }
  }

  main {
    font-size: 16px;
    background-color: #ebebeb;
    position: fixed;
    top: 44px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow-y: auto;
    padding-bottom: 10px;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .message-item {
    width: 100%;
    display: flex;
    margin-top: 8px;

    .avatar {
      width: 10vw;
      height: 10vw;
      margin: 0 10px;
    }
  }

  .message-bubble,
  .message-item--left {}

  .message-item--right {
    flex-direction: row-reverse;
  }

  .message-bubble {
    border: 1px solid #ddd;
    padding: 7px 10px;
    border-radius: 3px;
    max-width: 257px;
    position: relative;
  }

  .message-item--left .message-bubble {
    background-color: #fff;

    &::before {
      content: '';
      border-top: 1px solid #ddd;
      border-left: 1px solid #ddd;
      width: 10px;
      height: 10px;
      background: #fff;
      position: absolute;
      top: 14px;
      left: -6px;
      transform: rotate(-45deg);
      border-radius: 0 0 20px 0;
    }
  }

  .message-item--right .message-bubble {
    /* background-color: #afe56e;
  border-color: #7fb25a; */
    background-color: #9fe759;
    border-color: #87cd51;

    &::before {
      content: '';
      border-top: 1px solid #87cd51;
      border-left: 1px solid #87cd51;
      width: 10px;
      height: 10px;
      background-color: #9fe759;
      position: absolute;
      top: 14px;
      right: -6px;
      transform: rotate(135deg);
      border-radius: 0 0 20px 0;
    }
  }

  footer {
    position: fixed;
    bottom: 0;
    height: 50px;
    border-top: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    background-color: #f5f5f7;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .icon {
      width: 28px;
      height: 28px;
      margin-left: 10px;

      &:last-child {
        margin-right: 10px;
      }
    }

    .text-input {
      flex: 1;
      margin-left: 10px;
      height: 36px;
      border: 1px solid #ddd;
      border-radius: 5px;
      background: #f5f5f5;
    }

    .icon-voice {
      background-image: url('../../assets/icon/voice.svg');
    }

    .icon-plus {
      background-image: url('../../assets/icon/plus-cycle.svg');
    }

    .icon-face {
      background-image: url('../../assets/icon/smile-face.svg');
    }
  }

  .message-select {
    height: 200px;
    bottom: -200px;
    position: fixed;
    width: 100%;
  }

  .show-selector {
    footer {
      bottom: 200px;
    }

    main {
      bottom: 250px;
    }

    .message-select {
      bottom: 0;
    }
  }

  footer,
  main {
    transition: bottom .3s;
  }

  .message-select {
    transition: bottom .3s;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 20px;

    .message-item {
      display: flex;
      justify-content: center;
    }
  }

  /* cover-tips */

  .cover-tips {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  .mask {
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    z-index: 100;
  }

  .hide {
    display: none;
  }

  .tips-container {
    width: 200px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;
    z-index: 101;
    display: flex;
    flex-direction: column;
    transform: translateY(-10%);
    padding: 20px;
  }

  .tips-text {
    width: 100%;
    line-height: 30px;
    font-size: 18px;
    text-align: center;
    margin-bottom: 10px;
  }

  .tips-icons {
    display: flex;
    justify-content: space-around;
  }

  .icon-replay,
  .icon-share {
    width: 40px;
    height: 40px;
  }

  .icon-replay {
    background-image: url('../../assets/icon/replay.svg');
  }

  .icon-share {
    background-image: url('../../assets/icon/share.svg');
  }
</style>