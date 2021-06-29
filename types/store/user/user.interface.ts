import { Quiz, QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'
import firebase from 'firebase'

export interface UserState {
  email: string;
  quizes: {
    [key: string]: ParticipatedQuestion[];
  };
  name: string;
  points: number;
  photoURL: string;
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

export interface SetQuizesPayload {
  quizes: {
    [key: string]: ParticipatedQuestion[];
  }
}

export interface MarkQuestionDonePayload {
  quizId: string;
  questionId: number;
}

export interface AddPointsPayload {
  points: number;
}

export interface UpdateUserName {
  name?: string;
}

export interface UpdateUserPhotoURL {
  photoURL?: string;
}

export interface FetchUserData {
  userId: string;
}

export interface SubscribeUserModulePayload {
  reference: firebase.database.Reference;
}
