const state = {
  userName: '',
  tabType: '',
  curAddr: {},
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  setTabType(state, type){
    state.tabType = type
  },
  setCurAddr(state, addr){
    state.curAddr = addr
  },
  
}

const actions = {
  // 设置name
  setUserName({commit}, name) {
    commit('SET_USER_NAME', name)
  },
}
export default {
  state,
  mutations,
  actions
}
