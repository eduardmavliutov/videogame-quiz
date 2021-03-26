import { GetterTree } from 'vuex'
import {
  Quiz,
  QuizQuestion,
  QuizState
} from '@/types/store/quiz/quiz.interface'
import { RootState } from '@/types/store/rootState.interface'

export const getters: GetterTree<QuizState, RootState> = {
  quizes (state): Quiz[] {
    return state.quizes
  },

  quiz: (state) => (quizId: string) => {
    const quiz: Quiz | undefined = state.quizes.find(
      (quiz: Quiz) => quiz.id === quizId
    )
    if (quiz) {
      return quiz
    }
    throw new Error(`No quiz with ${quizId} was found!`)
  },

  quizQuestion: (state, getters) => (quizId: string, questionId: number): QuizQuestion =>
    getters.quiz(quizId).questions[questionId]
}
