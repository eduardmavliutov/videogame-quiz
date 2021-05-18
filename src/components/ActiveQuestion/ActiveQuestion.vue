<template>
  <v-page name="quiz-active-question">
    <v-title :title="`${quizTitle} / #${activeQuestionIdForTitle}`" />
    <div class="quiz-active-question__main">
      <change-question-button
        type="previous"
        @change-question="previousQuizQuestionHandler()"
      ></change-question-button>
      <v-card name="quiz-active-question">
        <template #image>
          <div class="quiz-active-question__image-wrapper">
            <img
              :src="activeQuestionImage.src"
              :alt="activeQuestionImage.alt"
              class="quiz-active-question__image"
            >
          </div>
        </template>
        <div
          v-if="!activeQuizQuestion.done"
          class="quiz-active-question__bottom"
        >
          <opened-letters
            :openedLetters="activeQuizQuestion.openedLetters"
            :isQuestionDone="activeQuizQuestion.done"
            @remove-letter="removeLetterHandler"
          />
          <letter-pool
            :letterPool="activeQuizQuestion.letterPool"
            @add-letter="addLetterHandler"
          />
        </div>
        <div
          v-else
          class="quiz-active-question__bottom"
        >
          <opened-letters
            :openedLetters="activeQuizQuestion.openedLetters"
            :isQuestionDone="activeQuizQuestion.done"
          />
          <letter-pool :letterPool="activeQuizQuestion.letterPool" />
        </div>
      </v-card>
      <change-question-button
        type="next"
        @change-question="nextQuizQuestionHandler()"
      ></change-question-button>
    </div>
  </v-page>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator'
import LetterPool from '@/components/ActiveQuestion/LetterPool.vue'
import OpenedLetters from '@/components/ActiveQuestion/OpenedLetters.vue'
import ChangeQuestionButton from '@/components/ActiveQuestion/ChangeQuestionButton.vue'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import VCard from '@/components/VCard/VCard.vue'
import { namespace } from 'vuex-class'
import { Quiz } from '@/types/store/quiz/quiz.interface'
import { ImageProps } from '@/types/image'
import { AddPointsPayload, CreateParticipatedQuizPayload, EditLetterPayload, MarkQuestionDonePayload, ParticipatedQuestion, ParticipatedQuizes } from '@/types/store/user/user.interface'

const quizModule = namespace('quiz')
const userModule = namespace('user')

@Component({
  components: {
    LetterPool,
    OpenedLetters,
    VPage,
    VTitle,
    VCard,
    ChangeQuestionButton
  }
})
export default class ActiveQuestion extends Vue {
  @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz
  @quizModule.Getter('quizQuestionImage') image!: (quizId: string, questionId: number) => ImageProps

  @userModule.State('quizes') participatedQuizes!: ParticipatedQuizes
  @userModule.Getter('isQuizParticipated') isQuizParticipated!: (quizId: string) => boolean
  @userModule.Getter('participatedQuestion') participatedQuestion!: (quizId: string, questionId: number) => ParticipatedQuestion
  @userModule.Getter('computedAnswer') computedAnswer!: (quizId: string, questionId: number) => string
  @userModule.Action('createParticipatedQuiz') createParticipatedQuiz!: (payload: CreateParticipatedQuizPayload) => Promise<void>
  @userModule.Action('addLetter') addLetter!: (payload: EditLetterPayload) => void
  @userModule.Action('removeLetter') removeLetter!: (payload: EditLetterPayload) => void
  @userModule.Action('markQuestionAsDone') markQuestionAsDone!: (payload: MarkQuestionDonePayload) => void
  @userModule.Action('addPoints') addPoints!: (payload: AddPointsPayload) => void

  @Prop({ required: true, type: String }) quizId!: string
  @Prop({ required: true, type: Number }) questionId!: number

  /**
   * Prevents infinite operations in participatedQuizes watcher
   */
  private questionWasCounted = false

  /**
   * Retrieves the title of current quiz
   * @returns {string} - the title of current quiz
   */
  get quizTitle (): string {
    return this.quiz(this.quizId).title
  }

  /**
   * Computes active quiz question id for title
   * @returns {number} active quiz question id
   */
  get activeQuestionIdForTitle (): number {
    return this.questionId + 1
  }

  /**
   * Retrieves participated question from the store
   * @returns {ParticipatedQuestion} current participated quiz question
   */
  get activeQuizQuestion (): ParticipatedQuestion {
    return this.participatedQuestion(this.quizId, this.questionId)
  }

  /**
   * Retrieves the image url for current active question
   * @returns {string} image url for current active question
   */
  get activeQuestionImage () {
    return this.image(this.quizId, this.questionId)
  }

  /**
   * Wathes `participatedQuizes` property and checks whether
   * the right answer was given or not. If the answer is correct
   * watcher dispatches an action to send data to firebase
   */
  @Watch('participatedQuizes', { deep: true })
  onParticipatedQuizesChange (): void {
    const answer = this.computedAnswer(this.quizId, this.questionId)
    const rightAnswer = this.activeQuizQuestion.rightAnswer
    if (!this.questionWasCounted && answer === rightAnswer) {
      this.questionWasCounted = true
      this.markQuestionAsDone({
        quizId: this.quizId,
        questionId: this.questionId
      })
      this.addPoints({
        points: 10
      })
    }
  }

  /**
   * Letter pool click handler. When is called it dispatches
   * an action to add clicked letter to opened letters pool
   */
  addLetterHandler (index: number): void {
    this.addLetter({
      questionId: this.questionId,
      quizId: this.quizId,
      value: index
    })
  }

  /**
   * Opened letters click handler. When is called it dispatches
   * an action to remove clicked letter from opened letters pool
   */
  removeLetterHandler (index: number): void {
    this.removeLetter({
      questionId: this.questionId,
      quizId: this.quizId,
      value: index
    })
  }

  /**
   * Navigates to previous quiz question and resets questionWasCounted property
   */
  previousQuizQuestionHandler (): void {
    if (this.questionId >= 1) {
      this.$router.push(`/quiz/${this.quizId}/${this.questionId - 1}`)
      this.questionWasCounted = false
    }
  }

  /**
   * Navigates to next quiz question and resets questionWasCounted property
   */
  nextQuizQuestionHandler (): void {
    const currentQuizLength = this.quiz(this.quizId).questions.length
    if (this.questionId < (currentQuizLength - 1)) {
      this.$router.push(`/quiz/${this.quizId}/${this.questionId + 1}`)
      this.questionWasCounted = false
    }
  }

  /**
   * When component is created we check if the current quiz was
   * participated before. If it was not we create such record in
   * user`s data
   */
  async created (): Promise<void> {
    // Checking if current quiz is in participated quizes
    if (!this.isQuizParticipated(this.quizId)) {
      // if current quiz is not participated we create new participated
      // quiz and then we send that blank quiz to the server
      this.createParticipatedQuiz({
        quiz: this.quiz(this.quizId),
        quizId: this.quizId
      })
    }
  }
}
</script>
<style lang="scss">
.quiz-active-question {
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-flow: row nowrap;

    @include mobile {
      flex-flow: column nowrap;
      justify-content: center;
      align-items: center;
      flex-grow: 1;
    }
  }

  &__image {
    @media screen and (max-width: 320px) {
      width: 90%;
      padding: 1rem 1rem 0rem;
    }

    &-wrapper {
      display: flex;
      justify-content: center;
    }
  }
}
</style>
