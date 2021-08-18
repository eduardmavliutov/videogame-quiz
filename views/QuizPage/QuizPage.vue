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

const quizModule = namespace('quiz')

@Component({
  components: {
    QuizQuestion,
    VGrid,
    VTitle,
    VPage
  },
  async asyncData ({ $fire, route }) {
    // try {
    //   const quizId = route.params.quizId
    //   const snapshot = await $fire.database.ref(`/quizes/${quizId}`).once('value')
    //   const quiz: Quiz = snapshot.val()
    //   return {
    //     quiz
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  }
})
export default class QuizPage extends Vue {
  // @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz
  // private quiz!: Quiz
  // ! временно пока доступ в firebase не будет возобновлен
  private quiz = {
    id: '324rfsd',
    title: 'PS4 exclusives',
    image: {
      src: require('@/assets/images/quizes/ps4-exclusives/ps4-exclusives.jpeg'),
      alt: 'ps4-exclusives'
    },
    questions: [
      {
        rightAnswer: 'god of war',
        image: {
          src: require('@/assets/images/quizes/ps4-exclusives/god-of-war.jpeg'),
          alt: 'quiz-picture-alt'
        },
        imagePreview: {
          src: require('@/assets/images/quizes/ps4-exclusives/god-of-war-thumb.jpeg'),
          alt: 'quiz-picture-alt'
        },
        letterPool: [
          { value: 'f' },
          { value: 'g' },
          { value: 'o' },
          { value: 'd' },
          { value: 'w' },
          { value: 'o' },
          { value: 'f' },
          { value: 'a' },
          { value: '6' },
          { value: 'r' },
          { value: 'n' },
          { value: 'm' },
          { value: 'u' },
          { value: '5' }
        ],
        openedLetters: [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: ' ' },
          { value: '' },
          { value: '' },
          { value: ' ' },
          { value: '' },
          { value: '' },
          { value: '' }
        ]
      },
      {
        rightAnswer: 'uncharted 4',
        image: {
          src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4.jpeg'),
          alt: 'quiz-picture-alt'
        },
        imagePreview: {
          src: require('@/assets/images/quizes/ps4-exclusives/uncharted-4-thumb.jpeg'),
          alt: 'quiz-picture-alt'
        },
        letterPool: [
          { value: 'c' },
          { value: 'h' },
          { value: 'u' },
          { value: 'a' },
          { value: 'n' },
          { value: '4' },
          { value: 'd' },
          { value: 'n' },
          { value: 'e' },
          { value: 't' },
          { value: 'r' }
        ],
        openedLetters: [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: ' ' },
          { value: '' }
        ]
      },
      {
        rightAnswer: 'persona 5',
        image: {
          src: require('@/assets/images/quizes/ps4-exclusives/persona-5.jpeg'),
          alt: 'quiz-picture-alt'
        },
        imagePreview: {
          src: require('@/assets/images/quizes/ps4-exclusives/persona-5-thumb.jpeg'),
          alt: 'quiz-picture-alt'
        },
        letterPool: [
          { value: 'e' },
          { value: 'p' },
          { value: 'r' },
          { value: 'o' },
          { value: 's' },
          { value: 'n' },
          { value: '5' },
          { value: '3' },
          { value: 'a' },
          { value: 'a' },
          { value: 's' },
          { value: 'a' },
          { value: 'w' },
          { value: 'm' }
        ],
        openedLetters: [
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: '' },
          { value: ' ' },
          { value: '' }
        ]
      }
    ],
  }

  // get computedQuiz (): Quiz {
  //   return this.quiz(`${this.$route.params.quizId}`)
  // }

  quizQuestionClickHandler (questionId: number) {
    const quizId = this.$route.params.quizId
    this.$router.push(`/quiz/${quizId}/${questionId}`)
  }
}
</script>
