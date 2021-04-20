<template>
  <div class="letter-pool">
    <letter
      v-for="(letter, index) in letterPool"
      :key="index"
      :letter="letter.value"
      @click.native="$emit('add-letter', index)"
    />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import Letter from '@/components/ActiveQuestion/Letter.vue'
import { QuizQuestionLetter } from '@/types/store/quiz/quiz.interface'

@Component({
  components: {
    Letter
  }
})
export default class LetterPool extends Vue {
  @Prop({ required: true, type: Array }) letterPool!: QuizQuestionLetter[]
}
</script>
<style lang="scss">
.letter-pool {
  display: flex;
  justify-content: center;
  padding: 1rem 0;
  flex-flow: row wrap;

  .quiz-letter {
    margin-bottom: 1px;
  }
  .quiz-letter:not(:last-child) {
    margin-right: 1px;
  }
}
</style>
