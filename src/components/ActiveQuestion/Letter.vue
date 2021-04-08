<template>
  <div
    class="quiz-letter"
    :class="{ 'space': !!isSpace }"
  >
    <div>{{ letter }}</div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { SPACE_SYMBOL } from '@/helpers/constants'

@Component({})
export default class QuizQuestionLetter extends Vue {
  @Prop({ required: true, type: String }) letter!: string

  get isSpace () {
    return this.letter === SPACE_SYMBOL
  }
}
</script>
<style lang="scss">
.quiz-letter {
  width: 2rem;
  height: 2rem;
  background-color: $color-black;
  color: $color-white;
  padding: 0.5rem;
  border-radius: 5px;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  font-weight: bold;
  cursor: pointer;

  &.space {
    background-color: transparent;
  }
}
</style>
