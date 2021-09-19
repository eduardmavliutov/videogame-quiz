<template>
  <div class="app-wrapper">
    <the-header />
    <v-page name="quiz-active-question">
      <v-title
        :title="`${activeQuiz.title} / #${activeQuestionIdForTitle}`"
        :hide-in-mobile-mode="true"
      />
      <nuxt />
      <question-control-panel
        @previous-question="previousQuizQuestionHandler()"
        @next-question="nextQuizQuestionHandler()"
      />
    </v-page>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import TheHeader from '@/components/TheHeader/TheHeader.vue'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import QuestionControlPanel from '@/components/ActiveQuestion/QuestionControlPanel.vue'
import { namespace } from 'vuex-class'
import { Quiz } from '@/types/store/quiz/quiz.interface'
import { Route } from 'vue-router'

const quizModule = namespace('quiz')

@Component({
  components: {
    TheHeader,
    QuestionControlPanel,
    VPage,
    VTitle
  },
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
export default class ActiveQuizQuesionLayout extends Vue {
  @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz

  /**
   * Computes active quiz question id for title
   * @returns {number} active quiz question id
   */
  private get activeQuestionIdForTitle (): number {
    return this.questionId + 1
  }

  /**
   * Retrieves the current active quiz
   * @returns {Quiz} current active quiz
   */
  private get activeQuiz (): Quiz {
    return this.quiz(this.quizId)
  }

  /**
   * Retrieves a quiz id from the route params
   * @returns {string} quiz id from the route params
   */
  private get quizId (): string {
    return this.$route.params.quizId
  }

  /**
   * Retrieves a question id from the route params converted to Number
   * @returns {number} question id
   */
  private get questionId (): number {
    return Number(this.$route.params.questionId)
  }

  /**
   * Navigates to previous quiz question and resets questionWasCounted property
   */
  private previousQuizQuestionHandler (): void {
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
  private nextQuizQuestionHandler (): void {
    const currentQuizLength = this.activeQuiz.questions.length
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
}
</script>