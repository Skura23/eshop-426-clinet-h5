const state = {
  userName: '',
  tabType: '',
}
const mutations = {
  SET_USER_NAME(state, name) {
    state.userName = name
  },
  setTabType(state, type){
    state.tabType = type
  },
}

const actions = {
  // 设置name
  setUserName({commit}, name) {
    commit('SET_USER_NAME', name)
  }
}
export default {
  state,
  mutations,
  actions
}
