<template>
  <div
    class="quiz-letter"
    :class="{ 'space': !!isSpace }"
  >
    <span>{{ letter }}</span>
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
@keyframes win-animation {
  0% {
    color: $color-white;
  }

  50% {
    transform: translateY(5px);
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

  @include mobile {
    width: 1.6rem;
    height: 1.6rem;
    font-size: 15px;
  }

  &.space {
    background-color: transparent !important;
  }

  &.question-is-done {
    animation: 1.2s infinite alternate forwards win-animation;
  }

  @for $i from 1 through 30 {
    &.question-is-done:nth-child(#{$i}) {
      animation-delay: $i * (1s / 20);
    }
  }
}
</style>
