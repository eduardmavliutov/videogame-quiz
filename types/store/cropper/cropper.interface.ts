export interface CropperState {
  src: string;
  quizData: {
    id: string;
    questionId: number
  }
}

export interface SetSrcPayload {
  src: string;
  quizData?: {
    id: string;
    questionId: number
  }
}