<template>
  <div class="quiz-question">
    <div class="quiz-question__inner">
      <img
        :src="image.src"
        :alt="image.alt"
        class="quiz-question__image"
      >
    </div>
  </div>
</template>
<script lang="ts">
import { ImageProps } from '@/types/image'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class QuizQuestion extends Vue {
  @Prop({ required: true, type: Number }) id!: number
  @Prop({ required: true, type: String }) quizId!: string
  @Prop({ required: true, type: Object }) image!: ImageProps
}
</script>
<style lang="scss">
.quiz-question {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  border-radius: 10px;
  width: 15rem;
  overflow: hidden;
  text-decoration: none;

  @include mobile {
    max-width: 10rem;
  }

  @media screen and (max-width: 320px) {
    max-width: 8rem;
  }

  &:hover {
    box-shadow: $box-shadow--white;
  }

  &__inner {
    display: flex;
  }

  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
