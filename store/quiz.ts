import { GetterTree, MutationTree } from 'vuex'
import {
  Quiz,
  Quizes,
  QuizQuestion,
  QuizState,
  SetQuizesPayload
} from '@/types/store/quiz/quiz.interface'
import { RootState } from '@/types/store/rootState.interface'
import { ImageProps } from '@/types/image'

export const mutations: MutationTree<QuizState> = {
  SET_QUIZES(state, payload: SetQuizesPayload) {
    state.quizes = {
      ...payload.quizes
    }
  },
}

export const getters: GetterTree<QuizState, RootState> = {
  quizes: (state): Quizes => state.quizes,

  quiz: (state) => (quizId: string): Quiz  => {
    if (state.quizes[quizId]) {
      return state.quizes[quizId]
    }
    throw new Error(`No quiz with ${quizId} was found!`)
  },

  quizQuestion: (_, getters) => (quizId: string, questionId: number): QuizQuestion =>
    getters.quiz(quizId).questions[questionId],

  quizQuestionImage: (_, getters) => (quizId: string, questionId: number): ImageProps =>
    getters.quiz(quizId).questions[questionId].image
}

export const state = (): QuizState => ({
  quizes: {}
})
