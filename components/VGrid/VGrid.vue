<template>
  <div :class="`v-grid v-grid--${name}`">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'

@Component({})
export default class VGrid extends Vue {
  @Prop({ required: false, type: String }) name!: string
}
</script>
<style lang="scss">
.v-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: flex-start;
  gap: 1rem;

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
