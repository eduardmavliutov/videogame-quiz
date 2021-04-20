import { Quiz, QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'

export interface UserState {
  email: string;
  quizes: {
    [key: string]: ParticipatedQuestion[];
  };
  name: string;
  points: number;
  // имя ?
  // ник ?
  // дата рождения ?
}

export type SetUserPayload = UserState

export interface ParticipatedQuestion {
  id: number;
  done: boolean;
  rightAnswer: string;
  letterPool: QuizQuestionLetter[];
  openedLetters: QuizQuestionLetter[];
}

export interface CreateParticipatedQuizPaylod {
  quiz: Quiz;
  quizId: string;
}

export interface EditLetterPayload {
  quizId: string;
  questionId: number;
  value: number;
}
