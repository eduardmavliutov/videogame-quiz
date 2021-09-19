<template>
  <div
    class="quiz-letter"
    :class="classes"
  >
    <span>{{ letter }}</span>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { SPACE_SYMBOL } from '@/helpers/constants'
import { CssClasses } from '@/types/css-classes'

@Component({})
export default class QuizQuestionLetter extends Vue {
  @Prop({ required: true, type: String }) letter!: string
  @Prop({ required: false, type: String }) type!: string
  @Prop({ required: false, type: Boolean, default: false }) openedByHint!: boolean

  /**
   * Defines whether current 'letter' value is a space or not
   * @returns {boolean} true if letter's value is a space, otherwise - false
   */
  private get isSpace (): boolean {
    return this.letter === SPACE_SYMBOL
  }

  /**
   * Basing on prop values retrieves all css classes for component
   * @returns {CssClasses} object defining what classes will be applied
   */
  private get classes (): CssClasses {
    return {
      'space': !!this.isSpace,
      'opened-letter': this.type === 'opened-letter',
      'opened-by-hint': this.openedByHint
    }
  }
}
</script>
<style lang="scss">
@keyframes win-animation {
  0% {
    color: $color-white;
  }

  50% {
    transform:  translateY(5px);
  }

  100% {
    color: $color-black;
    background-color: $color-yellow-win;
    transform: scale(0.9) translateY(-5px);
  }
}

.quiz-letter {
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  margin-bottom: 1px;
  background-color: $color-black;
  color: $color-white;
  border-radius: 5px;
  text-align: center;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  flex-flow: column nowrap;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s all ease;

  @include mobile {
    width: 1.6rem;
    height: 1.6rem;
    font-size: 15px;
  }

  &.space {
    background-color: transparent !important;
  }

  &.question-is-done,
  &.opened-by-hint {
    background-color: $color-yellow-win;
    color: $color-black;
  }
}
</style>
