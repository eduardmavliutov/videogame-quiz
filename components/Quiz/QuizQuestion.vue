<template>
  <div class="quiz-question">
    <div class="quiz-question__inner">
      <img
        :src="image.src"
        :alt="image.alt"
        class="quiz-question__image"
      >
    </div>
    <svg
      v-if="done"
      class="quiz-question__done-icon"
      viewBox="0 0 18 13"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
    >
      <title>done</title>
      <desc>Created with Sketch.</desc>
      <g
      >
        <g
          id="Rounded"
          transform="translate(-443.000000, -248.000000)"
        >
          <g
            id="Action"
            transform="translate(100.000000, 100.000000)"
          >
            <g
              id="-Round-/-Action-/-done"
              transform="translate(340.000000, 142.000000)"
            >
              <g transform="translate(0.000000, 0.000000)">
                <polygon
                  id="Path"
                  points="0 0 24 0 24 24 0 24"
                ></polygon>
                <path
                  d="M9,16.2 L5.5,12.7 C5.11,12.31 4.49,12.31 4.1,12.7 C3.71,13.09 3.71,13.71 4.1,14.1 L8.29,18.29 C8.68,18.68 9.31,18.68 9.7,18.29 L20.3,7.7 C20.69,7.31 20.69,6.69 20.3,6.3 C19.91,5.91 19.29,5.91 18.9,6.3 L9,16.2 Z"
                  id="🔹Icon-Color"
                  fill="#bf360c"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
</template>
<script lang="ts">
import { ImageProps } from '@/types/image'
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class QuizQuestion extends Vue {
  @Prop({ required: true, type: Object }) image!: ImageProps
  @Prop({ required: true, type: Boolean }) done!: boolean
}
</script>
<style lang="scss">
.quiz-question {
  position: relative;
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

  &__done-icon {
    position: absolute;
    width: 3rem;
    height: 3rem;
    bottom: 0;
    right: 0;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    fill: $color-yellow-win;
    border-radius: 50%;
    stroke: $main-color;
    stroke-width: 1px;
    stroke-linejoin: round;
    border: 2px solid $main-color;
    
    @include mobile {
      width: 2rem;
      height: 2rem;
    }
  }
}
</style>
