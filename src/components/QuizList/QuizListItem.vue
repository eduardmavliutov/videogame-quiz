<template>
  <router-link
    :to="`quiz/${id}`"
    class="quiz-list-item"
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
  </router-link>
</template>
<script lang="ts">
import { ImageProps } from '@/types/image'
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component({})
export default class QuizListItem extends Vue {
  @Prop({ required: true, type: String }) id!: string
  @Prop({ required: true, type: String }) title!: string
  @Prop({ required: true, type: Object }) image!: ImageProps
}
</script>
<style lang="scss">
.quiz-list-item {
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  // border: 2px solid $color-analogous-two;
  border-radius: 10px;
  width: 15rem;
  overflow: hidden;
  text-decoration: none;

  &:hover {
    box-shadow: $box-shadow--quiz-list-item;
  }

  &__title {
    font-weight: bold;
    text-align: center;
    background-color: $color-analogous-two;
    color: $color-white;
    line-height: 2.5rem;
  }

  &__image {
    width: 100%;
    height: 100%;
  }
}
</style>
