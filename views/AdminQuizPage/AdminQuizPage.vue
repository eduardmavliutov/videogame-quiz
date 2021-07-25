<template>
  <v-page name="admin-quiz">
    <v-title :title="pageTitle" />
    <section class="admin__quiz-question-list">
      <v-grid name="admin-quiz-question-list">
        <admin-quiz-card 
          :title.sync="quiz.title"
          :image.sync="quiz.image"
        />
        <admin-quiz-question-card
          v-for="(question, index) in quiz.questions"
          :key="index"
          :right-answer.sync="question.rightAnswer"
          :image.sync="question.image"
          :questionId="index"
        />
      </v-grid>
    </section>
  </v-page>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import AdminQuizQuestionCard from '@/components/AdminQuizQuestionCard/AdminQuizQuestionCard.vue'
import AdminQuizCard from '@/components/AdminQuizCard/AdminQuizCard.vue'
import VGrid from '@/components/VGrid/VGrid.vue'
import VPage from '@/components/VPage/VPage.vue'
import VTitle from '@/components/VTitle/VTitle.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    AdminQuizQuestionCard,
    AdminQuizCard,
    VGrid,
    VPage,
    VTitle
  },
  layout: 'admin',
  async asyncData ({ $fire, route }) {
    try {
      const quizId = route.params.id
      const snapshot = await $fire.database.ref(`/quizes/${quizId}`).once('value')
      const quiz = snapshot.val()
      return {
        quiz: quiz ?? {}
      }
    } catch (error) {
      console.log(error)
    }
  }
})
export default class AdminQuizPage extends Vue {
  private quiz: Quiz = {
    title: '',
    image: {
      src: '',
      alt: ''
    },
    questions: []
  }
  
  get pageTitle (): string {
    return this.quiz.title || 'New quiz'
  }

  created () {
    console.log(this.quiz.questions)
  }
}
</script>
<style lang="scss">
.admin__quiz-question-list {
  margin-bottom: 2rem;
  background-color: rgba(255, 255, 255, 0.815);
  border-radius: 10px;
  padding: 1rem;
  align-self: stretch;
  flex-grow: 1;
}
</style>