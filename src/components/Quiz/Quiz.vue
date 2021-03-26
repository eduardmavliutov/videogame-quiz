<template>
  <div class="quiz">
    <h1 class="quiz__title">{{ computedQuiz.title }}</h1>
    <v-grid>
      <quiz-question
        v-for="(question, index) in computedQuiz.questions"
        :key="index"
        :id="index"
        :image="question.image"
        :quizId="$route.params.quizId"
        class="v-grid-item"
        @click.native="quizQuestionClickHandler(index)"
      ></quiz-question>
    </v-grid>
    <router-view></router-view>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { namespace } from 'vuex-class'
import QuizQuestion from '@/components/Quiz/QuizQuestion.vue'
import VGrid from '@/components/VGrid/VGrid.vue'

const quizModule = namespace('quiz')
const popupModule = namespace('popup')

@Component({
  components: {
    QuizQuestion,
    VGrid
  }
})
export default class Quiz extends Vue {
  @quizModule.Getter('quiz') quiz!: (quizId: string) => Quiz
  @popupModule.Mutation('SHOW_POPUP') SHOW_POPUP!: () => void
  @popupModule.Mutation('SET_POPUP_COMPONENT_NAME') SET_POPUP_COMPONENT_NAME!: (payload: { activeComponent: string }) => void

  get computedQuiz (): Quiz {
    return this.quiz(`${this.$route.params.quizId}`)
  }

  quizQuestionClickHandler (questionId: number) {
    const quizId = this.$route.params.quizId
    this.$router.push(`/quiz/${quizId}/${questionId}`)
  }
}
</script>
<style lang="scss">
.quiz {
  position: relative;
  &__title {
    text-align: center;
    color: $color-complementary--dark;
    background: url("~@/assets/images/white-brush-stroke.png") 50% 50%;
    background-size: 90%;
  }
}
</style>
