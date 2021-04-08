<template>
  <v-page name="quiz-active-question">
    <v-title :title="`${quizTitle} / #${quizQuestionIdForTitle}`" />
    <v-card name="quiz-active-question">
      <template #image>
        <div class="quiz-active-question__image-wrapper">
          <img
            :src="image.src"
            :alt="image.alt"
            class="quiz-active-question__image"
          >
        </div>
      </template>
      <div class="quiz-active-question__bottom">
        <opened-letters
          :openedLetters="openedLetters"
          @remove-letter="REMOVE_LETTER"
        />
        <letter-pool
          :letterPool="letterPool"
          @add-letter="ADD_LETTER"
        />
        <div class="quiz-active-question__opened-letters"></div>
      </div>
    </v-card>

  </v-page>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LetterPool from '@/components/ActiveQuestion/LetterPool.vue'
import OpenedLetters from '@/components/ActiveQuestion/OpenedLetters.vue'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import VCard from '@/components/VCard/VCard.vue'
import { namespace } from 'vuex-class'
import { Quiz, QuizQuestion, QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'
import { ImageProps } from '@/types/image'

const quizModule = namespace('quiz')
const activeQuizQuestionModule = namespace('activeQuizQuestion')

@Component({
  components: {
    LetterPool,
    OpenedLetters,
    VPage,
    VTitle,
    VCard
  }
})
export default class ActiveQuestion extends Vue {
  @Prop({ required: true, type: String }) quizId!: string
  @Prop({ required: true, type: String }) questionId!: string

  @quizModule.Getter('quizQuestion') quizQuestion!: (quizId: string, questionId: number) => QuizQuestion
  @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz

  @activeQuizQuestionModule.State('image') image!: ImageProps
  @activeQuizQuestionModule.State('letterPool') letterPool!: QuizQuestionLetter[]
  @activeQuizQuestionModule.State('openedLetters') openedLetters!: QuizQuestionLetter[]
  @activeQuizQuestionModule.State('rightAnswer') rightAnswer!: string
  @activeQuizQuestionModule.Mutation('SET_QUIZ_ACTIVE_QUIZ_QUESTION') SET_QUIZ_ACTIVE_QUIZ_QUESTION!: (quizQuestion: QuizQuestion) => void
  @activeQuizQuestionModule.Mutation('ADD_LETTER') ADD_LETTER!: ({ value }: { value: number }) => void
  @activeQuizQuestionModule.Mutation('REMOVE_LETTER') REMOVE_LETTER!: ({ value }: { value: number }) => void

  get quizTitle (): string {
    return this.quiz(this.quizId).title
  }

  get quizQuestionIdForTitle () {
    return +this.questionId + 1
  }

  created () {
    const activeQuizQuestion = {
      ...this.quizQuestion(this.quizId, Number(this.questionId)),
      quizId: this.quizId,
      questionId: this.questionId
    }
    this.SET_QUIZ_ACTIVE_QUIZ_QUESTION(activeQuizQuestion)
  }
}
</script>
<style lang="scss">
.quiz-active-question {
  &__image-wrapper {
    display: flex;
    justify-content: center;
  }
}
</style>
