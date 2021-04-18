import { RootState } from '@/types/store/rootState.interface'
import { UserState } from '@/types/store/user/user.interface'
import { GetterTree } from 'vuex'

export const getters: GetterTree<UserState, RootState> = {
  completedQuizes: (state): number => {
    console.log('TODO: completedQuizes mutation logic')
    return state.quizes.length
  }
}
