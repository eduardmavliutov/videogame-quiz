import { ALPHABET, EXTRA_LETTERS_AMOUNT_PERCANTAGE } from '@/helpers/constants'
import shuffle from 'lodash.shuffle'
import { QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'

/**
 * Retrieves a random number between passed {min} and {max}
 * @param {number} max - maximum allowed value
 * @param {number} min - minimun alloweb value
 * @returns {number} random number between passed {min} and {max}
 */
export const getRandomNumber = (max: number, min = 0): number => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

/**
 * Retrieves a random letter from ALPHABET constant
 * @returns {string} a random letter
 */
export const getRandomLetter = (): string => {
  const randomIndex = getRandomNumber(ALPHABET.length - 1)
  return ALPHABET[randomIndex]
}

/**
 * Generates 'letterPool' array for quiz question
 * @param rightAnswer - question's right answer
 * @returns {QuizQuestionLetter[]} array of QuizQuestionLetter for question's 'letterPool' array
 */
export const generateLetterPool = (rightAnswer: string): QuizQuestionLetter[] => {
  const answerWithoutSpaces = Array.from(rightAnswer).filter((letter: string) => !!letter)
  const poolLength = Math.ceil(answerWithoutSpaces.length + (answerWithoutSpaces.length * EXTRA_LETTERS_AMOUNT_PERCANTAGE))
  const extraLetters = new Array(poolLength)
    .fill(0)
    .map(() => getRandomLetter())
  return shuffle(Array.from(answerWithoutSpaces).concat(...extraLetters)).map((letter: string) => ({
    value: letter.toLowerCase()
  }))
}

/**
 * Generates 'openedLetters' array for quiz question
 * @param {string} rightAnswer - question's right answer
 * @returns {QuizQuestionLetter[]} array of QuizQuestionLetter for question's 'openedLetters' array
 */
export const generateEmptyLetters = (rightAnswer: string): QuizQuestionLetter[] => {
  return new Array(rightAnswer.length)
    .fill(0)
    .map((_, index: number): QuizQuestionLetter => {
    return rightAnswer[index] === ' ' 
      ? { 
        value: ' ',
      }
      : { 
        value: '',
        openedByHint: false
      }
  })
}
