<template>
  <div class="quiz-active-question__wrapper">
    <client-only>
      <article class="quiz-active-question__main">
        <change-question-button
          type="previous"
          @change-question="previousQuizQuestionHandler()"
        />
        <div class="quiz-active-question__card">
          <div class="quiz-active-question__image-wrapper">
            <img
              :src="quiz.questions[questionId].image.src"
              :alt="quiz.questions[questionId].image.alt"
              class="quiz-active-question__image"
            >
            <button
              class="quiz-active-question__tip-button"
              @click="tipButtonHandler()"
            />
          </div>
          <div
            v-if="!activeQuizQuestion.done"
            class="quiz-active-question__bottom"
          >
            <opened-letters
              :opened-letters="activeQuizQuestion.openedLetters"
              :is-question-done="activeQuizQuestion.done"
              @remove-letter="removeLetterHandler"
            />
            <letter-pool
              :letter-pool="activeQuizQuestion.letterPool"
              @add-letter="addLetterHandler"
            />
          </div>
          <div
            v-else
            class="quiz-active-question__bottom"
          >
            <opened-letters
              :opened-letters="activeQuizQuestion.openedLetters"
              :is-question-done="activeQuizQuestion.done"
            />
            <letter-pool :letter-pool="activeQuizQuestion.letterPool" />
          </div>
        </div>
        <change-question-button
          type="next"
          @change-question="nextQuizQuestionHandler()"
        />
      </article>
    </client-only>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Watch } from 'nuxt-property-decorator'
import LetterPool from '@/components/ActiveQuestion/LetterPool.vue'
import OpenedLetters from '@/components/ActiveQuestion/OpenedLetters.vue'
import ChangeQuestionButton from '@/components/ActiveQuestion/ChangeQuestionButton.vue'
import { namespace } from 'vuex-class'
import { gsap } from 'gsap'
import { Quiz } from '@/types/store/quiz/quiz.interface'
import { AddPointsPayload, CreateParticipatedQuizPayload, EditLetterPayload, MarkQuestionDonePayload, ParticipatedQuestion, ParticipatedQuizes, UseTipPayload } from '@/types/store/user/user.interface'
import { ImageProps } from '@/types/image'
import { Route } from 'vue-router'

const userModule = namespace('user')
const quizModule = namespace('quiz')

@Component({
  components: {
    LetterPool,
    OpenedLetters,
    ChangeQuestionButton
  },
  layout: 'active-quiz-question',
  transition (to: Route, from: Route | undefined) {
    if (from && from?.path.includes('/quiz/') && to.name === 'quiz-question') {
      return 'route-change-left'
    }
    const toQuestionId = to.params.questionId
    const fromQuestionId = from ? from.params.questionId : -1
    return toQuestionId > fromQuestionId
      ? 'route-change-left'
      : 'route-change-right'
  }
})
export default class ActiveQuestionPage extends Vue {
  @userModule.Getter('quizes') participatedQuizes!: ParticipatedQuizes
  @userModule.Getter('isQuizParticipated') isQuizParticipated!: (quizId: string) => boolean
  @userModule.Getter('participatedQuestion') participatedQuestion!: (quizId: string, questionId: number) => ParticipatedQuestion
  @userModule.Getter('computedAnswer') computedAnswer!: (quizId: string, questionId: number) => string
  @userModule.Action('createParticipatedQuiz') createParticipatedQuiz!: (payload: CreateParticipatedQuizPayload) => Promise<void>
  @userModule.Action('addLetter') addLetter!: (payload: EditLetterPayload) => void
  @userModule.Action('removeLetter') removeLetter!: (payload: EditLetterPayload) => void
  @userModule.Action('markQuestionAsDone') markQuestionAsDone!: (payload: MarkQuestionDonePayload) => void
  @userModule.Action('addPoints') addPoints!: (payload: AddPointsPayload) => Promise<void>
  @userModule.Action('useTip') useTip!: (payload: UseTipPayload) => Promise<void>

  @quizModule.Getter('quiz') getQuiz!: (quizId: string) => Quiz

  @Prop({ required: true, type: String }) quizId!: string
  @Prop({ required: true, type: Number }) questionId!: number

