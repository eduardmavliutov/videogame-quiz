import { ImageProps } from '@/types/image'

export interface QuizQuestion {
  id: string;
  image: ImageProps;
  done: boolean;
  rightAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  image: ImageProps;
  questions: QuizQuestion[];
  done: boolean;
}

export interface QuizState {
  quizes: Quiz[];
}
