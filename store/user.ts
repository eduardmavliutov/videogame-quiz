import { RootState } from '@/types/store/rootState.interface'
import {
  AddPointsPayload,
  CreateParticipatedQuizPayload,
  EditLetterPayload,
  MarkQuestionDonePayload,
  UpdateUserName,
  UpdateUserPhotoURL,
  UserState,
  ParticipatedQuestion,
  SetUserPayload,
  SetQuizesPayload
} from '@/types/store/user/user.interface'
import { EMPTY_LETTER_BOX_SYMBOL, SPACE_SYMBOL } from '@/helpers/constants'
import {
  QuizQuestion,
  QuizQuestionLetter
} from '@/types/store/quiz/quiz.interface'
import { GetterTree, MutationTree, ActionTree } from 'vuex'

export const actions: ActionTree<UserState, RootState> = {
  async createParticipatedQuiz(
    { state, commit },
    payload: CreateParticipatedQuizPayload
  ): Promise<void> {
    commit('CREATE_PARTICIPATED_QUIZ', payload)
    // then we send that blank quiz with all quizes to the server
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/quizes`)
      .set({
        ...state.quizes
      })
  },

  async addLetter({ commit, state }, payload: EditLetterPayload): Promise<void> {
    commit('ADD_LETTER', payload)

    await this.$fire
        .database
        .ref(`users/${this.$fire.auth.currentUser?.uid}/quizes`)
        .set({
          ...state.quizes
        })
        .catch((error) => console.log(error))
  },

  async removeLetter({ state, commit }, payload: EditLetterPayload): Promise<void> {
    commit('REMOVE_LETTER', payload)

    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/quizes`)
      .set({
        ...state.quizes
      })
  },

  async markQuestionAsDone({ commit, state }, payload: MarkQuestionDonePayload) {
    commit('MARK_QUESTION_AS_DONE', payload)
    
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/quizes`)
      .set({
        ...state.quizes
      })
  },

  async addPoints({ state }, payload: AddPointsPayload): Promise<void> {
    const points = Number(state.points) + payload.points

    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/points`)
      .set(points)
  },

  async logout({ commit }): Promise<void> {
    await this.$fire
      .auth
      .signOut()
      .catch((error) => {
        console.log(error)
      })
    commit('REMOVE_USER')
  },

  async updateUserName({ commit }, payload: UpdateUserName): Promise<void> {
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/name`)
      .set(payload.name)
      .catch((error) => console.log(error))
  },

  async updateUserPhotoURL({ commit }, payload: UpdateUserPhotoURL) {
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/photoURL`)
      .set(payload.photoURL)
      .catch((error) => console.log(error))
  }
}

export const getters: GetterTree<UserState, RootState> = {
  /**
   * Returns the number of quizes that are compoleted by current user
   * @param state
   * @returns {number} - number of quizes that are compoleted by current user
   */
  completedQuizes: (state): number => {
    let completedCounter = 0
    Object.keys(state.quizes).forEach((quizId: string) => {
      if (
        state.quizes[quizId].every((quiz: ParticipatedQuestion) => quiz.done)
      ) {
        completedCounter += 1
      }
    });
    return completedCounter
  },

  /**
   * Retrieves user`s email
   * @param state 
   * @returns {string} user`s email
   */
  email: (state) => state.email,

  /**
   * 
   * @param state Retrieves user`s participated quizes
   * @returns {object} quizes as object
   */
  quizes: (state) => state.quizes,

  /**
   * Checks whether opened quiz was participated or not
   * @param state
   * @returns {boolean} true if the quiz is participated, otherwise - false
   */
  isQuizParticipated:
    (state) =>
    (quizId: string): boolean => !!state.quizes[quizId],

  /**
   * Gets participated quiz question
   * @param state
   * @returns {ParticipatedQuestion} - participated quiz question
   */
  participatedQuestion:
    (state) =>
    (quizId: string, questionId: number): ParticipatedQuestion => state.quizes[quizId][questionId],

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
    const openedLetters = [...state.quizes[quizId][questionId].openedLetters]
    return openedLetters
      .map((letter: QuizQuestionLetter) => letter.value)
      .join('')
  }
}

export const mutations: MutationTree<UserState> = {
  CREATE_PARTICIPATED_QUIZ (state, payload: CreateParticipatedQuizPayload): void {
    const { quizId, quiz } = payload
    state.quizes[quizId] = quiz.questions.map(
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
  },

  SET_USER(state, payload: SetUserPayload) {
    state.email = payload.email
    state.quizes = payload.quizes
    state.name = payload.name
    state.points = payload.points
    state.photoURL = payload.photoURL
  },

  REMOVE_USER(state) {
    state.email = ''
    state.quizes = {}
    state.name = ''
    state.points = 0
  },

  ADD_LETTER(state, payload: EditLetterPayload) {
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

  REMOVE_LETTER(state, payload: EditLetterPayload) {
    const { quizId, questionId, value } = payload
    const newQuizes = {
      ...state.quizes
    }
    const choosenLetter = newQuizes[quizId][questionId].openedLetters[value]
    if (
      choosenLetter.value !== EMPTY_LETTER_BOX_SYMBOL &&
      choosenLetter.value !== SPACE_SYMBOL
    ) {
      const openedLetters = ([] as QuizQuestionLetter[]).concat(
        newQuizes[quizId][questionId].openedLetters
      )
      openedLetters[value] = {
        value: EMPTY_LETTER_BOX_SYMBOL
      }
      newQuizes[quizId][questionId].openedLetters = openedLetters
      newQuizes[quizId][questionId].letterPool.push(choosenLetter)
    }
  },

  SET_QUIZES(state, payload: SetQuizesPayload) {
    state.quizes = payload.quizes
  },

  MARK_QUESTION_AS_DONE (state, payload: MarkQuestionDonePayload) {
    const { quizId, questionId } = payload
    state.quizes[quizId][questionId].done = true
  }
}

export const state = (): UserState => ({
  email: '',
  name: '',
  quizes: {},
  points: 0,
  photoURL: ''
})
