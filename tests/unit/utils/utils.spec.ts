import { generateEmptyLetters } from '@/helpers/utils'

describe('utils.ts', () => {
  describe('generateEmptyLetters', () => {
    test('letters was replaced by empty strings, spaces left as it is', () => {
      const rightAnswer = 'gears 5'
      const expectedResult = [
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: '' },
        { value: ' ' },
        { value: '' }
      ]
      expect(generateEmptyLetters(rightAnswer)).toStrictEqual(expectedResult)
    })
  })
})