  /**
   * Prevents infinite operations in participatedQuizes watcher
   */
  private questionWasCounted = false

  private get quiz (): Quiz {
    return this.getQuiz(this.quizId)
  }

  /**
   * Retrieves participated question from the store
   * @returns {ParticipatedQuestion} current participated quiz question
   */
  get activeQuizQuestion (): ParticipatedQuestion {
    return this.participatedQuestion(this.quizId, this.questionId)
  }

  get questionImage (): ImageProps {
    return this.quiz.questions[this.questionId].image
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
      gsap.to('.opened-letter', {
        duration: 0.4,
        y: -10,
        stagger: 0.1,
        scale: 1.1,
        ease: 'bounce.out',
        yoyo: true,
        repeat: 3
      })
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
  removeLetterHandler (index: number, openedByHint: boolean): void {
    if (!openedByHint) {
      this.removeLetter({
        questionId: this.questionId,
        quizId: this.quizId,
        value: index
      })
    }
  }

  /**
   * Navigates to previous quiz question and resets questionWasCounted property
   */
  previousQuizQuestionHandler (): void {
    if (this.questionId >= 1) {
      this.$router.push({
        name: 'quiz-question',
        params: {
          quizId: this.quizId,
          questionId: `${this.questionId - 1}`
        }
      })
    }
  }

  /**
   * Navigates to next quiz question and resets questionWasCounted property
   */
  nextQuizQuestionHandler (): void {
    const currentQuizLength = this.quiz.questions.length
    if (this.questionId < (currentQuizLength - 1)) {
      this.$router.push({
        name: 'quiz-question',
        params: {
          quizId: this.quizId,
          questionId: `${this.questionId + 1}`
        }
      })
    }
  }

  /**
   * Handler for 'Tip' button. Active if the active question is not done yet
   */
  tipButtonHandler (): void {
    if (!this.activeQuizQuestion.done) {
      this.useTip({
        quizId: this.quizId,
        questionId: this.questionId
      })
    }
  }

  /**
   * When component is created we check if the current quiz was
   * participated before. If it was not we create such record in
   * user`s data
   */
  created (): void {
    // Checking if current quiz is in participated quizes
    if (!this.isQuizParticipated(this.quizId)) {
      // if current quiz is not participated we create new participated
      // quiz and then we send that blank quiz to the server
      this.createParticipatedQuiz({
        quiz: this.quiz,
        quizId: this.quizId
      })
    }
  }
}
</script>
<style lang="scss">
.quiz-active-question {
  &__wrapper {
    @include mobile {
      display: flex;
      flex-flow: column nowrap;
      flex-grow: 1;
      padding: 0.7rem 0;
    }
  }
  &__main {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-flow: row nowrap;

    @include mobile {
      flex-flow: column nowrap;
      flex-grow: 1;
    }
  }

  &__card {
    position: relative;
    z-index: 10;
    width: 80%;
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    box-shadow: $box-shadow--dark;
    background-color: $main-color;
    transition: all 0.5s ease-in-out;

    &::before {
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

    @include mobile {
      width: 100%;
      flex-flow: column nowrap;
      justify-content: flex-start;
    }
  }

  &__image {
    max-height: 70vh;

    @media screen and (max-width: 320px) {
      width: 90%;
      padding: 1rem 1rem 0rem;
    }

    &-wrapper {
      position: relative;
      display: flex;
      justify-content: center;
    }
  }

  &__tip-button {
    display: none;
    position: absolute;
    top: 0;
    right: 0;
    width: 2.5rem;
    height: 2.5rem;
    border: none;
    border-bottom-left-radius: 50%;
    background-color: rgba(255, 255, 255, 0.3);
    box-shadow: -2px 2px 1px 2px rgba(255, 255, 255, 0.3);
    background-image: url("@/assets/icons/tip.svg");
    transition: 0.3s all ease-in;

    @include mobile {
      display: block;
    }

    &:active {
      background-color: $color-white;
      box-shadow: -2px 2px 1px 2px $color-white;
    }
  }

  &__bottom {
    width: 25rem;
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;

    @include mobile {
      width: auto;
      padding: 0;
      flex-grow: 1;
      flex-shrink: 2;
    }
  }
}
</style>
