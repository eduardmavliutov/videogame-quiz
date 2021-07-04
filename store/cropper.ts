import { GetterTree, MutationTree } from 'vuex/types/index'
import { CropperState, SetSrcPayload } from '@/types/store/cropper/cropper.interface'
import { RootState } from '@/types/store/rootState.interface'

export const mutations: MutationTree<CropperState> = {
  SET_SRC (state, payload: SetSrcPayload) {
    state.src = payload.src
  },

  CLEAR_SRC (state) {
    state.src = ''
  }
}

export const getters: GetterTree<CropperState, RootState> = {
  src: (state) => state.src,
}

export const state = (): CropperState => ({
  src: '',
  quizData: {
    id: '',
    questionId: 0
  }
})

// TODO: mutations SET_IMAGE_FOR_NEW_QUIZ
// TODO: mutations SET_IMAGE_FOR_NEW_QUESTION
// TODO: mutations SET_IMAGE_FOR_EXISTING_QUESTION
// TODO: mutations SET_IMAGE_FOR_EXISTING_QUIZ
