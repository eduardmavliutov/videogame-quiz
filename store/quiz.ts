import { GetterTree, MutationTree } from 'vuex'
import {
  Quiz,
  QuizQuestion,
  QuizState,
  SetQuizesPayload
} from '@/types/store/quiz/quiz.interface'
import { RootState } from '@/types/store/rootState.interface'
import { ImageProps } from '@/types/image'

export const mutations: MutationTree<QuizState> = {
  SET_QUIZES(state, payload: SetQuizesPayload) {
    // Временно
    state.quizes = [...state.quizes, ...payload.quizes]
    // Потом заменю на простое присваивание
  },
}

export const getters: GetterTree<QuizState, RootState> = {
  quizes: (state): Quiz[] => state.quizes,

  quiz: (state) => (quizId: string) => {
    const quiz: Quiz | undefined = state.quizes.find(
      (quiz: Quiz) => quiz.id === quizId
    )
    if (quiz) {
      return quiz
    }
    throw new Error(`No quiz with ${quizId} was found!`)
  },

  quizQuestion: (_, getters) => (quizId: string, questionId: number): QuizQuestion =>
    getters.quiz(quizId).questions[questionId],

  quizQuestionImage: (_, getters) => (quizId: string, questionId: number): ImageProps =>
    getters.quiz(quizId).questions[questionId].image
}

export const state = (): QuizState => ({
  quizes: [
    // {
    //   id: '324rfsd',
    //   title: 'PS4 exclusives',
    //   image: {
    //     src: require('@/assets/images/quizes/ps4-exclusives/ps4-exclusives.jpeg'),
    //     alt: 'ps4-exclusives'
    //   },
    //   questions: [
    //     {
    //       rightAnswer: 'god of war',
    //       image: {
    //         src: require('@/assets/images/quizes/ps4-exclusives/god-of-war.jpeg'),
    //         alt: 'quiz-picture-alt'
    //       },
    //       imagePreview: {
    //         src: require('@/assets/images/quizes/ps4-exclusives/god-of-war-thumb.jpeg'),
    //         alt: 'quiz-picture-alt'
    //       },
    //       letterPool: [
    //         { value: 'f' },
    //         { value: 'g' },
    //         { value: 'o' },
    //         { value: 'd' },
    //         { value: 'w' },
    //         { value: 'o' },
    //         { value: 'f' },
    //         { value: 'a' },
    //         { value: '6' },
    //         { value: 'r' },
    //         { value: 'n' },
    //         { value: 'm' },
    //         { value: 'u' },
    //         { value: '5' }
    //       ],
    //       openedLetters: [
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: ' ' },
    //         { value: '' },
    //         { value: '' },
    //         { value: ' ' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' }
    //       ]
    //     },
    //     {
    //       rightAnswer: 'uncharted 4',
    //       image: {
    //         src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4.jpeg'),
    //         alt: 'quiz-picture-alt'
    //       },
    //       imagePreview: {
    //         src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4-thumb.jpeg'),
    //         alt: 'quiz-picture-alt'
    //       },
    //       letterPool: [
    //         { value: 'c' },
    //         { value: 'h' },
    //         { value: 'u' },
    //         { value: 'a' },
    //         { value: 'n' },
    //         { value: '4' },
    //         { value: 'd' },
    //         { value: 'n' },
    //         { value: 'e' },
    //         { value: 't' },
    //         { value: 'r' }
    //       ],
    //       openedLetters: [
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: ' ' },
    //         { value: '' }
    //       ]
    //     },
    //     {
    //       rightAnswer: 'persona 5',
    //       image: {
    //         src: require('@/assets/images/quizes/ps4-exclusives/persona-5.jpeg'),
    //         alt: 'quiz-picture-alt'
    //       },
    //       imagePreview: {
    //         src: require('@/assets/images/quizes/ps4-exclusives/persona-5-thumb.jpeg'),
    //         alt: 'quiz-picture-alt'
    //       },
    //       letterPool: [
    //         { value: 'e' },
    //         { value: 'p' },
    //         { value: 'r' },
    //         { value: 'o' },
    //         { value: 's' },
    //         { value: 'n' },
    //         { value: '5' },
    //         { value: '3' },
    //         { value: 'a' },
    //         { value: 'a' },
    //         { value: 's' },
    //         { value: 'a' },
    //         { value: 'w' },
    //         { value: 'm' }
    //       ],
    //       openedLetters: [
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: '' },
    //         { value: ' ' },
    //         { value: '' }
    //       ]
    //     }
    //   ],
    // },
    {
      id: '324rfdsfsd',
      title: 'Horrors',
      image: {
        src: require('@/assets/images/quizes/horrors/horrors.jpeg'),
        alt: 'horrors'
      },
      questions: [],
    }
  ]
})
