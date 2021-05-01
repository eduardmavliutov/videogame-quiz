import { RootState } from '@/types/store/rootState.interface'
import { ParticipatedQuestion, UserState } from '@/types/store/user/user.interface'
import { GetterTree } from 'vuex'

export const getters: GetterTree<UserState, RootState> = {
  completedQuizes: (state): number => {
    console.log('TODO: completedQuizes getter logic')
    return Object.keys(state.quizes).length
  },

  isQuizParticipated: (state) => (quizId: string): boolean => {
    return !!state.quizes[quizId]
  },

  participatedQuestion: (state) => (quizId: string, questionId: number): ParticipatedQuestion => {
    return state.quizes[quizId][questionId]
  },

  isAuthenticated: (state) => !!state.email
}
