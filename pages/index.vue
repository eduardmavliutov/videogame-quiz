<template>
  <v-page name="home">
    <quiz-list :quizes="quizes"/>
  </v-page>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import VPage from '@/components/VPage/VPage.vue'
import QuizList from '@/components/QuizList/QuizList.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    VPage,
    QuizList
  },
  async asyncData ({ $fire }) {
    try {
      const snapshot = await $fire.database.ref('/quizes').once('value')
      const quizes = snapshot.val()
      return {
        quizes
      }
    } catch (error) {
      console.log(error)
    }
  }
})
export default class Home extends Vue {
  private quizes!: { [key: string]: Quiz }
}
</script>
