<template>
  <div
    :class="classes"
    @click="openQuizHandler()"
  >
    <div class="quiz-list-item__title">
      {{ title }}
    </div>
    <div class="quiz-list-item__inner">
      <img
        :src="image.src"
        :alt="image.alt"
        class="quiz-list-item__image"
      >
    </div>
    <span
      v-if="!published"
      class="quiz-list-item__coming-soon-label"
    >
      Coming soon!
    </span>
  </div>
</template>
<script lang="ts">
import { ImageProps } from '@/types/image'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class QuizListItem extends Vue {
  @Prop({ required: true, type: String }) id!: string
  @Prop({ required: true, type: String }) title!: string
  @Prop({ required: true, type: Object }) image!: ImageProps
  @Prop({ required: true, type: Boolean }) published!: boolean

  private get classes () {
    return {
      'quiz-list-item': true,
      'quiz-list-item__published': this.published,
      'quiz-list-item__not-published': !this.published
    }
  }

  /**
   * Opens the quiz user clicked on
   */
  private openQuizHandler (): void {
    if (this.published) {
      this.$router.push({
        path: `/quiz/${this.id}`
      })
    }
  }
}
</script>
<style lang="scss">
.quiz-list-item {
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  border-radius: 10px;
  width: 15rem;
  overflow: hidden;
  text-decoration: none;

  @include mobile {
    flex-flow: row-reverse nowrap;
    height: 5rem;
    width: 100%;
  }

  &__published {
    &:hover {
      box-shadow: $box-shadow--white;
    }
  }

  &__not-published {
    position: relative;
    .quiz-list-item__image {
      filter: grayscale(100%);
    }
  }

  &__inner {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    @include mobile {
      width: 5rem;
    }
  }

  &__coming-soon-label {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 10rem;
    background-color: $main-color;
    color: $color-yellow-win;
    font-weight: bold;
    text-align: center;
    transform: translate(2rem, -2rem) rotate(-45deg);

    @include mobile {
      font-size: $font-size-normal-mobile;
      transform: translate(2rem, -1.5rem) rotate(-35deg);
    }
  }

  &__title {
    font-weight: bold;
    text-align: center;
    background-color: $color-analogous-two;
    color: $color-white;
    line-height: 2.5rem;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;

    @include mobile {
      flex-grow: 2;
      font-size: 24px;
    }
  }

  &__image {
    width: 100%;
    height: 100%;
    flex-grow: 1;
  }
}
</style>
