<template>
  <v-page name="quiz-active-question">
    <!-- <v-back-drop @click.native="$router.back()" /> -->
    <v-title :title="`${quizTitle} / #${quizQuestionIdForTitle}`" />
    <!-- <div class="quiz-active-question__inner"> -->
    <v-card name="quiz-active-question">
      <template #image>
        <img
          :src="image.src"
          :alt="image.alt"
          class="quiz-active-question__image"
        >
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

  &__inner {
    display: flex;
    background-color: $color-complementary--light;
    border-radius: 10px;
    overflow: hidden;

    background-color: $main-color;
    box-shadow: $box-shadow--dark;
    position: relative;
    backdrop-filter: blur(2px);
    &::after {
      content: "";
      background: url("~@/assets/images/questions.png");
      background-size: 10%;
      opacity: 0.05;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index: -1;
    }
  }

  &__image {
    max-width: 30vw;
    height: 30vw;
    flex-grow: 1;
  }
}
</style>
