<template>
  <v-page name="quiz">
    <v-title :title="quiz.title" />
    <v-grid name="quiz">
      <quiz-question
        v-for="(question, index) in quiz.questions"
        :id="index"
        :key="index"
        :image="question.image"
        :quiz-id="$route.params.quizId"
        class="v-grid-item"
        @click.native="quizQuestionClickHandler(index)"
      ></quiz-question>
    </v-grid>
    <router-view/>
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

const quizModule = namespace('quiz')

@Component({
  components: {
    QuizQuestion,
    VGrid,
    VTitle,
    VPage
  },
  async asyncData ({ $fire, route }) {
    try {
      const quizId = route.params.quizId
      const snapshot = await $fire.database.ref(`/quizes/${quizId}`).once('value')
      const quiz: Quiz = snapshot.val()
      console.log('QUIZ', quiz)
      return {
        quiz
      }
    } catch (error) {
      console.log(error)
    }
  }
})
export default class QuizPage extends Vue {
  // @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz
  private quiz!: Quiz

  // get computedQuiz (): Quiz {
  //   return this.quiz(`${this.$route.params.quizId}`)
  // }

  quizQuestionClickHandler (questionId: number) {
    const quizId = this.$route.params.quizId
    this.$router.push(`/quiz/${quizId}/${questionId}`)
  }
}
</script>
