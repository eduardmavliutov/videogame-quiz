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
          },
          imagePreview: {
            src: require('@/assets/images/quizes/ps4-exclusives/god-of-war-thumb.jpeg'),
            alt: 'quiz-picture-alt'
          },
          letterPool: [
            { value: 'f' },
            { value: 'g' },
            { value: 'o' },
            { value: 'a' },
            { value: 'w' },
            { value: 'r' },
            { value: 'f' },
            { value: '3' },
            { value: '6' },
            { value: 'j' },
            { value: 'l' }
          ],
          openedLetters: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' },
            { value: '' },
            { value: '' }
          ]
        },
        {
          done: false,
          rightAnswer: 'uncharted 4',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4.jpeg'),
            alt: 'quiz-picture-alt'
          },
          imagePreview: {
            src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4-thumb.jpeg'),
            alt: 'quiz-picture-alt'
          },
          letterPool: [
            { value: 'c' },
            { value: 'h' },
            { value: 'u' },
            { value: 'a' },
            { value: 'n' },
            { value: '4' },
            { value: 'y' },
            { value: 'n' },
            { value: '4' },
            { value: 'y' },
            { value: '3' }
          ],
          openedLetters: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' }
          ]
        },
        {
          done: false,
          rightAnswer: 'persona 5',
          image: {
            src: require('@/assets/images/quizes/ps4-exclusives/persona-5.jpeg'),
            alt: 'quiz-picture-alt'
          },
          imagePreview: {
            src: require('@/assets/images/quizes/ps4-exclusives/persona-5-thumb.jpeg'),
            alt: 'quiz-picture-alt'
          },
          letterPool: [
            { value: 'e' },
            { value: 'p' },
            { value: 'r' },
            { value: 'o' },
            { value: 's' },
            { value: 'n' },
            { value: '5' },
            { value: '3' },
            { value: 'a' },
            { value: 'a' },
            { value: 's' },
            { value: 'a' },
            { value: 'w' },
            { value: 'm' }
          ],
          openedLetters: [
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: '' },
            { value: ' ' },
            { value: '' }
          ]
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
