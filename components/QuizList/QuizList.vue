<template>
  <v-grid name="quiz-list">
    <quiz-list-item
      v-for="(quizId) in Object.keys(quizes)"
      :id="quizId"
      :key="quizId"
      :title="quizes[quizId].title"
      :image="quizes[quizId].image"
      class="v-grid-item"
    />
  </v-grid>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import QuizListItem from '@/components/QuizList/QuizListItem.vue'
import VGrid from '@/components/VGrid/VGrid.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    QuizListItem,
    VGrid
  }
})
export default class QuizList extends Vue {
  @Prop({ required: true, type: Object }) quizes!: { [key: string]: Quiz }
}
</script>
