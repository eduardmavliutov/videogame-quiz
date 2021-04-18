import { MutationTree } from 'vuex'
import { SetUserPayload, UserState } from '@/types/store/user/user.interface'

export const mutations: MutationTree<UserState> = {
  SET_USER (state, payload: SetUserPayload) {
    state.email = payload.email
    state.quizes = payload.quizes
    state.name = payload.name
  }
}
