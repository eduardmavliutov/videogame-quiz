import { ALPHABET, EXTRA_LETTERS_AMOUNT_PERCANTAGE } from '@/helpers/constants'
import shuffle from 'lodash.shuffle'

export const getRandomNumber = (max: number, min = 0): number => {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export const getRandomLetter = (): string => {
  const randomIndex = getRandomNumber(ALPHABET.length - 1)
  return ALPHABET[randomIndex]
}

export const generateLetterPool = (word: string): string[] => {
  const poolLength = Math.ceil(word.length * EXTRA_LETTERS_AMOUNT_PERCANTAGE)
  const extraLetters = new Array(poolLength)
    .fill(0)
    .map(() => getRandomLetter())
  return shuffle(Array.from(word).concat(extraLetters))
}

export const generateEmptyLetters = (rightAnswer: string) => {
  return new Array(rightAnswer.length).fill(0).map((_, index: number) => {
    return rightAnswer[index] === ' ' ? { value: ' ' } : { value: '' }
  })
}
