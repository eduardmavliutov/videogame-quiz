import { GetterTree } from 'vuex'
import { AuthState } from '@/types/store/auth/auth.interface'
import { RootState } from '@/types/store/rootState.interface'

export const getters: GetterTree<AuthState, RootState> = {
  isAuthenticated: (state) => state.accessToken && state.refreshToken
}
