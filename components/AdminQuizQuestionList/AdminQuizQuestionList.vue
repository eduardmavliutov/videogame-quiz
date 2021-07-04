<template>
  <section class="admin__quiz-question-list">
    <v-grid>
      <!-- <admin-quiz-question-card
        v-for="(question, index) in quiz.questions"
        :key="index"
        :quiz-question="question"
        :questionId="index"
        :quizId="quiz.id"
      /> -->
      <admin-quiz-question-card isNew />
    </v-grid>
  </section>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'nuxt-property-decorator'
import AdminQuizQuestionCard from '@/components/AdminQuizQuestionCard/AdminQuizQuestionCard.vue'
import VGrid from '@/components/VGrid/VGrid.vue'
import { Quiz } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    AdminQuizQuestionCard,
    VGrid
  }
})
export default class AdminQuizQuestionList extends Vue {
  @Prop({ required: false, type: Object }) quiz!: Quiz

  created () {
    console.log(this.quiz.questions)
  }
}
</script>
<style lang="scss">
.admin__quiz-question-list {
  background-color: rgba(255, 255, 255, 0.815);
  border-radius: 10px;
  padding: 1rem;
}
</style>