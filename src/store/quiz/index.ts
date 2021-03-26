import { Module } from 'vuex'
import { QuizState } from '@/types/store/quiz/quiz.interface'
import { RootState } from '@/types/store/rootState.interface'
import { getters } from '@/store/quiz/getters'
import { actions } from '@/store/quiz/actions'
import { mutations } from '@/store/quiz/mutations'

export const state: QuizState = {
  quizes: [
    {
      id: '324rfsd',
      title: 'PS4 exclusives',
      image: {
        src: require('@/assets/images/quizes/ps4-exclusives/ps4-exclusives.jpeg'),
        alt: 'ps4-exclusives'
      },
      questions: [
        {
          done: false,
          rightAnswer: 'god of war',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/god-of-war.jpeg'),
            alt: 'quiz-picture-alt'
          }
        },
        {
          done: false,
          rightAnswer: 'uncharted 4',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4.jpeg'),
            alt: 'quiz-picture-alt'
          }
        },
        {
          done: false,
          rightAnswer: 'god of war',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/persona-5.jpeg'),
            alt: 'quiz-picture-alt'
          }
        }
      ],
      done: false
    },
    {
      id: '324rfdsfsd',
      title: 'Horrors',
      image: {
        src: require('@/assets/images/quizes/horrors/horrors.jpeg'),
        alt: 'horrors'
      },
      questions: [],
      done: false
    }
  ]
}

const namespaced = true

export const quiz: Module<QuizState, RootState> = {
  namespaced,
  state,
  getters,
  actions,
  mutations
}
