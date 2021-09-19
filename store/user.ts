import { RootState } from '@/types/store/rootState.interface'
import {
  AddPointsPayload,
  CreateParticipatedQuizPayload,
  EditLetterPayload,
  MarkQuestionDonePayload,
  UpdateUserNamePayload,
  UserState,
  ParticipatedQuestion,
  SetUserPayload,
  SetQuizesPayload,
  FetchUserData,
  SubscribeUserModulePayload,
  UseTipPayload,
  SetOpenedLettersPayload,
  RemoveLetterFromLetterPoolPayload
} from '@/types/store/user/user.interface'
import { EMPTY_LETTER_BOX_SYMBOL, SPACE_SYMBOL } from '@/helpers/constants'
import {
  QuizQuestion,
  QuizQuestionLetter
} from '@/types/store/quiz/quiz.interface'
import { GetterTree, MutationTree, ActionTree, ActionContext } from 'vuex'
import firebase from 'firebase'
import { getRandomNumber } from '@/helpers/utils'

export const actions: ActionTree<UserState, RootState> = {
  /**
   * Creates participated quiz for user if user opens that quiz for
   * the first time: commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context
   * @param {CreateParticipatedQuizPayload} payload
   */
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

  /**
   * Adds a letter from the letter pool to opened letters of current quiz question.
   * Commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context 
   * @param {EditLetterPayload} payload
   */
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

  /**
   * Removes a letter from the opened letters to the letter pool of current quiz question.
   * Commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context 
   * @param {EditLetterPayload} payload
   */
  async removeLetter({ state, commit }, payload: EditLetterPayload): Promise<void> {
    commit('REMOVE_LETTER', payload)

    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/quizes`)
      .set({
        ...state.quizes
      })
  },

  /**
   * Marks a question as 'Done': commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context 
   * @param {MarkQuestionDonePayload} payload
   */
  async markQuestionAsDone({ commit, state }, payload: MarkQuestionDonePayload) {
    commit('MARK_QUESTION_AS_DONE', payload)
    
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/quizes`)
      .set({
        ...state.quizes
      })
  },

  /**
   * Adds points for asnwered question.
   * Commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context
   */
  async addPoints({ state, commit }): Promise<void> {
    commit('SET_POINTS', { points: state.points + 10 })
    
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/points`)
      .set(state.points)
  },

  /**
   * Substracts points for using tip.
   * Commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context
   */
  async subPoints({ state, commit }): Promise<void> {
    commit('SET_POINTS', { points: state.points - 10 })
    
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/points`)
      .set(state.points)
  },

  /**
   * Action fetches user's data. Then it subscribes for any changes in Firebase
   * database: if any change is detected in the database that change will be fetched
   * and then commited to the store
   * @param {ActionContext} context 
   * @param {FetchUserData} payload
   */
  async fetchUserData ({ dispatch }, payload: FetchUserData) {
    const result = await this.$fire.database.ref(`/users/${payload.userId}`)
    await dispatch('subscribeUserModule', { reference: result })
  },

  /**
   * Subscribes for any changes in Firebase database:
   * if any change is detected in the database that change will be fetched
   * and then commited to the store
   * @param {ActionContext} context 
   * @param {SubscribeUserModulePayload} payload
   */
  async subscribeUserModule({ commit }, payload: SubscribeUserModulePayload) {
    await payload.reference.on('value', (snapshot: firebase.database.DataSnapshot) => {
      const { email, name, points, quizes = [] } = snapshot.val()
      commit('SET_USER', {
        email,
        name,
        quizes,
        points
      })
    })
  },

  /**
   * Action is triggered when user uses a tip:
   * commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context 
   * @param {UseTipPayload} payload
   */
  async useTip({ commit, dispatch, state, getters }, { quizId, questionId }: UseTipPayload): Promise<void> {
    const notOpenedLetterIndexes = getters['indexesOfNotOpenedLetters'](quizId, questionId)
    if (state.points > 0 && notOpenedLetterIndexes.length > 0) {
      // By default we set letter index to 0
      let letterIndex = notOpenedLetterIndexes[0];

      // By default we take the first index from 'notOpenedLetterIndexes'
      // and then take the letter with that index from 'rightAnswer' property
      let randomLetterFromRightAnswer = state.quizes[quizId][questionId].rightAnswer[letterIndex]

      // If we have more that 1 free spot in openedLetters (that means that notOpenedLetterIndexes has more that 1 element)
      // we randomly take index
      if (notOpenedLetterIndexes.length > 1) {
        randomLetterFromRightAnswer === SPACE_SYMBOL
        while (randomLetterFromRightAnswer === SPACE_SYMBOL) {
          letterIndex = notOpenedLetterIndexes[getRandomNumber(0, notOpenedLetterIndexes.length)]
          randomLetterFromRightAnswer = state.quizes[quizId][questionId].rightAnswer[letterIndex]
        }
      }

      const openedLetters = [...state.quizes[quizId][questionId].openedLetters]
      openedLetters[letterIndex] = {
        value: randomLetterFromRightAnswer,
        openedByHint: true
      }

      commit('SET_OPENED_LETTERS', {
        quizId,
        questionId,
        openedLetters
      })

      commit('REMOVE_LETTER_FROM_LETTER_POOL', {
        quizId,
        questionId,
        value: randomLetterFromRightAnswer
      })

      // We coherently update user's data: Firstly we update their quizes, secondly - points
      await this.$fire
        .database
        .ref(`users/${this.$fire.auth.currentUser?.uid}/quizes`)
        .set({
          ...state.quizes
        })
        .then(() => {
          dispatch('subPoints')
        })
        .catch((error) => console.log(error))
    }
  },

  /**
   * Action is triggered on logout
   * @param {ActionContext} context
   */
  async logout({ commit }): Promise<void> {
    await this.$fire
      .auth
      .signOut()
      .catch((error) => {
        console.log(error)
      })
    commit('REMOVE_USER')
  },

  /**
   * Action is triggered when user changes their name.
   * Commits a mutation and sends the data to Firebase database
   * @param {ActionContext} context 
   * @param {UpdateUserNamePayload} payload
   */
  async updateUserName({ commit }, payload: UpdateUserNamePayload): Promise<void> {
    commit('SET_NAME', payload)
    await this.$fire
      .database
      .ref(`users/${this.$fire.auth.currentUser?.uid}/name`)
      .set(payload.name)
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
   * Defines whether quiz is completed or not
   * @param {string} quizId - id of the quiz we want to check
   * @returns {boolean} true if the quiz is completed, otherwise - false
   */
  isQuizCompleted: (state) => (quizId: string): boolean => {
    // if user has not participated in given quiz we return false
    if (!state.quizes[quizId]) {
      return false
    }
    return state.quizes[quizId].every((question: ParticipatedQuestion) => question.done)
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
    (quizId: string): boolean => {
      return !!state.quizes[quizId]
    },

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
  },

  /**
   * Computes an array of indexed of the letters that are not opened
   * in the given question of the given quiz
   * @param {string} quizId 
   * @param {number} questionId
   * @returns {number[]}
   */
  indexesOfNotOpenedLetters: (state) => (quizId: string, questionId: number): number[] => {
    const { openedLetters } = state.quizes[quizId][questionId]
    const indexes: number[] = []
    openedLetters.forEach((letter: QuizQuestionLetter, index: number) => {
      if (letter.value === EMPTY_LETTER_BOX_SYMBOL) {
        indexes.push(index)
      }
    })
    return indexes
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

  REMOVE_LETTER_FROM_LETTER_POOL (state, payload: RemoveLetterFromLetterPoolPayload) {
    const { quizId, questionId, value } = payload
    const letterPool = [...state.quizes[quizId][questionId].letterPool]
    const letterIndex = letterPool.findIndex((letter: QuizQuestionLetter) => letter.value === value)
    letterPool.splice(letterIndex, 1)
    state.quizes[quizId][questionId].letterPool = letterPool
  },

  SET_OPENED_LETTERS (state, { quizId, questionId, openedLetters }: SetOpenedLettersPayload) {
    state.quizes[quizId][questionId].openedLetters = openedLetters
  },

  SET_QUIZES(state, payload: SetQuizesPayload) {
    state.quizes = payload.quizes
  },

  MARK_QUESTION_AS_DONE (state, payload: MarkQuestionDonePayload) {
    const { quizId, questionId } = payload
    state.quizes[quizId][questionId].done = true
  },

  SET_POINTS(state, payload: AddPointsPayload) {
    state.points = payload.points
  },
  
  SET_NAME(state, payload: UpdateUserNamePayload) {
    state.name = `${payload.name}`
  }
}

export const state = (): UserState => ({
  email: '',
  name: '',
  quizes: {},
  points: 0
})
