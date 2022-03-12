import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userAddress: null
  },
  getters: {
    getUserAddress(state){
      return state.userAddress;
    }
  },
  mutations: {
    userAddress(state, address){
      state.userAddress = address;
    }
  },
  actions: {
  },
  modules: {
  }
})
