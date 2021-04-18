import { QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'

export interface UserState {
  email: string;
  quizes: ParticipatedQuiz[];
  name: string;
  points: number;
  // имя ?
  // ник ?
  // дата рождения ?
}

export type SetUserPayload = UserState

export interface ParticipatedQuiz {
  id: string;
  questions: ParticipatedQuestion[];
}

export interface ParticipatedQuestion {
  done: boolean;
  rightAnswer: string;
  letterPool: QuizQuestionLetter[];
  openedLetters: QuizQuestionLetter[];
}
