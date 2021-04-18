import { Module } from 'vuex'
import { AuthState } from '@/types/store/auth/auth.interface'
import { RootState } from '@/types/store/rootState.interface'
import { mutations } from '@/store/auth/mutations'
import { getters } from '@/store/auth/getters'

export const state: AuthState = {
  accessToken: '',
  refreshToken: ''
}

const namespaced = true

export const auth: Module<AuthState, RootState> = {
  namespaced,
  state,
  mutations,
  getters
}