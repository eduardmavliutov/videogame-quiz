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
    <svg
      v-if="isQuizDone"
      focusable="false"
      class="quiz-list-item__trophy-icon"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 576 512"
    >
      <path d="M552 64H448V24c0-13.3-10.7-24-24-24H152c-13.3 0-24 10.7-24 24v40H24C10.7 64 0 74.7 0 88v56c0 35.7 22.5 72.4 61.9 100.7 31.5 22.7 69.8 37.1 110 41.7C203.3 338.5 240 360 240 360v72h-48c-35.3 0-64 20.7-64 56v12c0 6.6 5.4 12 12 12h296c6.6 0 12-5.4 12-12v-12c0-35.3-28.7-56-64-56h-48v-72s36.7-21.5 68.1-73.6c40.3-4.6 78.6-19 110-41.7 39.3-28.3 61.9-65 61.9-100.7V88c0-13.3-10.7-24-24-24zM99.3 192.8C74.9 175.2 64 155.6 64 144v-16h64.2c1 32.6 5.8 61.2 12.8 86.2-15.1-5.2-29.2-12.4-41.7-21.4zM512 144c0 16.1-17.7 36.1-35.3 48.8-12.5 9-26.7 16.2-41.8 21.4 7-25 11.8-53.6 12.8-86.2H512v16z" />
    </svg>
  </div>
</template>
<script lang="ts">
import { ImageProps } from '@/types/image'
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import { namespace } from 'vuex-class'
import { CssClasses } from '@/types/css-classes'

const userModule = namespace('user')

@Component({})
export default class QuizListItem extends Vue {
  @Prop({ required: true, type: String }) id!: string
  @Prop({ required: true, type: String }) title!: string
  @Prop({ required: true, type: Object }) image!: ImageProps
  @Prop({ required: true, type: Boolean }) published!: boolean

  @userModule.Getter('isQuizCompleted') isQuizCompleted!: (quizId: string) => boolean
  @userModule.Getter('isAuthenticated') isAuthenticated!: boolean

  /**
   * Defines whether quiz is done or not
   * @return {boolean} true if user is logged in and the quiz is completed,
   * otherwise - false
   */
  private get isQuizDone (): boolean {
    return this.isAuthenticated && this.isQuizCompleted(this.id)
  }

  /**
   * Basing on prop values retrieves all css classes for component
   * @returns {CssClasses} object defining what classes will be applied
   */
  private get classes (): CssClasses {
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
  box-shadow: $box-shadow--dark;

  @include mobile {
    flex-flow: row-reverse nowrap;
    height: 5rem;
    width: 100%;
  }

  &__published {
    &:hover {
      .quiz-list-item__image {
        transform: scale(1.1);
      }
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
    overflow: hidden;
    @include mobile {
      width: 5rem;
    }
  }

  &__image {
    transition: 0.4s all ease-out;
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

  &__trophy-icon {
    position: absolute;
    fill: $color-yellow-win;
    stroke: $main-color;
    stroke-width: 20px;
    stroke-linejoin: round;
    width: 3rem;
    height: 3rem;
    bottom: 0.5rem;
    right: 0.5rem;

    @include mobile {
      top: 50%;
      width: 1.5rem;
      height: 1.5rem;
      transform: translateY(-50%);
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
