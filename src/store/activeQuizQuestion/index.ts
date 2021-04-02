import { ActiveQuizQuestionModule } from '@/types/store/activeQuizQuestion/activeQuizQuestion.interface'
import { mutations } from '@/store/activeQuizQuestion/mutations'
import { Module } from 'vuex'
import { RootState } from '@/types/store/rootState.interface'

export const state: ActiveQuizQuestionModule = {
  questionId: '',
  quizId: '',
  image: {
    src: '',
    alt: ''
  },
  imagePreview: {
    src: '',
    alt: ''
  },
  rightAnswer: '',
  done: false,
  letterPool: [],
  openedLetters: []
}

const namespaced = true

export const activeQuizQuestion: Module<ActiveQuizQuestionModule, RootState> = {
  namespaced,
  state,
  mutations
}
