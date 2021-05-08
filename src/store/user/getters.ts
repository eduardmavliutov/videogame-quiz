import { RootState } from '@/types/store/rootState.interface'
import { ParticipatedQuestion, UserState } from '@/types/store/user/user.interface'
import { QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'
import { GetterTree } from 'vuex'

export const getters: GetterTree<UserState, RootState> = {
  /**
   * Returns the number of quizes that are compoleted by current user
   * @param state
   * @returns {number} - number of quizes that are compoleted by current user
   */
  completedQuizes: (state): number => Object.keys(state.quizes).length,

  /**
   * Checks whether opened quiz was participated or not
   * @param state
   * @returns {boolean} true if the quiz is participated, otherwise - false
   */
  isQuizParticipated: state => (quizId: string): boolean =>
    !!state.quizes[quizId],

  /**
   * Gets participated quiz question
   * @param state
   * @returns {ParticipatedQuestion} - participated quiz question
   */
  participatedQuestion: (state) => (
    quizId: string,
    questionId: number
  ): ParticipatedQuestion => state.quizes[quizId][questionId],

  /**
   * Checks if someone is logged in
   * @param state
   * @returns {boolean} true if the is logged in user, otherwise - false
   */
  isAuthenticated: (state) => !!state.email,

  /**
   * Concatenates all opened letter values to one word that will be considered as user`s answer
   * @param {string} quizId - id of current quiz
   * @param {string} questionId - number of current quiz question
   * @returns {string} user`s answer to current quiz question
   */
  computedAnswer: (state) => (quizId: string, questionId: number) => {
    const { openedLetters } = state.quizes[quizId][questionId]
    return openedLetters.map((letter: QuizQuestionLetter) => letter.value).join('')
  }
}
