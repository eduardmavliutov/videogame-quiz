import { QuizQuestionModule } from '@/types/store/quizQuestion/quizQuestion.interface'
import { mutations } from '@/store/quizQuestion/mutations'
import { Module } from 'vuex'
import { RootState } from '@/types/store/rootState.interface'

export const state: QuizQuestionModule = {
  id: '',
  image: {
    src: '',
    alt: ''
  },
  rightAnswer: '',
  done: false
}

const namespaced = true

export const quizQuestion: Module<QuizQuestionModule, RootState> = {
  namespaced,
  state,
  mutations
}
