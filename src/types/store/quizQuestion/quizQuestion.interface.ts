import { ImageProps } from '@/types/image'

export interface QuizQuestionModule {
  id: string;
  image: ImageProps;
  done: boolean;
  rightAnswer: string;
}
