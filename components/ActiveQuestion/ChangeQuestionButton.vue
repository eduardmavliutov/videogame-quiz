<template>
  <button
    type="button"
    :class="`${classes}`"
    @click="$emit('change-question')"
  ></button>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class ChangeQuestionButton extends Vue {
  @Prop({ required: true, type: String }) type!: string

  /**
   * Computes button's class name basing on its type
   * @return {string} computed button's class name
   */
  private get classes (): string {
    return `change-question-button--${this.type}`
  }
}
</script>
<style lang="scss">
.change-question-button {
  &--previous,
  &--next {
    position: relative;
    width: 5rem;
    align-self: stretch;
    border: none;
    transition: 0.2s all ease-out;
    opacity: 0;
    box-shadow: inset 0px 0px 10px 5px rgba(0, 0, 0, 0.5);

    @include mobile {
      display: none;
    }

    &:after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: 0.2s all ease-out;
    }

    &:hover {
      opacity: 1;

      &:after {
        opacity: 1;
      }
    }

    &:active {
      filter: invert(100%);
      opacity: 1;
      box-shadow: inset 0px 0px 10px 5px $color-dark;
    }
  }

  &--previous {
    background: url("~@/assets/images/arrow-left.png") no-repeat center
      transparent;
    background-size: contain;
    border-top-left-radius: 50%;
    border-bottom-left-radius: 50%;

    &:after {
      border-top-left-radius: 50%;
      border-bottom-left-radius: 50%;

      border-left: 1px solid rgba(255, 255, 255, 0.212);
      background: linear-gradient(
        to left,
        rgba(255, 255, 255, 0.01) 0%,
        rgba(255, 255, 255, 0.4) 20%,
        rgba(255, 255, 255, 0.1) 70%,
        rgba(255, 255, 255, 0.05) 90%
      );
    }
  }

  &--next {
    background: url("~@/assets/images/arrow-right.png") no-repeat center
      transparent;
    background-size: contain;
    border-top-right-radius: 50%;
    border-bottom-right-radius: 50%;

    &:after {
      border-top-right-radius: 50%;
      border-bottom-right-radius: 50%;
      border-right: 1px solid rgba(255, 255, 255, 0.212);
      background: linear-gradient(
        to right,
        rgba(255, 255, 255, 0.01) 0%,
        rgba(255, 255, 255, 0.4) 10%,
        rgba(255, 255, 255, 0.1) 70%,
        rgba(255, 255, 255, 0.05) 90%
      );
    }
  }
}
</style>
