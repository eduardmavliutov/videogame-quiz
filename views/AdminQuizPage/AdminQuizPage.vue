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
        <v-add-button @add="addButtonHandler" />
      </v-grid>
      <div
        v-if="isNewQuiz"
        class="admin__buttons-wrapper"
      >
        <v-button
          type="submit"
          @click.native="createQuizHandler"
        >
          Create
        </v-button>
      </div>
      <div
        v-else
        class="admin__buttons-wrapper"
      >
        <v-button
          type="submit"
          @click.native="saveQuizHandler"
        >
          Save
        </v-button>
        <v-button
          v-if="!quiz.published"
          type="submit"
          @click.native="publishButtonHandler"
        >
          Publish
        </v-button>
      </div>
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
  private loading = false

  get pageTitle (): string {
    return this.quiz.title || 'New quiz'
  }

  get isNewQuiz (): boolean {
    return this.$route.params.id === 'new'
  }

  get createButtonText (): string {
    return this.isNewQuiz ? 'Create' : 'Save'
  }

  private async createQuizHandler (): Promise<void> {
    console.log('SUBMITTED QUIZ!', this.quiz)
    this.$v.$touch()
    console.log('IS FORM VALID', !this.$v.$invalid)
    if (!this.$v.$invalid) {
      try {
        this.loading = true
        const quizId = Date.now()
        this.$fire.database.ref(`/quizes/${quizId}`).set(this.quiz)
        this.$router.push({
          name: 'admin-quizes-id',
          params: {
            id: quizId.toString()
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }

  private async saveQuizHandler (): Promise<void> {
    console.log('SUBMITTED QUIZ!', this.quiz)
    this.$v.$touch()
    console.log('IS FORM VALID', !this.$v.$invalid)
    if (!this.$v.$invalid) {
      try {
        this.loading = true
        this.$fire.database.ref(`/quizes/${this.$route.params.id}`).set(this.quiz)
        this.$router.push({
          name: 'admin-quizes-id',
          params: {
            id: this.$route.params.id
          }
        })
      } catch (error) {
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  }

  private publishButtonHandler (): void {
    console.log('PUBLISHED!')
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
.admin {
  &__quiz-question-list {
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

  &__buttons-wrapper {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }
}
</style>