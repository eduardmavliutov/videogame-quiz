import { PopupModuleState } from '@/types/store/popup/popup.interface'
import { MutationTree } from 'vuex'

export const mutations: MutationTree<PopupModuleState> = {
  SHOW_POPUP (state): void {
    state.isShown = true
  },

  HIDE_POPUP (state): void {
    state.isShown = false
  },

  SET_POPUP_COMPONENT_NAME (state, { activeComponent }) {
    state.activeComponent = activeComponent
  }
}
