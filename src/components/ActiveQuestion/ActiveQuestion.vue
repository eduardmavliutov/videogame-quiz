<template>
  <div>
    <v-back-drop @click.native="$router.back()" />
    <div class="quiz-active-question">
      <div class="quiz-active-question__inner">
        <img
          :src="image.src"
          :alt="image.alt"
          class="quiz-active-question__image"
        >
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
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VBackDrop from '@/components/VBackDrop/VBackDrop.vue'
import LetterPool from '@/components/ActiveQuestion/LetterPool.vue'
import OpenedLetters from '@/components/ActiveQuestion/OpenedLetters.vue'
import { namespace } from 'vuex-class'
import { QuizQuestion, QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'
import { ImageProps } from '@/types/image'

const quizModule = namespace('quiz')
const activeQuizQuestionModule = namespace('activeQuizQuestion')

@Component({
  components: {
    VBackDrop,
    LetterPool,
    OpenedLetters
  }
})
export default class ActiveQuestion extends Vue {
  @Prop({ required: true, type: String }) quizId!: string
  @Prop({ required: true, type: String }) questionId!: string

  @quizModule.Getter('quizQuestion') quizQuestion!: (quizId: string, questionId: number) => QuizQuestion

  @activeQuizQuestionModule.State('image') image!: ImageProps
  @activeQuizQuestionModule.State('letterPool') letterPool!: QuizQuestionLetter[]
  @activeQuizQuestionModule.State('openedLetters') openedLetters!: QuizQuestionLetter[]
  @activeQuizQuestionModule.State('rightAnswer') rightAnswer!: string
  @activeQuizQuestionModule.Mutation('SET_QUIZ_ACTIVE_QUIZ_QUESTION') SET_QUIZ_ACTIVE_QUIZ_QUESTION!: (quizQuestion: QuizQuestion) => void
  @activeQuizQuestionModule.Mutation('ADD_LETTER') ADD_LETTER!: ({ value }: { value: number }) => void
  @activeQuizQuestionModule.Mutation('REMOVE_LETTER') REMOVE_LETTER!: ({ value }: { value: number }) => void

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
  display: flex;
  flex-flow: column nowrap;
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  transform: translate(50%, 20%);
  width: 50%;
  height: fit-content;
  background-color: $color-white;
  border: 1px solid $color-white;
  &::before {
    content: "";
    background: url("~@/assets/images/questions.png");
    background-size: 5%;
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: -1;
    position: absolute;
  }

  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
