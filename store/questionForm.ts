import { QuestionFormState, SetQuestionImageSrcPayload, SetRightAnswerPayload } from '@/types/store/questionForm/questionForm'
import { GetterTree, MutationTree } from 'vuex/types/index'
import { RootState } from '~/types/store/rootState.interface'

export const mutations: MutationTree<QuestionFormState> = {
  SET_QUESTION_IMAGE_SRC (state, payload: SetQuestionImageSrcPayload) {
    state.image.src = payload.src
  },

  RESET_FORM (state) {
    state.image.src = ''
    state.rightAnswer = ''
  },

  SET_RIGHT_ANSWER (state, payload: SetRightAnswerPayload) {
    state.rightAnswer = payload.rightAnswer
  }
}

export const getters: GetterTree<QuestionFormState, RootState> = {
  rightAnswer: (state) => state.rightAnswer,
  imageSrc: (state) => state.image.src
}

export const state = (): QuestionFormState => ({
  image: {
    src: '',
    alt: 'videogame-quiz-question-image'
  },
  rightAnswer: ''
})