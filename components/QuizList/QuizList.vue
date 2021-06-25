<template>
  <v-grid name="quiz-list">
    <quiz-list-item
      v-for="quiz in quizes"
      :id="quiz.id"
      :key="quiz.id"
      :title="quiz.title"
      :image="quiz.image"
      class="v-grid-item"
    ></quiz-list-item>
  </v-grid>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import QuizListItem from '@/components/QuizList/QuizListItem.vue'
import VGrid from '@/components/VGrid/VGrid.vue'
import { QuizQuestion } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    QuizListItem,
    VGrid
  }
})
export default class QuizList extends Vue {
  @Prop({ required: true, type: Array }) quizes!: QuizQuestion[]
}
</script>
