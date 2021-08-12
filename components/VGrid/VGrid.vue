<template>
  <div
    :class="`v-grid v-grid--${name}`"
  >
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { gsap } from 'gsap'

@Component({})
export default class VGrid extends Vue {
  @Prop({ required: false, type: String }) name!: string

  mounted () {
    gsap.from('.v-grid-item', {
      duration: 0.5,
      scale: 0.5,
      opacity: 0.5,
      stagger: 0.1,
      ease: 'elastic',
    })
  }
}
</script>
<style lang="scss">
.v-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: flex-start;
  gap: 1rem;
  transition: 0.3s all ease-out;

  &-enter,
  &-leave-to {
    opacity: 0;
    transform: scale(0.7);
  }

  &-enter-to,
  &-leave {
    opacity: 1;
    transform: scale(1);
  }

  @include mobile {
    width: 100%;
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 320px) {
    grid-template-columns: repeat(2, minmax(0, auto));
  }

  &--quiz-list {
    @include mobile {
      grid-template-columns: 100%;
    }
  }

  &--admin-quiz-question-list {
    grid-template-columns: repeat(4, 1fr);
    margin-bottom: 1rem;
  }
}
</style>
