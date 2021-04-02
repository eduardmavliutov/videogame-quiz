import { EMPTY_LETTER_BOX_SYMBOL, SPACE_SYMBOL } from '@/helpers/constants'
import { ActiveQuizQuestionModule } from '@/types/store/activeQuizQuestion/activeQuizQuestion.interface'
import { QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<ActiveQuizQuestionModule> = {
  SET_QUIZ_ACTIVE_QUIZ_QUESTION (state, payload) {
    state.done = payload.done
    state.image = payload.image
    state.imagePreview = payload.imagePreview
    state.quizId = payload.quizId
    state.questionId = payload.questionId
    state.openedLetters = payload.openedLetters
    state.letterPool = payload.letterPool
    state.rightAnswer = payload.rightAnswer
  },
  ADD_LETTER (state, payload) {
    const freeSpot: number = state.openedLetters.findIndex(
      (letter: QuizQuestionLetter) => letter.value === ''
    )
    if (freeSpot !== -1) {
      const openedLetters = ([] as QuizQuestionLetter[]).concat(state.openedLetters)
      const [choosenLetter] = state.letterPool.splice(payload.value, 1)
      openedLetters[freeSpot] = choosenLetter
      state.openedLetters = openedLetters
    }
  },
  REMOVE_LETTER (state, payload) {
    const choosenLetter = state.openedLetters[payload.value]
    if (choosenLetter.value !== EMPTY_LETTER_BOX_SYMBOL && choosenLetter.value !== SPACE_SYMBOL) {
      const openedLetters = ([] as QuizQuestionLetter[]).concat(state.openedLetters)
      openedLetters[payload.value] = {
        value: EMPTY_LETTER_BOX_SYMBOL
      }
      state.openedLetters = openedLetters
      state.letterPool.push(choosenLetter)
    }
  }
}
