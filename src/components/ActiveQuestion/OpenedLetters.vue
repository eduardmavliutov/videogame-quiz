<template>
  <div class="opened-letters">
    <letter
      v-for="(letter, index) in openedLetters"
      :key="index"
      :letter="letter.value"
      @click.native="$emit('remove-letter', { value: index })"
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
export default class OpenedLetters extends Vue {
  @Prop({ required: true, type: Array }) openedLetters!: QuizQuestionLetter[]
}
</script>
<style lang="scss">
.opened-letters {
  display: flex;
  justify-content: center;
  flex-flow: row wrap;
  padding: 1rem 0 1rem;

  .quiz-letter:not(:last-child) {
    margin-right: 1px;
  }
  .quiz-letter {
    margin-bottom: 1px;
  }
}
</style>
