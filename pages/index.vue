<template>
  <v-page name="home">
    <quiz-list :quizes="quizes"/>
  </v-page>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { Getter } from 'vuex-class'
import VPage from '@/components/VPage/VPage.vue'
import QuizList from '@/components/QuizList/QuizList.vue'
import { QuizQuestion } from '@/types/store/quiz/quiz.interface'

const namespace = 'quiz'

@Component({
  components: {
    VPage,
    QuizList
  }
})
export default class Home extends Vue {
  @Getter('quizes', { namespace }) quizes!: QuizQuestion[]
}
</script>
