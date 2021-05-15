<template>
  <div :class="`v-card v-card--${name}`">
    <slot
      class="v-card--image"
      name="image"
    ></slot>
    <div class="v-card--content">
      <slot></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class VCard extends Vue {
  @Prop({ required: true, type: String }) name!: string
}
</script>
<style lang="scss">
.v-card {
  display: flex;
  justify-content: center;
  flex-flow: row nowrap;
  box-shadow: $box-shadow--dark;
  background-color: $main-color;
  position: relative;
  backdrop-filter: blur(2px);
  transition: all 0.5s ease-in-out;
  z-index: 10;

  &::before {
    content: "";
    background: url("~@/assets/images/questions.png");
    background-size: 10%;
    opacity: 0.05;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -1;
  }

  @include mobile {
    flex-flow: column nowrap;
    justify-content: flex-start;
  }

  &--content {
    padding: 1rem;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    flex-grow: 2;

    @include mobile {
      padding: 0;
      flex-grow: 0;
      flex-shrink: 2;
    }
  }

  &--quiz-active-question {
    width: 80%;

    @include mobile {
      width: 100%;
    }
  }

  &--auth {
    width: 60%;

    @include mobile {
      width: 100%;
    }
  }
}
</style>
