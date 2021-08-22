import { ImageProps } from '@/types/image'

export interface QuizQuestion {
  image: ImageProps;
  imagePreview: ImageProps;
  rightAnswer: string;
  letterPool: QuizQuestionLetter[];
  openedLetters: QuizQuestionLetter[];
}

export interface QuizQuestionLetter {
  value: string;
  openedByHint?: boolean;
}

export interface Quiz {
  id?: string;
  title: string;
  image: ImageProps;
  questions: QuizQuestion[];
}

export interface Quizes {
  [quizId: string]: Quiz;
}

export interface QuizState {
  quizes: Quizes;
}

export interface SetQuizesPayload {
  quizes: {
    [quizId: string]: Quiz;
  }
}

export interface AdminQuizQuestion {
  image: ImageProps;
  rightAnswer: string;
  letterPool?: QuizQuestionLetter[];
  openedLetters?: QuizQuestionLetter[];
}

export interface AdminQuiz {
  id?: string;
  title: string;
  image: ImageProps;
  questions: AdminQuizQuestion[];
  published: boolean;
}
