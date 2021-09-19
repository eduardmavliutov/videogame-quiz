import { Context } from '@nuxt/types'

/**
 * Plugin fetches all quizes from Firebase database on initial load
 * and then saves fetches quizes in the store
 */
export default async ({ $fire, store }: Context) => {
  const snapshot = await $fire.database.ref(`/quizes`).once('value')
  const quizes = snapshot.val()
  store.commit('quiz/SET_QUIZES', {
    quizes
  })  
}