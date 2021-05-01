import { RootState } from '@/types/store/rootState.interface'
import { UserState } from '@/types/store/user/user.interface'
import { mutations } from '@/store/user/mutations'
import { getters } from '@/store/user/getters'
import { actions } from '@/store/user/actions'

import { Module } from 'vuex'

export const state: UserState = {
  email: '',
  name: '',
  quizes: {},
  points: 0
}

const namespaced = true

export const user: Module<UserState, RootState> = {
  state,
  namespaced,
  mutations,
  getters,
  actions
}
