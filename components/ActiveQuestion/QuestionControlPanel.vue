<template>
  <transition
    name="question-control-panel"
    mode="in-out"
    appear
  >
    <div class="question-control-panel">
      <button
        class="question-control-panel__previous-button"
        @click="$emit('previous-question')"
      >
      </button>
      <button
        class="question-control-panel__next-button"
        @click="$emit('next-question')"
      >
      </button>
    </div>
  </transition>
</template>
<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import ChangeQuestionButton from '@/components/ActiveQuestion/ChangeQuestionButton.vue'

@Component({
  components: {
    ChangeQuestionButton
  }
})
export default class QuestionControlPanel extends Vue {

}
</script>
<style lang="scss">
@keyframes button-right-active {
  20% {
    background-position: 80%;
  }
  100% {
    opacity: 0;
  }
}

@keyframes button-left-active {
  20% {
    background-position: 20%;
  }
  100% {
    opacity: 0;
  }
}
.question-control-panel {
  height: 4rem;
  width: 100vw;
  display: none;
  background: $main-color;
  backdrop-filter: blur(2px);
  box-shadow: $box-shadow--dark;

  @media screen and (max-width: 320px) {
    height: 3rem;
  }

  &::after {
    content: "";
    background: url("~@/assets/images/questions.png");
    background-size: 5%;
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  @include mobile {
    display: flex;
    justify-content: center;
    flex-flow: row nowrap;
    justify-self: flex-end;
  }

  &__next-button,
  &__previous-button {
    flex-grow: 1;
    background-color: transparent;
    border: none;
    transition: 0.5s all ease-in;
  }

  &__previous-button {
    background: url("~@/assets/images/arrow-left-mobile.png") no-repeat center
      transparent;
    background-size: 30%;

    &:active {
      animation-name: button-left-active;
      animation-fill-mode: forwards;
      animation-duration: 0.8s;
    }
  }

  &__next-button {
    background: url("~@/assets/images/arrow-right-mobile.png") no-repeat center
      transparent;
    background-size: 30%;

    &:active {
      animation-name: button-right-active;
      animation-fill-mode: forwards;
      animation-duration: 0.8s;
    }
  }

  &-enter {
    transform: translateY(120%);
  }

  &-enter-to {
    transform: translateY(0%);
  }

  &-enter-active,
  &-leave-active {
    transition: all 0.5s ease-in;
  }
}
</style>
