import { RootState } from '@/types/store/rootState.interface'
import { PopupModuleState } from '@/types/store/popup/popup.interface'
import { mutations } from '@/store/popup/mutations'
import { Module } from 'vuex'

export const state: PopupModuleState = {
  isShown: false,
  activeComponent: ''
}

const namespaced = true

export const popup: Module<PopupModuleState, RootState> = {
  state,
  namespaced,
  mutations
}
