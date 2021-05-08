import { MutationTree } from 'vuex'
import {
  EditLetterPayload,
  SetUserPayload,
  UserState
} from '@/types/store/user/user.interface'
import {
  QuizQuestion,
  QuizQuestionLetter
} from '@/types/store/quiz/quiz.interface'
import { EMPTY_LETTER_BOX_SYMBOL, SPACE_SYMBOL } from '@/helpers/constants'

export const mutations: MutationTree<UserState> = {
  SET_USER (state, payload: SetUserPayload) {
    state.email = payload.email
    state.quizes = payload.quizes
    state.name = payload.name
    state.points = payload.points
  },

  REMOVE_USER (state) {
    state.email = ''
    state.quizes = {}
    state.name = ''
    state.points = 0
  },

  CREATE_PARTICIPATED_QUIZ (state, payload): void {
    const { quiz, quizId } = payload
    const quizes = {
      ...state.quizes
    }
    quizes[quizId] = quiz.questions.map(
      (quizQuestion: QuizQuestion, index: number) => {
        return {
          id: index,
          done: false,
          rightAnswer: quizQuestion.rightAnswer,
          letterPool: quizQuestion.letterPool,
          openedLetters: quizQuestion.openedLetters
        }
      }
    )
    state.quizes = quizes
  },

  ADD_LETTER (state, payload: EditLetterPayload) {
    const { quizId, questionId, value } = payload
    const freeSpot: number = state.quizes[quizId][
      questionId
    ].openedLetters.findIndex(
      (letter: QuizQuestionLetter) => letter.value === ''
    )
    if (freeSpot !== -1) {
      const openedLetters = ([] as QuizQuestionLetter[]).concat(
        state.quizes[quizId][questionId].openedLetters
      )
      const [choosenLetter] = state.quizes[quizId][
        questionId
      ].letterPool.splice(value, 1)
      openedLetters[freeSpot] = choosenLetter
      state.quizes[quizId][questionId].openedLetters = openedLetters
    }
  },

  REMOVE_LETTER (state, payload: EditLetterPayload) {
    const { quizId, questionId, value } = payload
    const choosenLetter =
      state.quizes[quizId][questionId].openedLetters[value]
    if (
      choosenLetter.value !== EMPTY_LETTER_BOX_SYMBOL &&
      choosenLetter.value !== SPACE_SYMBOL
    ) {
      const openedLetters = ([] as QuizQuestionLetter[]).concat(
        state.quizes[quizId][questionId].openedLetters
      )
      openedLetters[value] = {
        value: EMPTY_LETTER_BOX_SYMBOL
      }
      state.quizes[quizId][questionId].openedLetters = openedLetters
      state.quizes[quizId][questionId].letterPool.push(choosenLetter)
    }
  }
}
