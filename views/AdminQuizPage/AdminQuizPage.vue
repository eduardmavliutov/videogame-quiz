<template>
  <v-page name="admin-quiz">
    <v-title :title="pageTitle" />
    <section class="admin__quiz-question-list">
      <v-grid name="admin-quiz-question-list">
        <admin-quiz-card
          :key="quiz.toString()"
          :title.sync="quiz.title"
          :image.sync="quiz.image"
          class="v-grid-item"
        />
        <admin-quiz-question-card
          v-for="(question, index) in quiz.questions"
          :key="`${index}question`"
          :right-answer.sync="question.rightAnswer"
          :image.sync="question.image"
          :questionId="index"
          @delete-question="deleteQuestionHandler"
          class="v-grid-item"
        />
        <v-add-button
          key="addButton"
          @add="addButtonHandler"
        />
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
          :disabled="quiz.published"
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
      <transition-group
        class="admin__errors"
        name="admin__errors"
        tag="ul"
        appear
      >
        <li
          v-for="error in validationErrors"
          :key="error"
          class="admin__error-item"
        >
          {{ error }}
        </li>
      </transition-group>
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
import { AdminQuiz, AdminQuizQuestion, QuizQuestion, QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'
import { emptyAdminQuiz } from '@/helpers/emptyModels'
import { validationMixin } from 'vuelidate'
import { required } from 'vuelidate/lib/validators'
import { generateEmptyLetters, generateLetterPool } from '@/helpers/utils'

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
        required,
        $each: {
          image: {
            src: {
              required
            }
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

  /**
   * Retrieves an array of validation errors that will be displayed to the user
   * @returns {string[]} array of errors
   */
  private get validationErrors (): string[] {
    const errors = []

    if (this.$v.quiz.title?.$dirty && !this.$v.quiz.title?.required) {
      errors.push('Quiz must have a title')
    }

    if (this.$v.quiz.image?.src?.$dirty && !this.$v.quiz.image?.src.required) {
      errors.push('Quiz must have an image')
    }

    if (this.$v.quiz.questions?.$dirty && !this.$v.quiz.questions?.required) {
      errors.push('Quiz must have at least 1 question')
    }

    for (let i = 0; i < this.$v.quiz.questions?.$model.length; i++) {
      if (this.$v.quiz.questions?.$each[i]?.$dirty && !this.$v.quiz.questions?.$each[i]?.rightAnswer.required) {
        errors.push('All questions must have right answers')
        break
      }
    }

    for (let i = 0; i < this.$v.quiz.questions?.$model.length; i++) {
      if (this.$v.quiz.questions?.$each[i]?.image.src.$dirty && !this.$v.quiz.questions?.$each[i]?.image.src.required) {
        errors.push('All questions must have saved images')
        break
      }
    }

    return errors
  }

  /**
   * Retrieves opened quiz's title
   * @returns {string} opened quiz's title or 'New quiz'
   */
  private get pageTitle (): string {
    return this.quiz.title || 'New quiz'
  }

  /**
   * Defines whether it is a new quiz or not
   * basing on 'id' param of the current route
   * @returns {boolean} true if 'id' param is 'new',
   * otherwise - false
   */
  private get isNewQuiz (): boolean {
    return this.$route.params.id === 'new'
  }

  /**
   * Defines the text of 'Create' button
   * @returns {string} 'Create' or 'Save'
   */
  private get createButtonText (): string {
    return this.isNewQuiz ? 'Create' : 'Save'
  }

  /**
   * Method is triggered when user presses 'Create' button
   */
  private async createQuizHandler (): Promise<void> {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        this.loading = true
        const quizId = Date.now().toString()
        await this.$fire.database.ref(`/quizes/${quizId}`).set(this.quiz)
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

  /**
   * Method is triggered when user presses 'Save' button
   */
  private async saveQuizHandler (): Promise<void> {
    this.$v.$touch()
    if (!this.$v.$invalid) {
      try {
        this.loading = true
        await this.$fire.database.ref(`/quizes/${this.$route.params.id}`).set(this.quiz)
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

  /**
   * Method is triggered when user presses 'Publish' button
   */
  private async publishButtonHandler (): Promise<void> {
    if (confirm('Are you sure?')) {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        try {
          this.loading = true
          this.quiz.published = true
          this.quiz.questions = this.quiz.questions.map((question: AdminQuizQuestion) => ({
            ...question,
            letterPool: generateLetterPool(question.rightAnswer),
            openedLetters: generateEmptyLetters(question.rightAnswer)
          }))
          await this.$fire.database.ref(`/quizes/${this.$route.params.id}`).set({
            ...this.quiz
          })
        } catch (error) {
          console.log(error)
        } finally {
          this.loading = false
        }
      }
    }
  }

  /**
   * Method is triggered when user presses 'Add' button
   */
  private addButtonHandler (): void {
    this.quiz.questions.push({
      image: {
        src: '',
        alt: ''
      },
      rightAnswer: ''
    })
  }

  /**
   * Method is triggered when user presses 'Delete' button
   */
  private deleteQuestionHandler (questionId: number): void {
    this.quiz.questions = this.quiz.questions.filter((_: AdminQuizQuestion, index: number) => index !== questionId)
  }
}
</script>
<style lang="scss">
.admin {
  &__quiz-question-list {
    padding: 1rem;
    background-color: rgba(255, 255, 255, 0.815);
    border-radius: 10px;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
    align-self: stretch;
    overflow-y: auto;
  }

  &__buttons-wrapper {
    display: flex;
    justify-content: center;
    gap: 1rem;
  }

  &__error-item {
    transition: 0.4s all ease-out;
  }

  &__errors {
    color: red;
    font-weight: bold;
    font-size: 15px;
    align-self: center;
    margin-top: 0.5rem;
    font-style: italic;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;

    &-enter-to,
    &-leave {
      opacity: 1;
    }

    &-leave-to,
    &-enter {
      opacity: 0;
    }
  }
}
</style>