import Vue from 'vue'
import Vuex from 'vuex'
import { quiz } from '@/store/quiz/index'
import { popup } from '@/store/popup/index'
import { activeQuizQuestion } from '@/store/activeQuizQuestion/index'
import { auth } from '@/store/auth/index'

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
    popup,
    activeQuizQuestion,
    auth
  }
})
