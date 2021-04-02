
import { QuizQuestion } from '../quiz/quiz.interface'

export interface ActiveQuizQuestionModule extends QuizQuestion {
  questionId: string;
  quizId: string;
}
