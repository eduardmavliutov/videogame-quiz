import { RootState } from '@/types/store/rootState.interface';
import { GetterTree, MutationTree, ActionTree } from 'vuex'
import { AuthState, SetIsAuthLoadingPayload } from '@/types/store/auth/auth.interface'

export const mutations: MutationTree<AuthState> = {
  SET_IS_AUTH_LOADING (state, payload: SetIsAuthLoadingPayload) {
    state.isAuthLoading = payload.isAuthLoading
  }
}

export const getters: GetterTree<AuthState, RootState> = {
  isAuthLoading: (state) => state.isAuthLoading
}

export const state = (): AuthState => ({
  isAuthLoading: false
})
