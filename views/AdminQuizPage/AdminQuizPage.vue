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
          @delete-question="deleteQuestionHandler"
        />
        <v-add-button
          @add="addButtonHandler"
        />
      </v-grid>
      <v-button
        type="submit"
        @click.native="saveButtonClickHandler"
      >
        Save
      </v-button>
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
import VButton from '@/components/VButton/VButton.vue'
import VAddButton from '@/components/VAddButton/VAddButton.vue'
import { AdminQuiz, AdminQuizQuestion } from '@/types/store/quiz/quiz.interface'
import { emptyAdminQuiz } from '@/helpers/emptyModels'
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

@Component({
  components: {
    AdminQuizQuestionCard,
    AdminQuizCard,
    VGrid,
    VPage,
    VTitle,
    VButton,
    VAddButton
  },
  layout: 'admin',
  async asyncData ({ $fire, route }) {
    try {
      const quizId = route.params.id
      if (quizId === 'new') {
        return {
          quiz: emptyAdminQuiz
        }
      }
      const snapshot = await $fire.database.ref(`/quizes/${quizId}`).once('value')
      const quiz = snapshot.val()
      return {
        quiz
      }
    } catch (error) {
      console.log(error)
    }
  },
  mixins: [validationMixin],
  validations: {
    quiz: {
      title: {
        required
      },
      image: {
        src: {
          required
        }
      },
      questions: {
        minLength: minLength(1),
        $each: {
          image: {
            src: required
          },
          rightAnswer: {
            required
          }
        }
      }
    }
  }
})
export default class AdminQuizPage extends Vue {
  private quiz = {} as AdminQuiz

  get pageTitle (): string {
    return this.quiz.title || 'New quiz'
  }

  private saveButtonClickHandler (): void {
    console.log('SUBMITTED QUIZ!', this.quiz)
    this.$v.$touch();
    console.log('IS FORM VALID', !this.$v.$invalid)
  }

  private addButtonHandler (): void {
    this.quiz.questions.push({
      image: {
        src: '',
        alt: ''
      },
      rightAnswer: ''
    })
  }

  private deleteQuestionHandler (questionId: number): void {
    this.quiz.questions = this.quiz.questions.filter((_: AdminQuizQuestion, index: number) => index !== questionId)
  }
}
</script>
<style lang="scss">
.admin__quiz-question-list {
  margin-bottom: 2rem;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.815);
  border-radius: 10px;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-self: stretch;
  // flex-grow: 1;
  overflow-y: auto;
}
</style>