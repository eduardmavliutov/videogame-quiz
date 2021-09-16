<template>
  <v-page name="quiz">
    <v-title :title="activeQuiz.title" />
    <v-grid name="quiz">
      <quiz-question
        v-for="(question, index) in activeQuiz.questions"
        :key="index"
        :image="question.image"
        :done="isAuthenticated && isQuizParticipated(quizId) && quizes[quizId][index].done"
        class="v-grid-item"
        @click.native="quizQuestionClickHandler(index)"
      />
    </v-grid>
    <router-view />
  </v-page>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
import QuizQuestion from '@/components/Quiz/QuizQuestion.vue'
import VGrid from '@/components/VGrid/VGrid.vue'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'
import { ParticipatedQuizes } from '@/types/store/user/user.interface'

const quizModule = namespace('quiz')
const userModule = namespace('user')

@Component({
  components: {
    QuizQuestion,
    VGrid,
    VTitle,
    VPage
  },
})
export default class QuizPage extends Vue {
  @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz
  @userModule.Getter('isAuthenticated') isAuthenticated!: boolean
  @userModule.Getter('isQuizParticipated') isQuizParticipated!: (quizId: string) => boolean
  @userModule.Getter('quizes') quizes!: ParticipatedQuizes

  private get activeQuiz (): Quiz {
    return this.quiz(`${this.$route.params.quizId}`)
  }

  private get quizId (): string {
    return this.$route.params.quizId;
  }

  private quizQuestionClickHandler (questionId: number) {
    const quizId = this.$route.params.quizId
    this.$router.push({
      name: 'quiz-question',
      params: {
        quiz: quizId,
        questionId: `${questionId}`
      }
    })
  }
}
</script>
