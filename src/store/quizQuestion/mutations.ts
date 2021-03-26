import { QuizQuestionModule } from '@/types/store/quizQuestion/quizQuestion.interface'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<QuizQuestionModule> = {
  SET_QUIZ_QUESTION (state, payload) {
    state = {
      ...payload
    }
  }
}
