import { ImageProps } from '@/types/image'

export interface QuestionFormState {
  image: ImageProps;
  rightAnswer: string;
}

export interface SetQuestionImageSrcPayload {
  src: string;
}

export interface SetRightAnswerPayload {
  rightAnswer: string;
}