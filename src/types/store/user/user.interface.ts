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

export interface ParticipatedQuizes {
  [key: string]: ParticipatedQuestion;
}

export interface ParticipatedQuestion {
  id: number;
  done: boolean;
  rightAnswer: string;
  letterPool: QuizQuestionLetter[];
  openedLetters: QuizQuestionLetter[];
}

export interface CreateParticipatedQuizPayload {
  quiz: Quiz;
  quizId: string;
}

export interface EditLetterPayload {
  quizId: string;
  questionId: number;
  value: number;
}

export interface MarkQuestionDonePayload {
  quizId: string;
  questionId: number;
}

export interface AddPointsPayload {
  points: number;
}
