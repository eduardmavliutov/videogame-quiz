import { RootState } from '@/types/store/rootState.interface'
import {
  AddPointsPayload,
  CreateParticipatedQuizPayload,
  EditLetterPayload,
  MarkQuestionDonePayload,
  UserState
} from '@/types/store/user/user.interface'
import { ActionTree } from 'vuex'
import firebase from '@/firebase/firebase'
import { EMPTY_LETTER_BOX_SYMBOL, SPACE_SYMBOL } from '@/helpers/constants'
import {
  QuizQuestion,
  QuizQuestionLetter
} from '@/types/store/quiz/quiz.interface'

export const actions: ActionTree<UserState, RootState> = {
  async createParticipatedQuiz (
    { state },
    payload: CreateParticipatedQuizPayload
  ): Promise<void> {
    const { quizId, quiz } = payload
    const computedQuizes = {
      ...state.quizes
    }
    computedQuizes[quizId] = quiz.questions.map(
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
    // then we send that blank quiz with all quizes to the server
    firebase.auth().currentUser?.uid && await firebase
      .database()
      .ref(`users/${firebase.auth().currentUser?.uid}/quizes`)
      .set({
        ...computedQuizes
      })
  },
  async addLetter ({ state }, payload: EditLetterPayload): Promise<void> {
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
      firebase.auth().currentUser?.uid && await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser?.uid}/quizes`)
        .set({
          ...state.quizes
        })
    }
  },

  async removeLetter ({ state }, payload: EditLetterPayload): Promise<void> {
    const { quizId, questionId, value } = payload
    const choosenLetter = state.quizes[quizId][questionId].openedLetters[value]
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
      firebase.auth().currentUser?.uid && await firebase
        .database()
        .ref(`users/${firebase.auth().currentUser?.uid}/quizes`)
        .set({
          ...state.quizes
        })
    }
  },

  async markQuestionAsDone ({ state }, payload: MarkQuestionDonePayload) {
    const { quizId, questionId } = payload
    const { quizes } = state
    quizes[quizId][questionId].done = true
    firebase.auth().currentUser?.uid && await firebase
      .database()
      .ref(`users/${firebase.auth().currentUser?.uid}/quizes`)
      .set({
        ...quizes
      })
  },

  async addPoints ({ state }, payload: AddPointsPayload) {
    const points = Number(state.points) + payload.points
    firebase.auth().currentUser?.uid && await firebase
      .database()
      .ref(`users/${firebase.auth().currentUser?.uid}/points`)
      .set(points)
  },

  async logout ({ commit }): Promise<void> {
    await firebase
      .auth()
      .signOut()
      .catch(error => {
        console.log(error)
      })
    commit('REMOVE_USER')
  }
}
