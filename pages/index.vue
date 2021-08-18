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
import { Quiz } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    VPage,
    QuizList,
    VLoader
  }
})
export default class Home extends Vue {
  private quizes!: { [key: string]: Quiz }
  private loading = true

  async created () {
    try {
      this.loading = true
      const snapshot = await this.$fire.database.ref('/quizes').once('value')
      this.quizes = snapshot.val()
    } catch (error) {
      console.log(error)
    } finally {
      this.loading = false
    }
  }
}
</script>
