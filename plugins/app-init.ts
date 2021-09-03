import { Context } from '@nuxt/types'

export default async ({ $fire, store }: Context) => {
  const snapshot = await $fire.database.ref(`/quizes`).once('value')
  const quizes = snapshot.val()
  store.commit('quiz/SET_QUIZES', {
    quizes
  })  
}