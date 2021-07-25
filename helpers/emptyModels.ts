import { AdminQuiz } from '@/types/store/quiz/quiz.interface'

export const emptyAdminQuiz: AdminQuiz = {
  title: '',
  image: {
    src: '',
    alt: ''
  },
  questions: []
}