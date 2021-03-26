import Vue from 'vue'
import Vuex from 'vuex'
import { quiz } from '@/store/quiz/index'
import { popup } from '@/store/popup/index'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    quiz,
    popup
  }
})
