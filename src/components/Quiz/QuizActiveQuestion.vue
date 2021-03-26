<template>
  <div>
    <v-back-drop @click.native="$router.back()" />
    <div class="quiz-active-question">
      <h1 style="color: black;">I am active question {{ $route.params.questionId}}</h1>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import VBackDrop from '@/components/VBackDrop/VBackDrop.vue'
import { namespace } from 'vuex-class'
import { QuizQuestion } from '@/types/store/quiz/quiz.interface'

const quizModule = namespace('quiz')

@Component({
  components: {
    VBackDrop
  }
})
export default class QuizActiveQuestion extends Vue {
  @Prop({ required: true, type: String }) quizId!: string
  @Prop({ required: true, type: String }) questionId!: string

  @quizModule.Getter('quizQuestion') quizQuestion!: (quizId: string, questionId: number) => QuizQuestion

  created () {
    console.log(this.quizQuestion(this.quizId, Number(this.questionId)))
  }
}
</script>
<style lang="scss">
.quiz-active-question {
  position: absolute;
  z-index: 10;
  top: 0;
  left: 0;
  transform: translate(50%, 50%);
  width: 50%;
  height: 50%;
  background-color: white;
}
</style>
