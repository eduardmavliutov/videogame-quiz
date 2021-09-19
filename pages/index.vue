<template>
  <v-page name="home">
    <quiz-list
      v-if="!loading"
      :quizes="quizes"
    />
    <v-loader v-else />
  </v-page>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import VLoader from '@/components/Loader/Loader.vue'
import QuizList from '@/components/QuizList/QuizList.vue'
import { namespace } from 'vuex-class'
import { Quizes } from '@/types/store/quiz/quiz.interface'

const quizModule = namespace('quiz')

@Component({
  components: {
    VPage,
    QuizList,
    VLoader
  }
})
export default class Home extends Vue {
  @quizModule.Getter('quizes') quizes!: Quizes
  
  private loading = false
}
</script>
