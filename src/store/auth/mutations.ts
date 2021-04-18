import { MutationTree } from 'vuex'
import { AuthState, SetTokensPayload } from '@/types/store/auth/auth.interface'

export const mutations: MutationTree<AuthState> = {
  SET_TOKENS (state, payload: SetTokensPayload) {
    state.accessToken = payload.accessToken
    state.refreshToken = payload.refreshToken
  },

  REMOVE_TOKENS (state) {
    state.accessToken = ''
    state.refreshToken = ''
  }
}
